<template>
  <!-- 跟進紀錄 -->
  <main class="flex flex-col space-y-4">
    <el-row class="p-3 bg-white rounded-md shadow">
      <el-col :span="5">
        <!-- 下拉選單 -->
        <el-select v-model="selectedOption" placeholder="請選擇">
          <el-option label="僅新增資料" value="add"></el-option>
          <el-option label="添加並管理個人數據" value="personal_manage"></el-option>
          <el-option label="添加並管理數據" value="manage"></el-option>
          <el-option label="查看全部資料" value="view"></el-option>
          <el-divider class="el-divider" />
          <el-option label="全部有限權的資料" value="restricted"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <!-- 僅新增資料 -->
    <div v-if="selectedOption === 'add'">
      <div class="p-8 bg-white rounded-t-md shadow max-h-lvh overflow-y-auto">
        <FollowUpForm :edit="true" :columns="columns" :tableData="tableData" />
      </div>

      <div class="pl-10 py-4 box-border border-dashed border-t-2 bg-white rounded-b-md">
        <el-button type="primary" class="w-24">送出</el-button>
      </div>
    </div>

    <!-- 添加並管理個人數據 -->
    <div v-else-if="selectedOption === 'personal_manage'">
      <div class="p-4 bg-white rounded-md shadow">
        <FollowUpTableDialog
          :tableData="detailsData"
          :columns="detailsColumns"
          :pickClientColumns="columns"
          :pickClientData="tableData"
        >
        </FollowUpTableDialog>
      </div>
    </div>

    <!-- 添加並管理數據 -->
    <div v-else-if="selectedOption === 'manage'">
      <div class="p-4 bg-white rounded-md shadow">
        <FollowUpTableDialog
          :tableData="detailsData"
          :columns="detailsColumns"
          :pickClientColumns="columns"
          :pickClientData="tableData"
        >
        </FollowUpTableDialog>
      </div>
    </div>

    <!-- 查看全部資料 -->
    <div v-else-if="selectedOption === 'view'">
      <div class="p-4 bg-white rounded-md shadow">
        <FollowUpTableDialog
          :tableData="detailsData"
          :columns="detailsColumns"
          :isButtonArea="false"
        >
        </FollowUpTableDialog>
      </div>
    </div>

    <!-- 全部有權限的資料 -->
    <div v-else-if="selectedOption === 'restricted'">
      <div class="p-4 bg-white rounded-md shadow">
        <FollowUpTableDialog
          :tableData="detailsData"
          :columns="detailsColumns"
          :pickClientColumns="columns"
          :pickClientData="tableData"
        >
        </FollowUpTableDialog>
      </div>
    </div>
  </main>
</template>

<script setup>
  import FollowUpForm from '@/components/FollowUpForm.vue';
  import FollowUpTableDialog from '@/components/FollowUpTableDialog.vue';

  const selectedOption = ref('add'); // add 僅新增資料、personal_manage 添加並管理個人數據、manage 添加並管理數據、view 查看全部資料、restricted 全部有限權的資料
  // 跟進紀錄-表格數據
  const detailsData = ref([
    {
      followupRecord: '客戶拜訪', // 跟進內容紀錄
      clientName: '軟件有限公司', // 客戶名稱
      clientNo: 'KH240729-01', // 客戶編碼
      followupTime: '2024-07-28 16:55:30', // 跟進時間
      followupMethod: '上門拜訪', // 跟進方式
      followupContentType: '初次溝通', // 跟進紀錄
      followupPerson: '張璿', // 跟進人
      salesDepartment: '市場部', // 銷售歸屬部門
      fieldWorkCheckIn: '', // 外勤打卡
      submitter: '張璿', // 送出人
      submitTime: '2024-07-29 16:55:30', // 送出時間
      updateTime: '2024-07-29 16:55:30', // 更新時間
    },
    {
      followupRecord: '需求回訪',
      clientName: '大發有限公司',
      clientNo: 'KH240729-03',
      followupTime: '2024-07-30 16:55:30',
      followupMethod: '電話拜訪',
      followupContentType: '需求溝通',
      followupPerson: '王小明',
      salesDepartment: '市場部',
      fieldWorkCheckIn: '',
      submitter: '張璿',
      submitTime: '2024-07-30 16:55:30',
      updateTime: '2024-07-30 16:55:30',
    },
  ]);
  // 跟進紀錄-欄位
  const detailsColumns = ref([
    { prop: 'followupRecord', label: '跟進紀錄內容', minWidth: 120 },
    { prop: 'clientName', label: '客戶名稱', minWidth: 150 },
    { prop: 'clientNo', label: '客戶編碼', minWidth: 120 },
    { prop: 'followupTime', label: '跟進時間', minWidth: 120 },
    { prop: 'followupMethod', label: '跟進方式', minWidth: 120 },
    { prop: 'followupContentType', label: '跟進內容', minWidth: 120 },
    { prop: 'followupPerson', label: '跟進人', minWidth: 120 },
    { prop: 'salesDepartment', label: '銷售歸屬部門', minWidth: 150 },
    { prop: 'fieldWorkCheckIn', label: '外勤打卡', minWidth: 120 },
    { prop: 'submitter', label: '送出人', minWidth: 100 },
    { prop: 'submitTime', label: '送出時間', minWidth: 180 },
    { prop: 'updateTime', label: '更新時間', minWidth: 180 },
  ]);

  // 選擇客戶-欄位
  const columns = ref([
    { prop: 'clientName', label: '客戶名稱', sortable: true, minWidth: 140 },
    { prop: 'clientTag', label: '客戶標籤', sortable: true, minWidth: 140 },
    { prop: 'clientType', label: '客戶分類', sortable: true },
    { prop: 'priceTier', label: '價格等級', sortable: true, minWidth: 150 },
    { prop: 'salesRepresentative', label: '負責人', sortable: true, minWidth: 110 },
  ]);
  // 選擇客戶-表格資料
  const tableData = ref([
    {
      id: 1,
      clientName: '軟件有限公司', // 客戶名稱
      clientTag: 'ME', // 客戶標籤
      clientType: '潛在客戶', // 客戶分類
      priceTier: '一級售價', // 價格等級
      salesRepresentative: '張璿', // 銷售負責人
    },
    {
      id: 2,
      clientName: '大發有限公司',
      clientTag: 'KB',
      clientType: '潛在客戶',
      priceTier: '一級售價',
      salesRepresentative: '張璿',
    },
  ]);
</script>

<style lang="sass" scoped>
  .el-divider
    margin: 0.5em 0
</style>
