<template>
	<main class="flex flex-col space-y-4">
		<el-row class="p-3 bg-white rounded-md shadow">
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
			<div class="p-8 bg-white rounded-t-md shadow h-[82vh] overflow-y-auto">
				<!-- 倉庫資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					倉庫資料
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-4 gap-4 py-7 px-2 font-bold"
				>
					<!-- 左側欄位 -->
					<div>
						<el-form-item label="倉庫名稱" :required="true">
							<el-input placeholder="請輸入倉庫名稱" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="倉庫地址" :required="true">
							<el-cascader
								:options="options"
								class="w-full"
								placeholder="請選擇位址"
								filterable
								clearable
							/>
							<el-input
								v-model="textarea"
								:rows="3"
								type="textarea"
								class="mt-2"
								placeholder="請填寫詳細位址"
							/>
						</el-form-item>

						<el-form-item label="倉庫性質">
							<el-select
								v-model="value1"
								placeholder="請選擇倉庫性質"
								class="w-full"
								clearable
								filterable
								remote
								reserve-keyword
								remote-show-suffix
								:no-match-text="'沒有符合的數據'"
								:no-data-text="'沒有可選擇的數據'"
							>
								<el-option label="A倉庫" value="1"></el-option>
								<el-option label="B倉庫" value="2"></el-option>
								<el-option label="C倉庫" value="3"></el-option>
							</el-select>
						</el-form-item>
					</div>

					<!-- 右側欄位 -->
					<div class="xl:col-start-3">
						<el-form-item label="倉庫編碼">
							<el-input disabled placeholder="自動生成無需填寫" />
						</el-form-item>

						<div class="grid grid-rows-2">
							<el-form-item label="倉庫容量/立方">
								<el-input
									placeholder="請輸入倉庫容量/立方"
									class="w-full"
								></el-input>
							</el-form-item>
						</div>

						<el-form-item label="倉庫狀態" :required="true">
							<el-radio-group v-model="radio1">
								<el-radio value="1"
									><el-tag type="success" effect="dark">啟用</el-tag></el-radio
								>
								<el-radio value="2"
									><el-tag type="danger" effect="dark">停用</el-tag></el-radio
								>
							</el-radio-group>
						</el-form-item>
					</div>
				</el-form>

				<!-- 倉管資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					倉管資料
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-4 gap-4 py-7 px-2 font-bold"
				>
					<!-- 左側欄位 -->
					<div>
						<el-form-item label="倉庫主管" :required="true">
							<el-button class="w-full" @click="openMember = true"
								><i class="ri-add-line text-lg"></i>選擇成員</el-button
							>
						</el-form-item>
						<el-form-item label="聯繫電話" :required="true">
							<el-input placeholder="請輸入聯繫電話" class="w-full"></el-input>
						</el-form-item>
					</div>

					<!-- 右側欄位 -->
					<div class="xl:col-start-3">
						<el-form-item label="倉管歸屬部門" :required="true">
							<el-button class="w-full" @click="openDepartment = true"
								><i class="ri-add-line text-lg"></i>選擇部門</el-button
							>
						</el-form-item>
					</div>
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
				<template #whStatus="{ row }">
					<el-tag :type="getTagType(row.whStatus)" effect="dark">
						{{ row.whStatus }}
					</el-tag>
				</template>
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
				<template #whStatus="{ row }">
					<el-tag :type="getTagType(row.whStatus)" effect="dark">
						{{ row.whStatus }}
					</el-tag>
				</template>
			</ManageTable>
		</div>
		<!-- 全部有限權的資料 -->
		<div
			v-else-if="selectedOption === 'restricted'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable :tableData="detailsData" :columns="detailsColumns">
				<template #whStatus="{ row }">
					<el-tag :type="getTagType(row.whStatus)" effect="dark">
						{{ row.whStatus }}
					</el-tag>
				</template>
			</ManageTable>
		</div>

		<el-dialog v-model="openMember" width="40%">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">成員列表</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
		</el-dialog>
		<el-dialog v-model="openDepartment" width="40%">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">部門清單</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
		</el-dialog>
	</main>
</template>

<script setup>
import ManageTable from '@/components/ManageTable.vue';
const selectedOption = ref('add');
const value1 = ref('');
const textarea = ref('');
const radio1 = ref('1');
const openMember = ref(false);
const openDepartment = ref(false);
const options = [
	{
		value: 'a',
		label: '臺北市',
		children: [
			{
				value: 'b',
				label: '萬華區',
			},
			{
				value: 'c',
				label: '中正區',
			},
		],
	},
	{
		value: 'd',
		label: '新北市',
		children: [
			{
				value: 'e',
				label: '板橋區',
			},
			{
				value: 'f',
				label: '中和區',
			},
		],
	},
];
// 表格欄位
const detailsColumns = ref([
	{ prop: 'name', label: '倉庫名稱', minWidth: 100 },
	{ prop: 'whCode', label: '倉庫編碼', minWidth: 100 },
	{ prop: 'whAddress', label: '倉庫地址', minWidth: 150 },
	{ prop: 'whCapacity', label: '倉庫容量/立方', minWidth: 130 },
	{ prop: 'whType', label: '倉庫性質', minWidth: 100 },
	{ prop: 'whStatus', label: '倉庫狀態', minWidth: 100, slot: 'whStatus' },
	{ prop: 'whManager', label: '倉庫主管', minWidth: 100 },
	{ prop: 'whDepartment', label: '倉管歸屬部門', minWidth: 130 },
	{ prop: 'whPhone', label: '聯繫電話', minWidth: 120 },
	{ prop: 'submitter', label: '送出人' },
	{ prop: 'submitTime', label: '送出時間', minWidth: 150 },
	{ prop: 'updateTime', label: '更新時間', minWidth: 150 },
]);
// 表格數據
const detailsData = ref([
	{
		name: 'A倉庫',
		whCode: 'CK01',
		whAddress: 'A地址',
		whCapacity: '120000',
		whType: '存貨倉',
		whStatus: '啟用',
		whManager: '張三',
		whDepartment: '生產部',
		whPhone: '0912345678',
		submitter: '張三',
		submitTime: '2024-12-15 14:30',
		updateTime: '2024-12-16 10:15',
	},
	{
		name: 'B倉庫',
		whCode: 'CK02',
		whAddress: 'B地址',
		whCapacity: '120000',
		whType: '存貨倉',
		whStatus: '啟用',
		whManager: '李四',
		whDepartment: '生產部',
		whPhone: '0912345678',
		submitter: '李四',
		submitTime: '2024-12-14 16:00',
		updateTime: '2024-12-16 09:45',
	},
]);
// 表格審核對應名稱
const getTagType = (status) => {
	switch (status) {
		case '啟用':
			return 'success';
		case '停用':
			return 'danger';
		default:
			return 'info';
	}
};
</script>
