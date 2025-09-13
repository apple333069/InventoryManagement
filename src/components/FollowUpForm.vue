<!-- 客戶跟進紀錄(填表) -->
<template>
  <div>
    <h2 class="text-lg font-bold text-primary border-b-4 border-blue-100">客戶跟進紀錄</h2>
    <el-form label-position="top" class="p-6 font-bold">
      <!-- 僅編輯 -->
      <div v-if="edit">
        <!-- 上排 -->
        <div class="w-full">
          <el-form-item label="跟進內容記錄" :required="true">
            <el-input
              :class="{ 'w-full': isDialog, 'xl:max-w-2xl': !isDialog }"
              :rows="5"
              type="textarea"
              v-model="followUpContentText"
            />
          </el-form-item>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <!-- 下排左測欄位 -->
          <div class="col-span-2">
            <el-form-item label="選擇客戶" :required="true">
              <!-- 按鈕點開燈箱 -->
              <el-button
                v-if="selectedClient == ''"
                plain
                @click="dialogSelectClient = true"
                class="border-dashed w-full"
                :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              >
                <span><i class="ri-database-2-line px-1"></i>選擇資料</span>
              </el-button>

              <div
                v-else
                @click="dialogSelectClient = true"
                class="border-dashed border border-gray-200 text-left cursor-pointer"
                :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              >
                <el-button
                  v-if="selectedClient"
                  type="primary"
                  text
                  bg
                  :icon="Close"
                  @click.stop="selectedClient = ''"
                  >{{ selectedClient }}
                </el-button>
              </div>
            </el-form-item>

            <el-form-item label="客戶編碼" class="w-full">
              <el-input v-model="clientNo" value="暫無內容" disabled />
            </el-form-item>

            <el-form-item
              label="跟進方式"
              :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              :required="true"
            >
              <el-select
                v-model="followUpType"
                placeholder="請選擇"
                class="w-full"
                filterable
                remote
                reserve-keyword
                remote-show-suffix
              >
                <el-option
                  v-for="item in followUpTypeOptions"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="跟進人">
              <!-- 按鈕點開燈箱 -->
              <el-button
                v-if="selectedTeamMemberRadio == ''"
                plain
                @click="dialogSelectMember = true"
                class="border-dashed"
                :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              >
                <span><i class="ri-add-line px-1"></i>選擇成員</span>
              </el-button>
              <div
                v-else
                @click="dialogSelectMember = true"
                class="border-dashed border border-gray-200 text-left cursor-pointer"
                :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              >
                <el-tag size="large" type="primary" class="inline-block">{{
                  selectedTeamMemberRadio
                }}</el-tag>
              </div>
            </el-form-item>
          </div>

          <!-- 下排右側欄位 -->
          <div class="col-span-2 pl-1">
            <el-form-item label="客戶名稱" class="w-full">
              <el-input v-model="clientName" value="暫無內容" disabled />
            </el-form-item>

            <el-form-item label="跟進時間" class="w-full" :required="true">
              <el-date-picker
                v-model="time"
                type="datetime"
                placeholder="選擇日期和時間"
                :style="{ width: '374px' }"
              />
            </el-form-item>

            <el-form-item
              label="跟進內容"
              :class="{ 'w-full': isDialog, 'xl:w-1/2': !isDialog }"
              :required="true"
            >
              <el-select
                v-model="followUpContentType"
                placeholder="請選擇"
                class="w-full"
                filterable
                remote
                reserve-keyword
                remote-show-suffix
              >
                <el-option
                  v-for="item in followUpContentTypeOptions"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="銷售歸屬部門" class="w-full">
              <el-input v-model="salesDepartment" value="暫無內容" disabled />
            </el-form-item>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- 上排 -->
        <div class="w-full">
          <el-form-item label="跟進內容記錄">
            <el-input class="w-full" v-model="data.followupRecord" disabled />
          </el-form-item>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <!-- 下排左測欄位 -->
          <div class="col-span-2">
            <el-form-item label="選擇客戶" class="w-full">
              <el-input class="invisible" v-model="data.clientName" disabled />
            </el-form-item>

            <el-form-item label="客戶編碼" class="w-full">
              <el-input v-model="data.clientNo" disabled />
            </el-form-item>

            <el-form-item label="跟進方式" class="w-full">
              <el-input v-model="data.followupMethod" disabled />
            </el-form-item>

            <el-form-item label="跟進人">
              <div class="w-full bg-gray-50 rounded-sm border">
                <el-tag type="primary" class="inline-block ml-1">{{ data.followupPerson }}</el-tag>
              </div>
            </el-form-item>

            <el-form-item label="外勤打卡">
              <el-input v-model="data.fieldWorkCheckIn" disabled />
            </el-form-item>
          </div>

          <!-- 下排右側欄位 -->
          <div class="col-span-2 pl-1">
            <el-form-item label="客戶名稱" class="w-full">
              <el-input v-model="data.clientName" disabled />
            </el-form-item>

            <el-form-item label="跟進時間" class="w-full">
              <el-input v-model="data.followupTime" disabled />
            </el-form-item>

            <el-form-item label="跟進內容" class="w-full">
              <el-input v-model="data.followupContentType" disabled />
            </el-form-item>

            <el-form-item label="銷售歸屬部門" class="w-full">
              <el-input v-model="data.salesDepartment" disabled />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <!-- 燈箱-選擇客戶 -->
    <el-dialog v-model="dialogSelectClient" width="800">
      <template #header>
        <div class="flex flex-col items-start">
          <span class="text-lg font-bold text-gray-500 px-2 pt-2">選擇資料</span>
        </div>
      </template>
      <hr class="w-full border-t border-gray-300" />
      <ClientSelector :tableData="tableData" :columns="columns" @choose="handleChooseClient" />
    </el-dialog>

    <!-- 燈箱-選擇跟進人 -->
    <el-dialog v-model="dialogSelectMember" title="成員列表" width="800">
      <div>
        <div class="w-full border-dashed border-2 my-2 p-1.5 min-h-12">
          <!-- 選定的成員顯示區 -->
          <el-button
            v-if="selectedTeamMemberRadio"
            type="primary"
            text
            bg
            :icon="Close"
            @click="selectedTeamMemberRadio = ''"
            >{{ selectedTeamMemberRadio }}
          </el-button>
        </div>
        <el-tabs v-model="dialogSelectMemberActiveName" class="demo-tabs border-b-2">
          <el-tab-pane label="成員" name="1">
            <div>
              <el-input
                v-model="selectSelectMemberDept"
                style="width: 100%"
                placeholder="搜尋部門"
                class="my-2"
                clearable
              />
              <div class="grid grid-cols-4">
                <!-- 左，部門樹狀結構 -->
                <div class="col-span-2 h-72 min-h-72 overflow-y-auto border-r-2">
                  <el-tree
                    ref="treeRef"
                    style="max-width: 800px"
                    class="filter-tree"
                    :data="departmentTree"
                    default-expand-all
                    :filter-node-method="filterNode"
                    @node-click="handleNodeClick"
                  >
                    <template #default="{ node }">
                      <span
                        :style="{
                          color: selectedDepartment === node.label ? '#409EFF' : 'inherit',
                        }"
                      >
                        {{ node.label }}
                      </span>
                    </template>
                  </el-tree>
                </div>
                <!-- 右，可選成員 -->
                <div class="col-span-2 pl-4">
                  <el-radio-group
                    v-if="filteredMembers.length !== 0"
                    v-model="selectedTeamMemberRadio"
                  >
                    <div class="flex flex-col justify-start">
                      <el-radio
                        v-for="member in filteredMembers"
                        :key="member.value"
                        :value="member.value"
                      >
                        {{ member.name }}
                      </el-radio>
                    </div>
                  </el-radio-group>

                  <div v-else class="flex items-center justify-center h-72">
                    <p>沒有可選成員</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="當前使用者" name="2">
            <div class="flex items-center justify-center h-72">
              <p>沒有可選成員</p>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="dialog-footer pt-3.5 flex justify-end">
          <el-button @click="dialogSelectMember = false">取消</el-button>
          <el-button type="primary" @click="dialogSelectMember = false"> 確定 </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
  import { ElTree } from 'element-plus';
  import { Close } from '@element-plus/icons-vue';
  import ClientSelector from '@/components/ClientSelector.vue';
  // 定義 props
  const props = defineProps({
    edit: {
      type: Boolean, // true 編輯、false 僅讀取
      required: true,
    },
    // 判斷此元件是不是在燈箱內
    isDialog: {
      type: Boolean,
      default: false, // true 在內，false 不在內
    },
    // 資料
    data: {
      type: Object,
      default: () => ({}),
    },
    // 選擇客戶-欄位
    columns: {
      type: Array,
      default: () => [],
    },
    // 選擇客戶-表格資料
    tableData: {
      type: Array,
      default: () => [],
    },
  });
  const { edit, isDialog, data, columns, tableData } = props;
  const followUpContentText = ref(''); // 跟進內容紀錄
  // 選擇客戶用
  const selectedClient = ref(''); // 選擇的客戶
  const dialogSelectClient = ref(false); // 燈箱開關

  // 取得客戶名稱
  const handleChooseClient = (value) => {
    selectedClient.value = value;
    dialogSelectClient.value = false;
  };
  const clientNo = ref(''); // 客戶編碼

  // 跟進方式
  const followUpType = ref('');
  const followUpTypeOptions = ref([
    {
      value: '1',
      label: '上門拜訪',
    },
    {
      value: '2',
      label: '電話拜訪',
    },
    {
      value: '3',
      label: '微信溝通',
    },
    {
      value: '4',
      label: '其他',
    },
  ]);

  // 跟進人
  const selectedTeamMemberRadio = ref(''); // 選定跟進人
  const dialogSelectMember = ref(false); // 燈箱開關
  const selectSelectMemberDept = ref(''); // 搜尋部門關鍵字
  const dialogSelectMemberActiveName = ref('1'); // 切換 tab
  // 跟進人燈箱
  const teamMemberDiv = ref('軟件有限公司');
  const treeRef = ref(null);
  const selectedDepartment = ref(''); // 選定的部門(成員列表)
  // 各部門成員
  const departments = ref([
    {
      department: '生產部',
      members: [
        { value: '王小明', name: '王小明' },
        { value: '張璿', name: '張璿' },
      ],
    },
    {
      department: '銷售一部',
      members: [
        { value: '張三', name: '張三' },
        { value: '李四', name: '李四' },
        { value: 'Adam', name: 'Adam' },
      ],
    },
  ]);
  const filteredMembers = computed(() => {
    if (selectedDepartment.value === teamMemberDiv.value || !selectedDepartment.value) {
      // 如果選定的是軟件有限公司或沒有選定部門，返回所有成員
      return departments.value.flatMap((department) => department.members);
    } else {
      // 根據選定的部門過濾成員
      const department = departments.value.find(
        (dept) => dept.department === selectedDepartment.value
      );
      return department ? department.members : [];
    }
  });
  const searchDeptOnly = ref('');
  const treeDeptRef = ref('');
  // 跟進人燈箱-部門樹狀結構
  const departmentTree = ref([
    {
      id: 1,
      label: '軟件有限公司',
      children: [
        {
          id: '1-1',
          label: '生產部',
        },
        {
          id: '1-2',
          label: '銷售部',
          children: [
            {
              id: '1-2-1',
              label: '銷售一部',
            },
            {
              id: '1-2-2',
              label: '銷售二部',
            },
          ],
        },
        {
          id: 4,
          label: '研發部',
        },
        {
          id: 5,
          label: '市場部',
        },
        {
          id: 6,
          label: '採購部',
        },
        {
          id: 7,
          label: '財務部',
        },
        {
          id: 8,
          label: '會計出納',
        },
        {
          id: 9,
          label: '測試部',
        },
        {
          id: 10,
          label: '行政部',
        },
      ],
    },
  ]);
  const handleNodeClick = (node, data) => {
    selectedDepartment.value = node.label;
  };
  // 跟進人燈箱-搜尋部門
  const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.includes(value);
  };

  const clientName = ref(''); // 客戶名稱
  const time = ref(''); // 跟進時間
  const followUpContentType = ref(''); // 跟進內容
  const followUpContentTypeOptions = ref([
    {
      value: '1',
      label: '初次溝通',
    },
    {
      value: '2',
      label: '需求溝通',
    },
    {
      value: '3',
      label: '方案確認',
    },
    {
      value: '4',
      label: '報價',
    },
    {
      value: '5',
      label: '合約簽署',
    },
    {
      value: '6',
      label: '銷售回訪',
    },
  ]);
  const salesDepartment = ref(''); // 銷售歸屬部門

  // 銷售負責人燈箱-監聽搜尋部門(僅新增資料)
  watch(selectSelectMemberDept, function (val) {
    treeRef.value.filter(val);
  });

  // 銷售歸屬部門燈箱-監聽搜尋部門(僅新增資料)
  watch(searchDeptOnly, function (val) {
    treeDeptRef.value.filter(val);
  });
</script>
