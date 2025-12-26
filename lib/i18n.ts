export type Lang = "ko" | "zh";

export const translations = {
  ko: {
    sidebar: {
      dashboard: "대시보드",
      orderManagement: "주문관리",
      orderInput: "주문입력",
      orderList: "사입목록",
      productionProduct: "제작상품",
      receivingList: "입고목록",
      deliveryStatus: "배송현황",
      productManagement: "상품관리",
      chinaBusiness: "중국업무",
      invoice: "인보이스",
      kbSettlement: "K&B정산",
      vendorSettlement: "업체정산",
      depositConfirmation: "입금확인",
      exchangeRefund: "교환환불",
      deliveryInquiry: "배송조회",
      marketingReport: "마케팅 리포트",
    },
    common: {
      search: "검색",
      notification: "알림",
      profile: "프로필",
      logout: "로그아웃",
      excelUpload: "엑셀 업로드",
      excelDownload: "엑셀 다운로드",
      barcodePrint: "바코드 출력",
      resetFilter: "필터 초기화",
      date: "날짜",
      orderType: "주문 유형",
      orderStatus: "주문 상태",
    },
  },
  zh: {
    sidebar: {
      dashboard: "仪表板",
      orderManagement: "订单管理",
      orderInput: "订单输入",
      orderList: "采购清单",
      productionProduct: "制作商品",
      receivingList: "入库清单",
      deliveryStatus: "配送状态",
      productManagement: "商品管理",
      chinaBusiness: "中国业务",
      invoice: "发票",
      kbSettlement: "K&B结算",
      vendorSettlement: "供应商结算",
      depositConfirmation: "入金确认",
      exchangeRefund: "换货退款",
      deliveryInquiry: "配送查询",
      marketingReport: "营销报告",
    },
    common: {
      search: "搜索",
      notification: "通知",
      profile: "个人资料",
      logout: "登出",
      excelUpload: "Excel上传",
      excelDownload: "Excel下载",
      barcodePrint: "条形码打印",
      resetFilter: "重置筛选",
      date: "日期",
      orderType: "订单类型",
      orderStatus: "订单状态",
    },
  },
} as const;

export function getTranslation(lang: Lang) {
  return translations[lang];
}
