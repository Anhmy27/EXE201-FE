<template>
  <div
    class="border dark:border-gray-700 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-3 sm:mb-4">
      <h3 class="font-medium text-sm sm:text-base md:text-lg text-gray-900 dark:text-white">
        Đơn hàng #{{ order?.id }}
      </h3>
      <div class="flex items-center justify-between sm:justify-start gap-2">
        <button @click="handleViewDetail"
          class="px-2.5 py-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          Chi tiết
        </button>
      </div>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-if="order.items.length > 0" class="space-y-4">
      <!-- Sản phẩm đầu tiên -->
      <div class="flex gap-3 md:gap-4 py-3 md:py-4"
        :class="{ 'border-b dark:border-gray-700': order.items.length > 1 }">
        <div class="w-20 h-20 md:w-32 md:h-32 flex-shrink-0">
          <img :src="getPreviewUrl(order?.items[0]?.product?.files[0]?.file_path)"
            class="w-full h-full object-cover rounded-lg">
        </div>

        <div class="flex-1 min-w-0">
          <div class="space-y-2">
            <router-link :to="{ name: 'ProductDetail', params: { product_id: order?.items[0]?.product?.id } }" class="font-medium text-sm md:text-base text-gray-900 dark:text-white truncate uppercase hover:underline">
              {{ order?.items[0]?.product?.name }}
            </router-link>
          </div>

          <div class="mt-2 md:mt-3 flex justify-end items-center gap-2">
            <span class="text-base md:text-lg font-medium text-gray-900 dark:text-white">
              {{ formatNumberWithCommas(order?.items[0]?.price) }}₫
            </span>
          </div>
        </div>
      </div>

      <!-- Các sản phẩm khác (hiển thị khi showMore = true) -->
      <template v-if="showMore">
        <div v-for="(item, index) in order.items.slice(1)" :key="item.id"
          class="flex gap-3 md:gap-4 py-3 md:py-4 border-b dark:border-gray-700 last:border-0">
          <div class="w-20 h-20 md:w-32 md:h-32 flex-shrink-0">
            <img :src="getPreviewUrl(item?.product?.files[0]?.file_path)" class="w-full h-full object-cover rounded-lg">
          </div>

          <div class="flex-1 min-w-0">
            <div class="space-y-2">
              <router-link :to="{ name: 'ProductDetail', params: { product_id: item?.product?.id } }" class="font-medium text-sm md:text-base text-gray-900 dark:text-white truncate uppercase hover:underline">
                {{ item.product.name }}
              </router-link>
            </div>

            <div class="mt-2 md:mt-3 flex justify-end items-center gap-2">
              <span class="text-base md:text-lg font-medium text-gray-900 dark:text-white">
                {{ formatNumberWithCommas(item?.price) }}₫
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- Nút Xem thêm (chỉ hiển thị khi có nhiều hơn 1 sản phẩm) -->
      <div v-if="order.items.length > 1" class="mt-2 md:mt-3 flex justify-center">
        <button @click="toggleShowMore"
          class="flex items-center gap-1 text-xs md:text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          <span>{{ showMore ? 'Thu gọn' : 'Xem thêm' }}</span>
          <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': showMore }" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-500">
      Không có sản phẩm nào trong đơn hàng
    </div>

    <!-- Footer: Tổng tiền -->
    <div class="mt-3 flex justify-between flex-wrap md:mt-4 pt-3 md:pt-4 border-t dark:border-gray-700">
      <div class="text-gray-700 dark:text-gray-200">
        {{ formatDateTime(order?.created_date) }}
      </div>
      <div class="flex justify-end items-center gap-2">
        <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Tổng số tiền({{ order?.items?.length }} sản phẩm):
        </div>
        <div class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          {{ formatNumberWithCommas(order?.count) }}₫
        </div>
      </div>
    </div>

    <!-- Thêm OrderDetailModal -->
    <OrderDetailModal v-if="showDetailModal" :order="order" @close="showDetailModal = false" />
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import OrderDetailModal from './OrderDetailModal.vue'
import { getPreviewUrl, formatNumberWithCommas, formatDateTime } from "@/utils/extensions";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiServices from '@/services/api.services';
const props = defineProps({
  order: {
    type: Object,
    required: true,
  }
})
const showMore = ref(false)
const showDetailModal = ref(false)

const emit = defineEmits(['isUpdateOrder']);


const toggleShowMore = () => {
  showMore.value = !showMore.value
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
    case 'delivering':
      return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300'
    case 'resolved':
      return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
    default:
      return ''
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Chờ xác nhận'
    case 'delivering':
      return 'Đang giao hàng'
    case 'resolved':
      return 'Đã giao'
    default:
      return ''
  }
}

const handleComplete = async () => {
  try {
    const res = await apiServices.completeOrder(props.order.id);
    if (res.code === 200) {
      toast(res.message.text ||"Cập nhật thành công", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success'
      });
      emit('isUpdateOrder');

    } else {
      toast.error(res.message.text ||"Có lỗi xảy ra", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      });
    }
  } catch (error) {
    console.log(error)
  }
}


const handleViewDetail = () => {
  showDetailModal.value = true
}
</script>