<template>
	<!-- 主內容 -->
	<main class="flex-1 p-6">
		<HeaderBar title="產品出入庫統計" />

		<section class="mt-6">
			<el-tabs v-model="activeTab" type="border-card">
				<!-- 產品入庫彙整 -->
				<el-tab-pane label="產品入庫彙整" name="1">
					<!-- 篩選區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-4 pb-8">
						<DatePickerCard
							:title="'入庫日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
						/>
						<DropdownCard
							title="入庫類型"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇入庫類型"
							@command="handleCommand"
						/>
						<DropdownCard
							title="產品名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇產品名稱"
							@command="handleCommand"
						/>
						<DropdownCard
							title="倉庫"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇倉庫"
							@command="handleCommand"
						/>
						<DropdownCard
							title="倉位"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇倉位"
							@command="handleCommand"
						/>
					</div>
					<!-- 下排表格 -->
					<BrowseTable
						title="入庫彙整"
						:tableData="tableDataA"
						:columns="tableColumnsA"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>

					<!-- 線圖 -->
					<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 border-t pt-6">
						<LineChart2
							title="入庫類型單據統計"
							:chartData="chartDataA"
							:chartLabels="chartLabelsA"
						/>
						<LineChart2
							title="入庫類型成本統計"
							:chartData="chartDataB"
							:chartLabels="chartLabelsA"
						/>
					</div>
				</el-tab-pane>
				<!-- 銷售毛利分析 -->
				<el-tab-pane label="產品入庫明細" name="2">
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-y-6 md:gap-6 pb-8">
						<div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
							<StatisticCard
								v-for="(stat, index) in statisticsA"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
						</div>
						<!-- 篩選區塊 -->
						<div class="col-span-2 grid grid-cols-2 gap-4">
							<DropdownCard
								title="入庫類型"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇入庫類型"
								@command="handleCommand"
							/>
							<DropdownCard
								title="倉庫"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇倉庫"
								@command="handleCommand"
							/>
							<DatePickerCard
								:title="'入庫日期'"
								:options="conditions"
								:selected-condition="selectedCondition"
								dropdown-placeholder="選擇範圍"
								v-model:selected-value="date"
							/>
							<DropdownCard
								title="產品名稱"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇產品名稱"
								@command="handleCommand"
							/>
						</div>
					</div>

					<!-- 下排表格 -->
					<BrowseTable
						title="入庫明細表"
						:tableData="orderDataB"
						:columns="columnsB"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
				</el-tab-pane>
				<!-- 產品出庫彙整 -->
				<el-tab-pane label="產品出庫彙整" name="3">
					<!-- 篩選區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-4 pb-8">
						<DatePickerCard
							:title="'出庫日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
						/>
						<DropdownCard
							title="出庫類型"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇出庫類型"
							@command="handleCommand"
						/>
						<DropdownCard
							title="產品名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇產品名稱"
							@command="handleCommand"
						/>
						<DropdownCard
							title="倉庫"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇倉庫"
							@command="handleCommand"
						/>
						<DropdownCard
							title="倉位"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇倉位"
							@command="handleCommand"
						/>
					</div>
					<!-- 下排表格 -->
					<BrowseTable
						title="出庫彙整"
						:tableData="orderDataA"
						:columns="columnsA"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
					<!-- 線圖 -->
					<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 border-t pt-6">
						<LineChart2
							title="入庫類型單據統計"
							:chartData="chartDataA"
							:chartLabels="chartLabelsA"
						/>
						<LineChart2
							title="入庫類型成本統計"
							:chartData="chartDataB"
							:chartLabels="chartLabelsA"
						/>
					</div>
				</el-tab-pane>
				<!-- 產品出庫明細 -->
				<el-tab-pane label="產品出庫明細" name="4">
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-y-6 md:gap-6 pb-8">
						<div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
							<StatisticCard
								v-for="(stat, index) in statisticsB"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
						</div>
						<!-- 篩選區塊 -->
						<div class="col-span-2 grid grid-cols-2 gap-4">
							<DatePickerCard
								:title="'出庫日期'"
								:options="conditions"
								:selected-condition="selectedCondition"
								dropdown-placeholder="選擇範圍"
								v-model:selected-value="date"
							/>

							<DropdownCard
								title="倉庫"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇倉庫"
								@command="handleCommand"
							/>
							<DropdownCard
								title="出庫類型"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇入庫類型"
								@command="handleCommand"
							/>
							<DropdownCard
								title="產品名稱"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇產品名稱"
								@command="handleCommand"
							/>
						</div>
					</div>

					<!-- 下排表格 -->
					<BrowseTable
						title="入庫明細表"
						:tableData="orderDataB"
						:columns="columnsB"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
				</el-tab-pane>
				<!-- 客戶銷量統計 -->
				<el-tab-pane label="產品調撥統計" name="5">
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-y-6 md:gap-6 pb-8">
						<div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
							<StatisticCard
								v-for="(stat, index) in statisticsC"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
						</div>
						<!-- 篩選區塊 -->
						<div class="col-span-2 grid grid-cols-2 gap-4">
							<DatePickerCard
								:title="'調撥申請日期'"
								:options="conditions"
								:selected-condition="selectedCondition"
								dropdown-placeholder="選擇範圍"
								v-model:selected-value="date"
							/>

							<DropdownCard
								title="調出倉庫"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇調出倉庫"
								@command="handleCommand"
							/>
							<DropdownCard
								title="產品名稱"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇產品名稱"
								@command="handleCommand"
							/>
							<DropdownCard
								title="調入倉庫"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇調入倉庫"
								@command="handleCommand"
							/>
						</div>
					</div>

					<!-- 調撥明細表 -->
					<BrowseTable
						title="調撥明細表"
						:tableData="orderDataB"
						:columns="columnsB"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
					<!-- 產品調出/入統計 -->
					<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 border-t pt-6">
						<BrowseTable
							title="產品調出統計"
							:tableData="orderDataB"
							:columns="columnsB"
						/>
						<BrowseTable
							title="產品調入統計"
							:tableData="orderDataB"
							:columns="columnsB"
						/>
					</div>
				</el-tab-pane>
				<!-- 產品盤點統計 -->
				<el-tab-pane label="產品盤點統計" name="6">
					<!-- 篩選區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8">
						<DatePickerCard
							:title="'盤點結束日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
						/>
						<DropdownCard
							title="盤點倉庫"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇盤點倉庫"
							@command="handleCommand"
						/>
						<DropdownCard
							title="產品名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇產品名稱"
							@command="handleCommand"
						/>
						<DropdownCard
							title="盤點員"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇盤點員"
							@command="handleCommand"
						/>
					</div>
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-4 pb-8">
						<StatisticCard
							v-for="(stat, index) in statisticsD"
							:key="index"
							:title="stat.title"
							:value="stat.value"
						/>
					</div>
					<!-- 盤點明細表 -->
					<BrowseTable
						title="盤點明細表"
						:tableData="orderDataB"
						:columns="columnsB"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
					<!-- 產品調出/入統計 -->
					<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 border-t pt-6">
						<BrowseTable
							title="產品盤虧統計"
							:tableData="orderDataB"
							:columns="columnsB"
						/>
						<BrowseTable
							title="產品盤盈統計"
							:tableData="orderDataB"
							:columns="columnsB"
						/>
					</div>
				</el-tab-pane>
			</el-tabs>
		</section>
	</main>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import BrowseTable from '@/components/BrowseTable.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import DropdownCard from '@/components/DropdownCard.vue';
import DatePickerCard from '@/components/DatePickerCard.vue';
import LineChart2 from '@/components/LineChart2.vue';
import * as echarts from 'echarts';
const chartLabelsA = [
	'2023年05月',
	'2023年06月',
	'2023年07月',
	'2023年08月',
	'2023年09月',
	'2024年10月',
];

const chartDataA = [
	{
		name: '銷售退貨入庫',
		data: [2, 2, 1, 1, 1, 1],
	},
	{
		name: '銷售換貨入庫',
		data: [1, 2, 1, 0, 0, 0],
	},
	{
		name: '調撥入庫',
		data: [0, 1, 1, 1, 1, 1],
	},
	{
		name: '盤盈入庫',
		data: [0, 0, 0, 0, 1, 1],
	},
	{
		name: '幫助入庫',
		data: [0, 0, 0, 0, 1, 1],
	},
];

const chartDataB = [
	{
		name: '銷售退貨入庫',
		data: [16000, 20175, 24800, 14725, 14725, 12000],
	},
	{
		name: '銷售換貨入庫',
		data: [10302, 21564, 25451, 15585, 12000, 12000],
	},
	{
		name: '調撥入庫',
		data: [3160, 6725, 8162, 6725, 900, 800],
	},
	{
		name: '盤盈入庫',
		data: [10320, 15522, 12368, 800, 700, 500],
	},
	{
		name: '幫助入庫',
		data: [21586, 20000, 19999, 14257, 28801, 1000],
	},
];
const chartRefA = ref(null);
const chartRefB = ref(null);
let chartInstanceA = null;
let chartInstanceB = null;
const chartOptionsA = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line',
		},
	},
	legend: {
		bottom: 0,
		data: ['銷售退貨入庫', '銷售換貨入庫', '調撥入庫', '盤盈入庫', '幫助入庫'],
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: [
			'2023年05月',
			'2023年06月',
			'2023年07月',
			'2023年08月',
			'2023年09月',
			'2024年10月',
		],
	},
	yAxis: {
		type: 'value',
		minInterval: 1,
		splitLine: {
			lineStyle: {
				type: 'dashed',
			},
		},
	},
	series: [
		{
			name: '銷售退貨入庫',
			type: 'line',
			data: [2, 2, 1, 1, 1, 1],
			symbol: 'rect',
		},
		{
			name: '銷售換貨入庫',
			type: 'line',
			data: [1, 2, 1, 0, 0, 0],
			symbol: 'rect',
		},
		{
			name: '調撥入庫',
			type: 'line',
			data: [0, 1, 1, 1, 1, 1],
			symbol: 'rect',
		},
		{
			name: '盤盈入庫',
			type: 'line',
			data: [0, 0, 0, 0, 1, 1],
			symbol: 'rect',
		},
		{
			name: '幫助入庫',
			type: 'line',
			data: [0, 0, 0, 0, 1, 1],
			symbol: 'rect',
		},
	],
};
const chartOptionsB = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line',
		},
	},
	legend: {
		bottom: 0,
		data: ['銷售退貨入庫', '銷售換貨入庫', '調撥入庫', '盤盈入庫', '幫助入庫'],
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: [
			'2023年05月',
			'2023年06月',
			'2023年07月',
			'2023年08月',
			'2023年09月',
			'2024年10月',
		],
	},
	yAxis: {
		type: 'value',
		minInterval: 1,
		splitLine: {
			lineStyle: {
				type: 'dashed',
			},
		},
	},
	series: [
		{
			name: '銷售退貨入庫',
			type: 'line',
			data: [16000, 20175, 24800, 14725, 14725, 12000],
			symbol: 'rect',
		},
		{
			name: '銷售換貨入庫',
			type: 'line',
			data: [10302, 21564, 25451, 15585, 12000, 12000],
			symbol: 'rect',
		},
		{
			name: '調撥入庫',
			type: 'line',
			data: [3160, 6725, 8162, 6725, 900, 800],
			symbol: 'rect',
		},
		{
			name: '盤盈入庫',
			type: 'line',
			data: [10320, 15522, 12368, 800, 700, 500],
			symbol: 'rect',
		},
		{
			name: '幫助入庫',
			type: 'line',
			data: [21586, 20000, 19999, 14257, 28801, 1000],
			symbol: 'rect',
		},
	],
};

// 初始化圖表
const initChart = () => {
	if (chartRefA.value) {
		chartInstanceA = echarts.init(chartRefA.value);
		chartInstanceA.setOption(chartOptionsA);
	}
	if (chartRefB.value) {
		chartInstanceB = echarts.init(chartRefB.value);
		chartInstanceB.setOption(chartOptionsB);
	}
};

// 銷毀圖表
const destroyChart = () => {
	if (chartInstanceA) {
		chartInstanceA.dispose();
		chartInstanceA = null;
	}
	if (chartInstanceB) {
		chartInstanceB.dispose();
		chartInstanceB = null;
	}
};

// Lifecycle hooks
onMounted(() => {
	initChart();
	window.addEventListener('resize', () => {
		if (chartInstanceA) chartInstanceA.resize();
		if (chartInstanceB) chartInstanceB.resize();
	});
});

onBeforeUnmount(() => {
	destroyChart();
	window.removeEventListener('resize', () => {
		if (chartInstanceA) chartInstanceA.resize();
		if (chartInstanceB) chartInstanceB.resize();
	});
});
const activeTab = ref('1');
const date = ref([]);

const statisticsA = ref([
	{ title: '入庫單數', value: '18單' },
	{ title: '入庫產品數量', value: '265件' },
	{ title: '入庫產品價格', value: '347,395元' },
]);
const statisticsB = ref([
	{ title: '出庫單數', value: '18單' },
	{ title: '出庫產品數量', value: '181件' },
	{ title: '出庫產品價格', value: '190,194元' },
]);
const statisticsC = ref([
	{ title: '調撥單數', value: '5單' },
	{ title: '調撥產品數量', value: '110件' },
	{ title: '調撥產品價值/元', value: '75,700元' },
]);
const statisticsD = ref([
	{ title: '盤點單數', value: '4單' },
	{ title: '盤虧產品數量', value: '13件' },
	{ title: '盤虧產品成本總額', value: '7,460元' },
	{ title: '盤盈產品數量', value: '77件' },
	{ title: '盤盈產品成本總額', value: '49,180元' },
]);

const tableColumnsA = ref([
	{
		label: '入庫日期',
		headerAlign: 'left',
		children: [
			{ prop: 'warehouse', label: '倉庫' },
			{ prop: 'productName', label: '產品名稱', minWidth: 100 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 100 },
			{ prop: '', label: '入庫類型' },
		],
	},
	{
		label: '總匯',
		headerAlign: 'left',
		children: [
			{
				prop: 'inQuantity',
				label: '入庫數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'inTotalCost',
				label: '產品入庫成本合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年08',
		headerAlign: 'left',
		children: [
			{
				prop: 'inQuantity202408',
				label: '入庫數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'inTotalCost202408',
				label: '產品入庫成本合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年07',
		headerAlign: 'left',
		children: [
			{
				prop: 'inQuantity202407',
				label: '入庫數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'inTotalCost202407',
				label: '產品入庫成本合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年06',
		headerAlign: 'left',
		children: [
			{
				prop: 'inQuantity202406',
				label: '入庫數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'inTotalCost202406',
				label: '產品入庫成本合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);

const tableDataA = ref([
	{
		warehouse: '倉庫A',
		productName: '產品A',
		productCode: 'P001',
		inQuantity: 100,
		inTotalCost: 150000,
		inQuantity202408: 50,
		inTotalCost202408: 75000,
		inQuantity202407: 30,
		inTotalCost202407: 45000,
		inQuantity202406: 20,
		inTotalCost202406: 30000,
	},
	{
		warehouse: '倉庫A',
		productName: '產品B',
		productCode: 'P002',
		inQuantity: 200,
		inTotalCost: 300000,
		inQuantity202408: 100,
		inTotalCost202408: 150000,
		inQuantity202407: 60,
		inTotalCost202407: 90000,
		inQuantity202406: 40,
		inTotalCost202406: 60000,
	},
	{
		warehouse: '倉庫B',
		productName: '產品C',
		productCode: 'P003',
		inQuantity: 150,
		inTotalCost: 225000,
		inQuantity202408: 75,
		inTotalCost202408: 112500,
		inQuantity202407: 45,
		inTotalCost202407: 67500,
		inQuantity202406: 30,
		inTotalCost202406: 45000,
	},
	{
		warehouse: '倉庫B',
		productName: '產品D',
		productCode: 'P004',
		inQuantity: 250,
		inTotalCost: 375000,
		inQuantity202408: 125,
		inTotalCost202408: 187500,
		inQuantity202407: 75,
		inTotalCost202407: 112500,
		inQuantity202406: 50,
		inTotalCost202406: 75000,
	},
]);

const columnsA = ref([
	{
		prop: 'customer',
		label: '客戶名稱',
		minWidth: 150,
		sortable: true,
		fixed: true,
	},
	{
		prop: 'name',
		label: '銷售訂單名稱',
		minWidth: 150,
		sortable: true,
		fixed: true,
	},
	{
		prop: 'amount',
		label: '銷售訂單金額/元',
		minWidth: 155,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'signDate', label: '訂單簽訂日期', minWidth: 140, sortable: true },
	{
		prop: 'deliveryDate',
		label: '訂單交付日期',
		minWidth: 140,
		sortable: true,
	},
	{
		prop: 'status',
		label: '審批結果',
		minWidth: 130,
		sortable: true,
		slot: 'status', // 使用插槽渲染
	},
	{ prop: 'salesperson', label: '銷售負責人', minWidth: 130, sortable: true },
	{
		label: '產品明細',
		headerAlign: 'center',
		children: [
			{ prop: 'productName', label: '產品名稱', minWidth: 180 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 150 },
			{
				prop: 'quantity',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'unitPrice',
				label: '實際售價/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '送貨計畫',
		headerAlign: 'center',
		children: [
			{ prop: 'deliveryBatch', label: '送貨批次', minWidth: 130 },
			{ prop: 'plannedDeliveryDate', label: '計畫送貨日期', minWidth: 140 },
			{ prop: 'deliveryRemarks', label: '計畫送貨內容備註', minWidth: 180 },
		],
	},
]);
const orderDataA = ref([
	{
		customer: '顧客A',
		name: 'AAA銷售訂單',
		amount: 9150.0,
		signDate: '2024-07-31',
		deliveryDate: '2024-08-31',
		status: '通過',
		salesperson: '銷售員 A',
		// products: [
		//   { productName: "產品A", productCode: "P001", quantity: 10, unitPrice: 1500, totalPrice: 15000 },
		//   { productName: "產品B", productCode: "P002", quantity: 5, unitPrice: 2000, totalPrice: 10000 },
		// ],
		// deliveries: [
		//   { deliveryBatch: "批次1", plannedDeliveryDate: "2024-08-05", deliveryRemarks: "第一批送貨" },
		//   { deliveryBatch: "批次2", plannedDeliveryDate: "2024-08-10", deliveryRemarks: "第二批送貨" },
		// ]
		productName: '產品A',
		productCode: 'P001',
		quantity: 10,
		unitPrice: 1500,
		totalPrice: 15000,
		deliveryBatch: '批次1',
		plannedDeliveryDate: '2024-08-05',
		deliveryRemarks: '第一批送貨',
	},
	{
		customer: '顧客B',
		name: 'BBB銷售訂單',
		amount: 140000.0,
		signDate: '2023-09-21',
		deliveryDate: '2023-10-21',
		status: '審核中',
		salesperson: '銷售員 B',
		// products: [
		//   { productName: "產品B", productCode: "A001", quantity: 20, unitPrice: 7000, totalPrice: 140000 },
		// ],
		// deliveries: [
		//   { deliveryBatch: "批次2", plannedDeliveryDate: "2023-10-05", deliveryRemarks: "第二批送貨" },
		// ]
		productName: '產品B',
		productCode: 'A001',
		quantity: 20,
		unitPrice: 7000,
		totalPrice: 140000,
		deliveryBatch: '批次2',
		plannedDeliveryDate: '2023-10-10',
		deliveryRemarks: '第二批送貨',
	},
	{
		customer: '顧客C',
		name: 'CCC銷售訂單',
		amount: 180000.0,
		signDate: '2025-01-21',
		deliveryDate: '2025-02-21',
		status: '未通過',
		salesperson: '銷售員 C',
		// products: [
		//   { productName: "產品C", productCode: "A001", quantity: 20, unitPrice: 7000, totalPrice: 140000 },
		// ],
		// deliveries: [
		//   { deliveryBatch: "批次3", plannedDeliveryDate: "2023-10-05", deliveryRemarks: "第三批送貨" },
		// ]
		productName: '產品C',
		productCode: 'B001',
		quantity: 30,
		unitPrice: 6000,
		totalPrice: 180000,
		deliveryBatch: '批次3',
		plannedDeliveryDate: '2025-02-05',
		deliveryRemarks: '第三批送貨',
	},
]);

const columnsB = ref([
	{
		prop: 'customer',
		label: '客戶名稱',
		minWidth: 150,
		sortable: true,
		fixed: true,
	},
	{
		prop: 'orderName',
		label: '訂單標題',
		minWidth: 150,
		sortable: true,
		fixed: true,
	},
	{
		prop: 'grossMargin',
		label: '訂單毛利率 %',
		minWidth: 150,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
		fixed: true,
	},
	{
		prop: 'originalPrice',
		label: '銷售原價總額/元',
		minWidth: 155,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'discountAmount',
		label: '優惠金額/元',
		minWidth: 150,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'discountRate',
		label: '整單折扣率 %',
		minWidth: 150,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'amount',
		label: '銷售訂單金額/元',
		minWidth: 155,
		sortable: true,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'signDate', label: '訂單簽訂日期', minWidth: 150, sortable: true },
	{
		prop: 'status',
		label: '審批結果',
		minWidth: 130,
		sortable: true,
		slot: 'status',
	},
	{ prop: 'salesperson', label: '銷售負責人', minWidth: 130, sortable: true },
	{
		label: '產品明細',
		headerAlign: 'center',
		children: [
			{ prop: 'productName', label: '產品名稱', minWidth: 180 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 150 },
			{
				prop: 'quantity',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'unitPrice',
				label: '實際售價/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);

const orderDataB = ref([
	{
		customer: '顧客A',
		orderName: 'AAA銷售訂單',
		grossMargin: '45.36%',
		originalPrice: 10000,
		discountAmount: 850,
		discountRate: '8.5%',
		amount: 9150.0,
		signDate: '2024-07-31',
		deliveryDate: '2024-08-31',
		status: '通過',
		salesperson: '銷售員 A',
		productName: '產品A',
		productCode: 'P001',
		quantity: 10,
		unitPrice: 1500,
		totalPrice: 15000,
	},
	{
		customer: '顧客B',
		orderName: 'BBB銷售訂單',
		grossMargin: '40.00%',
		originalPrice: 150000,
		discountAmount: 10000,
		discountRate: '6.67%',
		amount: 140000.0,
		signDate: '2023-09-21',
		deliveryDate: '2023-10-21',
		status: '審核中',
		salesperson: '銷售員 B',
		productName: '產品B',
		productCode: 'A001',
		quantity: 20,
		unitPrice: 7000,
		totalPrice: 140000,
	},
	{
		customer: '顧客C',
		orderName: 'CCC銷售訂單',
		grossMargin: '35.00%',
		originalPrice: 200000,
		discountAmount: 20000,
		discountRate: '10.00%',
		amount: 180000.0,
		signDate: '2025-01-21',
		deliveryDate: '2025-02-21',
		status: '未通過',
		salesperson: '銷售員 C',
		productName: '產品C',
		productCode: 'B001',
		quantity: 30,
		unitPrice: 6000,
		totalPrice: 180000,
	},
]);

const columnsC = ref([
	{
		label: '訂單簽訂日期',
		headerAlign: 'left',
		children: [
			{ prop: 'productName', label: '產品名稱', minWidth: 130 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 130 },
		],
	},
	{
		label: '總匯',
		headerAlign: 'left',
		children: [
			{
				prop: 'totalQuantity',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'averagePrice',
				label: '平均銷售單價/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年07',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202407',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202407',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'averagePrice202407',
				label: '平均銷售單價/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年06',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202406',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202406',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'averagePrice202406',
				label: '平均銷售單價/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);

const orderDataC = ref([
	{
		productName: '產品A',
		productCode: 'P001',
		totalQuantity: 100,
		totalPrice: 150000,
		averagePrice: 1500,
		quantity202407: 50,
		totalPrice202407: 75000,
		averagePrice202407: 1500,
		quantity202406: 50,
		totalPrice202406: 75000,
		averagePrice202406: 1500,
	},
	{
		productName: '產品B',
		productCode: 'P002',
		totalQuantity: 200,
		totalPrice: 300000,
		averagePrice: 1500,
		quantity202407: 100,
		totalPrice202407: 150000,
		averagePrice202407: 1500,
		quantity202406: 100,
		totalPrice202406: 150000,
		averagePrice202406: 1500,
	},
]);

const columnsD = ref([
	{
		label: '訂單簽訂日期',
		headerAlign: 'left',
		children: [
			{ prop: 'customerName', label: '客戶名稱', minWidth: 150 },
			{ prop: 'productName', label: '產品名稱', minWidth: 130 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 130 },
		],
	},
	{
		label: '總匯',
		headerAlign: 'left',
		children: [
			{
				prop: 'totalQuantity',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年07',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202407',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202407',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年06',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202406',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202406',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);

const orderDataD = ref([
	{
		customerName: '客戶A',
		productName: '產品A',
		productCode: 'P001',
		totalQuantity: 100,
		totalPrice: 150000,
		quantity202407: 50,
		totalPrice202407: 75000,
		quantity202406: 50,
		totalPrice202406: 75000,
	},
	{
		customerName: '客戶B',
		productName: '產品B',
		productCode: 'P002',
		totalQuantity: 200,
		totalPrice: 300000,
		quantity202407: 100,
		totalPrice202407: 150000,
		quantity202406: 100,
		totalPrice202406: 150000,
	},
]);

const columnsE = ref([
	{
		label: '訂單簽訂日期',
		headerAlign: 'left',
		children: [
			{ prop: 'productName', label: '產品名稱', minWidth: 130 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 130 },
		],
	},
	{
		label: '總匯',
		headerAlign: 'left',
		children: [
			{
				prop: 'totalQuantity',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年07',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202407',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202407',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		label: '2024年06',
		headerAlign: 'left',
		children: [
			{
				prop: 'quantity202406',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice202406',
				label: '實際售價合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);

const orderDataE = ref([
	{
		productName: '產品A',
		productCode: 'P001',
		totalQuantity: 100,
		totalPrice: 150000,
		quantity202407: 50,
		totalPrice202407: 75000,
		quantity202406: 50,
		totalPrice202406: 75000,
	},
	{
		productName: '產品B',
		productCode: 'P002',
		totalQuantity: 200,
		totalPrice: 300000,
		quantity202407: 100,
		totalPrice202407: 150000,
		quantity202406: 100,
		totalPrice202406: 150000,
	},
]);

const valueA = ref(null);
const demoA = ref([
	{ label: 'AA', value: 'aa' },
	{ label: 'BB', value: 'bb' },
]);

const filteredDemoA = ref([...demoA.value]);

// 搜索名稱
const searchDemoA = (query) => {
	if (query) {
		filteredDemoA.value = demoA.value.filter((demo) =>
			demo.label.toLowerCase().includes(query.toLowerCase())
		);
	} else {
		filteredDemoA.value = [...demoA.value];
	}
};
const selectedCondition = ref(null);
// 處理下拉選擇條件
const handleCommand = (command) => {
	selectedCondition.value = command;
};
const conditions = ref([
	{ label: '等於', value: 'equals' },
	{ label: '不等於', value: 'notEquals' },
	{ label: '等於任意一個', value: 'equalsAny' },
	{ label: '不等於任意一個', value: 'notEqualsAny' },
	{ label: '包含', value: 'contains' },
	{ label: '不包含', value: 'notContains' },
	{ label: '為空', value: 'isEmpty' },
	{ label: '不為空', value: 'isNotEmpty' },
]);
// 表格審核對應名稱
const getTagType = (status) => {
	switch (status) {
		case '通過':
			return 'success';
		case '審核中':
			return 'warning';
		case '未通過':
			return 'danger';
		default:
			return 'info';
	}
};
</script>
<style scoped>
.el-tag {
	padding: 15px;
	font-size: 14px;
}
</style>
