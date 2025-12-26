'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { ProductStockTable } from '@/components/product-stock-table';
import { Card } from '@/components/ui/card';

export default function ProductManagementPage() {
  return (
    <div>
      <PageHeader
        titleKo="상품관리"
        titleZh="商品管理"
        actions={[excelDownloadAction]}
      />

      <Card className="p-4 border-border/50">
        <ProductStockTable />
      </Card>
    </div>
  );
}

