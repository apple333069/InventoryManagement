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
			<div
				class="p-8 bg-white rounded-t-md shadow max-h-[82vh] overflow-y-auto"
			>
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					新增產品資料
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-4 gap-4 py-7 px-2 font-bold"
				>
					<div class="xl:col-span-4">
						<el-form-item label="產品編碼" :required="true">
							<el-input
								class="xl:max-w-lg"
								disabled
								placeholder="自動生成無需填寫"
							/>
						</el-form-item>
					</div>
					<!-- 左側欄位 -->
					<div>
						<el-form-item label="產品屬性" :required="true">
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
								<el-option label="成品" value="1"></el-option>
								<el-option label="零件" value="2"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="產品名稱" :required="true">
							<el-input placeholder="請輸入產品名稱" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="規格型號" :required="true">
							<el-input placeholder="請輸入規格型號" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="成本單價/元">
							<el-input placeholder="請輸入成本單價" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="產品權限">
							<div class="flex flex-col gap-2">
								<el-checkbox v-model="checked1"
									><el-tag type="danger" effect="dark"
										>銷售</el-tag
									></el-checkbox
								>
								<el-checkbox v-model="checked2"
									><el-tag type="warning" effect="dark"
										>採購</el-tag
									></el-checkbox
								>
								<el-checkbox v-model="checked3"
									><el-tag type="success" effect="dark"
										>贈送</el-tag
									></el-checkbox
								>
							</div>
						</el-form-item>
					</div>

					<!-- 右側欄位 -->
					<div class="xl:col-start-3">
						<el-form-item label="產品類型" :required="true">
							<el-select
								v-model="value2"
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
								<el-option label="類型1" value="1"></el-option>
								<el-option label="類型2" value="2"></el-option>
								<el-option label="類型3" value="3"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="品牌" :required="true">
							<el-input placeholder="請輸入品牌" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="單位" :required="true">
							<el-select
								v-model="value3"
								placeholder="請選擇單位"
								class="w-full"
								clearable
								filterable
								remote
								reserve-keyword
								remote-show-suffix
								:no-match-text="'沒有符合的數據'"
								:no-data-text="'沒有可選擇的數據'"
							>
								<el-option label="單位1" value="1"></el-option>
								<el-option label="單位2" value="2"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="標準售價(含稅)/元">
							<el-input placeholder="請輸入售價" class="w-full"></el-input>
						</el-form-item>

						<el-form-item label="產品圖片">
							<el-upload action="#" drag class="upload-demo w-full" :limit="1">
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">拖曳或按下上傳，單張20MB以內</div>
							</el-upload>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<div
				class="p-4 bg-white rounded-b-md shadow text-center mt-auto border-t"
			>
				<div class="text-center mt-8">
					<el-button type="primary">送出</el-button>
				</div>
			</div>
		</div>
		<!-- 添加並管理數據 -->
		<div
			v-else-if="selectedOption === 'manage'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<el-tabs v-model="activeManage">
				<el-tab-pane name="1">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-file-image-line mr-1"></i>
							<span>產品圖卡</span>
						</span>
					</template>
					<!-- 圖卡資訊 -->
					<div class="grid grid-cols-4 gap-4">
						<div
							v-for="product in products"
							:key="product.id"
							class="bg-white border transition hover:shadow-md rounded-md"
						>
							<!-- 圖片 -->
							<div class="w-full flex justify-center items-center rounded-md">
								<img
									:src="product.image || defaultImage"
									alt="product"
									class="max-h-full max-w-full object-contain"
								/>
							</div>

							<!-- 產品資料 -->
							<div class="p-3">
								<h3 class="font-semibold text-lg mb-2 truncate">
									{{ product.name }}
								</h3>
								<ul class="text-sm space-y-3">
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-list-2-line text-primary mr-1"></i
											>產品編號
										</div>
										{{ product.code }}
									</li>
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-info-line mr-1"></i>產品屬性
										</div>
										{{ product.attribute }}
									</li>
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-info-line mr-1"></i>產品類型
										</div>
										{{ product.type }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="全部產品" name="2">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>全部產品</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>成品</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="4">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>零件</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 查看全部資料 -->
		<div
			v-else-if="selectedOption === 'view'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<el-tabs v-model="activeManage">
				<el-tab-pane name="1">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-file-image-line mr-1"></i>
							<span>產品圖卡</span>
						</span>
					</template>
					<!-- 圖卡資訊 -->
					<div class="grid grid-cols-4 gap-4">
						<div
							v-for="product in products"
							:key="product.id"
							class="bg-white border transition hover:shadow-md rounded-md"
						>
							<!-- 圖片 -->
							<div class="w-full flex justify-center items-center rounded-md">
								<img
									:src="product.image || defaultImage"
									alt="product"
									class="max-h-full max-w-full object-contain"
								/>
							</div>

							<!-- 產品資料 -->
							<div class="p-3">
								<h3 class="font-semibold text-lg mb-2 truncate">
									{{ product.name }}
								</h3>
								<ul class="text-sm space-y-3">
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-list-2-line text-primary mr-1"></i
											>產品編號
										</div>
										{{ product.code }}
									</li>
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-info-line mr-1"></i>產品屬性
										</div>
										{{ product.attribute }}
									</li>
									<li>
										<div class="text-gray-500 text-xs pb-1">
											<i class="ri-file-info-line mr-1"></i>產品類型
										</div>
										{{ product.type }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="全部產品" name="2">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>全部產品</span>
						</span>
					</template>
					<ManageTable
						:edit="false"
						:tableData="detailsData"
						:columns="detailsColumns"
					>
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>成品</span>
						</span>
					</template>
					<ManageTable
						:edit="false"
						:tableData="detailsData"
						:columns="detailsColumns"
					>
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="4">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>零件</span>
						</span>
					</template>
					<ManageTable
						:edit="false"
						:tableData="detailsData"
						:columns="detailsColumns"
					>
						<template #pdPermission="{ row }">
							<el-tag
								v-for="(permission, index) in row.pdPermission"
								:key="index"
								:type="getTagType(permission)"
								effect="dark"
								class="mr-2"
							>
								{{ permission }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 全部有限權的資料 -->
		<div
			v-else-if="selectedOption === 'restricted'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<ManageTable :tableData="detailsData" :columns="detailsColumns">
				<template #pdPermission="{ row }">
					<el-tag
						v-for="(permission, index) in row.pdPermission"
						:key="index"
						:type="getTagType(permission)"
						effect="dark"
						class="mr-2"
					>
						{{ permission }}
					</el-tag>
				</template>
			</ManageTable>
		</div>
	</main>
</template>

<script setup>
import ManageTable from '@/components/ManageTable.vue';
const selectedOption = ref('add');
const activeManage = ref('2');
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const defaultImage = 'https://placehold.co/400x200';
const products = ref([
	{
		id: 1,
		name: 'MTQ8200-HS2F',
		code: 'CP0014',
		attribute: '成品',
		type: '交換機',
		image: null,
	},
	{
		id: 2,
		name: 'MQM8790-HS2R',
		code: 'CP0013',
		attribute: '成品',
		type: '交換機',
		image: null,
	},
	{
		id: 3,
		name: 'ST1L05',
		code: 'CP0006',
		attribute: '零件',
		type: '網卡-CPU晶片',
		image: null,
	},
	{
		id: 4,
		name: 'UPS',
		code: 'CP0005',
		attribute: '零件',
		type: '交換機-電源',
		image: null,
	},
	{
		id: 5,
		name: 'Dusun Pi4',
		code: 'CP0004',
		attribute: '成品',
		type: '閘道器',
		image: null,
	},
	{
		id: 6,
		name: 'Catalyst 8300',
		code: 'CP0003',
		attribute: '成品',
		type: '路由器',
		image: null,
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
	{
		prop: 'pdPermission',
		label: '產品權限',
		minWidth: 130,
		slot: 'pdPermission',
	},
	{ prop: 'pdImage', label: '產品圖片', minWidth: 100 },
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
		costPrice: 1500,
		standardPrice: 1999,
		pdPermission: ['銷售', '採購'],
		pdImage: 'https://via.placeholder.com/150',
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
		costPrice: 8000,
		standardPrice: 9999,
		pdPermission: ['贈送'],
		pdImage: 'https://via.placeholder.com/150',
		submitter: '李四',
		submitTime: '2024-12-14 16:00',
		updateTime: '2024-12-16 09:45',
	},
]);
// 表格權限對應名稱
const getTagType = (permission) => {
	switch (permission) {
		case '銷售':
			return 'danger';
		case '採購':
			return 'warning';
		case '贈送':
			return 'success';
		default:
			return 'info';
	}
};
</script>
