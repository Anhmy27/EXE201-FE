<template>
    <Loading v-if="isLoading"></Loading>
    <section v-else class="bg-gray-50 dark:bg-gray-900 md:p-3 mb-12">

        <div class="mx-auto max-w-6xl lg:px-6">
            <Breadcrumb class="mb-4 ml-2 bg-gray-50 dark:bg-gray-900 mt-4" :items="[
                {
                    name: 'KHÓA HỌC ' + dataHomeWork?.product?.name.toUpperCase(),
                    href: '/course/' + dataHomeWork?.product?.id
                },
                { name: 'Bài Tập ' + dataHomeWork?.name.toUpperCase(), href: '#', current: true }

            ]" />
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg space-y-4">
                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg p-4">
                    <!-- Wrapper: chia lưới cho content -->
                    <div
                        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900">
                        <!-- Thông tin bài tập -->
                        <div v-if="dataHomeWork" class="space-y-1 text-gray-800 dark:text-gray-100">
                            <h2 class="text-lg font-semibold">{{ dataHomeWork.name }}: {{ dataHomeWork.description }}
                            </h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Số câu hỏi: {{ dataHomeWork.len_question
                            }}</p>
                        </div>

                        <!-- Nút Làm bài -->
                        <button @click="startHomeWork"
                            class="w-full sm:w-auto rounded-md px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow transition">
                            Làm bài
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <tr>

                                <th class="px-4 text-left py-2">
                                    THỜI GIAN
                                </th>

                                <th class="px-4 text-left py-2">
                                    ĐIỂM
                                </th>
                                <th class="px-4 text-left py-2">
                                    TRẠNG THÁI
                                </th>

                                <th class="px-4 text-left w-28 py-2">
                                    Xem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(homework, index) in dataSessionDoHomeWorks" :key="homework.id"
                                class="bg-white border-b dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="px-4 py-3 whitespace-nowrap">{{ formatDateTime(homework.created_date) }}</td>
                                <td class="px-4  py-3 whitespace-nowrap">{{ homework.score }}/ {{ dataHomeWork.len_question }}</td>
                                <td class="px-4 py-3 whitespace-nowrap">
                                    {{ homework.status === true ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}
                                </td>

                                <td class="px-4 py-3 h-full">
                                    <button :id="`${homework.id}-dropdown-button`"
                                        :data-dropdown-toggle="`${homework.id}-dropdown`"
                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div :id="`${homework.id}-dropdown`"
                                        class="hidden z-20 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            :aria-labelledby="`${homework.id}-dropdown-button`">
                                            <li>
                                                <router-link
                                                    :to="{ name: 'HomeWorkDetail', params: { session_id: homework.id } }"
                                                    class="block text-left py-2 w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xem</router-link>
                                            </li>

                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="dataSessionDoHomeWorks.length === 0"
                    class="flex items-center justify-center py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 italic">
                    Chưa làm bài tập lần nào
                </div>
                <div v-else
                    class="flex flex-wrap justify-between gap-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white items-center p-4 rounded-b-xl">
                    <div class="flex items-center text-gray-600 dark:text-gray-300">
                        Hiển thị
                        <span v-if="dataSessionDoHomeWorks.length > 0"
                            class="text-gray-700 dark:text-gray-200 px-1 font-bold">{{
                                1
                                *
                                params.page }}-{{
                                dataSessionDoHomeWorks.length
                                * params.page
                            }} of</span>
                        <span class="text-gray-700 dark:text-gray-200 font-bold"
                            :class="{ 'ml-1': dataSessionDoHomeWorks.length === 0 }">
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
import apiServices from '@/services/api.services';
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from "@/component/Loading.vue";
import Pagination from "@/component/Pagination.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Breadcrumb from "@/component/Breadcrumb.vue";
import 'flowbite'
import { formatDateTime } from '@/utils/extensions.js';
function initDropdowns() {
    import('flowbite').then((module) => {
        module.initDropdowns()
    })
}


// Gọi khi component mount lần đầu
onMounted(async () => {
    isLoading.value = true;
    await getDataHomeWork()
    await getUserDoHomeWork();
    initDropdowns()
    isLoading.value = false;
})
const dataSessionDoHomeWorks = ref([]);


watch(() => dataSessionDoHomeWorks.value, async () => {
    await nextTick()
    initDropdowns()
}, { deep: true })


const route = useRoute();
const router = useRouter();


const params = ref({
    page: 1,
});


const setPage = async (page) => {
    params.value.page = page
    await getUserDoHomeWork();
}

const pagination = ref({
    totalPage: 1,
    count: 10,
    nextPage: null,
    prevPage: null
})

const isLoading = ref(false);

const getUserDoHomeWork = async () => {
    try {
        const result = await apiServices.getUserDoHomeWork(route.params.home_work_id, params.value);
        if (result) {
            dataSessionDoHomeWorks.value = result.data.items;

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

const dataHomeWork = ref(null);

const getDataHomeWork = async () => {
    try {
        const result = await apiServices.getUserHomeWorkDetail(route.params.home_work_id, params.value);
        if (result.code === 200) {
            dataHomeWork.value = result.data;
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
};

const startHomeWork = async () => {
    try {
        const result = await apiServices.startHomeWork(route.params.home_work_id);
        if (result.code === 200) {
            router.push({ name: "HomeWorkDetail", params: { session_id: result.data.id } });
        }
    } catch (error) {
        console.error("Error loading product data:", error);
    }
}

</script>