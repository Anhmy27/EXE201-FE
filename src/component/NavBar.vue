<template>
	<nav
		class="sticky top-0 z-40 flex-none mx-auto w-full bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 left-0 right-0">
		<div class="flex flex-wrap justify-between items-center">
			<!-- Logo section -->
			<div class="flex items-center">
				<button data-drawer-target="drawer-navigation-user" data-drawer-toggle="drawer-navigation-user"
					aria-controls="drawer-navigation-user"
					class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer 2xl:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
					<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"></path>
					</svg>
					<svg aria-hidden="true" class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"></path>
					</svg>
					<span class="sr-only">Toggle sidebar</span>
				</button>
				<a :href="userProfile.param_router && userProfile.param_router !== 'unfile' ? userProfile.param_router : '/'"
					class="items-center justify-between mr-4">
					<img src="/logo.png" class="mr-3 h-10" alt="Flowbite Logo" />
				</a>
			</div>

			<!-- Search Box - Full width on mobile -->
			<div v-if="ShowSearch" class="flex-1 mx-4">
				<div class="relative">
					<!-- Desktop Search -->
					<div class="hidden lg:block">
						<div class="relative md:w-96">
							<button type="button"
								class="p-2 mr-1 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
								<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path clip-rule="evenodd" fill-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
									</path>
								</svg>
							</button>
							<input type="text" v-model="searchQuery" @focus="showSuggestions = true" @blur="handleBlur"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Tìm kiếm..." />
							<button @click="handleSearch"
								class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
									</path>
								</svg>
							</button>

							<!-- Desktop Suggestions -->
							<!-- <div v-show="showSuggestions && searchQuery"
								class="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
								<div v-for="(item, index) in filteredSuggestions" :key="index"
									class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
									@mousedown="selectSuggestion(item)">
									<div class="flex items-center">
										<img :src="item.image" class="w-10 h-10 rounded-md mr-3" :alt="item.title">
										<div>
											<div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title
												}}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">{{ item.category }}
											</div>
										</div>
									</div>
								</div>
							</div> -->
						</div>
					</div>

					<!-- Mobile Search -->

					<!-- Mobile Fullscreen Search -->
					<div v-if="isFullScreen" class="fixed inset-0 z-50 bg-white dark:bg-gray-900">
						<div class="flex items-center p-4 border-b dark:border-gray-700">
							<button @click="isFullScreen = false"
								class="p-2 -ml-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M15 19l-7-7 7-7"></path>
								</svg>
							</button>
							<div class="relative flex-1 mx-2">
								<input type="text" v-model="searchQuery" autofocus
									class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-4 pr-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
									placeholder="Tìm kiếm..." />
								<button @click="handleSearch"
									class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
										</path>
									</svg>
								</button>
							</div>
						</div>

						<!-- Mobile Suggestions -->
						<!-- <div class="p-4">
							<div v-if="searchQuery" class="mt-2">
								<div v-for="(item, index) in filteredSuggestions" :key="index"
									class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg mb-2"
									@click="selectSuggestion(item)">
									<div class="flex items-center">
										<img :src="item.image" class="w-12 h-12 rounded-md mr-3" :alt="item.title">
										<div>
											<div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title
												}}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">{{ item.category }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>

			<!-- Right side icons -->
			<div class="flex items-center">
				<div v-if="ShowSearch" class="lg:hidden flex items-center">
					<div class="relative flex-1">
						<button @click="isFullScreen = true" type="button"
							class="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
							<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path clip-rule="evenodd" fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
								</path>
							</svg>
						</button>
					</div>
				</div>
				<ThemeToggle />
				<NavBarProfile />
				<router-link v-if="!userProfile.id && $route.name !== 'Login'" :to="{ name: 'Login' }">
					<button
						class="flex items-center border-b-2 border-transparent hover:border-black dark:hover:border-white text-gray-800 dark:text-white ml-2">
						Đăng nhập
					</button>
				</router-link>

			</div>
		</div>
	</nav>
</template>

<script setup>
import NavBarProfile from "@/component/NavBarProfile.vue";
import ThemeToggle from "@/component/ThemeToggle.vue";
import { useStorage } from "@vueuse/core";
import { onMounted, ref, computed, inject, provide } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { eventBus } from "@/utils/eventBus.js";

const setTextSearch = inject("setTextSearch", null);

const userProfile = useStorage("userProfile", { key: "value" });


const route = useRoute();
const router = useRouter();
const ShownRoutes = ["Home", "ManageProduct", "ManageOrders", "ManageTypeProduct", "ManageCustomer", "Courses"];
const ShowSearch = computed(() => ShownRoutes.includes(route.name));

const searchQuery = ref('')
const showSuggestions = ref(false)
const isFullScreen = ref(false)

// Dữ liệu mẫu cho gợi ý
const suggestions = [
	{
		title: 'iPhone 14 Pro Max',
		category: 'Điện thoại',
		image: 'https://picsum.photos/100/100?1'
	},
	{
		title: 'MacBook Pro M2',
		category: 'Laptop',
		image: 'https://picsum.photos/100/100?2'
	},
	{
		title: 'iPad Air',
		category: 'Máy tính bảng',
		image: 'https://picsum.photos/100/100?3'
	}
]

const filteredSuggestions = computed(() => {
	if (!searchQuery.value) return []
	return suggestions.filter(item =>
		item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
		item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

const handleBlur = () => {
	setTimeout(() => {
		showSuggestions.value = false
	}, 200)
}

const handleSearch = () => {
	if (setTextSearch) {
		
		isFullScreen.value = false
		setTextSearch(searchQuery.value)
		eventBus.triggerClick();
		
	}
}

const selectSuggestion = (item) => {
	searchQuery.value = item.title
	showSuggestions.value = false
	isFullScreen.value = false
	console.log('Đã chọn:', item)
}

onMounted(() => {

});
</script>

<style lang="scss" scoped></style>
