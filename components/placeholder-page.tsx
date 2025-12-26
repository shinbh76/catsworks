'use client';

import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  titleKo: string;
  titleZh: string;
}

export function PlaceholderPage({ titleKo, titleZh }: PlaceholderPageProps) {
  const { lang } = useStore();

  return (
    <Card className="p-12 border-border/50 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Construction className="w-8 h-8 text-primary" strokeWidth={1.5} />
      </div>
      <h2 className="font-asia-bold text-xl mb-2">
        {lang === 'ko' ? titleKo : titleZh}
      </h2>
      <p className="font-asia-light text-muted-foreground">
        {lang === 'ko' 
          ? '이 페이지는 현재 개발 중입니다.'
          : '此页面正在开发中。'
        }
      </p>
    </Card>
  );
}

