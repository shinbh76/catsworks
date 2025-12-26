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

// Columns and Data from User Query
const COLUMNS = [
  { letter: "A", key: "ca", group: "기타", labelKo: "날짜", labelZh: "时间" },
  { letter: "B", key: "cb", group: "자사 정보", labelKo: "사진", labelZh: "图片" },
  { letter: "C", key: "cc", group: "자사 정보", labelKo: "URL", labelZh: "URL" },
  { letter: "D", key: "cd", group: "자사 정보", labelKo: "제품번호", labelZh: "产品编号" },
  { letter: "E", key: "ce", group: "자사 정보", labelKo: "상품명", labelZh: "商品名" },
  { letter: "F", key: "cf", group: "자사 정보", labelKo: "옵션", labelZh: "选项" },
  { letter: "G", key: "cg", group: "자사 정보", labelKo: "원가(₩)", labelZh: "价格(₩)" },
  { letter: "H", key: "ch", group: "업체 정보", labelKo: "구매 URL", labelZh: "购买 URL" },
  { letter: "I", key: "ci", group: "업체 정보", labelKo: "업체명", labelZh: "公司名称" },
  { letter: "J", key: "cj", group: "업체 정보", labelKo: "주소", labelZh: "地址" },
  { letter: "K", key: "ck", group: "업체 정보", labelKo: "전화번호", labelZh: "电话号码" },
  { letter: "L", key: "cl", group: "업체 정보", labelKo: "제품번호", labelZh: "产品款号" },
  { letter: "M", key: "cm", group: "업체 정보", labelKo: "위챗", labelZh: "微信" },
  { letter: "N", key: "cn", group: "업체 정보", labelKo: "옵션", labelZh: "选项" },
  { letter: "O", key: "co", group: "업체 정보", labelKo: "원가(￥)", labelZh: "价格(￥)" },
  { letter: "P", key: "cp", group: "구매 정보", labelKo: "주문수량", labelZh: "订货数量" },
  { letter: "Q", key: "cq", group: "구매 정보", labelKo: "구매수량", labelZh: "购买数量" },
  { letter: "R", key: "cr", group: "구매 정보", labelKo: "잔여수량", labelZh: "剩余数量" },
  { letter: "S", key: "cs", group: "구매 정보", labelKo: "구매총액", labelZh: "购买总额" },
  { letter: "T", key: "ct", group: "구매 정보", labelKo: "선지금", labelZh: "预付款" },
  { letter: "U", key: "cu", group: "구매 정보", labelKo: "지불금액", labelZh: "支付金额" },
  { letter: "V", key: "cv", group: "구매 정보", labelKo: "유의사항", labelZh: "购买备注" },
  { letter: "W", key: "cw", group: "예약정보", labelKo: "예약일자", labelZh: "下单日期" },
  { letter: "X", key: "cx", group: "예약정보", labelKo: "예약수량", labelZh: "预计数量" },
  { letter: "Y", key: "cy", group: "예약정보", labelKo: "선금", labelZh: "首付" },
  { letter: "Z", key: "cz", group: "예약정보", labelKo: "잔금", labelZh: "平衡" },
  { letter: "AA", key: "caa", group: "기타", labelKo: "바코드", labelZh: "条形码" },
  { letter: "AB", key: "cab", group: "기타", labelKo: "셀메이트번호", labelZh: "SellMate No" },
  { letter: "AC", key: "cac", group: "기타", labelKo: "담당자", labelZh: "经理" },
];

const ROWS = [
  { ca: "20250621", cb: "0", cc: "http://www.moulian.com/...", cd: "SK#4865", ce: "크로셰 펀칭 A라인...", cf: "아이보리,F", cg: "7770", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16620181", cl: "7716", cm: "1.66E+10", cn: "xingse,F", co: "39", cp: "2", cq: "", cr: "", cs: "", ct: "", cu: "", cv: "F", cw: "", cx: "", cy: "", cz: "", caa: "1-57398200-02", cab: "57398", cac: "王静伟" },
  { ca: "20250621", cb: "", cc: "http://www.moulian.com/...", cd: "KN#4785A", ce: "베이직 트라이앵글...", cf: "블랙,F", cg: "3150", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16520029", cl: "Y9521", cm: "1.59E+10", cn: "heise,F", co: "15", cp: "1", cq: "", cr: "", cs: "", ct: "", cu: "", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-57972200-02", cab: "57972", cac: "王静伟" },
  { ca: "20250621", cb: "0", cc: "http://www.moulian.com/...", cd: "CD#1234", ce: "린넨 반팔 가디건", cf: "베이지,M", cg: "12500", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "13800293", cl: "A202", cm: "1.38E+10", cn: "miise,M", co: "65", cp: "5", cq: "5", cr: "0", cs: "325", ct: "325", cu: "0", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-58012300-01", cab: "58012", cac: "王静伟" },
  { ca: "20250621", cb: "0", cc: "http://www.moulian.com/...", cd: "PT#9920", ce: "와이드 밴딩 팬츠", cf: "차콜,L", cg: "15800", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "13912345", cl: "P99", cm: "1.39E+10", cn: "heise,L", co: "82", cp: "3", cq: "3", cr: "0", cs: "246", ct: "246", cu: "0", cv: "긴급", cw: "", cx: "", cy: "", cz: "", caa: "1-58099200-03", cab: "58099", cac: "王静伟" },
  { ca: "20250621", cb: "", cc: "http://www.moulian.com/...", cd: "SH#5512", ce: "오버핏 스트라이프 셔츠", cf: "블루,F", cg: "18900", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "18655123", cl: "S12", cm: "1.86E+10", cn: "lanse,F", co: "98", cp: "10", cq: "0", cr: "10", cs: "0", ct: "0", cu: "0", cv: "", cw: "20250625", cx: "10", cy: "300", cz: "680", caa: "1-58155100-10", cab: "58155", cac: "王静伟" },
  { ca: "20250622", cb: "0", cc: "http://www.moulian.com/...", cd: "OP#2234", ce: "플라워 롱 원피스", cf: "핑크,S", cg: "24500", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "15212344", cl: "D22", cm: "1.52E+10", cn: "fenise,S", co: "128", cp: "1", cq: "1", cr: "0", cs: "128", ct: "128", cu: "0", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-58222300-01", cab: "58222", cac: "王静伟" },
  { ca: "20250622", cb: "0", cc: "http://www.moulian.com/...", cd: "JK#1102", ce: "싱글 버튼 린넨 자켓", cf: "오트밀,M", cg: "42000", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "17711022", cl: "J11", cm: "1.77E+10", cn: "mianse,M", co: "215", cp: "2", cq: "2", cr: "0", cs: "430", ct: "430", cu: "0", cv: "예약건", cw: "", cx: "", cy: "", cz: "", caa: "1-58311000-02", cab: "58311", cac: "王静伟" },
  { ca: "20250622", cb: "", cc: "http://www.moulian.com/...", cd: "SK#3341", ce: "코튼 A라인 스커트", cf: "네이비,L", cg: "13500", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16633411", cl: "K33", cm: "1.66E+10", cn: "shenlan,L", co: "69", cp: "4", cq: "4", cr: "0", cs: "276", ct: "276", cu: "0", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-58433400-04", cab: "58433", cac: "王静伟" },
  { ca: "20250623", cb: "0", cc: "http://www.moulian.com/...", cd: "BL#9001", ce: "타이 실크 블라우스", cf: "화이트,F", cg: "21000", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "13590011", cl: "B90", cm: "1.35E+10", cn: "baise,F", co: "108", cp: "6", cq: "6", cr: "0", cs: "648", ct: "648", cu: "0", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-58590000-06", cab: "58590", cac: "王静伟" },
  { ca: "20250623", cb: "0", cc: "http://www.moulian.com/...", cd: "KN#8872", ce: "V넥 꽈배기 니트", cf: "옐로우,F", cg: "17500", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16288722", cl: "K88", cm: "1.62E+10", cn: "huangse,F", co: "89", cp: "3", cq: "0", cr: "3", cs: "0", ct: "0", cu: "0", cv: "품절주의", cw: "20250630", cx: "3", cy: "100", cz: "167", caa: "1-58688700-03", cab: "58688", cac: "王静伟" },
  { ca: "20250623", cb: "", cc: "http://www.moulian.com/...", cd: "PT#4451", ce: "세미 부츠컷 데님", cf: "중청,27", cg: "22000", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "15544511", cl: "D44", cm: "1.55E+10", cn: "lanse,27", co: "115", cp: "5", cq: "5", cr: "0", cs: "575", ct: "575", cu: "0", cv: "", cw: "", cx: "", cy: "", cz: "", caa: "1-58744500-05", cab: "58744", cac: "王静伟" },
  { ca: "20250623", cb: "0", cc: "http://www.moulian.com/...", cd: "TS#1004", ce: "베이직 코튼 반팔티", cf: "그레이,XL", cg: "8500", ch: "https://www.vvic.co/...", ci: "VVIC", cj: "SA3-LAOJINMA...", ck: "16610044", cl: "T10", cm: "1.66E+10", cn: "huise,XL", co: "42", cp: "20", cq: "20", cr: "0", cs: "840", ct: "840", cu: "0", cv: "대량", cw: "", cx: "", cy: "", cz: "", caa: "1-58810000-20", cab: "58810", cac: "王静伟" },
];

const GROUP_COLORS: Record<string, string> = {
  "기타": "bg-slate-50/50 dark:bg-slate-900/20",
  "자사 정보": "bg-emerald-50/30 dark:bg-emerald-900/10",
  "업체 정보": "bg-blue-50/30 dark:bg-blue-900/10",
  "구매 정보": "bg-amber-50/30 dark:bg-amber-900/10",
  "예약정보": "bg-purple-50/30 dark:bg-purple-900/10",
};

export default function OrderListsPage() {
  const { lang } = useLanguage();

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-asia-bold">
            {lang === "ko" ? "사입목록" : "采购列表"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-asia-light">
            <span>{lang === "ko" ? "주문관리" : "订单管理"}</span>
            <span>&gt;</span>
            <span className="text-foreground font-asia-medium">{lang === "ko" ? "사입목록" : "采购列表"}</span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-asia-medium hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" strokeWidth={1.5} />
            {lang === "ko" ? "엑셀 다운로드" : "Excel 下载"}
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-input bg-background hover:bg-accent rounded-md text-sm font-asia-medium transition-colors">
            <Printer className="w-4 h-4" strokeWidth={1.5} />
            {lang === "ko" ? "목록 출력" : "打印列表"}
          </button>
        </div>

        {/* Filter Bar Card */}
        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-asia-medium">{lang === "ko" ? "필터" : "筛选"}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="date" className="bg-background border border-input rounded px-3 py-1.5 text-xs font-asia-light outline-none focus:ring-1 focus:ring-primary" />
              <span className="text-muted-foreground">~</span>
              <input type="date" className="bg-background border border-input rounded px-3 py-1.5 text-xs font-asia-light outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <select className="bg-background border border-input rounded px-3 py-1.5 text-xs font-asia-light outline-none focus:ring-1 focus:ring-primary min-w-[120px]">
              <option>{lang === "ko" ? "주문 유형" : "订单类型"}</option>
            </select>

            <select className="bg-background border border-input rounded px-3 py-1.5 text-xs font-asia-light outline-none focus:ring-1 focus:ring-primary min-w-[120px]">
              <option>{lang === "ko" ? "주문 상태" : "订单状态"}</option>
            </select>

            <button className="flex items-center gap-1.5 text-xs font-asia-medium text-red-500 hover:bg-red-50 transition-colors px-3 py-1.5 rounded ml-auto">
              <RotateCcw className="w-3.5 h-3.5" />
              {lang === "ko" ? "필터 초기화" : "重置筛选"}
            </button>
          </div>
        </div>

        {/* Table Legend */}
        <div className="flex items-center gap-4">
          {Object.entries(GROUP_COLORS).map(([group, color]) => (
            <div key={group} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-sm border border-border", color.split(" ")[0])} />
              <span className="text-[10px] font-asia-medium text-muted-foreground uppercase">{group}</span>
            </div>
          ))}
        </div>

        {/* Data Table Container */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar max-h-[600px]">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
                <tr>
                  {COLUMNS.map((col, idx) => {
                    const isGroupStart = idx > 0 && COLUMNS[idx - 1].group !== col.group;
                    return (
                      <th
                        key={col.key}
                        title={col.group}
                        className={cn(
                          "px-3 py-2 font-asia-bold text-muted-foreground whitespace-nowrap border-b border-border text-[11px]",
                          GROUP_COLORS[col.group],
                          isGroupStart && "border-l border-border/50",
                          col.key === "ca" && "sticky left-0 z-30 bg-inherit min-w-[100px]",
                          col.key === "cb" && "sticky left-[100px] z-30 bg-inherit min-w-[60px]"
                        )}
                      >
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
                        <td
                          key={col.key}
                          className={cn(
                            "px-3 py-1.5 font-asia-light whitespace-nowrap text-[11px]",
                            GROUP_COLORS[col.group],
                            isGroupStart && "border-l border-border/30",
                            col.key === "ca" && "sticky left-0 z-10 bg-inherit min-w-[100px] group-hover:bg-muted/30",
                            col.key === "cb" && "sticky left-[100px] z-10 bg-inherit min-w-[60px] group-hover:bg-muted/30",
                            (col.key === "cg" || col.key === "co" || col.key === "cp" || col.key === "cq" || col.key === "cr" || col.key === "cs" || col.key === "ct" || col.key === "cu") && "text-right"
                          )}
                        >
                          {col.key === "cb" ? (
                            <div className="w-8 h-8 bg-muted rounded flex items-center justify-center overflow-hidden mx-auto border border-border/50">
                              {value === "0" ? (
                                <img src={`https://picsum.photos/seed/${rowIdx}/40/40`} alt="prod" className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-[8px] text-muted-foreground">No img</div>
                              )}
                            </div>
                          ) : col.key === "cc" || col.key === "ch" ? (
                            <a href={value} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center justify-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              <span className="max-w-[80px] truncate hidden md:inline">{value}</span>
                            </a>
                          ) : col.key === "caa" ? (
                            <div className="flex items-center gap-2 font-mono justify-center">
                              <span>{value}</span>
                              <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary" />
                            </div>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
            <span className="text-xs text-muted-foreground font-asia-light">Showing 1-12 of 48 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">&lt;</button>
              <button className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">1</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">2</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">3</button>
              <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition-colors">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

