<template>
  <div :class="['app-layout', { 'has-sidebar': showSidebar }]">
    <!-- 側邊欄 -->
    <Sidebar v-if="showSidebar" />

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

// 根據 meta 配置是否顯示側邊欄
const showSidebar = computed(() => route.meta.showSidebar !== false);
</script>

<style>
.app-layout {
  @apply flex min-h-screen;
}
</style>

