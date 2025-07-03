<template>
  <div class="p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="grid grid-cols-1 gap-4 items-stretch">

      <!-- Tên bài giảng -->
      <div class="flex flex-col justify-between h-full">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên bài giảng</label>
          <input v-model="session.name" type="text" placeholder="Nhập tên bài giảng"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
        </div>
      </div>

      <!-- Upload file video -->
      <div class="flex flex-col justify-between h-full">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File video (.mp4)</label>
          <input type="file" accept=".mp4" @change="handleFileChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          <p v-if="session.file_name" class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Đã chọn: {{ session.file_name }} - {{ session.file_id }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue'
import apiServices from '@/services/api.services'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'


const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    Swal.fire({
      title: 'Đang upload file...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })


    const result = await apiServices.uploadfileMp4(file)
    Swal.close()

    if (result.code === 200) {
      props.session.file_name = result.data.file_name
      props.session.file_id = result.data.file_id
      toast("Upload thành công!", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success',
      });
    } else {
      toast(result.message.text || "Lỗi upload file", {
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
    console.error('Lỗi khi upload file:', error)
    alert('Tải lên file thất bại. Vui lòng thử lại.')
  }
}
</script>
