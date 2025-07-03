<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      class="relative bg-black bg-opacity-50 backdrop-blur-md w-full h-full flex flex-col items-center justify-center max-w-full p-4">

      <!-- Nút Zoom In, Zoom Out và Đóng -->
      <div class="absolute top-4 right-4 flex space-x-4 z-10">
        <button @click="zoomIn"
          class="p-2 bg-gray-200 dark:bg-gray-400 rounded-full transition-transform duration-150 transform hover:scale-105 active:scale-95 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-white">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
              d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </button>

        <button @click="zoomOut"
          class="p-2 bg-gray-200 dark:bg-gray-400 rounded-full transition-transform duration-150 transform hover:scale-105 active:scale-95 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-white">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
              d="m21 21-3.5-3.5M7 10h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </button>

        <button @click="closePopup"
          class="p-2 bg-gray-200 dark:bg-gray-400 rounded-full transition-transform duration-150 transform hover:scale-105 active:scale-95 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-center overflow-hidden h-full w-full">
        <div ref="popupImage" class="flex items-center justify-center h-full w-full">
          <img :src="imageUrl" class="object-cover max-h-full w-auto" alt="Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Panzoom from '@panzoom/panzoom';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);
const popupImage = ref(null);

let panzoomInstance = null;

onMounted(() => {
  if (popupImage.value) {
    panzoomInstance = Panzoom(popupImage.value, {
      maxScale: 10,
      contain: 'outside',
      bounds: true, // Bật chế độ giới hạn
      boundsPadding: 0,
    });
  }
});


const zoomIn = () => {
  if (panzoomInstance) {
    panzoomInstance.zoomIn()
  }
};

// Zoom Out function
const zoomOut = () => {
  if (panzoomInstance) {
    panzoomInstance.zoomOut();
  }
};

const closePopup = () => {
  emit('close');
  if (panzoomInstance) {
    panzoomInstance.reset();
  }
};
</script>

<style scoped></style>