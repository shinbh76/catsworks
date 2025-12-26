'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import {
  LayoutDashboard,
  ShoppingCart,
  FileInput,
  ClipboardList,
  Factory,
  PackageCheck,
  Truck,
  Package,
  Globe,
  FileSpreadsheet,
  Calculator,
  Building2,
  CreditCard,
  RefreshCw,
  Search,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MenuItem {
  id: string;
  labelKo: string;
  labelZh: string;
  icon: React.ElementType;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    labelKo: '대시보드',
    labelZh: '仪表盘',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    id: 'order-management',
    labelKo: '주문관리',
    labelZh: '订单管理',
    icon: ShoppingCart,
    children: [
      { id: 'order-input', labelKo: '주문입력', labelZh: '订单录入', icon: FileInput, href: '/order-management/order-input' },
      { id: 'purchase-list', labelKo: '사입목록', labelZh: '采购清单', icon: ClipboardList, href: '/order-management/purchase-list' },
      { id: 'production-items', labelKo: '제작상품', labelZh: '生产商品', icon: Factory, href: '/order-management/production-items' },
      { id: 'receiving-list', labelKo: '입고목록', labelZh: '入库清单', icon: PackageCheck, href: '/order-management/receiving-list' },
      { id: 'shipping-status', labelKo: '배송현황', labelZh: '发货状态', icon: Truck, href: '/order-management/shipping-status' },
    ],
  },
  {
    id: 'product-management',
    labelKo: '상품관리',
    labelZh: '商品管理',
    icon: Package,
    href: '/product-management',
  },
  {
    id: 'china-work',
    labelKo: '중국업무',
    labelZh: '中国业务',
    icon: Globe,
    children: [
      { id: 'invoice', labelKo: '인보이스', labelZh: '发票', icon: FileSpreadsheet, href: '/china-work/invoice' },
      { id: 'kb-settlement', labelKo: 'K&B정산', labelZh: 'K&B结算', icon: Calculator, href: '/china-work/kb-settlement' },
      { id: 'vendor-settlement', labelKo: '업체정산', labelZh: '供应商结算', icon: Building2, href: '/china-work/vendor-settlement' },
    ],
  },
  {
    id: 'deposit-confirmation',
    labelKo: '입금확인',
    labelZh: '收款确认',
    icon: CreditCard,
    href: '/deposit-confirmation',
  },
  {
    id: 'exchange-refund',
    labelKo: '교환환불',
    labelZh: '换货退款',
    icon: RefreshCw,
    href: '/exchange-refund',
  },
  {
    id: 'shipping-tracking',
    labelKo: '배송조회',
    labelZh: '物流查询',
    icon: Search,
    href: '/shipping-tracking',
  },
  {
    id: 'marketing-report',
    labelKo: '마케팅 리포트',
    labelZh: '营销报告',
    icon: BarChart3,
    href: '/marketing-report',
  },
];

export function Sidebar() {
  const { lang, theme, sidebarCollapsed, toggleSidebar } = useStore();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['order-management']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (href?: string, children?: MenuItem[]) => {
    if (href && pathname === href) return true;
    if (children) {
      return children.some(child => pathname === child.href);
    }
    return false;
  };

  const getLabel = (item: MenuItem) => lang === 'ko' ? item.labelKo : item.labelZh;

  // Logo paths based on theme and collapsed state
  const logoSrc = sidebarCollapsed
    ? (theme === 'dark' ? '/logo/catsworks-icon-120-darkmode-tailwhite.png' : '/logo/catsworks-icon-120.png')
    : (theme === 'dark' ? '/logo/catsworks-logo-darkmode-fixed.png' : '/logo/catsworks-logo-h120.png');

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen flex flex-col',
          'bg-sidebar border-r border-sidebar-border',
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-[62px]' : 'w-[205px]'
        )}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-2">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src={logoSrc}
              alt="CatsWorks"
              width={sidebarCollapsed ? 40 : 160}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2.5 scrollbar-thin">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  // Parent menu with children
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => !sidebarCollapsed && toggleMenu(item.id)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-md',
                            'font-asia-medium text-sm',
                            'text-sidebar-foreground',
                            'hover:bg-muted transition-colors',
                            isActive(undefined, item.children) && 'bg-primary/10 text-primary border-l-2 border-primary',
                          )}
                        >
                          <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                          {!sidebarCollapsed && (
                            <>
                              <span className="flex-1 text-left truncate">{getLabel(item)}</span>
                              <ChevronDown
                                className={cn(
                                  'w-4 h-4 transition-transform',
                                  expandedMenus.includes(item.id) && 'rotate-180'
                                )}
                                strokeWidth={1.5}
                              />
                            </>
                          )}
                        </button>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right" className="font-asia-medium">
                          {getLabel(item)}
                        </TooltipContent>
                      )}
                    </Tooltip>

                    {/* Children */}
                    {!sidebarCollapsed && expandedMenus.includes(item.id) && (
                      <ul className="mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href || '#'}
                              className={cn(
                                'flex items-center gap-3 pl-9 pr-3 py-2 rounded-md',
                                'font-asia-light text-xs',
                                'text-sidebar-foreground',
                                'hover:bg-muted transition-colors',
                                pathname === child.href && 'bg-primary/10 text-primary border-l-2 border-primary'
                              )}
                            >
                              <span className="truncate">{getLabel(child)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  // Single menu item
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href || '#'}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-md',
                          'font-asia-medium text-sm',
                          'text-sidebar-foreground',
                          'hover:bg-muted transition-colors',
                          isActive(item.href) && 'bg-primary/10 text-primary border-l-2 border-primary'
                        )}
                      >
                        <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                        {!sidebarCollapsed && (
                          <span className="truncate">{getLabel(item)}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {sidebarCollapsed && (
                      <TooltipContent side="right" className="font-asia-medium">
                        {getLabel(item)}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Area */}
        <div className="border-t border-sidebar-border p-2.5">
          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-asia-medium text-sm truncate text-sidebar-foreground">Admin</p>
                <p className="font-asia-light text-xs truncate text-muted-foreground">admin@catsworks.com</p>
              </div>
            </div>
          )}

          {/* Collapse Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md',
                  'text-sidebar-foreground hover:bg-muted transition-colors',
                  'font-asia-light text-xs'
                )}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                    <span>{lang === 'ko' ? '메뉴 접기' : '折叠菜单'}</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            {sidebarCollapsed && (
              <TooltipContent side="right" className="font-asia-medium">
                {lang === 'ko' ? '메뉴 펼치기' : '展开菜单'}
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}

