'use client';

import { PageHeader, excelUploadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function OrderInputPage() {
  return (
    <div>
      <PageHeader
        titleKo="주문입력"
        titleZh="订单录入"
        actions={[excelUploadAction]}
      />
      <PlaceholderPage titleKo="주문입력" titleZh="订单录入" />
    </div>
  );
}

