"use client";

import * as React from "react";
import { useLanguage } from "@/components/providers";
import { LayoutShell } from "@/components/layout-shell";
import { cn } from "@/lib/utils";
import {
  Download,
  Upload,
  Printer,
  FileSpreadsheet,
  Filter,
  RotateCcw,
  ExternalLink,
  Copy,
  MoreHorizontal,
} from "lucide-react";

const COLUMNS = [
  { letter: "A", key: "ca", group: "湲고?", labelKo: "?좎쭨", labelZh: "?띌뿴" },
  { letter: "B", key: "cb", group: "?먯궗 ?뺣낫", labelKo: "?ъ쭊", labelZh: "?양뎴" },
  { letter: "C", key: "cc", group: "?먯궗 ?뺣낫", labelKo: "URL", labelZh: "URL" },
  { letter: "D", key: "cd", group: "?먯궗 ?뺣낫", labelKo: "?쒗뭹踰덊샇", labelZh: "雅㎩뱚煐뽩뤇" },
  { letter: "E", key: "ce", group: "?먯궗 ?뺣낫", labelKo: "?곹뭹紐?, labelZh: "?녶뱚?? },
  { letter: "F", key: "cf", group: "?먯궗 ?뺣낫", labelKo: "?듭뀡", labelZh: "?됮」" },
  { letter: "G", key: "cg", group: "?먯궗 ?뺣낫", labelKo: "?먭?(??", labelZh: "媛寃???" },
  { letter: "H", key: "ch", group: "?낆껜 ?뺣낫", labelKo: "援щℓ URL", labelZh: "兀?물 URL" },
  { letter: "I", key: "ci", group: "?낆껜 ?뺣낫", labelKo: "?낆껜紐?, labelZh: "?у뤈?띸㎞" },
  { letter: "J", key: "cj", group: "?낆껜 ?뺣낫", labelKo: "二쇱냼", labelZh: "?겼?" },
  { letter: "K", key: "ck", group: "?낆껜 ?뺣낫", labelKo: "?꾪솕踰덊샇", labelZh: "?듣캕?루쟻" },
  { letter: "L", key: "cl", group: "?낆껜 ?뺣낫", labelKo: "?쒗뭹踰덊샇", labelZh: "雅㎩뱚轝얍뤇" },
  { letter: "M", key: "cm", group: "?낆껜 ?뺣낫", labelKo: "?꾩콟", labelZh: "孃?에" },
  { letter: "N", key: "cn", group: "?낆껜 ?뺣낫", labelKo: "?듭뀡", labelZh: "?됮」" },
  { letter: "O", key: "co", group: "?낆껜 ?뺣낫", labelKo: "?먭?(占?", labelZh: "媛寃?占?" },
  { letter: "P", key: "cp", group: "援щℓ ?뺣낫", labelKo: "二쇰Ц?섎웾", labelZh: "溫?뇻?곈뇧" },
  { letter: "Q", key: "cq", group: "援щℓ ?뺣낫", labelKo: "援щℓ?섎웾", labelZh: "兀?물?곈뇧" },
  { letter: "R", key: "cr", group: "援щℓ ?뺣낫", labelKo: "?붿뿬?섎웾", labelZh: "?⒳퐰?곈뇧" },
  { letter: "S", key: "cs", group: "援щℓ ?뺣낫", labelKo: "援щℓ珥앹븸", labelZh: "兀?물?삯쥫" },
  { letter: "T", key: "ct", group: "援щℓ ?뺣낫", labelKo: "?좎?湲?, labelZh: "窯꾡퍡轝? },
  { letter: "U", key: "cu", group: "援щℓ ?뺣낫", labelKo: "吏遺덇툑??, labelZh: "??퍡?묌쥫" },
  { letter: "V", key: "cv", group: "援щℓ ?뺣낫", labelKo: "?좎쓽?ы빆", labelZh: "兀?물鸚뉑낏" },
  { letter: "W", key: "cw", group: "?덉빟?뺣낫", labelKo: "?덉빟?쇱옄", labelZh: "訝뗥뜒?ζ쐿" },
  { letter: "X", key: "cx", group: "?덉빟?뺣낫", labelKo: "?덉빟?섎웾", labelZh: "窯꾥??곈뇧" },
  { letter: "Y", key: "cy", group: "?덉빟?뺣낫", labelKo: "?좉툑", labelZh: "腰뽨퍡" },
  { letter: "Z", key: "cz", group: "?덉빟?뺣낫", labelKo: "?붽툑", labelZh: "亮녘　" },
  { letter: "AA", key: "caa", group: "湲고?", labelKo: "諛붿퐫??, labelZh: "?▼숱?? },
  { letter: "AB", key: "cab", group: "湲고?", labelKo: "?硫붿씠?몃쾲??, labelZh: "SellMate No" },
  { letter: "AC", key: "cac", group: "湲고?", labelKo: "?대떦??, labelZh: "瀯뤹릤" },
];

const ROWS = [
  { ca: "20250621", cb: "0", cc: "http://www.moulian.com/...", cd: "SK#4865", ce: "?щ줈???移?A?쇱씤...", cf: "?꾩씠蹂대━,F", cg: "7770", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16620181", cl: "7716", cm: "1.66E+10", cn: "xingse,F", co: "39", cp: "2", cq: "", cr: "", cs: "", ct: "", cu: "", cv: "F", cw: "", cx: "", cy: "", cz: "", caa: "1-57398200-02", cab: "57398", cac: "?뗩쓾鴉? },
  { ca: "20250621", cb: "", cc: "http://www.moulian.com/...", cd: "KN#4785A", ce: "踰좎씠吏??몃씪?댁빑湲...", cf: "釉붾옓,F", cg: "3150", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16520029", cl: "Y9521", cm: "1.59E+10", cn: "heise,F", co: "15", cp: "1", cq: "", cr: "", cs: "", ct: "", cu: "", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-57972200-02", cab: "57972", cac: "?뗩쓾鴉? },
];

const GROUP_COLORS: Record<string, string> = {
  "湲고?": "bg-slate-50/50 dark:bg-slate-900/20",
  "?먯궗 ?뺣낫": "bg-emerald-50/30 dark:bg-emerald-900/10",
  "?낆껜 ?뺣낫": "bg-blue-50/30 dark:bg-blue-900/10",
  "援щℓ ?뺣낫": "bg-amber-50/30 dark:bg-amber-900/10",
  "?덉빟?뺣낫": "bg-purple-50/30 dark:bg-purple-900/10",
};

export default function OrderListsPage() {
  const { lang } = useLanguage();

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-asia-bold">{lang === "ko" ? "?ъ엯紐⑸줉" : "?뉓눌?쀨〃"}</h1>
        </div>
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar max-h-[600px]">
            <table className="w-full border-collapse text-left text-[11px]">
              <thead className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
                <tr>
                  {COLUMNS.map((col, idx) => {
                    const isGroupStart = idx > 0 && COLUMNS[idx - 1].group !== col.group;
                    return (
                      <th key={col.key} className={cn("px-3 py-2 font-asia-bold text-muted-foreground whitespace-nowrap", GROUP_COLORS[col.group], isGroupStart && "border-l border-border/50", col.key === "ca" && "sticky left-0 z-30 bg-inherit min-w-[100px]", col.key === "cb" && "sticky left-[100px] z-30 bg-inherit min-w-[60px]")}>
                        {lang === "ko" ? col.labelKo : col.labelZh}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                    {COLUMNS.map((col, colIdx) => {
                      const isGroupStart = colIdx > 0 && COLUMNS[colIdx - 1].group !== col.group;
                      const value = (row as any)[col.key];
                      return (
                        <td key={col.key} className={cn("px-3 py-1.5 font-asia-light whitespace-nowrap", GROUP_COLORS[col.group], isGroupStart && "border-l border-border/30", col.key === "ca" && "sticky left-0 z-10 bg-inherit group-hover:bg-muted/30", col.key === "cb" && "sticky left-[100px] z-10 bg-inherit group-hover:bg-muted/30", (col.key === "cg" || col.key === "co" || col.key === "cp") && "text-right")}>
                          {col.key === "cb" ? (
                            <div className="w-8 h-8 bg-muted rounded flex items-center justify-center overflow-hidden border border-border/50">
                              {value === "0" ? <img src={`https://picsum.photos/seed/${rowIdx}/40/40`} className="w-full h-full object-cover" /> : <div className="text-[8px]">No img</div>}
                            </div>
                          ) : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
