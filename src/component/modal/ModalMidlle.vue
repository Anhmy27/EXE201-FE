<template>
    <div>
        <div>
            <div
                class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                <div class="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
                    <div class="flex items-center pb-3 border-b border-gray-300">
                        <h3 class="text-slate-900 dark:text-gray-200 text-xl font-semibold flex-1">{{ props.title }}</h3>
                        <XIcon class="w-3.5 h-3.5 ml-2 dark:text-gray-200 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"></XIcon>
                    </div>

                    <div class="my-6 dark:text-gray-200">
                        {{ props.body }}
                    </div>

                    <div class="border-t border-gray-300 pt-6 flex justify-end gap-4">
                        <button @click="$emit('onCancel')"
                            class="px-4 py-2 dark:text-gray-200 dark:bg-gray-600 rounded-lg text-slate-900 text-sm font-medium border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200">{{ props.buttonCanCelTilte }}</button>
                        <button @click="$emit('OnAccept')"
                            class="px-4 py-2 rounded-lg text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">{{ props.buttonAcceptTilte }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
	title: {
		type: String,
		required: true,
		default: null
	},
	body: {
		type: String,
		required: true,
		default: null
	},
	buttonAcceptTilte: {
		type: String,
		default: 'Đồng ý',
	},
	buttonCanCelTilte: {
		type: String,
		default: 'Hủy',
	}
});

console.log(props.body, props.title)

const emit = defineEmits(['onCancel', 'OnAccept']);
</script>