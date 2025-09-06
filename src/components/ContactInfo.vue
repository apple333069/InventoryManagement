<!-- 聯繫人資料 -->
<template>
  <div>
    <el-form label-position="top" class="grid grid-cols-3 xl:grid-cols-3 gap-8">
      <div class="col-span-1">
        <el-form-item label="聯繫人姓名" :required="false">
          <!-- 編輯 -->
          <el-input
            v-if="editable"
            class="w-full"
            v-model="contactName"
          ></el-input>

          <!-- 讀取 -->
          <el-input v-else disabled v-model="name" class="w-full"></el-input>
        </el-form-item>
      </div>
      <div class="col-span-1">
        <el-form-item label="聯繫人手機" :required="false">
          <!-- 編輯 -->
          <el-input
            v-if="editable"
            class="w-full"
            v-model="contactPhone"
          ></el-input>

          <!-- 讀取 -->
          <el-input v-else disabled class="w-full" v-model="phone"></el-input>
        </el-form-item>
      </div>
      <div class="col-span-1">
        <el-form-item label="聯繫人職位" :required="false">
          <!-- 編輯 -->
          <el-input
            v-if="editable"
            placeholder=""
            class="w-full"
            v-model="contactTitle"
          ></el-input>

          <!-- 讀取 -->
          <el-input
            v-else
            placeholder=""
            class="w-full"
            v-model="title"
            disabled
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <!-- 表格:其他聯繫人資料 -->
    <h3 class="text-gray-600 text-sm mb-2">其他聯繫人資料</h3>
    <!-- 編輯 -->
    <section v-if="editable">
      <div class="max-h-96 overflow-auto w-fit">
        <!-- 編輯 -->
        <table id="tableOtherContact" class="border border-gray-400">
          <thead class="sticky top-0 z-10">
            <tr>
              <!-- 大量刪除-按鈕 -->
              <th class="min-w-20 group">
                <!-- 全選 -->
                <el-checkbox
                  v-if="isBatchDeleteMode"
                  v-model="isSelectAll"
                  @change="handleSelectAllChange"
                />
                <div v-else class="hidden group-hover:block">
                  <el-tooltip
                    class="box-item hidden"
                    effect="dark"
                    content="大量刪除"
                    placement="top-start"
                  >
                    <button
                      v-if="otherContactPerson.length > 0"
                      class="hidden group-hover:block hover:text-red-500 transition-opacity duration-100 mx-auto"
                      @click="turnOnBatchDeleteMode"
                    >
                      <i class="ri-delete-bin-6-line"></i>
                    </button>
                  </el-tooltip>
                </div>
              </th>
              <th class="min-w-48">聯繫人姓名</th>
              <th class="min-w-48">聯繫人電話</th>
              <th class="min-w-48">聯繫人職位</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in otherContactPerson"
              :key="item.id"
              class="group duration-100"
              @mouseover="item.showDelBtn = true"
              @mouseleave="item.showDelBtn = false"
            >
              <td>
                <div v-if="isBatchDeleteMode">
                  <label
                    class="w-full h-full cursor-pointer flex justify-center"
                  >
                    <el-checkbox
                      v-model="item.checked"
                      @change="handleCheckboxChange"
                    ></el-checkbox
                  ></label>
                </div>

                <div class="grid grid-cols-3" v-else>
                  <div class="col-span-1 col-start-2 items-center">
                    <!-- 序號 -->
                    <p class="group-hover:hidden">{{index + 1}}</p>
                    <!-- 刪除按鈕、複確認刪除對話框 -->
                    <el-popconfirm
                      title="該條記錄存在資料，資料刪除後將無法復原，確定刪除?"
                      confirm-button-text="刪除"
                      cancel-button-text="取消"
                      confirm-button-type="danger"
                      @confirm="confirmDelete(item)"
                      @cancel="cancelDelete(item)"
                      width="220px"
                    >
                      <template #reference>
                        <!-- 刪除按鈕 -->
                        <el-button
                          type="danger"
                          link
                          v-show="item.showDelBtn"
                          @click="deleteContact(item)"
                        >
                          <i class="ri-delete-bin-6-line"></i>
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                  <!--三個點點 按鈕-->
                  <div class="col-span-1 pt-1.5">
                    <el-dropdown trigger="click" placement="bottom-start">
                      <el-button
                        link
                        type="primary"
                        class="m-0 p-0 opacity-0 group-hover:opacity-100"
                      >
                        <i class="ri-more-2-fill"></i>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>複製到下一行</el-dropdown-item>
                          <el-dropdown-item>複製到最後一行</el-dropdown-item>
                          <el-dropdown-item>向上插入行</el-dropdown-item>
                          <el-dropdown-item>向下插入行</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </td>
              <td>
                <el-input v-model="item.contactName" />
              </td>
              <td>
                <el-input v-model="item.contactPhone" />
              </td>
              <td>
                <el-input v-model="item.contactTitle" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4">
        <div v-if="isAddBtnArea">
          <!-- 新增一行 -->
          <el-button
            key="primary"
            type="primary"
            link
            class="p-2"
            @click="addContact"
            :disabled="otherContactPerson.length == 200"
          >
            <i class="ri-add-fill"></i> 新增
          </el-button>
          <!-- 貼上新增 -->
          <el-button
            key="primary"
            type="primary"
            link
            class="p-2"
            @click="dialogOtherContactPerson = true"
            :disabled="otherContactPerson.length == 200"
          >
            <i class="ri-add-fill"></i> 貼上新增
          </el-button>
        </div>

        <div v-else>
          <el-button @click="cancelBatchDeleteMode">取消操作</el-button>
          <el-button @click="handelBatchSelected">刪除選中</el-button>
        </div>
      </div>
    </section>

    <!-- 讀取 -->
    <section
      v-else
      ref="fullscreenElement"
      :class="isFullscreen ? 'p-8' : ''"
      class="p-0 bg-white"
    >
      <table id="tableOtherContact" class="border border-gray-400">
        <thead class="sticky top-0 z-10">
          <tr class="group">
            <th class="min-w-20">
              <el-tooltip
                :content="isFullscreen ? '縮小' : '放大'"
                placement="top"
                :hide-after="10"
              >
                <i
                  :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
                  class="cursor-pointer hidden group-hover:block"
                  @click="toggleFullscreen"
                >
                </i>
              </el-tooltip>
            </th>
            <th class="min-w-48">聯繫人姓名</th>
            <th class="min-w-48">聯繫人電話</th>
            <th class="min-w-48">聯繫人職位</th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr v-for="(item, index) in otherContactInfo" :key="item.id">
            <td>
              {{ index+1 }}
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 燈箱:貼上新增 -->
    <el-dialog v-model="dialogOtherContactPerson" title="貼上新增" width="800">
      <el-divider class="el-divider" />
      <div class="p-4">
        <ul class="list-disc pl-4 mb-4">
          <li>
            使用快捷鍵 ctrl + v 將Excel內容直接貼上至表格中，使用 ctrl + z
            撤銷貼上操作
          </li>
          <li>已自動隱藏不支援貼上的欄位列，請注意對應欄位順序</li>
          <li>當前子表單總行數不可超過200行</li>
        </ul>

        <table
          @paste="handlePaste"
          class="w-full border border-gray-400 border-collapse"
        >
          <thead>
            <tr>
              <th>聯繫人姓名</th>
              <th>聯繫人電話</th>
              <th>聯繫人職位</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="h-8 min-h-8"></td>
              <td class="h-8 min-h-8"></td>
              <td class="h-8 min-h-8"></td>
            </tr>
            <tr>
              <td class="h-8 min-h-8"></td>
              <td class="h-8 min-h-8"></td>
              <td class="h-8 min-h-8"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <!-- 燈箱:提示訊息 -->
    <el-dialog
      v-model="dialogMessage"
      title="你確定要刪除選取的紀錄嗎？"
      width="500"
    >
      <span>
        你選取了
        {{ otherContactPerson.filter(item => item.checked).length }}
        條記錄，記錄中的資料刪除後將無法恢復</span
      >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogMessage = false">取消</el-button>
          <el-button type="danger" @click="deleteBatchSelected">
            確定
          </el-button>
        </div>
      </template>
    </el-dialog>
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
  name: String, // 聯繫人姓名
  phone: String, // 聯繫人手機
  title: String, // 聯繫人職位
  otherContactInfo: { // 其他聯繫人資料
    type: Array,
    required: false,
  },
});
const {
  name,
  phone,
  title,
  otherContactInfo,
} = props;

// 聯繫人資料 tab - 編輯
const contactName= ref(''); // 聯繫人姓名
const contactPhone= ref(''); // 聯繫人手機
const contactTitle= ref(''); // 聯繫人職位

// 其他聯繫人資料 - 編輯
const otherContactPerson = reactive([
  {
    id: Math.floor(new Date() / 1000),
    contactName: '', // 聯繫人姓名
    contactPhone: '', // 聯繫人電話
    contactTitle: '', // // 聯繫人職位
    showDelBtn: false, // 刪除按鈕: true 顯示、false 隱藏
    delBoxVisible: false, // 對話框: 刪除有資料的列，請 user 複確認
    checked: false, // checkbox for 大量刪除
  },
]);
// 新增一列 (其他聯繫人資料)
const addContact = () => {
  const newObj = {
    id: Math.floor(new Date() / 1000),
    contactName: '',
    contactPhone: '',
    contactTitle: '',
    showDelBtn: false, // 刪除按鈕 true 顯示、false 隱藏
    delBoxVisible: false, // 對話框:刪除有資料的列，請 user 複確認
    checked: false, // checkbox for 大量刪除
  }
  // 最多存 200 筆資料
  if (otherContactPerson.length <= 200){
    otherContactPerson.push(newObj);
  }
};
// 刪一列 (其他聯繫人資料)
const deleteContact = (item) => {
  const index = otherContactPerson.findIndex(person=> person.id == item.id);
  if (item.contactName =='' && item.contactPhone == '' && item.contactTitle =='') {
    item.delBoxVisible = false;
    // 空資料可以直接刪
    if (index !== -1) {
      otherContactPerson.splice(index, 1);
    }
  } else {
    // 有資料則要 user 複確認刪除
    item.delBoxVisible = true;
  }
};
// 取消刪除
const cancelDelete = (item) => {
  item.delBoxVisible = false
};
// 複確認刪除
const confirmDelete = (item) => {
  const index = otherContactPerson.findIndex(person=> person.id == item.id);
  if (index !== -1) {
    otherContactPerson.splice(index, 1);
  }
};

const isBatchDeleteMode = ref(false); // 大量刪除模式
const isAddBtnArea = ref(true); // for 切換按鈕區域: 新增列 or 取消操作
const isSelectAll = ref(false); // 全選 checkbox
const dialogOtherContactPerson = ref(false); // 其他聯繫人資料燈箱開關
const dialogMessage = ref(false); // 提示訊息

// 開啟大量刪除模式
const turnOnBatchDeleteMode = () =>{
  isBatchDeleteMode.value = true;
  isAddBtnArea.value = false;
};
// 取消大量刪除模式
const cancelBatchDeleteMode = () => {
  isBatchDeleteMode.value = false;
  isAddBtnArea.value = true;
};

// 判斷是否僅部分勾選
const isIndeterminate = computed(() => {
  const checkedItems = otherContactPerson.filter(item => item.checked).length;
  return checkedItems > 0 && checkedItems < otherContactPerson.length
})

// 全選打勾
const handleSelectAllChange = () => {
  otherContactPerson.forEach(item => {
    item.checked = isSelectAll.value;
  })
};

// 個別打勾
const handleCheckboxChange = () => {
  if (!isIndeterminate) {
    // 全數已勾
    isSelectAll.value = true;
  } else {
    // 僅部分打勾
    isSelectAll.value = false;
  }
};

// 判斷大量刪除
const handelBatchSelected = () => {
  const isAllEmpty = otherContactPerson.filter(item => item.checked).every((item) => {
    return (item.contactName == '' && item.contactPhone == '' && item.contactTitle == '' )
  });
  if (isAllEmpty) {
    deleteBatchSelected();
  } else {
    // 任一欄位有資料，請 user 複確認
    dialogMessage.value = true;
  }
};

// 執行大量刪除
const deleteBatchSelected = () => {
  for (let i = otherContactPerson.length - 1; i >= 0; i--) {
    if (otherContactPerson[i].checked) {
      otherContactPerson.splice(i, 1);
    }
  }
  dialogMessage.value = false;
};

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

// test 列為進階待辦-貼上新增
const handlePaste = () => {
  console.log('你在這個table貼上了')
};
</script>

<style lang="sass" scoped>
.el-divider
  margin: 0.5em 0
table
  @apply border border-collapse border-gray-200
  thead
    @apply text-slate-400 py-4 bg-gray-50 text-sm
    th
      @apply border border-collapse border-gray-200 py-2
  tbody
    tr
      td
        @apply border border-collapse border-gray-200 p-2
      .el-button
        @apply m-0 p-0 border-0
#tableOtherContact
  tbody
    @apply overflow-y-auto
    height: 20px
    tr
      @apply hover:bg-gray-50
      td:first-child
        @apply bg-white
</style>
