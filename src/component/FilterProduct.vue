<template>
    <div class="flex items-center">
        <div class="relative w-full">
            <!-- Filter Button -->
            <button type="button"
                class="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
                @click="toggleDropdown" id="dropdownFilterButton">
                <svg class="-ms-1 me-2 h-4 w-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                        d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                </svg>
                <span class="dark:text-gray-200 mr-1">Bộ lọc</span>
                <ChevronDown
                    class="w-4 h-4 dark:text-gray-200 transform transition-transform duration-300 ease-in-out" />
            </button>
            <div id="dropdownFilter"
                class="hidden absolute z-10 w-[300px] bg-white dark:bg-gray-700 shadow-xl rounded-lg">
                <div class="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                    <!-- Price Range Filter -->
                    <div v-if="showFromTotal" class="mb-4">
                        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Khoảng Giá</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="relative">
                                <input v-model="filterData.from_money" type="number"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    placeholder="Từ" />
                            </div>
                            <div class="relative">
                                <input v-model="filterData.to_money" type="number"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    placeholder="Đến" />
                            </div>
                        </div>
                    </div>

                    <!-- Product Types Filter -->
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lĩnh vực</h3>
                        <div class="space-y-2">
                            <div v-for="type in typeList" :key="type.id">
                                <!-- Main Type -->
                                <div
                                    class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg">
                                    <div class="flex items-center flex-1">
                                        <input :id="'type-' + type.id" type="checkbox" :value="type.id"
                                            :checked="filterData.select_type.includes(type.id)"
                                            @change="toggleType(type.id)"
                                            @click.stop
                                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600" />
                                        <label :for="'type-' + type.id"
                                            class="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                            {{ type.name }}
                                        </label>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-between">
                        <button
                            class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300"
                            @click="resetFilter">
                            Đặt lại
                        </button>
                        <button class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            @click="submitFilter">
                            Áp dụng
                        </button>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import apiServices from '@/services/api.services';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const emit = defineEmits(['setFilter']);

const props = defineProps({
    showFromTotal: {
        type: Boolean,
        default: true
    }
})
const typeList = ref([]);
const openMenus = ref({});
const filterData = reactive({
    from_money: null,
    to_money: null,
    select_type: [],
});

// Kiểm tra menu có mở không
const isMenuOpen = (menuId) => !!openMenus.value[menuId];

// Toggle mở/đóng menu

const submitFilter = () => {

    emit('setFilter', filterData);
    toggleDropdown();
};

function toggleType(id) {
  const index = filterData.select_type.indexOf(id)
  if (index === -1) {
    filterData.select_type.push(id)
  } else {
    filterData.select_type.splice(index, 1)
  }
}

const resetFilter = () => {
    filterData.from_money = null;
    filterData.to_money = null;
    filterData.select_type = [];

}
const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdownFilter");
    dropdown.classList.toggle("hidden");
};

const handleClickOutside = (event) => {
    const dropdown = document.getElementById("dropdownFilter");
    const button = document.getElementById("dropdownFilterButton");
    if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add("hidden");
    }
};

const getTypeProduct = async () => {
    const result = await apiServices.getTypeFilter();
    if (result && result.code === 200) {
        typeList.value = result.data
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    getTypeProduct()
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped></style>