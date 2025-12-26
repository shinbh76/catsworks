'use client';

import { PageHeader, excelUploadAction, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function InvoicePage() {
  return (
    <div>
      <PageHeader
        titleKo="인보이스"
        titleZh="发票"
        actions={[excelUploadAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="인보이스" titleZh="发票" />
    </div>
  );
}

