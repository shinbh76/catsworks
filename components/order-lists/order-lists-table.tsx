"use client";

import * as React from "react";
import {
  ORDER_LIST_COLUMNS,
  ORDER_LIST_ROWS,
  type OrderListColumn,
  type OrderListGroup,
  type OrderListRow,
} from "@/lib/mock/order-lists";
import { useAppUi } from "@/components/providers/app-ui-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Copy,
  ExternalLink,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  formatCurrencyCNY,
  formatCurrencyKRW,
  formatNumber,
  formatYmdCompact,
} from "@/lib/format";

const GROUP_START_LETTERS = new Set(["B", "H", "P", "W", "AA"]);

const GROUP_META: Record<
  OrderListGroup,
  {
    label: { ko: string; zh: string };
    bandClass: string;
    chipClass: string;
  }
> = {
  기타: {
    label: { ko: "기타", zh: "其他" },
    bandClass: "bg-muted/40 dark:bg-muted/20",
    chipClass: "bg-muted text-muted-foreground",
  },
  "자사 정보": {
    label: { ko: "자사", zh: "自有" },
    bandClass: "bg-primary/[0.06] dark:bg-primary/[0.10]",
    chipClass: "bg-primary/10 text-primary",
  },
  "업체 정보": {
    label: { ko: "업체", zh: "供应商" },
    bandClass: "bg-sky-500/[0.04] dark:bg-sky-500/[0.06]",
    chipClass:
      "bg-sky-500/10 text-sky-800 dark:text-sky-200 border-sky-500/20",
  },
  "구매 정보": {
    label: { ko: "구매", zh: "采购" },
    bandClass: "bg-amber-500/[0.04] dark:bg-amber-500/[0.06]",
    chipClass:
      "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/20",
  },
  예약정보: {
    label: { ko: "예약", zh: "预定" },
    bandClass: "bg-violet-500/[0.04] dark:bg-violet-500/[0.06]",
    chipClass:
      "bg-violet-500/10 text-violet-900 dark:text-violet-200 border-violet-500/20",
  },
};

function getColWidthClass(col: OrderListColumn) {
  switch (col.key) {
    case "ca":
      return "min-w-[110px]";
    case "cb":
      return "min-w-[78px]";
    case "cc":
    case "ch":
      return "min-w-[200px]";
    case "ce":
      return "min-w-[240px]";
    case "cf":
    case "cn":
      return "min-w-[170px]";
    case "cj":
    case "ck":
      return "min-w-[180px]";
    case "caa":
      return "min-w-[190px]";
    case "cv":
      return "min-w-[160px]";
    default:
      return "min-w-[130px]";
  }
}

function isNumericKey(key: string) {
  return [
    "cg",
    "co",
    "cp",
    "cq",
    "cr",
    "cs",
    "ct",
    "cu",
    "cx",
    "cy",
    "cz",
    "cab",
  ].includes(key);
}

function CellContent({
  col,
  row,
}: {
  col: OrderListColumn;
  row: OrderListRow;
}) {
  const raw = row[col.key] ?? "";

  if (col.key === "ca") {
    return <span className="font-asia-light">{formatYmdCompact(raw)}</span>;
  }

  if (col.key === "cb") {
    const hasImage = Boolean(raw) && raw !== "0";
    return (
      <div className="flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
          <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
          <span className="sr-only">{hasImage ? "image" : "placeholder"}</span>
        </div>
      </div>
    );
  }

  if (col.key === "cc" || col.key === "ch") {
    if (!raw) return <span className="text-muted-foreground">—</span>;
    return (
      <a
        href={raw}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        title={raw}
      >
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span className="truncate">{raw}</span>
      </a>
    );
  }

  if (col.key === "cg") {
    return (
      <span className="tabular-nums font-asia-light">
        {raw ? formatCurrencyKRW(raw) : "—"}
      </span>
    );
  }

  if (col.key === "co") {
    return (
      <span className="tabular-nums font-asia-light">
        {raw ? formatCurrencyCNY(raw) : "—"}
      </span>
    );
  }

  if (col.key === "caa") {
    return <BarcodeCell value={raw} />;
  }

  if (col.key === "cab") {
    return (
      <span className="tabular-nums font-asia-light">
        {raw ? formatNumber(raw) : "—"}
      </span>
    );
  }

  return raw ? (
    <span className="font-asia-light">{raw}</span>
  ) : (
    <span className="text-muted-foreground">—</span>
  );
}

function BarcodeCell({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="min-w-0 truncate font-mono text-xs">{value || "—"}</span>
      <Button
        variant="ghost"
        size="iconSm"
        className="h-7 w-7"
        onClick={onCopy}
        disabled={!value}
        title={copied ? "복사됨" : "복사"}
      >
        <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Button>
    </div>
  );
}

export function OrderListsTable() {
  const { lang } = useAppUi();

  const groupsInOrder: OrderListGroup[] = React.useMemo(() => {
    const order: OrderListGroup[] = [];
    for (const c of ORDER_LIST_COLUMNS) {
      if (!order.includes(c.group)) order.push(c.group);
    }
    return order;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {groupsInOrder.map((g) => (
          <Badge
            key={g}
            variant="outline"
            className={cn(
              "border-border",
              GROUP_META[g].chipClass,
              "px-2 py-1",
            )}
          >
            {GROUP_META[g].label[lang]}
          </Badge>
        ))}
      </div>

      <div className="overflow-auto rounded-lg border border-border bg-card scrollbar-thin max-h-[62vh]">
        <table className="min-w-max w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {ORDER_LIST_COLUMNS.map((col) => {
                const isSticky = col.letter === "A";
                const isGroupStart = GROUP_START_LETTERS.has(col.letter);
                const meta = GROUP_META[col.group];
                const label = lang === "ko" ? col.labelKo : col.labelZh;
                return (
                  <th
                    key={col.key}
                    title={meta.label[lang]}
                    className={cn(
                      [
                        "sticky top-0 z-10",
                        "border-b border-border",
                        "px-3 py-2 text-left text-xs font-asia-bold text-muted-foreground",
                        "whitespace-nowrap",
                      ].join(" "),
                      meta.bandClass,
                      getColWidthClass(col),
                      isGroupStart && "border-l border-border/70",
                      isSticky && "left-0 z-30 border-r border-border/70",
                    )}
                  >
                    <span className="block truncate">{label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {ORDER_LIST_ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-accent/30">
                {ORDER_LIST_COLUMNS.map((col) => {
                  const isSticky = col.letter === "A";
                  const isGroupStart = GROUP_START_LETTERS.has(col.letter);
                  const meta = GROUP_META[col.group];

                  const align =
                    col.key === "cp" ||
                    col.key === "cq" ||
                    col.key === "cr" ||
                    col.key === "cx"
                      ? "text-center"
                      : isNumericKey(col.key)
                        ? "text-right"
                        : "text-left";

                  return (
                    <td
                      key={col.key}
                      className={cn(
                        [
                          "border-b border-border/70 px-3 py-2 text-xs",
                          "whitespace-nowrap",
                        ].join(" "),
                        meta.bandClass,
                        getColWidthClass(col),
                        align,
                        isGroupStart && "border-l border-border/70",
                        isSticky && "sticky left-0 z-20 border-r border-border/70",
                      )}
                    >
                      <div className="min-w-0">
                        <CellContent col={col} row={row} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs font-asia-light text-muted-foreground">
          {lang === "ko" ? "총 12개" : "共 12 条"}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="iconSm" title="Prev" disabled>
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3" disabled>
            1
          </Button>
          <Button variant="outline" size="iconSm" title="Next" disabled>
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}


