import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function ShippingStatusPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "배송현황", zh: "配送状态" }}
        actions={[
          {
            key: "excelDownload",
            label: { ko: "엑셀 다운로드", zh: "Excel 下载" },
            icon: Download,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            배송현황 페이지(더미). UI는 추후 확장합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


