'use client';

import { ReactNode } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Upload, Download, Barcode, LucideIcon } from 'lucide-react';

interface Action {
  id: string;
  labelKo: string;
  labelZh: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface PageHeaderProps {
  titleKo: string;
  titleZh: string;
  actions?: Action[];
  children?: ReactNode;
}

export function PageHeader({ titleKo, titleZh, actions = [], children }: PageHeaderProps) {
  const { lang } = useStore();

  return (
    <TooltipProvider delayDuration={0}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="font-asia-bold text-2xl text-foreground">
            {lang === 'ko' ? titleKo : titleZh}
          </h1>
          
          {actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action) => (
                <Tooltip key={action.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={action.onClick}
                      className="h-9 gap-2 font-asia-medium text-sm"
                    >
                      <action.icon className="h-4 w-4" strokeWidth={1.5} />
                      <span className="hidden sm:inline">
                        {lang === 'ko' ? action.labelKo : action.labelZh}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="sm:hidden">
                    {lang === 'ko' ? action.labelKo : action.labelZh}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>
        {children}
      </div>
    </TooltipProvider>
  );
}

// Pre-defined action helpers
export const excelUploadAction: Action = {
  id: 'excel-upload',
  labelKo: '엑셀 업로드',
  labelZh: '上传Excel',
  icon: Upload,
};

export const excelDownloadAction: Action = {
  id: 'excel-download',
  labelKo: '엑셀 다운로드',
  labelZh: '下载Excel',
  icon: Download,
};

export const barcodeOutputAction: Action = {
  id: 'barcode-output',
  labelKo: '바코드 출력',
  labelZh: '打印条码',
  icon: Barcode,
};

