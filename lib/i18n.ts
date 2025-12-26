export type Language = 'ko' | 'zh';

export interface Translations {
  // Menu items
  dashboard: string;
  orderManagement: string;
  orderInput: string;
  purchaseList: string;
  productionItems: string;
  receivingList: string;
  shippingStatus: string;
  productManagement: string;
  chinaWork: string;
  invoice: string;
  kbSettlement: string;
  vendorSettlement: string;
  depositConfirmation: string;
  exchangeRefund: string;
  shippingTracking: string;
  marketingReport: string;
  
  // Actions
  excelUpload: string;
  excelDownload: string;
  barcodeOutput: string;
  resetFilter: string;
  search: string;
  
  // Common
  notifications: string;
  profile: string;
  settings: string;
  logout: string;
  language: string;
  theme: string;
  light: string;
  dark: string;
  
  // Filter
  date: string;
  orderType: string;
  orderStatus: string;
  all: string;
  
  // Table common
  showing: string;
  of: string;
  entries: string;
  previous: string;
  next: string;
  
  // Product Stock page
  productName: string;
  category: string;
  price: string;
  piece: string;
  availableColor: string;
  action: string;
  edit: string;
  delete: string;
  image: string;
}

export const translations: Record<Language, Translations> = {
  ko: {
    // Menu items
    dashboard: '대시보드',
    orderManagement: '주문관리',
    orderInput: '주문입력',
    purchaseList: '사입목록',
    productionItems: '제작상품',
    receivingList: '입고목록',
    shippingStatus: '배송현황',
    productManagement: '상품관리',
    chinaWork: '중국업무',
    invoice: '인보이스',
    kbSettlement: 'K&B정산',
    vendorSettlement: '업체정산',
    depositConfirmation: '입금확인',
    exchangeRefund: '교환환불',
    shippingTracking: '배송조회',
    marketingReport: '마케팅 리포트',
    
    // Actions
    excelUpload: '엑셀 업로드',
    excelDownload: '엑셀 다운로드',
    barcodeOutput: '바코드 출력',
    resetFilter: '필터 초기화',
    search: '검색',
    
    // Common
    notifications: '알림',
    profile: '프로필',
    settings: '설정',
    logout: '로그아웃',
    language: '언어',
    theme: '테마',
    light: '라이트',
    dark: '다크',
    
    // Filter
    date: '날짜',
    orderType: '주문유형',
    orderStatus: '주문상태',
    all: '전체',
    
    // Table common
    showing: '표시',
    of: '중',
    entries: '개',
    previous: '이전',
    next: '다음',
    
    // Product Stock page
    productName: '상품명',
    category: '카테고리',
    price: '가격',
    piece: '재고',
    availableColor: '색상',
    action: '작업',
    edit: '수정',
    delete: '삭제',
    image: '이미지',
  },
  zh: {
    // Menu items
    dashboard: '仪表盘',
    orderManagement: '订单管理',
    orderInput: '订单录入',
    purchaseList: '采购清单',
    productionItems: '生产商品',
    receivingList: '入库清单',
    shippingStatus: '发货状态',
    productManagement: '商品管理',
    chinaWork: '中国业务',
    invoice: '发票',
    kbSettlement: 'K&B结算',
    vendorSettlement: '供应商结算',
    depositConfirmation: '收款确认',
    exchangeRefund: '换货退款',
    shippingTracking: '物流查询',
    marketingReport: '营销报告',
    
    // Actions
    excelUpload: '上传Excel',
    excelDownload: '下载Excel',
    barcodeOutput: '打印条码',
    resetFilter: '重置筛选',
    search: '搜索',
    
    // Common
    notifications: '通知',
    profile: '个人资料',
    settings: '设置',
    logout: '退出登录',
    language: '语言',
    theme: '主题',
    light: '浅色',
    dark: '深色',
    
    // Filter
    date: '日期',
    orderType: '订单类型',
    orderStatus: '订单状态',
    all: '全部',
    
    // Table common
    showing: '显示',
    of: '共',
    entries: '条',
    previous: '上一页',
    next: '下一页',
    
    // Product Stock page
    productName: '商品名称',
    category: '分类',
    price: '价格',
    piece: '库存',
    availableColor: '颜色',
    action: '操作',
    edit: '编辑',
    delete: '删除',
    image: '图片',
  },
};

// Order List column schema
export interface ColumnDef {
  letter: string;
  key: string;
  group: '기타' | '자사 정보' | '업체 정보' | '구매 정보' | '예약정보';
  labelKo: string;
  labelZh: string;
  example: string | number;
}

export const orderListColumns: ColumnDef[] = [
  { letter: "A", key: "ca", group: "기타", labelKo: "날짜", labelZh: "时间", example: "20250621" },
  { letter: "B", key: "cb", group: "자사 정보", labelKo: "사진", labelZh: "图片", example: "0" },
  { letter: "C", key: "cc", group: "자사 정보", labelKo: "URL", labelZh: "URL", example: "http://www.moulian.com/ch_pc/shop/..." },
  { letter: "D", key: "cd", group: "자사 정보", labelKo: "제품번호", labelZh: "产品编号", example: "SK#4865" },
  { letter: "E", key: "ce", group: "자사 정보", labelKo: "상품명", labelZh: "商品名", example: "크로셰 펀칭 A라인..." },
  { letter: "F", key: "cf", group: "자사 정보", labelKo: "옵션", labelZh: "选项", example: "아이보리,F" },
  { letter: "G", key: "cg", group: "자사 정보", labelKo: "원가(₩)", labelZh: "价格(₩)", example: 7770 },
  { letter: "H", key: "ch", group: "업체 정보", labelKo: "구매 URL", labelZh: "购买 URL", example: "https://www.vvic.co/m/item/..." },
  { letter: "I", key: "ci", group: "업체 정보", labelKo: "업체명", labelZh: "公司名称", example: "VVIC" },
  { letter: "J", key: "cj", group: "업체 정보", labelKo: "주소", labelZh: "地址", example: "SA3-LAOJINMA..." },
  { letter: "K", key: "ck", group: "업체 정보", labelKo: "전화번호", labelZh: "电话号码", example: "16620181 / 8495,13725..." },
  { letter: "L", key: "cl", group: "업체 정보", labelKo: "제품번호", labelZh: "产品款号", example: "7716" },
  { letter: "M", key: "cm", group: "업체 정보", labelKo: "위챗", labelZh: "微信", example: "1.66E+10" },
  { letter: "N", key: "cn", group: "업체 정보", labelKo: "옵션", labelZh: "选项", example: "xingse,F" },
  { letter: "O", key: "co", group: "업체 정보", labelKo: "원가(￥)", labelZh: "价格(￥)", example: 39 },
  { letter: "P", key: "cp", group: "구매 정보", labelKo: "주문수량", labelZh: "订货数量", example: 2 },
  { letter: "Q", key: "cq", group: "구매 정보", labelKo: "구매수량", labelZh: "购买数量", example: "" },
  { letter: "R", key: "cr", group: "구매 정보", labelKo: "잔여수량", labelZh: "剩余数量", example: "" },
  { letter: "S", key: "cs", group: "구매 정보", labelKo: "구매총액", labelZh: "购买总额", example: "" },
  { letter: "T", key: "ct", group: "구매 정보", labelKo: "선지금", labelZh: "预付款", example: "" },
  { letter: "U", key: "cu", group: "구매 정보", labelKo: "지불금액", labelZh: "支付金额", example: "" },
  { letter: "V", key: "cv", group: "구매 정보", labelKo: "유의사항", labelZh: "购买备注", example: "F" },
  { letter: "W", key: "cw", group: "예약정보", labelKo: "예약일자", labelZh: "下单日期", example: "" },
  { letter: "X", key: "cx", group: "예약정보", labelKo: "예약수량", labelZh: "预计数量", example: "" },
  { letter: "Y", key: "cy", group: "예약정보", labelKo: "선금", labelZh: "首付", example: "" },
  { letter: "Z", key: "cz", group: "예약정보", labelKo: "잔금", labelZh: "平衡", example: "" },
  { letter: "AA", key: "caa", group: "기타", labelKo: "바코드", labelZh: "条形码", example: "1-57398200-02" },
  { letter: "AB", key: "cab", group: "기타", labelKo: "셀메이트번호", labelZh: "SellMate No", example: 57398 },
  { letter: "AC", key: "cac", group: "기타", labelKo: "담당자", labelZh: "经理", example: "王静伟" },
];

export const groupColors: Record<string, string> = {
  '기타': 'bg-group-etc',
  '자사 정보': 'bg-group-company',
  '업체 정보': 'bg-group-vendor',
  '구매 정보': 'bg-group-purchase',
  '예약정보': 'bg-group-reservation',
};

export const groupLabels: Record<string, Record<Language, string>> = {
  '기타': { ko: '기타', zh: '其他' },
  '자사 정보': { ko: '자사 정보', zh: '公司信息' },
  '업체 정보': { ko: '업체 정보', zh: '供应商信息' },
  '구매 정보': { ko: '구매 정보', zh: '采购信息' },
  '예약정보': { ko: '예약정보', zh: '预订信息' },
};

