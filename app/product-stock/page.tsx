"use client";

import * as React from "react";
import {
  Download,
  Pencil,
  Search,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { useAppUi } from "@/components/providers/app-ui-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PRODUCT_STOCK_ROWS } from "@/lib/mock/product-stock";
import { cn } from "@/lib/utils";

function formatPriceKRW(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export default function ProductStockPage() {
  const { lang } = useAppUi();
  const [q, setQ] = React.useState("");

  const t =
    lang === "ko"
      ? {
          title: "상품관리",
          search: "검색",
          image: "Image",
          name: "Product Name",
          category: "Category",
          price: "Price",
          piece: "Piece",
          colors: "Available Color",
          action: "Action",
        }
      : {
          title: "商品库存",
          search: "搜索",
          image: "图片",
          name: "商品名称",
          category: "分类",
          price: "价格",
          piece: "库存",
          colors: "可选颜色",
          action: "操作",
        };

  const rows = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return PRODUCT_STOCK_ROWS;
    return PRODUCT_STOCK_ROWS.filter((r) =>
      `${r.id} ${r.name} ${r.category}`.toLowerCase().includes(query),
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "상품관리", zh: "商品库存" }}
        actions={[
          {
            key: "excelDownload",
            label: { ko: "엑셀 다운로드", zh: "Excel 下载" },
            icon: Download,
          },
        ]}
        rightSlot={
          <div className="relative w-[280px] max-w-[42vw]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <Input
              placeholder={t.search}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto rounded-lg scrollbar-thin">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-muted/40 dark:bg-muted/20">
                  <th className="sticky top-0 z-10 w-[72px] border-b px-4 py-3 text-left text-xs font-asia-bold text-muted-foreground">
                    {t.image}
                  </th>
                  <th className="sticky top-0 z-10 border-b px-4 py-3 text-left text-xs font-asia-bold text-muted-foreground">
                    {t.name}
                  </th>
                  <th className="sticky top-0 z-10 w-[140px] border-b px-4 py-3 text-left text-xs font-asia-bold text-muted-foreground">
                    {t.category}
                  </th>
                  <th className="sticky top-0 z-10 w-[120px] border-b px-4 py-3 text-right text-xs font-asia-bold text-muted-foreground">
                    {t.price}
                  </th>
                  <th className="sticky top-0 z-10 w-[100px] border-b px-4 py-3 text-right text-xs font-asia-bold text-muted-foreground">
                    {t.piece}
                  </th>
                  <th className="sticky top-0 z-10 w-[170px] border-b px-4 py-3 text-left text-xs font-asia-bold text-muted-foreground">
                    {t.colors}
                  </th>
                  <th className="sticky top-0 z-10 w-[110px] border-b px-4 py-3 text-right text-xs font-asia-bold text-muted-foreground">
                    {t.action}
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-accent/40">
                    <td className="border-b px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                        <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                    </td>
                    <td className="border-b px-4 py-3">
                      <div className="text-sm font-asia-medium leading-5">
                        {row.name}
                      </div>
                      <div className="mt-0.5 text-xs font-asia-light text-muted-foreground">
                        {row.id}
                      </div>
                    </td>
                    <td className="border-b px-4 py-3 text-sm font-asia-light">
                      {row.category}
                    </td>
                    <td className="border-b px-4 py-3 text-right text-sm font-asia-light tabular-nums">
                      ₩ {formatPriceKRW(row.price)}
                    </td>
                    <td className="border-b px-4 py-3 text-right text-sm font-asia-light tabular-nums">
                      {row.piece}
                    </td>
                    <td className="border-b px-4 py-3">
                      <div className="flex items-center gap-2">
                        {row.colors.map((c) => (
                          <div
                            key={c.name}
                            title={c.name}
                            className={cn(
                              "h-3 w-3 rounded-full ring-1 ring-border",
                              "transition-transform hover:scale-110",
                            )}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="border-b px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="iconSm"
                          className="h-8 w-8"
                          title={lang === "ko" ? "편집" : "编辑"}
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="iconSm"
                          className="h-8 w-8 text-rose-600 hover:text-rose-600 dark:text-rose-400"
                          title={lang === "ko" ? "삭제" : "删除"}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


