import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, ShoppingCart, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <PageHeader title={{ ko: "대시보드", zh: "仪表盘" }} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today Orders</span>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </CardTitle>
            <CardDescription>Daily order count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-asia-bold tracking-tight">128</div>
            <div className="mt-2 text-xs font-asia-light text-muted-foreground">
              +12.4% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Product Stock</span>
              <Package className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </CardTitle>
            <CardDescription>Available items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-asia-bold tracking-tight">2,431</div>
            <div className="mt-2 text-xs font-asia-light text-muted-foreground">
              +3 new arrivals
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue</span>
              <Wallet className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-asia-bold tracking-tight">₩ 8.24M</div>
            <div className="mt-2 text-xs font-asia-light text-muted-foreground">
              +5.1% MoM
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Trend</span>
              <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-asia-bold tracking-tight">+18%</div>
            <div className="mt-2 text-xs font-asia-light text-muted-foreground">
              Stable growth
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
          <CardDescription>더미 컨텐츠 (추후 차트/테이블로 확장)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            메뉴를 클릭하면 해당 페이지로 이동합니다. 핵심 페이지는 “사입목록(Order Lists)”과 “상품관리(Product Stock)”입니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


