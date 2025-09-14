<template>
  <!-- 主內容 -->
  <main class="flex-1 p-6">
    
    <HeaderBar title="財務收支看板" />

    <section class="mt-6">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 收款統計 -->
        <el-tab-pane label="收款統計" name="1">
          <!-- 數據區塊 -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsA"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-1 md:col-span-3">
                <LineChart
                  title="應收帳款金額趨勢"
                  :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
                  :seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsB"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-1 md:col-span-3">
                <LineChart
                  title="收款金額趨勢"
                  :xAxisData="xAxisDataB"
                  :seriesData="seriesDataB"
                  baseColor="#69b2ea"
                />
              </div>
            </div>
          </div>
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 gap-4 pb-8">
            <ButtonCard 
              :title="'應收帳款標籤'"
              :buttons="[
                { label: '待對帳' },
                { label: '待收款' },
                { label: '已收款' }
              ]"
            />
            <DatePickerCard
              :title="'業務活動時間'"
              :options="conditions"
              :selected-condition="selectedCondition"
              dropdown-placeholder="選擇範圍"
              v-model:selected-value="date"
            />
          </div>
          <!-- 下排表格 -->
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
        <!-- 付款統計 -->
        <el-tab-pane label="付款統計" name="2">
          <!-- 數據區塊 -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsC"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-1 md:col-span-3">
                <LineChart
                  title="應付帳款金額趨勢"
                  :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
                  :seriesData="[38200, 32600, 46100, 63600, 16400, 915]"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsD"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-1 md:col-span-3">
                <LineChart
                  title="付款金額趨勢"
                  :xAxisData="xAxisDataB" :seriesData="seriesDataB" baseColor="#69b2ea"
                />
              </div>
            </div>
          </div>
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 gap-4 pb-8">
            <ButtonCard 
              :title="'應付帳款標籤'"
              :buttons="[
                { label: '待對帳' },
                { label: '待付款' },
                { label: '已付款' }
              ]"
            />
            <DatePickerCard
              :title="'業務活動時間'"
              :options="conditions"
              :selected-condition="selectedCondition"
              dropdown-placeholder="選擇範圍"
              v-model:selected-value="date"
            />
          </div>
          <!-- 下排表格 -->
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
        <!-- 帳款期初期末 -->
        <el-tab-pane label="帳款期初期末" name="3">
          <!-- 篩選區塊 -->
          <div class="grid gap-4 pb-8">
            <DatePickerCard
              :title="'預計收付款日期'"
              :options="conditions"
              :selected-condition="selectedCondition"
              dropdown-placeholder="選擇範圍"
              v-model:selected-value="date"
            />
          </div>
          <!-- 下排表格 -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <BrowseTable
              title="應收帳款期初期末"
              :tableData="orderDataB"
              :columns="columnsB"
            >
              <template #status="{ row }">
                <el-tag :type="getTagType(row.status)" effect="dark" round>
                  {{ row.status }}
                </el-tag>
              </template>
            </BrowseTable>
            <BrowseTable
              title="應付帳款期初期末"
              :tableData="orderDataB"
              :columns="columnsB"
            >
              <template #status="{ row }">
                <el-tag :type="getTagType(row.status)" effect="dark" round>
                  {{ row.status }}
                </el-tag>
              </template>
            </BrowseTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </main>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import LineChart from "@/components/LineChart.vue";
import StatisticCard from "@/components/StatisticCard.vue";
import BrowseTable from "@/components/BrowseTable.vue";
import DatePickerCard from "@/components/DatePickerCard.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import { getTagType } from "@/composables/useStatusTag";

const activeTab = ref("1");
const date = ref([]);
const selectedCondition = ref(null);
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
// 表格資料
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
// 數據卡片組件
const statisticsA = ref([
  { title: "應收帳款總金額", value: "1,516,473元" },
  { title: "對帳客戶數量", value: "5家" },
  { title: "對帳訂單數量", value: "9份" },
]);
const statisticsB = ref([
  { title: "收款總金額", value: "1,228,558元" },
  { title: "收款客戶數量", value: "5家" },
  { title: "收款訂單數量", value: "8份" },
]);
const statisticsC = ref([
  { title: "應付帳款總金額", value: "1,475,203元" },
  { title: "對帳供應商數量", value: "3家" },
  { title: "對帳訂單數量", value: "9份" },
]);
const statisticsD = ref([
  { title: "付款總金額", value: "1,462,002元" },
  { title: "付款供應商數量", value: "3家" },
  { title: "付款訂單數量", value: "15份" },
]);
// 圖表資料
const xAxisDataB = ref(['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']);
const seriesDataB = ref([820, 660, 932, 730, 334, 90]);

</script>
