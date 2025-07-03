<template>
	<section class="bg-gray-50 py-4 antialiased dark:bg-gray-900 md:py-4">
		<div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
			<!-- Heading & Filters -->
			<div :id="'course-list'" class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
				<Breadcrumb :items="[
					{ name: 'Khóa học của tôi', href: '#', current: true },
				]" />
				<div class="flex items-center space-x-4">
					<FilterProduct :showFromTotal="false" @setFilter="setFilter"></FilterProduct>

					<Menu v-slot="{ open }" as="div" class="relative z-1">
						<div class="flex items-center">
							<MenuButton class="w-full justify-center rounded-md">
								<button
									class="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none">
									<svg class="-ms-0.5 me-2 h-4 w-4  dark:text-white" aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
										viewBox="0 0 24 24">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
											stroke-width="2"
											d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
									</svg>
									<span class="dark:text-gray-200">{{ params.sort?.name }}</span>
									<ChevronDown
										class="w-4 h-4 dark:text-gray-200 transform transition-transform duration-300 ease-in-out"
										:class="{ 'rotate-180': open }" />
								</button>
							</MenuButton>
						</div>

						<transition enter-active-class="transition duration-100 ease-out"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-75 ease-in"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0">
							<MenuItems class="absolute w-full origin-top-right bg-white dark:bg-gray-700 rounded-lg">
								<div v-for="sort in sortOptions" :key="sort.name">
									<MenuItem v-slot="{ active }">
									<button @click="setSort(sort)" :class="[
										active && 'bg-gray-100 dark:bg-gray-600',
										'group flex w-full items-center px-3 py-2 text-sm dark:text-gray-300 rounded-lg',
									]">
										{{ sort.name }}
									</button>
									</MenuItem>
								</div>
							</MenuItems>
						</transition>
					</Menu>
				</div>
			</div>
			<Loading v-if="isLoading"></Loading>
			<div v-else-if="dataProduct.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<router-link v-for="(product, index) in dataProduct" :key="product.id"
					:to="{ name: 'CourseDetail', params: { product_id: product.id } }"
					class="relative bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md p-4 flex gap-4 items-center">
					<!-- Tag ĐÃ MUA -->
					<div
						class="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-[1px] rounded-md shadow">
						ĐÃ MUA
					</div>

					<!-- Ảnh khóa học -->
					<div class="flex-shrink-0 w-28 h-30 rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
						<img v-if="getPreviewUrl(product.files[0]?.file_path)"
							:src="getPreviewUrl(product.files[0]?.file_path)" alt="Course Image"
							class="w-full h-full object-contain" />
						<img v-else src="https://readymadeui.com/images/product9.webp" alt="Default Course"
							class="w-full h-full object-contain" />
					</div>

					<!-- Thông tin khóa học -->
					<div class="flex flex-col w-full justify-center flex-1 min-w-0">
						<h3 class="text-sm font-semibold text-gray-800 dark:text-white uppercase">
							{{ product.name }}
						</h3>
						<p class="text-[11px] text-blue-500 mt-1">
							Số buổi học: {{ product.session_courses?.length || 0 }}
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-300 mt-1 whitespace-normal break-words">
							{{ truncateText(product.describe) }}
						</p>

					</div>
				</router-link>
			</div>

			<div v-else
				class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic rounded-md">
				Không có sản phẩm nào
			</div>
		</div>
	</section>
</template>

<script setup>
import Loading from "@/component/Loading.vue";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, nextTick, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from "@/component/Pagination.vue";
import FilterProduct from "@/component/FilterProduct.vue";
import Breadcrumb from "@/component/Breadcrumb.vue";
import { getPreviewUrl, formatNumberWithCommas, truncateText } from "@/utils/extensions";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { eventBus } from "@/utils/eventBus.js";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDown } from "lucide-vue-next";
import { useEventListener } from '@vueuse/core'


const route = useRoute();
const router = useRouter();
const textSearch = inject('textSearch');
const handleSearchButtonClick = () => {
	params.value.text_search = textSearch.value
	params.value.page = 1
	nextPage.value = true;
	isLoading.value = true;
	dataProduct.value = [];
	getCourse();
};

watch(
	() => eventBus.isButtonClicked,
	() => {
		handleSearchButtonClick();
	}
);

const sortOptions = ref([
	{ order_by: "created_date", sort: "desc", name: "Mới nhất" },
	{ order_by: "created_date", sort: "asc", name: "Cũ nhất" },
]);

const params = ref({
	page: 1,
	page_size: 12,
	sort: sortOptions.value[0],
	select_type: [],
	text_search: null,
});

const setSort = (selectedSort) => {
	if (selectedSort !== params.value.sort) {
		params.value.sort = selectedSort;
		params.value.page = 1;
		nextPage.value = true;
		isLoading.value = true;
		dataProduct.value = [];
		getCourse();
	}
};

const nextPage = ref(true);
const dataProduct = ref([]);

const setFilter = async (filter) => {
	params.value.select_type = filter.select_type

	params.value.page = 1
	nextPage.value = true;
	isLoading.value = true;
	dataProduct.value = [];
	await getCourse();
}
const isFetching = ref(false)

const getCourse = async () => {
	if (isFetching.value || !nextPage.value) return;
	isFetching.value = true;
	try {

		const param_getAPI = {
			page: params.value.page,
			page_size: params.value.page_size,
			order_by: params.value.sort?.order_by,
			sort: params.value.sort?.sort,
			select_type: JSON.stringify(params.value.select_type),
			text_search: params.value.text_search,
		}
		const result = await apiServices.getCourse(param_getAPI);
		if (result.code === 200) {
			result.data.items.forEach(newProduct => {
				const isDuplicate = dataProduct.value.some(product => product.id === newProduct.id);
				if (!isDuplicate) {
					dataProduct.value.push(newProduct);
				}
			});

			if (result.data.has_next) {
				params.value.page += 1;
			} else {
				nextPage.value = null;
			}
		}
		isFetching.value = false;
		isLoading.value = false;

	} catch (error) {
		console.error("Error loading product data:", error);
	}
};

const isLoading = ref(false);


const handleScroll = () => {
	const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
	if (bottomOfWindow) {
		getCourse();
	}
};

useEventListener(window, 'scroll', handleScroll)

onMounted(async () => {
	isLoading.value = true;
	await getCourse();
	isLoading.value = false;
});  
</script>

<style></style>