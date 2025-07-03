<template>
  <Modal @close="handleClose">
    <template #header>
      <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
        Chi tiết đơn hàng #{{ props.order.id }}
      </h3>
    </template>

    <template #body>
      <!-- <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div> -->

      <!-- Content -->
      <div v-if="props.order" class="space-y-4 sm:space-y-6">
        <div>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="item in props.order.items" :key="item.id"
              class="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <img :src="getPreviewUrl(item.product.files?.[0]?.file_path)" :alt="item.product.name"
                  class="w-full h-full object-cover rounded-lg">
              </div>
              <div class="flex-1 min-w-0">
                <h5 class="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
                  {{ item.product.name }}
                </h5>
                <div class="mt-1.5 sm:mt-2 text-right">
                  <span class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                    {{ formatNumberWithCommas(item.price) }}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tổng tiền -->
        <div class="border-t dark:border-gray-700 pt-3 sm:pt-4">
          <div class="space-y-1.5 sm:space-y-2">
            <div class="flex justify-between text-sm sm:text-base pt-2 border-t dark:border-gray-700">
              <span class="font-medium text-gray-900 dark:text-white">Tổng cộng:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatNumberWithCommas(props.order.count)
              }}đ</span>
            </div>
          </div>

          <div class="space-y-1.5 sm:space-y-2">
            <div class="flex justify-between text-sm sm:text-base pt-2 border-t dark:border-gray-700">
              <span class="font-medium text-gray-900 dark:text-white">Thời gian mua:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatDateTime(props.order.created_date) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <div class="flex items-center justify-center gap-3">
          <img :src="getPaymentInfo" alt="payment method" width="30" height="30" />
          <img src="/assets/icons/is_paid.png" alt="check" width="70" height="80" />
        </div>
        <button @click="handleClose"
          class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-600">
          Đóng
        </button>
      </div>

    </template>
  </Modal>
</template>

<script setup>
import { computed } from 'vue'
import Modal from '@/component/Modal.vue'
import { getPreviewUrl, formatNumberWithCommas, formatDateTime } from "@/utils/extensions"

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const type_payment = {
  PAYMENT_MOMO: 'momo',
  PAYMENT_ZALO: 'zalo'
}

const listPayment = [
  {
    "image": "/assets/icons/momo.svg",
    "type": type_payment.PAYMENT_MOMO,
    "text": "Thanh toán ví MOMO"
  },
  {
    "image": "/assets/icons/zalo.png",
    "type": type_payment.PAYMENT_ZALO,
    "text": "Thanh toán ví ZALO"
  },
]

const getPaymentInfo = computed(() => {

  if (props.order.payment_online?.type) {
    const paymentMethod = listPayment.find(
      (item) => item.type === props.order.payment_online?.type
    );
    return paymentMethod ? paymentMethod.image : "/assets/icons/zalo.png";
  }
  return "/assets/icons/zalo.png";
});

const emit = defineEmits(['close'])

const fullAddress = computed(() => {
  if (!props.order.address) return ''
  const { detail_address, address } = props.order

  const addressParts = [
    detail_address ? detail_address : null,
    address.ward,
    address.district,
    address.province
  ].filter(Boolean) // Loại bỏ phần tử null hoặc undefined

  return addressParts.join(', ')
})



const handleClose = () => {
  emit('close')
}
</script>