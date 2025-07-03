<template>
  <InputCode :email="body.email" v-model:verity_code_id="verity_code_id" v-if="showModal && verity_code_id" :type_input_code="type_input_code" @submitcode="VerifyCode" @close="closeInputCode" />
  <div class="grid items-center gap-8 h-full">
    <div class="flex items-center md:p-8 p-6 dark:bg-[#0C172C] h-full">
      <form class="max-w-lg w-full mx-auto space-y-6">
        <div>
          <h3 class="text-3xl font-bold text-blue-500 dark:text-yellow-400">Tạo tài khoản</h3>
        </div>

        <div>
          <label for="full_name" class="text-gray-800 dark:text-white text-xs block mb-2">Họ Tên</label>
          <div class="relative flex items-center">
            <input id="full_name" v-model="body.full_name" type="text" required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
              placeholder="Nhập tên" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"></path>
            </svg>
          </div>
        </div>
        <div>
          <label for="birthday" class="text-gray-800 dark:text-white text-xs block mb-2">Ngày Sinh</label>
          <div class="relative">
            <input type="date" id="birthday" v-model="body.birthday" required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none pr-10"
              :max="new Date().toISOString().split('T')[0]" />
            <!-- Icon lịch -->
            <svg
              class="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 my-auto text-gray-400 dark:text-gray-300 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM5 20a1 1 0 0 1-1-1V10h16v9a1 1 0 0 1-1 1Z">
              </path>
            </svg>
          </div>
        </div>
        <div>
          <label for="phone" class="text-gray-800 dark:text-white text-xs block mb-2">Số Điện Thoại</label>
          <div class="relative flex items-center">
            <input id="phone" v-model="body.phone" type="text" required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
              placeholder="Nhập SĐT" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path fill="none" stroke-miterlimit="10" stroke-width="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"></path>
              </g>
            </svg>
          </div>
        </div>
        <div>
          <label for="email" class="text-gray-800 dark:text-white text-xs block mb-2">Email</label>
          <div class="relative flex items-center">
            <input id="email" v-model="body.email" type="text" autocomplete="username" required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
              placeholder="Enter email" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path fill="none" stroke-miterlimit="10" stroke-width="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"></path>
              </g>
            </svg>
          </div>
        </div>
        <div>
          <label for="password" class="text-gray-800 dark:text-white text-xs block mb-2">Mật khẩu</label>
          <div class="relative flex items-center">
            <input id="password" v-model="body.password" type="password" autocomplete="new-password" autocorrect="off"
              required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
              placeholder="Enter password" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
              class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"></path>
            </svg>
          </div>
        </div>
        <div>
          <label for="confirm_password" class="text-gray-800 dark:text-white text-xs block mb-2">Xác nhận mật
            khẩu</label>
          <div class="relative flex items-center">
            <input id="confirm_password" v-model="body.confirm_password" autocomplete="new-password" autocorrect="off"
              type="password" required
              class="w-full bg-transparent text-sm text-black dark:text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
              placeholder="Enter password" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
              class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"></path>
            </svg>
          </div>
        </div>

        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 rounded" v-model="agreeToTerms" />
          <label for="remember-me" class="text-gray-800 dark:text-white ml-3 block text-sm">
            Tôi đồng ý với <a href="/term"
              class="text-blue-500 dark:text-yellow-400 font-semibold hover:underline ml-1">Điều khoản và Dịch vụ</a>
          </label>
        </div>

        <div>
          <button @click="register" type="button"
            class="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-blue-400 hover:bg-blue-500  dark:bg-yellow-400 dark:hover:bg-yellow-500 focus:outline-none">
            Register
          </button>
          <p class="text-sm text-gray-800 dark:text-white mt-8">Bạn đã có tài khoản?
            <router-link :to="{ name: 'Login' }"
              class="text-blue-500 dark:text-yellow-400 font-semibold hover:underline ml-1">Đăng nhập</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiServices from "@/services/api.services";
import Swal from "sweetalert2";
import InputCode from "@/component/InputCode.vue";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStorage } from "@vueuse/core";
const userProfile = useStorage("userProfile", { key: "value" });
onMounted(() => {
  if (
    userProfile.value &&
    userProfile.value.id &&
    userProfile.value.param_router
  ) {
    router.push(userProfile.value.param_router);
  }
});

const router = useRouter();
const body = ref({
  full_name: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: '',
  birthday: null,
});

const showModal = ref(false)
const type_input_code = ref('register')
function VerifyCode() {
  showModal.value = false;
  let timerInterval;
  Swal.fire({
    title: "Xác thực thành công!",
    html: "Chuyển sang màn login trong <b>3</b> giây.",
    timer: 3000, // 3 giây
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      let countdown = 3;
      timerInterval = setInterval(() => {
        countdown -= 1;
        timer.textContent = countdown;
      }, 1000); // Cập nhật mỗi giây
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      router.push({ name: 'Login' }); // Điều hướng đến màn login
    }
  });
}

const closeInputCode = () => {
  showModal.value = false;
  verity_code_id.value = null
}

const verity_code_id = ref(null)
const agreeToTerms = ref(false); // Biến ref lưu trạng thái checkbox

const register = async () => {
  if (!agreeToTerms.value) {
    toast("Bạn chưa đồng ý điều khoản", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error',
    });
    return; // Dừng nếu chưa tích vào checkbox
  }
  if (!body.value.birthday || body.value.birthday.trim() === "") {
    toast("Ngày sinh không được trống", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error',
    });
    return; // Dừng lại nếu birthday bị trống
  }

  const response = await apiServices.postRegister(body.value)
  if (response.code === 200) {
    verity_code_id.value = response.data.verity_code_id
    showModal.value = true;
  } else if (response.code === 400) {
    if (response.data) {
      // Lấy lỗi đầu tiên của mỗi trường
      const firstErrorKey = Object.keys(response.data)[0];

      // Lấy message lỗi đầu tiên của key đó
      const errorMessage = response.data[firstErrorKey][0];

      toast(errorMessage || "Đăng ký thất bại", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error',
      });

    }
    else {
      toast(response.message.text || "Đăng ký thất bại", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'error',
      });
    }
  }
  else {
    toast(response.message.text || "Đăng ký thất bại", {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      type: 'error',
    });
  }

};
</script>

<style scoped>
/* Ẩn icon mặc định của input date */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 10px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
