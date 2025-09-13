<template>
  <div>
    <h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">客戶基本資料</h2>
    <el-form label-position="top" class="grid grid-cols-1 xl:grid-cols-4 gap-4 p-6 font-bold">
      <!-- 左側欄位 -->
      <div class="col-span-2">
        <el-form-item label="客戶編碼">
          <el-input class="xl:max-w-lg" disabled v-model="data.clientNo" />
        </el-form-item>
        <el-form-item label="客戶分類">
          <div class="w-full bg-gray-50 rounded-sm border">
            <el-tag :type="getTagType(data.clientType)" effect="dark" class="inline-block">{{
              data.clientType
            }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="客戶標籤">
          <div class="w-full bg-gray-50 rounded-sm border">
            <el-tag :type="getTagType(data.clientTag)" effect="dark" class="inline-block">{{
              data.clientTag
            }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="結算期限">
          <el-input class="xl:max-w-lg" disabled v-model="data.settlementType" />
        </el-form-item>
        <el-form-item label="銷售負責人">
          <div class="w-full bg-gray-50 rounded-sm border">
            <el-tag type="primary" class="inline-block">{{ data.salesRepresentative }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="客戶地址">
          <el-input v-model="data.clientAddress" class="w-full" type="text" disabled />
        </el-form-item>
      </div>
      <!-- 右側欄位 -->
      <div class="col-span-2 xl:col-start-3">
        <el-form-item label="客戶名稱">
          <el-input class="w-full" v-model="data.clientName" disabled></el-input>
        </el-form-item>
        <el-form-item label="客戶來源">
          <el-input class="w-full" value="轉介紹" v-model="data.clientSource" disabled></el-input>
        </el-form-item>
        <el-form-item label="價格等級">
          <el-input class="w-full" v-model="data.priceTier" disabled></el-input>
        </el-form-item>
        <el-form-item label="信用額度/元">
          <el-input class="w-full" v-model="data.creditLimit" disabled></el-input>
        </el-form-item>
        <el-form-item label="銷售歸屬部門">
          <div class="w-full bg-gray-50 rounded-sm border">
            <el-tag type="primary" class="inline-block">{{ data.salesDepartment }}</el-tag>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
  // 定義 props
  const props = defineProps({
    // 只讀
    edit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  const { data } = props;
  // 客戶分類、客戶標籤對應名稱
  const getTagType = (type) => {
    switch (type) {
      case '潛在客戶':
        return 'danger';
      case '戰略合作':
        return 'primary';
      case '成交客戶':
        return 'success';
      case 'SMB':
        return 'warning';
      case 'ME':
        return 'primary';
      case 'KA':
        return 'success';
      default:
        return 'info';
    }
  };
</script>
