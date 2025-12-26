"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { useI18n } from "@/lib/contexts/i18n-context";
import { getTranslation } from "@/lib/i18n";
import { Download, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  colors: string[];
}

const mockProducts: Product[] = [
  {
    id: "1",
    image: "/placeholder.jpg",
    name: "크로셰 펀칭 A라인 스커트",
    category: "스커트",
    price: 7770,
    stock: 15,
    colors: ["#FFFFFF", "#000000", "#FF6B6B"],
  },
  {
    id: "2",
    image: "/placeholder.jpg",
    name: "베이직 트라이앵글 탑",
    category: "상의",
    price: 3150,
    stock: 8,
    colors: ["#4ECDC4", "#95E1D3"],
  },
  {
    id: "3",
    image: "/placeholder.jpg",
    name: "데님 와이드 팬츠",
    category: "하의",
    price: 12000,
    stock: 22,
    colors: ["#0000FF", "#87CEEB"],
  },
];

export default function ProductStockPage() {
  const { lang } = useI18n();
  const t = getTranslation(lang);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-asia-bold">
          {t.sidebar.productManagement}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              type="search"
              placeholder={t.common.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9 font-asia-light"
            />
          </div>
          <PageHeader
            title=""
            actions={[
              {
                label: t.common.excelDownload,
                icon: Download,
                onClick: () => console.log("Excel download"),
              },
            ]}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-asia-bold text-xs">Image</TableHead>
              <TableHead className="font-asia-bold text-xs">Product Name</TableHead>
              <TableHead className="font-asia-bold text-xs">Category</TableHead>
              <TableHead className="font-asia-bold text-xs text-right">Price</TableHead>
              <TableHead className="font-asia-bold text-xs text-center">Stock</TableHead>
              <TableHead className="font-asia-bold text-xs">Available Color</TableHead>
              <TableHead className="font-asia-bold text-xs text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-12 w-12 rounded bg-muted" />
                </TableCell>
                <TableCell className="font-asia-light">{product.name}</TableCell>
                <TableCell className="font-asia-light">{product.category}</TableCell>
                <TableCell className="text-right font-asia-light">
                  ₩ {product.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-center font-asia-light">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {product.colors.map((color, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="h-5 w-5 rounded-full border border-border"
                              style={{ backgroundColor: color }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-asia-light">{color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => console.log("Edit", product.id)}
                          >
                            <Edit className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-asia-light">편집</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => console.log("Delete", product.id)}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-asia-light">삭제</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}

