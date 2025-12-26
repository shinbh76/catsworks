'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { OrderListFilters } from '@/components/order-list-filters';
import { OrderListTable } from '@/components/order-list-table';
import { Card } from '@/components/ui/card';

export default function PurchaseListPage() {
  return (
    <div>
      <PageHeader
        titleKo="사입목록"
        titleZh="采购清单"
        actions={[excelDownloadAction]}
      />

      <Card className="p-4 border-border/50">
        <OrderListFilters />
        <OrderListTable />
      </Card>
    </div>
  );
}

