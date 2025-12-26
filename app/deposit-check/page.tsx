import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function DepositCheckPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "입금확인", zh: "入金确认" }}
        actions={[
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            입금확인 페이지(더미).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


