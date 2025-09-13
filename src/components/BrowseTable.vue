<!-- 表格組件(僅瀏覽) -->
<template>
	<div
		ref="fullscreenElement"
		:class="isFullscreen ? 'p-8' : ''"
		class="p-4 bg-white"
	>
		<div class="flex justify-between">
			<h2 v-if="title" class="text-lg font-bold">{{ title }}</h2>
			<!-- 右上功能icon -->
			<div class="text-lg text-gray-500 space-x-3">
				<el-tooltip
					v-if="info"
					placement="bottom"
					effect="light"
					:hide-after="10"
				>
					<template #content>
						最後更新：2024-12-31 20:30 <br />
						<span class="text-green-500">當前已是最新資料</span>
					</template>
					<i class="ri-information-line text-green-500 cursor-pointer"></i>
				</el-tooltip>
				<el-tooltip content="更新" placement="bottom" :hide-after="10">
					<i class="ri-refresh-line cursor-pointer"></i>
				</el-tooltip>
				<el-tooltip
					:content="isFullscreen ? '縮小' : '放大'"
					placement="bottom"
					:hide-after="10"
				>
					<i
						:class="
							isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'
						"
						class="cursor-pointer"
						@click="toggleFullscreen"
					>
					</i>
				</el-tooltip>
			</div>
		</div>
		<el-table
			:data="tableData"
			class="my-2"
			:stripe="stripe"
			:border="border"
			:header-cell-style="headerCellStyle"
			@row-click="handleRowClick"
		>
			<template #empty>
				<el-empty description="暫無資料" />
			</template>
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
	// 標題
	title: String,
	// 即時資料
	info: {
		type: Boolean,
		default: true,
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
	stripe: {
		type: Boolean,
		default: true,
	},
	border: {
		type: Boolean,
		default: true,
	},
	// 表頭顏色
	headerCellStyle: {
		type: Object,
		default: () => ({
			backgroundColor: '#ececee',
			color: '#606266',
			fontWeight: 'bold',
		}),
	},
});
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
</script>
<style scoped>
:deep(.el-table th),
:deep(.el-table td) {
	border-color: #ffffff !important;
}
</style>
