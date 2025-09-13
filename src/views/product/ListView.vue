<template>
  <main class="flex-1 p-6">
    
    <HeaderBar title="產品資料查詢" />

    <section class="mt-6">
      <el-tabs v-model="activeTab" class="px-5 py-2 bg-white rounded-md shadow min-h-[88vh] overflow-auto">
        <!-- 產品售價查詢 -->
        <el-tab-pane label="產品售價查詢" name="1">
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8"> 
            <DropdownCard
              title="價格等級"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇價格等級"
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
            title="產品銷售價格表"
            :tableData="orderDataA"
            :columns="columnsA"
          />
        </el-tab-pane>
        <!-- 產品列表 -->
        <el-tab-pane label="產品列表" name="2">
          <!-- 篩選區塊 -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 pb-8"> 
            <DropdownCard
              title="產品權限"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇產品權限"
              @command="handleCommand"
            />
            <DropdownCard
              title="產品類型"
              :options="conditions"
              :remote-method="searchDemoA"
              :filtered-items="filteredDemoA"
              :selected-condition="selectedCondition"
              v-model:selected-value="valueA"
              dropdown-placeholder="選擇條件"
              select-placeholder="選擇產品類型"
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
            title="產品明細表"
            :tableData="orderDataB"
            :columns="columnsB"
          >
          <template #pdPermission="{ row }">
              <el-tag
                v-for="(permission, index) in row.pdPermission"
                :key="index"
                :type="getTagType(permission)"
                effect="dark"
                class="mr-2"
              >
                {{ permission }}
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
import DropdownCard from "@/components/DropdownCard.vue";
import BrowseTable from "@/components/BrowseTable.vue";

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

// 產品銷售價格表
const columnsA = ref([
  { prop: "name", label: "產品名稱", minWidth: 150, sortable: true },
  { prop: "pdCode", label: "產品編碼", minWidth: 100, sortable: true },
  { prop: "pdAttribute", label: "產品屬性", minWidth: 100, sortable: true },
  { prop: "pdType", label: "產品類型", minWidth: 150, sortable: true },
  { prop: "brand", label: "品牌", sortable: true },
  { prop: "model", label: "規格型號", minWidth: 150, sortable: true },
  { prop: "pdImage", label: "產品圖片", minWidth: 100, sortable: true },
  { prop: "priceLevel", label: "價格等級", minWidth: 100, sortable: true },
  { prop: "sellingPrice", label: "銷售單價/元", minWidth: 150, sortable: true, align: "right", headerAlign: "left" },
  { prop: "sellingPriceExTax", label: "銷售單價(不含稅)/元", minWidth: 160, sortable: true, align: "right", headerAlign: "left" },
  { prop: "vatRate", label: "增值稅稅率%", minWidth: 100, sortable: true, align: "right", headerAlign: "left" }
]);
const orderDataA = ref([
  {
    name: "MTQ8200-HS2F",
    pdCode: "CP0014",
    pdAttribute: "成品",
    pdType: "交換機",
    brand: "品牌A",
    model: "WH-1000XM4",
    pdImage: "https://via.placeholder.com/150",
    priceLevel: "標準售價",
    sellingPrice: 680,
    sellingPriceExTax: 591.60,
    vatRate: "13%",
  },
  {
    name: "ST1L05",
    pdCode: "CP0006",
    pdAttribute: "零件",
    pdType: "網卡-CPU晶片",
    brand: "品牌B",
    model: "STV-2024",
    pdImage: "https://via.placeholder.com/150",
    priceLevel: "一級售價",
    sellingPrice: 640,
    sellingPriceExTax: 561.15,
    vatRate: "13%",
  },
]);
// 產品明細表
const columnsB = ref([
  { prop: "pdCode", label: "產品編碼", minWidth: 100 },
  { prop: "name", label: "產品名稱", minWidth: 150 },
  { prop: "pdType", label: "產品類型", minWidth: 150 },
  { prop: "pdAttribute", label: "產品屬性", minWidth: 100 },
  { prop: "brand", label: "品牌" },
  { prop: "model", label: "規格型號", minWidth: 150 },
  { prop: "unit", label: "單位" },
  { prop: "costPrice", label: "成本單價/元", minWidth: 130, align: "right", headerAlign: "left" },
  { prop: "standardPrice", label: "標準售價/元", minWidth: 150, align: "right", headerAlign: "left" },
  { prop: "pdPermission", label: "產品權限", minWidth: 130, slot: "pdPermission" },
  { prop: "pdImage", label: "產品圖片", minWidth: 130 },
]);
// 表格數據
const orderDataB = ref([
  {
    pdCode: "CP0014",
    name: "MTQ8200-HS2F",
    pdType: "交換機",
    pdAttribute: "成品",
    brand: "品牌A",
    model: "WH-1000XM4",
    unit: "個",
    costPrice: 320,
    standardPrice: 680,
    pdPermission: ['銷售','採購'],
    pdImage: "https://via.placeholder.com/150",
  },
  {
    pdCode: "CP0006",
    name: "ST1L05",
    pdType: "網卡-CPU晶片",
    pdAttribute: "零件",
    brand: "品牌B",
    model: "STV-2024",
    unit: "台",
    costPrice: 360,
    standardPrice: 680,
    pdPermission: ['贈送'],
    pdImage: "https://via.placeholder.com/150",
  },
]);
// 表格權限對應名稱
const getTagType = (permission) => {
  switch (permission) {
    case "銷售":
      return "danger";
    case "採購":
      return "warning";
    case "贈送":
      return "success";
    default:
      return "info";
  }
};
</script>
