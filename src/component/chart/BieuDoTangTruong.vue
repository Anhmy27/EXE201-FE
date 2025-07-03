<template>
    <div class="w-full h-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
        <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col space-y-1">
                <h5 class="text-xl font-bold text-gray-800 dark:text-white me-1">{{ props.titleChart }}</h5>
                <div class="text-gray-800 dark:text-white" v-if="props.subtitle"> {{ props.subtitle }}</div>
            </div>
        </div>
        <div ref="chartContainer" class="px-2.5 md:min-h-[300px]"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import ApexCharts from 'apexcharts';

import { formatMoney } from "@/utils/extensions";


const props = defineProps({
    titleChart: { type: String, default: "Biểu đồ" },
    subtitle: { type: String, default: null },

    categories: { type: Array, required: true },
    series: { type: Array, required: true }
});

const chartContainer = ref(null);
let chart = null;

onMounted(async () => {
    await nextTick(); // Đợi Vue render xong
    renderChart();
});

watch(() => [props.categories, props.series], async () => {
    await nextTick();
    if (chart) chart.destroy();
    renderChart();
});

const renderChart = () => {
    if (!chartContainer.value) return;

    const options = {
        chart: {
            type: "area",
            height: "100%", // Đặt chiều cao cụ thể
            width: "100%",
            fontFamily: "Inter, sans-serif",
            toolbar: { show: false }
        },
        series: props.series,
        xaxis: {
            categories: props.categories,
            labels: {
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            }
        },
        yaxis: {
            min: undefined, // Auto-scale
            max: undefined,
            labels: {
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: value => formatMoney(value)
            }
        },
        fill: {
            type: "gradient",
            gradient: { opacityFrom: 0.55, opacityTo: 0 }
        },
        dataLabels: { enabled: false },
        stroke: { width: 6 },
        grid: { show: false }
    };

    chart = new ApexCharts(chartContainer.value, options);
    chart.render();
};
</script>
