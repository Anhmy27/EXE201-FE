<template>
    <div v-if="qrUrl" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- Modal container -->
        <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <div
                class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-4 sm:w-full md:max-w-2xl">

                <!-- Header -->
                <div class="border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3">
                    <div class="flex items-center justify-between">
                        <img class="w-8 h-8 " :src="paymentType.image" width="24" height="24" alt="" />
                        <button @click="$emit('close')"
                            class="rounded-full text-gray-400 bg-gray-200 dark:bg-gray-600 hover:text-gray-500 p-2">
                            <XIcon class="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div class="px-4 py-4">
                    <div class="grid gap-4 md:p-4">
                        <!-- Thông tin đơn hàng -->
                        <div class="border rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800">
                            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                                Thông tin đơn hàng
                            </h2>

                            <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <p><strong>Số tiền:</strong> <span
                                        class="text-green-600 font-semibold">{{ dataPayment?.amount }}₫</span>
                                </p>
                                <p><strong>Mã giao dịch:</strong>ID-{{ dataPayment?.payment_online_id }}</p>

                                <p><strong>Nội dung:</strong> {{ dataPayment?.description }}</p>

                                <p><strong>Trạng thái:</strong> <span class="text-red-500 font-semibold">Thanh toán chưa
                                        hoàn tất</span></p>
                            </div>
                        </div>

                        <!-- Mã QR -->
                        <div class="border rounded-lg p-4 shadow-md flex flex-col items-center justify-center py-8">
                            <div class="text-gray-700 dark:text-gray-200 font-medium mb-2 md:mb-4">Quét QR để thanh toán
                            </div>
                            <qrcode-vue :value="qrUrl" :size="200" />
                        </div>

                    </div>
                </div>


                <!-- Footer -->
                <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs, onBeforeUnmount } from 'vue';
import QrcodeVue from "qrcode.vue";
import { XIcon } from 'lucide-vue-next'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiServices from '@/services/api.services';
const props = defineProps({
    qrUrl: {
        type: String,
        default: null
    },
    paymentType: {
        type: Object,
        default: {}
    },
    dataPayment: {
        type: Object,
        default: {}
    }
});

const emit = defineEmits(['close', 'paymentSuccess']);
const dataPaymentRef = toRefs(props).dataPayment;


const checkPayment = async () => {
    try {
        const response = await apiServices.getPayment(dataPaymentRef.value.payment_online_id);
        if (response?.code === 200) {
            if (response?.data?.status_payment === true) {
                toast("Thanh toán thành công", {
                    position: 'bottom-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
                    type: 'success'
                });
                setTimeout(() => {
                    emit('paymentSuccess', response.data);
                }, 1000);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const seconds = 10 ;
let intervalId = null;

onMounted(() => {
    intervalId = setInterval(async () => {
        await checkPayment();
    }, 1000 * seconds);
});

onBeforeUnmount(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

</script>

<style scoped></style>