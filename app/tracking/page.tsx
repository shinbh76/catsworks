import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "배송조회", zh: "物流查询" }}
        actions={[
          { key: "excelUpload", label: { ko: "엑셀 업로드", zh: "Excel 上传" }, icon: Upload },
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            배송조회 페이지(더미).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


