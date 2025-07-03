<template>
    <div class="flex flex-col p-2 md:p-8">
        <Breadcrumb :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: 'Thông tin khách hàng', href: '#', current: true }
        ]" />
        <div class="mt-8 relative overflow-x-auto">
            <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead
                    class="text-sm bg-gray-50 uppercase  border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                    <tr>
                        <th class="px-4 py-4">
                            STT
                        </th>
                        <th class="px-4 text-left py-4 cursor-pointer" @click="toggleSort('email')">
                            <div class="flex items-center gap-1">
                                <span>EMAIL</span>
                                <ArrowDown v-if="params.order_by === 'email'"
                                    :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                <Dot v-else class="w-4 h-4"></Dot>

                            </div>
                        </th>

                        <th class="px-4 text-left py-4 cursor-pointer" @click="toggleSort('full_name')">
                            <div class="flex items-center gap-1">
                                <span class="">TÊN KHÁCH HÀNG</span>

                                <ArrowDown v-if="params.order_by === 'full_name'"
                                    :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                <Dot v-else class="w-4 h-4"></Dot>

                            </div>
                        </th>
                        <th class="px-4 text-left py-4 ">
                            NGÀY SINH
                        </th>
                        <th class="px-4 text-left py-4 ">
                            GIỚI TÍNH
                        </th>

                        <th class="px-4 text-left py-4">
                            <div class="flex items-center gap-1">
                                <span>SĐT</span>
                            </div>
                        </th>

                        <th class="px-4 text-left py-4 cursor-pointer" @click="toggleSort('created_date')">
                            <div class="flex items-center gap-1">
                                <span>Thời gian tạo</span>

                                <ArrowDown v-if="params.order_by === 'created_date'"
                                    :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                <Dot v-else class="w-4 h-4"></Dot>

                            </div>
                        </th>
                        <th class="px-4 text-left py-4 ">
                            XEM LỊCH SỬ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8" class="text-center py-6">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-else v-for="(item, index) in dataStaff" :key="item.id"
                        class="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-4 py-3">
                            <span class="text-sm text-gray-600 dark:text-gray-300 flex justify-center items-center">
                                {{ (params.page - 1) * params.page_size + index + 1 }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <a
                                class="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline hover:text-blue-800 dark:hover:text-blue-300">
                                {{ item.email }}
                            </a>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ item.full_name }}</span>
                        </td>

                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ item.phone }}</span>
                        </td>

                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ formatDate(item.birthday) }}</span>
                        </td>

                        <td class="px-4 py-3">
                            <span class="text-gray-600 dark:text-gray-200"> {{ item.gender ? 'Nam' : 'Nữ' }}</span>
                        </td>

                        <td class="px-4 py-3 whitespace-nowrap">{{ formatDateTime(item.created_date) }}</td>
                        <td class="px-4 py-3 h-full">
                            <button :id="`${item.id}-dropdown-button`"
                                :data-dropdown-toggle="`${item.id}-dropdown`"
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
                                        <router-link
                                            :to="{ name: 'HistoryUserBuy', params: { user_id: item.id } }"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mua hàng</router-link>
                                    </li>
                             
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="dataStaff.length > 0"
            class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
            <!-- Left side -->
            <div class="flex items-center text-gray-600 dark:text-gray-300">
                Showing
                <span class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{ 1 + (params.page - 1) *
                    params.page_size }}-{{
                        dataStaff.length
                        + (params.page - 1) *
                        params.page_size
                    }}</span>
                of
                <span class="text-gray-700 dark:text-gray-200 ml-1 font-bold">{{ pagination.count }}</span>
            </div>

            <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

        </div>
        <div v-else-if="dataStaff.length === 0 && !isLoading"
            class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 italic rounded-md">
            No staff records found
        </div>
    </div>
</template>

<script setup>
import Breadcrumb from "@/component/Breadcrumb.vue";
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { ArrowDown, ArrowUp, Edit, Dot } from "lucide-vue-next";
import { formatDateTime } from "@/utils/extensions";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, inject } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import _ from 'lodash';
import { eventBus } from "@/utils/eventBus.js";
import 'flowbite'

function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN');
};


const params = ref({
    page: 1,
    sort: 'desc',
    order_by: 'created_date',
    page_size: 10,
    text_search: ''

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
    getCustomer();
};


const setPage = async (page) => {
    params.value.page = page
    await getCustomer();
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
    await getCustomer()
};

const dataStaff = ref([]);
const isLoading = ref(false)
const getCustomer = async () => {
    try {
        isLoading.value = true
        const result = await apiServices.getCustomer(params.value);
        if (result.code === 200) {
            dataStaff.value = result.data.items;
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
        initDropdowns()
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};



onMounted(async () => {
    await getCustomer();
});  
</script>