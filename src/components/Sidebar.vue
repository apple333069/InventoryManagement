<template>
	<!-- 桌面版側邊欄 -->
	<aside
		v-if="!isMobile"
		:class="[
			'bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto z-10 transition-all duration-300',
			isCollapse ? 'w-20' : 'w-64',
		]"
	>
		<div class="flex justify-end pt-2">
			<el-button @click="isCollapse = !isCollapse" circle>
				<i
					:class="[
						'text-gray-400 text-xl',
						isCollapse
							? 'ri-arrow-right-double-line'
							: 'ri-arrow-left-double-line',
					]"
				></i>
			</el-button>
		</div>
		<!-- 搜尋 -->
		<el-input v-show="!isCollapse" placeholder="輸入名稱" class="px-4 pt-1">
			<template #prefix>
				<i class="ri-search-line"></i>
			</template>
		</el-input>
		<!-- 菜單 -->
		<el-menu 
			default-active="首頁" 
			router 
			:collapse="isCollapse"
		>
			<template v-for="item in menuItems" :key="item.label">
				<el-sub-menu v-if="item.children" :index="item.label">
					<template #title>
						<i :class="item.iconClass" class="pr-2"></i>
						<span>{{ item.label }}</span>
					</template>
					<template v-for="child in item.children" :key="child.label">
						<el-sub-menu v-if="child.children" :index="child.label">
							<template #title>
								<span>{{ child.label }}</span>
							</template>
							<el-menu-item
								v-for="grandChild in child.children"
								:key="grandChild.label"
								:index="grandChild.path"
							>
								<i
									:class="grandChild.iconClass"
									:style="{ color: grandChild.color }"
									class="pr-2"
								></i>
								<span>{{ grandChild.label }}</span>
							</el-menu-item>
						</el-sub-menu>
						<el-menu-item v-else :index="child.path">
							<i
								:class="child.iconClass"
								:style="{ color: child.color }"
								class="pr-2"
							></i>
							<span>{{ child.label }}</span>
						</el-menu-item>
					</template>
				</el-sub-menu>
				<el-menu-item v-else :index="item.path">
					<i :class="item.iconClass" class="pr-2"></i>
					<span>{{ item.label }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</aside>

	<!-- 手機版下拉菜單 -->
	<div v-if="isMobile" class="md:hidden">
		<el-dropdown 
			@visible-change="handleDropdownVisibleChange"
			trigger="click"
			placement="bottom-start"
		>
			<el-button circle class="bg-white shadow-md">
				<i class="ri-menu-line text-gray-600 text-xl"></i>
			</el-button>
			<template #dropdown>
				<el-dropdown-menu class="max-h-96 overflow-y-auto">
					<template v-for="item in menuItems" :key="item.label">
						<template v-if="item.children">
							<el-dropdown-item disabled class="font-bold text-gray-900">
								<i :class="item.iconClass" class="pr-2"></i>
								{{ item.label }}
							</el-dropdown-item>
							<template v-for="child in item.children" :key="child.label">
								<template v-if="child.children">
									<el-dropdown-item disabled class="font-semibold text-gray-800 pl-6">
										{{ child.label }}
									</el-dropdown-item>
									<el-dropdown-item 
										v-for="grandChild in child.children"
										:key="grandChild.label"
										@click="navigateTo(grandChild.path)"
										class="pl-8"
									>
										<i
											:class="grandChild.iconClass"
											:style="{ color: grandChild.color }"
											class="pr-2"
										></i>
										{{ grandChild.label }}
									</el-dropdown-item>
								</template>
								<el-dropdown-item v-else @click="navigateTo(child.path)" class="pl-6">
									<i
										:class="child.iconClass"
										:style="{ color: child.color }"
										class="pr-2"
									></i>
									{{ child.label }}
								</el-dropdown-item>
							</template>
							<el-dropdown-item divided></el-dropdown-item>
						</template>
						<el-dropdown-item v-else @click="navigateTo(item.path)">
							<i :class="item.iconClass" class="pr-2"></i>
							{{ item.label }}
						</el-dropdown-item>
					</template>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const isCollapse = ref(false);
const isMobile = ref(false);

// 檢測是否為手機版
const checkMobile = () => {
	isMobile.value = window.innerWidth < 768;
};

// 監聽螢幕大小變化
const handleResize = () => {
	checkMobile();
};

// 手機版下拉菜單導航
const navigateTo = (path) => {
	if (path) {
		router.push(path);
	}
};

// 處理下拉菜單顯示狀態變化
const handleDropdownVisibleChange = (visible) => {
	// 可以在這裡處理下拉菜單的顯示/隱藏邏輯
};

onMounted(() => {
	checkMobile();
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});

// 暴露給父組件的方法（保持兼容性）
defineExpose({
	toggleMobileMenu: () => {}
});
const menuItems = ref([
	{ label: '首頁', iconClass: 'ri-home-5-line', path: '/' },
	{
		label: '經營看板',
		iconClass: 'ri-dashboard-line',
		children: [
			{
				label: '庫存統計',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/board/inventory',
			},
			{
				label: '倉庫經營',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/board/warehouse',
			},
			{
				label: '銷售訂單',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/board/sales',
			},
			{
				label: '財務收支',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/board/financial',
			},
		],
	},
	{
		label: '基礎數據',
		iconClass: 'ri-line-chart-line',
		children: [
			{
				label: '產品',
				children: [
					{
						label: '產地資料',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/product/origin',
					},
					{
						label: '產品分類',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/product/category',
					},
					{
						label: '產品資料',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/product/details',
					},
					{
						label: '產品銷售價格',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/product/price',
					},
					{
						label: '產品列表',
						iconClass: 'ri-funds-box-line',
						color: '#d946ef',
						path: '/product/list',
					},
				],
			},
			{
				label: '倉庫',
				children: [
					{
						label: '倉庫資料',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/warehouse/details',
					},
					{
						label: '倉位資料',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/warehouse/locations',
					},
				],
			},
		],
	},
	{
		label: '客戶管理',
		iconClass: 'ri-user-2-line',
		children: [
			{
				label: '客戶資料',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/customer/details',
			},
			{
				label: '跟進紀錄',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/customer/follow_up',
			},
			{
				label: '客戶分析',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/customer/analysis',
			},
		],
	},
	{
		label: '銷售管理',
		iconClass: 'ri-store-line',
		children: [
			{
				label: '報價單',
				iconClass: 'ri-list-check-2',
				color: '#fb923c',
				path: '/sales/quotation',
			},
			{
				label: '銷售訂單',
				iconClass: 'ri-list-check-2',
				color: '#fb923c',
				path: '/sales/orders',
			},
			{
				label: '銷售出庫',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/sales/dispatch',
			},
			{
				label: '銷售退貨',
				iconClass: 'ri-list-check-2',
				color: '#fb923c',
				path: '/sales/return',
			},
			{
				label: '銷售換貨',
				iconClass: 'ri-list-check-2',
				color: '#fb923c',
				path: '/sales/exchanges',
			},
			{
				label: '銷售統計',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/sales/statistics',
			},
		],
	},
	{
		label: '庫存管理',
		iconClass: 'ri-folder-line',
		children: [
			{
				label: '入庫管理',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/inventory/inbound',
			},
			{
				label: '出庫管理',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/inventory/outbound',
			},
			{
				label: '庫存調撥',
				iconClass: 'ri-list-check-2',
				color: '#fb923c',
				path: '/inventory/transfer',
			},
			{
				label: '庫存盤點',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/inventory/count',
			},
			{
				label: '產品出入庫統計',
				iconClass: 'ri-funds-box-line',
				color: '#d946ef',
				path: '/inventory/statistics',
			},
		],
	},
	{
		label: '財務管理',
		iconClass: 'ri-money-dollar-circle-line',
		children: [
			{
				label: '應收應付明細',
				children: [
					{
						label: '應收 - 銷售出庫',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/financial/outbound',
					},
					{
						label: '應收 - 銷售退貨',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/financial/return',
					},
					{
						label: '應付 - 採購入庫',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/financial/inbound',
					},
					{
						label: '應付 - 採購退貨',
						iconClass: 'ri-file-list-2-line',
						color: '#60a5fa',
						path: '/financial/refund',
					},
				],
			},
			{
				label: '收款單',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/financial/receipts',
			},
			{
				label: '付款單',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/financial/payments',
			},
			{
				label: '資金帳戶',
				iconClass: 'ri-file-list-2-line',
				color: '#60a5fa',
				path: '/financial/fund',
			},
		],
	},
]);
</script>
<style scoped>
.el-menu {
	border-right: none;
}
</style>
