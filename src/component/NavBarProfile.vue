<template>
	<button type="button"
		class="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
		:class="{ 'ml-2': userProfile.id }" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
		<span class="sr-only">Open user menu</span>
		<Avatar v-if="userProfile.id" :imageSrc="getPreviewUrl(userProfile?.avatar?.file_path)" class="flex-none" :name="userProfile.email" :size="32" :rounded="true" />

	</button>
	<!-- Dropdown menu -->
	<div class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
		id="dropdown">
		<div class="py-3 px-4">
			<span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ userProfile.full_name }}</span>
		</div>
		<ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
			<li>
				<router-link :to="{ name: 'UpdateProfile' }"
					class="block flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
					<component class="w-4 h-4 text-gray-400 mr-3" :is="UserRoundPen"></component>
					Thay đổi thông tin</router-link>
			</li>
		</ul>
		<ul v-if="!userProfile?.is_admin" class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
			<li>
				<router-link :to="{ name: 'Cart' }"
					class="block py-2 flex items-center px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
					<ShoppingCart class="w-4 h-4 text-gray-400 mr-3"></ShoppingCart>

					Giỏ hàng</router-link>
			</li>
		</ul>

		<ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
			<li>
				<a
					class="block flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					@click.prevent="logout">
					<LogOut class="w-4 h-4 text-gray-400 mr-3"></LogOut>
					Đăng xuất
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import ApiService from "@/services/api.services";
import { useStorage } from "@vueuse/core";
import Avatar from "@/component/Avatar.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { LogOut, UserRoundPen, ShoppingCart, CircleUserRound, Send } from "lucide-vue-next";
import { getPreviewUrl, formatNumberWithCommas } from "@/utils/extensions";

const userProfile = useStorage("userProfile", { key: "value" });
const router = useRouter();
const logout = async () => {
	const res = await ApiService.logOut();
};
</script>

<style lang="scss" scoped></style>
