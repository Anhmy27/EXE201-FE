<template>
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Thêm Breadcrumb vào đây -->
        <div class="max-w-6xl mx-auto w-full px-6 mt-4">
            <Breadcrumb :items="breadcrumbItems" />
        </div>

        <!-- Header -->
        <h1 class="text-4xl font-bold text-center my-8 text-gray-800 dark:text-gray-200 font-cormorant">
            Giỏ hàng của bạn
        </h1>

        <!-- Desktop View - Table Layout -->
        <div class="hidden md:block max-w-6xl mx-auto w-full px-6">
            <table v-if="dataItems.length > 0" class="w-full bg-white dark:bg-gray-800 rounded-t-xl shadow-sm">
                <thead class="border-b dark:border-gray-700">
                    <tr class="font-montserrat">
                        <th class="p-4 text-left w-12">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                                @change="toggleSelectAll" :checked="isAllSelected">
                        </th>
                        <th class="p-4 text-left text-sm uppercase tracking-wider dark:text-gray-300">Sản phẩm</th>
                        <th class="p-4 text-center text-sm uppercase tracking-wider dark:text-gray-300">Đơn giá</th>
                        <th class="p-4 text-center text-sm uppercase tracking-wider dark:text-gray-300">Thao tác</th>
                    </tr>
                </thead>
                <tbody class="font-inter">
                    <tr v-for="(item, index) in dataItems" :key="item.id"
                        :class="{ 'border-b dark:border-gray-700': index !== dataItems.length - 1 }">
                        <td class="p-4">
                            <input type="checkbox" :checked="selectedCart.includes(item.id)"
                                @change="toggleSelection(item.id, $event.target.checked)"
                                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600">
                        </td>
                        <td class="p-4">
                            <div class="flex items-center gap-4">
                                <div class="relative w-20 h-20 shrink-0">
                                    <img :src="getPreviewUrl(item.product.files[0]?.file_path)"
                                        class="w-full h-full object-cover rounded-lg" alt="">

                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-medium text-gray-900 dark:text-white truncate">
                                        {{ item.product.name }}
                                    </h3>
                                </div>
                            </div>
                        </td>

                        <td class="p-4 text-right ">
                            <div class="space-y-1">
                                <div :class="[
                                    'text-lg font-medium flex items-center justify-center text-gray-900 dark:text-white'
                                ]">
                                    {{ formatPrice(item.product.price) }}đ
                                </div>

                            </div>
                        </td>
                        <td class="p-4 text-center">
                            <div class="flex items-center justify-center space-x-3">
                                <button @click="RemoveItemCart(item.id, item.product.name)"
                                    class="text-red-500 hover:text-red-700" title="Xóa">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden max-w-xl mx-auto w-full px-4">
            <div v-if="dataItems.length > 0" class="space-y-4">
                <div v-for="item in dataItems" :key="item.id"
                    class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <!-- Header with Edit Button -->
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <input type="checkbox" :checked="selectedCart.includes(item.id)"
                                @change="toggleSelection(item.id, $event.target.checked)"
                                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600">
                            <h3 class="font-medium text-gray-900 dark:text-white">
                                {{ item.product.name }}
                            </h3>
                        </div>
                        <button @click="RemoveItemCart(item.id, item.product.name)"
                            class="text-red-500 hover:text-red-700" title="Xóa">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <!-- Main Content -->
                    <div class="flex gap-4">
                        <!-- Product Image -->
                        <div class="relative w-24 h-24 shrink-0">
                            <img :src="getPreviewUrl(item.product.files[0]?.file_path)"
                                class="w-full h-full object-cover rounded-lg" alt="">
                        </div>

                        <!-- Product Details -->
                        <div class="flex-1 flex justify-between">



                           
                        </div>
                    </div>

                    <!-- Delete Button -->
                    <div class="mt-4 flex justify-end">
                        <div :class="[
                            'text-lg font-medium flex items-center justify-center text-gray-900 dark:text-white'
                        ]">
                            {{ formatPrice(item.product.price) }}đ
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="dataItems.length === 0" class="text-center py-12 font-inter">
            <div class="text-gray-500 dark:text-gray-400">Giỏ hàng của bạn đang trống</div>
        </div>

        <!-- Footer với Dark Mode -->
        <div v-if="dataItems.length > 0" class="sticky bottom-0 left-0 right-0 max-w-6xl mx-auto w-full md:px-6">
            <!-- Desktop View -->
            <div class="hidden md:block">
                <div class="h-16 font-inter flex items-center bg-white dark:bg-gray-800 px-4 rounded-b-lg">
                    <div class="w-full grid grid-cols-12 gap-4 items-center">
                        <!-- Checkbox và số lượng đã chọn -->
                        <div class="col-span-3">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                                    @change="toggleSelectAll" :checked="isAllSelected">
                                <span class="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    Chọn tất cả ({{ selectedCart.length }})
                                </span>
                            </div>
                        </div>

                        <!-- Tổng tiền -->
                        <div class="col-span-5 flex items-center justify-end gap-2">
                            <span class="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                Tổng thanh toán:
                            </span>
                            <span class="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                {{ formatPrice(calculateTotal()) }}đ
                            </span>
                        </div>

                        <!-- Nút thanh toán -->
                        <div class="col-span-4 flex justify-end">
                            <button @click="sessionOrder" :disabled="selectedCart.length === 0" :class="[
                                'px-6 h-10 rounded-lg font-medium whitespace-nowrap',
                                selectedCart.length === 0
                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                            ]" class="text-white">
                                Thanh toán ({{ selectedCart.length }})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile View -->
            <div class="md:hidden max-w-xl mx-auto w-full px-4">
                <div class="font-inter px-4 py-3 bg-white dark:bg-gray-800 rounded-xl">
                    <!-- Hàng 1: Checkbox và tổng tiền -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                                @change="toggleSelectAll" :checked="isAllSelected">
                            <span class="text-sm text-gray-700 dark:text-gray-300">
                                Chọn tất cả ({{ selectedCart.length }})
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                Tổng thanh toán:
                            </span>
                            <span class="text-lg font-bold text-gray-900 dark:text-white">
                                {{ formatPrice(calculateTotal()) }}đ
                            </span>
                        </div>
                    </div>

                    <!-- Hàng 2: Nút thanh toán -->
                    <button @click="sessionOrder" :disabled="selectedCart.length === 0" :class="[
                        'w-full h-10 rounded-lg font-medium text-white',
                        selectedCart.length === 0
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                    ]">
                        Thanh toán ({{ selectedCart.length }})
                    </button>
                </div>
            </div>
        </div>
    </div>

    <AddToCartPopup :show="showPopup" :product="selectedProduct" :cartItem="cartItemChange" @close="closePopup"
        @addToCart="handlePutItemToCart" />
</template>

<script setup>
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import { getPreviewUrl } from "@/utils/extensions";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AddToCartPopup from '@/component/AddToCartPopup.vue';
import Breadcrumb from '@/component/Breadcrumb.vue';
const route = useRoute();
const router = useRouter();

const page = ref(1)

const showPopup = ref(false);
const cartItemChange = ref(null);
const selectedProduct = ref(null)

const closePopup = () => {
    showPopup.value = false;
    cartItemChange.value = null;
    selectedProduct.value = null
}

const handlePutItemToCart = async (rowData) => {
    try {
        const { cart_id, ...bodyData } = rowData;
        const result = await apiServices.putItemInCard(cart_id, bodyData);
        if (result.code === 200) {
            toast(result.message.text || "Cập nhật thành công!", {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'success',
            });

            dataItems.value = dataItems.value
                // Xóa các phần tử có id trong result.data.cart_ids_remove
                .filter(item => !result.data.cart_ids_remove.includes(item.id))
                // Cập nhật phần tử có id bằng cart_id
                .map(item => item.id === cart_id ? result.data.cart_item : item);

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
        console.error("Error adding to cart:", error);
    }
}

const dataItems = ref([]);


const selectedCart = ref([]);



const RemoveItemCart = async (cart_id, product_name) => {
    try {
        // Hiển thị cảnh báo xác nhận
        const confirmation = await Swal.fire({
            title: `Bạn có chắc muốn xóa sản phẩm <strong style="color: black;">${product_name}</strong>?`,
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Hủy",
            reverseButtons: true
        });
        if (confirmation.isConfirmed) {
            let list_id = [cart_id];
            const result = await apiServices.deleteItemInCart(list_id);

            if (result.code === 200) {
                   selectedCart.value = selectedCart.value.filter(id => id !== cart_id);

                dataItems.value = dataItems.value.filter(
                    (item) => item.id !== cart_id
                );

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

const sessionOrder = async () => {
    try {
        // selectedCart.value = dataItems.value.map(item => item.id);
        const body = {
            "list_cart_id": selectedCart.value
        }
        const result = await apiServices.postSessionOrder(body);
        if (result.code === 200) {
            router.push({
                name: 'SessionOrder',
                params: {
                    session_id: result.data.id
                }
            });
        }
    } catch (error) {
        console.error("Error loading session data:", error);
    }
}

const toggleSelection = (id, isChecked) => {
    if (isChecked) {
        if (!selectedCart.value.includes(id)) {
            selectedCart.value.push(id);
        }
    } else {
        selectedCart.value = selectedCart.value.filter(productId => productId !== id);
    }

};


const isFetching = ref(false);

const getItemsInCard = async () => {
    try {
        if (isFetching.value || page.value === null) return;
        isFetching.value = true;

        const result = await apiServices.getItemsInCard(page.value);
        if (result.code === 200) {
            result.data.has_next ? page.value++ : page.value = null;
            for (const item of result.data.items) {
                // Kiểm tra nếu ID chưa tồn tại trong dataItems
                if (!dataItems.value.some(existingItem => existingItem.id === item.id)) {
                    dataItems.value.push(item); // Thêm item mới vào mảng
                }
            }
        }
        isFetching.value = false;


    } catch (error) {
        console.error("Error loading product data:", error);
    }
};

const handleScroll = () => {
    const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
    if (bottomOfWindow) {
        getItemsInCard();
    }
};

const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await getItemsInCard();
    isLoading.value = false;

    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price)
}

const calculateTotal = () => {
    return selectedCart.value.reduce((total, id) => {
        const item = dataItems.value.find(item => item.id === id)
        return total + item.product.price
    }, 0)
}

const isAllSelected = computed(() => {
    return dataItems.value.length > 0 && selectedCart.value.length === dataItems.value.length
})

const toggleSelectAll = (event) => {
    if (event.target.checked) {
        selectedCart.value = dataItems.value.map(item => item.id)
    } else {
        selectedCart.value = []
    }
}

const breadcrumbItems = [
    {
        name: 'KHÁM PHÁ',
        href: '/'
    },
    {
        name: 'Giỏ hàng',
        href: '/cart',
        current: true
    }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400;500;600&family=Montserrat:wght@500;600&display=swap');

.font-cormorant {
    font-family: 'Cormorant Garamond', serif;
}

.font-inter {
    font-family: 'Inter', sans-serif;
}

.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

/* Thêm styles cho các phần tử cụ thể */
.product-name {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
}

.price-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}

.button-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 0.025em;
}
</style>