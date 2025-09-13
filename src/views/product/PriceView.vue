<template>
	<main class="flex flex-col space-y-4">
		<el-row class="p-3 bg-white rounded-md shadow flex justify-end md:justify-start">
			<el-col :span="5">
				<!-- 下拉選單 -->
				<el-select v-model="selectedOption" placeholder="請選擇">
					<el-option label="僅新增資料" value="add"></el-option>
					<el-option label="添加並管理數據" value="manage"></el-option>
					<el-option label="查看全部資料" value="view"></el-option>
					<hr />
					<el-option label="全部有限權的資料" value="restricted"></el-option>
				</el-select>
			</el-col>
		</el-row>

		<!-- 僅新增資料 -->
		<div v-if="selectedOption === 'add'">
			<div
				class="p-8 bg-white rounded-t-md shadow max-h-[82vh] overflow-y-auto"
			>
				<!-- 產品資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					產品資料
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="選擇產品" :required="true">
						<el-button class="w-3/4" @click="openData = true"
							><i class="ri-database-2-line mr-1"></i>選擇資料</el-button
						>
					</el-form-item>
					<el-form-item label="產品編碼">
						<el-input v-model="form.pdCode" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="產品屬性">
						<el-input
							v-model="form.pdAttribute"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="產品類型">
						<el-input v-model="form.pdType" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="產品名稱">
						<el-input v-model="form.name" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="品牌">
						<el-input v-model="form.brand" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="規格型號">
						<el-input v-model="form.model" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="單位">
						<el-input v-model="form.unit" disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="產品圖片">
						<template v-if="form.pdImage">
							<img
								:src="form.pdImage"
								alt="產品圖片"
								class="w-28 object-cover border rounded"
							/>
						</template>
						<template v-else>
							<el-input disabled placeholder="暫無內容" />
						</template>
					</el-form-item>
				</el-form>

				<!-- 產品成本 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					產品成本
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="成本單價/元">
						<el-input />
					</el-form-item>

					<el-form-item label="標準售價(含稅)/元">
						<el-input />
					</el-form-item>
				</el-form>

				<!-- 產品銷售價格 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					產品銷售價格
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="價格等級">
						<el-select
							v-model="value1"
							placeholder="請選擇"
							class="w-full"
							clearable
							filterable
							remote
							reserve-keyword
							remote-show-suffix
							:no-match-text="'沒有符合的數據'"
							:no-data-text="'沒有可選擇的數據'"
						>
							<el-option label="標準售價" value="1"></el-option>
							<el-option label="一級售價" value="2"></el-option>
							<el-option label="二級售價" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="銷售售價(含稅)/元">
						<el-input />
					</el-form-item>

					<el-form-item label="增值稅稅率 %">
						<el-input>
							<template #append>%</template>
						</el-input>
					</el-form-item>
				</el-form>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 pb-6 px-2 font-bold"
				>
					<el-form-item>
						<template #label>
							銷售單價(不含稅)/元
							<div class="text-xs text-gray-400 mt-2">
								銷售單價(含稅)/(1+增值稅稅率)
							</div>
						</template>
						<el-input disabled placeholder="0.00" />
					</el-form-item>
					<el-form-item label="稅額/元">
						<el-input disabled placeholder="0.00" />
					</el-form-item>
					<el-form-item label="售價毛利/元">
						<el-input disabled placeholder="0.00" />
					</el-form-item>
				</el-form>
			</div>
			<div
				class="p-4 bg-white rounded-b-md shadow text-center mt-auto border-t"
			>
				<el-button type="primary">送出</el-button>
			</div>
		</div>
		<!-- 添加並管理數據 -->
		<div
			v-else-if="selectedOption === 'manage'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable :tableData="detailsData" :columns="detailsColumns">
			</ManageTable>
		</div>
		<!-- 查看全部資料 -->
		<div
			v-else-if="selectedOption === 'view'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable
				:edit="false"
				:tableData="detailsData"
				:columns="detailsColumns"
			>
			</ManageTable>
		</div>
		<!-- 全部有限權的資料 -->
		<div
			v-else-if="selectedOption === 'restricted'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable :tableData="detailsData" :columns="detailsColumns">
			</ManageTable>
		</div>

		<el-dialog v-model="openData" width="65%">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">選擇資料</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 搜尋框 -->
			<div class="flex justify-end mb-2">
				<div>
					<el-input v-model="searchText" placeholder="輸入關鍵字" clearable>
						<template #prefix>
							<i class="ri-search-line"></i>
						</template>
					</el-input>
				</div>
				<div>
					<el-tooltip content="篩選條件" placement="bottom" :hide-after="10">
						<el-button text>
							<i class="ri-filter-line"></i>
						</el-button>
					</el-tooltip>
				</div>
			</div>
			<!-- 表格 -->
			<el-table
				:data="filterTableData"
				:header-cell-style="{
					backgroundColor: '#f5f7f8',
					color: '#606266',
					fontWeight: 'bold',
				}"
				class="mb-4"
				border
				@row-click="confirmSelection"
			>
				<el-table-column align="center" width="55" fixed>
					<template #default="scope">
						<el-radio :label="scope.row.pdCode" v-model="selectedRow"
							>&nbsp;</el-radio
						>
					</template>
				</el-table-column>
				<el-table-column
					v-for="column in priceColumns"
					:key="column.prop"
					:prop="column.prop"
					:label="column.label"
					:width="column.minWidth || null"
					:align="column.align"
					:header-align="column.headerAlign"
				>
					<template v-if="column.prop === 'pdImage'" #default="scope">
						<img
							:src="scope.row[column.prop]"
							alt="產品圖片"
							style="width: 50px; height: auto"
						/>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</main>
</template>

<script setup>
import ManageTable from '@/components/ManageTable.vue';
const selectedOption = ref('add');
const openData = ref(false);
const value1 = ref('');
const searchText = ref('');
// 選中的行數據
const selectedRow = ref(null);
const form = ref({
	name: '',
	pdCode: '',
	pdAttribute: '',
	pdType: '',
	brand: '',
	model: '',
	unit: '',
	pdImage: '',
});
// 視窗表格欄位
const priceColumns = ref([
	{ prop: 'name', label: '產品名稱', minWidth: 150 },
	{ prop: 'pdCode', label: '產品編碼', minWidth: 100 },
	{ prop: 'pdAttribute', label: '產品屬性', minWidth: 100 },
	{ prop: 'pdType', label: '產品類型', minWidth: 150 },
	{ prop: 'brand', label: '品牌' },
	{ prop: 'model', label: '規格型號', minWidth: 150 },
	{ prop: 'unit', label: '單位' },
	{ prop: 'pdImage', label: '產品圖片', minWidth: 100 },
]);
// 視窗表格數據
const priceData = ref([
	{
		name: 'MTQ8200-HS2F',
		pdCode: 'CP0014',
		pdAttribute: '成品',
		pdType: '交換機',
		brand: '品牌A',
		model: 'WH-1000XM4',
		unit: '個',
		pdImage: 'https://via.placeholder.com/150',
	},
	{
		name: 'ST1L05',
		pdCode: 'CP0006',
		pdAttribute: '零件',
		pdType: '網卡-CPU晶片',
		brand: '品牌B',
		model: 'STV-2024',
		unit: '台',
		pdImage: 'https://via.placeholder.com/150',
	},
]);
// 表格欄位
const detailsColumns = ref([
	{ prop: 'pdCode', label: '產品編碼', minWidth: 100 },
	{ prop: 'pdAttribute', label: '產品屬性', minWidth: 100 },
	{ prop: 'pdType', label: '產品類型', minWidth: 150 },
	{ prop: 'name', label: '產品名稱', minWidth: 150 },
	{ prop: 'brand', label: '品牌' },
	{ prop: 'model', label: '規格型號', minWidth: 150 },
	{ prop: 'unit', label: '單位' },
	{ prop: 'pdImage', label: '產品圖片', minWidth: 100 },
	{
		prop: 'costPrice',
		label: '成本單價/元',
		minWidth: 130,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'standardPrice',
		label: '標準售價(含稅)/元',
		minWidth: 150,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'priceLevel', label: '價格等級', minWidth: 100 },
	{
		prop: 'sellingPrice',
		label: '銷售單價(含稅)/元',
		minWidth: 150,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'vatRate',
		label: '增值稅稅率%',
		minWidth: 100,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'sellingPriceExTax',
		label: '銷售單價(不含稅)/元',
		minWidth: 160,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'taxAmount',
		label: '稅額/元',
		minWidth: 130,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'profitMargin',
		label: '售價毛利/元',
		minWidth: 130,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'submitter', label: '送出人' },
	{ prop: 'submitTime', label: '送出時間', minWidth: 150 },
	{ prop: 'updateTime', label: '更新時間', minWidth: 150 },
]);
// 表格數據
const detailsData = ref([
	{
		pdCode: 'CP0014',
		pdAttribute: '成品',
		pdType: '交換機',
		name: 'MTQ8200-HS2F',
		brand: '品牌A',
		model: 'WH-1000XM4',
		unit: '個',
		pdImage: 'https://via.placeholder.com/150',
		costPrice: 320,
		standardPrice: 680,
		priceLevel: '標準售價',
		sellingPrice: 680,
		vatRate: '13%',
		sellingPriceExTax: 591.6,
		taxAmount: 88.4,
		profitMargin: 360,
		submitter: '張三',
		submitTime: '2024-12-15 14:30',
		updateTime: '2024-12-16 10:15',
	},
	{
		pdCode: 'CP0006',
		pdAttribute: '零件',
		pdType: '網卡-CPU晶片',
		name: 'ST1L05',
		brand: '品牌B',
		model: 'STV-2024',
		unit: '台',
		pdImage: 'https://via.placeholder.com/150',
		costPrice: 360,
		standardPrice: 680,
		priceLevel: '一級售價',
		sellingPrice: 640,
		vatRate: '13%',
		sellingPriceExTax: 561.15,
		taxAmount: 83.85,
		profitMargin: 285,
		submitter: '李四',
		submitTime: '2024-12-14 16:00',
		updateTime: '2024-12-16 09:45',
	},
]);
// 確認選擇
const confirmSelection = (row) => {
	// 將選中的資料帶入到 selectedProduct 中
	form.value = { ...row };
	openData.value = false; // 關閉視窗
};
// 搜尋
const filterTableData = computed(() =>
	priceData.value.filter(
		(data) =>
			!searchText.value ||
			data.name.toLowerCase().includes(searchText.value.toLowerCase())
	)
);
</script>
