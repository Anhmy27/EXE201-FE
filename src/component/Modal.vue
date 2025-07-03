<template>
  <div class="fixed inset-0 z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <!-- Modal container -->
    <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-2">
      <div :class="[
        'relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 max-h-[80vh] flex flex-col',
        bigw
          ? 'w-full p-2 lg:max-w-4xl xl:max-w-4xl'
          : 'sm:w-full sm:max-w-lg'
      ]">
        <!-- Header -->
        <div class="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <slot name="header"></slot>
          <button @click="$emit('close')" class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">Đóng</span>
            <XIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-4 py-4 flex-1 overflow-y-auto">
          <slot name="body"></slot>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon } from 'lucide-vue-next'

defineProps({
  bigw: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>
