<template>
  <div v-if="show" class="fixed inset-0 z-50 flex justify-end">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closePopup"
      :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }">
    </div>

    <!-- Sidebar content -->
    <div
      class="relative flex flex-col bg-white dark:bg-gray-900 h-full w-full max-w-md shadow-2xl transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }">

      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Thêm vào giỏ hàng</h2>
        <button @click="closePopup" class="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto p-4">
        <!-- Product info -->
        <div class="flex flex-col gap-4">
          <div class="relative group overflow-hidden rounded-xl">
            <img
              :src="product?.files?.[0]?.file_path ? getPreviewUrl(product.files[0].file_path) : 'https://readymadeui.com/images/product9.webp'"
              :alt="product?.name"
              class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110">

          </div>

          <h3 class="text-xl flex justify-center font-bold text-gray-800 mb-2 dark:text-white">{{ product?.name }}</h3>


          <div class="text-2xl flex justify-center font-bold text-red-600 mb-2 dark:text-white">{{
            formatNumberWithCommas(product?.price) }}đ</div>


        </div>
      </div>

      <!-- Fixed bottom section -->
      <div class="border-t dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <!-- Total -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600 dark:text-gray-400 font-medium">Tổng :</span>
          <span class="text-xl font-bold text-primary-700 dark:text-primary-500">
            {{ formatNumberWithCommas(product?.price) }}đ
          </span>
        </div>

        <!-- Add to cart button -->
        <button @click="addToCart"
          class="w-full py-4 rounded-xl font-medium transform transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-2"
          :class="[
           'bg-primary-700 text-white hover:bg-primary-800 hover:-translate-y-0.5 focus:ring-primary-500'
              
          ]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>{{ titleButton }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getPreviewUrl, formatNumberWithCommas } from "@/utils/extensions";

const props = defineProps({
  show: {
    type: Boolean,
  },
  cartItem: {
    type: Object,
    default: null
  },
  product: {
    type: Object,
  },
  titleButton: {
    type: String,
    default: 'Thêm vào giỏ hàng'
  },
});

const emit = defineEmits(['close', 'addToCart']);
const quantity = ref(1);
const selectedSize = ref(null);
const selectedColor = ref(null);
const isOpen = ref(false);

// Reset selections when product changes
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    selectedSize.value = props.cartItem && props.cartItem.size?.id
      ? props.cartItem.size.id
      : newProduct.sizes?.[0]?.id || null;

    selectedColor.value = props.cartItem && props.cartItem.color?.id
      ? props.cartItem.color.id
      : newProduct.colors?.[0]?.id || null;

    quantity.value = props.cartItem && props.cartItem.quantity
      ? props.cartItem.quantity
      : 1;
  }
});

watch(() => props.show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      isOpen.value = true;
    }, 50);
  } else {
    isOpen.value = false;
  }
});

const closePopup = () => {
  isOpen.value = false;
  setTimeout(() => {
    emit('close');
    quantity.value = 1;
    selectedSize.value = null;
    selectedColor.value = null;
  }, 300);
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const addToCart = () => {
  // Tạo đối tượng dữ liệu cần gửi
  const cartData = {
    product_id: props.product?.id,
  };

  // Chỉ thêm cart_id nếu nó khác null
  if (props.cartItem !== null) {
    cartData.cart_id = props.cartItem.id;
  }

  // Gửi dữ liệu qua emit
  emit('addToCart', cartData);

  // Đóng popup sau khi thêm vào giỏ
  closePopup();
};
</script>

<style scoped>
.transform {
  transition-property: transform, opacity;
  transition-duration: 300ms;
}

.group-color:hover .absolute {
  transition: opacity 0.2s ease-in-out;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>