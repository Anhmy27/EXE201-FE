<template>
    <div class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="$emit('onClose')"></div>

        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div @click.stop
                class="relative rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all my-8 w-full max-w-xl max-h-[80vh] overflow-y-auto custom-scrollbar">
                <!-- Modal content -->
                <div
                    class="relative flex flex-col p-4 bg-white dark:bg-gray-800 md:px-20 text-gray-600 dark:text-gray-300 max-w-xl mx-auto rounded-md">
                    <button @click="$emit('onClose')"
                        class="absolute top-4 right-4 p-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                        <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <h1 class="text-2xl mb-4 justify-center items-center flex font-bold text-gray-900 dark:text-white">
                        Chỉnh sửa 

                    </h1>
                

                    <div class="mt-2 mb-1">
                        <div class="text-base font-bold text-gray-900 dark:text-gray-200 mb-1">
                            Key
                        </div>
                        <textarea v-model="postData.key" @input="removeDiacritics" type="text" required
                            placeholder="Điền key..."
                            class="w-full bg-transparent bg-white dark:bg-gray-800 dark:border-white px-3 py-2 text-gray-700 dark:text-white text-base border-gray-200 rounded-lg peer focus:outline-none focus:ring-0 focus:border-gray-300"></textarea>
                        <p v-if="isKeyError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            Vui lòng điền key
                        </p>
                    </div>

                    <div class="mt-2 mb-1">
                        <div class="text-base font-bold text-gray-900 dark:text-gray-200  mb-1">
                            Tên
                        </div>
                        <textarea v-model="postData.name" type="text" required placeholder="Điền tên..."
                            class="w-full bg-transparent bg-white dark:bg-gray-800 dark:border-white px-3 py-2 text-gray-700 dark:text-white text-base border-gray-200 rounded-lg peer focus:outline-none focus:ring-0 focus:border-gray-300">
                        </textarea>
                        <p v-if="isNameError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            Vui lòng điền tên
                        </p>

                    </div>



                    <div class="justify-end flex mt-2">
                        <button @click="putTypeProduct"
                            class="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Thay đổi </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronDown } from "lucide-vue-next";
import { debounce } from "lodash";
import apiServices from "@/services/api.services";
import { onMounted, ref, toRefs } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(['onClose', 'onReload']);


const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

const postData = toRefs(props).data;


const mainTypes = ref(null);

const removeDiacritics = () => {
    postData.value.key = postData.value.key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


const isKeyError = ref(false)
const isNameError = ref(false)


const validateName = () => {
    isNameError.value = !postData.value.name;
    return !isNameError.value;
};

const validateKey = () => {
    isKeyError.value = !postData.value.key;
    return !isKeyError.value;
};

const validateBodyForm = () => {
    const isNameValid = validateName();
    const isKeyValid = validateKey();

    return isNameValid && isKeyValid;
};



const putTypeProduct = async () => {
    if (!validateBodyForm()) {
        return
    }

    const body = {
        type_id: postData.value.parent?.id,
        key: postData.value.key?.trim(),
        name: postData.value.name?.trim()
    };

    const result = await apiServices.putTypeProduct(postData.value.id, body);
    if (result.code === 200) {
        toast(result.message.text || `Thay đổi thành công.`, {
            position: 'bottom-right',
            autoClose: 2000,
            type: 'success',
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        });
        emit('onUpdate', result.data);


    } else {
        toast(result.message.text || `Có lỗi`, {
            position: 'bottom-right',
            autoClose: 2000,
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        });
    }
}
</script>
