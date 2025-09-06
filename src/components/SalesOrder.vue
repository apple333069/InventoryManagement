<!-- 銷售訂單 table -->
<!-- 範本目前無 新增 的介面 -->
<template>
	<div class="mb-6">
		<h3 class="text-gray-600 text-sm px-4 mb-4">銷售訂單</h3>
		<div class="grid grid-cols-2 pr-5">
			<div class="col-span-1">
				<slot name="titleInfo"></slot>
			</div>
			<div class="col-span-1 flex justify-end">
				<el-button type="primary" link class="mx-2" @click="openMessage">
					<i class="ri-add-line"></i> 新增
				</el-button>
				<el-divider direction="vertical" />
				<el-tooltip
					:content="isFullscreen ? '縮小' : '放大'"
					placement="top"
					:hide-after="10"
				>
					<i
						class="cursor-pointer"
						:class="
							isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'
						"
						@click="toggleFullscreen"
					>
					</i>
				</el-tooltip>
			</div>
		</div>

		<div
			ref="fullscreenElement"
			:class="isFullscreen ? 'p-8' : ''"
			class="p-4 bg-white"
		>
			<div v-if="isFullscreen" class="flex justify-end">
				<!-- 全螢幕不顯示新增按鈕，因為全螢幕 div 會覆蓋新增訊息視窗 -->
				<el-tooltip
					:content="isFullscreen ? '縮小' : '放大'"
					placement="top"
					:hide-after="10"
				>
					<i
						class="cursor-pointer"
						:class="
							isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'
						"
						@click="toggleFullscreen"
					>
					</i>
				</el-tooltip>
			</div>

			<el-table
				:data="tableData"
				style="width: 100%"
				:max-height="370"
				class="mb-4"
				:span-method="spanMethod"
			>
				<template v-for="(column, index) in columns" :key="index">
					<!-- 無子欄位的普通顯示 -->
					<el-table-column
						v-if="!column.children"
						:prop="column.prop"
						:label="column.label"
						:width="column.minWidth"
						:sortable="column.sortable"
					>
						<!-- 如果有自定義插槽，渲染插槽內容 -->
						<template v-if="column.slotName" #[column.slotName]="scope">
							<el-tag type="primary" effect="dark">{{
								scope.row[column.prop]
							}}</el-tag>
						</template>
					</el-table-column>

					<!--有子欄位時，顯示子資料 -->
					<el-table-column v-else :label="column.label" header-align="center">
						<template
							v-for="(child, childIndex) in column.children"
							:key="childIndex"
						>
							<el-table-column
								:prop="child.prop"
								:label="child.label"
								:width="child.minWidth"
							/>
						</template>
					</el-table-column>
				</template>
			</el-table>

			<slot name="pagination"></slot>
		</div>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';

// 定義 props
const props = defineProps({
	// 表格資料
	tableData: {
		type: Array,
		required: true,
	},
	// 表格欄位
	columns: {
		type: Array,
		required: true,
	},
});

const fullscreenElement = ref(null);
const isFullscreen = ref(false);

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

// 跟進紀錄操作權限不足
const openMessage = () => {
	ElMessage({
		message: '操作權限不足',
		type: 'warning',
		showClose: true, // 出現取消按鈕
		duration: 1800, // 幾秒後自動消失
	});
};

// 跨列合併
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
	if (columnIndex >= 0 && columnIndex <= 7) {
		if (rowIndex % 2 === 0) {
			return {
				rowspan: 2,
				colspan: 1,
			};
		} else {
			return {
				rowspan: 0,
				colspan: 0,
			};
		}
	}
};
</script>
