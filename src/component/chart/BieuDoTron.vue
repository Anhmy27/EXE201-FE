<template>
    <div class="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
        <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
                <div class="flex items-center mb-1">
                    <h5 class="text-xl font-bold text-gray-800 dark:text-white me-1">{{ props.titleChart }}</h5>
                </div>
            </div>
        </div>
        <!-- Biểu đồ -->
        <div class="py-6" ref="chartContainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import ApexCharts from "apexcharts";

// 🟢 Props: Nhận dữ liệu từ bên ngoài
const props = defineProps({
    titleChart: { type: String, default: "Biểu đồ" },
    data: {
        type: Object,
        required: true
    }
});

const chartContainer = ref(null);
let chart = null;

// 🎨 Tạo dải màu không trùng nhau
const generateDistinctColors = (length) => {
    return Array.from({ length }, (_, i) => `hsl(${(i * 360) / length}, 50%, 70%)`);
};

// 🏆 Cấu hình biểu đồ
const getChartOptions = () => {
    const labels = Object.keys(props.data);
    const series = Object.values(props.data);
    const colors = generateDistinctColors(labels.length); // Không trùng màu

    return {
        series,
        colors,
        chart: {
            height: "100%",
            width: "100%",
            type: "pie"
        },
        stroke: {
            colors: ["white"]
        },
        plotOptions: {
            pie: {
                size: "100%",
                dataLabels: {
                    offset: -25
                }
            }
        },
        labels,
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: "Inter, sans-serif"
            }
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif"
        }
    };
};

// 🚀 Khởi tạo biểu đồ
onMounted(() => {
    if (chartContainer.value) {
        chart = new ApexCharts(chartContainer.value, getChartOptions());
        chart.render();
    }
});

// 🔄 Cập nhật khi dữ liệu thay đổi
watch(() => props.data, () => {
    if (chart) {
        chart.updateOptions(getChartOptions());
    }
}, { deep: true });

</script>