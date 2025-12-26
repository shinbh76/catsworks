import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";

export default function KbSettlementPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "K&B정산", zh: "K&B结算" }}
        actions={[
          { key: "excelUpload", label: { ko: "엑셀 업로드", zh: "Excel 上传" }, icon: Upload },
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Settlement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            K&B정산 페이지(더미).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


