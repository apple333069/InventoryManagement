<!-- 圖表(柱狀圖) -->
<template>
  <div ref="fullscreenElement" :class="isFullscreen ? 'p-8' : ''" class="bg-white hover:shadow-lg rounded-md border p-4">
    <div class="flex justify-between">
      <h2 v-if="title" class="text-lg font-bold">{{ title }}</h2>
      <!-- 右上功能icon -->
      <div class="text-gray-500 space-x-3">
        <el-tooltip v-if="info" placement="bottom" effect="light" :hide-after="10">
          <template #content>
            最後更新：2024-12-31 20:30 <br />
            <span class="text-green-500">當前已是最新資料</span>
          </template>
          <i class="ri-information-line text-green-500 cursor-pointer"></i>
        </el-tooltip>
        <el-tooltip content="更新" placement="bottom" :hide-after="10">
          <i class="ri-refresh-line cursor-pointer"></i>
        </el-tooltip>
        <el-tooltip :content="isFullscreen ? '縮小' : '放大'" placement="bottom" :hide-after="10">
          <i 
            :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
            class="cursor-pointer"
            @click="toggleFullscreen">
          </i>
        </el-tooltip>
      </div>
    </div>
    <!-- 下排圖表 -->
    <div 
      ref="chart" 
      class="w-full" 
      :class="isFullscreen ? 'h-full p-8' : 'h-64'">
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";

// 定義 props
const props = defineProps({
  // 標題
  title: String,
  // 顯示即時資訊icon
  info: {
    type: Boolean,
    default: true,
  },
  // X軸產品名稱
  xAxisData: {
    type: Array,
    required: true,
  },
  // Y軸數據
  seriesData: {
    type: Array,
    required: true,
  },
});
const { xAxisData, seriesData  } = props;
const chart = ref(null);
let barChart = null;

// 全螢幕切換
const fullscreenElement = ref(null);
const isFullscreen = ref(false);
const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await fullscreenElement.value?.requestFullscreen();
    isFullscreen.value = true;
  } else {
    await document.exitFullscreen();
    isFullscreen.value = false;
  }
  resizeChart();
};

// 監聽切換全螢幕 (不是點擊的走監聽)
document.addEventListener("fullscreenchange", () => {
  isFullscreen.value = !!document.fullscreenElement;
  resizeChart();
});

const resizeChart = () => {
  requestAnimationFrame(() => {
    barChart?.resize();
  });
};

// 柱狀繪製不同色
const getBlueColor = (value) => {
  // const max = 300
  // const ratio = value / max
  // return `rgba(0, 102, 255, ${0.5 + ratio * 0.5})`
  const max = 300;
  const ratio = Math.min(value / max, 1);
  // 底部：深藍根據值調整亮度（40% ~ 65%）
  const lightnessBottom = 40 + ratio * 25; // 40~65
  const bottomColor = `hsl(220, 100%, ${lightnessBottom}%)`;

  // 頂部：再更亮一點（+15%，最高到 85%）
  const lightnessTop = Math.min(lightnessBottom + 15, 85);
  const topColor = `hsl(220, 100%, ${lightnessTop}%)`;

  return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    { offset: 0, color: bottomColor }, // 底部深
    { offset: 1, color: topColor },    // 頂部淺
  ]);
}

// 重新調整圖表大小
const handleResize = () => {
  barChart?.resize();
};

const handleTabChange = () => {
  if (chart.value && chart.value.clientWidth > 0 && chart.value.clientHeight > 0) {
    initChart();
  }
};

// 圖表初始化
const initChart = () => {
  if (!chart.value) return
  if (barChart) {
    barChart.dispose();
  }

  barChart = echarts.init(chart.value)

  const option = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        rotate: 28,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: seriesData.map(item => ({
          value: item,
          itemStyle: {
            borderRadius: [6, 6, 0, 0], // 上圓角
            color: getBlueColor(item),
          },
        })),
        type: 'bar',
        barWidth: '60%',
      },
    ],
  }
  barChart.setOption(option);
};

onMounted(() => {
  // 圖表重新渲染
  const observer = new ResizeObserver(() => {
    handleResize();
    handleTabChange();
  });

  observer.observe(chart.value);

  // 監聽窗口大小變化
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
// 當數據變化時重新渲染圖表
watch(
  [() => xAxisData, () => seriesData],
  initChart,
  { deep: true }
);
</script>
