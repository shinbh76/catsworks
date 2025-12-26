import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Banknote,
  Boxes,
  Calculator,
  ClipboardList,
  FileText,
  Globe2,
  LayoutDashboard,
  Package,
  PenLine,
  RefreshCcw,
  Search,
  ShoppingCart,
  Truck,
  Warehouse,
  Building2,
} from "lucide-react";

export type AppLang = "ko" | "zh";

export type NavLeaf = {
  type: "leaf";
  key: string;
  href: string;
  icon: LucideIcon;
  label: Record<AppLang, string>;
};

export type NavGroup = {
  type: "group";
  key: string;
  icon: LucideIcon;
  label: Record<AppLang, string>;
  children: NavLeaf[];
};

export type NavItem = NavLeaf | NavGroup;

export const NAV_ITEMS: NavItem[] = [
  {
    type: "leaf",
    key: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    label: { ko: "대시보드", zh: "仪表盘" },
  },
  {
    type: "group",
    key: "orders",
    icon: ShoppingCart,
    label: { ko: "주문관리", zh: "订单管理" },
    children: [
      {
        type: "leaf",
        key: "orderInput",
        href: "/orders/order-input",
        icon: PenLine,
        label: { ko: "주문입력", zh: "订单录入" },
      },
      {
        type: "leaf",
        key: "orderLists",
        href: "/orders/order-lists",
        icon: ClipboardList,
        label: { ko: "사입목록", zh: "采购列表" },
      },
      {
        type: "leaf",
        key: "productionProducts",
        href: "/orders/production-products",
        icon: Package,
        label: { ko: "제작상품", zh: "制作商品" },
      },
      {
        type: "leaf",
        key: "inboundLists",
        href: "/orders/inbound-lists",
        icon: Warehouse,
        label: { ko: "입고목록", zh: "入库列表" },
      },
      {
        type: "leaf",
        key: "shippingStatus",
        href: "/orders/shipping-status",
        icon: Truck,
        label: { ko: "배송현황", zh: "配送状态" },
      },
    ],
  },
  {
    type: "leaf",
    key: "productStock",
    href: "/product-stock",
    icon: Boxes,
    label: { ko: "상품관리", zh: "商品库存" },
  },
  {
    type: "group",
    key: "china",
    icon: Globe2,
    label: { ko: "중국업무", zh: "中国业务" },
    children: [
      {
        type: "leaf",
        key: "invoice",
        href: "/china/invoice",
        icon: FileText,
        label: { ko: "인보이스", zh: "发票" },
      },
      {
        type: "leaf",
        key: "kbSettlement",
        href: "/china/kb-settlement",
        icon: Calculator,
        label: { ko: "K&B정산", zh: "K&B结算" },
      },
      {
        type: "leaf",
        key: "vendorSettlement",
        href: "/china/vendor-settlement",
        icon: Building2,
        label: { ko: "업체정산", zh: "供应商结算" },
      },
    ],
  },
  {
    type: "leaf",
    key: "deposit",
    href: "/deposit-check",
    icon: Banknote,
    label: { ko: "입금확인", zh: "入金确认" },
  },
  {
    type: "leaf",
    key: "exchangeRefund",
    href: "/exchange-refund",
    icon: RefreshCcw,
    label: { ko: "교환환불", zh: "退换/退款" },
  },
  {
    type: "leaf",
    key: "tracking",
    href: "/tracking",
    icon: Search,
    label: { ko: "배송조회", zh: "物流查询" },
  },
  {
    type: "leaf",
    key: "marketingReport",
    href: "/marketing-report",
    icon: BarChart3,
    label: { ko: "마케팅 리포트", zh: "营销报表" },
  },
];

export const NAV_LEAVES: NavLeaf[] = NAV_ITEMS.flatMap((it) =>
  it.type === "leaf" ? [it] : it.children,
);


