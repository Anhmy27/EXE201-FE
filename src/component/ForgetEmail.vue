<template>
    <div class="fixed inset-0 p-4 flex justify-center items-center z-50">
        <div class="w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative">
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500">✕</button>
            <div class="my-8 text-center">
                <h4 class="text-2xl text-gray-800 font-bold">Email của bạn</h4>
                <input v-model="email" type="text" placeholder="Nhập email"
                    class="px-4 py-2.5 mt-6 bg-gray-200 text-gray-800 w-full text-sm outline-none rounded-md" />
            </div>
            <button @click="submitEmail" class="w-full py-2.5 rounded-md bg-blue-600 text-white">Xác nhận</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const emit = defineEmits(['close', 'set-email']);
const email = ref('');

function closeModal() {
    emit('close');
}

function submitEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email.value)) {
        emit('set-email', email.value);
    } else {
        toast("Email không hợp lệ", {
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
</script>
