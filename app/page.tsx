"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { useI18n } from "@/lib/contexts/i18n-context";
import { getTranslation } from "@/lib/i18n";

export default function Home() {
  const { lang } = useI18n();
  const t = getTranslation(lang);

  return (
    <AppShell>
      <PageHeader title={t.sidebar.dashboard} />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="font-asia-light text-muted-foreground">
          대시보드 컨텐츠가 여기에 표시됩니다.
        </p>
      </div>
    </AppShell>
  );
}

