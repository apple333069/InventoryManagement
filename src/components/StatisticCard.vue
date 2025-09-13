<template>
  <div class="p-4 text-center bg-white border rounded-md transition hover:shadow-md hover:bg-blue-50 flex flex-col justify-evenly">
    <div class="font-semibold text-gray-600 pb-8">{{ title }}</div>
    <div class="text-2xl font-bold text-blue-600">{{ value }}</div>
  </div>
</template>

<script setup>
// 定義 props
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
