<template>
    <div class="flex flex-col p-2 md:p-8">
        <Breadcrumb :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: 'Quản lý lĩnh vực', href: '#', current: true }
        ]" />
        <div
            class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-t-xl mt-2">
            <!-- Left side -->

            <div class="flex items-center space-x-2">
                <button @click="openAddType = true"
                    class="rounded-md p-2 border border-gray-200 text-gray-800 hover:bg-gray-50 text-center dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700">
                    Thêm lĩnh vực
                </button>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead
                    class="text-sm bg-gray-50 uppercase  border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                    <tr>
                        <th class="px-4 py-4">
                            STT
                        </th>
                        <th class="px-4 text-left py-4 cursor-pointer" @click="toggleSort('key')">
                            <div class="flex items-center gap-1">
                                <span>KEY</span>
                                <ArrowDown v-if="params.order_by === 'key'"
                                    :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                <Dot v-else class="w-4 h-4"></Dot>

                            </div>
                        </th>

                        <th class="px-4 text-left py-4 cursor-pointer" @click="toggleSort('name')">
                            <div class="flex items-center gap-1">
                                <span>TÊN</span>
                                <ArrowDown v-if="params.order_by === 'name'"
                                    :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                <Dot v-else class="w-4 h-4"></Dot>

                            </div>
                        </th>
                        <th class="px-4 text-left py-4">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8" class="text-center py-6">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-else v-for="(item, index) in dataType" :key="item.id"
                        class="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-4 py-3">
                            <span class="text-sm text-gray-600 dark:text-gray-300 flex justify-center items-center">
                                {{ (params.page - 1) * params.page_size + index + 1 }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ item.key }}</span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ item.name }}</span>
                        </td>
                        <td class="px-4 py-3 h-full">
                            <button :id="`${item.id}-dropdown-button`" :data-dropdown-toggle="`${item.id}-dropdown`"
                                class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                type="button">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <div :id="`${item.id}-dropdown`"
                                class="hidden z-20 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    :aria-labelledby="`${item.id}-dropdown-button`">

                                    <li>
                                        <button @click="openEditTypeDetail(item)"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Chỉnh sửa</button>
                                    </li>
                                    <li>
                                        <button @click="removeItem(item.id)"
                                            class="block text-left py-2 w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xóa</button>
                                    </li>

                                </ul>
                            </div>
                        </td>



                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="dataType.length > 0"
            class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
            <!-- Left side -->
            <div class="flex items-center text-gray-600 dark:text-gray-300">
                Showing
                <span class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{ 1 + (params.page - 1) *
                    params.page_size }}-{{
                        dataType.length
                        + (params.page - 1) *
                        params.page_size
                    }}</span>
                of
                <span class="text-gray-700 dark:text-gray-200 ml-1 font-bold">{{ pagination.count }}</span>
            </div>

            <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

        </div>
        <div v-else-if="dataType.length === 0 && !isLoading"
            class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 italic rounded-md">
            Chưa có lĩnh vực nào
        </div>
    </div>
    <AddType v-if="openAddType" @onClose="openAddType = false" @onReload="getTypeProductData">
    </AddType>
    <EditType v-if="typeProductDetail" :data="typeProductDetail" @onClose="closeEditType" @onUpdate="updateType">
    </EditType>
</template>

<script setup>
import Breadcrumb from "@/component/Breadcrumb.vue";
import AddType from "@/component/AddType.vue";
import EditType from "@/component/EditType.vue";
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { ArrowDown,  Dot } from "lucide-vue-next";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, inject, nextTick } from 'vue';
import { eventBus } from "@/utils/eventBus.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';
import 'flowbite'

const dataType = ref([]);


function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}

watch(() => dataType.value, async () => {
    await nextTick()
    initDropdowns()
}, { deep: true })

const handleSelectTypeParent = async (type) => {
    if (params.value.type === type) return; // Nếu type không thay đổi, thoát luôn

    params.value.type = type; // Cập nhật giá trị type trước khi gọi API
    await getTypeProductData(); // Chờ dữ liệu cập nhật xong
};

const removeItem = async (item_id) => {

    const result = await apiServices.removeTypeProduct(item_id);

    if (result.code === 200) {
        toast.success(result.message.text || "Xóa lĩnh vực thành công", {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            type: 'success'
        });
        await getTypeProductData();
    } else {
        toast.error(result.message.text || "Xóa lĩnh vực thất bại, vui lòng thử lại", {
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


const route = useRoute();
const router = useRouter();


const listTypeParent = ref([
    { id: null, key: null, name: 'Tất cả' },
])

const params = ref({
    page: parseInt(route.query.page) || 1,
    sort: 'desc',
    order_by: 'created_date',
    page_size: 10,
    type: listTypeParent.value[0],
    text_search: '',
});

watch(
    () => eventBus.isButtonClicked,
    () => {
        handleSearchButtonClick();
    }
);
const textSearch = inject('textSearch');
const handleSearchButtonClick = () => {
    if (params.value.text_search === textSearch.value) return
    params.value.text_search = textSearch.value
    params.value.page = 1
    getTypeProductData();
};


const typeProductDetail = ref(null)

const setPage = async (page) => {
    params.value.page = page
    await getTypeProductData();
}

const pagination = ref({
    totalPage: 1,
    count: 0,
    nextPage: null,
    prevPage: null,
})

const toggleSort = async (column) => {
    if (params.value.order_by === column) {
        params.value.sort = params.value.sort === 'asc' ? 'desc' : 'asc';
    } else {
        params.value.order_by = column;
        params.value.sort = 'desc';
    }
    await getTypeProductData()
};

const isLoading = ref(false)
const getTypeProductData = async () => {
    try {
        isLoading.value = true

        const param_getAPI = {
            page: params.value.page,
            page_size: params.value.page_size,
            text_search: params.value.text_search,
            sort: params.value.sort,
            order_by: params.value.order_by
        }


        const result = await apiServices.getPaginatorTypeProduct(param_getAPI);
        if (result.code === 200) {
            dataType.value = result.data.items;
            pagination.value = {
                count: result.data.total,
                nextPage: !!result.data.has_next,
                prevPage: !!result.data.has_previous,
                totalPage: result.data.total_pages,
            };
        } else {
            toast(result.message.text || "Please try again.", {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'error'
            });
        }
        isLoading.value = false

    } catch (error) {
        console.error("Error loading product data:", error);
    }
};



const openAddType = ref(false)

const updateType = async (item) => {
    const index = dataType.value.findIndex((type) => type.id === item.id);
    if (index !== -1) {
        dataType.value[index] = item;
    }
    typeProductDetail.value = null
    getTypeProductData()
}

const openEditTypeDetail = (item) => {
    typeProductDetail.value = item
}

const closeEditType = () => {
    typeProductDetail.value = null

}

onMounted(async () => {
    await getTypeProductData();
    initDropdowns()

});  
</script>