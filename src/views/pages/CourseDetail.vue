<template>
	<section v-if="dataSessionCourses" class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12">
		<Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
			{ name: dataProductDetail?.name, href: '/courses' },
			{ name: 'Bài giảng', href: '#', current: true }
		]" />
		<div class="mx-auto max-w-screen-2xl lg:px-6">
			<div v-if="videoCourse"
				class="flex flex-col mt-4 mb-10 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md space-y-2">
				<div class="flex items-center justify-between">
					<div class="text-3xl font-semibold text-gray-800 dark:text-gray-100">
						📺 Bài giảng: {{ videoCourse.name }}
					</div>
				</div>
				<div class="flex flex-col mt-4 mb-10 p-4 lg:px-20">
					<div class="relative w-full">
						<video controls :src="getPreviewUrl(videoCourse.file.file_path)"
							class="w-full rounded shadow"></video>
					</div>
				</div>
				<div class="flex flex-wrap w-full gap-2 p-4 lg:px-20">
					<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Danh sách bài giảng:</h2>
					<button v-for="(sessionCourse, index) in dataSessionCourses" :key="sessionCourse.id"
						@click="videoCourse = sessionCourse" :class="[
							'px-4 py-2 text-sm rounded-lg shadow',
							videoCourse?.id === sessionCourse.id
								? 'bg-gray-400 text-white'
								: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
						]">
						Buổi {{ index + 1 }}
					</button>
				</div>

				<div v-if="dataProductDetail.home_works.length > 0" class="w-full mt-6 px-4 lg:px-20">
					<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Danh sách bài tập:</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<router-link v-for="homework in dataProductDetail.home_works" :key="homework.id"
							:to="{ name: 'HomeWork', params: { home_work_id: homework.id } }"
							class="block bg-gray-100 dark:bg-gray-700 rounded-xl shadow p-4 hover:shadow-md hover:ring hover:ring-blue-400 transition">
							<h3 class="text-base font-semibold text-blue-600 dark:text-blue-400 mb-1">{{ homework.name
							}}
							</h3>
							<p class="text-sm text-gray-700 dark:text-gray-300">{{ homework.description }}</p>
							<p class="text-xs text-gray-500 mt-2">Số câu hỏi: {{ homework.len_question }}</p>
						</router-link>
					</div>
				</div>

				<div v-if="dataProductDetail?.doc_course.length > 0"
					class="mt-8 bg-white dark:bg-gray-800 p-4 rounded-md lg:px-20">
					<div class="space-y-4">
						<!-- Top row: Name left, Add button right -->
						<div class="flex justify-between items-center">
							<h2 class="text-lg dark:text-gray-300 font-semibold">Danh sách tài liệu</h2>
						</div>

						<div class="mt-4">
							<div
								class="flex gap-4 overflow-x-auto w-full mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg custom-scrollbar">
								<div v-for="(doc, index) in dataProductDetail?.doc_course" :key="doc.id"
									class="relative flex flex-col items-center w-30 max-w-40 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
									<File class="w-20 h-20 text-blue-600 dark:text-white mb-1" />

									<p class="text-xs text-center text-gray-800 dark:text-gray-200 truncate w-full">
										{{ truncateText(doc.file_name, 50) }}
									</p>

									<button @click="downloadFile(doc.id, doc.file_name)"
										class="absolute top-0 right-0 bg-gray-500 dark:bg-gray-500 text-white w-5 h-5 flex items-center justify-center  text-xs hover:bg-gray-700 dark:hover:bg-gray-600">
										<Download class="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>

		</div>

	</section>
</template>

<script setup>
import apiServices from '@/services/api.services';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Picture from '@/component/Picture.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Breadcrumb from "@/component/Breadcrumb.vue";
import { File, Download } from 'lucide-vue-next';
import { getPreviewUrl, formatNumberWithCommas, truncateText } from "@/utils/extensions";
const route = useRoute();
const router = useRouter();
const dataProductDetail = ref(null);
const downloadFile = async (file_id, file_name) => {
	try {
		const response = await apiServices.downloadFile(file_id);

		const blob = new Blob([response.data]);

		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = file_name || `doc-${file_id}`;

		document.body.appendChild(link);
		link.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(link);
	} catch (error) {
		console.error('Lỗi khi tải file:', error.message);
	}
};


const getProductHomeWork = async () => {
	try {
		const result = await apiServices.getProductHomeWork(route.params.product_id);
		if (result.code === 200) {
			dataProductDetail.value = result.data;
		}
	} catch (error) {
		console.error("Error loading product data:", error);
	}
};

const dataSessionCourses = ref(null)

const getCourseDetail = async () => {
	try {
		const result = await apiServices.getCourseDetail(route.params.product_id);
		if (result.code === 200) {
			dataSessionCourses.value = result.data;

			if (dataSessionCourses.value.length > 0) {
				videoCourse.value = dataSessionCourses.value[0]
			}
		}
	} catch (error) {
		console.error("Error loading product data:", error);
	}
};


const videoCourse = ref(null)
const YOUTUBE_WATCH_REGEX = /v=([a-zA-Z0-9_-]+)/;

const embedUrl = computed(() => {
	const matchWatch = videoCourse.value?.url.match(YOUTUBE_WATCH_REGEX);
	const videoId = matchWatch?.[1];
	return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
});

onMounted(async () => {
	await getProductHomeWork();
	await getCourseDetail();
});
</script>