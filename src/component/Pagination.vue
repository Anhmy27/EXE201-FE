<template>
    <div class="flex">
        <ul class="flex justify-center space-x-4 md:space-x-6">
            <li class="flex items-center justify-center shrink-0 w-4 h-6 rounded-full cursor-pointer"
                @click="changePage(1)">
                <svg class="w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5" :class="{
                        'stroke-gray-300 dark:stroke-gray-500': !prevPage,
                        'stroke-gray-700 dark:stroke-white': prevPage
                    }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5" :class="{
                        'stroke-gray-300 dark:stroke-gray-500': !prevPage,
                        'stroke-gray-700 dark:stroke-white': prevPage
                    }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </li>
            <!-- Nút Previous -->
            <li class="flex items-center justify-center shrink-0 w-6 h-6 rounded-full cursor-pointer"
                @click="changePage(page - 1)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3"
                    :class="{ 'fill-gray-300 dark:fill-gray-500': !prevPage, 'fill-gray-700 dark:fill-white': prevPage }"
                    viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>

            <!-- Hiển thị các trang -->
            <li v-for="item in pages" :key="item"
                class="flex items-center justify-center shrink-0 border-b-[3px] cursor-pointer text-base font-bold px-1"
                :class="{
                    'border-gray-800 dark:border-white text-gray-800 dark:text-white': item === page,
                    'border-transparent text-gray-400 dark:text-gray-500': item !== page,
                }" @click="changePage(item)">
                {{ item }}
            </li>

            <!-- Nút Next -->
            <li class="flex items-center justify-center shrink-0 w-6 h-6 rounded-full cursor-pointer"
                @click="changePage(page + 1)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 rotate-180"
                    :class="{ 'fill-gray-300 dark:fill-gray-500': !nextPage, 'fill-gray-700 dark:fill-white': nextPage }"
                    viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>

            <li class="flex items-center justify-center shrink-0 w-4 h-6 rounded-full cursor-pointer"
                @click="changePage(totalPage)">
                <svg viewBox="0 0 24 24" fill="none" class="w-4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" :class="{
                        'stroke-gray-300 dark:stroke-gray-500': !nextPage,
                        'stroke-gray-700 dark:stroke-white': nextPage
                    }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19" :class="{
                        'stroke-gray-300 dark:stroke-gray-500': !nextPage,
                        'stroke-gray-700 dark:stroke-white': nextPage
                    }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from "vue";

// Nhận props từ parent
const props = defineProps({
    page: {
        type: Number,
        required: true,
    },
    totalPage: {
        type: Number,
        required: true,
    },
    nextPage: {
        type: Boolean,
        required: false,
    },
    prevPage: {
        type: Boolean,
        required: false,
    },
});


const emit = defineEmits(["setPage"]);

const pages = computed(() => {
    const result = [];
    const maxVisiblePages = 5;

    if (props.totalPage <= maxVisiblePages) {
        // Hiển thị tất cả các trang nếu tổng số trang <= 5
        for (let i = 1; i <= props.totalPage; i++) {
            result.push(i);
        }
    } else {
        let startPage, endPage;

        if (props.page <= Math.floor(maxVisiblePages / 2)) {
            // Các trang đầu tiên
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (props.page >= props.totalPage - Math.floor(maxVisiblePages / 2)) {
            // Các trang cuối cùng
            startPage = props.totalPage - maxVisiblePages + 1;
            endPage = props.totalPage;
        } else {
            // Các trang ở giữa
            startPage = props.page - Math.floor(maxVisiblePages / 2);
            endPage = props.page + Math.floor(maxVisiblePages / 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            result.push(i);
        }
    }

    return result;
});

// Hàm thay đổi trang
const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= props.totalPage && newPage !== props.page) {
        emit("setPage", newPage);
    }
};
</script>