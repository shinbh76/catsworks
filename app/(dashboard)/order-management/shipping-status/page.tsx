'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function ShippingStatusPage() {
  return (
    <div>
      <PageHeader
        titleKo="배송현황"
        titleZh="发货状态"
        actions={[excelDownloadAction]}
      />
      <PlaceholderPage titleKo="배송현황" titleZh="发货状态" />
    </div>
  );
}

