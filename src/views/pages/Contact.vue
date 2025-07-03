<template>
    <div class="max-w-6xl mx-auto p-6 space-y-16 text-gray-800 dark:text-gray-100">
        <!-- Giới thiệu -->
        <section class="text-center">
            <h1 class="text-4xl font-bold mb-2">Liên Hệ</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                Kết nối với chúng tôi nếu bạn cần hỗ trợ, tư vấn khóa học, kỹ thuật, hoặc thanh toán.
            </p>
        </section>

        <!-- Thông tin hỗ trợ -->
        <section>
            <h2 class="text-2xl font-semibold mb-6">Thông Tin Hỗ Trợ</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="item in supportInfo" :key="item.label"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-start space-x-4">
                    <div class="text-blue-600 text-2xl">
                        <component :is="item.icon" />
                    </div>
                    <div>
                        <h3 class="font-bold text-lg">{{ item.label }}</h3>
                        <p class="text-gray-600 dark:text-gray-300" v-html="item.value" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Chuyển khoản -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Thông Tin Chuyển Khoản</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="wallet in payments" :key="wallet.method"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 space-y-2">
                    <h3 class="text-lg font-bold text-blue-600">{{ wallet.method }}</h3>
                    <p><strong>Chủ tài khoản:</strong> {{ wallet.owner }}</p>
                    <p><strong>Số tài khoản:</strong> {{ wallet.account }}</p>
  
                        <div v-if="wallet.qr" class="mt-3 flex justify-center">
                            <img :src="wallet.qr" :alt="`QR code ${wallet.method}`" class="w-full h-auto object-contain" />
                        </div>

                </div>
            </div>
        </section>


        <!-- Người phụ trách -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Người Phụ Trách</h2>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="contact in contactPeople" :key="contact.name"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
                    <img :src="contact.image" class="w-20 h-20 mx-auto rounded-full object-cover" />
                    <h3 class="mt-3 font-bold">{{ contact.name }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-300">{{ contact.position }}</p>
                    <div class="mt-2 flex justify-center space-x-3">
                        <a v-for="link in contact.socials" :key="link.href" :href="link.href" target="_blank"
                            class="text-blue-600 hover:underline text-sm">
                            {{ link.platform }}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Phone, Mail, Clock, MapPin } from 'lucide-vue-next'

const supportInfo = [
    {
        label: "Hotline 1",
        value: "0856 230 927 (CSKH toàn quốc)",
        icon: Phone,
    },
    {
        label: "Hotline 2",
        value: "0888 282 001 (Tư vấn học viên miền Bắc)",
        icon: Phone,
    },
    {
        label: "Hotline 3",
        value: "0985 187 536 (Tư vấn học viên miền Nam)",
        icon: Phone,
    },
    {
        label: "Email",
        value: `<a href="mailto:myanhva@gmail.com">myanhva@gmail.com</a>`,
        icon: Mail,
    },
    {
        label: "Giờ làm việc",
        value: "8:00 - 20:00 (T2 - CN)",
        icon: Clock,
    },
    {
        label: "Địa chỉ",
        value: "Đại học FPT HÀ Nội",
        icon: MapPin,
    },
];

const payments = [
    {
        method: "Momo",
        owner: "Trương Anh Mỹ",
        account: "0856230927",
        qr: "/assets/images/telegram/qr_tele.jpg"
    },
    {
        method: "ZaloPay",
        owner: "Trương Anh Mỹ",
        account: "0856230927",
        qr: "/assets/images/telegram/qr_tele.jpg"
    },
    
];


const contactPeople = [
    {
        name: "Đỗ Công Minh",
        position: "Quản lý hệ thống & chăm sóc học viên",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        socials: [
            { platform: "Facebook", href: "https://facebook.com" },
            { platform: "Zalo", href: "https://zalo.me" },
        ],
    },
    {
        name: "Lê Thị Thùy Linh",
        position: "Chuyên viên hỗ trợ học vụ",
        image: "https://i.postimg.cc/QCPthjyH/aa.jpg",
        socials: [
            { platform: "Email", href: "mailto:hotro@edu.vn" },
        ],
    },
    {
        name: "Lương Quang Trung",
        position: "Phụ trách kỹ thuật",
        image: "https://i.postimg.cc/sg3XzHnP/anhmy.jpg",
        socials: [
            { platform: "Email", href: "https://linkedin.com" },
        ],
    },
];
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style>
