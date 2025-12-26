import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";

export default function InvoicePage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "인보이스", zh: "发票" }}
        actions={[
          { key: "excelUpload", label: { ko: "엑셀 업로드", zh: "Excel 上传" }, icon: Upload },
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            인보이스 페이지(더미). 업로드/다운로드 액션 UI를 포함합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


