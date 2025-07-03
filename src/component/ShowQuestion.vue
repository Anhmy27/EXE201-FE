<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:data', 'deleteQuestion', 'answerSelected'])

const props = defineProps({
    data: { type: Object, required: true },
    stt: { type: Number, default: 1 }
})

const selectedAnswerId = ref(null)
const letterLabels = ['A', 'B', 'C', 'D']

// Emit khi chọn radio
watch(selectedAnswerId, (newVal) => {
    if (newVal) {
        emit('answerSelected', {
            question_id: props.data.id,
            answer_id: newVal
        })
    }
})
</script>

<template>
    <div>
        <div class="p-4 rounded-xl bg-white dark:bg-gray-700 shadow-md space-y-4">
            <h2 class="text-xl mb-3">
                <span class="text-gray-900 font-bold dark:text-gray-100">Câu hỏi {{ stt + 1 }}. </span>
                <span class="text-gray-900 dark:text-gray-200"> {{ data.question }}</span>
            </h2>

            <ul class="space-y-2">
                <li v-for="(answerItem, index) in data.answers.slice(0, 4)" :key="answerItem.id"
                    class="flex items-start space-x-2 p-3 rounded-md border bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
                    <input type="radio" :checked="selectedAnswerId === answerItem.id"
                        @change="selectedAnswerId = answerItem.id" :name="'question-' + data.id"
                        class="form-radio text-green-600 mt-1" />
                    <span class="font-bold text-gray-800 dark:text-gray-200">{{ letterLabels[index] }}.</span>
                    <span class="flex-1">{{ answerItem.answer }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
