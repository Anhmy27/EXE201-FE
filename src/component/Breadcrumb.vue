<template>
	<nav class="flex" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
			<!-- Mặc định hiển thị Home nếu không có items -->
			<template v-if="!items || items.length === 0">
				<li class="inline-flex items-center">
					<a href="/"
						class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
						<svg class="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
							fill="currentColor" viewBox="0 0 20 20">
							<path
								d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
						</svg>
						Trang chủ
					</a>
				</li>
			</template>

			<!-- Hiển thị items nếu được truyền vào -->
			<template v-else>
				<li v-for="(item, index) in items" :key="index" 
						class="inline-flex items-center">
					<!-- Item đầu tiên (Home) -->
					<template v-if="index === 0">
						<a :href="item.href"
							class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-600 uppercase">
							<svg class="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" viewBox="0 0 20 20">
								<path
									d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
							</svg>
							{{ item.name }}
						</a>
					</template>
					
					<!-- Các item khác -->
					<template v-else>
						<!-- Mũi tên separator -->
						<svg class="mx-2 h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="2" d="m9 5 7 7-7 7" />
						</svg>
						
						<!-- Item không phải cuối -->
						<a v-if="!item.current" 
							:href="item.href"
							class="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-600 uppercase ">
							{{ item.name }}
						</a>
						
						<!-- Item cuối -->
						<span v-else 
							class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
							{{ item.name }}
						</span>
					</template>
				</li>
			</template>
		</ol>
	</nav>
</template>

<script>
export default {
	name: 'Breadcrumb',
	props: {
		items: {
			type: Array,
			required: false,
			default: () => []
		}
	}
}
</script>

<style lang="scss" scoped></style>
