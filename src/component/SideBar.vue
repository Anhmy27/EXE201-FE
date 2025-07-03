<template>
	<aside
		class="group fixed top-0 left-0 z-30 w-64 h-full pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
		aria-label="Sidenav-user" id="drawer-navigation-user">
		<div
			class="overflow-y-hidden group-hover:overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 custom-scrollbar">
			<div>
				<ul class="space-y-2">
					<li v-for="item in menu" :key="item.name">
						<!-- Menu item không có submenu -->
						<router-link v-if="!item.child_path" :to="item.path"
							class="flex items-center p-2 text-lg font-medium text-gray-500 dark:text-gray-400 rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
							<component :is="item.icon" class="w-6 h-6" />
							<span class="ml-3 truncate duration-75">{{ item.name }}</span>
						</router-link>

						<!-- Menu item có submenu -->
						<template v-else>
							<button type="button" @click="toggleMenu(item.name)"
								class="flex items-center w-full p-2 text-base font-medium text-gray-500 dark:text-gray-400 rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
								<component :is="item.icon" class="w-6 h-6" />
								<span class="flex-1 ml-3 text-left truncate">{{ item.name }}</span>
								<ChevronDown class="w-4 h-4 transform transition-transform duration-300 ease-in-out"
									:class="{ 'rotate-180': isMenuOpen(item.name) }" />
							</button>
							<Transition enter-active-class="transition-all duration-300 ease-out"
								leave-active-class="transition-all duration-300 ease-in"
								enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
								leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
								<ul v-show="isMenuOpen(item.name)" class="py-2 space-y-2 pl-11 overflow-hidden">
									<li v-for="child in item.child_path" :key="child.path">
										<router-link :to="child.path" class="flex items-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400 
           rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 
           dark:hover:bg-gray-700 transition-all duration-300 hover:translate-x-1">
											{{ child.name }}
										</router-link>

									</li>
								</ul>
							</Transition>
						</template>
					</li>
				</ul>

			</div>
		</div>
	</aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
	User, ShoppingBag, ChevronDown, Settings, Package, Archive, BookOpen,
	Info,
	Contact
} from "lucide-vue-next";
import apiServices from "@/services/api.services";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";

const openMenus = ref({});

const isMenuOpen = (menuName) => openMenus.value[menuName] || false;

const toggleMenu = (menuName) => {
	openMenus.value[menuName] = !openMenus.value[menuName];
};

const userProfile = useStorage("userProfile", { key: "value" });

const menu = ref([{
	name: "Khám phá",
	path: { name: 'Home' },
	icon: ShoppingBag
},
{
	name: "Giới Thiệu",
	path: { name: 'AboutUs' },
	icon: Info
},
{
	name: "Liên hệ",
	path: { name: 'Contact' },
	icon: Contact
}]);

const menuForUser = ref([
	{
		name: "Đơn hàng",
		path: { name: 'Orders' },
		icon: Archive,
	},

	{
		name: "Khóa học",
		path: { name: 'Courses' },
		icon: BookOpen,
	},
])


const menuForSuperAdmin = ref([
	{
		name: "Dashboard",
		path: { name: 'Dashboard' },
		icon: Settings,
	},
	{
		name: "Quản lý sản phẩm",
		icon: Package,
		child_path: [
			{
				name: "Danh sách sản phẩm",
				path: { name: 'ManageProduct' }

			},
			{
				name: "Danh sách lĩnh vực",
				path: { name: 'ManageTypeProduct' }

			}
		]
	},
	{
		name: "Quản lý đơn hàng",
		icon: ShoppingBag,
		path: { name: 'ManageOrders' },
	},
	{
		name: "Quản lý khách hàng",
		icon: User,
		path: { name: 'ManageCustomer' },
	},
]);

onMounted(async () => {
	if (userProfile.value.is_admin) {
		menu.value = [...menuForSuperAdmin.value];
	} else if (userProfile.value.is_admin == false) {
		menu.value = [...menu.value, ...menuForUser.value]; // Extend the menu with the items for user
	}
});
</script>

<style lang="scss" scoped></style>
