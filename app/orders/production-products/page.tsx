import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function ProductionProductsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "제작상품", zh: "制作商品" }}
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
          <CardTitle>Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            제작상품 테이블(더미). 필요 시 Product Stock 구성 요소를 재사용합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


