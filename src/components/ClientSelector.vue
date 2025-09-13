<!-- 選擇客戶(選擇資料) -->
<template>
  <div ref="fullscreenElement" :class="isFullscreen ? 'p-8' : ''" class="p-4 bg-white">
    <!-- 上排按鈕 -->
    <div class="flex justify-between pb-2">
      <div class="flex items-center">
        <el-button type="primary"><i class="ri-add-line"></i>新增</el-button>
      </div>
      <div class="ricon flex items-center">
        <!-- 搜尋 -->
        <el-input placeholder="搜尋資料" class="mr-5" v-model="search" clearable>
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-tooltip content="篩選條件" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-filter-line"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip :content="isFullscreen ? '縮小' : '放大'" placement="bottom" :hide-after="10">
          <el-button text>
            <i
              :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
              class="cursor-pointer"
              @click="toggleFullscreen"
            >
            </i>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- 下排表格-單選 -->
    <el-table
      ref="singleTableRef"
      highlight-current-row
      :columns="columns"
      :data="tableData"
      :border="true"
      row-class-name="warning-row"
      style="width: 100%"
      class="my-2"
      @row-click="handleRowClick"
    >
      <el-table-column type="index" width="55" />
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :width="column.minWidth"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  // 定義 props
  const props = defineProps({
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  });
  const emit = defineEmits(['choose']);

  // 選擇客戶用
  const search = ref(''); // 搜尋關鍵字
  const singleTableRef = ref(); // 單選 table
  const handleRowClick = (row) => {
    const value = row.clientName;
    emit('choose', value);
  };

  // 全螢幕
  const fullscreenElement = ref(null);
  const isFullscreen = ref(false);
  // 切換全螢幕
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenElement.value?.requestFullscreen();
      isFullscreen.value = true;
    } else {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  };
  // 監聽切換全螢幕 (不是點擊的走監聽)
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement;
  });
</script>
