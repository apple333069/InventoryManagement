import { createRouter, createWebHashHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';

const brandName = '進銷存系統 InventoryManagement';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'index',
			meta: {
				title: `首頁 - ${brandName}`,
				showSidebar: true,
			},
			component: IndexView,
		},
		{
		  path: '/login',
		  name: 'login',
		  meta: {
		    title: `登入 - ${brandName}`,
		    showSidebar: false,
		  },
		  component: () => import('@/views/LoginView.vue'),
		},
		{
			path: '/board/inventory',
			name: 'board_inventory',
			meta: {
				title: `看板庫存統計 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/board/InventoryView.vue'),
		},
		{
			path: '/board/warehouse',
			name: 'board_warehouse',
			meta: {
				title: `看板倉庫經營 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/board/WarehouseView.vue'),
		},
		{
			path: '/board/sales',
			name: 'board_sales',
			meta: {
				title: `看板銷售訂單 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/board/SalesView.vue'),
		},
		{
			path: '/board/financial',
			name: 'board_financial',
			meta: {
				title: `看板財務收支 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/board/FinancialView.vue'),
		},
		// S 端-供應商
		{
			path: '/supplier/login',
			name: 'supplier_login',
			meta: {
				title: `登入 - ${brandName}`,
				showSidebar: false,
			},
			component: () => import('@/views/supplier/LoginView.vue'),
		},
		{
			path: '/product/origin',
			name: 'product_origin',
			meta: {
				title: `產品產地資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/product/OriginView.vue'),
		},
		{
			path: '/product/category',
			name: 'product_category',
			meta: {
				title: `產品產品分類 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/product/CategoryView.vue'),
		},
		{
			path: '/product/details',
			name: 'product_details',
			meta: {
				title: `產品產品資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/product/DetailsView.vue'),
		},
		{
			path: '/product/price',
			name: 'product_price',
			meta: {
				title: `產品銷售價格 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/product/PriceView.vue'),
		},
		{
			path: '/product/list',
			name: 'product_list',
			meta: {
				title: `產品產品列表 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/product/ListView.vue'),
		},
		{
			path: '/warehouse/details',
			name: 'warehouse_details',
			meta: {
				title: `倉庫資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/warehouse/DetailsView.vue'),
		},
		{
			path: '/warehouse/locations',
			name: 'warehouse_locations',
			meta: {
				title: `倉位資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/warehouse/LocationsView.vue'),
		},
		{
			path: '/customer/details',
			name: 'customer_details',
			meta: {
				title: `客戶資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/customer/DetailsView.vue'),
		},
		{
			path: '/customer/follow_up',
			name: 'follow_up',
			meta: {
				title: `跟進資料 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/customer/FollowUpView.vue'),
		},
		{
			path: '/customer/analysis',
			name: 'analysis',
			meta: {
				title: `客戶分析 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/customer/AnalysisView.vue'),
		},
		{
			path: '/sales/quotation',
			name: 'sales_quotation',
			meta: {
				title: `報價單 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/QuotationView.vue'),
		},
		{
			path: '/sales/orders',
			name: 'sales_orders',
			meta: {
				title: `銷售訂單 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/OrdersView.vue'),
		},
		{
			path: '/sales/dispatch',
			name: 'sales_dispatch',
			meta: {
				title: `銷售出庫 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/DispatchView.vue'),
		},
		{
			path: '/sales/return',
			name: 'sales_return',
			meta: {
				title: `銷售退貨 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/ReturnView.vue'),
		},
		{
			path: '/sales/exchanges',
			name: 'sales_exchanges',
			meta: {
				title: `銷售換貨 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/ExchangesView.vue'),
		},
		{
			path: '/sales/statistics',
			name: 'sales_statistics',
			meta: {
				title: `銷售統計 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/sales/StatisticsView.vue'),
		},
		{
			path: '/inventory/inbound',
			name: 'inventory_inbound',
			meta: {
				title: `入庫管理 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/inventory/InboundView.vue'),
		},
		{
			path: '/inventory/outbound',
			name: 'inventory_outbound',
			meta: {
				title: `出庫管理 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/inventory/OutboundView.vue'),
		},
		{
			path: '/inventory/transfer',
			name: 'inventory_transfer',
			meta: {
				title: `庫存調撥 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/inventory/TransferView.vue'),
		},
		{
			path: '/inventory/count',
			name: 'inventory_count',
			meta: {
				title: `庫存盤點 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/inventory/CountView.vue'),
		},
		{
			path: '/inventory/statistics',
			name: 'inventory_statistics',
			meta: {
				title: `產品出入庫統計 - ${brandName}`,
				showSidebar: true,
			},
			component: () => import('@/views/inventory/StatisticsView.vue'),
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			// 如果有儲存的滾動位置，則返回該位置（例如按下瀏覽器「返回」時）
			return savedPosition;
		} else {
			// 否則滾動到頁面頂部
			return { top: 0 };
		}
	},
});

export default router;
