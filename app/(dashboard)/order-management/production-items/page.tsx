'use client';

import { PageHeader, excelDownloadAction } from '@/components/layout/page-header';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function ProductionItemsPage() {
  return (
    <div>
      <PageHeader
        titleKo="제작상품"
        titleZh="生产商品"
        actions={[excelDownloadAction]}
      />
      <PlaceholderPage titleKo="제작상품" titleZh="生产商品" />
    </div>
  );
}

