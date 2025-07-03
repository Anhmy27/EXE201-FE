<template>
    <div v-if="isEditable">
        <div class="p-4 rounded-xl bg-white dark:bg-gray-700 shadow-md space-y-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200 mb-1">Câu hỏi</label>
            <input v-model="localData.question" type="text"
                class="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Nhập nội dung câu hỏi" />

            <div v-for="(answerItem, index) in localData.answers" :key="index" class="flex items-center mt-2 space-x-2">
                <!-- Radio chọn đúng -->
                <input type="radio" :checked="selectedCorrectIndex === index" @change="setCorrectAnswer(index)"
                    name="correctAnswer" class="form-radio text-green-600" />

                <!-- Label A. B. C. D. -->
                <span class="w-5 font-semibold text-blue-600 dark:text-blue-400">
                    {{ letterLabels[index] }}.
                </span>

                <!-- Input đáp án -->
                <input v-model="answerItem.answer" type="text"
                    class="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    :placeholder="`Đáp án ${letterLabels[index]}`" />
            </div>
        </div>
    </div>

    <div v-else>
        <div class="p-4 rounded-xl bg-white dark:bg-gray-700 shadow-md space-y-4">
            <div class="justify-end flex">
                <button @click="$emit('deleteQuestion', localData.id)"
                    class="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    <!-- <X class="w-4 h-4" /> -->
                    <span>Xóa</span>
                </button>
            </div>


            <h2 class="text-xl  mb-3">
                <span class="text-gray-900 font-bold dark:text-gray-100">Câu hỏi {{ stt + 1 }}. </span>
                <span class="text-gray-900 dark:text-gray-200"> {{ localData.question }}</span>
            </h2>


            <ul class="space-y-2">
                <li v-for="(answerItem, index) in limitedAnswers" :key="index" :class="[
                    'flex items-start space-x-2 p-3 rounded-md border',
                    answerItem.result_answer
                        ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-500 dark:text-green-300'
                        : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200'
                ]">
                    <span :class="[
                        'font-bold',
                        answerItem.result_answer
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-800 dark:text-gray-200'
                    ]">
                        {{ letterLabels[index] }}.
                    </span>
                    <span class="flex-1">
                        {{ answerItem.answer }}
                    </span>
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {X} from 'lucide-vue-next'

const emit = defineEmits(['update:data', 'deleteQuestion'])

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    editable: {
        type: Boolean,
        default: false
    },
    stt: {
        type: Number,
        default: 1
    }
})

const letterLabels = ['A', 'B', 'C', 'D']
const localData = ref({ ...props.data })
// Xác định chỉ số đáp án đúng ban đầu
const selectedCorrectIndex = ref(
    localData.value.answers.findIndex((ans) => ans.result_answer) ?? 0
)


// Khi localData thay đổi sâu, emit ra ngoài
watch(localData, (newVal) => {
    emit('update:data', newVal)
}, { deep: true })

const setCorrectAnswer = (index) => {
    selectedCorrectIndex.value = index
    localData.value.answers.forEach((ans, i) => {
        ans.result_answer = i === index
    })
    // emit cập nhật luôn
    emit('update:data', localData.value)
}

const isEditable = computed(() => props.editable)

const limitedAnswers = computed(() => localData.value.answers.slice(0, 4))
</script>
