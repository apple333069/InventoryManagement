<template>
	<main class="flex flex-col space-y-4">
		<el-row class="p-3 bg-white rounded-md shadow flex justify-end md:justify-start">
			<el-col :span="5">
				<!-- 下拉選單 -->
				<el-select v-model="selectedOption" placeholder="請選擇">
					<el-option label="僅新增資料" value="add"></el-option>
					<el-option label="添加並管理本人數據" value="selfManage"></el-option>
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
				<!-- 盤點基本資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					盤點基本資料
				</h2>
				<p class="text-sm text-gray-500">
					庫存盤點完成後，會自動記錄其他的出 / 入庫單：盤點出 / 入庫 單據！
				</p>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="盤點類型" :required="true">
						<el-select
							v-model="value1"
							placeholder="請選擇盤點類型"
							class="w-full"
							clearable
							filterable
							remote
							reserve-keyword
							remote-show-suffix
							:no-match-text="'沒有符合的數據'"
							:no-data-text="'沒有可選擇的數據'"
						>
							<el-option label="期初盤點" value="1"></el-option>
							<el-option label="存貨盤點" value="2"></el-option>
							<el-option label="期末盤點" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="盤點單編號" class="w-3/4">
						<el-input
							v-model="countID"
							disabled
							placeholder="自動生成無需填寫"
						/>
					</el-form-item>
					<el-form-item label="盤點開始日期" :required="true">
						<el-date-picker v-model="value2" type="date" style="width: 100%" />
					</el-form-item>
					<el-form-item label="盤點結束日期" :required="true">
						<el-date-picker v-model="value3" type="date" style="width: 100%" />
					</el-form-item>
					<el-form-item label="盤點員">
						<el-button class="w-full" @click="openMember = true"
							><i class="ri-add-line text-lg"></i>選擇成員</el-button
						>
					</el-form-item>
					<el-form-item label="盤點員歸屬部門">
						<el-button class="w-full" @click="openDepartment = true"
							><i class="ri-add-line text-lg"></i>選擇部門</el-button
						>
					</el-form-item>
				</el-form>

				<!-- 盤點產品資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					盤點產品資料
				</h2>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="盤點倉庫" :required="true">
						<el-select
							v-model="value4"
							placeholder="請選擇盤點倉庫"
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
						</el-select>
					</el-form-item>

					<!-- 盤點產品明細 -->
					<el-form-item
						label="盤點產品明細"
						class="xl:col-span-3"
						:required="true"
					>
						<div class="w-full">
							<!-- 表格 -->
							<el-table
								:data="tableCountData"
								:header-cell-style="{
									backgroundColor: '#f5f7f8',
									color: '#606266',
									fontWeight: 'bold',
								}"
								:cell-style="{
									color: '#9ca3af',
								}"
								:row-class-name="() => 'group'"
								border
								empty-text="暫無資料"
							>
								<!-- 操作列 -->
								<el-table-column label="" width="80" fixed>
									<template #default="scope">
										<div class="flex space-x-2 justify-center">
											<!-- 顯示編號或刪除按鈕 -->
											<span class="group-hover:hidden">{{
												scope.$index + 1
											}}</span>
											<div class="group-hover:block hidden">
												<div class="grid grid-cols-3 gap-2 items-center">
													<el-button
														class="col-span-1 col-start-2"
														type="danger"
														link
														@click="deleteRow(scope.$index)"
													>
														<i class="ri-delete-bin-line text-lg"></i>
													</el-button>
													<!--三個點點 按鈕-->
													<div class="col-span-1 mt-1">
														<el-dropdown
															trigger="click"
															placement="bottom-start"
														>
															<el-button link type="primary">
																<i class="ri-more-2-fill"></i>
															</el-button>
															<template #dropdown>
																<el-dropdown-menu>
																	<el-dropdown-item
																		>複製到下一行</el-dropdown-item
																	>
																	<el-dropdown-item
																		>複製到最後一行</el-dropdown-item
																	>
																	<el-dropdown-item
																		>向上插入行</el-dropdown-item
																	>
																	<el-dropdown-item
																		>向下插入行</el-dropdown-item
																	>
																</el-dropdown-menu>
															</template>
														</el-dropdown>
													</div>
												</div>
											</div>
										</div>
									</template>
								</el-table-column>
								<!-- 表格欄位 -->
								<el-table-column label="選擇產品" width="100" fixed>
									<template #default="">
										<el-button @click="openData = true"
											><i class="ri-database-2-line"></i
										></el-button>
									</template>
								</el-table-column>
								<el-table-column
									prop="pdName"
									label="產品名稱"
									width="100"
									fixed
								/>
								<el-table-column prop="pdCode" label="產品編碼" width="100" />
								<el-table-column prop="brand" label="品牌" width="100" />
								<el-table-column prop="model" label="規格型號" width="100" />
								<el-table-column prop="unit" label="單位" width="100" />
								<el-table-column
									prop="currentStockQty"
									label="帳面當前庫存數量"
									width="150"
								/>
								<!-- 下拉選單欄位 -->
								<el-table-column label="盤點倉位" width="150">
									<template #default="scope">
										<el-select
											v-model="scope.row.countWarehouse"
											placeholder="選擇倉位"
											class="w-full"
											filterable
											:no-match-text="'沒有符合的數據'"
											:no-data-text="'沒有可選擇的數據'"
										>
											<el-option
												v-for="item in warehouseOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value"
											/>
										</el-select>
									</template>
								</el-table-column>
								<!-- 可編輯欄位 -->
								<el-table-column label="* 本次盤點數量" width="150">
									<template #default="scope">
										<el-input
											v-model="scope.row.countQty"
											placeholder="輸入數量"
											type="number"
											class="w-full"
										/>
									</template>
								</el-table-column>
								<el-table-column
									prop="lossQty"
									label="* 盤虧數量"
									width="100"
								/>
								<el-table-column
									prop="gainQty"
									label="* 盤盈數量"
									width="100"
								/>
								<!-- 可編輯欄位 -->
								<el-table-column label="銷售單價(含稅)/元" width="150">
									<template #default="scope">
										<el-input
											v-model="scope.row.sellingPrice"
											placeholder="輸入數量"
											type="number"
											class="w-full"
										/>
									</template>
								</el-table-column>
								<!-- 可編輯欄位 -->
								<el-table-column label="成本單價/元" width="150">
									<template #default="scope">
										<el-input
											v-model="scope.row.costPrice"
											placeholder="輸入數量"
											type="number"
											class="w-full"
										/>
									</template>
								</el-table-column>
							</el-table>
							<div class="editTable mt-2">
								<el-button type="primary" text @click="addRow"
									><i class="ri-add-line text-lg pr-1"></i>新增</el-button
								>
								<el-button type="primary" text @click="openQuickEdit = true"
									><i class="ri-file-edit-line text-lg pr-1"></i
									>貼上新增</el-button
								>
							</div>
						</div>
					</el-form-item>
				</el-form>
				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 pb-6 px-2 font-bold"
				>
					<el-form-item label="盤虧產品總數">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="盤虧產品售價總額(含稅)/元">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="盤盈產品總數">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="盤盈產品售價總額(含稅)/元">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
				</el-form>
			</div>
			<div
				class="p-4 bg-white rounded-b-md shadow text-center mt-auto border-t"
			>
				<el-button type="primary">送出</el-button>
			</div>
		</div>
		<!-- 添加並管理本人數據 -->
		<div
			v-else-if="selectedOption === 'selfManage'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<el-tabs v-model="activeManage">
				<el-tab-pane name="1">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>全部倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.all"
						:columns="detailsColumns"
					>
						<template #approverStatus="{ row }">
							<el-tag :type="getStatusType(row.approverStatus)" effect="dark">
								{{ row.approverStatus }}
							</el-tag>
						</template>
						<template #processStatus="{ row }">
							<el-tag :type="getApproverStatusType(row.processStatus)">
								{{ row.processStatus }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="2">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>A倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.A"
						:columns="detailsColumns"
					>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>B倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.B"
						:columns="detailsColumns"
					>
					</ManageTable>
				</el-tab-pane>
			</el-tabs>
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
							<i class="ri-table-line mr-1"></i>
							<span>全部倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.all"
						:columns="detailsColumns"
					>
						<template #approverStatus="{ row }">
							<el-tag :type="getStatusType(row.approverStatus)" effect="dark">
								{{ row.approverStatus }}
							</el-tag>
						</template>
						<template #processStatus="{ row }">
							<el-tag :type="getApproverStatusType(row.processStatus)">
								{{ row.processStatus }}
							</el-tag>
						</template>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="2">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>A倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.A"
						:columns="detailsColumns"
					>
					</ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>B倉庫</span>
						</span>
					</template>
					<ManageTable
						:tableData="filterDetailsData.B"
						:columns="detailsColumns"
					>
					</ManageTable>
				</el-tab-pane>
			</el-tabs>
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
				<template #approverStatus="{ row }">
					<el-tag :type="getStatusType(row.approverStatus)" effect="dark">
						{{ row.approverStatus }}
					</el-tag>
				</template>
				<template #processStatus="{ row }">
					<el-tag :type="getApproverStatusType(row.processStatus)">
						{{ row.processStatus }}
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
				<template #outboundLabel="{ row }">
					<el-tag
						v-for="(label, index) in row.outboundLabel"
						:key="index"
						:type="getOutLabelType(label)"
						effect="dark"
						class="mr-2"
					>
						{{ label }}
					</el-tag>
				</template>
			</ManageTable>
		</div>
		<el-dialog v-model="openData">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">選擇資料</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 搜尋框 -->
			<div class="flex justify-between mb-2">
				<el-button type="primary"><i class="ri-add-line"></i>新增</el-button>
				<div class="flex items-center">
					<el-input v-model="searchText" placeholder="輸入關鍵字" clearable>
						<template #prefix>
							<i class="ri-search-line"></i>
						</template>
					</el-input>
					<el-tooltip content="篩選條件" placement="bottom" :hide-after="10">
						<el-button text>
							<i class="ri-filter-line"></i>
						</el-button>
					</el-tooltip>
				</div>
			</div>
			<!-- 表格 -->
			<el-table
				:data="countFilterData"
				:header-cell-style="{
					backgroundColor: '#f5f7f8',
					color: '#606266',
					fontWeight: 'bold',
				}"
				class="mb-4"
				border
				@selection-change="updateSelection"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
					fixed
				></el-table-column>
				<el-table-column
					v-for="column in countColumns"
					:key="column.prop"
					:prop="column.prop"
					:label="column.label"
					:width="column.minWidth || null"
					:align="column.align"
					:header-align="column.headerAlign"
				>
					<!-- 如果是 status 欄位，顯示標籤 -->
					<template v-if="column.prop === 'status'" #default="{ row }">
						<el-tag :type="getStatusType(row.status)">
							{{ row.status }}
						</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<div class="dialog-footer border-t pt-4">
					<el-button @click="openData = false">取消</el-button>
					<el-button type="primary" @click="confirmSelection"> 確定 </el-button>
				</div>
			</template>
		</el-dialog>
		<el-dialog v-model="openMember" width="800">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">成員列表</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 已選成員顯示 -->
			<div
				class="p-2 min-h-12 mb-2 border border-dashed border-gray-300 flex items-center"
			>
				<el-tag
					v-if="selectedMember"
					closable
					type="primary"
					@close="
						() => {
							selectedMember = null;
							selectedId = null;
						}
					"
					>{{ selectedMember.name }}</el-tag
				>
			</div>
			<!-- 搜尋框 -->
			<el-input v-model="filterMember" placeholder="輸入關鍵字" clearable>
				<template #prefix>
					<i class="ri-search-line"></i>
				</template>
			</el-input>

			<!-- tabs -->
			<el-tabs
				v-model="activeName"
				class="demo-tabs mx-2"
				@tab-click="handleClick"
			>
				<el-tab-pane label="成員" name="member">
					<div class="grid grid-cols-2">
						<!-- 左，部門樹狀結構 -->
						<div class="h-72 min-h-72 overflow-y-auto border-r-2">
							<el-tree
								ref="treeRef"
								style="max-width: 600px"
								class="filter-tree"
								:data="departmentTree"
								default-expand-all
								:highlight-current="true"
								:filter-node-method="filterNode"
								@node-click="handleMemberClick"
							/>
						</div>

						<!-- 右，可選成員 -->
						<div class="pl-4 h-72">
							<!-- 可選成員列表 -->
							<div v-if="currentMembers.length > 0">
								<el-radio-group
									class="flex flex-col"
									v-model="selectedId"
									@change="handleSelectionChange"
								>
									<div class="flex flex-col">
										<el-radio
											v-for="member in currentMembers"
											:key="member.id"
											:value="member.id"
										>
											{{ member.name }}
										</el-radio>
									</div>
								</el-radio-group>
							</div>
							<div v-else class="flex h-72 items-center justify-center">
								<p>沒有可選成員</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="當前使用者" name="current">
					<div class="flex h-72 items-center justify-center">沒有可選成員</div>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<div class="dialog-footer border-t pt-4">
					<el-button @click="openMember = false">取消</el-button>
					<el-button type="primary" @click="openMember = false">
						確定
					</el-button>
				</div>
			</template>
		</el-dialog>
		<el-dialog v-model="openDepartment" width="800">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">部門清單</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 已選成員顯示 -->
			<div
				class="p-2 min-h-12 mb-2 border border-dashed border-gray-300 flex items-center"
			>
				<el-tag
					v-if="selectedDepartment"
					closable
					type="primary"
					@close="selectedDepartment = null"
					>{{ selectedDepartment }}</el-tag
				>
			</div>
			<!-- 搜尋框 -->
			<el-input v-model="filterMember" placeholder="輸入關鍵字" clearable>
				<template #prefix>
					<i class="ri-search-line"></i>
				</template>
			</el-input>

			<!-- tabs -->
			<el-tabs
				v-model="activeName"
				class="demo-tabs mx-2"
				@tab-click="handleClick"
			>
				<el-tab-pane label="成員" name="member">
					<!-- 左，部門樹狀結構 -->
					<div class="h-72 min-h-72 overflow-y-auto">
						<el-tree
							ref="treeRef"
							class="filter-tree"
							:data="departmentTree"
							default-expand-all
							:highlight-current="true"
							:filter-node-method="filterNode"
							@node-click="handleDepartmentClick"
						/>
					</div>
				</el-tab-pane>
				<el-tab-pane label="當前使用者所處部門" name="current">
					<div class="flex h-72 items-center justify-center">沒有可選部門</div>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<div class="dialog-footer border-t pt-4">
					<el-button @click="openDepartment = false">取消</el-button>
					<el-button type="primary" @click="openDepartment = false">
						確定
					</el-button>
				</div>
			</template>
		</el-dialog>
		<el-dialog v-model="openQuickEdit" width="45%">
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">貼上新增</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 說明區塊 -->
			<ul class="list-disc pl-5 space-y-1 mb-4">
				<li>
					使用快捷鍵 ctrl + v
					可將Excel內容貼上到表格中，也可直接編輯表格內容，使用 ctrl + z
					撤銷貼上操作
				</li>
				<li>
					批次貼上時，<strong>將跳過不可編輯欄位</strong>，貼上資料將順延至下一列，請注意對應欄位順序
				</li>
				<li>當前子表單總行數不可超過200行</li>
			</ul>
			<!-- 表格 -->
			<el-table
				:data="cvData"
				:header-cell-style="{
					backgroundColor: '#f5f7f8',
					color: '#606266',
					fontWeight: 'bold',
				}"
				class="mb-4"
				border
				@paste="handleTablePaste"
				empty-text="Ctrl+v"
			>
				<el-table-column
					v-for="column in cvColumns"
					:key="column.prop"
					:prop="column.prop"
					:label="column.label"
					:width="column.minWidth || null"
					:align="column.align"
					:header-align="column.headerAlign"
				>
				</el-table-column>
			</el-table>
		</el-dialog>
	</main>
</template>

<script setup>
import ManageTable from '@/components/ManageTable.vue';
const selectedOption = ref('add');
const openData = ref(false);
const openMember = ref(false);
const openDepartment = ref(false);
const openQuickEdit = ref(false);
const searchText = ref('');
const countID = ref(''); // 盤點單編號
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
// 選中的行數據
const activeManage = ref('1');
const cvData = ref([]); // 表格數據
const dataHistory = ref([]); // 保存歷史快照
const warehouseOptions = ref([]); // 倉位選項
const activeName = ref('member');
const filterMember = ref('');
const treeRef = ref(null);
// 當前部門成員
const currentMembers = ref([]);

// 已選成員 ID 和資料
const selectedId = ref(null);
const selectedMember = ref(null);

const selectedDepartment = ref(null); // 選定的部門(部門清單)

// 處理複製貼上事件
const handleTablePaste = (event) => {
	// 獲取剪貼板中的內容
	const clipboardData = event.clipboardData;
	const pastedText = clipboardData.getData('text/plain');

	// 檢查是否空白
	if (!pastedText) return;
	// 檢查是否包含雙引號
	if (pastedText.includes('"')) {
		alert('貼上的數據格式錯誤！');
		event.preventDefault();
		return;
	}
	// 保存當前數據快照
	dataHistory.value.push([...cvData.value]);
	// 解析數據，按行分割
	const rows = pastedText.trim().split('\n');

	const newData = rows.map((row) => {
		const cells = row.split('\t'); // 以tab分割數據
		const rowData = {};
		cvColumns.value.forEach((column, index) => {
			rowData[column.prop] = cells[index] || ''; // 對應欄位
		});
		return rowData;
	});

	// 更新表格數據
	cvData.value = [...cvData.value, ...newData];
};
// 處理復原事件
const handleUndo = (event) => {
	// 檢查是否按下 Ctrl + Z
	if (event.ctrlKey && event.key === 'z') {
		if (dataHistory.value.length > 0) {
			// 復原到上一個快照
			cvData.value = dataHistory.value.pop();
		} else {
			console.log('沒有更多的歷史數據可以復原');
		}
	}
};
onMounted(() => {
	// 監聽鍵盤事件
	document.addEventListener('keydown', handleUndo); // 在組件掛載後添加事件監聽
});
// 在組件卸載時移除事件監聽
onBeforeUnmount(() => {
	document.removeEventListener('keydown', handleUndo);
});
// 表格數據
const tableCountData = reactive([
	{
		pdName: '暫無內容',
		pdCode: '暫無內容',
		brand: '暫無內容',
		model: '暫無內容',
		unit: '暫無內容',
		currentStockQty: '暫無內容',
		countWarehouse: '',
		countQty: '',
		lossQty: '暫無內容',
		gainQty: '暫無內容',
		sellingPrice: '',
		costPrice: '',
	},
]);

// 新增行
const addRow = () => {
	tableCountData.push({
		pdName: '暫無內容',
		pdCode: '暫無內容',
		brand: '暫無內容',
		model: '暫無內容',
		unit: '暫無內容',
		currentStockQty: '暫無內容',
		countWarehouse: '',
		countQty: '',
		lossQty: '暫無內容',
		gainQty: '暫無內容',
		sellingPrice: '',
		costPrice: '',
	});
};

// 刪除行
const deleteRow = (index) => {
	ElMessageBox.confirm('確定要刪除這筆資料嗎？', '提示', {
		confirmButtonText: '確定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			tableCountData.splice(index, 1);
		})
		.catch(() => {});
};

// 選擇資料表格欄位
const countColumns = ref([
	{ prop: 'pdName', label: '產品名稱', minWidth: 180 },
	{ prop: 'pdCode', label: '產品編碼', minWidth: 150 },
	{ prop: 'brand', label: '品牌' },
	{ prop: 'model', label: '規格型號', minWidth: 150 },
	{ prop: 'unit', label: '單位', minWidth: 100 },
	{
		prop: 'standardPrice',
		label: '標準銷售價格/元',
		align: 'right',
		headerAlign: 'left',
	},
]);
// 選擇資料表格數據
const countData = ref([
	{
		pdName: '手機',
		pdCode: 'A001',
		brand: '華為',
		model: 'P40 Pro',
		unit: '部',
		standardPrice: 15000,
	},
	{
		pdName: '筆記型電腦',
		pdCode: 'B001',
		brand: '蘋果',
		model: 'MacBook Pro',
		unit: '台',
		standardPrice: 40000,
	},
	{
		pdName: '智慧手錶',
		pdCode: 'C001',
		brand: 'Samsung',
		model: 'Galaxy Watch 5',
		unit: '個',
		standardPrice: 6000,
	},
]);
// 表格欄位
const detailsColumns = ref([
	{ prop: 'countType', label: '盤點類型', minWidth: 120 },
	{ prop: 'countID', label: '盤點單編號', minWidth: 150 },
	{ prop: 'countStartDate', label: '盤點開始日期', minWidth: 150 },
	{ prop: 'countEndDate', label: '盤點結束日期', minWidth: 150 },
	{ prop: 'countPerson', label: '盤點人員', minWidth: 100 },
	{ prop: 'countPersonDepartment', label: '盤點人員歸屬部門', minWidth: 150 },
	{ prop: 'countWarehouse', label: '盤點倉庫', minWidth: 100 },
	{
		prop: 'pdCountDetails',
		label: '盤點產品明細',
		headerAlign: 'left',
		children: [
			{ prop: 'pdName', label: '產品名稱', minWidth: 180 },
			{ prop: 'pdCode', label: '產品編碼', minWidth: 150 },
			{ prop: 'brand', label: '品牌', minWidth: 100 },
			{ prop: 'model', label: '規格型號', minWidth: 100 },
			{ prop: 'unit', label: '單位', minWidth: 100 },
			{
				prop: 'currentStockQty',
				label: '帳面當前庫存數量',
				minWidth: 140,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'countLocation',
				label: '盤點倉位',
				minWidth: 100,
			},
			{
				prop: 'countQty',
				label: '本次盤點數量',
				minWidth: 130,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'lossQty',
				label: '盤虧數量',
				minWidth: 130,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'pdLossTotalAmount',
				label: '盤虧產品售價合計(含稅)/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'pdLossTotalCost',
				label: '盤虧產品成本合計/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'gainQty',
				label: '盤盈數量',
				minWidth: 130,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'pdGainTotalAmount',
				label: '盤盈產品售價合計(含稅)/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'pdGainTotalCost',
				label: '盤盈產品成本合計/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'sellingPrice',
				label: '銷售單價(含稅)/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'costPrice',
				label: '成本單價/元',
				minWidth: 130,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{
		prop: 'lossTotalQty',
		label: '盤虧產品總數',
		minWidth: 110,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'lossTotalPrice',
		label: '盤虧產品售價總額(含稅)/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'lossTotalCost',
		label: '盤虧產品成本總額/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'gainTotalQty',
		label: '盤盈產品總數',
		minWidth: 110,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'gainTotalPrice',
		label: '盤盈產品售價總額(含稅)/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'gainTotalCost',
		label: '盤盈產品成本總額/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'submitter', label: '送出人', minWidth: 80 },
	{ prop: 'submitTime', label: '送出時間', minWidth: 150 },
	{ prop: 'updateTime', label: '更新時間', minWidth: 150 },
]);
// 表格數據
const detailsData = ref([
	{
		countType: '存貨盤點',
		countID: 'PD20231001',
		countStartDate: '2023-10-01',
		countEndDate: '2023-10-10',
		countPerson: '張三',
		countPersonDepartment: '生產部',
		countWarehouse: 'A倉庫',
		pdName: '產品A',
		pdCode: 'A001',
		brand: '品牌A',
		model: '型號A',
		unit: '件',
		currentStockQty: 100,
		countLocation: 'A1',
		countQty: 90,
		lossQty: 10,
		pdLossTotalAmount: 1000,
		pdLossTotalCost: 800,
		gainQty: 0,
		pdGainTotalAmount: 0,
		pdGainTotalCost: 0,
		sellingPrice: 100,
		costPrice: 80,
		lossTotalQty: 10,
		lossTotalPrice: 1000,
		lossTotalCost: 800,
		gainTotalQty: 0,
		gainTotalPrice: 0,
		gainTotalCost: 0,
		submitter: '張三',
		submitTime: '2023-10-01 09:00',
		updateTime: '2023-10-01 09:30',
	},
	{
		countType: '期初盤點',
		countID: 'PD20231005',
		countStartDate: '2023-10-05',
		countEndDate: '2023-10-15',
		countPerson: '李四',
		countPersonDepartment: '銷售部',
		countWarehouse: 'B倉庫',
		pdName: '產品B',
		pdCode: 'B001',
		brand: '品牌B',
		model: '型號B',
		unit: '件',
		currentStockQty: 200,
		countLocation: 'B1',
		countQty: 180,
		lossQty: 20,
		pdLossTotalAmount: 4000,
		pdLossTotalCost: 3200,
		gainQty: 0,
		pdGainTotalAmount: 0,
		pdGainTotalCost: 0,
		sellingPrice: 200,
		costPrice: 160,
		lossTotalQty: 20,
		lossTotalPrice: 4000,
		lossTotalCost: 3200,
		gainTotalQty: 0,
		gainTotalPrice: 0,
		gainTotalCost: 0,
		submitter: '李四',
		submitTime: '2023-10-05 10:00',
		updateTime: '2023-10-05 10:30',
	},
]);
// 過濾後的數據
const filterDetailsData = computed(() => {
	return {
		all: detailsData.value,
		A: detailsData.value.filter((item) => item.countWarehouse === 'A倉庫'),
		B: detailsData.value.filter((item) => item.countWarehouse === 'B倉庫'),
	};
});
// 快捷表格欄位
const cvColumns = ref([
	{ prop: 'countWarehouse', label: '盤點倉位' },
	{ prop: 'countQty', label: '本次盤點數量' },
	{ prop: 'sellingPrice', label: '銷售單價(含稅)/元' },
	{ prop: 'costPrice', label: '成本單價/元' },
]);
const selectedData = ref([]); // 用來保存選中的資料
const updateSelection = (selection) => {
	// 保存選中的資料
	selectedData.value = selection;
};

const confirmSelection = () => {
	// 當點擊確定時更新 tableCountData
	tableCountData.length = 0; // 清空舊數據
	selectedData.value.forEach((item) => {
		const updatedRow = {
			pdName: item.pdName || '暫無內容',
			pdCode: item.pdCode || '暫無內容',
			brand: item.brand || '暫無內容',
			model: item.model || '暫無內容',
			unit: item.unit || '暫無內容',
			currentStockQty: item.currentStockQty || '暫無內容',
			countWarehouse: item.countWarehouse || '',
			countQty: item.countQty || '',
			lossQty: item.lossQty || '暫無內容',
			gainQty: item.gainQty || '暫無內容',
			sellingPrice: item.sellingPrice || '',
			costPrice: item.costPrice || '',
		};
		tableCountData.push(updatedRow);
	});
	openData.value = false; // 關閉對話框
};
// 搜尋
const countFilterData = computed(() =>
	countData.value.filter(
		(data) =>
			!searchText.value ||
			data.name.toLowerCase().includes(searchText.value.toLowerCase())
	)
);
const handleClick = (tab, event) => {
	// console.log(tab, event);
};

const getStatusType = (status) => {
	switch (status) {
		case '審批通過':
			return 'success';
		case '待審批':
			return 'warning';
		case '已拒絕':
			return 'danger';
		default:
			return 'info';
	}
};
const getApproverStatusType = (status) => {
	switch (status) {
		case '完成':
			return 'success';
		case '進行中':
			return 'primary';
		case '已停止':
			return 'danger';
		default:
			return 'info';
	}
};
const getOutLabelType = (label) => {
	switch (label) {
		case '出庫':
			return 'success';
		case '計畫出庫':
			return 'warning';
		case '庫存凍結':
			return 'danger';
		default:
			return 'info';
	}
};
// 監聽成員列表 (僅新增資料)
watch(filterMember, function (val) {
	treeRef.value.filter(val);
});

const filterNode = (value, data) => {
	if (!value) return true;
	return data.label.includes(value);
};
// 處理部門點擊事件
const handleMemberClick = (node) => {
	currentMembers.value = loadMembersByDepartment(node.id);
	selectedId.value = null;
	selectedMember.value = null;
};
const handleDepartmentClick = (node) => {
	selectedDepartment.value = node.label;
};
// 成員列表對應部門
const loadMembersByDepartment = (departmentId) => {
	const members = {
		101: [
			{ id: '1', name: '張三' },
			{ id: '2', name: '李四' },
		],
		201: [
			{ id: '3', name: '王五' },
			{ id: '4', name: '趙六' },
		],
		202: [
			{ id: '5', name: '小明' },
			{ id: '6', name: '小紅' },
		],
	};
	return members[departmentId] || [];
};
// 部門樹狀結構
const departmentTree = ref([
	{
		id: 1,
		label: '軟件有限公司',
		children: [
			{
				id: '101',
				label: '生產部',
			},
			{
				id: '102',
				label: '銷售部',
				children: [
					{
						id: '201',
						label: '銷售一部',
					},
					{
						id: '202',
						label: '銷售二部',
					},
				],
			},
			{
				id: '103',
				label: '研發部',
			},
			{
				id: '104',
				label: '市場部',
			},
			{
				id: '105',
				label: '採購部',
			},
			{
				id: '106',
				label: '財務部',
			},
		],
	},
]);

// 處理單選成員切換
const handleSelectionChange = (id) => {
	selectedMember.value = currentMembers.value.find(
		(member) => member.id === id
	);
};
</script>
<style scoped>
::v-deep(.el-upload-dragger) {
	padding: 8px 0;
}
::v-deep(.el-dialog__footer) {
	padding-top: 0px;
}
.el-table--enable-row-transition .el-table__body td.el-table__cell {
	color: brown;
}
.editTable .el-button {
	padding: 0 10px;
}
</style>
