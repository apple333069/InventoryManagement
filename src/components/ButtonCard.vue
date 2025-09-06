<!-- 條件篩選卡片(按鈕) -->
<template>
  <el-card shadow="never" class="hover:shadow-md">
    <p class="text-sm font-semibold text-gray-500">{{ title }}</p>
    <div class="flex flex-wrap justify-center mt-2 gap-2">
      <el-button
        v-for="(button, index) in buttons"
        :key="index"
        :type="button.type || 'default'"
      >
        {{ button.label }}
      </el-button>
    </div>
  </el-card>
</template>
<script setup>
// 定義 props
defineProps({
  // 標題
  title: {
    type: String,
    required: true
  },
  buttons: {
    type: Array,
    required: true
  }
});
</script>
