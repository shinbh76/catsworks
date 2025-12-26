export function formatYmdCompact(value: string) {
  const v = value?.trim();
  if (!v) return "";
  if (/^\d{8}$/.test(v)) {
    return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
  }
  return v;
}

export function formatNumber(value: string) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatCurrencyKRW(value: string) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  return new Intl.NumberFormat("ko-KR").format(n);
}

export function formatCurrencyCNY(value: string) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  return new Intl.NumberFormat("zh-CN").format(n);
}


