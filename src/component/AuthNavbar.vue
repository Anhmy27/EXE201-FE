<template>
	<nav
		class="sticky top-0 z-40 flex-none mx-auto w-full bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 left-0 right-0">
		<div class="flex flex-wrap justify-between items-center">
			<div class="flex justify-start items-center">
				<a href="/"
					class="items-center justify-between mr-4">
					<img src="/logo.png" class="mr-3 h-10" alt="Flowbite Logo" />
				</a>
			</div>
			<div class="flex items-center lg:order-2">
				<ThemeToggle></ThemeToggle>
			</div>
		</div>
	</nav>
</template>

<script setup>
import ThemeToggle from "@/component/ThemeToggle.vue";

</script>

<style lang="scss" scoped></style>
