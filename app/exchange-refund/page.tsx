import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";

export default function ExchangeRefundPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "교환환불", zh: "退换/退款" }}
        actions={[
          { key: "excelUpload", label: { ko: "엑셀 업로드", zh: "Excel 上传" }, icon: Upload },
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Exchange / Refund</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            교환환불 페이지(더미).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


