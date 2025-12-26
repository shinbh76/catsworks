'use client';

import { PageHeader, excelUploadAction, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function ShippingTrackingPage() {
  return (
    <div>
      <PageHeader
        titleKo="배송조회"
        titleZh="物流查询"
        actions={[excelUploadAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="배송조회" titleZh="物流查询" />
    </div>
  );
}

