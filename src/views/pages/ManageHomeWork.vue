<template>
    <Loading v-if="isLoading"></Loading>
    <section v-else class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12">
        <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: productData?.name, href: '/manage/product/' },
            { name: 'Bài giảng', href: '#', current: true }
        ]" />
        <div class="mx-auto max-w-screen-2xl lg:px-6">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
                <div
                    class="flex justify-between dark:bg-gray-800 bg-white  border border-gray-200 dark:border-gray-700 flex items-center py-2 rounded-t-xl">
                    <div class="flex gap-2">
                        <button v-if="selectedHomeWork.length > 0" @click="deleteListHomeWork"
                            class="rounded-md px-4 py-1 text-white bg-red-500 shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 text-center">
                            Xóa
                        </button>
                    </div>
                    <div class="flex gap-2 mr-2">
                        <div @click="openPopupCreateHomeWork = true"
                            class="w-full rounded-md flex items-center border border-gray-200 dark:border-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-700 text-gray-900 justify-center dark:text-white text-center px-4 py-2">
                            Tạo mới
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                <th class="p-4 w-24">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" v-model="selectAll"
                                            @change="toggleSelectAll"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 dark:bg-gray-800 dark:border-gray-600">
                                    </div>
                                </th>
                                <th class="px-4 text-left py-2">
                                    Tên
                                </th>

                                <th class="px-4 text-left py-2">
                                    SỐ CÂU HỎI
                                </th>

                                <th class="px-4 text-left py-2">
                                    MÔ TẢ
                                </th>

                                <th class="px-4 text-left w-28 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(homework, index) in dataHomeWorks" :key="homework.id"
                                class="bg-white border-b dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input :id="'checkbox-table-search-' + index" type="checkbox"
                                            :checked="selectedHomeWork.includes(homework.id)"
                                            @change="toggleSessionSelection(homework.id, $event.target.checked)"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 dark:bg-gray-700 dark:border-gray-600">
                                    </div>
                                </td>

                                <td class="px-4 py-3 whitespace-nowrap">{{ homework.name }}</td>
                                <td class="px-4  py-3 whitespace-nowrap">{{ homework.len_question }}</td>
                                <td class="px-4  py-3 whitespace-nowrap">{{ homework.description }}</td>

                                <td class="px-4 py-3 h-full">
                                    <button :id="`${homework.id}-dropdown-button`"
                                        :data-dropdown-toggle="`${homework.id}-dropdown`"
                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div :id="`${homework.id}-dropdown`"
                                        class="hidden z-20 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            :aria-labelledby="`${homework.id}-dropdown-button`">
                                             <li>
                                                <router-link
                                                    :to="{ name: 'ManageHomeWorkDetail', params: { product_id: homework?.product?.id, home_work_id: homework?.id } }"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cập
                                                    nhật</router-link>
                                            </li>
                                            <li>
                                                <button @click="deleteHomeWork(homework.id, homework.name)"
                                                    class="block text-left py-2 w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xóa</button>
                                            </li>

                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="dataHomeWorks.length === 0"
                    class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic">
                    Không có bài giảng nào
                </div>
                <div v-else
                    class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
                    <div class="flex items-center text-gray-600 dark:text-gray-300">
                        Hiển thị
                        <span v-if="dataHomeWorks.length > 0" class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{
                            1
                            *
                            params.page }}-{{
                                dataHomeWorks.length
                                * params.page
                            }} of</span>
                        <span class="text-gray-700 dark:text-gray-200 font-bold"
                            :class="{ 'ml-1': dataHomeWorks.length === 0 }">
                            {{ pagination.count }}
                        </span>
                    </div>

                    <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                        :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

                </div>
            </div>
        </div>

    </section>

    <Modal v-if="openPopupCreateHomeWork" @close="openPopupCreateHomeWork = false">
        <template #header>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                THÊM BÀI TẬP
            </h3>
        </template>

        <!-- Body -->
        <template #body>
            <div class="space-y-4">
                <div
                    class="p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow">
                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bài
                                tập</label>
                            <input v-model="newDataHomeWork.name" type="text" placeholder="Nhập tên bài tập"
                                class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mô tả</label>
                            <textarea v-model="newDataHomeWork.description" type="text" placeholder="Nhập mô tả"
                                class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <button @click="openPopupCreateHomeWork = false"
                    class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-600">
                    Đóng
                </button>
                <button @click="postHomeWork"
                    class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Tạo
                </button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Breadcrumb from "@/component/Breadcrumb.vue";
import 'flowbite'
import Modal from "@/component/Modal.vue";

function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}

const productData = ref(null)
const getProductDetail = async () => {
    try {
        const result = await apiServices.getProductDetail(route.params.product_id);
        if (result.code === 200) {
            productData.value = result.data;
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};


// Gọi khi component mount lần đầu
onMounted(async () => {
    isLoading.value = true;
    await getProductDetail();
    await getHomeWork();
    initDropdowns()
    isLoading.value = false;
})
const dataHomeWorks = ref([]);

const openPopupCreateHomeWork = ref(false);
const newDataHomeWork = ref({
    name: '',
    description: ''
});
const postHomeWork = async () => {
    try {

        const result = await apiServices.postHomeWork(route.params.product_id, newDataHomeWork.value);
        if (result?.code === 200) {
            await getHomeWork();
            newDataHomeWork.value = {
                name: '',
                description: ''
            }
            openPopupCreateHomeWork.value = false;
        } else {

        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
}



watch(() => dataHomeWorks.value, async () => {
    await nextTick()
    initDropdowns()
}, { deep: true })


const route = useRoute();
const router = useRouter();


const params = ref({
    page: 1,
});


const setPage = async (page) => {
    params.value.page = page
    await getHomeWork();
}

const selectedHomeWork = ref([]);
const selectAll = ref(false);

const deleteHomeWork = async (homework_id, homework_name) => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa ${homework_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            let list_id = [homework_id];
            const result = await apiServices.deleteHomeWork(route.params.product_id, list_id);

            if (result.code === 200) {
                await getHomeWork();
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
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};

const deleteListHomeWork = async () => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa ${selectedHomeWork.value.length} tiết học được chọn?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            const result = await apiServices.deleteHomeWork(route.params.product_id, selectedHomeWork.value);

            if (result.code === 200) {
                selectedHomeWork.value = [];
                params.page = 1
                await getHomeWork();
                toast(result.message.text || "Xóa thành công", {
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
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};


const pagination = ref({
    totalPage: 1,
    count: 10,
    nextPage: null,
    prevPage: null
})

const isLoading = ref(false);

const getHomeWork = async () => {
    try {
        const result = await apiServices.getHomeWork(route.params.product_id, params.value);
        if (result) {
            dataHomeWorks.value = result.data.items;

            pagination.value = {
                count: result.data.total,
                nextPage: result.data.has_next,
                prevPage: result.data.has_previous,
                totalPage: result.data.total_pages
            };

        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};

// Xử lý khi checkbox "Chọn tất cả" thay đổi  
const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedHomeWork.value = dataHomeWorks.value.map(product => product.id);
    } else {
        selectedHomeWork.value = [];
    }
};
const toggleSessionSelection = (id, isChecked) => {
    if (isChecked) {
        if (!selectedHomeWork.value.includes(id)) {
            selectedHomeWork.value.push(id);
        }
    } else {
        selectedHomeWork.value = selectedHomeWork.value.filter(productId => productId !== id);
    }
    updateSelectAll();
};
const updateSelectAll = () => {
    selectAll.value = selectedHomeWork.value.length === dataHomeWorks.value.length;
};

</script>