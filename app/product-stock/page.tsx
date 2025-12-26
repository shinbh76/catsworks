"use client";

import * as React from "react";
import { useLanguage } from "@/components/providers";
import { LayoutShell } from "@/components/layout-shell";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Download,
  Edit2,
  Trash2,
  MoreVertical,
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Apple Watch Series 4", category: "Digital Product", price: "$690.00", stock: 63, colors: ["#FF0000", "#0000FF", "#00FF00"] },
  { id: 2, name: "Microsoft Surface Book", category: "Digital Product", price: "$1290.00", stock: 13, colors: ["#000000", "#FFFFFF"] },
  { id: 3, name: "iPad Pro 11-inch", category: "Digital Product", price: "$799.00", stock: 25, colors: ["#CCCCCC", "#333333"] },
  { id: 4, name: "Magic Keyboard", category: "Accessories", price: "$299.00", stock: 52, colors: ["#FFFFFF"] },
  { id: 5, name: "AirPods Pro", category: "Accessories", price: "$249.00", stock: 48, colors: ["#FFFFFF"] },
];

export default function ProductStockPage() {
  const { lang } = useLanguage();

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-asia-bold">
            {lang === "ko" ? "상품관리" : "商品管理"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-asia-light">
            <span>{lang === "ko" ? "상품관리" : "商品管理"}</span>
            <span>&gt;</span>
            <span className="text-foreground font-asia-medium">{lang === "ko" ? "재고 현황" : "库存现状"}</span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder={lang === "ko" ? "상품 검색..." : "搜索商品..."}
              className="w-full bg-card border border-border rounded-md pl-10 pr-4 py-2 text-sm font-asia-light focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-asia-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              {lang === "ko" ? "상품 추가" : "添加商品"}
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-input bg-card hover:bg-accent rounded-md text-sm font-asia-medium transition-colors">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              {lang === "ko" ? "엑셀 다운로드" : "Excel 下载"}
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "이미지" : "图片"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "상품명" : "商品名"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "카테고리" : "类别"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "가격" : "价格"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "재고" : "库存"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "가능 색상" : "可用颜色"}</th>
                  <th className="px-6 py-4 font-asia-bold text-sm text-muted-foreground uppercase tracking-wider">{lang === "ko" ? "관리" : "管理"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PRODUCTS.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center overflow-hidden border border-border">
                        <img src={`https://picsum.photos/seed/${product.id}/48/48`} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-asia-medium text-sm">{product.name}</td>
                    <td className="px-6 py-4 font-asia-light text-sm text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 font-asia-medium text-sm">{product.price}</td>
                    <td className="px-6 py-4 font-asia-light text-sm">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-border/50"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors" title={lang === "ko" ? "수정" : "修改"}>
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-red-100 text-red-500 transition-colors" title={lang === "ko" ? "삭제" : "删除"}>
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
            <span className="text-xs text-muted-foreground font-asia-light">Showing 1-5 of 120 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">&lt;</button>
              <button className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">1</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">2</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">3</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

