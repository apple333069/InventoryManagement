<template>
	<!-- 主內容 -->
	<main class="flex-1 p-6">
		<HeaderBar title="銷售訂單統計" />

		<section class="mt-6">
			<el-tabs v-model="activeTab" type="border-card">
				<!-- 銷售訂單統計 -->
				<el-tab-pane label="銷售訂單統計" name="1">
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-6 pb-8">
						<div class="col-span-2 grid grid-cols-2 gap-4">
							<StatisticCard
								v-for="(stat, index) in statisticsA"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
							<div
								class="col-span-2 p-4 text-center bg-white border transition hover:shadow-md hover:bg-blue-50 flex flex-col justify-evenly"
							>
								<div class="font-semibold text-gray-600 pb-2">
									銷售訂單總金額
								</div>
								<div class="text-2xl font-bold text-blue-600">2,017,150元</div>
							</div>
						</div>
						<!-- 右側圖表 -->
						<div class="col-span-3">
							<div>
								<LineChart
									title="銷售金額趨勢/元"
									:xAxisData="[
										'2023年05月',
										'2023年06月',
										'2023年07月',
										'2023年08月',
										'2023年09月',
										'2024年07月',
									]"
									:seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
								/>
							</div>
						</div>
					</div>
					<!-- 篩選區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-6 gap-4 pb-8">
						<ButtonCard
							:title="'審批結果'"
							:buttons="[
								{ label: '通過', type: 'primary' },
								{ label: '不通過' },
							]"
						/>
						<DropdownCard
							title="客戶名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇客戶名稱"
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
							select-placeholder="選擇銷售負責人"
							@command="handleCommand"
							class="col-span-2"
						/>
						<DatePickerCard
							:title="'訂單簽訂日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
							class="col-span-2"
						/>
					</div>
					<!-- 下排表格 -->
					<BrowseTable
						title="銷售訂單明細"
						:tableData="orderDataA"
						:columns="columnsA"
					>
						<template #status="{ row }">
							<el-tag :type="getTagType(row.status)" effect="dark">
								{{ row.status }}
							</el-tag>
						</template>
					</BrowseTable>
				</el-tab-pane>
				<!-- 銷售毛利分析 -->
				<el-tab-pane label="銷售毛利分析" name="2">
					<!-- 數據區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-5 gap-6 pb-8">
						<div class="col-span-2 grid grid-cols-2 gap-4">
							<StatisticCard
								v-for="(stat, index) in statisticsB"
								:key="index"
								:title="stat.title"
								:value="stat.value"
							/>
							<div
								class="col-span-2 p-4 text-center bg-white border transition hover:shadow-md hover:bg-blue-50 flex flex-col justify-evenly"
							>
								<div class="font-semibold text-gray-600 pb-2">
									產品銷售總毛利率
								</div>
								<div class="text-4xl font-bold text-blue-600">45.36%</div>
							</div>
						</div>
						<!-- 右側圖表 -->
						<div class="col-span-3">
							<div>
								<LineChart
									title="銷售毛利率趨勢"
									:xAxisData="[
										'2023年05月',
										'2023年06月',
										'2023年07月',
										'2023年08月',
										'2023年09月',
										'2024年07月',
									]"
									:seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
								/>
							</div>
						</div>
					</div>
					<!-- 篩選區塊 -->
					<div class="grid grid-cols-2 xl:grid-cols-6 gap-4 pb-8">
						<DropdownCard
							title="客戶名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇客戶名稱"
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
							select-placeholder="選擇銷售負責人"
							@command="handleCommand"
						/>
						<el-card shadow="never" class="hover:shadow-md col-span-2">
							<div class="flex items-center justify-between">
								<p class="text-sm font-semibold text-gray-500">訂單毛利率 %</p>
								<!-- 選擇條件 -->
								<el-dropdown @command="handleCommand">
									<span class="el-dropdown-link outline-none text-primary">
										{{
											selectedCondition ? selectedCondition.label : '選擇範圍'
										}}
										<i class="ri-arrow-down-s-line"></i>
									</span>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item
												v-for="option in conditions"
												:key="option.value"
												:command="option"
												class="blue-option"
											>
												{{ option.label }}
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
							<!-- 輸入框 -->
							<div class="flex gap-4 mt-2">
								<el-input placeholder="最小值" type="number" class="w-full" />
								~
								<el-input placeholder="最大值" type="number" class="w-full" />
							</div>
						</el-card>
						<DatePickerCard
							:title="'訂單簽訂日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
							class="col-span-2"
						/>
					</div>
					<!-- 下排表格 -->
					<BrowseTable
						title="銷售訂單毛利率明細"
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
				<!-- 產品銷售價格 - 波動統計/月 -->
				<el-tab-pane label="產品銷售價格 - 波動統計/月" name="3">
					<div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8">
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
							title="規格型號"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇規格型號"
							@command="handleCommand"
						/>
						<DropdownCard
							title="品牌"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇品牌"
							@command="handleCommand"
						/>
						<DatePickerCard
							:title="'訂單簽訂日期'"
							:options="conditions"
							:selected-condition="selectedCondition"
							dropdown-placeholder="選擇範圍"
							v-model:selected-value="date"
						/>
					</div>
					<!-- 下排表格 -->
					<BrowseTable
						title="產品銷售價格波動統計/月"
						:tableData="orderDataC"
						:columns="columnsC"
					/>
				</el-tab-pane>
				<!-- 銷售排行榜 -->
				<el-tab-pane label="銷售排行榜" name="4">
					<div class="flex flex-col lg:flex-row gap-6">
						<!-- 左側日曆區域 -->
						<div class="w-full lg:w-1/3 p-4 border rounded-lg">
							<div class="flex items-center justify-between mb-4">
								<h3 class="text-lg text-gray-600 font-semibold">
									訂單簽訂日期
								</h3>
								<button class="text-blue-500 hover:underline">選擇範圍</button>
							</div>
							<div class="flex items-center justify-between gap-6 mb-4">
								<el-input placeholder="開始時間" />
								<el-input placeholder="結束時間" />
							</div>
							<el-calendar v-model="calendarValue" />
						</div>

						<!-- 中間區域 -->
						<div class="w-full lg:w-1/3 p-4 border rounded-lg">
							<h3 class="text-lg text-gray-600 font-semibold mb-4">
								訂單金額排名（個人）
							</h3>
							<ul class="space-y-4">
								<li
									class="flex justify-between items-center border-b border-gray-300 pb-2"
								>
									<span>共計</span>
									<el-tag
										class="font-semibold"
										type="warning"
										effect="dark"
										round
										>2,017,150</el-tag
									>
								</li>
								<li class="flex justify-between items-center">
									<span>張三</span>
									<el-tag round>2,017,150</el-tag>
								</li>
							</ul>
						</div>

						<!-- 右側區域 -->
						<div class="w-full lg:w-1/3 p-4 border rounded-lg">
							<h3 class="text-lg text-gray-600 font-semibold mb-4">
								訂單金額排名（部門）
							</h3>
							<ul class="space-y-4">
								<li
									class="flex justify-between items-center border-b border-gray-300 pb-2"
								>
									<span>共計</span>
									<el-tag
										class="font-semibold"
										type="warning"
										effect="dark"
										round
										>2,017,150</el-tag
									>
								</li>
								<li class="flex justify-between items-center">
									<span>AA有限公司</span>
									<el-tag round>9,150</el-tag>
								</li>
								<li class="flex justify-between items-center">
									<span>市場部</span>
									<el-tag round>2,008,000</el-tag>
								</li>
							</ul>
						</div>
					</div>
				</el-tab-pane>
				<!-- 客戶銷量統計 -->
				<el-tab-pane label="客戶銷量統計" name="5">
					<div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8">
						<DatePickerCard
							:title="'訂單簽訂日期'"
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
							title="客戶名稱"
							:options="conditions"
							:remote-method="searchDemoA"
							:filtered-items="filteredDemoA"
							:selected-condition="selectedCondition"
							v-model:selected-value="valueA"
							dropdown-placeholder="選擇條件"
							select-placeholder="選擇客戶名稱"
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
					<!-- 下排表格 -->
					<BrowseTable
						title="客戶銷量統計"
						:tableData="orderDataD"
						:columns="columnsD"
					/>
				</el-tab-pane>
				<!-- 產品銷量統計 -->
				<el-tab-pane label="產品銷量統計" name="6">
					<div class="grid xl:grid-cols-3 gap-4 pb-8">
						<DatePickerCard
							:title="'訂單簽訂日期'"
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
					<!-- 下排表格 -->
					<BrowseTable
						title="產品銷量統計"
						:tableData="orderDataE"
						:columns="columnsE"
					/>
				</el-tab-pane>
			</el-tabs>
		</section>
	</main>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import LineChart from '@/components/LineChart.vue';
import BrowseTable from '@/components/BrowseTable.vue';
import ButtonCard from '@/components/ButtonCard.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import DropdownCard from '@/components/DropdownCard.vue';
import DatePickerCard from '@/components/DatePickerCard.vue';

const activeTab = ref('1');
const date = ref([]);
const calendarValue = ref(new Date());

const statisticsA = ref([
	{ title: '簽單客戶數', value: '5家' },
	{ title: '銷售訂單簽署數量', value: '13份' },
]);
const statisticsB = ref([
	{ title: '產品銷售總金額', value: '2,017,150元' },
	{ title: '產品採購總成本', value: '1,102,262元' },
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
