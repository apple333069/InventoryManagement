<template>
	<main class="flex-1 p-6">
		<HeaderBar title="客戶分析" />
		<section class="mt-6">
			<el-tabs v-model="activeTab" type="border-card">
				<!-- RFM 模型分析 -->
				<el-tab-pane label="RFM 模型分析" name="1">
					<div class="grid grid-cols-12 gap-2 pb-8">
						<!-- 上排左側: 篩選 -->
						<div class="col-span-4">
							<div class="flex-col space-y-2">
								<DropdownCard
									title="訂單簽訂日期"
									:options="conditions"
									:remote-method="searchDemoA"
									:filtered-items="filteredDemoA"
									:selected-condition="selectedCondition"
									v-model:selected-value="valueA"
									dropdown-placeholder=""
									select-placeholder=""
									@command="handleCommand"
								/>
								<DropdownCard
									title="客戶標籤"
									:options="conditions"
									:remote-method="searchDemoA"
									:filtered-items="filteredDemoA"
									:selected-condition="selectedCondition"
									v-model:selected-value="valueA"
									dropdown-placeholder=""
									select-placeholder=""
									@command="handleCommand"
								/>
								<DropdownCard
									title="銷售負責人"
									:options="conditions"
									:remote-method="searchDemoA"
									:filtered-items="filteredDemoA"
									:selected-condition="selectedCondition"
									v-model:selected-value="valueA"
									dropdown-placeholder=""
									select-placeholder=""
									@command="handleCommand"
								/>
							</div>
						</div>
						<!-- 上排右側: 表格 -->
						<div class="col-span-8">
							<div class="border h-full hover:shadow-md">
								<BrowseTable
									title="客戶 RFM 模型"
									:tableData="orderDataB"
									:columns="columnsB"
								/>
							</div>
						</div>
						<!-- 下排 RFM 區: 圖表 -->
						<div class="col-span-4">
							<BarChart
								title="R ( 最近訂單距離天數 )"
								:xAxisData="xAxisBarR"
								:seriesData="seriesBarR"
							/>
						</div>
						<div class="col-span-4">
							<BarChart
								title="F ( 銷售次數 )"
								:xAxisData="xAxisBarF"
								:seriesData="seriesBarF"
							/>
						</div>
						<div class="col-span-4">
							<BarChart
								title="M ( 銷售金額比例 )"
								:xAxisData="xAxisBarM"
								:seriesData="seriesBarM"
							/>
						</div>
					</div>
				</el-tab-pane>

				<!-- 客戶畫像 -->
				<el-tab-pane label="客戶畫像" name="2">
					<div class="grid grid-cols-12 gap-2 pb-8">
						<div
							class="col-span-12 xl:col-span-8 flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-2 text-center"
						>
							<!-- 上排 -->
							<StatisticCard
								class="flex-1"
								v-for="(stat, index) in statisticsD"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
						</div>
						<div class="col-span-12 xl:col-span-4">
							<DatePickerCard
								class="h-full"
								:title="'客戶登入時間'"
								:options="conditions"
								:selected-condition="selectedCondition"
								dropdown-placeholder="選擇範圍"
								v-model:selected-value="date"
							/>
						</div>
						<!-- 下排 -->
						<div class="col-span-12 xl:col-span-8">
							<el-card shadow="never" class="hover:shadow-md">
								<GeoMap
									:data="geoData"
									:mapName="'world'"
									:min="0"
									:max="5"
									title="客戶地址分布"
								/>
							</el-card>
						</div>
						<div class="col-span-12 xl:col-span-4 space-y-2">
							<DropdownCard
								title="客戶來源"
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
								title="銷售負責人"
								:options="conditions"
								:remote-method="searchDemoA"
								:filtered-items="filteredDemoA"
								:selected-condition="selectedCondition"
								v-model:selected-value="valueA"
								dropdown-placeholder="選擇條件"
								select-placeholder="選擇產品名稱"
								@command="handleCommand"
							/>
							<HorizontalBarChart
								title="客戶標籤分布"
								:xAxisData="clientTagXAxisBar"
								:seriesData="clientTagSeriesBar"
							/>
						</div>
					</div>
				</el-tab-pane>

				<!-- 客戶跟進分析 -->
				<el-tab-pane label="客戶跟進分析" name="3">
					<div class="grid grid-cols-12 gap-2 pb-8">
						<!-- 上排左側: 篩選 -->
						<div class="col-span-4">
							<div class="flex-col space-y-2">
								<DatePickerCard
									class="h-full"
									:title="'跟進時間'"
									:options="conditions"
									:selected-condition="selectedCondition"
									dropdown-placeholder="選擇範圍"
									v-model:selected-value="date"
								/>
								<DropdownCard
									title="客戶名稱"
									:options="conditions"
									:remote-method="searchDemoA"
									:filtered-items="filteredDemoA"
									:selected-condition="selectedCondition"
									v-model:selected-value="valueA"
									dropdown-placeholder=""
									select-placeholder=""
									@command="handleCommand"
								/>
								<DropdownCard
									title="跟進人"
									:options="conditions"
									:remote-method="searchDemoA"
									:filtered-items="filteredDemoA"
									:selected-condition="selectedCondition"
									v-model:selected-value="valueA"
									dropdown-placeholder=""
									select-placeholder=""
									@command="handleCommand"
								/>
							</div>
						</div>
						<!-- 上排右側: 表格 -->
						<div class="col-span-8">
							<div class="border h-full hover:shadow-md">
								<BrowseTable
									title="跟進記錄明細"
									:tableData="orderDataC"
									:columns="columnsC"
								/>
							</div>
						</div>
						<div class="col-span-4">
							<BarChart
								title="跟進客戶數"
								:xAxisData="xAxisBarC"
								:seriesData="seriesBarC"
							/>
						</div>
						<div class="col-span-4">
							<BarChart
								title="跟進總數"
								:xAxisData="xAxisBarC"
								:seriesData="seriesBarC"
							/>
						</div>
						<div class="col-span-4">
							<DonutChart title="跟進類型" :data="pieData" />
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</section>
	</main>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import BarChart from '@/components/BarChart.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import DropdownCard from '@/components/DropdownCard.vue';
import BrowseTable from '@/components/BrowseTable.vue';
import DatePickerCard from '@/components/DatePickerCard.vue';
import HorizontalBarChart from '@/components/HorizontalBarChart.vue';
import GeoMap from '@/components/GeoMap.vue';
import DonutChart from '@/components/DonutChart.vue';

const activeTab = ref('1');
const date = ref([]);

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
// 表格資料
const columnsB = ref([
	{ prop: 'customer', label: '客戶名稱' },
	{ prop: 'recency', label: 'R ( 最近訂單距離天數 )' },
	{ prop: 'frequency', label: 'F ( 銷售次數 )' },
	{ prop: 'monetary', label: 'M ( 銷售金額比例 )' },
]);
const orderDataB = ref([
	{
		name: '客戶 RFM 模型',
		customer: '顧客 A',
		recency: '397',
		frequency: '1',
		monetary: '2.78 %',
	},
	{
		name: '客戶 RFM 模型',
		customer: '顧客 B',
		recency: '340',
		frequency: '3',
		monetary: '14.77 %',
	},
	{
		name: '客戶 RFM 模型',
		customer: '顧客 C',
		recency: '397',
		frequency: '1',
		monetary: '2.78 %',
	},
]);
// 數據卡片組件
const statisticsA = ref([
	{ title: '當前庫存數', value: '1,238件' },
	{ title: '可用庫存總數', value: '1,193件' },
	{ title: '庫存凍結數', value: '45件' },
	{ title: '計畫出庫數', value: '120件' },
]);
const xAxisBarR = ref(['客戶 A', '客戶 B', '客戶 C']);
const seriesBarR = ref([397, 340, 397]);
const xAxisBarF = ref(['客戶 A', '客戶 B', '客戶 C']);
const seriesBarF = ref([1, 3, 1]);
const xAxisBarM = ref(['客戶 A', '客戶 B', '客戶 C']);
const seriesBarM = ref([278, 1477, 278]);
// 客戶畫像
const statisticsD = ref([
	{ title: '客戶總數', value: '0 家' },
	{ title: '合作客戶數', value: '0 家' },
	{ title: '潛在客戶', value: '0 家' },
]);
const clientTagXAxisBar = ref([1, 2, 3]);
const clientTagSeriesBar = ref(['SME', 'ME', 'KA']);

// 客戶地址分布，name 值需和組件內的 nameMap 值相同
const geoData = ref([{ name: '泰國', value: 3 }]);

// 客戶跟進分析
const columnsC = ref([
	{ prop: 'customer', label: '客戶名稱', sortable: true },
	{ prop: 'followupPerson', label: '跟進人', sortable: true },
	{ prop: 'followupTime', label: '跟進時間', sortable: true },
	{ prop: 'followUpType', label: '跟進方式', sortable: true },
	{ prop: 'followupContentType', label: '跟進內容', sortable: true },
	{ prop: 'followupRecord', label: '跟進內容記錄', sortable: true },
]);
const orderDataC = ref([
	{
		name: '跟進紀錄明細',
		customer: '示範:上海帆軟',
		followupPerson: '張璿',
		followupTime: '2023-09-18 10:28',
		followUpType: '上門拜訪',
		followupContentType: '初次溝通',
		followupRecord: '客戶拜訪',
	},
	{
		name: '跟進紀錄明細',
		customer: '示範:上海帆軟',
		followupPerson: '張璿',
		followupTime: '2023-07-26 14:15',
		followUpType: '電話拜訪',
		followupContentType: '需求溝通',
		followupRecord: '需求回訪',
	},
	{
		name: '跟進紀錄明細',
		customer: '示範:上海帆軟',
		followupPerson: '張璿',
		followupTime: '2023-04-24 14:50',
		followUpType: '電話拜訪',
		followupContentType: '需求溝通',
		followupRecord: '需求回訪',
	},
]);
// 跟進客戶數、跟進總數
const xAxisBarC = ref(['2023年04月', '2023年07月', '2023年09月']);
const seriesBarC = ref([5, 1, 1]);

// 跟進類型圓環圖
const pieData = ref([
	{ value: 3, name: '電話拜訪' },
	{ value: 4, name: '上門拜訪' },
]);
</script>
