import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Barcode, Download } from "lucide-react";

export default function InboundListsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "입고목록", zh: "入库列表" }}
        actions={[
          { key: "barcodePrint", label: { ko: "바코드 출력", zh: "条码打印" }, icon: Barcode },
          {
            key: "excelDownload",
            label: { ko: "엑셀 다운로드", zh: "Excel 下载" },
            icon: Download,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Inbound</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            입고목록 페이지(더미). 바코드 출력/엑셀 다운로드 액션 UI만 우선 반영했습니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


