import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function OrderInputPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title={{ ko: "주문입력", zh: "订单录入" }}
        actions={[
          {
            key: "excelUpload",
            label: { ko: "엑셀 업로드", zh: "Excel 上传" },
            icon: Upload,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-asia-light text-muted-foreground">
            주문 입력 폼 영역(더미). UI는 추후 확장합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


