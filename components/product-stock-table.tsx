'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { productStockData, ProductRow } from '@/lib/data';
import {
  Pencil,
  Trash2,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ProductStockTable() {
  const { lang, t } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null);

  // Filter products by search query
  const filteredProducts = productStockData.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (product: ProductRow) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, would delete the product
    console.log('Deleting product:', selectedProduct?.id);
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex justify-end">
          <Input
            type="search"
            placeholder={t.search + '...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[250px] h-9 font-asia-light text-sm"
          />
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-asia-bold text-xs w-[80px]">
                  {t.image}
                </TableHead>
                <TableHead className="font-asia-bold text-xs">
                  {t.productName}
                </TableHead>
                <TableHead className="font-asia-bold text-xs">
                  {t.category}
                </TableHead>
                <TableHead className="font-asia-bold text-xs text-right">
                  {t.price}
                </TableHead>
                <TableHead className="font-asia-bold text-xs text-center">
                  {t.piece}
                </TableHead>
                <TableHead className="font-asia-bold text-xs">
                  {t.availableColor}
                </TableHead>
                <TableHead className="font-asia-bold text-xs text-center w-[100px]">
                  {t.action}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={cn(
                    'hover:bg-muted/30 transition-colors',
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  )}
                >
                  {/* Image */}
                  <TableCell className="py-3">
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                      <Package className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                  </TableCell>

                  {/* Product Name */}
                  <TableCell className="py-3">
                    <span className="font-asia-medium text-sm">
                      {product.productName}
                    </span>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-3">
                    <span className="font-asia-light text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-3 text-right">
                    <span className="font-asia-medium text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </TableCell>

                  {/* Piece (Stock) */}
                  <TableCell className="py-3 text-center">
                    <span className={cn(
                      'font-asia-medium text-sm',
                      product.piece < 50 && 'text-destructive'
                    )}>
                      {product.piece}
                    </span>
                  </TableCell>

                  {/* Available Colors */}
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((color, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <div
                              className="w-5 h-5 rounded-full border border-border cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="font-mono text-xs">
                            {color}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t.edit}</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t.delete}</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="font-asia-light text-sm text-muted-foreground">
            {lang === 'ko'
              ? `${filteredProducts.length}개 항목 중 1-${filteredProducts.length} 표시`
              : `显示 1-${filteredProducts.length} 共 ${filteredProducts.length} 条`
            }
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="font-asia-medium text-xs"
            >
              {lang === 'ko' ? '이전' : '上一页'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="font-asia-medium text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="font-asia-medium text-xs"
            >
              {lang === 'ko' ? '다음' : '下一页'}
            </Button>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="font-asia-bold">
                {lang === 'ko' ? '상품 삭제' : '删除商品'}
              </DialogTitle>
              <DialogDescription className="font-asia-light">
                {lang === 'ko'
                  ? `"${selectedProduct?.productName}" 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
                  : `确定要删除"${selectedProduct?.productName}"吗？此操作无法撤销。`
                }
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="font-asia-medium"
              >
                {lang === 'ko' ? '취소' : '取消'}
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="font-asia-medium"
              >
                {lang === 'ko' ? '삭제' : '删除'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

