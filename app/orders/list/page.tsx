"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { COLUMNS, ROWS, type OrderListColumn, type OrderListRow } from "@/lib/data/order-lists";
import { useI18n } from "@/lib/contexts/i18n-context";
import { getTranslation } from "@/lib/i18n";
import { Download, Calendar, Filter, RotateCcw, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GROUP_COLORS: Record<string, string> = {
  기타: "bg-muted/30",
  "자사 정보": "bg-primary/5",
  "업체 정보": "bg-blue-500/5",
  "구매 정보": "bg-green-500/5",
  예약정보: "bg-yellow-500/5",
};

const GROUP_BORDERS: Record<string, string> = {
  "자사 정보": "border-l border-primary/20",
  "업체 정보": "border-l border-blue-500/20",
  "구매 정보": "border-l border-green-500/20",
  예약정보: "border-l border-yellow-500/20",
};

export default function OrderListPage() {
  const { lang } = useI18n();
  const t = getTranslation(lang);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const getColumnLabel = (column: OrderListColumn) => {
    return lang === "ko" ? column.labelKo : column.labelZh;
  };

  const getGroupColumns = (group: string) => {
    return COLUMNS.filter((col) => col.group === group);
  };

  const groups = Array.from(new Set(COLUMNS.map((col) => col.group)));

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatCurrency = (value: string | number, currency: "₩" | "￥") => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";
    return `${currency} ${num.toLocaleString()}`;
  };

  return (
    <AppShell>
      <PageHeader
        title={t.sidebar.orderList}
        actions={[
          {
            label: t.common.excelDownload,
            icon: Download,
            onClick: () => console.log("Excel download"),
          },
        ]}
      />

      {/* Filter Bar */}
      <div className="mb-6 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm font-asia-medium">{t.common.date}</span>
            <Input
              type="date"
              className="h-8 w-40 font-asia-light"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm font-asia-medium">{t.common.orderType}</span>
            <Select>
              <SelectTrigger className="h-8 w-32 font-asia-light">
                <SelectValue placeholder={lang === "ko" ? "전체" : "全部"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{lang === "ko" ? "전체" : "全部"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-asia-medium">{t.common.orderStatus}</span>
            <Select>
              <SelectTrigger className="h-8 w-32 font-asia-light">
                <SelectValue placeholder={lang === "ko" ? "전체" : "全部"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{lang === "ko" ? "전체" : "全部"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto font-asia-medium"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            <span className="ml-2">{t.common.resetFilter}</span>
          </Button>
        </div>
      </div>

      {/* Group Legend */}
      <div className="mb-4 flex flex-wrap gap-2">
        {groups.map((group) => (
          <Badge
            key={group}
            variant="outline"
            className={cn(
              "font-asia-medium text-xs",
              GROUP_COLORS[group]
            )}
          >
            {group}
          </Badge>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                  {COLUMNS.map((column, index) => {
                  const groupColor = GROUP_COLORS[column.group];
                  const groupBorder = GROUP_BORDERS[column.group];
                  const prevColumn = index > 0 ? COLUMNS[index - 1] : null;
                  const isGroupStart = !prevColumn || prevColumn.group !== column.group;
                  const isFirstColumn = column.key === "ca";

                  return (
                    <TableHead
                      key={column.key}
                      className={cn(
                        "sticky top-0 z-10 bg-card font-asia-bold text-xs",
                        groupColor,
                        isGroupStart && groupBorder,
                        isFirstColumn && "left-0 z-20 bg-card dark:bg-card shadow-[2px_0_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_0_4px_rgba(0,0,0,0.2)]",
                        (column.key === "cg" || column.key === "co") && "text-right",
                        (column.key === "cp" || column.key === "cq" || column.key === "cr") && "text-center"
                      )}
                      title={column.group}
                    >
                      {getColumnLabel(column)}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {COLUMNS.map((column, colIndex) => {
                    const value = row[column.key] || "";
                    const groupColor = GROUP_COLORS[column.group];
                    const groupBorder = GROUP_BORDERS[column.group];
                    const prevColumn = colIndex > 0 ? COLUMNS[colIndex - 1] : null;
                    const isGroupStart = !prevColumn || prevColumn.group !== column.group;
                    const isFirstColumn = column.key === "ca";

                    return (
                      <TableCell
                        key={column.key}
                        className={cn(
                          "font-asia-light text-xs",
                          groupColor,
                          isGroupStart && groupBorder,
                          isFirstColumn && "sticky left-0 z-10 bg-card dark:bg-card shadow-[2px_0_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_0_4px_rgba(0,0,0,0.2)]",
                          (column.key === "cg" || column.key === "co") && "text-right",
                          (column.key === "cp" || column.key === "cq" || column.key === "cr") && "text-center"
                        )}
                      >
                        {column.key === "cb" ? (
                          <div className="h-8 w-8 rounded bg-muted" />
                        ) : column.key === "cc" || column.key === "ch" ? (
                          <div className="flex items-center gap-1">
                            <a
                              href={String(value)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                              <span className="max-w-[120px] truncate">{String(value)}</span>
                            </a>
                          </div>
                        ) : column.key === "cg" ? (
                          formatCurrency(value, "₩")
                        ) : column.key === "co" ? (
                          formatCurrency(value, "￥")
                        ) : column.key === "caa" ? (
                          <div className="flex items-center gap-1 font-mono">
                            <span>{String(value)}</span>
                            <button
                              onClick={() => handleCopy(String(value), `${rowIndex}-${column.key}`)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {copiedKey === `${rowIndex}-${column.key}` ? (
                                <Check className="h-3 w-3" strokeWidth={1.5} />
                              ) : (
                                <Copy className="h-3 w-3" strokeWidth={1.5} />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="truncate">{String(value)}</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-asia-light text-muted-foreground">
          {lang === "ko" ? `총 ${ROWS.length}개 항목` : `共 ${ROWS.length} 项`}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="font-asia-medium">
            {lang === "ko" ? "이전" : "上一页"}
          </Button>
          <Button variant="outline" size="sm" className="font-asia-medium">
            {lang === "ko" ? "다음" : "下一页"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

