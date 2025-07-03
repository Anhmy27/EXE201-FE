<template>
  <div class="relative w-full">
    <flat-pickr
      v-model="selectedDate"
      :config="mergedConfig"
      :class="[
        'w-full px-4 py-2 border rounded-lg',
        'focus:ring-2 focus:ring-blue-500',
        'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
        customClass
      ]"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';

const props = defineProps({
  modelValue: {
    type: [Date, String, Array, Number],
    default: null
  },
  mode: {
    type: String,
    default: 'single' // 'single' hoặc 'range'
  },
  placeholder: {
    type: String,
    default: 'Chọn ngày'
  },
  customClass: {
    type: String,
    default: ''
  },
  customConfig: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const selectedDate = ref(props.modelValue);

// Base config cho FlatPickr
const baseConfig = {
  dateFormat: 'd/m/Y',
  locale: Vietnamese,
  disableMobile: false,
  allowInput: true,
  theme: 'dark',
  monthSelectorType: 'static',
  nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1 1l4 4.5L1 10" stroke="currentColor" stroke-width="2" fill="none"></path></svg>',
  prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M6 1L2 5.5 6 10" stroke="currentColor" stroke-width="2" fill="none"></path></svg>'
};

// Merge config từ props với base config
const mergedConfig = computed(() => ({
  ...baseConfig,
  mode: props.mode,
  ...(props.mode === 'range' && {
    locale: {
      ...Vietnamese,
      rangeSeparator: ' đến '
    }
  }),
  onChange: (selectedDates, dateStr) => {
    emit('change', selectedDates, dateStr);
  },
  ...props.customConfig
}));

// Watch cho dark mode
watch(() => document.documentElement.classList.contains('dark'), (isDark) => {
  const fp = document.querySelector('.flatpickr-input')?._flatpickr;
  if (fp) {
    fp.config.theme = isDark ? 'dark' : 'light';
    fp.redraw();
  }
}, { immediate: true });

// Watch cho modelValue
watch(() => props.modelValue, (newValue) => {
  selectedDate.value = newValue;
});
</script>

<style>
/* Dark mode styles cho flatpickr */
.flatpickr-calendar.dark {
  @apply bg-gray-800 border-gray-700 shadow-lg !important;
}

.dark .flatpickr-calendar {
  @apply bg-gray-800 border-gray-700 !important;
}

.dark .flatpickr-months .flatpickr-month {
  @apply bg-gray-800 text-gray-100 !important;
}

.dark .flatpickr-months .flatpickr-prev-month,
.dark .flatpickr-months .flatpickr-next-month {
  @apply text-gray-400 hover:text-gray-200 fill-current !important;
}

.dark .flatpickr-weekdays {
  @apply bg-gray-800 !important;
}

.dark .flatpickr-weekday {
  @apply text-gray-400 !important;
}

.dark .flatpickr-day {
  @apply text-gray-400 hover:bg-gray-700 !important;
}


.dark .flatpickr-day.selected {
  @apply bg-blue-600 text-white border-blue-600 !important;
}

.dark .flatpickr-day.today {
  @apply border-gray-600 !important;
}

.dark .flatpickr-day.prevMonthDay,
.dark .flatpickr-day.nextMonthDay {
  @apply text-gray-500 !important;
}

.dark .flatpickr-day.disabled {
  @apply text-gray-600 cursor-not-allowed !important;
}

.dark .flatpickr-time {
  @apply border-t border-gray-700 !important;
}

.dark .flatpickr-time input {
  @apply bg-gray-800 text-gray-300 !important;
}
</style>