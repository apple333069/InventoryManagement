<template>
  <!-- 主內容 -->
  <main class="flex-1 p-6">
    
    <HeaderBar title="銷售訂單看板" />

    <section class="mt-6">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 銷售訂單統計 -->
        <el-tab-pane label="銷售訂單統計" name="1">
          <!-- 數據區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-5 gap-6 pb-8">
            <div class="col-span-2 grid grid-cols-2 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsA"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-2 p-4 text-center bg-white border transition hover:shadow-md hover:bg-blue-50 flex flex-col justify-evenly">
                <div class="font-semibold text-gray-600 pb-2">銷售總金額</div>
                <div class="text-2xl font-bold text-blue-600">56,000元</div>
              </div>
            </div>
            <!-- 右側圖表 -->
            <div class="col-span-3">
              <div>
                <LineChart
                  title="銷售金額趨勢"
                  :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
                  :seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
                />
              </div>
            </div>
          </div>
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-5 gap-4 pb-8">
            <ButtonCard 
              :title="'審批結果'"
              :buttons="[
                { label: '通過', type: 'primary' },
                { label: '不通過' }
              ]"
            />
            <DropdownCard
              title="客戶名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇客戶名稱"
              @command="handleCommand"
            />
            <DropdownCard
              title="銷售負責人"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇銷售負責人"
              @command="handleCommand"
            />
            <DatePickerCard
              :title="'訂單簽訂日期'"
              :options="conditions"
              :selected-condition="selectedCondition"
              dropdown-placeholder="選擇範圍"
              v-model:selected-value="date"
              class="col-span-2"
            />
          </div>
          <!-- 下排表格 -->
          <BrowseTable
            title="銷售金額趨勢"
            :tableData="orderDataA"
            :columns="columnsA"
          >
            <template #status="{ row }">
              <el-tag :type="getTagType(row.status)" effect="dark" round>
                {{ row.status }}
              </el-tag>
            </template>
          </BrowseTable>
          <!-- <h2 class="text-lg font-bold">銷售金額趨勢</h2>
          <el-table 
            :data="orderDataA" 
            class="mt-2"
            height="350"
            stripe 
            border 
            :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#606266', fontWeight: 'bold' }"
          >
            <el-table-column fixed prop="customer" sortable label="客戶名稱" min-width="150" />
            <el-table-column fixed prop="name" sortable label="銷售訂單名稱" min-width="150" />
            <el-table-column prop="amount" sortable label="銷售訂單金額" min-width="150" header-align="left" align="right" />
            <el-table-column prop="signDate" sortable label="訂單簽訂日期" min-width="140" />
            <el-table-column prop="deliveryDate" sortable label="訂單交付日期" min-width="140" />
            <el-table-column prop="status" sortable label="審批結果" min-width="130">
              <template #default="{ row }">
                <el-tag 
                  :type="getTagType(row.status)" 
                  effect="dark"
                >
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="salesperson" sortable label="銷售負責人" min-width="130" />
            <el-table-column label="產品明細" header-align="center">
              <el-table-column prop="productName" label="產品名稱" min-width="180" />
              <el-table-column prop="productCode" label="產品編碼" min-width="150" />
              <el-table-column prop="quantity" label="銷售數量" min-width="100" />
              <el-table-column prop="unitPrice" label="實際售價/元" min-width="150" header-align="left" align="right" />
              <el-table-column prop="totalPrice" label="實際售價合計/元" min-width="180" header-align="left" align="right" />
            </el-table-column>
            <el-table-column label="送貨計畫" header-align="center">
              <el-table-column prop="deliveryBatch" label="送貨批次" min-width="130" />
              <el-table-column prop="plannedDeliveryDate" label="計畫送貨日期" min-width="140" />
              <el-table-column prop="deliveryRemarks" label="計畫送貨內容備註" min-width="180" />
            </el-table-column>
          </el-table> -->
        </el-tab-pane>
        <!-- 銷售訂單 - 出庫 - 退換貨 - 對帳執行統計 -->
        <el-tab-pane label="銷售訂單 - 出庫 - 退換貨 - 對帳執行統計" name="2">
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
            <div class="col-span-2 xl:col-span-1">
              <ButtonCard 
                :title="'審批結果'"
                :buttons="buttons"
              />
            </div>
            <DropdownCard
              title="客戶名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇客戶名稱"
              @command="handleCommand"
            />
            <DropdownCard
              title="銷售訂單名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇銷售訂單名稱"
              @command="handleCommand"
            />
          </div>
          <!-- 下排表格 -->
          <BrowseTable
            title="銷售訂單 - 出庫 - 退換貨 - 對帳執行統計"
            :tableData="orderDataB"
            :columns="columnsB"
          >
            <template #status="{ row }">
              <el-tag :type="getTagType(row.status)" effect="dark" round>
                {{ row.status }}
              </el-tag>
            </template>
          </BrowseTable>
        </el-tab-pane>
      </el-tabs>
    </section>
  </main>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import LineChart from "@/components/LineChart.vue";
import BrowseTable from "@/components/BrowseTable.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import StatisticCard from "@/components/StatisticCard.vue";
import DropdownCard from "@/components/DropdownCard.vue";
import DatePickerCard from "@/components/DatePickerCard.vue";
import { getTagType } from "@/composables/useStatusTag";

const activeTab = ref("1");
const date = ref([]);

const statisticsA = ref([
  { title: "簽單客戶數", value: "1家" },
  { title: "銷售訂單簽訂數量", value: "1份" },
]);
const buttons = ref([
  { label: '待出庫' },
  { label: '待對帳' },
  { label: '待收款' },
  { label: '已收款' }
]);
const columnsA = ref([
  { prop: "customer", label: "客戶名稱", minWidth: 150, sortable: true, fixed: true },
  { prop: "name", label: "銷售訂單名稱", minWidth: 150, sortable: true, fixed: true },
  { prop: "amount", label: "銷售訂單金額/元", minWidth: 155, sortable: true, align: "right", headerAlign: "left" },
  { prop: "signDate", label: "訂單簽訂日期", minWidth: 140, sortable: true },
  { prop: "deliveryDate", label: "訂單交付日期", minWidth: 140, sortable: true },
  {
    prop: "status",
    label: "審批結果",
    minWidth: 130,
    sortable: true,
    slot: "status", // 使用插槽渲染
  },
  { prop: "salesperson", label: "銷售負責人", minWidth: 130, sortable: true },
  {
    label: "產品明細",
    headerAlign: "center",
    children: [
      { prop: "productName", label: "產品名稱", minWidth: 180 },
      { prop: "productCode", label: "產品編碼", minWidth: 150 },
      { prop: "quantity", label: "銷售數量", minWidth: 100 },
      { prop: "unitPrice", label: "實際售價/元", minWidth: 150, align: "right", headerAlign: "left" },
      { prop: "totalPrice", label: "實際售價合計/元", minWidth: 180, align: "right", headerAlign: "left" },
    ],
  },
  {
    label: "送貨計畫",
    headerAlign: "center",
    children: [
      { prop: "deliveryBatch", label: "送貨批次", minWidth: 130 },
      { prop: "plannedDeliveryDate", label: "計畫送貨日期", minWidth: 140 },
      { prop: "deliveryRemarks", label: "計畫送貨內容備註", minWidth: 180 },
    ],
  },
]);
const orderDataA = ref([ 
  { 
    customer: "顧客A", 
    name: "AAA銷售訂單", 
    amount: 9150.00,
    signDate: "2024-07-31", 
    deliveryDate: "2024-08-31", 
    status: "通過", 
    salesperson: "銷售員 A",
    // products: [
    //   { productName: "產品A", productCode: "P001", quantity: 10, unitPrice: 1500, totalPrice: 15000 },
    //   { productName: "產品B", productCode: "P002", quantity: 5, unitPrice: 2000, totalPrice: 10000 },
    // ],
    // deliveries: [
    //   { deliveryBatch: "批次1", plannedDeliveryDate: "2024-08-05", deliveryRemarks: "第一批送貨" },
    //   { deliveryBatch: "批次2", plannedDeliveryDate: "2024-08-10", deliveryRemarks: "第二批送貨" },
    // ]
    productName: "產品A", productCode: "P001", quantity: 10, unitPrice: 1500, totalPrice: 15000,
    deliveryBatch: "批次1", plannedDeliveryDate: "2024-08-05", deliveryRemarks: "第一批送貨",
  },
  { 
    customer: "顧客B", 
    name: "BBB銷售訂單", 
    amount: 140000.00, 
    signDate: "2023-09-21", 
    deliveryDate: "2023-10-21", 
    status: "審核中", 
    salesperson: "銷售員 B",
    // products: [
    //   { productName: "產品B", productCode: "A001", quantity: 20, unitPrice: 7000, totalPrice: 140000 },
    // ],
    // deliveries: [
    //   { deliveryBatch: "批次2", plannedDeliveryDate: "2023-10-05", deliveryRemarks: "第二批送貨" },
    // ]
    productName: "產品B", productCode: "A001", quantity: 20, unitPrice: 7000, totalPrice: 140000,
    deliveryBatch: "批次2", plannedDeliveryDate: "2023-10-10", deliveryRemarks: "第二批送貨",
  },
  { 
    customer: "顧客C", 
    name: "CCC銷售訂單", 
    amount: 180000.00, 
    signDate: "2025-01-21", 
    deliveryDate: "2025-02-21", 
    status: "未通過", 
    salesperson: "銷售員 C",
    // products: [
    //   { productName: "產品C", productCode: "A001", quantity: 20, unitPrice: 7000, totalPrice: 140000 },
    // ],
    // deliveries: [
    //   { deliveryBatch: "批次3", plannedDeliveryDate: "2023-10-05", deliveryRemarks: "第三批送貨" },
    // ]
    productName: "產品C", productCode: "B001", quantity: 30, unitPrice: 6000, totalPrice: 180000 ,
    deliveryBatch: "批次3", plannedDeliveryDate: "2025-02-05", deliveryRemarks: "第三批送貨",
  },
]);

const columnsB = ref([
  { prop: "customer", label: "客戶名稱" },
  { prop: "name", label: "銷售訂單名稱" },
  { prop: "amount", label: "銷售訂單金額" },
  { prop: "signDate", label: "訂單簽訂日期" },
  { prop: "deliveryDate", label: "訂單交付日期" },
  { prop: "status", label: "審批結果", slot: "status", },
  { prop: "salesperson", label: "銷售負責人" },
]);

const orderDataB = ref([
  { customer: "顧客A", name: "AAA銷售訂單", amount: "9,150.00", signDate: "2024-07-31", deliveryDate: "2024-08-31", status: "通過", salesperson: "銷售員 A", },
  { customer: "顧客B", name: "BBB銷售訂單", amount: "140,000.00", signDate: "2023-09-21", deliveryDate: "2023-10-21", status: "通過", salesperson: "銷售員 B", },
  { customer: "顧客C", name: "CCC銷售訂單", amount: "180,000.00", signDate: "2025-01-21", deliveryDate: "2025-02-21", status: "不通過", salesperson: "銷售員 C", },
]);

const valueA = ref(null);
const demoA = ref([
  { label: "AA", value: "aa" },
  { label: "BB", value: "bb" },
]);

const filteredDemoA = ref([...demoA.value]);

// 搜索名稱
const searchDemoA = (query) => {
  if (query) {
    filteredDemoA.value = demoA.value.filter((demo) =>
      demo.label.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    filteredDemoA.value = [...demoA.value];
  }
};
const selectedCondition = ref(null);
// 處理下拉選擇條件
const handleCommand = (command) => {
  selectedCondition.value = command;
};
const conditions = ref([
  { label: "等於", value: "equals" },
  { label: "不等於", value: "notEquals" },
  { label: "等於任意一個", value: "equalsAny" },
  { label: "不等於任意一個", value: "notEqualsAny" },
  { label: "包含", value: "contains" },
  { label: "不包含", value: "notContains" },
  { label: "為空", value: "isEmpty" },
  { label: "不為空", value: "isNotEmpty" }
]);
// 表格審核對應名稱
// const getTagType = (status) => {
//   switch (status) {
//     case "通過":
//       return "success";
//     case "審核中":
//       return "warning";
//     case "未通過":
//       return "danger";
//     default:
//       return "info";
//   }
// };
</script>
