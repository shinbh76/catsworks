"use client";

import { LayoutShell } from "@/components/layout-shell";
import { useLanguage } from "@/components/providers";
import {
  Users,
  Box,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function Home() {
  const { lang } = useLanguage();

  const STATS = [
    { labelKo: "총 사용자", labelZh: "总用户", value: "40,689", icon: Users, color: "bg-blue-500", trend: "+8.5%" },
    { labelKo: "총 주문", labelZh: "总订单", value: "10,293", icon: Box, color: "bg-yellow-500", trend: "+1.3%" },
    { labelKo: "총 매출", labelZh: "总销售额", value: "$89,000", icon: TrendingUp, color: "bg-emerald-500", trend: "+4.7%" },
    { labelKo: "대기 중", labelZh: "待处理", value: "2,040", icon: Clock, color: "bg-purple-500", trend: "-1.6%" },
  ];

  return (
    <LayoutShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-asia-bold">
            {lang === "ko" ? "대시보드" : "仪表盘"}
          </h1>
          <p className="text-muted-foreground font-asia-light text-sm">
            {lang === "ko" ? "오늘의 현황을 한눈에 확인하세요." : "一目了然地查看今天的状态。"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-asia-medium text-muted-foreground">
                    {lang === "ko" ? stat.labelKo : stat.labelZh}
                  </span>
                  <span className="text-2xl font-asia-bold">{stat.value}</span>
                </div>
                <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                  <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-asia-medium">
                <span className={stat.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}>
                  {stat.trend}
                </span>
                <span className="text-muted-foreground">
                  {lang === "ko" ? "지난달 대비" : "对比上月"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 h-[400px] flex items-center justify-center text-muted-foreground font-asia-light">
            Sales Chart Placeholder
          </div>
          <div className="bg-card border border-border rounded-xl p-6 h-[400px] flex items-center justify-center text-muted-foreground font-asia-light">
            Recent Activity Placeholder
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
