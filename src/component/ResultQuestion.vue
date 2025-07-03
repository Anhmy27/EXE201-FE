<script setup>
const props = defineProps({
    data: { type: Object, required: true },
    stt: { type: Number, default: 1 },
})
const letterLabels = ['A', 'B', 'C', 'D']
// Emit khi chọn radi
</script>
<template>
    <div>
        <div class="p-4 rounded-xl bg-white dark:bg-gray-700 shadow-md space-y-4">
            <h2 class="text-xl mb-3">
                <span class="text-gray-900 font-bold dark:text-gray-100">Câu hỏi {{ stt + 1 }}. </span>
                <span class="text-gray-900 dark:text-gray-200"> {{ data.question }}</span>
            </h2>

            <ul class="space-y-2">
                <li v-for="(answerItem, index) in data.answers.slice(0, 4)" :key="answerItem.id" :class="[
                    'flex items-start space-x-2 p-3 rounded-md border text-gray-800 dark:text-gray-200',
                    {
                        'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600':
                            !(data.user_answer_id === answerItem.id),
                        'bg-green-300 dark:bg-green-600 border-green-500 dark:border-green-700':
                            data.user_answer_id === answerItem.id && answerItem.result_answer === true,
                        'bg-red-300 dark:bg-red-500 border-red-500 dark:border-red-500':
                            data.user_answer_id === answerItem.id && answerItem.result_answer === false
                    }
                ]">
                    <input :disabled="true" type="radio" :checked="data.user_answer_id === answerItem.id"
                        :name="'question-' + data.id" :class="[
                            'form-radio mt-1',
                            {
                                'text-green-700 ring-green-600': data.user_answer_id === answerItem.id && answerItem.result_answer === true,
                                'text-red-700 ring-red-600': data.user_answer_id === answerItem.id && answerItem.result_answer === false,
                                'text-gray-400': data.user_answer_id !== answerItem.id
                            }
                        ]" />
                    <span class="font-bold text-gray-800 dark:text-gray-200">
                        {{ letterLabels[index] }}.
                    </span>
                    <span class="flex-1">{{ answerItem.answer }}</span>
                </li>


            </ul>
        </div>
    </div>
</template>
