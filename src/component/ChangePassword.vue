<template>
  <div class="fixed inset-0 p-4 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
      <!-- Close button with hover effect -->
      <button @click="$emit('close')" 
        class="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 
               dark:text-gray-400 dark:hover:text-gray-300
               transition-all duration-100 ease-in-out
               group">
        <div class="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 
                    transform scale-0 group-hover:scale-100 
                    transition-transform duration-100 ease-in-out">
        </div>
        <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-6">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Thay đổi mật khẩu
        </h2>
        
        <!-- Form content -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Mật khẩu hiện tại -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-white">
              Mật khẩu hiện tại
            </label>
            <div class="relative">
              <input 
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="form.currentPassword"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       transition duration-150 ease-in-out"
                :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.currentPassword}"
              >
              <button 
                @click.prevent="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i class="fas" :class="showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <p v-if="errors.currentPassword" class="text-sm text-red-600">
              {{ errors.currentPassword }}
            </p>
          </div>

          <!-- Mật khẩu mới -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-white">
              Mật khẩu mới
            </label>
            <div class="relative">
              <input 
                :type="showNewPassword ? 'text' : 'password'"
                v-model="form.newPassword"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       transition duration-150 ease-in-out"
                :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.newPassword}"
              >
              <button 
                @click.prevent="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i class="fas" :class="showNewPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <p v-if="errors.newPassword" class="text-sm text-red-600">
              {{ errors.newPassword }}
            </p>
          </div>

          <!-- Xác nhận mật khẩu -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-white">
              Xác nhận mật khẩu mới
            </label>
            <div class="relative">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       transition duration-150 ease-in-out"
                :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.confirmPassword}"
              >
              <button 
                @click.prevent="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i class="fas" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Password Requirements -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-700 mb-2">
              Yêu cầu mật khẩu:
            </h3>
            <ul class="space-y-1 text-sm text-gray-600">
              <li class="flex items-center space-x-2">
                <i class="fas fa-check text-green-500" 
                   :class="{'text-gray-300': !validations.minLength}"></i>
                <span>Ít nhất 8 ký tự</span>
              </li>
              <li class="flex items-center space-x-2">
                <i class="fas fa-check text-green-500"
                   :class="{'text-gray-300': !validations.hasNumber}"></i>
                <span>Ít nhất 1 số</span>
              </li>
              <li class="flex items-center space-x-2">
                <i class="fas fa-check text-green-500"
                   :class="{'text-gray-300': !validations.hasSpecial}"></i>
                <span>Ít nhất 1 ký tự đặc biệt</span>
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button type="submit" :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                   bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600
                   transition duration-150 ease-in-out">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { toast } from 'vue3-toastify'
import apiServices from "@/services/api.services"
import Swal from 'sweetalert2'
const emit = defineEmits(['close', 'success'])

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Validate password requirements
const validations = computed(() => {
  const newPassword = form.newPassword
  return {
    minLength: newPassword.length >= 8,
    hasNumber: /\d/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword)
  }
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Validate current password
  if (!form.currentPassword) {
    errors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại'
    isValid = false
  }

  // Validate new password
  if (!form.newPassword) {
    errors.newPassword = 'Vui lòng nhập mật khẩu mới'
    isValid = false
  } else {
    if (!validations.value.minLength) {
      errors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự'
      isValid = false
    } else if (!validations.value.hasNumber) {
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 1 số'
      isValid = false
    } else if (!validations.value.hasSpecial) {
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt'
      isValid = false
    } else if (!validations.value.hasUpperCase) {
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 1 chữ hoa'
      isValid = false
    } else if (!validations.value.hasLowerCase) {
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 1 chữ thường'
      isValid = false
    }
  }

  // Validate confirm password
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới'
    isValid = false
  } else if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    
    const result = await apiServices.putChangePassword({
      current_password: form.currentPassword,
      new_password: form.newPassword,
      confirm_password: form.confirmPassword
    })

    if (result.code === 200) {
      toast("Đổi mật khẩu thành công!", {
        type: 'success',
        position: 'bottom-right'
      })
      toast(result.message.text || "Đổi mật khẩu thành công!", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success',
      });
      emit('success')
    } else {
      toast(result.message.text || "Có lỗi xảy ra!", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error'
      });
      if (result.code === 400) {
        errors.currentPassword = 'Mật khẩu hiện tại không đúng'
      }
    }
  } catch (error) {
    console.error('Error changing password:', error)
    toast("Có lỗi xảy ra khi đổi mật khẩu!", {
      type: 'error',
      position: 'bottom-right'
    })
  } finally {
    isLoading.value = false
  }
}
</script>