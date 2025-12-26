"use client";

import * as React from "react";
import { Download, RotateCcw } from "lucide-react";

import { OrderListsTable } from "@/components/order-lists/order-lists-table";
import { PageHeader } from "@/components/page-header";
import { useAppUi } from "@/components/providers/app-ui-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function OrderListsPage() {
  const { lang } = useAppUi();

  const [date, setDate] = React.useState("");
  const [orderType, setOrderType] = React.useState("all");
  const [orderStatus, setOrderStatus] = React.useState("all");

  const t =
    lang === "ko"
      ? {
          title: "사입목록",
          date: "Date",
          orderType: "Order Type",
          orderStatus: "Order Status",
          reset: "Reset Filter",
          all: "All",
        }
      : {
          title: "采购列表",
          date: "日期",
          orderType: "订单类型",
          orderStatus: "订单状态",
          reset: "重置筛选",
          all: "全部",
        };

  function onReset() {
    setDate("");
    setOrderType("all");
    setOrderStatus("all");
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "사입목록", zh: "采购列表" }}
        actions={[
          {
            key: "excelDownload",
            label: { ko: "엑셀 다운로드", zh: "Excel 下载" },
            icon: Download,
          },
        ]}
      />

      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-4">
            <div className="space-y-1">
              <div className="text-xs font-asia-medium text-muted-foreground">
                {t.date}
              </div>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-asia-medium text-muted-foreground">
                {t.orderType}
              </div>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className={cn(
                  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
                  "font-asia-light",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                )}
              >
                <option value="all">{t.all}</option>
                <option value="self">{lang === "ko" ? "자사" : "自有"}</option>
                <option value="vendor">
                  {lang === "ko" ? "업체" : "供应商"}
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-asia-medium text-muted-foreground">
                {t.orderStatus}
              </div>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className={cn(
                  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
                  "font-asia-light",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                )}
              >
                <option value="all">{t.all}</option>
                <option value="pending">
                  {lang === "ko" ? "대기" : "待处理"}
                </option>
                <option value="processing">
                  {lang === "ko" ? "진행" : "处理中"}
                </option>
                <option value="done">{lang === "ko" ? "완료" : "完成"}</option>
              </select>
            </div>

            <div className="flex justify-start md:justify-end">
              <Button variant="ghost" size="sm" onClick={onReset} title={t.reset}>
                <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                {t.reset}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <OrderListsTable />
        </CardContent>
      </Card>
    </div>
  );
}


