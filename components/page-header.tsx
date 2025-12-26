"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { useAppUi, type AppLang } from "@/components/providers/app-ui-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type I18nText = Record<AppLang, string>;

export type PageAction = {
  key: string;
  label: I18nText;
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
};

export function PageHeader({
  title,
  actions,
  rightSlot,
}: {
  title: string | I18nText;
  actions?: PageAction[];
  rightSlot?: React.ReactNode;
}) {
  const { lang } = useAppUi();

  const titleText = typeof title === "string" ? title : title[lang];

  return (
    <div className="mb-5 flex items-start justify-between gap-6">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-asia-bold tracking-tight">
          {titleText}
        </h1>
        {actions && actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((a) => {
              const Icon = a.icon;
              const labelText = a.label[lang];
              return (
                <Button
                  key={a.key}
                  variant="outline"
                  size="sm"
                  onClick={a.onClick}
                  disabled={a.disabled}
                  title={labelText}
                  className={cn("h-8 gap-2 px-3")}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  <span className="max-w-[16rem] truncate">{labelText}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}


