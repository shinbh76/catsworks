"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Globe,
  Wallet,
  RefreshCw,
  Search,
  BarChart3,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface MenuItem {
  id: string;
  labelKo: string;
  labelZh: string;
  icon: React.ElementType;
  href?: string;
  children?: {
    id: string;
    labelKo: string;
    labelZh: string;
    href: string;
  }[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    labelKo: "대시보드",
    labelZh: "仪表盘",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    id: "orders",
    labelKo: "주문관리",
    labelZh: "订单管理",
    icon: ClipboardList,
    children: [
      { id: "order-input", labelKo: "주문입력", labelZh: "订单输入", href: "/orders/input" },
      { id: "order-lists", labelKo: "사입목록", labelZh: "采购列表", href: "/order-lists" },
      { id: "production", labelKo: "제작상품", labelZh: "制作商品", href: "/orders/production" },
      { id: "incoming", labelKo: "입고목록", labelZh: "入库列表", href: "/orders/incoming" },
      { id: "shipping-status", labelKo: "배송현황", labelZh: "发货状态", href: "/orders/shipping" },
    ],
  },
  {
    id: "products",
    labelKo: "상품관리",
    labelZh: "商品管理",
    icon: Package,
    href: "/product-stock",
  },
  {
    id: "china",
    labelKo: "중국업무",
    labelZh: "中国业务",
    icon: Globe,
    children: [
      { id: "invoice", labelKo: "인보이스", labelZh: "发票", href: "/china/invoice" },
      { id: "kb-settlement", labelKo: "K&B정산", labelZh: "K&B结算", href: "/china/kb" },
      { id: "vendor-settlement", labelKo: "업체정산", labelZh: "供应商结算", href: "/china/vendor" },
    ],
  },
  {
    id: "payment",
    labelKo: "입금확인",
    labelZh: "收款确认",
    icon: Wallet,
    href: "/payment",
  },
  {
    id: "refund",
    labelKo: "교환환불",
    labelZh: "退换货",
    icon: RefreshCw,
    href: "/refund",
  },
  {
    id: "tracking",
    labelKo: "배송조회",
    labelZh: "物流查询",
    icon: Search,
    href: "/tracking",
  },
  {
    id: "marketing",
    labelKo: "마케팅 리포트",
    labelZh: "营销报告",
    icon: BarChart3,
    href: "/marketing",
  },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getLogo = () => {
    if (theme === "dark") {
      return collapsed ? "/logo/catsworks-icon-120-darkmode-tailwhite.png" : "/logo/catsworks-logo-darkmode-fixed.png";
    }
    return collapsed ? "/logo/catsworks-icon-120.png" : "/logo/catsworks-logo-h120.png";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-50 flex flex-col",
        collapsed ? "w-[62px]" : "w-[205px]"
      )}
    >
      {/* Logo Area */}
      <div className="h-16 border-b border-sidebar-border flex items-center justify-center p-2">
        <img src={getLogo()} alt="Logo" className={cn("h-8 object-contain transition-all", collapsed ? "w-8" : "w-auto")} />
      </div>

      {/* Navigation Area */}
      <nav className="flex-1 overflow-y-auto p-2.5 custom-scrollbar">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openSubmenus.includes(item.id);
            const isActive = item.href === pathname || (hasChildren && item.children?.some(child => child.href === pathname));

            return (
              <li key={item.id} className="group">
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => !collapsed && toggleSubmenu(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors font-asia-medium text-sm",
                        isActive ? "bg-primary/10 text-primary border-l-2 border-primary rounded-l-none" : "text-muted-foreground hover:bg-muted",
                        collapsed && "justify-center px-0"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                        {!collapsed && <span>{lang === "ko" ? item.labelKo : item.labelZh}</span>}
                      </div>
                      {!collapsed && (
                        isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {!collapsed && isOpen && (
                      <ul className="mt-1 space-y-1">
                        {item.children?.map((child) => {
                          const isChildActive = child.href === pathname;
                          return (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block pl-11 pr-3 py-2 rounded-md transition-colors font-asia-light text-xs",
                                  isChildActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-muted"
                                )}
                              >
                                {lang === "ko" ? child.labelKo : child.labelZh}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-asia-medium text-sm",
                      isActive ? "bg-primary/10 text-primary border-l-2 border-primary rounded-l-none" : "text-muted-foreground hover:bg-muted",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                    {!collapsed && <span>{lang === "ko" ? item.labelKo : item.labelZh}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Area */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
        >
          {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}

