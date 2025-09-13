<!-- 銷售訂單執行追蹤 -->
<template>
  <div class="mb-6">
    <h3 class="text-gray-600 text-sm px-4 mb-4">銷售訂單執行追蹤</h3>
    <div class="grid grid-cols-2 pr-5">
      <div>
        <slot name="titleInfo"></slot>
      </div>
      <div class="flex justify-end">
        <el-tooltip
          :content="isFullscreen ? '縮小' : '放大'"
          placement="top"
          :hide-after="10"
        >
          <i
            class="cursor-pointer"
            :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
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
      <div v-if="isFullscreen" class="flex justify-end mb-1">
        <el-tooltip
          :content="isFullscreen ? '縮小' : '放大'"
          placement="top"
          :hide-after="10"
        >
          <i
            class="cursor-pointer"
            :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
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
        border
        :header-cell-style="{
        backgroundColor: '#F5F7FA'
      }"
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
// 定義 props
const props = defineProps({
  // 表格資料
  tableData: {
    type: Array,
    required: true,
  },
  // 欄位結構
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

// // 資料
// const tableData = ref([
//   {
//     clientName: "範例:上海帆軟",
//     orderName: "上海帆軟-第3份銷售訂單",
//     productName: "Catalyst8300",
//     productCode: "CP0003",
//     salesQty: "4",
//     outboundQty: "4",
//     unshippedReturnQty: "0",
//     shippedReturnQty: "0",
//     exchangeQty: "0",
//     blockedStockQty: "0",
//     plannedOutboundQty: "0",
//     pendingPlannedOutboundQty: "0",
//     reconciledQty: "4",
//     pendingReconciledQty: "0",
//     accountReceivableAmount: "5520",
//     collectionAmount: "5520",
//     pendingCollectionAmount: "0",
//   }
// ]);
// // 欄位結構
// const columns = ref([
//   { prop: "clientName", label: "客戶名稱", sortable: true, minWidth: 110 },
//   { prop: "orderName", label: "銷售訂單名稱", sortable: true,  minWidth: 140 },
//   { prop: "productName", label: "產品名稱", sortable: true, minWidth: 150 },
//   { prop: "productCode", label: "產品編碼", sortable: true, minWidth: 110 },
//   { prop: "salesQty", label: "銷售數量", sortable: true, minWidth: 140 },
//   { prop: "outboundQty", label: "出庫數量", sortable: true, minWidth: 130 },
//   { prop: "unshippedReturnQty", label: "未出庫-退貨數量", sortable: true, minWidth: 160 },
//   { prop: "shippedReturnQty", label: "已出庫-退貨數量", sortable: true, minWidth: 160 },
//   { prop: "exchangeQty", label: "換貨數量", sortable: true, minWidth: 160 },
//   { prop: "pendingOutboundQty", label: "待出庫數量", sortable: true, minWidth: 160 },
//   { prop: "blockedStockQty", label: "庫存凍結數量", sortable: true, minWidth: 160 },
//   { prop: "plannedOutboundQty", label: "計畫出庫數量", sortable: true, minWidth: 160 },
//   { prop: "pendingPlannedOutboundQty", label: "待規劃出庫數量", sortable: true, minWidth: 160 },
//   { prop: "reconciledQty", label: "已對帳數量", sortable: true, minWidth: 160 },
//   { prop: "pendingReconciledQty", label: "待對帳數量", sortable: true, minWidth: 160 },
//   { prop: "accountReceivableAmount", label: "應收金額/元", sortable: true, minWidth: 160 },
//   { prop: "collectionAmount", label: "收款金額/元", sortable: true, minWidth: 160 },
//   { prop: "pendingCollectionAmount", label: "收款金額/元", sortable: true, minWidth: 160 },
// ]);
</script>
