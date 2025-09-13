<template>
	<div
		class="bg-[url(@/assets/bg2.png)] bg-cover bg-center bg-no-repeat text-white text-center p-6 rounded-lg shadow-md"
	>
		<div class="text-2xl text-gray-400 font-bold">{{ title }}</div>
	</div>
</template>

<script setup>
// 定義 props
defineProps({
	// 標題
	title: {
		type: String,
		required: true,
	},
});
</script>
