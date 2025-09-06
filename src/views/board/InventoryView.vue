<template>
  <main class="flex-1 p-6">
    
    <HeaderBar title="庫存統計看板" />

    <section class="mt-6">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 實時庫存查詢 -->
        <el-tab-pane label="實時庫存查詢" name="1">
          <!-- 數據區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-5 gap-4 pb-8">
            <div class="col-span-2 grid grid-cols-2 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsA"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
            </div>
            <!-- 右側圖表 -->
            <div class="col-span-3">
              <BarChart
                title="產品可用庫存"
                :xAxisData="xAxisBar"
                :seriesData="seriesBar"
              />
            </div>
          </div>
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8">
            <DropdownCard
              title="產品名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇產品名稱"
              @command="handleCommand"
            />
            <DropdownCard
              title="規格型號"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇規格型號"
              @command="handleCommand"
            />
            <DropdownCard
              title="倉庫"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇倉庫"
              @command="handleCommand"
            />
            <DropdownCard
              title="品牌"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇品牌"
              @command="handleCommand"
            />
          </div>
          <!-- 下排表格 -->
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
        </el-tab-pane>
        <!-- 庫存預警查詢 -->
        <el-tab-pane label="庫存預警查詢" name="2">
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8"> 
            <DropdownCard
              title="倉庫"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇倉庫"
              @command="handleCommand"
            />
            <DropdownCard
              title="產品名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇產品名稱"
              @command="handleCommand"
            />
            <DropdownCard
              title="品牌"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇品牌"
              @command="handleCommand"
            />
            <ButtonCard 
              :title="'預警狀態'"
              :buttons="[
                { label: '庫存預警' }
              ]"
            />
          </div>
          <!-- 下排表格 -->
          <BrowseTable
            title="庫存預警查詢"
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
        <!-- 庫存期初期末查詢 -->
        <el-tab-pane label="庫存期初期末查詢" name="3">
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
            <div class="col-span-2 xl:col-span-1">
              <DatePickerCard
                :title="'日期'"
                :options="conditions"
                :selected-condition="selectedCondition"
                dropdown-placeholder="選擇範圍"
                v-model:selected-value="date"
              />
            </div>
            <DropdownCard
              title="倉庫"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇倉庫"
              @command="handleCommand"
            />
            <DropdownCard
              title="產品名稱"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇產品名稱"
              @command="handleCommand"
            />
          </div>
          <!-- 下排表格 -->
          <BrowseTable
              title="庫存期初期末"
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
import BarChart from "@/components/BarChart.vue";
import StatisticCard from "@/components/StatisticCard.vue";
import DropdownCard from "@/components/DropdownCard.vue";
import BrowseTable from "@/components/BrowseTable.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import DatePickerCard from "@/components/DatePickerCard.vue";
import { getTagType } from "@/composables/useStatusTag";

const activeTab = ref("1");
const date = ref([]);
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
  { customer: "顧客A", name: "AAA銷售訂單", amount: "9,150", signDate: "2024-07-31", deliveryDate: "2024-08-31", status: "通過", salesperson: "銷售員 A", },
  { customer: "顧客B", name: "BBB銷售訂單", amount: "140,000", signDate: "2023-09-21", deliveryDate: "2023-10-21", status: "通過", salesperson: "銷售員 B", },
  { customer: "顧客C", name: "CCC銷售訂單", amount: "180,000", signDate: "2025-01-21", deliveryDate: "2025-02-21", status: "不通過", salesperson: "銷售員 C", },
]);
// 數據卡片組件
const statisticsA = ref([
  { title: "當前庫存數", value: "1,238件" },
  { title: "可用庫存總數", value: "1,193件" },
  { title: "庫存凍結數", value: "45件" },
  { title: "計畫出庫數", value: "120件" },
]);
const xAxisBar = ref(['Catalyst 8300', 'Dusun Pi4', 'MQM8790-HS2R', 'MTQ8200-HS2R', 'STI105', 'UPS']);
const seriesBar = ref([161, 249, 285, 174, 120, 204]);
</script>
