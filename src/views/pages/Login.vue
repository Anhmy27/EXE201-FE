<template>
  <div class="flex min-h-full flex-col justify-center px-6 pt-8 pb-12 lg:px-8 bg-gray-50 dark:bg-gray-800">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Đăng nhập tài khoản của
        bạn</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Email</label>
          <div class="mt-2">
            <input id="email" v-model="body.email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Mật khẩu</label>

          </div>
          <div class="mt-2">
            <input id="password" v-model="body.password" name="password" type="password" autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <button @click="login" type="button"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng
            nhập</button>
        </div>
      </form>

      <p class="mt-5 text-center text-sm/6 text-gray-500 flex justify-between items-center">
        <span class="text-gray-500">Bạn chưa có tài khoản?
          <router-link :to="{ name: 'Register' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
            Đăng ký
          </router-link>
        </span>
        <a @click="showModalForgetMail = true" class="font-semibold text-indigo-600 hover:text-indigo-500">Quên mật
          khẩu?</a>
      </p>

    </div>
  </div>
  <ForgetEmail v-if="showModalForgetMail" @close="showModalForgetMail = false" @set-email="handleSetEmail" />
  <InputCode :email="emailForget" v-model:verity_code_id="verity_code_id" v-if="showInputCode && verity_code_id"
    :type_input_code="type_input_code" @submitcode="VerifyCode" @close="closeInputCode" />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiServices from "@/services/api.services";
import InputCode from '@/component/InputCode.vue';
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStorage } from "@vueuse/core";
import ForgetEmail from '@/component/ForgetEmail.vue';
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

const showModalForgetMail = ref(false);
const showInputCode = ref(false);
const closeInputCode = () => {
  showModalForgetMail.value = false;
  verity_code_id.value = null,
  emailForget.value = null;
}

const emailForget = ref(null);
const type_input_code = ref('forget_pass');
const verity_code_id = ref(null)
const handleSetEmail = async (email) => {
  try {
    showModalForgetMail.value = false;
    emailForget.value = email;

    const body = {
      type_input_code: type_input_code.value,
      email: emailForget.value,
    }

    const response = await apiServices.postSendCode(body);

    if (response.code === 200) {
      verity_code_id.value = response.data.verity_code_id;
      showInputCode.value = true;
      toast(response.message.text || "Gửi mã thành công", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        type: 'success'
      });

    } else {
      toast("Có lỗi xảy ra", {
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
  
  }
};

const VerifyCode = async () => {
  closeInputCode();
}

const router = useRouter();
const body = ref({
  email: '',
  password: '',
});

const login = async () => {
  const response = await apiServices.postLogin(body.value);

  if (response.code === 200) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);

    const userProfile = {
      avatar_url: response.data.avatar_url,
      birthday: response.data.birthday,
      email: response.data.email,
      full_name: response.data.full_name,
      gender: response.data.gender,
      id: response.data.id,
      phone: response.data.phone,
      is_admin: response.data.is_admin,
      avatar: response.data.avatar,
      param_router: response.data.param_router
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    const param_router = response.data.param_router;
    router.push(param_router)

  } else {
    toast(response.message.text || "Đăng nhập không thành công", {
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

</script>

<style></style>
