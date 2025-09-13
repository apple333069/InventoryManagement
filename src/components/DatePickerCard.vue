<!-- 條件篩選卡片(日期) -->
<template>
  <el-card shadow="never" class="hover:shadow-md">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-gray-500">{{ title }}</p>
      <!-- 選擇條件 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link outline-none text-primary">
          {{ selectedCondition ? selectedCondition.label : dropdownPlaceholder }}
          <i class="ri-arrow-down-s-line"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="option in options"
              :key="option.value"
              :command="option"
              class="blue-option"
            >
              {{ option.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 日期選擇 -->
    <el-date-picker
      v-model="localDate"
      type="daterange"
      range-separator="至"
      start-placeholder="開始日期"
      end-placeholder="結束日期"
      class="mt-2"
      style="width: 100%"
    />
  </el-card>
</template>

<script setup>
  // 定義 props
  const props = defineProps({
    // 標題
    title: {
      type: String,
      required: true,
    },
    // 條件裡選項
    options: {
      type: Array,
      required: true,
    },
    selectedCondition: {
      type: Object,
      default: null,
    },
    dropdownPlaceholder: {
      type: String,
      default: '選擇條件',
    },
    selectedValue: {
      type: Array,
      default: () => [],
    },
  });
  const emit = defineEmits(['update:selectedValue', 'command']);

  const localDate = computed({
    get: () => props.selectedValue,
    set: (value) => emit('update:selectedValue', value),
  });

  const handleCommand = (command) => {
    emit('command', command);
  };
</script>
