<template>
    <div class="fixed inset-0 p-4 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
        <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <!-- Close button -->
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Title -->
            <div class="mb-8 text-center">
                <h4 class="text-2xl text-gray-800 font-bold mb-2">Nhập mã xác minh</h4>
                <p v-if="codeIsTrue" class="text-gray-600 text-sm">Vui lòng nhập mã được gửi đến email của bạn</p>
                <p v-else class="text-red-600 text-sm">Mã code sai, vui lòng nhập lại</p>
            </div>

            <div class="flex flex-col items-center">
                <!-- Input fields -->
                <div class="mb-6">
                    <div class="flex justify-center gap-8">
                        <input v-for="(item, index) in 4" :key="index"
                            class="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="text" maxlength="1" v-model="code[index]" @input="focusNext(index)"
                            :autofocus="index === 0" data-hs-pin-input-item="" />
                    </div>
                </div>

                <!-- Helper text and resend link -->
                <div class="flex justify-between items-center mb-6 text-sm" style="width: 272px">
                    <button :disabled="timeLeft > 0" @click="resendCode"
                        class="text-blue-600 hover:text-blue-700 font-medium">
                        Gửi lại mã
                    </button>
                    <span v-if="timeLeft > 0" class="text-gray-600">
                        Mã hết hạn sau {{ formatTime(timeLeft) }}
                    </span>
                </div>

                <!-- Submit button -->
                <button @click="submitCode"
                    class="py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    style="width: 272px">
                    Xác nhận
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, toRefs } from 'vue';
import apiServices from "@/services/api.services";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();

const codeIsTrue = ref(true)

const props = defineProps({
    verity_code_id: {
        type: String,
    },
    type_input_code: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
})
const verityCodeRef = toRefs(props).verity_code_id;

const emit = defineEmits(['submitcode', 'close']);
const code = ref(['', '', '', '']);

function closeModal() {
    emit('close');
}

function subbmitModal() {
    emit('submitcode');
}

function focusNext(index) {
    if (code.value[index] && index < code.value.length - 1) {
        const nextInput = document.querySelectorAll('[data-hs-pin-input-item]')[index + 1];
        if (nextInput) nextInput.focus();
    }
}

const submitCode = async () => {
    const fullCode = code.value.join('');
    const response = await apiServices.postVerityCode(fullCode, verityCodeRef.value, props.type_input_code);

    if (response.code === 200) {
        toast(response.message.text || "Thành công", {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            type: 'success'
        });
        subbmitModal()
    } else {
        codeIsTrue.value = false
        // resendCode(false)
    }
}


const timeLeft = ref(300); // 5 phút = 300 giây
let timer;

// Format thời gian từ giây sang định dạng mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Bắt đầu đếm ngược
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            clearInterval(timer);
            // Có thể thêm xử lý khi hết thời gian ở đây
        }
    }, 1000);
}

// Reset timer khi gửi lại mã
const resendCode = async () => {
    const result = await apiServices.postSendCode({ type_input_code: props.type_input_code, email: props.email });
    if (result.code === 200) {
        emit('update:verity_code_id', result.data.verity_code_id);
        timeLeft.value = 300; // Reset về 5 phút
        clearInterval(timer);
        startTimer();
        // Xử lý logic gửi lại mã
        code.value = ['', '', '', ''];
        const firstInput = document.querySelector('[data-hs-pin-input-item]');
        if (firstInput) firstInput.focus();
    } else {
        toast("Gửi lại mã không thành công, xin vui lòng thử lại!", {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            type: 'error',
        });
    }

}


onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});

</script>