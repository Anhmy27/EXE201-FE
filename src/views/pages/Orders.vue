<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <Breadcrumb :items="[
        { name: 'KHÁM PHÁ', href: '/' },
        { name: 'Hóa đơn', href: '/#', current: true },
      ]" />
    </div>
    <!-- Main Content -->
    <div class="space-y-4">
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
      </div>
      <div v-else-if="orders.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        Bạn chưa đặt đơn hàng nào
      </div>
      <OrderCard v-else v-for="order in orders" :order="order" />
      <div class="flex justify-center py-4 mt-5">
        <Pagination v-if="orders.length > 0" :page="params.page" :totalPage="totalPage" :nextPage="nextPage"
          :prevPage="prevPage" @setPage="setPage"></Pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@/component/Breadcrumb.vue'
import OrderCard from '@/component/OrderCard.vue'
import apiService from '@/services/api.services'
import Pagination from '@/component/Pagination.vue'


const route = useRoute()
const isLoading = ref(false)
const orders = ref([])

const params = ref({
  page: 1,
  page_size: 10,
  sort: 'desc',
  order_by: 'created_date'
})
const totalPage = ref(1);
const nextPage = ref(null);
const prevPage = ref(null);

const fetchOrders = async () => {
  try {
    isLoading.value = true
    const response = await apiService.getOrder(params.value)
    if (response.code === 200) {
      orders.value = response.data.items || []
      totalPage.value = response.data.total_pages;
      nextPage.value = response.data.has_next;
      prevPage.value = response.data.has_previous;
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    orders.value = []
    totalPage.value = 0
  } finally {
    // Đảm bảo isLoading luôn được set về false sau khi xử lý xong
    isLoading.value = false
  }
}

const setPage = async (page) => {
  params.value.page = page
  await fetchOrders();
}


onMounted(() => {
  fetchOrders()
})
</script>