<!-- 財務資料 -->
<template>
  <div>
    <!-- 編輯 -->
    <el-form
      v-if="editable"
      label-position="top"
      class="grid grid-cols-1 xl:grid-cols-4 gap-4"
    >
      <!-- 財務資料 左側欄位 -->
      <div>
        <el-form-item label="發票抬頭" :required="false">
          <el-input class="xl:max-w-lg" v-model="invoiceTitle" />
        </el-form-item>

        <el-form-item label="稅種" :required="false">
          <el-select
            v-model="taxType"
            class="w-full"
            filterable
            remote
            reserve-keyword
            remote-show-suffix
            placeholder=""
          >
            <el-option
              v-for="item in textTypeOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="開戶電話" :required="false">
          <el-input class="xl:max-w-lg" v-model="phone" />
        </el-form-item>

        <el-form-item label="開戶銀行" :required="false">
          <el-select
            v-model="bank"
            class="w-full"
            filterable
            remote
            reserve-keyword
            remote-show-suffix
            placeholder=""
          >
            <el-option
              v-for="item in bankOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 財務資料 右側欄位 -->
      <div class="xl:col-start-3">
        <el-form-item label="發票稅號" :required="false">
          <el-input class="w-full" v-model="tin"></el-input>
        </el-form-item>

        <el-form-item label="增值稅稅率 %" :required="false">
          <el-input class="w-full" v-model="vat">
            <template #append>
              <i class="ri-percent-line"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="收票郵箱" :required="false">
          <el-input class="w-full" v-model="invoiceEmailAddr"></el-input>
        </el-form-item>

        <el-form-item label="銀行帳戶" :required="false">
          <el-input class="w-full" v-model="bankAccount"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <!-- 讀取 -->
    <el-form
      v-else
      label-position="top"
      class="grid grid-cols-1 xl:grid-cols-4 gap-4"
    >
      <!-- 財務資料 左側欄位 -->
      <div class="col-span-2">
        <el-form-item label="發票抬頭" :required="false">
          <el-input class="xl:max-w-lg" v-model="invoiceHeader" disabled />
        </el-form-item>

        <el-form-item label="稅種" :required="false">
          <el-input class="xl:max-w-lg" v-model="invoiceTaxType" disabled />
        </el-form-item>

        <el-form-item label="開戶電話" :required="false">
          <el-input class="xl:max-w-lg" v-model="accountPhoneNumber" disabled />
        </el-form-item>

        <el-form-item label="開戶銀行" :required="false">
          <el-input class="xl:max-w-lg" v-model="accountBankName" disabled />
        </el-form-item>
      </div>

      <!-- 財務資料 右側欄位 -->
      <div class="col-span-2 xl:col-start-3">
        <el-form-item label="發票稅號" :required="false">
          <el-input class="w-full" v-model="invoiceTaxNumber" disabled />
        </el-form-item>

        <el-form-item label="增值稅稅率 %" :required="false">
          <el-input class="w-full" v-model="valueAddedTaxRate" disabled />
        </el-form-item>

        <el-form-item label="收票郵箱" :required="false">
          <el-input class="w-full" v-model="invoiceEmail" disabled />
        </el-form-item>

        <el-form-item label="銀行帳戶" :required="false">
          <el-input class="w-full" v-model="accountBankNumber" disabled />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script setup>
// 定義 props
const props = defineProps({
  // true 可編輯、false 僅讀取
  editable: {
    type: Boolean,
    required: true,
  },
  // for 讀取
  invoiceHeader: String, // 發票抬頭
  invoiceTaxType: String, // 稅種
  accountPhoneNumber: String, // 開戶電話
  accountBankName: String, // 開戶銀行
  invoiceTaxNumber: String, // 發票稅號
  valueAddedTaxRate: String, // 增值稅稅率
  invoiceEmail: String, // 收票郵箱
  accountBankNumber: String,  // 銀行帳戶
  // for 編輯
  textTypeOptions: { // 稅種-選項
    type: Array
  },
  bankOptions: { // 開戶銀行-選項
    type: Array
  }
});

const {
  invoiceHeader,
  invoiceTaxType,
  accountPhoneNumber,
  accountBankName,
  invoiceTaxNumber,
  valueAddedTaxRate,
  invoiceEmail,
  accountBankNumber,
} = props;

// 財務資料 tab - 編輯
const invoiceTitle = ref(''); // 發票抬頭
const taxType = ref(''); // 稅種
const phone = ref(''); // 開戶電話
const bank = ref(''); // 開戶銀行
const tin = ref(''); // 發票稅號
const vat = ref(''); // 增值稅稅率
const invoiceEmailAddr = ref(''); // 收票郵箱
const bankAccount = ref(''); // 銀行帳戶
</script>
