<template>
    <div class="p-6 max-w-6xl mx-auto space-y-20 text-gray-800 dark:text-gray-100">
        <!-- Giới thiệu -->
        <section class="text-center">
            <h1 class="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
Dự án khởi nghiệp về nền tảng học trực tuyến về AI và tin học văn phòng, được thực hiện bởi nhóm sinh viên ngành Truyền thông và Công nghệ thông tin tại Trường Đại học FPT.
            </p>
        </section>

        <!-- Sứ mệnh & Tầm nhìn -->
        <section>
            <h2 class="text-2xl font-semibold mb-6 text-center">Sứ Mệnh & Tầm Nhìn</h2>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 class="font-bold text-xl mb-3">Sứ mệnh</h3>
                    <p class="text-gray-700 dark:text-gray-300">
                        Mang đến cơ hội học tập chất lượng cho tất cả mọi người, phá vỡ rào cản về địa lý và chi phí.
                        Kết hợp công nghệ tiên tiến với nội dung chuyên sâu từ các chuyên gia để giúp người học phát
                        triển bền vững.
                    </p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 class="font-bold text-xl mb-3">Tầm nhìn</h3>
                    <p class="text-gray-700 dark:text-gray-300">
                        Trở thành nền tảng giáo dục hàng đầu Đông Nam Á vào năm 2030, nơi mọi cá nhân đều có thể tìm
                        thấy hành trình tri thức phù hợp cho chính mình.
                    </p>
                </div>
            </div>
        </section>

        <!-- Giảng viên -->
        

        <!-- Vì sao chọn chúng tôi -->
        <section  class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Vì Sao Chọn Chúng Tôi?</h2>
            <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                <li>Nội dung học được cập nhật liên tục theo xu hướng thị trường</li>
                <li>Học trực tuyến tiện lợi, có thể truy cập mọi lúc mọi nơi</li>
                <li>Đội ngũ giảng viên giàu kinh nghiệm từ các trường và tập đoàn lớn</li>
                <li>Hỗ trợ học viên 24/7 qua nhiều kênh như chat, email, video call</li>
                <li>Cấp chứng chỉ uy tín, có giá trị toàn quốc</li>
            </ul>
        </section>

        <!-- Lộ trình phát triển 
        <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Lộ Trình Phát Triển</h2>
            <div class="space-y-6 border-l-4 border-blue-500 pl-6 max-w-3xl mx-auto">
                <div>
                    <p class="font-semibold text-blue-600 dark:text-blue-400">2021 - Khởi Động</p>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">Ý tưởng nền tảng học tập được hình thành, nhóm
                        sáng lập gồm các chuyên gia giáo dục và lập trình.</p>
                </div>
                <div>
                    <p class="font-semibold text-blue-600 dark:text-blue-400">2022 - Ra Mắt Chính Thức</p>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">Triển khai phiên bản đầu tiên, thu hút 5.000 học
                        viên và 20 giảng viên trong 6 tháng đầu.</p>
                </div>
                <div>
                    <p class="font-semibold text-blue-600 dark:text-blue-400">2023 - Mở Rộng Quy Mô</p>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">Hợp tác với các trường đại học, đưa nền tảng đến
                        10.000+ người dùng và 100+ khóa học.</p>
                </div>
                <div>
                    <p class="font-semibold text-blue-600 dark:text-blue-400">2024 - Vươn Tầm Quốc Tế</p>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">Tích hợp AI, hỗ trợ tiếng Anh và tiếng Nhật, bắt
                        đầu cung cấp khóa học cho học viên nước ngoài.</p>
                </div>
            </div>
        </section> -->

        <!-- Đối tác -->
        <section  class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Đối Tác</h2>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                <li v-for="partner in partners" :key="partner">{{ partner }}</li>
            </ul>
        </section>

        <!-- Chứng nhận -->
        <section  class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center">Chứng Nhận</h2>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                <li v-for="cert in certifications" :key="cert">{{ cert }}</li>
            </ul>
        </section>
    </div>
</template>

<script setup>
const lecturers = [
    {
        id: 1,
        name: "TS. Nguyễn Văn A",
        title: "Chuyên gia Trí tuệ Nhân tạo, giảng viên Đại học Bách Khoa",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 2,
        name: "ThS. Trần Thị B",
        title: "Giảng viên ngành An toàn thông tin, Đại học Quốc Gia",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 3,
        name: "Mr. John Smith",
        title: "Senior Software Engineer tại Google",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
];

const partners = [
    "Đại học Bách Khoa Hà Nội",
    "Học viện Công nghệ Bưu chính Viễn thông",
    "Tập đoàn FPT",
    "Google Developer Group",
];

const certifications = [
    "Chứng nhận ISO 21001:2018",
    "Google Cloud Certified Partner",
    "Chứng nhận AWS Training Partner",
];
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style>