'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { RotateCcw, Calendar } from 'lucide-react';

export function OrderListFilters() {
  const { lang, t } = useStore();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [orderType, setOrderType] = useState('all');
  const [orderStatus, setOrderStatus] = useState('all');

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setOrderType('all');
    setOrderStatus('all');
  };

  const orderTypes = [
    { value: 'all', labelKo: '전체', labelZh: '全部' },
    { value: 'new', labelKo: '신규주문', labelZh: '新订单' },
    { value: 'reorder', labelKo: '재주문', labelZh: '重新订购' },
    { value: 'reservation', labelKo: '예약주문', labelZh: '预订' },
  ];

  const orderStatuses = [
    { value: 'all', labelKo: '전체', labelZh: '全部' },
    { value: 'pending', labelKo: '대기', labelZh: '待处理' },
    { value: 'processing', labelKo: '처리중', labelZh: '处理中' },
    { value: 'completed', labelKo: '완료', labelZh: '已完成' },
    { value: 'cancelled', labelKo: '취소', labelZh: '已取消' },
  ];

  return (
    <Card className="p-4 mb-4 border-border/50">
      <div className="flex flex-wrap items-end gap-4">
        {/* Date Range */}
        <div className="flex items-end gap-2">
          <div className="space-y-1.5">
            <Label className="font-asia-medium text-xs text-muted-foreground">
              {t.date}
            </Label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-9 w-[140px] h-9 font-asia-light text-sm"
              />
            </div>
          </div>
          <span className="text-muted-foreground pb-2">~</span>
          <div className="space-y-1.5">
            <Label className="font-asia-medium text-xs text-muted-foreground invisible">
              To
            </Label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-9 w-[140px] h-9 font-asia-light text-sm"
              />
            </div>
          </div>
        </div>

        {/* Order Type */}
        <div className="space-y-1.5">
          <Label className="font-asia-medium text-xs text-muted-foreground">
            {t.orderType}
          </Label>
          <Select value={orderType} onValueChange={setOrderType}>
            <SelectTrigger className="w-[130px] h-9 font-asia-light text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orderTypes.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="font-asia-light text-sm"
                >
                  {lang === 'ko' ? type.labelKo : type.labelZh}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order Status */}
        <div className="space-y-1.5">
          <Label className="font-asia-medium text-xs text-muted-foreground">
            {t.orderStatus}
          </Label>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="w-[130px] h-9 font-asia-light text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orderStatuses.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="font-asia-light text-sm"
                >
                  {lang === 'ko' ? status.labelKo : status.labelZh}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="h-9 gap-2 font-asia-medium text-sm"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
          {t.resetFilter}
        </Button>
      </div>
    </Card>
  );
}

