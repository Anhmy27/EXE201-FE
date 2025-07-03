<template>
	<div class="flex flex-col min-w-96 min-h-screen antialiased bg-gray-50 dark:bg-gray-900">
		<!-- Navbar -->
		<NavBar class="flex-shrink-0"></NavBar>
		<div class="flex flex-grow">
			<!-- Sidebar -->
			<SideBar class="2xl:translate-x-0 flex-shrink-0"></SideBar>
			<!-- End Sidebar -->

			<main class="w-full 2xl:ml-64">
				<RouterView :key="route.fullPath" />
			</main>
		</div>
		<!-- Footer -->
		<Footer
			class="sticky top-0 z-40 flex-none border-b left-0 right-0 flex-shrink-0 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
		</Footer>
		<!-- End Footer -->
	</div>
</template>

<script setup>
import { onMounted, ref, computed, provide } from "vue";
import NavBar from "../../component/NavBar.vue";
import Footer from "@/component/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import apiServices from "@/services/api.services";
import { initFlowbite } from "flowbite";
import SideBar from "../../component/SideBar.vue";
const route = useRoute();

const userProfile = useStorage("userProfile", { key: "value" });

const textSearch = ref("");
const setTextSearch = (value) => {
	textSearch.value = value;
}

provide("textSearch", textSearch);
provide("setTextSearch", setTextSearch);


onMounted(async () => {
	initFlowbite();
});

</script>
