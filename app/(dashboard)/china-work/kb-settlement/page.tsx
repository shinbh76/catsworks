'use client';

import { PageHeader, excelUploadAction, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function KBSettlementPage() {
  return (
    <div>
      <PageHeader
        titleKo="K&B정산"
        titleZh="K&B结算"
        actions={[excelUploadAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="K&B정산" titleZh="K&B结算" />
    </div>
  );
}

