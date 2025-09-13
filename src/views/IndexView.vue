<template>
  
  <main class="flex-1 p-6">
    <div
      class="bg-[url(@/assets/bg.png)] bg-cover bg-center bg-no-repeat text-white text-center p-6 rounded-lg shadow-md"
    >
      <h1 class="text-2xl text-gray-500 font-bold">進銷存</h1>
    </div>
    <!-- 綜合資料 -->
    <div class="mt-2 grid grid-cols-2 xl:grid-cols-4 gap-4 py-2">
      <DashboardCard
        title="累計統計"
        value="1,234"
        percentage="12"
        iconBg="bg-blue-500"
        :icon="ChartIcon"
      />
      <DashboardCard
        title="營業額度"
        value="$567,890"
        percentage="8"
        iconBg="bg-green-500"
        :icon="MoneyIcon"
      />
      <DashboardCard
        title="新增訂單"
        value="89"
        percentage="-8"
        iconBg="bg-purple-500"
        :icon="ArrowIcon"
      />
      <DashboardCard
        title="訪問數量"
        value="2,456"
        percentage="5"
        iconBg="bg-orange-500"
        :icon="PeopleIcon"
      />
    </div>

    <!-- 庫存統計 -->
    <el-card class="mb-4" shadow="never">
      <BarChart 
        title="產品可用庫存"
        :xAxisData="xAxisBar"
        :seriesData="seriesBar"
      />
      <BrowseTable
        title="庫存統計查詢"
        :tableData="orderDataB"
        :columns="columnsB"
      >
          <template #status="{ row }">
            <el-tag :type="getTagType(row.status)" effect="dark" round>
              {{ row.status }}
            </el-tag>
          </template>
        </BrowseTable>

    </el-card>
    <!-- 銷售統計 -->
    <el-tabs v-model="activeTab" class="mb-4" type="border-card">
      <el-tab-pane label="銷售訂單統計" name="1">
        <div>
          <LineChart
            title="銷售金額趨勢"
            :xAxisData="xAxisData"
            :seriesData="seriesData"
          />
        </div>
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
      </el-tab-pane>

      <el-tab-pane label="銷售訂單 - 出庫 - 退換貨 - 對帳執行統計" name="2">
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
    <!-- 財務收支 -->
    <el-tabs v-model="activeTab2" type="border-card">
      <el-tab-pane label="收款統計" name="1">
        <LineChart
          title="應收帳款金額趨勢"
          :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
          :seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
        />
        <BrowseTable
          title="應收帳款明細"
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

      <el-tab-pane label="付款統計" name="2">
        <LineChart
          title="應付帳款金額趨勢"
          :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
          :seriesData="[38200, 32600, 46100, 63600, 16400, 915]"
        />
        <BrowseTable
          title="應付帳款明細"
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
  </main>
</template>

<script setup>
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import BrowseTable from "@/components/BrowseTable.vue";
import { getTagType } from "@/composables/useStatusTag";
import DashboardCard from '@/components/DashboardCard.vue'

const activeTab = ref("1");
const activeTab2 = ref("1");
const xAxisData = ref(['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']);
const seriesData = ref([382000, 256000, 471000, 636000, 164000, 9150]);

const xAxisBar = ref(['Catalyst 8300', 'Dusun Pi4', 'MQM8790-HS2R', 'MTQ8200-HS2R', 'STI105', 'UPS']);
const seriesBar = ref([161, 249, 285, 174, 120, 204]);

const columnsA = ref([
  { prop: "customer", label: "客戶名稱", minWidth: 150, sortable: true, fixed: true },
  { prop: "name", label: "銷售訂單名稱", minWidth: 150, sortable: true, fixed: true },
  { prop: "amount", label: "銷售訂單金額", minWidth: 150, sortable: true, align: "right", headerAlign: "left" },
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
  { prop: "status", label: "審批結果", slot: "status" },
  { prop: "salesperson", label: "銷售負責人" },
]);
const orderDataB = ref([
  { customer: "顧客A", name: "AAA銷售訂單", amount: "9,150.00", signDate: "2024-07-31", deliveryDate: "2024-08-31", status: "通過", salesperson: "銷售員 A", },
  { customer: "顧客B", name: "BBB銷售訂單", amount: "140,000.00", signDate: "2023-09-21", deliveryDate: "2023-10-21", status: "通過", salesperson: "銷售員 B", },
  { customer: "顧客C", name: "CCC銷售訂單", amount: "180,000.00", signDate: "2025-01-21", deliveryDate: "2025-02-21", status: "不通過", salesperson: "銷售員 C", },
]);
const ChartIcon = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3V19H21V21H3V3H5ZM20.2929 6.29289L21.7071 7.70711L16 13.4142L13 10.415L8.70711 14.7071L7.29289 13.2929L13 7.58579L16 10.585L20.2929 6.29289Z"></path></svg>`

const MoneyIcon = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.0049 2.00281C18.4232 2.00281 22.0049 5.58453 22.0049 10.0028C22.0049 13.2474 20.0733 16.0409 17.2973 17.296C16.0422 20.0718 13.249 22.0028 10.0049 22.0028C5.5866 22.0028 2.00488 18.4211 2.00488 14.0028C2.00488 10.7587 3.9359 7.96554 6.71122 6.71012C7.96681 3.93438 10.7603 2.00281 14.0049 2.00281ZM10.0049 8.00281C6.69117 8.00281 4.00488 10.6891 4.00488 14.0028C4.00488 17.3165 6.69117 20.0028 10.0049 20.0028C13.3186 20.0028 16.0049 17.3165 16.0049 14.0028C16.0049 10.6891 13.3186 8.00281 10.0049 8.00281ZM11.0049 9.00281V10.0028H13.0049V12.0028H9.00488C8.72874 12.0028 8.50488 12.2267 8.50488 12.5028C8.50488 12.7483 8.68176 12.9524 8.91501 12.9948L9.00488 13.0028H11.0049C12.3856 13.0028 13.5049 14.1221 13.5049 15.5028C13.5049 16.8835 12.3856 18.0028 11.0049 18.0028V19.0028H9.00488V18.0028H7.00488V16.0028H11.0049C11.281 16.0028 11.5049 15.7789 11.5049 15.5028C11.5049 15.2573 11.328 15.0532 11.0948 15.0109L11.0049 15.0028H9.00488C7.62417 15.0028 6.50488 13.8835 6.50488 12.5028C6.50488 11.1221 7.62417 10.0028 9.00488 10.0028V9.00281H11.0049ZM14.0049 4.00281C12.2214 4.00281 10.6196 4.78097 9.52064 6.01629C9.68133 6.00764 9.84254 6.00281 10.0049 6.00281C14.4232 6.00281 18.0049 9.58453 18.0049 14.0028C18.0049 14.1655 18 14.327 17.9905 14.4873C19.2265 13.3885 20.0049 11.7866 20.0049 10.0028C20.0049 6.6891 17.3186 4.00281 14.0049 4.00281Z"></path></svg>`

const ArrowIcon = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 1V4H1V6H4V9H6V6H9V4H6V1H4ZM3 20.0066V11H5V19H13V14C13 13.45 13.45 13 14 13L19 12.999V5H11V3H20.0066C20.5552 3 21 3.45576 21 4.00247V15L15 20.996L4.00221 21C3.4487 21 3 20.5551 3 20.0066ZM18.171 14.999L15 15V18.169L18.171 14.999Z"></path></svg>`

const PeopleIcon = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>`
</script>
