'use client';

import { PageHeader, excelDownloadAction, barcodeOutputAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function ReceivingListPage() {
  return (
    <div>
      <PageHeader
        titleKo="입고목록"
        titleZh="入库清单"
        actions={[barcodeOutputAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="입고목록" titleZh="入库清单" />
    </div>
  );
}

