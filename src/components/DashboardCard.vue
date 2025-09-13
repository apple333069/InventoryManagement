<template>
  <div class="bg-white hover:shadow-lg rounded-xl border p-4 flex flex-col justify-between">
    <div class="text-gray-500 text-sm">{{ title }}</div>
    <div class="text-2xl font-bold mt-1">{{ value }}</div>
    <div class="flex items-center justify-between mt-4">
      <span
        :class="[
          'text-sm font-semibold rounded-full px-3 py-1',
          isNegative ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
        ]"
      >
        {{ isNegative ? percentage : '+' + percentage }}%
      </span>
      <div :class="`rounded-full p-3 shadow-md ${iconBg}`">
        <span v-html="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 定義 props
const props = defineProps({
  title: String,
  value: String,
  percentage: String,
  iconBg: String,
  icon: Object,
})

const isNegative = computed(() => Number(props.percentage) < 0)
</script>

<style scoped></style>
