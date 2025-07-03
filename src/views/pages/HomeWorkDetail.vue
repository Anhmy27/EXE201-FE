<template>
    <section v-if="dataHomeWork" class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12 space-y-8 max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
            { name: 'KHÓA HỌC ' + dataHomeWork.data.product.name.toUpperCase(), href: '/course/' + dataHomeWork.data.product.id },
            { name: 'BÀI TẬP ' + dataHomeWork.data.name.toUpperCase(), href: '/homework/' + dataHomeWork.data.id },
        ]" />

        <!-- Danh sách câu hỏi -->
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">BÀI KIỂM TRA</h2>
                <div v-if="dataHomeWork.status"
                    class="px-3 py-1 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium shadow">
                    Điểm: {{ dataHomeWork.score }}/{{ dataHomeWork.data.questions.length }}
                </div>
            </div>
            <div class="space-y-4" v-if="dataHomeWork.status">
                <ResultQuestion v-for="(question, index) in dataHomeWork.data.questions" :key="question.id"
                    :data="question" :stt="index" />
            </div>
            <ShowQuestion v-else v-for="(question, index) in dataHomeWork.data.questions" :key="question.id"
                :data="question" :stt="index" @answerSelected="handleAnswerSelected" />
        </div>
        <button v-if="!dataHomeWork.status" @click="SubmitHomeWork"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Nộp bài</button>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiServices from '@/services/api.services'
import Breadcrumb from '@/component/Breadcrumb.vue'
import ResultQuestion from '@/component/ResultQuestion.vue'
import ShowQuestion from '@/component/ShowQuestion.vue'
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const route = useRoute()
const dataHomeWork = ref(null)


const getUserSessionHomeWork = async () => {
    try {
        const result = await apiServices.getUserSessionHomeWork(route.params.session_id)
        if (result.code === 200) {
            dataHomeWork.value = result.data

            if (dataHomeWork.value.is_congratulation) {
                Swal.fire({
                    title: '🎉 Hoàn thành xuất sắc! 🎉',
                    text: 'Bạn đã hoàn thành bài tập, tuyệt vời lắm!',
                    // imageUrl: '/assets/images/congratulation.gif', // Bạn có thể thay bằng ảnh chúc mừng của bạn
                    imageWidth: 200,
                    imageHeight: 200,
    //                 background: '#fff url(/assets/images/congratulation.gif)', // ảnh nền nếu có
    //                 backdrop: `
    //   rgba(0,0,123,0.4)
    //   url("/images/nyan-cat.gif")
    //   right bottom
    //   no-repeat
    // `,
                    confirmButtonText: '🥳 Tiếp tục',
                    confirmButtonColor: '#3085d6',
                    padding: '2em',
                    color: '#333',
                })
            }
        }
    } catch (error) {
        console.error("Error loading homework data:", error)
    }
}

const selectedAnswers = ref([])

const handleAnswerSelected = ({ question_id, answer_id }) => {
    // Nếu đã chọn câu đó => cập nhật
    const idx = selectedAnswers.value.findIndex(item => item.question_id === question_id)
    if (idx >= 0) {
        selectedAnswers.value[idx].answer_id = answer_id
    } else {
        selectedAnswers.value.push({ question_id, answer_id })
    }
}

const SubmitHomeWork = async () => {
    // Hiện loading
    Swal.fire({
        title: 'Đang nộp bài...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    const result = await apiServices.submitHomeWork(route.params.session_id, { result: selectedAnswers.value })

    // Tắt loading
    Swal.close()

    if (result.code === 200) {
        getUserSessionHomeWork()
        toast(result.message?.text || 'Nộp bài thành công!', {
            position: 'bottom-right',
            autoClose: 2000,
            type: 'success',
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        })
    } else {
        toast(result.message?.text || 'Nộp bài thất bại!', {
            type: 'error'
        })
    }
}

onMounted(() => {
    getUserSessionHomeWork()
})
</script>
