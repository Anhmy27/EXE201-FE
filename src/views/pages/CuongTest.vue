<template>
  <div>
    <!-- Input field for Tagify -->
    <input ref="tagifyInput" name="drag-sort" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// Import Tagify và DragSort
import Tagify from "@yaireo/tagify";
import DragSort from "@yaireo/dragsort";
// Import CSS của Tagify
import "@yaireo/tagify/dist/tagify.css";

// Danh sách tags ban đầu
const tagsList = ["Oke", "oke3", "ooke4", "oke4", "tag", "tag7"];

let tagify = null;
let dragsort = null;

const tagifyInput = ref(null);

onMounted(() => {
  // Khởi tạo Tagify
  tagify = new Tagify(tagifyInput.value, {
    delimiters: " ",
  });

  // Gán giá trị ban đầu từ tagsList
  tagify.addTags(tagsList);

  // Khởi tạo DragSort
  dragsort = new DragSort(tagify.DOM.scope, {
    selector: "." + tagify.settings.classNames.tag, // Chọn các thẻ để kéo thả
    callbacks: {
      dragEnd: onDragEnd,
    },
  });
});

// Hàm xử lý khi kéo thả xong
function onDragEnd() {
  // Đồng bộ giá trị của Tagify với DOM
  tagify.updateValueByDOMTags();
}

// Cleanup khi component bị hủy
onBeforeUnmount(() => {
  if (tagify) tagify.destroy();
  if (dragsort) dragsort.destroy();
});
</script>