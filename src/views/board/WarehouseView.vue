<template>
  <main class="flex-1 p-6">
    
    <HeaderBar title="倉庫經營看板" />

    <section class="mt-6">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 倉庫經營紀錄 -->
        <el-tab-pane label="倉庫經營紀錄" name="1">
          <!-- 篩選按鈕 -->
          <div class="flex flex-wrap justify-between gap-2 pb-8">
            <div v-for="(group, index) in buttonGroups" :key="index" >
              <el-button-group>
                <el-button
                  v-for="button in group"
                  :key="button.label"
                  @click="handleClick(button.value)"
                >
                  {{ button.label }}
                </el-button>
              </el-button-group>
            </div>
          </div>
          <!-- 數據區塊 -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <div class="grid grid-cols-3 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsA"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-3">
                <LineChart
                  title="出入庫數量趨勢"
                  :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
                  :seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <StatisticCard
                v-for="(stat, index) in statisticsB"
                :key="index"
                :title="stat.title"
                :value="stat.value"
              />
              <div class="col-span-2">
                <LineChart
                  title="出入庫金額趨勢"
                  :xAxisData="['2023年05月', '2023年06月', '2023年07月', '2023年08月', '2023年09月', '2024年07月']"
                  :seriesData="[382000, 356000, 471000, 636000, 164000, 9150]"
                  baseColor="#69b2ea"
                />
              </div>
            </div>
          </div>
          <!-- 下排表格 -->
          <BrowseTable
            title="倉庫經營明細"
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
        <!-- 倉庫經營總覽 -->
        <el-tab-pane label="倉庫經營總覽" name="2">
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
            <div class="col-span-2 xl:col-span-1">
              <ButtonCard 
                :title="'選擇倉庫'"
                :buttons="[
                  { label: '全部' },
                  { label: 'A倉庫' },
                  { label: 'B倉庫' },
                ]"
              />
            </div>
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
          </div>
          <!-- 數據區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-6 gap-4 pb-8">
            <StatisticCard
              v-for="(stat, index) in statisticsC"
              :key="index"
              :title="stat.title"
              :value="stat.value"
            />
          </div>
          <!-- 下排表格 -->
          <BrowseTable
            title="倉庫經營總覽"
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
        <!-- 庫存產品月加權成本 -->
        <el-tab-pane label="庫存產品月加權成本" name="3">
          <div class="grid grid-cols-4 gap-6 pb-8">
            <!-- 左側篩選區塊 -->
            <div class="col-span-4 xl:col-span-1">
              <ButtonCard 
                :title="'選擇倉庫'"
                :buttons="[
                  { label: 'A倉庫' },
                  { label: 'B倉庫' }
                ]"
                class="mb-3"
              />
              <el-card shadow="never" class="mb-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-gray-500">產品名稱</p>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link outline-none text-primary">
                      {{ selectedCondition ? selectedCondition.label : "選擇條件" }}
                      <i class="ri-arrow-down-s-line"></i>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="option in conditions"
                          :key="option.value"
                          :command="option"
                          class="blue-option"
                        >
                          {{ option.label }}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div>
                  <el-input placeholder="輸入名稱" class="mt-2">
                    <template #prefix>
                      <i class="ri-search-line"></i>
                    </template>
                  </el-input>
                  <el-checkbox-group v-model="selectedProducts" class="mt-4 flex flex-col">
                    <el-checkbox value ="all">全選</el-checkbox>
                    <el-checkbox value ="Catalyst 8300">Catalyst 8300</el-checkbox>
                    <el-checkbox value ="Dusun Pi4">Dusun Pi4</el-checkbox>
                    <el-checkbox value ="MQM8790-HS2R">MQM8790-HS2R</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-card>
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
                class="mb-3"
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
            </div>

            <!-- 右側表格 -->
            <div class="col-span-4 xl:col-span-3 mt-6 md:mt-0">
              <BrowseTable
                title="庫存產品成本 - 月加權成本"
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
import DropdownCard from "@/components/DropdownCard.vue";
import BrowseTable from "@/components/BrowseTable.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import { getTagType } from "@/composables/useStatusTag";

const buttonGroups = [
  [
    { label: "A倉庫", value: "A" },
    { label: "B倉庫", value: "B" },
  ],
  [
    { label: "今天", value: "today" },
    { label: "昨天", value: "yesterday" },
    { label: "本週", value: "thisWeek" },
    { label: "上週", value: "lastWeek" },
    { label: "本月", value: "thisMonth" },
    { label: "上月", value: "lastMonth" },
    { label: "今年", value: "thisYear" },
  ],
  [
    { label: "銷售出庫", value: "salesOutbound" },
    { label: "採購入庫", value: "purchaseInbound" },
    { label: "其他出庫", value: "otherOutbound" },
    { label: "其他入庫", value: "otherInbound" },
  ],
];

const handleClick = (value) => {
  console.log("Clicked:", value);
};

const selectedProducts = ref([]);
const activeTab = ref("1");
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
const statisticsA = ref([
  { title: "業務單據數量", value: "64單" },
  { title: "產品品類", value: "6種" },
  { title: "出入庫數量", value: "4,970件" },
]);
const statisticsB = ref([
  { title: "出入庫產品成本合計", value: "2,948,488元" },
  { title: "出入庫產品售價合計", value: "2,378,716元" },
]);
const statisticsC = ref([
  { title: "庫存總數量", value: "1,238件" },
  { title: "入庫總數量", value: "3,104件" },
  { title: "出庫總數量", value: "1,866件" },
  { title: "入庫產品成本總額/元", value: "1,824,684元" },
  { title: "出庫產品成本總額/元", value: "1,123,803元" },
  { title: "結餘庫存產品成本總額/元", value: "700,880元" },
]);
</script>
