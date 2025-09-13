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
			<div class="p-8 bg-white rounded-t-md shadow h-[82vh] overflow-y-auto">
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					產品分類
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-4 gap-4 py-7 px-2 font-bold"
				>
					<div class="xl:col-span-4">
						<el-form-item label="產品屬性">
							<el-input
								placeholder="請輸入產品屬性"
								class="xl:max-w-xl"
							></el-input>
						</el-form-item>

						<el-form-item label="產品類型">
							<el-input
								placeholder="請輸入產品類型"
								class="xl:max-w-xl"
							></el-input>
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
			<ManageTable :tableData="detailsData" :columns="detailsColumns" />
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
			/>
		</div>
		<!-- 全部有限權的資料 -->
		<div
			v-else-if="selectedOption === 'restricted'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable :tableData="detailsData" :columns="detailsColumns" />
		</div>
	</main>
</template>

<script setup>
import ManageTable from '@/components/ManageTable.vue';
const selectedOption = ref('add');
// 表格欄位
const detailsColumns = ref([
	{ prop: 'pdAttribute', label: '產品屬性' },
	{ prop: 'pdType', label: '產品類型' },
	{ prop: 'submitter', label: '送出人' },
	{ prop: 'submitTime', label: '送出時間' },
	{ prop: 'updateTime', label: '更新時間' },
]);
// 表格數據
const detailsData = ref([
	{
		pdAttribute: '成品',
		pdType: '交換機',
		submitter: '張三',
		submitTime: '2024-12-15 14:30',
		updateTime: '2024-12-16 10:15',
	},
	{
		pdAttribute: '零件',
		pdType: '網卡-CPU晶片',
		submitter: '李四',
		submitTime: '2024-12-14 16:00',
		updateTime: '2024-12-16 09:45',
	},
]);
</script>
