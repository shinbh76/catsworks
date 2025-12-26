'use client';

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
    labelZh: '收入',
    value: '₩24.5M',
    change: '+8.7%',
    icon: CreditCard,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export default function DashboardPage() {
  const { lang } = useStore();

  return (
    <div>
      <PageHeader
        titleKo="대시보드"
        titleZh="仪表盘"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-asia-light text-sm text-muted-foreground">
                    {lang === 'ko' ? stat.labelKo : stat.labelZh}
                  </p>
                  <p className="font-asia-bold text-2xl mt-1">{stat.value}</p>
                  <p className={`font-asia-light text-xs mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change} {lang === 'ko' ? '지난주 대비' : '与上周相比'}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="font-asia-bold text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" strokeWidth={1.5} />
              {lang === 'ko' ? '주문 추이' : '订单趋势'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground font-asia-light text-sm">
              {lang === 'ko' ? '차트 영역' : '图表区域'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="font-asia-bold text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" strokeWidth={1.5} />
              {lang === 'ko' ? '카테고리별 매출' : '分类销售'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground font-asia-light text-sm">
              {lang === 'ko' ? '차트 영역' : '图表区域'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="font-asia-bold text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" strokeWidth={1.5} />
            {lang === 'ko' ? '최근 활동' : '最近活动'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="font-asia-medium text-sm">
                    {lang === 'ko' ? `주문 #100${i} 처리됨` : `订单 #100${i} 已处理`}
                  </p>
                  <p className="font-asia-light text-xs text-muted-foreground">
                    {i * 5} {lang === 'ko' ? '분 전' : '分钟前'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

