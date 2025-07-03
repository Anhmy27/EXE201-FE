<template>
  <footer class="bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-12 mt-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <!-- Giới thiệu -->
        <div>
          <h3 class="text-2xl font-bold mb-4">Nhà Sách Online</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Chuyên cung cấp sách học thuật, kỹ năng, văn học, thiếu nhi... với giá tốt và dịch vụ tận tâm. Hơn 10.000+
            đầu sách đang chờ bạn khám phá.
          </p>
        </div>

        <!-- Chính sách -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Chính Sách</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li><a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Chính sách đổi trả</a></li>
            <li><a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Chính sách bảo hành</a></li>
            <li><a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Chính sách thanh toán</a></li>
          </ul>
        </div>

        <!-- Thông tin liên hệ -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Liên Hệ</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li class="flex items-start gap-2">
              <i class="fas fa-phone mt-1"></i>
              <span>Hotline: 0327 241 194</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-envelope mt-1"></i>
              <span>Email: cn.company.enterprise@gmail.com</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-clock mt-1"></i>
              <span>Giờ làm việc: 8:00 - 20:00</span>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Kết nối với chúng tôi</h3>
          <div class="flex space-x-4 text-gray-600 dark:text-gray-300">
            <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400"><i class="fab fa-facebook fa-2x"></i></a>
            <a href="#" class="hover:text-pink-600 dark:hover:text-pink-400"><i class="fab fa-instagram fa-2x"></i></a>
            <a href="#" class="hover:text-black dark:hover:text-white"><i class="fab fa-tiktok fa-2x"></i></a>
            <a href="#" class="hover:text-red-600 dark:hover:text-red-400"><i class="fab fa-youtube fa-2x"></i></a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 border-t pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {{ new Date().getFullYear() }} Khóa học Online. All rights reserved.
      </div>
    </div>
  </footer>
</template>
