<template>
	<section v-if="dataHomeWork" class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12 space-y-8 max-w-4xl mx-auto">
		<!-- Breadcrumb -->
		<Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
			{ name: 'Trang chủ', href: '/admin/dashboard' },
			{ name: dataHomeWork?.product?.name, href: '/admin/home-work/' + dataHomeWork?.product.id },
			{ name: dataHomeWork?.name, href: '#', current: true }
		]" />

		<!-- Danh sách câu hỏi -->
		<div class="space-y-4">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Danh sách câu hỏi</h2>

				<button @click="openCreateQuestion = true"
					class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
					+ Thêm câu hỏi
				</button>
			</div>

			<Question v-for="(question, index) in dataHomeWork.questions" :key="question.id" :data="question"
				:stt="index" @deleteQuestion="deleteQuestion" />
		</div>

		<Modal :bigw="true" v-if="openCreateQuestion" @close="openCreateQuestion = false">
			<template #header>
				<h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
					Thêm câu hỏi
				</h3>
			</template>

			<!-- Body -->
			<template #body>
				<div class="space-y-4">
					<Question v-for="(question, index) in newQuestions" :key="'new-' + index" :data="question"
						@update:data="updatedData => updateQuestion(index, updatedData)" :editable="true" />

					<div class="flex justify-end">
						<button @click="addNewQuestion"
							class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
							+ Câu hỏi
						</button>
					</div>
				</div>
			</template>

			<!-- Footer -->
			<template #footer>
				<div class="flex justify-end gap-2">
					<button @click="openCreateQuestion = false"
						class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-600">
						Đóng
					</button>
					<button @click="postQuestion"
						class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
						Tạo
					</button>
				</div>
			</template>
		</Modal>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiServices from '@/services/api.services'
import Breadcrumb from '@/component/Breadcrumb.vue'
import Question from '@/component/Question.vue'
import Modal from '@/component/Modal.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const openCreateQuestion = ref(false)
const route = useRoute()
const dataHomeWork = ref(null)

function updateQuestion(index, updatedData) {
	// Cập nhật lại câu hỏi đúng vị trí
	newQuestions.value[index] = { ...updatedData }
}

const deleteQuestion = async (id) => {
	try {
		const result = await apiServices.deleteQuestion(id);

		if (result.code === 200) {
			// Hiển thị toast thành công
			toast(result.message.text || "Deleted successfully!", {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
				type: 'success',
			});

			// Cắt phần tử có id bằng id đã xóa khỏi dataHomeWork.value.questions
			dataHomeWork.value.questions = dataHomeWork.value.questions.filter(
				question => question.id !== id
			);
		} else {
			// Xử lý lỗi nếu cần, ví dụ:
			toast(result.message.text || "Delete failed!", {
				position: 'bottom-right',
				type: 'error',
			});
		}
	} catch (error) {
		// Xử lý lỗi khi gọi api thất bại
		toast("An error occurred while deleting!", {
			position: 'bottom-right',
			type: 'error',
		});
		console.error(error);
	}
};


const getHomeWorkDetail = async () => {
	try {
		const result = await apiServices.getHomeWorkDetail(route.params.product_id, route.params.home_work_id)
		if (result.code === 200) {
			dataHomeWork.value = result.data
		}
	} catch (error) {
		console.error("Error loading homework data:", error)
	}
}

const postQuestion = async () => {
	try {
		console.log(newQuestions.value)
		const result = await apiServices.postQuestion(route.params.home_work_id, { data: newQuestions.value });
		if (result?.code === 200) {
			toast(result.message.text || "added successfully!", {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
				type: 'success',
			});
			newQuestions.value = []
			addNewQuestion()
			openCreateQuestion.value = false;
			dataHomeWork.value.questions = [...result.data.questions]

		} else {
			toast(result.message.text || "An error occurred. Please try again.", {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
				type: 'error'
			});
		}
	} catch (error) {
		console.error("Error loading product data:", error);
	}
}

onMounted(() => {
	getHomeWorkDetail()
})

// Câu hỏi mới (chưa lưu)
const newQuestions = ref([
	{
		question: '',
		answers: [
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false }
		]
	}
])

const addNewQuestion = () => {
	newQuestions.value.push({
		question: '',
		answers: [
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false },
			{ answer: '', result_answer: false }
		]
	})
}
</script>
