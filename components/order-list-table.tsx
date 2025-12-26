'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { orderListColumns, groupColors, groupLabels, Language } from '@/lib/i18n';
import { orderListData, OrderRow } from '@/lib/data';
import {
  ExternalLink,
  Copy,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Group boundary columns (where divider should appear)
const groupBoundaryColumns = ['cb', 'ch', 'cp', 'cw', 'caa'];

// Get group background class
function getGroupBgClass(group: string): string {
  return groupColors[group] || '';
}

// Check if column is at group boundary
function isGroupBoundary(key: string): boolean {
  return groupBoundaryColumns.includes(key);
}

// Format currency
function formatCurrency(value: string, currency: '₩' | '¥'): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return currency + num.toLocaleString();
}

// Format date
function formatDate(value: string): string {
  if (!value || value.length !== 8) return value;
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

// Cell renderer based on column type
function CellContent({ 
  column, 
  value, 
  lang 
}: { 
  column: typeof orderListColumns[number]; 
  value: string; 
  lang: Language;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Date column (ca)
  if (column.key === 'ca') {
    return (
      <span className="font-asia-light text-xs whitespace-nowrap">
        {formatDate(value)}
      </span>
    );
  }

  // Image column (cb)
  if (column.key === 'cb') {
    if (value && value !== '0' && value !== '') {
      return (
        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded bg-muted/50 flex items-center justify-center">
        <ImageIcon className="w-4 h-4 text-muted-foreground/50" strokeWidth={1.5} />
      </div>
    );
  }

  // URL columns (cc, ch)
  if (column.key === 'cc' || column.key === 'ch') {
    if (!value) return <span className="text-muted-foreground">-</span>;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="font-asia-light text-xs max-w-[60px] truncate">Link</span>
          </a>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] break-all font-asia-light text-xs">
          {value}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Currency columns - KRW (cg)
  if (column.key === 'cg') {
    return (
      <span className="font-asia-light text-xs text-right block whitespace-nowrap">
        {value ? formatCurrency(value, '₩') : '-'}
      </span>
    );
  }

  // Currency columns - CNY (co, cs, ct, cu, cy, cz)
  if (['co', 'cs', 'ct', 'cu', 'cy', 'cz'].includes(column.key)) {
    return (
      <span className="font-asia-light text-xs text-right block whitespace-nowrap">
        {value ? formatCurrency(value, '¥') : '-'}
      </span>
    );
  }

  // Quantity columns (cp, cq, cr, cx)
  if (['cp', 'cq', 'cr', 'cx'].includes(column.key)) {
    return (
      <span className="font-asia-light text-xs text-center block">
        {value || '-'}
      </span>
    );
  }

  // Barcode column (caa)
  if (column.key === 'caa') {
    if (!value) return <span className="text-muted-foreground">-</span>;
    return (
      <div className="flex items-center gap-1">
        <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
          {value}
        </code>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopy(value)}
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" strokeWidth={1.5} />
              ) : (
                <Copy className="w-3 h-3" strokeWidth={1.5} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied 
              ? (lang === 'ko' ? '복사됨' : '已复制')
              : (lang === 'ko' ? '복사' : '复制')
            }
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  // SellMate number (cab)
  if (column.key === 'cab') {
    return (
      <span className="font-mono text-xs">
        {value || '-'}
      </span>
    );
  }

  // Product name (ce) - allow wrapping
  if (column.key === 'ce') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-asia-light text-xs max-w-[120px] truncate block">
            {value || '-'}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] font-asia-light">
          {value}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Default text rendering
  if (!value) {
    return <span className="text-muted-foreground">-</span>;
  }

  // Long text with tooltip
  if (value.length > 15) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-asia-light text-xs max-w-[100px] truncate block">
            {value}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] font-asia-light text-xs">
          {value}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <span className="font-asia-light text-xs whitespace-nowrap">
      {value}
    </span>
  );
}

export function OrderListTable() {
  const { lang } = useStore();

  // Get unique groups for legend
  const groups = [...new Set(orderListColumns.map(col => col.group))];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="space-y-4">
        {/* Group Legend */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-asia-medium text-sm text-muted-foreground">
            {lang === 'ko' ? '컬럼 그룹:' : '列分组:'}
          </span>
          {groups.map((group) => (
            <Badge
              key={group}
              variant="outline"
              className={cn(
                'font-asia-medium text-xs py-1 px-2.5',
                getGroupBgClass(group)
              )}
            >
              {groupLabels[group]?.[lang] || group}
            </Badge>
          ))}
        </div>

        {/* Table Container */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  {orderListColumns.map((column) => (
                    <th
                      key={column.key}
                      title={groupLabels[column.group]?.[lang] || column.group}
                      className={cn(
                        'px-3 py-3 text-left font-asia-bold text-xs whitespace-nowrap',
                        'border-b border-border',
                        'sticky top-0 z-10',
                        getGroupBgClass(column.group),
                        isGroupBoundary(column.key) && 'border-l-2 border-l-border'
                      )}
                    >
                      {lang === 'ko' ? column.labelKo : column.labelZh}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderListData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      'hover:bg-muted/30 transition-colors',
                      rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                    )}
                  >
                    {orderListColumns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-3 py-2.5 border-b border-border/50',
                          getGroupBgClass(column.group),
                          isGroupBoundary(column.key) && 'border-l-2 border-l-border/50'
                        )}
                      >
                        <CellContent
                          column={column}
                          value={row[column.key as keyof OrderRow]}
                          lang={lang}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="font-asia-light text-sm text-muted-foreground">
            {lang === 'ko' 
              ? `${orderListData.length}개 항목 중 1-${orderListData.length} 표시`
              : `显示 1-${orderListData.length} 共 ${orderListData.length} 条`
            }
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="font-asia-medium text-xs"
            >
              {lang === 'ko' ? '이전' : '上一页'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="font-asia-medium text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="font-asia-medium text-xs"
            >
              {lang === 'ko' ? '다음' : '下一页'}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

