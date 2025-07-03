<template>
	<avatar
		v-if="props.name"
		:name="props.name"
		:color="props.color"
		:size="props.size"
		:rounded="props.rounded"
		:inverted="props.inverted"
		:background="props.background"
		:border="props.border"
		:borderColor="props.borderColor"
		:inline="props.inline"
		:imageSrc="props.imageSrc"
		:status="props.status"
		:sameBorder="props.sameBorder"
	/>
</template>

<script setup>
import Avatar from "vue3-avatar";

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: "white",
	},
	size: {
		type: Number,
		default: 40,
	},
	rounded: {
		type: Boolean,
		default: true,
	},
	background: {
		type: String,
		default: null,
	},
	inverted: {
		type: Boolean,
		default: false,
	},
	inline: {
		type: Boolean,
		default: false,
	},
	imageSrc: {
		type: String,
		default: null,
	},
	border: {
		type: Boolean,
		default: true,
	},
	borderColor: {
		type: String,
		default: null,
	},
	status: {
		type: String,
		default: "online",
	},
	sameBorder: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped></style>
