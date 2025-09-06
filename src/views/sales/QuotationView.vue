<template>
	<main class="flex flex-col space-y-4">
		<el-row class="p-3 bg-white rounded-md shadow">
			<el-col :span="5">
				<!-- 下拉選單 -->
				<el-select v-model="selectedOption" placeholder="請選擇">
					<el-option label="發起流程" value="add"></el-option>
					<el-option label="添加並管理本人流程" value="selfManage"></el-option>
					<el-option label="添加並管理流程" value="manage"></el-option>
					<el-option label="查看全部流程" value="view"></el-option>
					<el-option label="全部有限權的資料" value="restricted"></el-option>
				</el-select>
			</el-col>
		</el-row>

		<!-- 發起流程 -->
		<div v-if="selectedOption === 'add'">
			<div
				class="p-8 bg-white rounded-t-md shadow max-h-[82vh] overflow-y-auto"
			>
				<!-- 客戶基本資料 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					客戶基本資料
				</h2>
				<p class="text-sm text-gray-500">
					報價單未作為銷售訂單的原數據，如有需求，可通過關聯數據配置
				</p>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="選擇客戶" :required="true">
						<el-button class="w-3/4" @click="openData = true"
							><i class="ri-database-2-line mr-1"></i>選擇資料</el-button
						>
					</el-form-item>
					<el-form-item label="客戶名稱">
						<el-input
							v-model="form.customerName"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="客戶編碼">
						<el-input
							v-model="form.customerID"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="報價日期" class="w-3/4">
						<el-date-picker
							v-model="quoteDate"
							type="date"
							style="width: 100%"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
						/>
					</el-form-item>
					<el-form-item label="客戶分類">
						<el-input
							v-model="form.customerType"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="價格等級">
						<el-input
							v-model="form.priceLevel"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="客戶聯繫人姓名">
						<el-input
							v-model="form.contactName"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="客戶聯繫人手機">
						<el-input
							v-model="form.contactPhone"
							disabled
							placeholder="暫無內容"
						/>
					</el-form-item>
					<el-form-item label="報價單編號" class="w-3/4">
						<el-input
							v-model="form.quoteID"
							disabled
							placeholder="自動生成無需填寫"
						/>
					</el-form-item>
					<el-form-item label="銷售負責人">
						<el-button class="w-full" @click="openMember = true"
							><i class="ri-add-line text-lg"></i>選擇成員</el-button
						>
					</el-form-item>
					<el-form-item label="銷售歸屬部門">
						<el-button class="w-full" @click="openDepartment = true"
							><i class="ri-add-line text-lg"></i>選擇部門</el-button
						>
					</el-form-item>		
					
				</el-form>

				<!-- 報價單明細 -->
				<h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">
					報價單明細
				</h2>
				<p class="text-sm text-gray-500">
					請選擇需要報價的產品，並在選擇完畢後填寫銷售數量！銷售單價默認連動上方價格等級價格！
				</p>
				<p class="text-sm text-primary">
					毛利率低於35%，不允許通過！
				</p>

				<el-form
					label-position="top"
					class="grid grid-cols-1 xl:grid-cols-3 gap-x-16 py-7 px-2 font-bold"
				>
					<el-form-item label="出貨倉庫" :required="true">
						<el-select
							v-model="value2"
							placeholder="請選擇出貨倉庫"
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
					<el-form-item label="產品需求明細" class="xl:col-span-3" :required="true">
						<div class="w-full">
							<!-- 表格 -->
							<el-table
								:data="tableReturnData"
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
									prop="availableStockQty"
									label="當前可用庫存數量"
									width="150"
								/>
								<!-- 可編輯欄位 -->
								<el-table-column label="銷售數量" width="150">
									<template #default="scope">
										<el-input
											v-model="scope.row.saleQty"
											placeholder="輸入數量"
											type="number"
											class="w-full"
										/>
									</template>
								</el-table-column>
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
								<el-table-column
									prop="vatRate"
									label="增值稅稅率 %"
									width="150"
								/>
								<el-table-column
									prop="sellingPriceExTax"
									label="銷售單價(不含稅)/元"
									width="150"
								/>
								<el-table-column
									prop="pdOriginalPrice"
									label="產品原價合計(含稅)/元"
									width="150"
								/>
								<el-table-column
									prop="actualPrice"
									label="實際售價(含稅)/元"
									width="150"
								/>
								<el-table-column
									prop="pdTotalAmount"
									label="產品售價合計(含稅)/元"
									width="150"
								/>
								<el-table-column
									prop="actualPriceExclTax"
									label="實際售價(不含稅)/元"
									width="150"
								/>
								<el-table-column
									prop="pdTotalAmountExclTax"
									label="產品售價合計(不含稅)/元"
									width="150"
								/>
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
					<el-form-item label="銷售原價總額(含稅)/元">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="優惠金額/元">
						<p class="text-xs text-gray-400 pb-1">優惠金額默認按金額比例，均攤到各產品</p>
						<el-input />
					</el-form-item>
					<el-form-item label="整單折扣率 %" :required="true">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="銷售訂單金額(含稅)/元">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="金額大寫">
						<el-input disabled placeholder="暫無內容" />
					</el-form-item>
					<el-form-item label="報價毛利率 %" :required="true">
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
		<!-- 添加並管理本人流程 -->
		<div
			v-else-if="selectedOption === 'selfManage'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<el-tabs v-model="activeManage">
				<el-tab-pane name="1">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>全部報價</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
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
							<span>待審批報價</span>
						</span>
					</template>
					<ManageTable :tableData="[]" :columns="detailsColumns"> </ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>已審批報價</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
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
				<el-tab-pane name="4">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>不通過報價</span>
						</span>
					</template>
					<ManageTable :tableData="[]" :columns="detailsColumns"> </ManageTable>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 添加並管理流程 -->
		<div
			v-else-if="selectedOption === 'manage'"
			class="p-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto"
		>
			<el-tabs v-model="activeManage">
				<el-tab-pane name="1">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>全部報價</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
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
							<span>待審批報價</span>
						</span>
					</template>
					<ManageTable :tableData="[]" :columns="detailsColumns"> </ManageTable>
				</el-tab-pane>
				<el-tab-pane name="3">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>已審批報價</span>
						</span>
					</template>
					<ManageTable :tableData="detailsData" :columns="detailsColumns">
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
				<el-tab-pane name="4">
					<template #label>
						<span class="custom-tabs-label">
							<i class="ri-table-line mr-1"></i>
							<span>不通過報價</span>
						</span>
					</template>
					<ManageTable :tableData="[]" :columns="detailsColumns"> </ManageTable>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 查看全部流程 -->
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
				:data="dispatchFilterData"
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
						<el-radio :label="scope.row.orderID" v-model="selectedRow"
							>&nbsp;</el-radio
						>
					</template>
				</el-table-column>
				<el-table-column
					v-for="column in quoteColumns"
					:key="column.prop"
					:prop="column.prop"
					:label="column.label"
					:width="column.minWidth || null"
					:align="column.align"
					:header-align="column.headerAlign"
				>
					<!-- 如果該列有子列，則渲染子列 -->
					<template v-if="column.children">
						<el-table-column
							v-for="child in column.children"
							:key="child.prop"
							:prop="child.prop"
							:label="child.label"
							:min-width="child.minWidth"
							:align="child.align"
							:header-align="child.headerAlign"
						>
							<template #default="{ row }">
								<div v-for="(product, index) in row.products" :key="index">
									<!-- 顯示產品的相關欄位 -->
									<div>{{ product[child.prop] }}</div>
								</div>
							</template>
						</el-table-column>
					</template>

					<!-- 如果是 status 欄位，顯示標籤 -->
					<template v-if="column.prop === 'status'" #default="{ row }">
						<el-tag :type="getStatusType(row.status)">
							{{ row.status }}
						</el-tag>
					</template>
				</el-table-column>
			</el-table>
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
const activeManage = ref('1');
const searchText = ref('');
const value1 = ref('');
const value2 = ref('');
const quoteDate = ref('');
// 選中的行數據
const selectedRow = ref(null);
// 貼上新增快捷鍵
const openQuickEdit = ref(false);
const cvData = ref([]); // 表格數據
const dataHistory = ref([]); // 保存歷史快照
// 選擇成員/部門
const openMember = ref(false);
const openDepartment = ref(false);
const activeName = ref('member');
const filterMember = ref('');
const treeRef = ref(null);
const currentMembers = ref([]); // 當前部門成員
const selectedId = ref(null); // 已選成員 ID
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
	const now = new Date();
	quoteDate.value = `${now.getFullYear()}-${String(
		now.getMonth() + 1
	).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
});
// 在組件卸載時移除事件監聽
onBeforeUnmount(() => {
	document.removeEventListener('keydown', handleUndo);
});
// 表格數據
const tableReturnData = reactive([
	{
		pdName: '暫無內容',
		pdCode: '暫無內容',
		brand: '暫無內容',
		model: '暫無內容',
		unit: '暫無內容',
		availableStockQty: '暫無內容',
		saleQty: '',
		sellingPrice: '',
		vatRate: '暫無內容',
		sellingPriceExTax: '暫無內容',
		pdOriginalPrice: '暫無內容',
		actualPrice: '暫無內容',
		pdTotalAmount: '暫無內容',
		actualPriceExclTax: '暫無內容',
		pdTotalAmountExclTax: '暫無內容',
	},
]);

// 新增行
const addRow = () => {
	tableReturnData.push({
		pdName: '暫無內容',
		pdCode: '暫無內容',
		brand: '暫無內容',
		model: '暫無內容',
		unit: '暫無內容',
		availableStockQty: '暫無內容',
		saleQty: '',
		sellingPrice: '',
		vatRate: '暫無內容',
		sellingPriceExTax: '暫無內容',
		pdOriginalPrice: '暫無內容',
		actualPrice: '暫無內容',
		pdTotalAmount: '暫無內容',
		actualPriceExclTax: '暫無內容',
		pdTotalAmountExclTax: '暫無內容',	
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
			tableReturnData.splice(index, 1);
		})
		.catch(() => {});
};

const form = ref({
	customerName: '',
	customerID: '',
	quoteDate: '',
	customerType: '',
	priceLevel: '',
	contactName: '',
	contactPhone: '',
	quoteID: '',
});
// 選擇資料表格欄位
const quoteColumns = ref([
	{ prop: 'customerName', label: '客戶名稱', minWidth: 100 },
	{ prop: 'customerID', label: '客戶編碼', minWidth: 100 },
	{ prop: 'orderDate', label: '訂單簽訂日期', minWidth: 120 },
	{ prop: 'totalAmount', label: '訂單金額合計/元', minWidth: 130 },
	{ prop: 'status', label: '審批結果', minWidth: 150 },
	{ prop: 'salesPerson', label: '銷售負責人', minWidth: 100 },
	{
		prop: 'products',
		label: '產品明細',
		headerAlign: 'center',
		children: [
			{ prop: 'pdName', label: '產品名稱', minWidth: 180 },
			{ prop: 'pdCode', label: '產品編碼', minWidth: 150 },
			{ prop: 'brand', label: '品牌', minWidth: 100 },
			{ prop: 'model', label: '規格型號', minWidth: 150 },
			{ prop: 'unit', label: '單位', minWidth: 100 },
			{
				prop: 'unitPrice',
				label: '銷售價格/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalPrice',
				label: '採購單價/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'vatRate',
				label: '增值稅稅率%',
				minWidth: 120,
				align: 'right',
				headerAlign: 'left',
			},
			{ prop: 'count', label: '數量', align: 'right', headerAlign: 'left' },
			{
				prop: 'totalPrice',
				label: '產品價格合計/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalCost',
				label: '產品成本合計/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
]);
// 選擇資料表格數據
const returnData = ref([
	{
		customerID: 'KH230424-01',
		customerName: '王小明',
		orderDate: '2024/01/15',
		totalAmount: 50000,
		status: '審批通過',
		salesPerson: '張大華',
		products: [
			{
				pdCode: 'A001',
				pdName: '手機',
				brand: '華為',
				model: 'P40 Pro',
				unit: '部',
				unitPrice: 15000,
				totalPrice: 15000,
				vatRate: 5,
				count: 3,
				totalCost: 42000,
			},
			{
				pdCode: 'A002',
				pdName: '耳機',
				brand: 'Sony',
				model: 'WH-1000XM5',
				unit: '副',
				unitPrice: 6000,
				totalPrice: 6000,
				vatRate: 5,
				count: 2,
				totalCost: 11000,
			},
		],
	},
	{
		customerID: 'KH230424-02',
		customerName: '李小華',
		orderDate: '2024/02/20',
		totalAmount: 80000,
		status: '待審批',
		salesPerson: '王美玲',
		products: [
			{
				pdCode: 'B001',
				pdName: '筆記型電腦',
				brand: '蘋果',
				model: 'MacBook Pro',
				unit: '台',
				unitPrice: 40000,
				totalPrice: 40000,
				vatRate: 5,
				count: 2,
				totalCost: 75000,
			},
		],
	},
	{
		customerID: 'KH230424-03',
		customerName: '蔡中興',
		orderDate: '2024/03/10',
		totalAmount: 12000,
		status: '已拒絕',
		salesPerson: '林建明',
		products: [
			{
				pdCode: 'C001',
				pdName: '智慧手錶',
				brand: 'Samsung',
				model: 'Galaxy Watch 5',
				unit: '個',
				unitPrice: 6000,
				totalPrice: 6000,
				vatRate: 5,
				count: 2,
				totalCost: 10000,
			},
		],
	},
]);
// 表格欄位
const detailsColumns = ref([
	{ prop: 'orderName', label: '銷售訂單名稱', minWidth: 120 },
	{ prop: 'orderID', label: '銷售訂單編號', minWidth: 120 },
	{ prop: 'customerName', label: '客戶名稱', minWidth: 120 },
	{ prop: 'customerID', label: '客戶編碼', minWidth: 120 },
	{ prop: 'contactName', label: '客戶聯繫人姓名', minWidth: 130 },
	{ prop: 'contactPhone', label: '客戶聯繫人手機', minWidth: 130 },
	{ prop: 'salesPerson', label: '銷售負責人', minWidth: 120 },
	{ prop: 'salesDepartment', label: '銷售歸屬部門', minWidth: 120 },
	{ prop: 'quoteDate', label: '報價申請日期', minWidth: 130 },
	{ prop: 'salesReturnID', label: '銷售報價單編號', minWidth: 130 },
	{ prop: 'returnReason', label: '報價原因', minWidth: 100 },
	{ prop: 'returnWarehouse', label: '報價倉庫', minWidth: 100 },
	{
		prop: 'pdReturnDetails',
		label: '報價產品明細',
		headerAlign: 'left',
		children: [
			{ prop: 'pdName', label: '產品名稱', minWidth: 180 },
			{ prop: 'pdCode', label: '產品編碼', minWidth: 150 },
			{ prop: 'brand', label: '品牌', minWidth: 100 },
			{ prop: 'model', label: '規格型號', minWidth: 100 },
			{ prop: 'unit', label: '單位', minWidth: 100 },
			{
				prop: 'saleQty',
				label: '銷售數量',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'outStockQty',
				label: '已出庫-可退換數量',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'outReturnQty',
				label: '已出庫-報價數量',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'storageLocation',
				label: '入庫倉位',
				minWidth: 100,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'outReturnValid',
				label: '已出庫-報價校驗',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'notOutStockQty',
				label: '未出庫-可報價數量',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'notOutReturnQty',
				label: '未出庫-報價數量',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'notOutReturnValid',
				label: '未出庫-報價校驗',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalReturnQty',
				label: '本次報價總數',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'actualPrice',
				label: '實際售價(含稅)/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'outStockTotalPrice',
				label: '已出庫-產品售價總價(含稅)/元',
				minWidth: 200,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'pdTotalAmount',
				label: '產品售價合計(含稅)/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'costPrice',
				label: '成本單價/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'outTotalCost',
				label: '已出庫-產品成本合計/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'totalCost',
				label: '產品成本合計/元',
				minWidth: 150,
				align: 'right',
				headerAlign: 'left',
			},
			{
				prop: 'actualPriceExclTax',
				label: '實際售價(不含稅)/元',
				minWidth: 180,
				align: 'right',
				headerAlign: 'left',
			},
		],
	},
	{ prop: 'outReturnTotalQty', label: '已出庫-報價產品總數', minWidth: 100 },
	{
		prop: 'outReturnTotalPrice',
		label: '已出庫-報價產品售價總額(含稅)/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'outReturnTotalCost',
		label: '已出庫-報價產品成本總額/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'returnTotalQty',
		label: '報價產品總數',
		minWidth: 110,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'returnTotalPrice',
		label: '報價產品售價總額(含稅)/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{
		prop: 'returnTotalCost',
		label: '報價產品成本總額/元',
		minWidth: 180,
		align: 'right',
		headerAlign: 'left',
	},
	{ prop: 'handler', label: '經辦人員', minWidth: 100 },
	{ prop: 'handlerDepartment', label: '經辦人員歸屬部門', minWidth: 100 },
	{
		prop: 'approverStatus',
		label: '審批結果',
		minWidth: 100,
		slot: 'approverStatus',
	},
	{ prop: 'approver', label: '審批人員', minWidth: 100 },
	{ prop: 'approverDepartment', label: '審批人員歸屬部門', minWidth: 100 },
	{ prop: 'approvalTime', label: '審批時間', minWidth: 150 },
	{ prop: 'rejectionReason', label: '不通過原因', minWidth: 100 },
	{ prop: 'inspectionResult', label: '報價產品收穫檢驗', minWidth: 100 },
	{ prop: 'warehouseStaff', label: '入庫人員', minWidth: 100 },
	{ prop: 'warehouseDepartment', label: '倉管歸屬部門', minWidth: 120 },
	{ prop: 'inspectionTime', label: '檢驗時間', minWidth: 150 },
	{ prop: 'refusalReason', label: '拒收原因', minWidth: 100 },
	{ prop: 'submitter', label: '送出人', minWidth: 80 },
	{ prop: 'submitTime', label: '送出時間', minWidth: 150 },
	{ prop: 'updateTime', label: '更新時間', minWidth: 150 },
	{
		prop: 'processStatus',
		label: '流程狀態',
		minWidth: 100,
		slot: 'processStatus',
	},
	{ prop: 'currentNode', label: '當前節點', minWidth: 100 },
	{ prop: 'currentResponsible', label: '當前負責人', minWidth: 80 },
]);
// 表格數據
const detailsData = ref([
	{
		orderName: '訂單1',
		orderID: 'ORD123456',
		customerName: '王小明',
		customerID: 'KH230420-01',
		contactName: '王小明',
		contactPhone: '0912345678',
		salesPerson: '張大華',
		salesDepartment: '北區銷售部',
		quoteDate: '2024/01/15',
		salesReturnID: 'TXS230918-01',
		returnReason: '產品損壞',
		returnWarehouse: '北區倉庫',
		pdName: '手機',
		pdCode: 'A001',
		brand: '華為',
		model: 'P40 Pro',
		unit: '部',
		saleQty: 3,
		outStockQty: 2,
		outReturnQty: 1,
		storageLocation: 'A1',
		outReturnValid: 0,
		notOutStockQty: 1,
		notOutReturnQty: 0,
		notOutReturnValid: 0,
		totalReturnQty: 1,
		actualPrice: 15000,
		outStockTotalPrice: 30000,
		pdTotalAmount: 45000,
		costPrice: 12000,
		outTotalCost: 24000,
		totalCost: 36000,
		actualPriceExclTax: 14286,
		outReturnTotalQty: 1,
		outReturnTotalPrice: 15000,
		outReturnTotalCost: 12000,
		returnTotalQty: 1,
		returnTotalPrice: 15000,
		returnTotalCost: 12000,
		handler: '李四',
		handlerDepartment: '北區銷售部',
		approverStatus: '審批通過',
		approver: '王五',
		approverDepartment: '北區銷售部',
		approvalTime: '2024/01/16',
		rejectionReason: '',
		inspectionResult: '合格',
		warehouseStaff: '趙六',
		warehouseDepartment: '北區倉庫',
		inspectionTime: '2024/01/17',
		refusalReason: '',
		submitter: '李四',
		submitTime: '2024/01/15',
		updateTime: '2024/01/18',
		processStatus: '完成',
		currentNode: '結束',
		currentResponsible: '無',
	},
	{
		orderName: '訂單2',
		orderID: 'ORD123457',
		customerName: '李小華',
		customerID: 'KH230424-02',
		contactName: '張小華',
		contactPhone: '0923456789',
		salesPerson: '陳美芳',
		salesDepartment: '南區銷售部',
		quoteDate: '2024/01/15',
		salesReturnID: 'TXS230918-02',
		returnReason: '品質問題',
		returnWarehouse: '南區倉庫',
		pdName: '筆記型電腦',
		pdCode: 'B001',
		brand: '蘋果',
		model: 'MacBook Pro',
		unit: '台',
		saleQty: 2,
		outStockQty: 1,
		outReturnQty: 1,
		storageLocation: 'B1',
		outReturnValid: 0,
		notOutStockQty: 1,
		notOutReturnQty: 0,
		notOutReturnValid: 0,
		totalReturnQty: 1,
		actualPrice: 40000,
		outStockTotalPrice: 40000,
		pdTotalAmount: 80000,
		costPrice: 35000,
		outTotalCost: 35000,
		totalCost: 70000,
		actualPriceExclTax: 38095,
		outReturnTotalQty: 1,
		outReturnTotalPrice: 40000,
		outReturnTotalCost: 35000,
		returnTotalQty: 1,
		returnTotalPrice: 40000,
		returnTotalCost: 35000,
		handler: '王六',
		handlerDepartment: '南區銷售部',
		approverStatus: '待審批',
		approver: '李七',
		approverDepartment: '南區銷售部',
		approvalTime: '',
		rejectionReason: '',
		inspectionResult: '',
		warehouseStaff: '趙八',
		warehouseDepartment: '南區倉庫',
		inspectionTime: '',
		refusalReason: '',
		submitter: '王六',
		submitTime: '2024/01/15',
		updateTime: '2024/01/18',
		processStatus: '進行中',
		currentNode: '審批',
		currentResponsible: '李七',
	},
]);
// 快捷表格欄位
const cvColumns = ref([
	{ prop: 'outReturnQty', label: '已出庫-報價數量' },
	{ prop: 'notOutReturnQty', label: '未出庫-報價數量' },
]);
// 確認選擇
const confirmSelection = (row) => {
	// 將選中的資料帶入到 form 中
	form.value = { ...row };
	openData.value = false;
};
// 搜尋
const dispatchFilterData = computed(() =>
	returnData.value.filter(
		(data) =>
			!searchText.value ||
			data.name.toLowerCase().includes(searchText.value.toLowerCase())
	)
);

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
// 選擇成員/部門 相關function
const handleClick = (tab, event) => {
	// console.log(tab, event);
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
.el-table--enable-row-transition .el-table__body td.el-table__cell {
	color: brown;
}
.editTable .el-button {
	padding: 0 10px;
}
</style>
