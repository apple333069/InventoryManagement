<template>
	<main class="flex flex-col space-y-4">
		<el-row class="p-3 bg-white rounded-md shadow">
			<el-col :span="5">
				<!-- 下拉選單 -->
				<el-select v-model="selectedOption" placeholder="請選擇">
					<el-option label="僅新增資料" value="add"></el-option>
					<el-option
						label="添加並管理個人數據"
						value="personal_manage"
					></el-option>
					<el-option label="添加並管理數據" value="manage"></el-option>
					<el-option label="查看全部資料" value="view"></el-option>
					<el-divider />
					<el-option label="全部有限權的資料" value="restricted"></el-option>
				</el-select>
			</el-col>
		</el-row>

		<!-- 僅新增資料 -->
		<div v-if="selectedOption === 'add'">
			<div class="p-8 bg-white rounded-t-md shadow max-h-lvh overflow-y-auto">
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					客戶基本資料
				</h2>
				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-4 gap-4 p-6 font-bold"
				>
					<!-- 左側欄位 -->
					<div>
						<el-form-item label="客戶編碼" :required="false">
							<el-input
								class="xl:max-w-lg"
								disabled
								placeholder="自動生成無需填寫"
								v-model="clientNo"
							/>
						</el-form-item>

						<el-form-item label="客戶分類" :required="false">
							<el-select
								v-model="clientType"
								placeholder="請選擇"
								class="w-full"
								filterable
								remote
								reserve-keyword
								remote-show-suffix
							>
								<el-option
									v-for="item in clientTypeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
									<template #default="{ option }">
										<el-tag :type="item.type">{{ item.label }}</el-tag>
									</template>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="客戶標籤" :required="false">
							<el-select
								v-model="clientTag"
								placeholder="請選擇"
								class="w-full"
								filterable
								remote
								reserve-keyword
								remote-show-suffix
							>
								<el-option
									v-for="item in clientTagOptions"
									:label="item.label"
									:value="item.value"
									:key="item.value"
								>
									<template #default="{ option }">
										<el-tag :type="item.type">{{ item.label }}</el-tag>
									</template>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="結算期限" :required="false">
							<el-select
								v-model="settlementType"
								placeholder="請選擇"
								class="w-full"
								filterable
								remote
								reserve-keyword
								remote-show-suffix
							>
								<el-option
									v-for="item in settlementTypeOptions"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="銷售負責人" :required="true">
							<!-- 按鈕點開燈箱 -->
							<el-button
								v-if="selectedTeamMemberRadio == ''"
								plain
								@click="dialogSelectMember = true"
								class="border-dashed w-full"
							>
								<span><i class="ri-add-line px-1"></i>選擇成員</span>
							</el-button>
							<div
								v-else
								@click.prevent="dialogSelectMember = true"
								class="border-dashed border border-gray-200 text-left w-full cursor-pointer"
							>
								<el-tag size="large" type="primary" class="inline-block m-1">{{
									selectedTeamMemberRadio
								}}</el-tag>
							</div>
						</el-form-item>

						<el-form-item label="客戶地址" :required="false">
							<el-cascader
								:options="addrOption"
								clearable
								class="w-full mb-2"
								placeholder="請選擇位址"
							>
							</el-cascader>
							<el-input
								v-model="fullAddr"
								class="w-full"
								:rows="2"
								type="textarea"
								placeholder="請填寫詳細地址"
							/>
						</el-form-item>
					</div>

					<!-- 右側欄位 -->
					<div class="xl:col-start-3">
						<!--防呆警語: 此項為必填-->
						<el-form-item label="客戶名稱" :required="true">
							<el-input
								placeholder=""
								class="w-full"
								v-model="clientName"
							></el-input>
						</el-form-item>

						<el-form-item label="客戶來源" :required="false">
							<el-select
								v-model="clientSource"
								placeholder="搜尋"
								class="w-full"
								filterable
								remote
								reserve-keyword
								remote-show-suffix
							>
								<el-option
									v-for="item in clientSourceOptions"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="價格等級" :required="false">
							<el-select
								v-model="priceTier"
								placeholder="搜尋"
								class="w-full"
								filterable
								remote
								reserve-keyword
								remote-show-suffix
							>
								<el-option
									v-for="item in priceTierOptions"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="信用額度/元">
							<el-input
								placeholder=""
								class="w-full"
								v-model="creditLimit"
							></el-input>
						</el-form-item>

						<el-form-item label="銷售歸屬部門">
							<!--點按鈕開燈箱-->
							<el-button
								v-if="chosenDepartment == ''"
								plain
								class="border-dashed border-2 border-gray-500 w-full"
								@click="dialogSalesDepart = true"
							>
								<span><i class="ri-add-line px-1"></i>選擇部門</span>
							</el-button>

							<div
								v-else
								@click="dialogSalesDepart = true"
								class="border-dashed border border-gray-200 text-left w-full cursor-pointer"
							>
								<el-tag size="large" type="primary" class="inline-block m-1">{{
									chosenDepartment
								}}</el-tag>
							</div>
						</el-form-item>
					</div>
				</el-form>

				<!-- 下排 tab -->
				<div class="p-6">
					<el-tabs class="mb-4" type="border-card">
						<el-tab-pane label="財務資料">
							<FinanceInfo
								:editable="financeInfo.isEdit"
								:invoiceHeader="financeInfo.invoiceHeader"
								:invoiceTaxType="financeInfo.invoiceTaxType"
								:accountPhoneNumber="financeInfo.accountPhoneNumber"
								:accountBankName="financeInfo.accountBankName"
								:invoiceTaxNumber="financeInfo.invoiceTaxNumber"
								:valueAddedTaxRate="financeInfo.valueAddedTaxRate"
								:invoiceEmail="financeInfo.invoiceEmail"
								:accountBankNumber="financeInfo.accountBankNumber"
								:textTypeOptions="financeInfo.textTypeOptions"
								:bankOptions="financeInfo.bankOptions"
							/>
						</el-tab-pane>

						<el-tab-pane label="聯繫人資料">
							<ContactInfo
								:editable="contactInfo.isEdit"
								:name="contactInfo.name"
								:phone="contactInfo.phone"
								:title="contactInfo.title"
								:otherContactInfo="contactInfo.otherContacts"
							/>
						</el-tab-pane>

						<el-tab-pane label="跟進紀錄">
							<FollowupTable :data="followUpData" />
						</el-tab-pane>

						<el-tab-pane label="銷售訂單">
							<SalesOrder :tableData="salesData" :columns="salesColumns" />
							<SalesOrderTrack
								:tableData="salesTrackData"
								:columns="salesTrackColumns"
							/>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>

			<div
				class="pl-10 py-4 box-border border-dashed border-t-2 bg-white rounded-b-md"
			>
				<el-button type="primary" class="w-24">送出</el-button>
			</div>
		</div>

		<!-- 添加並管理個人數據 -->
		<div v-else-if="selectedOption === 'personal_manage'">
			<div class="p-4 bg-white rounded-md shadow">
				<el-tabs v-model="personalManageActiveName" class="demo-tabs">
					<el-tab-pane label="全部客戶" name="1">
						<ClientTableDialog
							:tableData="detailsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>

					<el-tab-pane label="潛在客戶" name="2">
						<ClientTableDialog
							:tableData="potentialClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
					<el-tab-pane label="成交客戶" name="3">
						<ClientTableDialog
							:tableData="completedClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
					<el-tab-pane label="戰略客戶" name="4">
						<ClientTableDialog
							:tableData="strategicClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<!-- 添加並管理數據 -->
		<div v-else-if="selectedOption === 'manage'">
			<div class="p-4 bg-white rounded-md shadow">
				<el-tabs v-model="personalManageActiveName" class="demo-tabs">
					<el-tab-pane label="全部客戶" name="1">
						<ClientTableDialog
							:tableData="detailsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>

					<el-tab-pane label="潛在客戶" name="2">
						<ClientTableDialog
							:tableData="potentialClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
					<el-tab-pane label="成交客戶" name="3">
						<ClientTableDialog
							:tableData="completedClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
					<el-tab-pane label="戰略客戶" name="4">
						<ClientTableDialog
							:tableData="strategicClientsData"
							:columns="detailsColumns"
							:financeInfo="readFinanceInfo"
							:contactInfo="readContactInfo"
							:followUpData="followUpData"
							:salesData="salesData"
							:salesColumns="salesColumns"
							:salesTrackData="salesTrackData"
							:salesTrackColumns="salesTrackColumns"
						>
							<template #clientType="{ row }">
								<el-tag
									:type="getTagType(row.clientType)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientType }}
								</el-tag>
							</template>

							<template #clientTag="{ row }">
								<el-tag
									:type="getTagType(row.clientTag)"
									effect="dark"
									class="mr-2"
								>
									{{ row.clientTag }}
								</el-tag>
							</template>
						</ClientTableDialog>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<!-- 查看全部資料 -->
		<div v-else-if="selectedOption === 'view'">
			<div class="p-4 bg-white rounded-md shadow">
				<ClientTableDialog
					:isButtonArea="false"
					:tableData="detailsData"
					:columns="detailsColumns"
					:financeInfo="readFinanceInfo"
					:contactInfo="readContactInfo"
					:followUpData="followUpData"
					:salesData="salesData"
					:salesColumns="salesColumns"
					:salesTrackData="salesTrackData"
					:salesTrackColumns="salesTrackColumns"
				>
					<template #clientType="{ row }">
						<el-tag
							:type="getTagType(row.clientType)"
							effect="dark"
							class="mr-2"
						>
							{{ row.clientType }}
						</el-tag>
					</template>

					<template #clientTag="{ row }">
						<el-tag
							:type="getTagType(row.clientTag)"
							effect="dark"
							class="mr-2"
						>
							{{ row.clientTag }}
						</el-tag>
					</template>
				</ClientTableDialog>
			</div>
		</div>

		<!-- 全部有限權的資料 -->
		<div v-else-if="selectedOption === 'restricted'">
			<div class="p-4 bg-white rounded-md shadow">
				<ClientTableDialog
					:tableData="detailsData"
					:columns="detailsColumns"
					:financeInfo="readFinanceInfo"
					:contactInfo="readContactInfo"
					:followUpData="followUpData"
					:salesData="salesData"
					:salesColumns="salesColumns"
					:salesTrackData="salesTrackData"
					:salesTrackColumns="salesTrackColumns"
				>
					<template #clientType="{ row }">
						<el-tag
							:type="getTagType(row.clientType)"
							effect="dark"
							class="mr-2"
						>
							{{ row.clientType }}
						</el-tag>
					</template>

					<template #clientTag="{ row }">
						<el-tag
							:type="getTagType(row.clientTag)"
							effect="dark"
							class="mr-2"
						>
							{{ row.clientTag }}
						</el-tag>
					</template>
				</ClientTableDialog>
			</div>
		</div>

		<!-- 燈箱-銷售負責人 -->
		<el-dialog v-model="dialogSelectMember" width="800">
			<template #header>
				<div class="flex flex-col items-start">
					<span class="text-lg font-bold text-gray-500 px-2 pt-2"
						>成員列表</span
					>
				</div>
			</template>
			<hr class="w-full border-t border-gray-300 py-2" />
			<div>
				<div class="w-full border-dashed border-2 mb-2 p-1.5 min-h-12">
					<!-- 選定的成員顯示區 -->
					<el-button
						v-if="selectedTeamMemberRadio"
						type="primary"
						text
						bg
						:icon="Close"
						@click="selectedTeamMemberRadio = ''"
						>{{ selectedTeamMemberRadio }}
					</el-button>
				</div>
				<el-tabs
					v-model="dialogSelectMemberActiveName"
					class="demo-tabs border-b-2"
				>
					<el-tab-pane label="成員" name="1">
						<div>
							<el-input
								v-model="dialogSelectMemberDept"
								style="width: 100%"
								placeholder="搜尋部門"
								class="my-2"
								clearable
							/>
							<div class="grid grid-cols-4">
								<!-- 左，部門樹狀結構 -->
								<div
									class="col-span-2 h-72 min-h-72 overflow-y-auto border-r-2"
								>
									<el-tree
										ref="treeRef"
										style="max-width: 800px"
										class="filter-tree"
										:data="departmentTree"
										default-expand-all
										:filter-node-method="filterNode"
										@node-click="handleNodeClick"
									>
										<template #default="{ node }">
											<span
												:style="{
													color:
														selectedDepartment === node.label
															? '#409EFF'
															: 'inherit',
												}"
											>
												{{ node.label }}
											</span>
										</template>
									</el-tree>
								</div>
								<!-- 右，可選成員 -->
								<div class="col-span-2 pl-4">
									<el-radio-group
										v-if="filteredMembers.length !== 0"
										v-model="selectedTeamMemberRadio"
									>
										<div class="flex flex-col justify-start">
											<el-radio
												v-for="member in filteredMembers"
												:key="member.value"
												:value="member.value"
											>
												{{ member.name }}
											</el-radio>
										</div>
									</el-radio-group>

									<div v-else class="flex items-center justify-center h-72">
										<p>沒有可選成員</p>
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>

					<el-tab-pane label="當前使用者" name="2">
						<div class="flex items-center justify-center h-72">
							<p>沒有可選成員</p>
						</div>
					</el-tab-pane>
				</el-tabs>

				<div class="dialog-footer pt-3.5 flex justify-end">
					<el-button @click="dialogSelectMember = false">取消</el-button>
					<el-button type="primary" @click="dialogSelectMember = false">
						確定
					</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- 燈箱-銷售歸屬部門 -->
		<el-dialog v-model="dialogSalesDepart" width="800">
			<template #header>
				<div class="flex flex-col items-start">
					<span class="text-lg font-bold text-gray-500 px-2 pt-2"
						>部門清單</span
					>
				</div>
			</template>
			<hr class="w-full border-t border-gray-300 py-2" />
			<div>
				<div class="w-full border-dashed border-2 mb-2 p-1.5 min-h-12">
					<!-- 選定部門的顯示區 -->
					<el-button
						v-if="chosenDepartment"
						type="primary"
						text
						bg
						:icon="Close"
						@click="chosenDepartment = ''"
						>{{ chosenDepartment }}
					</el-button>
				</div>
				<el-tabs
					v-model="dialogSalesDepartActiveName"
					class="demo-tabs border-b-2"
				>
					<el-tab-pane label="組織架構" name="1">
						<div>
							<el-input
								v-model="searchDeptOnly"
								style="width: 100%"
								placeholder="搜尋部門"
								class="my-2"
								clearable
							/>
							<div class="h-72 min-h-72 overflow-y-auto">
								<el-tree
									ref="treeDeptRef"
									style="max-width: 800px"
									class="filter-tree"
									:data="departmentTree"
									default-expand-all
									:filter-node-method="filterDeptNode"
									@node-click="handleDeptNodeClick"
								>
									<template #default="{ node }">
										<span
											:style="{
												color:
													chosenDepartment === node.label
														? '#409EFF'
														: 'inherit',
											}"
										>
											{{ node.label }}
										</span>
									</template>
								</el-tree>
							</div>
						</div>
					</el-tab-pane>

					<el-tab-pane label="當前使用者所處部門" name="2">
						<div class="flex items-center justify-center h-72"></div>
					</el-tab-pane>
				</el-tabs>

				<div class="dialog-footer pt-3.5 flex justify-end">
					<el-button @click="dialogSalesDepart = false">取消</el-button>
					<el-button type="primary" @click="dialogSalesDepart = false">
						確定
					</el-button>
				</div>
			</div>
		</el-dialog>
	</main>
</template>

<script setup>
import { ElTree } from 'element-plus';
import { Close } from '@element-plus/icons-vue';
import ContactInfo from '@/components/ContactInfo.vue';
import FinanceInfo from '@/components/FinanceInfo.vue';
import FollowupTable from '@/components/FollowupTable.vue';
import SalesOrder from '@/components/SalesOrder.vue';
import SalesOrderTrack from '@/components/SalesOrderTrack.vue';
import ClientTableDialog from '@/components/ClientTableDialog.vue';

const selectedOption = ref('add'); // add 僅新增資料、personal_manage 添加並管理個人數據、manage 添加並管理數據、view 查看全部資料、restricted 全部有限權的資料
// 客戶編碼
const clientNo = ref('');

// 客戶分類
const clientType = ref('');
const clientTypeOptions = ref([
	{
		value: '1',
		label: '潛在客戶',
		type: 'danger',
	},
	{
		value: '2',
		label: '成交客戶',
		type: 'success',
	},
	{
		value: '3',
		label: '戰略合作',
		type: 'primary',
	},
]);

// 客戶標籤
const clientTag = ref('');
const clientTagOptions = ref([
	{
		value: '1',
		label: 'KA',
		type: 'success',
	},
	{
		value: '2',
		label: 'ME',
		type: 'primary',
	},
	{
		value: '3',
		label: 'SMB',
		type: 'warning',
	},
]);

// 結算期限
const settlementType = ref('');
const settlementTypeOptions = ref([
	{
		value: '1',
		label: '月結',
	},
	{
		value: '2',
		label: '季結',
	},
	{
		value: '3',
		label: '現結',
	},
]);

// 銷售負責人燈箱
const dialogSelectMember = ref(false); // 開關
const dialogSelectMemberDept = ref(''); // 搜尋部門關鍵字
const dialogSelectMemberActiveName = ref('1'); // 切換 tab
const teamMemberDiv = ref('軟件有限公司');
const treeRef = ref(null);
const selectedDepartment = ref(''); // 選定的部門(成員列表)
const selectedTeamMemberRadio = ref(''); // 選定的成員
// 銷售負責人燈箱-各部門成員
const departments = ref([
	{
		department: '生產部',
		members: [
			{ value: '王小明', name: '王小明' },
			{ value: '張璿', name: '張璿' },
		],
	},
	{
		department: '銷售一部',
		members: [
			{ value: '張三', name: '張三' },
			{ value: '李四', name: '李四' },
			{ value: 'Adam', name: 'Adam' },
		],
	},
]);

const filteredMembers = computed(() => {
	if (
		selectedDepartment.value === teamMemberDiv.value ||
		!selectedDepartment.value
	) {
		// 如果選定的是軟件有限公司或沒有選定部門，返回所有成員
		return departments.value.flatMap((department) => department.members);
	} else {
		// 根據選定的部門過濾成員
		const department = departments.value.find(
			(dept) => dept.department === selectedDepartment.value
		);
		return department ? department.members : [];
	}
});

// 銷售負責人燈箱-部門樹狀結構
const departmentTree = ref([
	{
		id: 1,
		label: '軟件有限公司',
		children: [
			{
				id: '1-1',
				label: '生產部',
			},
			{
				id: '1-2',
				label: '銷售部',
				children: [
					{
						id: '1-2-1',
						label: '銷售一部',
					},
					{
						id: '1-2-2',
						label: '銷售二部',
					},
				],
			},
			{
				id: 4,
				label: '研發部',
			},
			{
				id: 5,
				label: '市場部',
			},
			{
				id: 6,
				label: '採購部',
			},
			{
				id: 7,
				label: '財務部',
			},
			{
				id: 8,
				label: '會計出納',
			},
			{
				id: 9,
				label: '測試部',
			},
			{
				id: 10,
				label: '行政部',
			},
		],
	},
]);

const handleNodeClick = (node, data) => {
	selectedDepartment.value = node.label;
};

// 銷售負責人燈箱-搜尋部門
const filterNode = (value, data) => {
	if (!value) return true;
	return data.label.includes(value);
};

// 客戶地址-地區
const addrOption = ref([
	{
		value: 'taiwan',
		label: '台灣',
		children: [
			{
				value: 'V',
				label: '台北市',
				children: [
					{
						value: 'V01',
						label: '松山區',
					},
					{
						value: 'V02',
						label: '信義區',
					},
					{
						value: 'V03',
						label: '大安區',
					},
					{
						value: 'V04',
						label: '中山區',
					},
					{
						value: '',
						label: '餘略...',
					},
				],
			},
			{
				value: 'A',
				label: '新北市',
				children: [
					{
						value: 'A01',
						label: '板橋區',
					},
					{
						value: 'A02',
						label: '三重區',
					},
					{
						value: '',
						label: '餘略...',
					},
				],
			},
		],
	},
	{
		value: 'abroad',
		label: '海外',
		children: [
			{
				value: 'other',
				label: '其他',
				children: [
					{
						value: 'other',
						label: '其他',
					},
				],
			},
		],
	},
]);

// 客戶地址-詳細地址
const fullAddr = ref('');

// 客戶名稱
const clientName = ref('');

// 客戶來源
const clientSource = ref('');
const clientSourceOptions = ref([
	{
		value: '1',
		label: 'Google 搜尋',
	},
	{
		value: '2',
		label: '轉介紹',
	},
	{
		value: '3',
		label: '官網註冊',
	},
	{
		value: '4',
		label: '銷售自拓',
	},
]);

// 價格等級
const priceTier = ref('');
const priceTierOptions = ref([
	{
		value: '1',
		label: '標準售價',
	},
	{
		value: '2',
		label: '一級售價',
	},
	{
		value: '3',
		label: '二級售價',
	},
]);

// 信用額度/元
const creditLimit = ref('');

// 銷售歸屬部門燈箱
const dialogSalesDepart = ref(false); // 開關
const chosenDepartment = ref(''); // 選定的部門(部門清單)
const searchDeptOnly = ref('');
const treeDeptRef = ref('');
const dialogSalesDepartActiveName = ref('1'); // 切換tab
const handleDeptNodeClick = (node, data) => {
	chosenDepartment.value = node.label;
};
const filterDeptNode = (value, data) => {
	if (!value) return true;
	return data.label.includes(value);
};

// 財務資料 tab
const financeInfo = reactive({
	isEdit: true, // true 編輯、false 讀取
	invoiceHeader: '大財富商行', // 發票抬頭
	invoiceTaxType: '紙質專票', // 稅種
	accountPhoneNumber: '02-1234567', // 開戶電話
	accountBankName: '', // 開戶銀行
	invoiceTaxNumber: '', // 發票稅號
	valueAddedTaxRate: '5%', // 增值稅稅率
	invoiceEmail: '', // 收票郵箱
	accountBankNumber: '', // 銀行帳戶
	textTypeOptions: [
		{ label: '紙質專票', value: '1' },
		{ label: '紙質普票', value: '2' },
		{ label: '電子普票', value: '3' },
		{ label: '電子專票', value: '4' },
		{ label: '全電專票', value: '5' },
		{ label: '全電普票', value: '6' },
		{ label: '無須開票', value: '7' },
	],
	bankOptions: [
		{ label: '中國銀行', value: '1' },
		{ label: '招商銀行', value: '2' },
		{ label: '建設銀行', value: '3' },
		{ label: '工商銀行', value: '4' },
	],
});

// 聯繫人資料
const contactInfo = reactive({
	isEdit: true, // true 編輯、false 讀取
	name: '聯繫人姓名',
	phone: '0988877997',
	title: '經理',
	otherContacts: [
		{
			id: Math.floor(new Date() / 1000),
			name: '王小明',
			phone: '0988877997',
			title: '經理人',
		},
		{
			id: Math.floor(new Date() / 1000),
			name: '陳蚱蜢',
			phone: '0977799779',
			title: '董事',
		},
	],
});

// 跟進紀錄
const followUpData = ref([
	{
		followupRecord: '客戶拜訪',
		followupMethod: '上門拜訪',
		followupContent: '初次溝通',
		followupPerson: '王小明',
		date: '2023-09-18 10:28',
		mark: '', // 備註欄目前空
	},
	{
		followupRecord: '客戶電聯',
		followupMethod: '電話拜訪',
		followupContent: '方案確認',
		followupPerson: '張東東',
		date: '2024-12-01 15:00',
		mark: '', // 備註欄目前空
	},
]);

// 銷售訂單-資料
const salesData = ref([
	{
		clientName: '範例:上海帆軟',
		orderName: '上海帆軟-第3份銷售訂單',
		contactName: '張三',
		priceTier: '二級售價',
		signingDate: '2023-07-22',
		salesRepresentative: '張璿',
		salesOrderAmount: '9,150.00',
		approvalStatus: '審批通過',
		productName: 'MQM8790-HS2R',
		productCode: 'CP0002',
		salesQuantity: '3',
		actualSalePrice: '1,210.00',
		totalActualSalePrice: '3,630.00',
	},
	{
		clientName: '範例:上海帆軟',
		orderName: '上海帆軟-第4份銷售訂單',
		contactName: '李四',
		priceTier: '二級售價',
		signingDate: '2024-07-22',
		salesRepresentative: '張璿',
		salesOrderAmount: '9,150.00',
		approvalStatus: '審批通過',
		productName: 'MQM8790-HS2R',
		productCode: 'CP0002',
		salesQuantity: '3',
		actualSalePrice: '1,210.00',
		totalActualSalePrice: '3,630.00',
	},
	{
		clientName: '範例:上海帆軟',
		orderName: '上海帆軟-第4份銷售訂單',
		contactName: '孟鈺',
		priceTier: '三級售價',
		signingDate: '2024-04-22',
		salesRepresentative: '張璿',
		salesOrderAmount: '9,150.00',
		approvalStatus: '審批通過',
		productName: 'MQM8790-HS2R',
		productCode: 'CP0002',
		salesQuantity: '3',
		actualSalePrice: '1,210.00',
		totalActualSalePrice: '3,630.00',
	},
]);
// 銷售訂單-欄位
const salesColumns = ref([
	{ prop: 'clientName', label: '客戶名稱', sortable: true, minWidth: 140 },
	{ prop: 'orderName', label: '銷售訂單名稱', sortable: true, minWidth: 140 },
	{
		prop: 'contactName',
		label: '客戶聯繫人姓名',
		sortable: true,
		minWidth: 150,
	},
	{ prop: 'priceTier', label: '價格等級', sortable: true, minWidth: 110 },
	{ prop: 'signingDate', label: '訂單簽訂日期', sortable: true, minWidth: 140 },
	{
		prop: 'salesRepresentative',
		label: '銷售負責人',
		sortable: true,
		minWidth: 130,
	},
	{
		prop: 'salesOrderAmount',
		label: '銷售訂單金額/元',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'approvalStatus',
		label: '審批結果',
		sortable: true,
		minWidth: 110,
		slotName: 'approvalStatus', // 使用插槽名稱來自定義顯示
	},
	{
		label: '銷售產品明細',
		children: [
			// 子欄位
			{ prop: 'productName', label: '產品名稱', minWidth: 120 },
			{ prop: 'productCode', label: '產品編碼', minWidth: 120 },
			{ prop: 'salesQuantity', label: '銷售數量', minWidth: 120 },
			{ prop: 'actualSalePrice', label: '實際售價/元', minWidth: 120 },
			{ prop: 'totalActualSalePrice', label: '實際售價合計/元', minWidth: 140 },
		],
	},
]);

// 銷售訂單執行追蹤-資料
const salesTrackData = ref([
	{
		clientName: '範例:上海帆軟',
		orderName: '上海帆軟-第3份銷售訂單',
		productName: 'Catalyst8300',
		productCode: 'CP0003',
		salesQty: '4',
		outboundQty: '4',
		unshippedReturnQty: '0',
		shippedReturnQty: '0',
		exchangeQty: '0',
		pendingOutboundQty: '0',
		blockedStockQty: '0',
		plannedOutboundQty: '0',
		pendingPlannedOutboundQty: '0',
		reconciledQty: '4',
		pendingReconciledQty: '0',
		accountReceivableAmount: '5520',
		collectionAmount: '5520',
		pendingCollectionAmount: '0',
	},
]);
// 銷售訂單執行追蹤-欄位
const salesTrackColumns = ref([
	{ prop: 'clientName', label: '客戶名稱', sortable: true, minWidth: 140 },
	{ prop: 'orderName', label: '銷售訂單名稱', sortable: true, minWidth: 140 },
	{ prop: 'productName', label: '產品名稱', sortable: true, minWidth: 150 },
	{ prop: 'productCode', label: '產品編碼', sortable: true, minWidth: 110 },
	{ prop: 'salesQty', label: '銷售數量', sortable: true, minWidth: 140 },
	{ prop: 'outboundQty', label: '出庫數量', sortable: true, minWidth: 130 },
	{
		prop: 'unshippedReturnQty',
		label: '未出庫-退貨數量',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'shippedReturnQty',
		label: '已出庫-退貨數量',
		sortable: true,
		minWidth: 160,
	},
	{ prop: 'exchangeQty', label: '換貨數量', sortable: true, minWidth: 160 },
	{
		prop: 'pendingOutboundQty',
		label: '待出庫數量',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'blockedStockQty',
		label: '庫存凍結數量',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'plannedOutboundQty',
		label: '計畫出庫數量',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'pendingPlannedOutboundQty',
		label: '待規劃出庫數量',
		sortable: true,
		minWidth: 160,
	},
	{ prop: 'reconciledQty', label: '已對帳數量', sortable: true, minWidth: 160 },
	{
		prop: 'pendingReconciledQty',
		label: '待對帳數量',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'accountReceivableAmount',
		label: '應收金額/元',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'collectionAmount',
		label: '收款金額/元',
		sortable: true,
		minWidth: 160,
	},
	{
		prop: 'pendingCollectionAmount',
		label: '待收款金額/元',
		sortable: true,
		minWidth: 160,
	},
]);

// 添加並管理個人數據內的 tab - 1全部客戶、2潛在客戶、3成交客戶、4戰略客戶
const personalManageActiveName = ref('1');

// 全部-表格數據
const detailsData = ref([
	{
		clientNo: 'KH240729-01', // 客戶編碼
		clientName: '軟件有限公司', // 客戶名稱
		clientType: '潛在客戶', // 客戶分類
		clientSource: '百度SEM', // 客戶來源
		clientTag: 'ME', // 客戶標籤
		priceTier: '一級售價', // 價格等級
		settlementType: '月結', // 結算期限
		creditLimit: '8000000', // 信用額度/元
		salesRepresentative: '張璿', // 銷售負責人
		salesDepartment: '軟件有限公司', // 銷售歸屬部門
		clientAddress: '', // 客戶地址
		invoiceHeader: '進銷存有限公司', // 發票抬頭
		invoiceTaxNumber: '123456123456', // 發票稅號
		invoiceTaxType: '電子普票', // 稅種
		valueAddedTaxRate: '13%', // 增值稅稅率%
		accountPhoneNumber: '0288877997', // 開戶電話
		invoiceEmail: '288877997@hotmail.com', // 收票郵箱
		accountBankName: '王道銀行', // 開戶銀行
		accountBankNumber: '123456789123456789', // 銀行賬戶
		contactName: '王小明', // 聯絡人姓名
		contactPhone: '09123456789', // 聯絡人手機
		contactTitle: '財務總監', // 聯絡人職位
		otherContactInfo: {
			// 其他聯絡人資料
			children: [
				{
					contactName: '', // 聯絡人姓名
					contactPhone: '', // 聯絡人手機
					contactTitle: '', // 聯絡人職位
				},
			],
		},
		submitter: '張璿', //送出人
		submitTime: '2024-07-29 16:55:30', //送出時間
		updateTime: '2024-07-29 16:55:30', //更新時間
	},
	{
		clientNo: 'KH240729-02', // 客戶編碼
		clientName: '軟件有限公司', // 客戶名稱
		clientType: '戰略客戶', // 客戶分類
		clientSource: '官網註冊', // 客戶來源
		clientTag: 'SMB', // 客戶標籤
		priceTier: '一級售價', // 價格等級
		settlementType: '月結', // 結算期限
		creditLimit: '8000000', // 信用額度/元
		salesRepresentative: '張璿', // 銷售負責人
		salesDepartment: '軟件有限公司', // 銷售歸屬部門
		clientAddress: '', // 客戶地址
		invoiceHeader: '進銷存有限公司', // 發票抬頭
		invoiceTaxNumber: '123456123456', // 發票稅號
		invoiceTaxType: '電子普票', // 稅種
		valueAddedTaxRate: '13%', // 增值稅稅率%
		accountPhoneNumber: '0288877997', // 開戶電話
		invoiceEmail: '288877997@hotmail.com', // 收票郵箱
		accountBankName: '王道銀行', // 開戶銀行
		accountBankNumber: '123456789123456789', // 銀行賬戶
		contactName: '王小明', // 聯絡人姓名
		contactPhone: '09123456789', // 聯絡人手機
		contactTitle: '財務總監', // 聯絡人職位
		otherContactInfo: {
			// 其他聯絡人資料
			children: [
				{
					contactName: '', // 聯絡人姓名
					contactPhone: '', // 聯絡人手機
					contactTitle: '', // 聯絡人職位
				},
			],
		},
		submitter: '張璿', //送出人
		submitTime: '2024-07-29 16:55:30', //送出時間
		updateTime: '2024-07-29 16:55:30', //更新時間
	},
	{
		clientNo: 'KH240729-02', // 客戶編碼
		clientName: '軟件有限公司', // 客戶名稱
		clientType: '成交客戶', // 客戶分類
		clientSource: '轉介紹', // 客戶來源
		clientTag: 'SMB', // 客戶標籤
		priceTier: '一級售價', // 價格等級
		settlementType: '現結', // 結算期限
		creditLimit: '8000000', // 信用額度/元
		salesRepresentative: '王小明', // 銷售負責人
		salesDepartment: '軟件有限公司', // 銷售歸屬部門
		clientAddress: '', // 客戶地址
		invoiceHeader: '進銷存有限公司', // 發票抬頭
		invoiceTaxNumber: '123456123456', // 發票稅號
		invoiceTaxType: '電子普票', // 稅種
		valueAddedTaxRate: '13%', // 增值稅稅率%
		accountPhoneNumber: '0288877997', // 開戶電話
		invoiceEmail: '288877997@hotmail.com', // 收票郵箱
		accountBankName: '王道銀行', // 開戶銀行
		accountBankNumber: '123456789123456789', // 銀行賬戶
		contactName: '王小明', // 聯絡人姓名
		contactPhone: '09123456789', // 聯絡人手機
		contactTitle: '財務總監', // 聯絡人職位
		otherContactInfo: {
			// 其他聯絡人資料
			children: [
				{
					contactName: '', // 聯絡人姓名
					contactPhone: '', // 聯絡人手機
					contactTitle: '', // 聯絡人職位
				},
			],
		},
		submitter: '張璿', //送出人
		submitTime: '2024-07-29 16:55:30', //送出時間
		updateTime: '2024-07-29 16:55:30', //更新時間
	},
]);

// 潛在客戶-表格數據
const potentialClientsData = computed(() => {
	return detailsData.value.filter((client) => client.clientType === '潛在客戶');
});

// 成交客戶-表格數據
const completedClientsData = computed(() => {
	return detailsData.value.filter((client) => client.clientType === '成交客戶');
});

// 戰略客戶-表格數據
const strategicClientsData = computed(() => {
	return detailsData.value.filter((client) => client.clientType === '戰略客戶');
});

// 表格欄位
const detailsColumns = ref([
	{ prop: 'clientNo', label: '客戶編碼', minWidth: 120 },
	{ prop: 'clientName', label: '客戶名稱', minWidth: 150 },
	{ prop: 'clientType', label: '客戶分類', minWidth: 100, slot: 'clientType' },
	{ prop: 'clientSource', label: '客戶來源', minWidth: 100 },
	{ prop: 'clientTag', label: '客戶標籤', minWidth: 100, slot: 'clientTag' },
	{ prop: 'priceTier', label: '價格等級', minWidth: 100 },
	{ prop: 'settlementType', label: '結算期限', minWidth: 100 },
	{ prop: 'creditLimit', label: '信用額度/元', minWidth: 150 },
	{ prop: 'salesRepresentative', label: '銷售負責人', minWidth: 150 },
	{ prop: 'salesDepartment', label: '銷售歸屬部門', minWidth: 150 },
	{ prop: 'clientAddress', label: '客戶地址', minWidth: 200 },
	{ prop: 'invoiceHeader', label: '發票抬頭', minWidth: 150 },
	{ prop: 'invoiceTaxNumber', label: '發票稅號', minWidth: 150 },
	{ prop: 'invoiceTaxType', label: '稅種', minWidth: 100 },
	{ prop: 'valueAddedTaxRate', label: '增值稅稅率%', minWidth: 150 },
	{ prop: 'accountPhoneNumber', label: '開戶電話', minWidth: 150 },
	{ prop: 'invoiceEmail', label: '收票郵箱', minWidth: 150 },
	{ prop: 'accountBankName', label: '開戶銀行', minWidth: 150 },
	{ prop: 'accountBankNumber', label: '銀行賬戶', minWidth: 150 },
	{ prop: 'contactName', label: '聯絡人姓名', minWidth: 150 },
	{ prop: 'contactPhone', label: '聯絡人手機', minWidth: 150 },
	{ prop: 'contactTitle', label: '聯絡人職位', minWidth: 150 },
	{
		prop: 'otherContactInfo',
		label: '其他聯絡人資料',
		minWidth: 150,
		children: [
			{ prop: 'contactName', label: '聯絡人姓名', minWidth: 150 },
			{ prop: 'contactPhone', label: '聯絡人手機', minWidth: 150 },
			{ prop: 'contactTitle', label: '聯絡人職位', minWidth: 150 },
		],
	},
	{ prop: 'submitter', label: '送出人', minWidth: 100 },
	{ prop: 'submitTime', label: '送出時間', minWidth: 150 },
	{ prop: 'updateTime', label: '更新時間', minWidth: 150 },
]);

// 讀財務資料
const readFinanceInfo = reactive({
	isEdit: false, // true 編輯、false 讀取
	invoiceHeader: '大財富商行', // 發票抬頭
	invoiceTaxType: '紙質專票', // 稅種
	accountPhoneNumber: '02-1234567', // 開戶電話
	accountBankName: '', // 開戶銀行
	invoiceTaxNumber: '', // 發票稅號
	valueAddedTaxRate: '5%', // 增值稅稅率
	invoiceEmail: '', // 收票郵箱
	accountBankNumber: '', // 銀行帳戶
});

// 讀聯繫人資料
const readContactInfo = reactive({
	isEdit: false, // true 編輯、false 讀取
	name: '聯繫人姓名',
	phone: '0988877997',
	title: '經理',
	otherContacts: [
		{
			id: Math.floor(new Date() / 1000),
			name: '王小明',
			phone: '0988877997',
			title: '經理人',
		},
		{
			id: Math.floor(new Date() / 1000),
			name: '陳蚱蜢',
			phone: '0977799779',
			title: '董事',
		},
	],
});

// 客戶分類、客戶標籤對應名稱
const getTagType = (type) => {
	switch (type) {
		case '潛在客戶':
			return 'danger';
		case '戰略合作':
			return 'primary';
		case '成交客戶':
			return 'success';
		case 'SMB':
			return 'warning';
		case 'ME':
			return 'primary';
		case 'KA':
			return 'success';
		default:
			return 'info';
	}
};

// 銷售負責人燈箱-監聽搜尋部門(僅新增資料)
watch(dialogSelectMemberDept, function (val) {
	treeRef.value.filter(val);
});

// 銷售歸屬部門燈箱-監聽搜尋部門(僅新增資料)
watch(searchDeptOnly, function (val) {
	treeDeptRef.value.filter(val);
});
</script>

<style lang="sass" scoped>
.el-divider
  margin: 0.5em 0
input.el-input__inner
  border-radius: 10px
  background: red
</style>
