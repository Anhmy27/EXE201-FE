// src/eventBus.js
import { reactive } from 'vue';

export const eventBus = reactive({
  isButtonClicked: false, // Trạng thái của button
  triggerClick() {
    this.isButtonClicked = !this.isButtonClicked; // Thay đổi trạng thái khi button được click
  },
});
