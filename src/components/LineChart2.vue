<!-- 圖表(線圖) -->
<template>
	<div
		ref="fullscreenElement"
		:class="isFullscreen ? 'p-8' : ''"
		class="bg-white border hover:shadow-lg p-4"
	>
		<div class="flex justify-between">
			<h2 v-if="title" class="text-lg font-bold">{{ title }}</h2>
			<!-- 右上功能icon -->
			<div class="text-gray-500 space-x-3">
				<el-tooltip
					v-if="info"
					placement="bottom"
					effect="light"
					:hide-after="10"
				>
					<template #content>
						最後更新：2024-12-31 20:30 <br />
						<span class="text-green-500">當前已是最新資料</span>
					</template>
					<i class="ri-information-line text-green-500 cursor-pointer"></i>
				</el-tooltip>
				<el-tooltip content="更新" placement="bottom" :hide-after="10">
					<i class="ri-refresh-line cursor-pointer"></i>
				</el-tooltip>
				<el-tooltip
					:content="isFullscreen ? '縮小' : '放大'"
					placement="bottom"
					:hide-after="10"
				>
					<i
						:class="
							isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'
						"
						class="cursor-pointer"
						@click="toggleFullscreen"
					>
					</i>
				</el-tooltip>
			</div>
		</div>
		<!-- 下排圖表 -->
		<div
			ref="chart"
			class="w-full"
			:class="isFullscreen ? 'h-full p-8' : 'h-96'"
		></div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';

// 定義 props
const props = defineProps({
	// 標題
	title: String,
	// 顯示即時資訊icon
	info: {
		type: Boolean,
		default: true,
	},
	chartData: {
		type: Array,
		required: true, // 傳入數據，例如每個系列的數據點
	},
	chartLabels: {
		type: Array,
		required: true, // 傳入 x 軸的標籤，例如 ["2023年05月", "2023年06月", ...]
	},
});

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

document.addEventListener('fullscreenchange', () => {
	isFullscreen.value = !!document.fullscreenElement;
	resizeChart();
});

const resizeChart = () => {
	requestAnimationFrame(() => {
		chartInstance?.resize();
	});
};

const chart = ref(null);
let chartInstance = null;
// 只提取 chartData 的 name 屬性
const legendData = computed(() => props.chartData.map((item) => item.name));

const initChart = () => {
	if (!chart.value) return;
	if (chartInstance) {
		chartInstance.dispose();
	}

	// 初始化 ECharts 實例
	chartInstance = echarts.init(chart.value);

	// 設定圖表選項
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
			},
		},
		legend: {
			bottom: 0,
			data: legendData.value,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: props.chartLabels,
		},
		yAxis: {
			type: 'value',
			minInterval: 1,
			splitLine: { lineStyle: { type: 'dashed' } },
		},
		series: props.chartData.map((dataItem) => ({
			name: dataItem.name,
			type: 'line',
			data: dataItem.data,
			symbol: 'circle',
		})),
	};

	// 設置圖表配置
	chartInstance.setOption(option);
};

// 當組件掛載時初始化圖表
onMounted(() => {
	initChart();
	window.addEventListener('resize', () => {
		if (chartInstance) chartInstance.resize();
	});
});

// 監控 props 變化並更新圖表
watch(
	() => props.chartData,
	() => {
		if (chartInstance) {
			initChart();
		}
	},
	{ deep: true }
);
</script>
