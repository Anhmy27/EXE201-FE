<template>
    <Loading v-if="isLoading"></Loading>
    <section v-else class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12">
        <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: productData?.name, href: '/admin/product/' },
            { name: 'Bài giảng', href: '#', current: true }
        ]" />
        <div class="mx-auto max-w-screen-2xl lg:px-6">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
                <div
                    class="flex justify-between dark:bg-gray-800 bg-white  border border-gray-200 dark:border-gray-700 flex items-center py-2 rounded-t-xl">
                    <div class="flex gap-2">
                        <button v-if="selectedSessionCourse.length > 0" @click="deleteListProduct"
                            class="rounded-md px-4 py-1 text-white bg-red-500 shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 text-center">
                            Xóa
                        </button>
                    </div>
                    <div class="flex gap-2 mr-2">
                        <div @click="openPopupCreateSessionCourse = true"
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
                                    TÊN FILE
                                </th>

                                <th class="px-4 text-left w-28 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sessionCourse, index) in dataSessionCourses" :key="sessionCourse.id"
                                class="bg-white border-b dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input :id="'checkbox-table-search-' + index" type="checkbox"
                                            :checked="selectedSessionCourse.includes(sessionCourse.id)"
                                            @change="toggleSessionSelection(sessionCourse.id, $event.target.checked)"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 dark:bg-gray-700 dark:border-gray-600">
                                    </div>
                                </td>

                                <td class="px-4 py-3 break-words">{{ sessionCourse.name }}</td>
                                <td class="px-4  py-3">{{ sessionCourse.file_name }}</td>
                                <td class="px-4 py-3 h-full">
                                    <button :id="`${sessionCourse.id}-dropdown-button`"
                                        :data-dropdown-toggle="`${sessionCourse.id}-dropdown`"
                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div :id="`${sessionCourse.id}-dropdown`"
                                        class="hidden z-20 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            :aria-labelledby="`${sessionCourse.id}-dropdown-button`">
                                            <li>
                                                <a @click="openVideo(sessionCourse)"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xem</a>
                                            </li>
                                            <li>
                                                <a @click="openUpdateSession(sessionCourse)"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cập
                                                    nhật</a>
                                            </li>
                                            <li>
                                                <button
                                                    @click="deleteSessionCourse(sessionCourse.id, sessionCourse.name)"
                                                    class="block text-left py-2 w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xóa</button>
                                            </li>

                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="dataSessionCourses.length === 0"
                    class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic">
                    Không có bài giảng nào
                </div>
                <div v-else
                    class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
                    <div class="flex items-center text-gray-600 dark:text-gray-300">
                        Hiển thị
                        <span v-if="dataSessionCourses.length > 0"
                            class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{ 1
                                *
                                params.page }}-{{
                                dataSessionCourses.length
                                * params.page
                            }} of</span>
                        <span class="text-gray-700 dark:text-gray-200 font-bold"
                            :class="{ 'ml-1': dataSessionCourses.length === 0 }">
                            {{ pagination.count }}
                        </span>
                    </div>

                    <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                        :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

                </div>
            </div>

            <!-- Danh sách tài liệu -->
            <div class="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                <div class="space-y-4">
                    <!-- Top row: Name left, Add button right -->
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg dark:text-gray-300 font-semibold">Danh sách tài liệu</h2>
                        <div>
                            <input type="file" ref="fileInput" @change="handleUpload" accept="image/*" class="hidden" />
                            <button @click="triggerUploadFile"
                                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                <i class="fas fa-plus mr-1"></i> Thêm
                            </button>
                        </div>
                    </div>

                    <div v-if="productData?.doc_course.length > 0" class="mt-4">
                        <div
                            class="flex gap-4 overflow-x-auto w-full mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg custom-scrollbar">
                            <div v-for="(doc, index) in productData?.doc_course" :key="doc.id"
                                class="relative flex flex-col items-center w-30 max-w-40 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <File class="w-20 h-20 text-blue-600 dark:text-white mb-1" />

                                <p class="text-xs text-center text-gray-800 dark:text-gray-200 truncate w-full">
                                    {{ truncateText(doc.file_name, 50) }}
                                </p>

                                <button @click="downloadFile(doc.id, doc.file_name)"
                                    class="absolute top-0 right-6 bg-gray-500 dark:bg-gray-500 text-white w-5 h-5 flex items-center justify-center  text-xs hover:bg-gray-700 dark:hover:bg-gray-600">
                                    <Download class="w-4 h-4" />
                                </button>

                                <button @click="deleteFile(doc.id)"
                                    class="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center  text-xs hover:bg-red-700">
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div v-if="videoCourse"
                class="flex flex-col mt-4 mb-10 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md space-y-2">
                <div class="flex items-center justify-between">
                    <div class="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                        📺 Bài giảng: {{ videoCourse.name }}
                    </div>
                    <button @click="videoCourse = null"
                        class="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-full border border-gray-200 dark:border-gray-600">
                        <XIcon class="h-6 w-6" />
                    </button>
                </div>
                <div class="flex flex-col mt-4 mb-10 p-4 lg:px-20">
                    <div class="relative w-full">
                        <video controls :src="getPreviewUrl(videoCourse.file.file_path)" class="w-full rounded shadow"></video>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <Modal :bigw="true" v-if="openPopupCreateSessionCourse" @close="openPopupCreateSessionCourse = false">
        <template #header>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                THÊM BÀI GIẢNG
            </h3>
        </template>

        <!-- Body -->
        <template #body>
            <div class="space-y-4">
                <SessionInputCard v-for="(session, index) in newDataSessionCourse" :key="index" :session="session" />

                <div class="flex justify-end">
                    <button @click="addNewSession"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        + Thêm
                    </button>
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <button @click="openPopupCreateSessionCourse = false"
                    class="px-4 sm:px-5 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-600">
                    Đóng
                </button>
                <button @click="postSessionCourse"
                    class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Tạo
                </button>
            </div>
        </template>
    </Modal>


    <Modal :bigw="true" v-if="courseUpdate" @close="courseUpdate = null">
        <template #header>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                CẬP NHẬT BÀI GIẢNG
            </h3>
        </template>

        <!-- Body -->
        <template #body>
            <div class="space-y-4">
                <SessionInputCard v-if="courseUpdate" :session="courseUpdate" />
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <button @click="courseUpdate = null"
                    class="px-4 sm:px-5 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-600">
                    Đóng
                </button>
                <button @click="putSessionCourse"
                    class="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Cập nhật
                </button>
            </div>
        </template>
    </Modal>

</template>

<script setup>
import { Download, XIcon } from "lucide-vue-next";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, inject, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Breadcrumb from "@/component/Breadcrumb.vue";
import 'flowbite'
import Modal from "@/component/Modal.vue";
import SessionInputCard from "@/component/SessionInputCard.vue";
import { File } from "lucide-vue-next"
import { getPreviewUrl, formatNumberWithCommas, truncateText } from "@/utils/extensions";

const fileInput = ref(null)


const downloadFile = async (file_id, file_name) => {
    try {
        const response = await apiServices.downloadFile(file_id);

        const blob = new Blob([response.data]);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = file_name || `doc-${file_id}`;

        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Lỗi khi tải file:', error.message);
    }
};

const deleteFile = async (doc_id) => {

    if (!doc_id) return
    try {
        const result = await apiServices.deleteFileDocument(doc_id)

        if (result.code === 200) {
            const index = productData.value.doc_course.findIndex(doc => doc.id === doc_id)
            if (index !== -1) {
                productData.value.doc_course.splice(index, 1)
            }

            toast(result.message.text || "Xóa file thành công!", {
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
    } catch (err) {
        console.error('Lỗi khi xóa file:', err)
    }

}

const triggerUploadFile = () => {
    fileInput.value?.click();
};

const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const result = await apiServices.uploadDocument(productData.value?.id, file);
    if (result?.code === 200) {
        productData.value.doc_course.push({
            id: result.data.id,
            file_name: result.data.file_name,
            file_url: getPreviewUrl(result.data.file_url),
        });
    } else {

        const message =
            result?.message?.text || result?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";

        toast(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
            type: "error",
        });
    }
};



function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}

const videoCourse = ref(null)
const YOUTUBE_WATCH_REGEX = /v=([a-zA-Z0-9_-]+)/;

const embedUrl = computed(() => {
    const matchWatch = videoCourse.value?.url.match(YOUTUBE_WATCH_REGEX);
    const videoId = matchWatch?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
});

const openVideo = (sessionCourse) => {
    videoCourse.value = sessionCourse
}

const courseUpdate = ref(null)

const openUpdateSession = (sessionCourse) => {
    courseUpdate.value = { ...sessionCourse };
};

const putSessionCourse = async () => {
    try {

        const body = {
            name: courseUpdate.value.name,
            file_name: courseUpdate.value.file_name,
            file_id: courseUpdate.value.file_id
        }

        const result = await apiServices.putSessionCourse(courseUpdate.value?.id, body);
        if (result?.code === 200) {
            courseUpdate.value = null
            await getSessionCourse();
            toast(result.message.text || "Cập nhật thành công!", {
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
        console.error("Error loading product data:", error);
    }
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
    await getSessionCourse();
    initDropdowns()
    isLoading.value = false;
})
const dataSessionCourses = ref([]);

const openPopupCreateSessionCourse = ref(false);
const newDataSessionCourse = ref([]);
const postSessionCourse = async () => {
    try {

        console.log(newDataSessionCourse.value)

        const result = await apiServices.postSessionCourse(route.params.product_id, newDataSessionCourse.value);
        if (result?.code === 200) {
            await getSessionCourse();
            newDataSessionCourse.value = []
            openPopupCreateSessionCourse.value = false;
        } else {

        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
}

const addNewSession = () => {
    newDataSessionCourse.value.push({ name: '', file_name: '', file_id: '' });
};




watch(() => dataSessionCourses.value, async () => {
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
    await getSessionCourse();
}

const selectedSessionCourse = ref([]);
const selectAll = ref(false);

const deleteSessionCourse = async (session_id, session_name) => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa sản phẩm ${session_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            let list_id = [session_id];
            const result = await apiServices.deleteSessionCourse(route.params.product_id, list_id);

            if (result.code === 200) {
                await getSessionCourse();
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

const deleteListProduct = async () => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa ${selectedSessionCourse.value.length} tiết học được chọn?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            const result = await apiServices.deleteSessionCourse(route.params.product_id, selectedSessionCourse.value);

            if (result.code === 200) {
                selectedSessionCourse.value = [];
                params.page = 1
                await getSessionCourse();
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

const getSessionCourse = async () => {
    try {
        const result = await apiServices.getSessionCourse(route.params.product_id, params.value);
        if (result) {
            dataSessionCourses.value = result.data.items;

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
        selectedSessionCourse.value = dataSessionCourses.value.map(product => product.id);
    } else {
        selectedSessionCourse.value = [];
    }
};
const toggleSessionSelection = (id, isChecked) => {
    if (isChecked) {
        if (!selectedSessionCourse.value.includes(id)) {
            selectedSessionCourse.value.push(id);
        }
    } else {
        selectedSessionCourse.value = selectedSessionCourse.value.filter(productId => productId !== id);
    }
    updateSelectAll();
};
const updateSelectAll = () => {
    selectAll.value = selectedSessionCourse.value.length === dataSessionCourses.value.length;
};

// const isYoutubeLink = computed(() => {
//     return props.url?.includes('youtube.com/watch?v=');
// });
</script>