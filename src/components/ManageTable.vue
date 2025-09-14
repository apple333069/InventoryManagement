<!-- 表格組件(可編輯) -->
<template>
	<div
		ref="fullscreenElement"
		:class="isFullscreen ? 'p-8' : ''"
		class="p-4 bg-white"
	>
		<div class="flex justify-between">
			<div v-if="edit" class="flex items-center">
				<el-button type="primary"><i class="ri-add-line"></i>新增</el-button>
				<el-button text> <i class="ri-download-2-line"></i>匯入 </el-button>
				<el-dropdown trigger="click">
					<el-button text>
						<i class="ri-upload-2-line mr-1"></i>匯出
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item disabled>篩選後的資料</el-dropdown-item>
							<el-dropdown-item>全部資料</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-dropdown trigger="click">
					<el-button text>
						<i class="ri-delete-bin-line mr-1"></i>刪除
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item disabled>篩選後的資料</el-dropdown-item>
							<el-dropdown-item>全部資料</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-dropdown trigger="click">
					<el-button text>
						<i class="ri-time-line mr-1"></i>操作記錄
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>批次修改記錄</el-dropdown-item>
							<el-dropdown-item disabled>批次列印範本記錄</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div v-if="record">
				<el-dropdown trigger="click">
					<el-button text>
						<i class="ri-time-line mr-1"></i>操作記錄
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>批次列印範本記錄</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<!-- 右上功能icon -->
			<div :class="edit ? '' : 'ml-auto'" class="ricon flex items-center">
				<!-- 搜尋 -->
				<el-input placeholder="輸入關鍵字" class="mr-5">
					<template #prefix>
						<i class="ri-search-line"></i>
					</template>
					<template #suffix>
						<!-- el-dropdown 包裹 checkbox-group -->
						<el-dropdown trigger="click">
							<i class="ri-arrow-down-s-line"></i>
							<template #dropdown>
								<el-dropdown-menu class="w-48 max-h-72 overflow-y-auto">
									<el-checkbox
										v-model="checkAll"
										:indeterminate="isIndeterminate"
										@change="handleCheckAllChange"
										class="allCheckbox pl-3"
									>
										全選
									</el-checkbox>
									<el-checkbox-group
										v-model="selectedColumns"
										@change="handleCheckedColumnsChange"
										class="flex flex-col space-y-1 pl-3 border-t"
									>
										<el-checkbox
											v-for="column in columns"
											:key="column.prop"
											:value="column.prop"
										>
											{{ column.label }}
										</el-checkbox>
									</el-checkbox-group>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-input>
				<el-tooltip content="篩選條件" placement="bottom" :hide-after="10">
					<el-button text>
						<i class="ri-filter-line"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="顯示欄位" placement="bottom" :hide-after="10">
					<el-button text>
						<i class="ri-layout-grid-line"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="排序" placement="bottom" :hide-after="10">
					<el-button text>
						<i class="ri-sort-asc"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="分組" placement="bottom" :hide-after="10">
					<el-button text>
						<i class="ri-list-indefinite"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="更新" placement="bottom" :hide-after="10">
					<el-button text>
						<i class="ri-refresh-line cursor-pointer"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip
					:content="isFullscreen ? '縮小' : '放大'"
					placement="bottom"
					:hide-after="10"
				>
					<el-button text>
						<i
							:class="
								isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'
							"
							class="cursor-pointer"
							@click="toggleFullscreen"
						>
						</i>
					</el-button>
				</el-tooltip>
			</div>
		</div>
		<el-table
			:data="tableData"
			style="width: 100%"
			:border="border"
			:header-cell-style="headerCellStyle"
			class="my-2"
			@row-click="handleRowClick"
		>
			<template #empty>
				<el-empty description="暫無資料" />
			</template>
			<!-- 全選列 -->
			<el-table-column
				type="selection"
				width="55"
				align="center"
				fixed
			></el-table-column>
			<template v-for="column in columns" :key="column.prop || column.label">
				<!-- 無子欄位的普通顯示 -->
				<el-table-column
					v-if="!column.children"
					:prop="column.prop"
					:label="column.label"
					:sortable="column.sortable || false"
					:min-width="column.minWidth"
					:fixed="column.fixed"
					:align="column.align"
					:header-align="column.headerAlign"
				>
					<!-- 針對產品圖片提供自定義顯示 -->
					<template v-if="column.prop === 'pdImage'" #default="scope">
						<img
							:src="scope.row[column.prop]"
							alt="產品圖片"
							style="width: 50px; height: auto"
						/>
					</template>
					<template v-else-if="column.slot" #default="scope">
						<slot :name="column.slot" v-bind="scope"></slot>
					</template>
				</el-table-column>

				<!-- 有子欄位時，顯示子資料 -->
				<el-table-column
					v-else
					:label="column.label"
					:header-align="column.headerAlign || 'center'"
				>
					<template
						v-for="child in column.children"
						:key="child.prop || child.label"
					>
						<el-table-column
							:prop="child.prop"
							:label="child.label"
							:sortable="child.sortable"
							:min-width="child.minWidth || null"
							:header-align="child.headerAlign || 'center'"
							:align="child.align || 'left'"
						>
							<template v-if="$slots[child.prop]" #default="scope">
								<slot :name="child.prop" v-bind="scope"></slot>
							</template>
						</el-table-column>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<el-config-provider :locale="zhTw">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 20, 50, 100]"
				:size="size"
				:disabled="disabled"
				:background="background"
				layout="total, sizes, prev, pager, next, jumper"
				:total="30"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</el-config-provider>

		<!-- Dialog 用來顯示點擊的資料 -->
		<el-dialog
			v-model="dialogVisible"
			v-model:visible="dialogVisible"
			width="40%"
			:fullscreen="isMobile"
			center
			@close="resetDialog"
		>
			<template #header>
				<div class="flex flex-col items-start mb-4">
					<span class="text-lg font-bold text-gray-500 mb-2">{{
						dialogTitle
					}}</span>
					<hr class="w-full border-t border-gray-300" />
				</div>
			</template>
			<!-- 内容 -->
			<div class="dialog-content">
				<div v-if="selectedItem">
					<div class="grid grid-cols-2 gap-5 p-2">
						<!-- 遍歷主欄位 -->
						<template v-for="column in columns" :key="column.label">
							<!-- 無子欄位 -->
							<p v-if="!column.children">
								<strong>{{ column.label }}：</strong
								>{{ selectedItem[column.prop] || '-' }}
							</p>

							<!-- 有子欄位 -->
							<div v-else class="col-span-2">
								<p>
									<strong>{{ column.label }}：</strong>
								</p>
								<el-table
									:data="[selectedItem]"
									:header-cell-style="headerCellStyle"
									border
									style="width: 100%"
								>
									<el-table-column
										v-for="child in column.children"
										:key="child.prop"
										:label="child.label"
										:prop="child.prop"
										:min-width="child.minWidth"
									>
										<template v-slot="scope">
											<span>{{ scope.row[child.prop] || '-' }}</span>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</template>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
import zhTw from '@/locale/zh-tw';

// 定義 props
const props = defineProps({
	// 可編輯
	edit: {
		type: Boolean,
		default: true,
	},
	// 操作紀錄
	record: {
		type: Boolean,
		default: false,
	},
	// 表格資料
	tableData: {
		type: Array,
		required: true,
	},
	columns: {
		type: Array,
		required: true,
	},
	border: {
		type: Boolean,
		default: true,
	},
	// 表頭顏色
	headerCellStyle: {
		type: Object,
		default: () => ({
			backgroundColor: '#f5f7f8',
			color: '#606266',
			fontWeight: 'bold',
		}),
	},
});

const isMobile = computed(() => window.innerWidth < 768)
const currentPage = ref(3);
const pageSize = ref(10);
const size = ref('default');
const background = ref(false);
const disabled = ref(false);

const fullscreenElement = ref(null);
const isFullscreen = ref(false);
const handleSizeChange = () => {
	console.log(`items per page`);
};
const handleCurrentChange = () => {
	console.log(`current page: `);
};
// 切換全螢幕
const toggleFullscreen = () => {
	if (!document.fullscreenElement) {
		fullscreenElement.value?.requestFullscreen();
		isFullscreen.value = true;
	} else {
		document.exitFullscreen();
		isFullscreen.value = false;
	}
};
// 監聽切換全螢幕 (不是點擊的走監聽)
document.addEventListener('fullscreenchange', () => {
	isFullscreen.value = !!document.fullscreenElement;
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const selectedItem = ref(null);

const openDialog = (item) => {
	dialogTitle.value = item.name;
	selectedItem.value = item;
	dialogVisible.value = true;
};

const resetDialog = () => {
	selectedItem.value = null;
};

// 行點擊事件
const handleRowClick = (row) => {
	openDialog(row);
};

// 全選相關狀態
const checkAll = ref(false);
const isIndeterminate = ref(false);
// 已選中的項目
const selectedColumns = ref([]);
// 處理全選變化
const handleCheckAllChange = (val) => {
	selectedColumns.value = val ? props.columns.map((col) => col.prop) : [];
	isIndeterminate.value = false;
};
// 處理單個多選框變化
const handleCheckedColumnsChange = (value) => {
	const checkedCount = value.length;
	checkAll.value = checkedCount === props.columns.length;
	isIndeterminate.value =
		checkedCount > 0 && checkedCount < props.columns.length;
};
</script>
<style scoped>
.el-button,
.el-button {
	padding: 8px 10px;
}
</style>
