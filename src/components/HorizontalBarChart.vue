<!-- 水平柱狀圖 -->
<template>
	<div
		ref="fullscreenElement"
		:class="isFullscreen ? 'p-8' : ''"
		class="bg-white hover:shadow-lg rounded-md border p-4"
	>
		<div class="flex justify-between">
			<h2 v-if="title" class="text-lg font-bold">{{ title }}</h2>
			<!-- 右上功能 icon -->
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
			:class="isFullscreen ? 'h-full p-8' : 'h-64'"
		></div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';

// 定義 props
const props = defineProps({
	// 標題
	title: String,
	// 顯示即時資訊 icon
	info: {
		type: Boolean,
		default: true,
	},
	// X 軸產品名稱
	xAxisData: {
		type: Array,
		required: true,
	},
	// Y 軸數據
	seriesData: {
		type: Array,
		required: true,
	},
});
const { xAxisData, seriesData } = props;
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
document.addEventListener('fullscreenchange', () => {
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
	const max = 300;
	const ratio = value / max;
	return `rgba(0, 102, 255, ${0.5 + ratio * 0.5})`;
};

// 重新調整圖表大小
const handleResize = () => {
	barChart?.resize();
};

const handleTabChange = () => {
	if (
		chart.value &&
		chart.value.clientWidth > 0 &&
		chart.value.clientHeight > 0
	) {
		initChart();
	}
};

// 圖表初始化
const initChart = () => {
	if (!chart.value) return;
	if (barChart) {
		barChart.dispose();
	}

	barChart = echarts.init(chart.value);
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: {
			type: 'value',
			data: xAxisData,
		},
		yAxis: {
			type: 'category',
			data: seriesData,
		},
		series: [
			{
				name: '客戶編碼',
				type: 'bar',
				data: xAxisData.map((item) => ({
					value: item,
					itemStyle: {
						color: getBlueColor(item),
					},
				})),
				barWidth: '60%',
			},
		],
	};
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
	window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});
// 當數據變化時重新渲染圖表
watch([() => xAxisData, () => seriesData], initChart, { deep: true });
</script>
