<template>
    <div class="h-full w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
        <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col space-y-1">
                <h5 class="text-xl font-bold text-gray-800 dark:text-white me-1">{{ props.titleChart }}</h5>
                <div class="text-gray-800 dark:text-white" v-if="props.subtitle"> {{ props.subtitle }}</div>
            </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
            <div class="grid grid-cols-3 gap-3 mb-2">
                <dl
                    class="bg-yellow-100 dark:bg-yellow-900 rounded-lg flex flex-col items-center justify-center h-[78px]">
                    <dt
                        class="w-8 h-8 rounded-full bg-yellow-200 dark:bg-yellow-700 text-yellow-700  dark:text-yellow-100  text-sm font-medium flex items-center justify-center mb-1">
                        {{ data.pending }}
                    </dt>
                    <dd class="text-yellow-700 dark:text-yellow-100 text-sm font-medium">Đang chờ</dd>
                </dl>

                <dl class="bg-green-100 dark:bg-green-900 rounded-lg flex flex-col items-center justify-center h-[78px]">
                    <dt
                        class="w-8 h-8 rounded-full bg-green-200 dark:bg-green-600 text-green-700 dark:text-green-100 text-sm font-medium flex items-center justify-center mb-1">
                        {{ data.delivering }}
                    </dt>
                    <dd class="text-green-700 dark:text-green-100 text-sm font-medium">Đang giao</dd>
                </dl>

                <dl class="bg-red-100 dark:bg-red-900 rounded-lg flex flex-col items-center justify-center h-[78px]">
                    <dt
                        class="w-8 h-8 rounded-full bg-red-200 dark:bg-red-600 text-red-700 dark:text-red-100 text-sm font-medium flex items-center justify-center mb-1">
                        {{ data.resolved }}
                    </dt>
                    <dd class="text-red-700 dark:text-red-100 text-sm font-medium">Hoàn thành</dd>
                </dl>

            </div>
        </div>

        <div class="py-6" id="radial-chart"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ApexCharts from 'apexcharts';

const props = defineProps({
    titleChart: { type: String, default: "Biểu đồ" },
    subtitle: { type: String, default: null },
    data: { type: Object, required: true },
});

const getChartOptions = () => {
    return {
        series: props.data.chartData,
        colors: ['#EF4444', '#10B981', '#F59E0B'],
        chart: {
            height: '100%',
            width: '100%',
            type: 'radialBar',
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                track: {
                    background: '#E5E7EB',
                },
                dataLabels: {
                    show: false,
                },
                hollow: {
                    margin: 0,
                    size: '32%',
                },
            },
        },
        grid: {
            show: false,
        },
        labels: ['Hoàn thành', 'Đang giao', 'Đang chờ'],
        legend: {
            show: true,
            position: 'bottom',
        },
    };
};

onMounted(() => {
    if (document.getElementById('radial-chart')) {
        const chart = new ApexCharts(document.querySelector('#radial-chart'), getChartOptions());
        chart.render();
    }
});
</script>
