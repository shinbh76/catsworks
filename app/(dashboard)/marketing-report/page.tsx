'use client';

import { PageHeader, excelUploadAction, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function MarketingReportPage() {
  return (
    <div>
      <PageHeader
        titleKo="마케팅 리포트"
        titleZh="营销报告"
        actions={[excelUploadAction, excelDownloadAction]}
      />
      <PlaceholderPage titleKo="마케팅 리포트" titleZh="营销报告" />
    </div>
  );
}

