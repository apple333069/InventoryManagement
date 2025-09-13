<template>
  <div class="app-layout">
    <!-- 手機版下拉菜單按鈕 -->
    <div v-if="showSidebar && isMobile" class="fixed top-4 left-4 z-40 md:hidden">
      <Sidebar />
    </div>

    <!-- 桌面版側邊欄 -->
    <Sidebar v-if="showSidebar && !isMobile" />

    <!-- 主內容區域 -->
    <main class="flex-1 overflow-hidden bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";

const route = useRoute();
const isMobile = ref(false);

// 根據 meta 配置是否顯示側邊欄
const showSidebar = computed(() => route.meta.showSidebar !== false);

// 檢測是否為手機版
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// 監聽螢幕大小變化
const handleResize = () => {
  checkMobile();
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
.app-layout {
  @apply flex min-h-screen;
}

@media (max-width: 768px) {
  .app-layout {
    @apply block;
  }
}
</style>

