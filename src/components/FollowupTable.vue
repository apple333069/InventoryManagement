<!-- 跟進紀錄表格 -->
<template>
  <div>
    <h3 class="text-gray-600 text-sm pl-4 mb-4">跟進記錄</h3>
    <div class="grid grid-cols-2 pr-5">
      <div class="col-span-1">
        <slot name="titleInfo"></slot>
      </div>
      <div class="col-span-1 flex justify-end">
        <el-button type="primary" link class="mx-2" @click="openMessage">
          <i class="ri-add-line"></i> 新增
        </el-button>
        <el-divider direction="vertical" />
        <el-tooltip :content="isFullscreen ? '縮小' : '放大'" placement="top" :hide-after="10">
          <i
            class="cursor-pointer"
            :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
            @click="toggleFullscreen"
          >
          </i>
        </el-tooltip>
      </div>
    </div>

    <div ref="fullscreenElement" :class="isFullscreen ? 'p-8' : ''" class="p-4 bg-white">
      <div v-if="isFullscreen" class="flex justify-end mb-1">
        <!-- 全螢幕不顯示新增按鈕，因為全螢幕 div 會覆蓋新增訊息視窗 -->
        <el-tooltip :content="isFullscreen ? '縮小' : '放大'" placement="top" :hide-after="10">
          <i
            class="cursor-pointer"
            :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
            @click="toggleFullscreen"
          >
          </i>
        </el-tooltip>
      </div>

      <el-table
        :data="data"
        style="width: 100%"
        :max-height="370"
        border
        :header-cell-style="{
          backgroundColor: '#F5F7FA',
        }"
      >
        <el-table-column prop="followupRecord" label="跟進內容記錄" width="120" />
        <el-table-column prop="followupMethod" label="跟進方式" sortable width="180" />
        <el-table-column prop="followupPerson" label="跟進人" sortable width="180" />
        <el-table-column prop="date" label="跟進時間" width="180" sortable />
        <el-table-column prop="mark" label="" />
      </el-table>

      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script setup>
  import { ElMessage } from 'element-plus';
  // 定義 props
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  });
  const fullscreenElement = ref(null);
  const isFullscreen = ref(false);
  // 跟進紀錄操作權限不足
  const openMessage = () => {
    ElMessage({
      message: '操作權限不足',
      type: 'warning',
      showClose: true, // 出現取消按鈕
      duration: 1800, // 幾秒後自動消失
    });
  };
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
