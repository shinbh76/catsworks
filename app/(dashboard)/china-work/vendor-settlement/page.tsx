'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function VendorSettlementPage() {
  return (
    <div>
      <PageHeader
        titleKo="업체정산"
        titleZh="供应商结算"
        actions={[excelDownloadAction]}
      />
      <PlaceholderPage titleKo="업체정산" titleZh="供应商结算" />
    </div>
  );
}

