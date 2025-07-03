<template>
  <div v-if="productData" class="container mx-auto p-6 space-y-6 dark:bg-gray-900">
    <Breadcrumb :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: 'Danh sách sản phẩm', href: '/admin/product' },
            { name: 'Chỉnh sửa sản phẩm', href: '#', current: true }
        ]" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
          <i class="fas fa-box-open mr-2"></i>Thông Tin Sản Phẩm
        </h2>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TÊN SẢN PHẨM <span class="text-red-500">*</span>
            </label>
            <input v-model="productData.name" type="text"
              class="w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GIÁ <span class="text-red-500">*</span>
            </label>
            <input v-model="productData.price" type="number" @wheel.prevent
              class="w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập giá" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lĩnh vực
            </label>
            <SelectOne :type_product_id="productData.type_product_id" :selectList="typeList" @setSelect="setType" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              MÔ TẢ
            </label>
            <textarea v-model="productData.describe" rows="4"
              class="w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả"></textarea>
          </div>
          <button type="button" @click="handleSubmit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
            Cập nhật
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
          <i class="fas fa-images mr-2"></i>Hình Ảnh Sản Phẩm
        </h2>

        <div @drop.prevent="handleDrop" @dragover.prevent
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileSelect" multiple accept="image/*" class="hidden" />
          <div class="space-y-4">
            <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 dark:text-gray-500"></i>
            <p class="text-gray-600 dark:text-gray-400">
              Kéo thả hoặc click để chọn hình ảnh
            </p>
          </div>
        </div>

        <div class="mt-8">
          <draggable v-model="productData.files" class="grid grid-cols-2 md:grid-cols-3 gap-4" item-key="id"
            :animation="200" ghost-class="ghost" drag-class="drag" @end="handleDragEnd">
            <template #item="{ element, index }">
              <div :key="element.id"
                class="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-move dark:bg-gray-700">
                <img :src="getPreviewUrl(element.file_path)" class="w-full h-48 object-cover rounded-lg"
                  :alt="`Preview ${element.id}`" />

                <button @click="removeFile(element.id)"
                  class="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 w-8 h-8 flex items-center justify-center">
                  <i class="fas fa-times text-sm"></i>
                </button>

                <div class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  Ảnh {{ index + 1 }}
                </div>
              </div>
            </template>
          </draggable>

          <div v-if="productData.files.length > 0" class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Đã chọn {{ productData.files.length }} hình ảnh
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "@/component/Breadcrumb.vue";
import { getPreviewUrl } from "@/utils/extensions";
import apiServices from '@/services/api.services';
import { ref, reactive, onMounted } from 'vue'
import SelectOne from "@/component/SelectOne.vue";
import draggable from 'vuedraggable'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter, useRoute } from "vue-router";
// Form data

const route = useRoute();
const router = useRouter();

const productData = ref(null)




const setType = (type) => {
  productData.value.type_product_id = type
}


// File handling
const fileInput = ref(null)

const handleFileSelect = async (event) => {
  const result = await apiServices.uploadFile(event.target.files)
  if (result) {
    addFiles(result.data)
  }
}

const handleDrop = async (event) => {
  const result = await apiServices.uploadFile(event.target.files)
  if (result) {
    addFiles(result.data)
  }
}

const addFiles = (result) => {
  productData.value.files = [...productData.value.files, ...result]
}

const removeFile = (id) => {
  productData.value.files = productData.value.files.filter(file => file.id !== id)
}

const handleDragEnd = () => {
  productData.value.files = productData.value.files.map((file, index) => ({
    ...file,
  }))
}

const handleSubmit = async () => {
  try {
    const body = {
      name: productData.value.name,
      price: productData.value.price,
      describe: productData.value.describe,
      type_product_id: productData.value.type_product_id,
      files: productData.value.files,
    }

    const result = await apiServices.putProduct(productData.value.id ,body);

    // Kiểm tra kết quả và hiển thị thông báo
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
    toast("Something went wrong! Please try again later.", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error'
    });
  }
}

const typeList = ref([])
const getTypeProdct = async () => {
  try {
    const result = await apiServices.getTypeProduct();
    if (result) {
      typeList.value = result.data
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }

};

const getProductDetail = async () => {
  try {
    const result = await apiServices.getProductDetail(route.params.product_id);
    if (result.code === 200) {
      // productData.value = result.data;
      productData.value = {
        id: result.data.id,
        files: result.data.files,
        price: result.data.price,
        name: result.data.name,
        type_product_id: result.data.type_product?.id,
        describe: result.data.describe
      };

    }
  } catch (error) {
    console.error("Error loading product data:", error);
  }
};

onMounted(async () => {
  await getTypeProdct();
  await getProductDetail();
});

</script>

<style>
.drag {
  opacity: 0.5;
  background: #e9ecef;
}

.ghost {
  opacity: 0.5;
  background: #c2e7ff;
  border: 2px dashed #2196f3;
}

.cursor-move {
  cursor: move;
  cursor: grab;
}

.cursor-move:active {
  cursor: grabbing;
}
</style>