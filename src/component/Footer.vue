<!-- Footer.vue -->
<template>
	<footer class="bg-white border-t border-gray-200 py-2 w-full">
		<div class="lg:mx-20 mx-4 flex items-center justify-between">
			<div class="flex items-center gap-x-8">
				<img
					class="h-10 w-auto"
					src="/logo.png"
					alt="FPT Logo"
				/>
				<div
					class="hidden lg:block text-sm font-normal text-gray-500 dark:text-gray-400"
				>
					© {{ new Date().getFullYear() }} - C&N. All rights reserved.
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<a
					href="#"
					class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-900 hover:text-gray-800"
				>
					<svg
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<a
					href="#"
					class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-900 hover:text-gray-800"
				>
					<svg
						class="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fill-rule="evenodd"
							d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<a
					href="#"
					class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-900 hover:text-gray-800"
				>
					<img
						class="w-5 h-5"
						src="/assets/icons/tiktok-icon.svg"
						alt=""
					/>
				</a>
			</div>
		</div>
	</footer>
</template>

<script setup>
// You can add any necessary imports or logic here
</script>
