<template>
    <div v-if="!isLoading && dataSessionDetail" class="max-w-2xl max-lg:max-w-2xl mx-auto mt-2">
        <div class="grid gap-12 p-2">
            <div>
                <div class="bg-white dark:bg-gray-700 p-6 rounded-lg">
                    <h2 class="text-2xl font-extrabold text-gray-800 dark:text-white">Thanh Toán</h2>
                    <div v-for="(item, index) in dataSessionDetail.items" :key="item.id" class="space-y-4 mt-8">
                        <div class="flex items-center gap-4">
                            <div class="w-24 h-24 shrink-0 bg-white dark:bg-gray-800 p-2 rounded-md">
                                <img v-if="getPreviewUrl(item.cart_detail.product.files[0]?.file_path)"
                                    :src="getPreviewUrl(item.cart_detail.product.files[0]?.file_path)" alt="Product 1"
                                    class="w-full h-full object-contain" />
                                <img v-else src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                                    class="w-full h-full object-contain" />
                            </div>

                            <div class="w-full">
                                <h3 class="text-base font-semibold text-gray-800 dark:text-white ">{{
                                    item.cart_detail.product.name }}
                                </h3>
                                <div class="flex gap-4 mt-3">
                                    <div>
                                        <h6
                                            class="text-sm text-gray-800 font-bold cursor-pointer mt-0.5 dark:text-white">
                                            {{
                                                item.cart_detail.product.price }}đ</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr v-if="index < dataSessionDetail.items.length - 1" class="border-gray-300" />
                    </div>
                </div>
            </div>


            <div class="flex flex-col">
                <div class="flex flex-col bg-white dark:bg-gray-700 p-4 rounded-lg mt-2">
                    <div class="flex dark:text-white justify-between mt-3">
                        <span>Phương thức thanh toán
                        </span>
                        <button @click="isOpenPopupPayment = true"
                            class="border-b-2 border-transparent hover:border-blue-500 transition-all duration-300">
                            Xem tất cả
                        </button>
                    </div>

                    <div class="text-gray-800 dark:text-white ml-3 flex space-x-2">
                        <img class="w-6 h-6 dark:fill-white" :src="selectPayment.image" width="24" height="24" alt="" />
                        <span>{{ selectPayment.text }}</span>
                    </div>

                </div>


                <ul class="text-gray-800 mt-4 space-y-2 bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <li class="flex flex-wrap gap-4 text-sm font-bold dark:text-white">Tổng <span class="ml-auto">{{
                        formatNumberWithCommas(priceTotal.total) }}đ</span></li>
                </ul>

                <button type="button" @click="handleOrder"
                    class="mt-8 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md">Đặt
                    Hàng
                </button>
            </div>
        </div>

        <div v-if="isOpenPopupPayment"
            class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-2">
            <!-- Popup Container -->
            <div class="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 dark:bg-gray-800">
                <!-- Header -->
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-200">
                        Chọn phương thức thanh toán
                    </h3>
                    <button
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        @click="isOpenPopupPayment = false">
                        <span class="text-gray-500 dark:text-gray-400">✕</span>
                    </button>
                </div>

                <RadioGroup v-model="selectPayment" @update:modelValue="UpdateSelectPayment" class="mb-4">
                    <RadioGroupLabel class="sr-only">Phương thức thanh toán</RadioGroupLabel>
                    <div class="space-y-2">
                        <RadioGroupOption as="template" v-for="payment in listPayment" :key="payment.type"
                            :value="payment" v-slot="{ active, checked }">
                            <div :class="[
                                active ? 'ring-2 ring-blue-300 dark:ring-blue-500' : '',
                                checked
                                    ? 'bg-blue-500 dark:bg-blue-700 text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200',
                                'transition-all duration-200 ease-in-out'
                            ]" class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                                <div class="flex w-full items-center justify-between">
                                    <div class="flex items-center flex space-x-3">
                                        <img class="w-6 h-6 " :src="payment.image" width="24" height="24" alt="" />
                                        <div class="text-sm">
                                            <RadioGroupLabel as="p"
                                                :class="checked ? 'text-white' : 'text-gray-900 dark:text-gray-200'"
                                                class="font-medium">
                                                {{ payment.text }}
                                            </RadioGroupLabel>
                                        </div>
                                    </div>
                                    <div v-show="checked" class="shrink-0 text-white">
                                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                                            <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </RadioGroupOption>
                    </div>
                </RadioGroup>
                <!-- Footer -->
                <div class="flex justify-end space-x-3">
                    <button @click="isOpenPopupPayment = false"
                        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg">
                        Đóng
                    </button>
                </div>
            </div>
        </div>

    </div>
    <PaymentQr :qrUrl="paymentOnlineQRUrl" :paymentType="selectPayment" :dataPayment="dataPayment" @close="closePopupQR"
        @paymentSuccess="paymentSuccess" />
</template>

<script setup>
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue'
import PaymentQr from '@/component/PaymentQr.vue';
import apiServices from '@/services/api.services';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPreviewUrl, formatNumberWithCommas } from "@/utils/extensions";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'



const paymentOnlineQRUrl = ref(null);
const dataPayment = ref(null)

const closePopupQR = () => {
    paymentOnlineQRUrl.value = null;
}

const paymentSuccess = async (paymentData) => {
    paymentOnlineQRUrl.value = null;

    if (paymentData) {
        const body = {
            payment_type: paymentData.type,
            payment_online_id: paymentData.id
        }

        Swal.fire({
            title: 'Đang xử lý đơn hàng...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const response = await apiServices.postOrder(route.params.session_id, body)
        Swal.close()

        if (response.code === 200) {
            router.push({ name: "Orders" });
        } else {
            toast(response.message.text || "Hệ thống đang gặp vấn đề, vui lòng liên hệ hotline để hỗ trợ", {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'error'
            });
        }
    } else {
        toast("Hệ thống đang gặp vấn đề, vui lòng liên hệ hotline để hỗ trợ", {
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

const isOpenPopupPayment = ref(false)

const UpdateSelectPayment = (payment) => {
    if (selectPayment.value.type !== payment.type) {
        selectPayment.value = payment;
    }
    isOpenPopupPayment.value = false; // Luôn đóng popup dù có đổi hay không
};

const type_payment = {
    'PAYMENT_MOMO': 'momo',
    'PAYMENT_ZALO': 'zalo'
}


const listPayment = [
    {
        "image": "/assets/icons/momo.svg",

        "type": type_payment.PAYMENT_MOMO,
        "text": "Thanh toán ví MOMO"
    },
    {
        "image": "/assets/icons/zalo.png",
        "type": type_payment.PAYMENT_ZALO,
        "text": "Thanh toán ví ZALO"
    },
]

const selectPayment = ref(listPayment[0])


const route = useRoute();
const router = useRouter();

const dataSessionDetail = ref(null);

const getSessionDetail = async (session_id) => {
    try {
        const result = await apiServices.getSessionOrder(session_id);
        if (result.code === 200) {
            dataSessionDetail.value = result.data;
            priceTotal.value.total = result.data.total
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};





const priceTotal = ref({
    'total': 0
})

const handleOrder = async () => {
    try {
        if (selectPayment.value === null) {
            toast("Bạn chưa chọn phương thức thanh toán", {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'error'
            });
            return
        }
        const body = {
            payment_type: selectPayment.value.type
        }
        const response = await apiServices.postPaymentOnline(route.params.session_id, body)

        if (response.code === 200) {
            if (response.data?.pay_url) {
                paymentOnlineQRUrl.value = response.data.pay_url
                dataPayment.value = response.data
            } else {
                toast("Ví hiện tại không khả dụng, vui lòng chọn phương thức khác.", {
                    position: 'bottom-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                    type: 'error',
                });

            }
        } else {
            toast("Ví hiện tại không khả dụng, vui lòng chọn phương thức khác.", {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                type: 'error',
            });
        }

    } catch (error) {
        console.error("Error loading addresses:", error)
    }
}


const isLoading = ref(true);

onMounted(async () => {
    await getSessionDetail(route.params.session_id);

    isLoading.value = false;
});
</script>