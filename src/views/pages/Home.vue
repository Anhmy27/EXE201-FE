<template>
	<section class="bg-gray-50 py-4 antialiased dark:bg-gray-900 md:py-4">
		<div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
			<!-- Heading & Filters -->
			<div :id="'product-list'" class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
				<Breadcrumb :items="[
					{ name: 'Danh sách khóa học', href: '/', current: true },
				]" />
				<div class="flex items-center space-x-4">
					<FilterProduct @setFilter="setFilter"></FilterProduct>

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
			<div v-else-if="dataProduct.length > 0"
				class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
				<div v-for="(product, index) in dataProduct" :key="product.id" :id="'product-' + product.id"
					@click="getProductDetail(product.id)"
					class="bg-white dark:bg-gray-700 rounded-2xl px-4 pt-4 pb-1 cursor-pointer hover:-translate-y-2 transition-all relative">

					<div class="w-full h-48 relative  dark:bg-gray-900">
						<img v-if="getPreviewUrl(product.files[0]?.file_path)"
							:src="getPreviewUrl(product.files[0]?.file_path)" alt="Product 1"
							class="w-full h-full object-contain" />
						<img v-else src="https://readymadeui.com/images/product9.webp" alt="Product 1"
							class="w-full h-full object-contain" />

						<button type="button" @click.stop="OpenPopupAddToCart(product.id)"
							class="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200">
							<svg viewBox="0 0 24 24" class="w-6 h-6 text-gray-800 dark:text-gray-200"
								xmlns="http://www.w3.org/2000/svg">
								<g id="Edit / Add_Plus">
									<path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" fill="currentColor"
										stroke="currentColor" stroke-width="2" stroke-linecap="round"
										stroke-linejoin="round" />
								</g>
							</svg>
						</button>
					</div>

					<h3
						class="text-xs font-medium sm:text-sm mt-1 text-gray-800 flex items-center justify-center dark:text-gray-200 uppercase">
						{{ product.name }}
					</h3>


					<div class="flex flex-items-center justify-center">


						<span :class="[
							'text-base text-gray-900 dark:text-white'
						]">
							{{ formatNumberWithCommas(product.price) }}đ
						</span>
					</div>
				</div>


			</div>
			<div v-else
				class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic rounded-md">
				Không có sản phẩm nào
			</div>
			<!-- <div class="w-full text-center mt-4">
				<button type="button"
					class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show
					more</button>
			</div> -->
		</div>
	</section>
	<BottomPage />
	<AddToCartPopup :show="showPopup" :product="selectedProduct" @close="closePopup" @addToCart="handleAddToCart" />
</template>

<script setup>
import Loading from "@/component/Loading.vue";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, nextTick, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BottomPage from "@/component/BottomPage.vue";
import FilterProduct from "@/component/FilterProduct.vue";
import Breadcrumb from "@/component/Breadcrumb.vue";
import { getPreviewUrl, formatNumberWithCommas, truncateText } from "@/utils/extensions";
import AddToCartPopup from "@/component/AddToCartPopup.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { eventBus } from "@/utils/eventBus.js";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDown } from "lucide-vue-next";
import { useEventListener } from '@vueuse/core';


const route = useRoute();
const router = useRouter();
const textSearch = inject('textSearch');
const handleSearchButtonClick = () => {
	params.value.text_search = textSearch.value
	params.value.page = 1
	nextPage.value = true;
	isLoading.value = true;

	dataProduct.value = [];

	getProduct();
};

watch(
	() => eventBus.isButtonClicked,
	() => {
		handleSearchButtonClick();
	}
);

const sortOptions = ref([
	{ order_by: "created_date", sort: "desc", name: "Khóa học mới" },
	{ order_by: "price", sort: "asc", name: "Giá tăng dần" },
	{ order_by: "price", sort: "desc", name: "Giá giảm dần" },
]);

const params = ref({
	page: 1,
	page_size: 12,
	// order_by: 'created_date',
	// sort: 'desc',
	sort: sortOptions.value[0],
	select_type: [],
	text_search: null,
	from_money: null,
	to_money: null,
	from_date: null,
	to_date: null,
});

const setSort = (selectedSort) => {

	if (selectedSort !== params.value.sort) {
		params.value.sort = selectedSort;
		params.value.page = 1;
		nextPage.value = true;
		isLoading.value = true;
		dataProduct.value = [];
		getProduct();
	}
};

const nextPage = ref(true);

const dataProduct = ref([]);

const getProductDetail = (product_id) => {
	router.push({ name: "ProductDetail", params: { product_id: product_id } });
}


const showPopup = ref(false);
const selectedProduct = ref(null);

const OpenPopupAddToCart = async (product_id) => {
	selectedProduct.value = dataProduct.value.find(p => p.id === product_id);
	showPopup.value = true;
}

const closePopup = () => {
	showPopup.value = false;
	selectedProduct.value = null;
}

const handleAddToCart = async (cartData) => {
	try {
		const result = await apiServices.postItemInCard(cartData);
		if (result.code === 200) {
			toast(result.message.text || "Product added successfully!", {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
				type: 'success',
			});

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
		console.error("Error adding to cart:", error);
	}
}

const setFilter = async (filter) => {
	params.value.to_money = filter.to_money
	params.value.from_money = filter.from_money
	params.value.select_type = filter.select_type
	params.value.page = 1
	nextPage.value = true
	isLoading.value = true;

	dataProduct.value = [];
	await getProduct();
}
const isFetching = ref(false)
const getProduct = async () => {
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
			from_money: params.value.from_money,
			to_money: params.value.to_money,
			from_date: params.value.from_date,
			to_date: params.value.to_date,
		}
		const result = await apiServices.getProduct(param_getAPI);
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
		getProduct();
	}
};

useEventListener(window, 'scroll', handleScroll)

onMounted(async () => {
	isLoading.value = true;
	await getProduct();
	isLoading.value = false;

});  
</script>

<style></style>