<template>
    <form class="w-full">
        <select v-model="selectedOption"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="option in selectList" :key="option.id" :value="option.id">
                {{ option.name }}
            </option>
        </select>
    </form>
</template>

<script setup>
import { ref, watch } from "vue";

// Nhận props từ parent
const props = defineProps({
    selectList: {
        type: Array,
        required: true,
    },
    type_product_id: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["setSelect"]);


const selectedOption = ref("");

watch(
    () => props.type_product_id,
    (newValue) => {
        selectedOption.value = newValue || ""; // Nếu `type_product_id` không có giá trị, đặt mặc định là ""
    },
    { immediate: true } // Chạy ngay khi component được mount
);

// Emit sự kiện khi giá trị thay đổi
watch(selectedOption, (newValue) => {
    emit("setSelect", newValue);
});
</script>