"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Package,
  Truck,
  Box,
  Receipt,
  Calculator,
  Building2,
  CreditCard,
  RefreshCw,
  Search,
  BarChart3,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { useTheme } from "@/lib/contexts/theme-context";
import { useI18n } from "@/lib/contexts/i18n-context";
import { getTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href?: string;
  children?: MenuItem[];
}

export function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const { theme } = useTheme();
  const { lang } = useI18n();
  const pathname = usePathname();
  const t = getTranslation(lang);

  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      label: t.sidebar.dashboard,
      icon: LayoutDashboard,
      href: "/",
    },
    {
      key: "orderManagement",
      label: t.sidebar.orderManagement,
      icon: ShoppingCart,
      children: [
        { key: "orderInput", label: t.sidebar.orderInput, icon: FileText, href: "/orders/input" },
        { key: "orderList", label: t.sidebar.orderList, icon: FileText, href: "/orders/list" },
        { key: "productionProduct", label: t.sidebar.productionProduct, icon: Package, href: "/orders/production" },
        { key: "receivingList", label: t.sidebar.receivingList, icon: Box, href: "/orders/receiving" },
        { key: "deliveryStatus", label: t.sidebar.deliveryStatus, icon: Truck, href: "/orders/delivery" },
      ],
    },
    {
      key: "productManagement",
      label: t.sidebar.productManagement,
      icon: Package,
      href: "/products",
    },
    {
      key: "chinaBusiness",
      label: t.sidebar.chinaBusiness,
      icon: Building2,
      children: [
        { key: "invoice", label: t.sidebar.invoice, icon: Receipt, href: "/china/invoice" },
        { key: "kbSettlement", label: t.sidebar.kbSettlement, icon: Calculator, href: "/china/kb-settlement" },
        { key: "vendorSettlement", label: t.sidebar.vendorSettlement, icon: Building2, href: "/china/vendor-settlement" },
      ],
    },
    {
      key: "depositConfirmation",
      label: t.sidebar.depositConfirmation,
      icon: CreditCard,
      href: "/deposit",
    },
    {
      key: "exchangeRefund",
      label: t.sidebar.exchangeRefund,
      icon: RefreshCw,
      href: "/exchange",
    },
    {
      key: "deliveryInquiry",
      label: t.sidebar.deliveryInquiry,
      icon: Search,
      href: "/delivery",
    },
    {
      key: "marketingReport",
      label: t.sidebar.marketingReport,
      icon: BarChart3,
      href: "/marketing",
    },
  ];

  const getLogoPath = () => {
    if (collapsed) {
      return theme === "dark"
        ? "/catsworks-icon-120-darkmode-tailwhite.png"
        : "/catsworks-icon-120.png";
    }
    return theme === "dark"
      ? "/catsworks-logo-darkmode-fixed.png"
      : "/catsworks-logo-h120.png";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[62px]" : "w-[205px]"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-4">
          {collapsed ? (
            <Image
              src={getLogoPath()}
              alt="CatsWorks"
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <Image
              src={getLogoPath()}
              alt="CatsWorks"
              width={120}
              height={32}
              className="object-contain"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2.5">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key}>
                {item.children ? (
                  <MenuGroup
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                    lang={lang}
                  />
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-asia-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Area */}
        <div className="border-t border-sidebar-border p-2.5">
          <button
            onClick={toggle}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-asia-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Menu className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {!collapsed && <span className="text-xs font-asia-medium">{lang === "ko" ? "접기" : "折叠"}</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

function MenuGroup({
  item,
  collapsed,
  pathname,
  lang,
}: {
  item: MenuItem;
  collapsed: boolean;
  pathname: string;
  lang: "ko" | "zh";
}) {
  const Icon = item.icon;
  const [open, setOpen] = React.useState(false);
  const hasActiveChild = item.children?.some((child) => child.href === pathname);

  React.useEffect(() => {
    if (hasActiveChild) {
      setOpen(true);
    }
  }, [hasActiveChild]);

  return (
    <div>
      <button
        onClick={() => !collapsed && setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-asia-medium transition-colors",
          hasActiveChild
            ? "bg-primary/10 text-primary border-l-2 border-primary"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>
            <ChevronRight
              className={cn(
                "h-3 w-3 shrink-0 transition-transform",
                open && "rotate-90"
              )}
              strokeWidth={1.5}
            />
          </>
        )}
      </button>
      {!collapsed && open && item.children && (
        <ul className="mt-1 space-y-1 pl-9">
          {item.children.map((child) => {
            const ChildIcon = child.icon;
            const isActive = pathname === child.href;
            return (
              <li key={child.key}>
                <Link
                  href={child.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-asia-light transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <ChildIcon className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{child.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
