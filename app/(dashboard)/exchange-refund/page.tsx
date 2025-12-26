'use client';

import { PageHeader, excelUploadAction, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function ExchangeRefundPage() {
  return (
    <div>
      <PageHeader
        titleKo="교환환불"
        titleZh="换货退款"
        actions={[excelUploadAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="교환환불" titleZh="换货退款" />
    </div>
  );
}

