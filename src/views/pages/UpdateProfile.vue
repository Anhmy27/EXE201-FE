<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <Breadcrumb :items="[
        {
          name: 'Trang chủ', href: userProfile.param_router && userProfile.param_router !== 'unfile'
            ? userProfile.param_router
            : '/'
        },
        { name: 'Thông tin cá nhân', href: '/profile' },
        { name: 'Cập nhật', href: '/profile/update', current: true }

      ]" />
    </div>

    <!-- Layout with Sidebar -->
    <div class="flex flex-col md:flex-row gap-6 mb-8">
      <!-- Main Content -->
      <div class="flex-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <!-- Existing content moved here -->
          <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Hồ sơ của tôi
              </h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <!-- Cột bên trái: Avatar -->
              <div class="flex justify-center">
                <div class="relative w-[150px] h-full">
                  <!-- Avatar -->
                  <Avatar :imageSrc="avatarImage" :name="dataProfileUpdate?.value?.full_name || 'No Name'" :size="150"
                    :rounded="true" class="w-full h-full" />

                  <!-- Nút thay đổi ảnh đại diện (góc trái dưới) -->
                  <button @click="selectAvatar"
                    class="absolute bottom-0 right-0 bg-white border border-gray-300 text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-200 group">
                    <Camera class="w-4 h-4"></Camera>
                    <span
                      class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black text-sm px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Thay đổi ảnh đại diện
                    </span>
                  </button>

                  <!-- Hidden File Input -->
                  <input type="file" ref="fileInput" @change="onImageSelect" class="hidden" accept="image/*" />
                </div>
              </div>

              <!-- Cột bên phải: Thông tin -->
              <div class="flex flex-col gap-6">
                <!-- Email -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Địa chỉ email</label>
                  <input v-model="dataProfileUpdate.email" type="email" disabled
                    class="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300" />
                </div>

                <!-- Nút đổi mật khẩu -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
                  <button @click="changePassword"
                    class="w-full px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600">
                    Thay đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>


            <!-- Main Content -->
            <div class="space-y-6">
              <!-- Đường kẻ ngăn cách -->
              <hr class="my-8 border-gray-200 dark:border-gray-700" />

              <h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Cập nhật thông tin cá nhân
              </h2>

              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Họ và Tên -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Họ và tên</label>
                  <input v-model="dataProfileUpdate.full_name" type="text"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Nhập họ và tên" />
                </div>
                <!-- Thông tin liên hệ -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Cột trái: Ngày sinh và Số liên lạc -->
                  <div class="space-y-4">
                    <!-- Ngày sinh -->
                    <div class="pace-y-2 md:space-y-0">
                      <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 md:w-24">Ngày sinh:</label>
                        <CustomDatePicker v-model="dataProfileUpdate.birthday" placeholder="Chọn ngày sinh"
                          :customConfig="{ maxDate: new Date() }" @change="setDate" />
                      </div>
                    </div>
                    <!-- Số điện thoại -->
                    <div class="space-y-2 md:space-y-0">
                      <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 md:w-24">Số liên lạc:</label>
                        <input v-model="dataProfileUpdate.phone" type="tel"
                          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Nhập số điện thoại" />
                      </div>
                    </div>
                  </div>
                  <!-- Cột phải: Giới tính -->
                  <div class="space-y-2 md:space-y-0">
                    <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 md:w-24">Giới tính:</label>
                      <select v-model="dataProfileUpdate.gender"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option :value="true">Nam</option>
                        <option :value="false">Nữ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center pt-6">
                  <button type="submit"
                    class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal nhập mã xác thực -->
    <InputCode v-if="showInputCode" :verity_code_id="verityCodeId" @close="closeVerifyModal"
      @submitcode="onVerifySuccess" />

    <!-- Modal đổi mật khẩu -->
    <ChangePassword v-if="showChangePassword" @close="closeChangePasswordModal" @success="onChangePasswordSuccess" />

    <CropImageAvatar :isCropperModalVisible="isCropperModalVisible" :imageUrl="imageUrl" @saveAvatar="saveAvatar"
      @closeModal="closeCropper" />
  </div>
</template>

<script setup>
import apiServices from "@/services/api.services";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CustomDatePicker from '@/component/CustomDatePicker.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import InputCode from '@/component/InputCode.vue';
import ChangePassword from '@/component/ChangePassword.vue';
import Breadcrumb from '@/component/Breadcrumb.vue';
import { useStorage } from "@vueuse/core";
import CropImageAvatar from "@/component/CropImageAvatar.vue";
import { getPreviewUrl } from "@/utils/extensions";
import Avatar from "@/component/Avatar.vue";
import { Camera } from 'lucide-vue-next';
const fileInput = ref(null);
const userProfile = useStorage("userProfile", { key: "value" });

const isCropperModalVisible = ref(false);
const imageUrl = ref(null);

const avatarImage = computed(() => {
  return getPreviewUrl(dataAvatar?.value?.file_path);
})
const selectAvatar = async () => {
  fileInput.value.click();
}

const onImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      isCropperModalVisible.value = true;
    };
    reader.readAsDataURL(file);
  }
  event.target.value = null;
};

const saveAvatar = async (avatar_id) => {
  try {
    const result = await apiServices.updateAvatar(avatar_id);
    if (result.code === 200) {
      dataAvatar.value = result.data.avatar;
      userProfile.value.avatar = result.data.avatar;
      toast('Cập nhật ảnh đại diện thành công', {
        position: 'bottom-right',
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      });
      isCropperModalVisible.value = false;
    }
  } catch (error) {
    toast("Failed to update avatar.", {
      position: 'bottom-right',
      autoClose: 5000,
      type: 'error',
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    });
  }
};

const closeCropper = () => {
  isCropperModalVisible.value = false;
};

const route = useRoute();
const router = useRouter();

const showInputCode = ref(false);
const showChangePassword = ref(false);
const verityCodeId = ref(null);

const changePassword = async () => {
  try {
    // Kiểm tra xem có email không
    if (!dataProfileUpdate.value.email) {
      toast("Không tìm thấy địa chỉ email!", {
        type: 'error',
        position: 'bottom-right'
      });
      return;
    }

    const body = {
      type_input_code: 'update_account'
    }

    const response = await apiServices.postSendCode(body);

    if (response.code === 200) {
      verityCodeId.value = response.data.verity_code_id;
      showInputCode.value = true;
      toast("Mã xác thực đã được gửi đến email của bạn", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success'
      });

    } else {
      toast("Có lỗi xảy ra khi gửi mã", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Error sending code:', error);
    toast("Có lỗi xảy ra khi gửi mã", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error'
    });
  }
};

const closeVerifyModal = () => {
  showInputCode.value = false;
};

const onVerifySuccess = () => {
  showInputCode.value = false;
  showChangePassword.value = true;
};

const closeChangePasswordModal = () => {
  showChangePassword.value = false;
};

const onChangePasswordSuccess = () => {
  showChangePassword.value = false;
  localStorage.removeItem("userProfile");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.push({
    name: 'Login'
  })
};

const updateProfile = async () => {
  try {
    const result = await apiServices.updateProfile(dataProfileUpdate.value);
    if (result.code === 200) {
      toast(result.message.text || "Product added successfully!", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success',
      });
      localStorage.setItem('userProfile', JSON.stringify(result.data));

    }
    else {
      toast(result.message.text || "An error occurred. Please try again.", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error'
      });
    }
  } catch (error) {
    toast("Something went wrong! Please try again later.", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error'
    });
  }
};

const dataAvatar = ref(null);

const getProfile = async () => {
  try {
    const result = await apiServices.getProfile();
    if (result.code === 200) {
      dataAvatar.value = result.data.avatar; 

      const keys = Object.keys(dataProfileUpdate.value);
      for (const key in result.data) {
        if (keys.includes(key)) {
          if (key === 'birthday') {
            const date = new Date(result.data[key]); // Chuyển đổi chuỗi thành đối tượng Date
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo là 2 chữ số
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (cộng 1 vì getMonth() trả về giá trị từ 0-11)
            const year = date.getFullYear(); // Lấy năm

            result.data[key] = `${day}/${month}/${year}`;
          }
          dataProfileUpdate.value[key] = result.data[key];
        }
      }
    }
  } catch (error) {
    console.error("Error loading profile data:", error);
  }
};


const setDate = (date) => {
  const day = date[0].getDate().toString().padStart(2, '0'); // Ngày (01-31)
  const month = (date[0].getMonth() + 1).toString().padStart(2, '0'); // Tháng (01-12)
  const year = date[0].getFullYear(); // Năm (4 chữ số)

  const formattedDate = `${day}/${month}/${year}`; // Định dạng ngày/tháng/năm
  console.log(formattedDate); // Kết quả: "04/12/2024"

  dataProfileUpdate.value.birthday = formattedDate; // Gán vào dataProfileUpdate
};


const dataProfileUpdate = ref({
  email: null,
  phone: null,
  birthday: null,
  gender: null,
  full_name: null,
});


onMounted(async () => {
  await getProfile();
});

watch(() => document.documentElement.classList.contains('dark'), (isDark) => {
  const fp = document.querySelector('.flatpickr-input')?._flatpickr;
  if (fp) {
    fp.config.theme = isDark ? 'dark' : 'light';
    fp.redraw();
  }
}, { immediate: true });
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
  @apply text-gray-300 hover:bg-gray-700 !important;
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
