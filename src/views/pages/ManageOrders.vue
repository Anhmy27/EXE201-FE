<template>
    <div class="flex flex-col p-1 md:p-8">
        <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900" :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: 'Quản lý đơn hàng', href: '#', current: true }
        ]" />


        <div
            class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-t-xl">
            <!-- Left side -->
            <div class="flex items-center">
                <Menu v-slot="{ open }" as="div" class="relative z-1">
                    <div class="flex items-center">
                        <MenuButton class="w-full justify-center rounded-md">
                            <button
                                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none">
                                <Clock class="w-4 h-4 dark:text-gray-200" />
                                <span class="dark:text-gray-200">{{ params.time?.name }}</span>
                                <ChevronDown
                                    class="w-4 h-4 dark:text-gray-200 transform transition-transform duration-300 ease-in-out"
                                    :class="{ 'rotate-180': open }" />
                            </button>
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <MenuItems class="absolute w-full origin-top-right bg-white dark:bg-gray-700 rounded-lg">
                            <div v-for="time in listTime" :key="time.id">
                                <MenuItem v-slot="{ active }">
                                <button @click="handleSelectTime(time)" :class="[
                                    active && 'bg-gray-100 dark:bg-gray-600',
                                    'group flex w-full items-center px-3 py-2 text-sm dark:text-gray-300 rounded-lg',
                                ]">
                                    {{ time.name }}
                                </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>

            </div>

            <!-- <button
                class="rounded-md p-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 text-center">
                Boost Your Oxygen
            </button> -->

        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead
                    class="text-sm bg-gray-50 uppercase  border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                    <tr>
                        <th class="px-4 text-left py-4">
                            MÃ ĐƠN HÀNG
                        </th>

                        <th class="px-4 text-left py-4 ">
                            KHÁCH HÀNG
                        </th>
                        <th class="px-4 text-left py-4 ">
                            TỔNG
                        </th>

                        <th class="px-4 text-left py-4">
                            NGÀY MUA
                        </th>
                        <th class="px-4 text-left py-4">
                            THAO TÁC
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8" class="text-center py-6">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-else v-for="(item, index) in dataOrders" :key="item.id"
                        class="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-4 py-3">

                            <div class="flex items-center">
                                <span class="text-sm text-gray-600 dark:text-gray-200">
                                    {{ item.id }}
                                </span>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span
                                class="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline hover:text-blue-800 dark:hover:text-blue-300">
                                {{ item.user.email }}
                            </span>
                        </td>


                        <td class="px-4 py-3">
                            <div class="flex items-center">
                                <span class="text-sm text-gray-600 dark:text-gray-200">
                                    {{ formatNumberWithCommas(item.count) }}
                                </span>
                            </div>
                        </td>

                        <td class="px-4 py-3">
                            <span class="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                {{ formatDateTime(item.created_date) }}
                            </span>
                        </td>

                        <td class="px-4 py-3">
                            <div class="flex space-x-4 items-center">
                                <button @click="openDetailOrder(item)" class="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-6 h-6 text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.458 12C3.732 7.943 7.522 5 12 5c4.477 0 8.268 2.943 9.542 7-.726 2.957-2.776 5.45-5.542 6.528C12.777 20.955 8.268 17.943 2.458 12z" />
                                    </svg>
                                    <span
                                        class="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform text-xs font-medium text-white bg-gray-800 px-2 py-1 rounded-md">
                                        View
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="dataOrders.length > 0"
            class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
            <!-- Left side -->
            <div class="flex items-center text-gray-600 dark:text-gray-300">
                Showing
                <span class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{ 1 * params.page }}-{{ dataOrders.length
                    * params.page
                }}</span>
                of
                <span class="text-gray-700 dark:text-gray-200 ml-1 font-bold">{{ pagination.count }}</span>
            </div>

            <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

        </div>
        <div v-else-if="dataOrders.length === 0 && !isLoading"
            class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic rounded-b-md">
            Chưa có đơn hàng mới
        </div>

    </div>

    <OrderDetailModal v-if="orderDetail" :order="orderDetail" @close="closeDetailOrder" />



</template>

<script setup>
import Breadcrumb from "@/component/Breadcrumb.vue";
import OrderDetailModal from "@/component/OrderDetailModal.vue";
import Loading from "@/component/Loading.vue";
import { ChevronDown, Clock, CircleCheckBig } from "lucide-vue-next";
import Pagination from "@/component/Pagination.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, inject } from 'vue';
import { eventBus } from "@/utils/eventBus.js";
import { useRoute, useRouter } from 'vue-router';
import { formatDateTime, formatNumberWithCommas } from "@/utils/extensions";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const route = useRoute();
const router = useRouter();


const listTime = ref([
    { name: 'Tất cả', filter: null },

    { name: '7 ngày', filter: 'week' },
    { name: '1 tháng', filter: 'month' },
    { name: '1 năm', filter: 'year' },
])

const params = ref({
    page: 1,
    page_size: 10,
    time: listTime.value[0],
    text_search: '',
    sort: 'desc',
    order_by: 'created_date'
});


const handleSelectTime = async (time) => {
    if (params.value.time !== time) {
        params.value.time = time
        await getOrdersData();
    }


}

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
    getOrdersData();
};

const handleSelectStatus = async (status) => {
    if (params.value.status !== status) {

        params.value.status = status
        await getOrdersData();
    }
}

const setPage = async (page) => {
    params.value.page = page
    await getOrdersData();
}

const pagination = ref({
    totalPage: 1,
    count: 10,
    nextPage: null,
    prevPage: null
})


const dataOrders = ref([]);
const isLoading = ref(false)
const getOrdersData = async () => {
    try {
        isLoading.value = true

        const param_getAPI = {
            page: params.value.page,
            page_size: params.value.page_size,
            time: params.value.time?.filter,
            text_search: params.value.text_search,
            sort: params.value.sort,
            order_by: params.value.order_by
        }

        const result = await apiServices.getOrderAdmin(param_getAPI);
        if (result && result.code === 200) {
            dataOrders.value = result.data.items;
            pagination.value = {
                count: result.data.total,
                nextPage: result.data.has_next,
                prevPage: result.data.has_previous,
                totalPage: result.data.total_pages
            };

        }
        isLoading.value = false

    } catch (error) {
        console.error("Error loading product data:", error);
    }
};
const orderDetail = ref(null)
const openDetailOrder = (item) => {
    orderDetail.value = item
}

const closeDetailOrder = () => {
    orderDetail.value = null
}

onMounted(async () => {
    await getOrdersData();
});  
</script>