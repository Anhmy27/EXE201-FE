<template>
    <div class="relative">
        <div v-if="isCropperModalVisible" class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
			<div class="bg-white p-6 rounded-lg w-[90%] md:w-[500px] relative">
				<!-- Close Button -->
				<button
					@click="closeCropper"
					class="absolute top-2 right-2 bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400"
					style="z-index: 100; transform: translate(50%, -50%);"
				>
    			✕
				</button>

				<!-- Image Cropper -->
				<div class="relative">
					<Cropper
						ref="cropperRef"
						:src="imageUrl"
						:stencil-props="{ size: { width: 400, height: 300 }, aspectRatio: 1 }"
						:auto-crop-area="1"
						:style="{ width: '100%', height: '300px' }"
						@change="onCrop"
					/>
				</div>
				<!-- Action Buttons -->
				<div class="mt-4 flex justify-end gap-2">
					<button @click="closeCropper" class="px-4 font-medium bg-gray-200 hover:bg-gray-400 rounded-full">Cancel</button>
					<button @click="saveCroppedImage" class="py-2.5 px-4 font-medium text-center text-white bg-blue-700 rounded-full dark:focus:ring-blue-900 hover:bg-blue-800">Save</button>
				</div>
			</div>
		</div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import apiServices from "@/services/api.services";

const props = defineProps({
    isCropperModalVisible: { type: Boolean, required: true },
    imageUrl: { type: String, required: false },
});

const croppedImage = ref(null);
const cropperRef = ref(null);

const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
const emit = defineEmits(["saveAvatar", "closeModal"]);

const saveCroppedImage = async () => {
    if (croppedImage.value) {
        try {
            const file = base64ToFile(croppedImage.value, "avatar.jpg");
            const result = await apiServices.uploadOneFile(file);
            emit("saveAvatar", result.data.id);
            } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    }
};

const onCrop = () => {
if (cropperRef.value) {
    croppedImage.value = cropperRef.value.getCanvas().toDataURL("image/jpeg");
}
};

const closeCropper = () => {
    emit("closeModal");
};
</script>
