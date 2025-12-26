'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function DepositConfirmationPage() {
  return (
    <div>
      <PageHeader
        titleKo="입금확인"
        titleZh="收款确认"
        actions={[excelDownloadAction]}
      />
      <PlaceholderPage titleKo="입금확인" titleZh="收款确认" />
    </div>
  );
}

