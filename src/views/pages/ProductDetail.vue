<template>
  <Picture v-if="imageUrl" :image-url="imageUrl" :is-visible="imageUrl !== null" @close="handleClose">
  </Picture>
  <div v-if="dataProductDetail" class="container max-w-5xl mx-auto px-4 sm:px-12 md:px-28 py-8 dark:bg-gray-900">
    <Breadcrumb :items="[
      { name: 'KHÁM PHÁ', href: '/' },
      { name: 'KHÓA HỌC ' + dataProductDetail?.name, href: '#', current: true }
    ]" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
      <!-- Phần hình ảnh sản phẩm -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Ảnh chính với nút điều hướng -->
        <div class="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
          <img @click="handleImageClick" v-if="getPreviewUrl(currentImage)" :src="getPreviewUrl(currentImage)"
            :alt="dataProductDetail.name" class="w-full h-full object-contain" />
          <img v-else src="https://readymadeui.com/images/product9.webp" :alt="dataProductDetail.name"
            class="w-full h-full object-contain" />

          <!-- Nút điều hướng -->

          <button v-if="currentImageIndex > 0" @click="prevImage"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button v-if="currentImageIndex < dataProductDetail.files.length - 1" @click="nextImage"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black dark:bg-gray-400 bg-opacity-50 text-white p-2 rounded-full shadow-lg transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <!-- Image Dots Indicator -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <button v-for="(_, index) in dataProductDetail.files" :key="index" @click="goToImage(index)"
              class="w-2 h-2 rounded-full transition-all duration-200" :class="[
                currentImageIndex === index
                  ? 'bg-blue-600 w-4'
                  : 'bg-gray-400 hover:bg-gray-600'
              ]"></button>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex flex-col justify-between h-full lg:col-span-1">
        <div class="space-y-4 lg:space-y-8">
          <!-- Product Title & Price -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white uppercase">
            {{ dataProductDetail.name }}
          </h1>
          <div>
            <span class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {{ formatNumberWithCommas(dataProductDetail.price) }}
              <span class="text-base md:text-lg align-top underline">đ</span>
            </span>
          </div>
          <div class="prose dark:prose-invert max-w-none">
            <h2 class="text-xl font-semibold">Mô tả:</h2>
            <p class="text-gray-600 dark:text-gray-300 break-words">{{ truncateText(dataProductDetail.describe) }}</p>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <div>
          <button @click="AddToCart"
            class="w-full py-4 px-4 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

    </div>
    <div v-if="dataProductDetail?.session_courses && dataProductDetail?.session_courses.length > 0" class="mt-12 border border-gray-500 dark:border-gray-300 p-4">
      <h1 class="text-xl font-bold mb-4 dark:text-gray-300">Lộ trình khóa học</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="(item, index) in dataProductDetail.session_courses" :key="item.id" class="flex items-center gap-2">
          <NotebookPen class="w-5 h-5 mt-[1px] text-gray-700 dark:text-gray-300"></NotebookPen>
          <div class="dark:text-gray-300">{{ index + 1 }}. {{ item.name }}</div>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import apiServices from '@/services/api.services';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Breadcrumb from '@/component/Breadcrumb.vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import { NotebookPen } from 'lucide-vue-next';
import { getPreviewUrl, formatNumberWithCommas } from "@/utils/extensions";
import Picture from '@/component/Picture.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { truncateText } from '@/utils/extensions.js';
const route = useRoute();
const router = useRouter();

const dataProductDetail = ref(null);
const currentImage = ref(null);
const currentImageIndex = ref(0);
const quantity = ref(1);


const getProductDetail = async () => {
  try {
    const result = await apiServices.getProductDetail(route.params.product_id);
    if (result.code === 200) {
      dataProductDetail.value = result.data;
      currentImage.value = result.data.files[0]?.file_path;
    }
  } catch (error) {
    console.error("Error loading product data:", error);
  }
};


const nextImage = () => {
  if (currentImageIndex.value < dataProductDetail.value.files.length - 1) {
    currentImageIndex.value++;
    currentImage.value = dataProductDetail.value.files[currentImageIndex.value].file_path;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    currentImage.value = dataProductDetail.value.files[currentImageIndex.value].file_path;
  }
};

const goToImage = (index) => {
  currentImageIndex.value = index;
  currentImage.value = dataProductDetail.value.files[index].file_path;
};

const AddToCart = async () => {
  const body = {
    product_id: route.params.product_id,
  }
  try {
    const result = await apiServices.postItemInCard(body);
    if (result.code === 200) {
      toast(result.message.text || "Product added successfully!", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success',
      });

    } else {
      toast(result.message.text || "An error occurred. Please try again.", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error'
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const imageUrl = ref(null);

const handleImageClick = (event) => {
  if (event.target.tagName === 'IMG') {
    const newUrl = event.target.src;
    if (newUrl) {
      imageUrl.value = newUrl;
    }
  }
};

const handleClose = () => {
  imageUrl.value = null;
};


onMounted(async () => {
  await getProductDetail();
});
</script>