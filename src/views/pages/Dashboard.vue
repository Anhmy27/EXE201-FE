<template>
	<div class="bg-gray-50 py-4 antialiased dark:bg-gray-900 py-8 md:px-8">
		<div class="mx-auto max-w-screen-2xl px-4 gap-4 flex flex-col">
			<Breadcrumb :items="[{ name: 'Dashboard', href: '#', current: true }]" />
			<Loading class="absolute inset-0 flex justify-center items-center" v-if="isLoading"></Loading>
			<div class="flex flex-col gap-4" v-else>
				<section class="text-gray-700 w-full">
					<div class="px-5 py-4 bg-white dark:bg-gray-800 rounded-lg w-full">
						<h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 dark:text-gray-200 mb-4">
							Tổng
							quan</h1>
						<div class="grid grid-cols-3 md:grid-cols-3 gap-8 w-full text-center">
							<div
								class="border-2 border-gray-400 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
								<UserRound class="w-12 h-12 text-indigo-500 mb-3 inline-block"></UserRound>
								<h2 class="title-font font-medium text-3xl text-gray-900 dark:text-gray-200">{{
									statisticAll?.user }}</h2>
								<p class="leading-relaxed dark:text-gray-400">Khách hàng</p>
							</div>

							<div
								class="border-2 border-gray-400 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
								<ShoppingBag class="w-12 h-12 text-indigo-500 mb-3 inline-block"></ShoppingBag>
								<h2 class="title-font font-medium text-3xl text-gray-900 dark:text-gray-200">{{
									statisticAll?.product }}</h2>
								<p class="leading-relaxed dark:text-gray-400">Sản phẩm</p>
							</div>

							<div
								class="border-2 border-gray-400 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
								<ShoppingCart class="w-12 h-12 text-indigo-500 mb-3 inline-block"></ShoppingCart>
								<h2 class="title-font font-medium text-3xl text-gray-900 dark:text-gray-200">{{
									statisticAll?.orders }}</h2>
								<p class="leading-relaxed dark:text-gray-400">Hóa đơn</p>
							</div>

						</div>
					</div>
				</section>
				<div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
					<div class="flex flex-col gap-4 xl:col-span-2">
						<BieuDoTangTruong
							v-if="statisticRevenueByType && statisticRevenueByType.series && statisticRevenueByType.categories"
							:titleChart="'Thống kê doanh thu theo lĩnh vực'"
							:subtitle="'Dữ liệu ' + monthDefault + ' tháng gần nhất'"
							:categories="statisticRevenueByType.categories" :series="statisticRevenueByType.series" />

						<BieuDoCot
							v-if="statisticSoldProductByType && statisticSoldProductByType.series && statisticSoldProductByType.categories"
							:seriesData="statisticSoldProductByType.series"
							:categories="statisticSoldProductByType.categories"
							:titleChart="'Thống kê số lượng sản phẩm bán ra'"
							:subtitle="'Dữ liệu ' + monthDefault + ' tháng gần nhất'" />
					</div>
					<div class="col-span-1">
						<div
							class="h-full bg-white dark:bg-gray-800 w-full rounded-lg shadow-md p-10 border border-gray-200 dark:border-gray-700">
							<div class="flex flex-col  items-center mb-6">
								<h3 class="text-lg font-extrabold text-gray-800 dark:text-white">
									Top 10 khách hàng
								</h3>
								<div class="text-gray-800 dark:text-white">Thống kê trong 1 năm</div>

							</div>
							<div v-if="topCustomer.length === 0" class="text-gray-500 dark:text-gray-400">
								Không có khách hàng nào
							</div>
							<ul v-else class="space-y-4">
								<li v-for="user in topCustomer" :key="user.id"
									class="flex flex-col py-1 border-b-2 border-gray-100 dark:border-gray-700">
									<div class="flex items-center gap-3">
										<Avatar v-if="user.avatar" :imageSrc="user.avatar" :name="user.email" :size="40"
											:rounded="true" class="w-10 h-10 right-2" />
										<Avatar v-else :name="user.email" :size="40" :rounded="true"
											class="w-10 h-10 right-2" />
										<!-- USER INFO -->
										<div class="flex flex-col">
											<span
												class="cursor-pointer text-base font-semibold text-gray-700 dark:text-white truncate">
												{{ user.email || "Unknown" }}
											</span>
										</div>
									</div>

									<!-- OXYGEN SCORE -->
									<div
										class="flex items-center justify-between gap-2 text-yellow-500 font-semibold mt-2">
										<span
											class="cursor-pointer text-base font-semibold text-gray-700 dark:text-white">
											{{ user.full_name || "Unknown" }}
										</span>
										<div class="flex items-center gap-2 text-yellow-500 font-semibold">
											<span class="min-w-[2rem]">{{ formatMoney(user.total_count) || 0 }}</span>
											<img src="/assets/icons/coin.svg" alt="coin" class="w-6 h-6" />
										</div>

									</div>
								</li>
							</ul>
						</div>


					</div>

				</div>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<div v-if="statisticProductByType" class="col-span-1">
						<BieuDoTron :titleChart="'Cơ cấu danh mục sản phẩm'" :data="statisticProductByType" />
					</div>

					<div class="col-span-1">
						<div
							class="h-full bg-white dark:bg-gray-800 w-full rounded-lg shadow-md p-10 border border-gray-200 dark:border-gray-700">
							<div class="flex flex-col  items-center mb-6">
								<h3 class="text-lg font-extrabold text-gray-800 dark:text-white">
									Top 5 sản phẩm bán chạy nhất
								</h3>
								<div class="text-gray-800 dark:text-white">Thống kê trong 1 năm</div>

							</div>
							<div v-if="topProduct.length === 0" class="text-gray-500 dark:text-gray-400">
								Không có sản phẩm nào
							</div>
							<ul v-else class="space-y-4">
								<li v-for="item in topProduct" :key="item.id"
									class="flex py-1 border-b-2 space-x-4 border-gray-100 dark:border-gray-700">

									<!-- Hình ảnh sản phẩm -->
									<div class="w-28 h-20 dark:bg-gray-900">
										<img v-if="getPreviewUrl(item.file_path)" :src="getPreviewUrl(item.file_path)"
											alt="Product 1" class="w-full h-full object-contain" />
										<img v-else src="https://readymadeui.com/images/product9.webp" alt="Product 1"
											class="w-full h-full object-contain" />
									</div>

									<!-- Thông tin sản phẩm -->
									<div class="flex justify-between items-center w-full">
										<!-- Tên sản phẩm -->
										<span class="text-lg font-semibold text-gray-700 dark:text-white flex-grow">
											{{ item.name || "Unknown" }}
										</span>

										<!-- Số lượng (nằm sát bên phải) -->
										<span class="text-yellow-500 text-lg font-semibold min-w-[2rem] text-right">
											{{ formatMoney(item.total_quantity) || 0 }}
										</span>
									</div>
								</li>

							</ul>
						</div>


					</div>

				</div>

				<!-- Grid layout -->

				<div v-if="statisticUsers">
					<BieuDoCot :titleChart="'Thống kê người dùng'" :subtitle="'Theo giới tính và độ tuổi'"
						:horizontal="false" :seriesData="statisticUsers?.series"
						:categories="statisticUsers?.categories" />
				</div>
			</div>

		</div>
	</div>
</template>


<script setup>
import { formatMoney, getPreviewUrl } from "@/utils/extensions";
import { ref, computed, onMounted } from "vue";
import apiServices
	from "@/services/api.services";
import Breadcrumb from "@/component/Breadcrumb.vue";
import BieuDoQuaTrinh from "@/component/chart/BieuDoQuaTrinh.vue";
import BieuDoTron from "@/component/chart/BieuDoTron.vue";
import BieuDoTangTruong from "@/component/chart/BieuDoTangTruong.vue";
import BieuDoCot from "@/component/chart/BieuDoCot.vue";
import { ShoppingCart, Truck, UserRound, ShoppingBag, Newspaper, SquareUserRound } from "lucide-vue-next";
import Loading from "@/component/Loading.vue";
import Avatar
	from "@/component/Avatar.vue";
const statisticAll = ref(null);

const getStatisticAll = async () => {
	let result = await apiServices.getStatisticAll();
	if (result.code === 200) {
		statisticAll.value = result.data;
	}
};


const detectDevice = () => {
	const userAgent = navigator.userAgent || window.opera;
	if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
		return false; // Mobile
	}
	return true; // PC
};

const statisticUsers = ref(null)

const getStatisticUsers = async () => {
	let result = await apiServices.getStatisticUsers();
	if (result.code === 200) {
		statisticUsers.value = result.data;
	}
}

const statisticProductByType = ref(null)
const monthDefault = ref(detectDevice() ? 12 : 6);

const getStatisticNumberProductByType = async () => {
	let result = await apiServices.getStatisticNumberProductByType();

	if (result.code === 200) {
		statisticProductByType.value = result.data.result;
	}
};

const statisticSoldProductByType = ref(null)

const statisticRevenueByType = ref(null)

const getstatisticRevenueAndSoldByTypeProduct = async () => {
	let result = await apiServices.getstatisticRevenueAndSoldByTypeProduct(monthDefault.value);
	if (result.code === 200) {
		statisticRevenueByType.value = result.data.chart_data_revenue;
		statisticSoldProductByType.value = result.data.chart_data_sold;
	}
};

const topCustomer = ref([])
const getTopCustomer = async () => {
	let result = await apiServices.getTopCustomer();
	if (result.code === 200) {
		topCustomer.value = result.data;
	}
};

const topProduct = ref([])
const getTopProduct = async () => {
	let result = await apiServices.getTopProduct();
	if (result.code === 200) {
		topProduct.value = result.data;
	}
};


const isLoading = ref(true)
onMounted(async () => {
	await getTopProduct();
	await getStatisticUsers();
	await getStatisticAll();
	await getstatisticRevenueAndSoldByTypeProduct();
	await getStatisticNumberProductByType();
	await getTopCustomer();
	isLoading.value = false
});

</script>


<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
</style>