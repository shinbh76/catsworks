'use client';

import { StoreProvider } from '@/lib/store';
import { AppShell } from '@/components/layout/app-shell';
import { useStore } from '@/lib/store';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  TrendingUp,
  Users,
  BarChart3,
  Activity,
} from 'lucide-react';

const stats = [
  {
    id: 'orders',
    labelKo: '총 주문',
    labelZh: '总订单',
    value: '1,284',
    change: '+12.5%',
    icon: ShoppingCart,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'products',
    labelKo: '상품 수',
    labelZh: '商品数',
    value: '847',
    change: '+3.2%',
    icon: Package,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'shipping',
    labelKo: '배송 중',
    labelZh: '运输中',
    value: '142',
    change: '-2.1%',
    icon: Truck,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'revenue',
    labelKo: '매출',
    labelZh: '销售额',
    value: '₩12.4M',
    change: '+8.3%',
    icon: CreditCard,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

function DashboardContent() {
  const { lang } = useStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title={{ ko: '대시보드', zh: '仪表盘' }}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {lang === 'ko' ? stat.labelKo : stat.labelZh}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change} {lang === 'ko' ? '전월 대비' : '对比上月'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <AppShell>
        <DashboardContent />
      </AppShell>
    </StoreProvider>
  );
}
