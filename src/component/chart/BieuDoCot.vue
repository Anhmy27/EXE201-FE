<template>
    <div class="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
        <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col space-y-1">
                <h5 class="text-xl font-bold text-gray-800 dark:text-white me-1">{{ props.titleChart }}</h5>
                <div class="text-gray-800 dark:text-white" v-if="props.subtitle"> {{ props.subtitle }}</div>
            </div>
        </div>
        <!-- Biểu đồ -->
        <div class="py-6" ref="chartContainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import ApexCharts from "apexcharts";

// Props nhận dữ liệu từ bên ngoài
const props = defineProps({
    titleChart: { type: String, default: "Biểu đồ" },
    subtitle: { type: String, default: null },
    seriesData: { type: Array, required: true }, // [{ name: '...', data: [...] }]
    categories: { type: Array, required: true }, // ["Jul", "Aug", "Sep", ...]
    horizontal: {type: Boolean, default: false}
});

const chartContainer = ref(null);

// Hàm tạo màu ngẫu nhiên cho nhiều series
const generateColors = (count) => {
    const baseColors = ["#31C48D", "#F05252", "#1A56DB", "#EAB308", "#22C55E", "#14B8A6"];
    let colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]); // Lặp lại nếu thiếu màu
    }
    return colors;
};

// Hàm render chart
const renderChart = () => {
    if (chartContainer.value && typeof ApexCharts !== "undefined") {
        const colors = generateColors(props.seriesData.length);

        const options = {
            series: props.seriesData.map((s, index) => ({
                ...s,
                color: colors[index]
            })),
            chart: {
                type: "bar",
                height: 400,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: props.horizontal,
                    columnWidth: "60%",
                    borderRadius: 6
                }
            },
            xaxis: {
                categories: props.categories,
                labels: {
                    style: {
                        fontFamily: "Inter, sans-serif",
                        colors: "gray" // White in dark mode, gray-300 in light mode
                    }
                },
                axisTicks: { show: false },
                axisBorder: { show: false }
            },
            yaxis: {
                labels: {
                    style: {
                        fontFamily: "Inter, sans-serif",
                        colors: "gray" // White in dark mode, gray-300 in light mode
                    }
                }
            },
            grid: { show: true, strokeDashArray: 4 },
            legend: { show: true, position: "bottom" },
            dataLabels: { enabled: false },
            colors: colors
        };

        const chart = new ApexCharts(chartContainer.value, options);
        chart.render();
    }
};

// Khi component mount
onMounted(() => {
    renderChart();
});

// Khi dữ liệu thay đổi -> vẽ lại chart
watch(() => props.seriesData, () => {
    renderChart();
}, { deep: true });

</script>
