<template>
    <div class="fixed inset-0 p-4 flex justify-center items-center z-50">
        <div class="w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative">
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500">✕</button>
            <div class="my-8 text-center">
                <h4 class="text-2xl text-gray-800 font-bold">Insert link</h4>
                <input
                    v-model="url"
                    type="text"
                    placeholder="Enter URL"
                    class="px-4 py-2.5 mt-6 bg-gray-200 text-gray-800 w-full text-sm outline-none rounded-md"
                />
            </div>
            <button @click="submitLink" class="w-full py-2.5 rounded-md bg-blue-600 text-white">Submit</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const emit = defineEmits(['close', 'set-link']);
const url = ref('');

function closeModal() {
    emit('close');
}

function submitLink() {
    if (!/^https?:\/\//.test(url.value)) {
        Swal.fire({
            icon: 'error',
            text: 'The address of this site is not valid. Check the address and try again.',
            confirmButtonText: 'OK'
        });
        return;
    }
    emit('set-link', url.value);
}
</script>
