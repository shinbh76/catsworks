import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function VendorSettlementPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "업체정산", zh: "供应商结算" }}
        actions={[
          { key: "excelDownload", label: { ko: "엑셀 다운로드", zh: "Excel 下载" }, icon: Download },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            업체정산 페이지(더미).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


