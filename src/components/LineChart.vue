<!-- 圖表(線圖) -->
<template>
  <div ref="fullscreenElement" :class="isFullscreen ? 'p-8' : ''" class="bg-white border hover:shadow-lg p-4">
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
  // X軸日期
  xAxisData: {
    type: Array,
    required: true,
  },
  // Y軸數據
  seriesData: {
    type: Array,
    required: true,
  },
  // 圖表顏色
  baseColor: {
    type: String,
    default: "#3366CC",  // 默認顏色
  },
});
const { xAxisData, seriesData, baseColor  } = props;
const chart = ref(null);
let lineChart = null;

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

document.addEventListener("fullscreenchange", () => {
  isFullscreen.value = !!document.fullscreenElement;
  resizeChart();
});

const resizeChart = () => {
  requestAnimationFrame(() => {
    lineChart?.resize();
  });
};

// 漸層色繪製
const defaultStartColor = "#3366CC";
const createGradient = (color) => {
  const startColor = color || defaultStartColor;
  const startColorRGBA = hexToRgba(startColor);
  const endColorRGBA = lightenColor(startColorRGBA, 80);

  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: rgbaToHex(startColorRGBA) },
    { offset: 1, color: rgbaToHex(endColorRGBA) },
  ]);
};

const hexToRgba = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b, a: 1 };
};

const lightenColor = (color, percent) => {
  const { r, g, b, a } = color;

  const lighten = (value) => Math.min(255, Math.max(0, value + (value * percent) / 100));

  return {
    r: lighten(r),
    g: lighten(g),
    b: lighten(b),
    a,
  };
};

const rgbaToHex = (rgba) => {
  const { r, g, b, a } = rgba;
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
};

// 重新調整圖表大小
const handleResize = () => {
  lineChart?.resize();
};

const handleTabChange = () => {
  if (chart.value && chart.value.clientWidth > 0 && chart.value.clientHeight > 0) {
    initChart();
  }
};

// 圖表初始化
const initChart = () => {
  if (!chart.value) return
  if (lineChart) {
    lineChart.dispose();
  }

  lineChart = echarts.init(chart.value);

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: { type: "value" },
    series: [
      {
        data: seriesData,
        type: "line",
        smooth: true,
        areaStyle: {
          color: createGradient(baseColor)
        },
        lineStyle: { color: baseColor },
        itemStyle: { color: baseColor },
      },
    ],
  };

  lineChart.setOption(option);
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
  [() => xAxisData, () => seriesData, () => baseColor],
  initChart,
  { deep: true }
);
</script>
