<!-- 客戶跟進紀錄-點 table 開燈箱-->
<template>
  <div ref="fullscreenElement" :class="isFullscreen ? 'p-8' : ''" class="p-4 bg-white">
    <div class="flex justify-between">
      <div class="flex items-center" :class="{ invisible: !isButtonArea }">
        <el-button type="primary" @click="dialogAddRecordVisible = true"
          ><i class="ri-add-line"></i>新增</el-button
        >
        <el-button text> <i class="ri-download-2-line"></i>匯入 </el-button>
        <el-dropdown trigger="click">
          <el-button text>
            <i class="ri-upload-2-line mr-1"></i>匯出
            <i class="ri-arrow-down-s-fill"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>篩選後的資料</el-dropdown-item>
              <el-dropdown-item>全部資料</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click">
          <el-button text>
            <i class="ri-delete-bin-line mr-1"></i>刪除
            <i class="ri-arrow-down-s-fill"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>篩選後的資料</el-dropdown-item>
              <el-dropdown-item>全部資料</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click">
          <el-button text>
            <i class="ri-time-line mr-1"></i>操作記錄
            <i class="ri-arrow-down-s-fill"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>批次修改記錄</el-dropdown-item>
              <el-dropdown-item disabled>批次列印範本記錄</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 右上功能icon -->
      <div :class="edit ? '' : 'ml-auto'" class="ricon flex items-center">
        <!-- 搜尋 -->
        <el-input placeholder="輸入關鍵字" class="mr-5">
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
          <template #suffix>
            <!-- el-dropdown 包裹 checkbox-group -->
            <el-dropdown trigger="click">
              <i class="ri-arrow-down-s-line"></i>
              <template #dropdown>
                <el-dropdown-menu class="w-48 max-h-72 overflow-y-auto">
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                    class="allCheckbox pl-3"
                  >
                    全選
                  </el-checkbox>
                  <el-checkbox-group
                    v-model="selectedColumns"
                    @change="handleCheckedColumnsChange"
                    class="flex flex-col space-y-1 pl-3 border-t"
                  >
                    <el-checkbox v-for="column in columns" :key="column.prop" :value="column.prop">
                      {{ column.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-input>
        <el-tooltip content="篩選條件" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-filter-line"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="顯示欄位" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-layout-grid-line"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="排序" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-sort-asc"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="分組" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-list-indefinite"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="更新" placement="bottom" :hide-after="10">
          <el-button text>
            <i class="ri-refresh-line cursor-pointer"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip :content="isFullscreen ? '縮小' : '放大'" placement="bottom" :hide-after="10">
          <el-button text>
            <i
              :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
              class="cursor-pointer"
              @click="toggleFullscreen"
            >
            </i>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :border="border"
      :header-cell-style="headerCellStyle"
      class="my-2"
      @row-click="handleRowClick"
    >
      <template #empty>
        <el-empty description="暫無資料" />
      </template>
      <!-- 全選列 -->
      <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
      <template v-for="column in columns" :key="column.prop || column.label">
        <!-- 無子欄位的普通顯示 -->
        <el-table-column
          v-if="!column.children"
          :prop="column.prop"
          :label="column.label"
          :sortable="column.sortable || false"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :align="column.align"
          :header-align="column.headerAlign"
        >
          <!-- 針對產品圖片提供自定義顯示 -->
          <template v-if="column.prop === 'pdImage'" #default="scope">
            <img :src="scope.row[column.prop]" alt="產品圖片" style="width: 50px; height: auto" />
          </template>
          <template v-else-if="column.slot" #default="scope">
            <slot :name="column.slot" v-bind="scope"></slot>
          </template>
        </el-table-column>

        <!-- 有子欄位時，顯示子資料 -->
        <el-table-column
          v-else
          :label="column.label"
          :header-align="column.headerAlign || 'center'"
        >
          <template v-for="child in column.children" :key="child.prop || child.label">
            <el-table-column
              :prop="child.prop"
              :label="child.label"
              :sortable="child.sortable"
              :min-width="child.minWidth || null"
              :header-align="child.headerAlign || 'center'"
              :align="child.align || 'left'"
            >
              <template v-if="$slots[child.prop]" #default="scope">
                <slot :name="child.prop" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-config-provider :locale="zhTw">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>

    <!-- Dialog 用來顯示點擊的資料 -->
    <el-dialog
      v-model="dialogVisible"
      v-model:visible="dialogVisible"
      width="60%"
      center
      @close="resetDialog"
    >
      <template #header>
        <div class="flex flex-col items-start">
          <span class="text-lg font-bold text-gray-500 px-2 pt-2">{{ dialogTitle }}</span>
        </div>
      </template>
      <hr class="w-full border-t border-gray-300" />
      <!-- 内容 -->
      <div class="dialog-content">
        <div class="grid grid-cols-12">
          <!-- 左區 -->
          <div class="col-span-9 max-h-screen overflow-y-auto">
            <!-- icon 區 -->
            <div class="w-full grid grid-cols-12 border-b-2 py-2">
              <div class="col-span-10 flex">
                <el-tooltip content="顯示欄位" placement="bottom" :hide-after="10">
                  <el-button text>
                    <i class="ri-layout-grid-line"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="分享" placement="bottom" :hide-after="10">
                  <el-button text>
                    <i class="ri-share-line"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="列印" placement="bottom" :hide-after="10">
                  <el-button text> <i class="ri-printer-line px-1"></i>列印 </el-button>
                </el-tooltip>
                <el-tooltip content="複製" placement="bottom" :hide-after="10">
                  <el-button text> <i class="ri-file-copy-line px-1"></i>複製 </el-button>
                </el-tooltip>
                <el-tooltip content="編輯" placement="bottom" :hide-after="10">
                  <el-button text> <i class="ri-edit-line px-1"></i> 編輯 </el-button>
                </el-tooltip>
                <el-tooltip content="刪除" placement="bottom" :hide-after="10">
                  <el-button text> <i class="ri-delete-bin-line px-1"></i>刪除 </el-button>
                </el-tooltip>
              </div>
              <div class="col-span-2 justify-end">
                <el-pagination layout="prev, pager, next" :total="1" />
              </div>
            </div>

            <div class="px-2">
              <!-- 客戶跟進紀錄 -->
              <div class="pt-6">
                <FollowUpForm :edit="false" :data="selectedItem" :key="selectedItemKey" />
                <el-divider class="py-0 my-0" />
                <div class="grid grid-cols-4 gap-3 p-4 ml-2">
                  <div class="col-span-2 flex">
                    <p class="w-1/3">送出人</p>
                    <p class="w-2/3">{{ submitter }}</p>
                  </div>
                  <div class="col-span-2 flex">
                    <p class="w-1/3">送出時間</p>
                    <p class="w-2/3">{{ submitTime }}</p>
                  </div>
                  <div class="col-span-2 flex">
                    <p class="w-1/3">更新時間</p>
                    <p class="w-2/3">{{ updateTime }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 右區 -->
          <div class="col-span-3 bg-gray-100 max-h-screen">
            <el-tabs v-model="activeName" class="demo-tabs px-4 py-2" @tab-click="handleClick">
              <el-tab-pane label="資料記錄" name="1">
                <div class="w-full max-h-[880px] h-[720px] overflow-y-auto">
                  <div class="bg-white w-full p-2.5 rounded-md mb-2">
                    <div class="flex justify-end">
                      <small class="p-1">2024-01-08 16:55</small>
                    </div>
                    <div class="grid grid-cols-6 py-1">
                      <el-tag size="large" type="primary" class="p-1">張璿</el-tag>
                      <p class="col-start-6 p-1 text-nowrap">建立</p>
                    </div>
                    <p class="">軟件有限公司</p>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="評論" name="2">
                <div class="w-full relative">
                  <div
                    class="flex flex-col justify-center items-center max-h-[880px] h-[720px] overflow-y-auto"
                  >
                    <i class="ri-box-3-line text-5xl text-blue-400"></i>
                    <p class="p-4 text-gray-400">暫無評論</p>
                  </div>
                  <div class="w-full absolute bottom-0">
                    <div v-if="isComment">
                      <el-input
                        v-model="comment"
                        style="width: 100%"
                        :rows="4"
                        type="textarea"
                        placeholder="Ctrl + Enter 發送評論"
                      />
                      <div class="grid grid-cols-6 items-center">
                        <!-- @ tag人員 -->
                        <div class="col-span-1">
                          <el-button link text type="primary"><i class="ri-at-line"></i></el-button>
                        </div>
                        <!-- 上傳 file -->
                        <div class="col-span-1">
                          <el-upload
                            v-model:file-list="fileList"
                            class="upload-demo w-full"
                            action="#"
                            :limit="1"
                            :show-file-list="false"
                            :auto-upload="false"
                          >
                            <el-button link text type="primary"
                              ><i class="ri-upload-2-line"></i
                            ></el-button>
                          </el-upload>
                        </div>

                        <div class="col-span-4 text-right pt-1">
                          <el-button @click="isComment = false" :disabled="comment.length == 0"
                            >發送</el-button
                          >
                        </div>
                      </div>
                    </div>
                    <el-button v-else class="w-full" @click="isComment = true">
                      發表評論
                    </el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 燈箱-新增跟進紀錄 -->
    <el-dialog
      v-model="dialogAddRecordVisible"
      v-model:visible="dialogAddRecordVisible"
      width="40%"
      center
      @close="resetDialogAddRecord"
    >
      <template #header>
        <div class="flex flex-col items-start">
          <span class="text-lg font-bold text-gray-500 px-2 pt-2">跟進紀錄</span>
        </div>
      </template>
      <hr class="w-full border-t border-gray-300" />
      <!-- 内容 -->
      <div class="dialog-content px-2">
        <div class="py-6">
          <FollowUpForm
            :edit="true"
            :isDialog="true"
            :columns="pickClientColumns"
            :tableData="pickClientData"
          />
        </div>
      </div>
      <template #footer>
        <div
          class="flex flex-start pl-8 pt-4 dialog-footer box-border border-dashed border-t-2 bg-white rounded-b-md"
        >
          <el-button type="primary" class="w-24">送出</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ElConfigProvider } from 'element-plus';
  import { ElDialog } from 'element-plus';
  import zhTw from '@/locale/zh-tw';
  import FollowUpForm from '@/components/FollowUpForm.vue';

  // 定義 props
  const props = defineProps({
    // 是否顯示按鈕區塊
    isButtonArea: {
      type: Boolean,
      default: true,
    },
    // 表格資料
    tableData: {
      type: Array,
      required: true,
    },
    // 表格欄位
    columns: {
      type: Array,
      required: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    // 表頭顏色
    headerCellStyle: {
      type: Object,
      default: () => ({
        backgroundColor: '#f5f7f8',
        color: '#606266',
        fontWeight: 'bold',
      }),
    },
    // 選擇客戶-欄位
    pickClientColumns: {
      type: Array,
      default: () => [],
    },
    // 選擇客戶-表格資料
    pickClientData: {
      type: Array,
      default: () => [],
    },
  });

  const { edit, columns, tableData, pickClientColumns, pickClientData } = props;
  const currentPage = ref(3);
  const pageSize = ref(10);
  const size = ref('default');
  const background = ref(false);
  const disabled = ref(false);
  const fullscreenElement = ref(null);
  const isFullscreen = ref(false);
  const handleSizeChange = () => {
    console.log(`items per page`);
  };
  const handleCurrentChange = () => {
    console.log(`current page: `);
  };
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
  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const selectedItem = ref(null);
  const selectedItemKey = ref(0); // 強迫元件 FollowUpForm  更新內容
  const submitter = ref(''); // 送出人
  const submitTime = ref(''); // 送出時間
  const updateTime = ref(''); // 更新時間

  const openDialog = (item) => {
    dialogTitle.value = item.clientName;
    selectedItem.value = item;
    selectedItemKey.value++; // 強迫元件 FollowUpForm 更新內容
    dialogVisible.value = true;
    submitter.value = item.submitter;
    submitTime.value = item.submitTime;
    updateTime.value = item.updateTime;
  };

  const resetDialog = () => {
    selectedItem.value = null;
    submitter.value = '';
    submitTime.value = '';
    updateTime.value = '';
  };

  // 行點擊事件
  const handleRowClick = (row) => {
    openDialog(row);
  };

  // 全選相關狀態
  const checkAll = ref(false);
  const isIndeterminate = ref(false);
  // 已選中的項目
  const selectedColumns = ref([]);

  // 處理全選變化
  const handleCheckAllChange = (val) => {
    selectedColumns.value = val ? props.columns.map((col) => col.prop) : [];
    isIndeterminate.value = false;
  };

  // 處理單個多選框變化
  const handleCheckedColumnsChange = (value) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === props.columns.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < props.columns.length;
  };

  // 新增-跟進紀錄
  const dialogAddRecordVisible = ref(false);
  const resetDialogAddRecord = () => {
    // 關閉燈箱
  };

  // 燈箱右邊-資料評論的 tab
  const activeName = ref('1');
  const handleClick = (tab, event) => {
    console.log(tab, event);
  };
  const comment = ref(''); // 評論
  const isComment = ref(false); // 評論開關
</script>
<style scoped>
  .el-button {
    padding: 8px 10px;
  }
  textarea.el-textarea__inner {
    outline: none;
  }
</style>
