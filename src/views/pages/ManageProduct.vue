<template>
    <Loading v-if="isLoading"></Loading>
    <section v-else class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12">
        <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
            { name: 'Trang chủ', href: '/admin/dashboard' },
            { name: 'Danh sách sản phẩm', href: '#', current: true }
        ]" />
        <div class="mx-auto max-w-screen-2xl lg:px-6">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
                <div
                    class="flex justify-between dark:bg-gray-800 bg-white  border border-gray-200 dark:border-gray-700 flex items-center py-2 rounded-t-xl">
                    <div class="flex gap-2">
                        <FilterProduct class="ml-4" @setFilter="setFilter"></FilterProduct>
                        <button v-if="selectedProducts.length > 0" @click="deleteListProduct"
                            class="rounded-md px-4 py-1 text-white bg-red-500 shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 text-center">
                            Xóa
                        </button>
                    </div>
                    <div class="flex gap-2 mr-2">
                        <Menu v-slot="{ open }" as="div" class="relative z-1 ml-2">
                            <div class="flex items-center">
                                <MenuButton class="w-full justify-center rounded-md">
                                    <button
                                        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none">
                                        <span class="dark:text-gray-200">{{ params.page_size }}</span>
                                        <ChevronDown
                                            class="w-4 h-4 dark:text-gray-200 transform transition-transform duration-300 ease-in-out"
                                            :class="{ 'rotate-180': open }" />
                                    </button>
                                </MenuButton>
                            </div>

                            <transition enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class="absolute w-full origin-top-right bg-white dark:bg-gray-700 rounded-lg">
                                    <div v-for="pageSize in listPageSize" :key="pageSize">
                                        <MenuItem v-slot="{ active }">
                                        <button @click="SetPageSize(pageSize)" :class="[
                                            active && 'bg-gray-100 dark:bg-gray-600',
                                            'group flex w-full items-center px-3 py-2 text-sm dark:text-gray-300 rounded-lg',
                                        ]">
                                            {{ pageSize }}
                                        </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                        <router-link v-if="!noHasPermission" :to="{ name: 'ProductCreate' }"
                            class="w-full rounded-md flex items-center justify-center px-2 py-1 text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 text-center">
                            Tạo mới
                        </router-link>

                    </div>


                </div>
                <div class="overflow-x-auto">
                    <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                <th class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" v-model="selectAll"
                                            @change="toggleSelectAll"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 dark:bg-gray-800 dark:border-gray-600">
                                    </div>
                                </th>
                                <th class="px-4 w-24 py-2">
                                    Image
                                </th>
                                <th class="px-4 py-2">
                                    <button @click="setParamSort('name')"
                                        class="flex items-center space-x-2 px-4 cursor-pointer">
                                        <span>SẢN PHẨM</span>
                                        <ArrowDown v-if="params.order_by === 'name'"
                                            :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                        <Dot v-else class="w-4 h-4"></Dot>
                                    </button>
                                </th>
                                <th class="px-4 text-left py-2">
                                    Loại
                                </th>
                                <th class="px-4 py-2">
                                    <button @click="setParamSort('original_price')"
                                        class="flex items-center space-x-2 cursor-pointer">
                                        <span>GIÁ</span>

                                        <ArrowDown v-if="params.order_by === 'original_price'"
                                            :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                        <Dot v-else class="w-4 h-4"></Dot>
                                    </button>
                                </th>

                                <th class="px-4 py-2">
                                    <button @click="setParamSort('created_date')"
                                        class="flex items-center space-x-2 cursor-pointer">
                                        <span class="whitespace-nowrap">NGÀY TẠO</span>

                                        <ArrowDown v-if="params.order_by === 'created_date'"
                                            :class="['w-4 h-4 transition-transform', { 'rotate-180': params.sort === 'asc' }]" />
                                        <Dot v-else class="w-4 h-4"></Dot>
                                    </button>
                                </th>
                                <th v-if="!noHasPermission" class="px-4 text-left py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in dataProduct" :key="product.id"
                                class="bg-white border-b dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input :id="'checkbox-table-search-' + index" type="checkbox"
                                            :checked="selectedProducts.includes(product.id)"
                                            @change="toggleProductSelection(product.id, $event.target.checked)"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 dark:bg-gray-700 dark:border-gray-600">
                                    </div>
                                </td>
                                <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div class="w-full h-28 dark:bg-gray-900">
                                        <img v-if="getPreviewUrl(product.files[0]?.file_path)"
                                            :src="getPreviewUrl(product.files[0]?.file_path)" alt="Product 1"
                                            class="w-full h-full object-contain" />
                                        <img v-else src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                                            class="w-full h-full object-contain" />
                                    </div>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap">{{ product.name }}</td>
                                <td class="px-4  py-3 whitespace-nowrap">{{ product.type_product?.name }}</td>
                                <td class="px-4 py-3">{{ formatNumberWithCommas(product.price) }}</td>
                                <!-- <td class="px-4 py-3 whitespace-nowrap">{{ product.discount }}</td> -->
                                <td class="px-4 py-3 whitespace-nowrap">{{ formatDateTime(product.created_date) }}</td>
                                <td class="px-4 py-3 h-full">
                                    <button :id="`${product.id}-dropdown-button`"
                                        :data-dropdown-toggle="`${product.id}-dropdown`"
                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div :id="`${product.id}-dropdown`"
                                        class="hidden z-20 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            :aria-labelledby="`${product.id}-dropdown-button`">

                                            <li>
                                                <router-link
                                                    :to="{ name: 'ManageSessionCourse', params: { product_id: product.id } }"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bài
                                                    giảng</router-link>
                                            </li>
                                            <li>
                                                <router-link
                                                    :to="{ name: 'ManageHomeWork', params: { product_id: product.id } }"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bài
                                                    Tập</router-link>
                                            </li>
                                            <li>
                                                <router-link
                                                    :to="{ name: 'ProductUpdate', params: { product_id: product.id } }"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cập
                                                    nhật</router-link>
                                            </li>
                                            <li>
                                                <button @click="deleteProduct(product.id, product.name)"
                                                    class="block text-left py-2 w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xóa</button>
                                            </li>

                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="dataProduct.length === 0"
                    class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic">
                    Không có sản phẩm nào
                </div>
                <div v-else
                    class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
                    <div class="flex items-center text-gray-600 dark:text-gray-300">
                        Showing
                        <span v-if="dataProduct.length > 0" class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{ 1
                            *
                            params.page }}-{{
                                dataProduct.length
                                * params.page
                            }} of</span>
                        <span class="text-gray-700 dark:text-gray-200 font-bold"
                            :class="{ 'ml-1': dataProduct.length === 0 }">
                            {{ pagination.count }}
                        </span>
                    </div>

                    <Pagination :nextPage="pagination.nextPage" :prevPage="pagination.prevPage"
                        :totalPage="pagination.totalPage" :page="params.page" @setPage="setPage"></Pagination>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ChevronDown, Trash2, FilePen, Dot, ArrowDown } from "lucide-vue-next";
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, inject, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import FilterProduct from "@/component/FilterProduct.vue";
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { getPreviewUrl, formatDateTime, formatNumberWithCommas } from "@/utils/extensions";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { eventBus } from "@/utils/eventBus.js";
import Breadcrumb from "@/component/Breadcrumb.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import 'flowbite'

function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}

// Gọi khi component mount lần đầu
onMounted(async () => {
    isLoading.value = true;
    await getProduct();
    initDropdowns()
    isLoading.value = false;
})
const dataProduct = ref([]);

watch(() => dataProduct.value, async () => {
    await nextTick()
    initDropdowns()
}, { deep: true })


const route = useRoute();
const router = useRouter();
import { useStorage } from "@vueuse/core";
const userProfile = useStorage("userProfile", { key: "value" });
const noHasPermission = ["employee", "user"].includes(userProfile.value?.group?.key);
const listPageSize = ref([10, 20, 30, 50])


const params = ref({
    page: 1,
    page_size: listPageSize.value[0],
    order_by: 'created_date',
    sort: 'desc',
    type_id: null,
    text_search: null,
    from_money: null,
    to_money: null,
    from_date: null,
    to_date: null,
});

const textSearch = inject('textSearch');
const handleSearchButtonClick = () => {
    if (params.value.text_search === textSearch.value) return
    params.value.text_search = textSearch.value
    params.value.page = 1
    getProduct();
};


const SetPageSize = (page_size) => {
    if (params.value.page_size !== page_size) {
        params.value.page_size = page_size
        params.value.page = 1
        getProduct();
    }
}

watch(
    () => eventBus.isButtonClicked,
    () => {
        handleSearchButtonClick();
    }
);

const setParamSort = async (order_by) => {
    if (params.value.order_by === order_by) {
        params.value.sort = params.value.sort === 'asc' ? 'desc' : 'asc';
    } else {
        params.value.order_by = order_by;
        params.value.sort = 'desc';
    }
    await getProduct();

}

const setFilter = async (filter) => {
    params.value.to_money = filter.to_money
    params.value.from_money = filter.from_money
    params.value.select_type = filter.select_type
    await getProduct();
}

const setPage = async (page) => {
    params.value.page = page
    await getProduct();
}

const selectedProducts = ref([]);
const selectAll = ref(false);


const fixProduct = (product_id) => {
    router.push({ name: "ProductUpdate", params: { product_id: product_id } });
}

const deleteProduct = async (product_id, product_name) => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa sản phẩm ${product_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            let list_id = [product_id];
            const result = await apiServices.deleteProduct(list_id);

            if (result.code === 200) {
                await getProduct();
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
            title: `Bạn có chắc muốn xóa ${selectedProducts.value.length} sản phẩm được chọn?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        });
        if (confirmation.isConfirmed) {
            const result = await apiServices.deleteProduct(selectedProducts.value);

            if (result.code === 200) {
                selectedProducts.value = [];
                await getProduct();
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


const pagination = ref({
    totalPage: 1,
    count: 10,
    nextPage: null,
    prevPage: null
})

const isLoading = ref(false);

const getProduct = async () => {
    try {
        const param_getAPI = {
            page: params.value.page,
            page_size: params.value.page_size,
            order_by: params.value?.order_by,
            sort: params.value?.sort,
            select_type: JSON.stringify(params.value.select_type),
            text_search: params.value.text_search,
            from_money: params.value.from_money,
            to_money: params.value.to_money,
            from_date: params.value.from_date,
            to_date: params.value.to_date,
        };
        const result = await apiServices.getProduct(param_getAPI);
        if (result.code === 200) {
            dataProduct.value = result.data.items;

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
        selectedProducts.value = dataProduct.value.map(product => product.id);
    } else {
        selectedProducts.value = [];
    }
};
const toggleProductSelection = (id, isChecked) => {
    if (isChecked) {
        if (!selectedProducts.value.includes(id)) {
            selectedProducts.value.push(id);
        }
    } else {
        selectedProducts.value = selectedProducts.value.filter(productId => productId !== id);
    }
    updateSelectAll();
};
const updateSelectAll = () => {
    selectAll.value = selectedProducts.value.length === dataProduct.value.length;
}; 
</script>