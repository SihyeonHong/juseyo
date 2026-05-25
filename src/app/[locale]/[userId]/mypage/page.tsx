import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/shadcn-ui/field";
import { Input } from "@/components/shadcn-ui/input";
import { Separator } from "@/components/shadcn-ui/separator";
import { Textarea } from "@/components/shadcn-ui/textarea";

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 md:px-8">
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <h1 className="text-[24px] font-bold leading-[1.3] tracking-[-0.5px]">
          내 상품 관리
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {userId}님의 판매 상품을 관리합니다.
        </p>
      </div>

      <Separator />

      {/* 상품 등록 폼 placeholder */}
      <section className="mt-6">
        <FieldSet>
          <FieldLegend>상품 정보</FieldLegend>
          <FieldDescription>
            판매할 상품의 기본 정보를 입력합니다.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="product-title">상품명</FieldLabel>
              <Input
                id="product-title"
                autoComplete="off"
                placeholder="예: 르세라핌 카즈하 포토카드"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="product-price">가격</FieldLabel>
              <Input
                id="product-price"
                type="number"
                autoComplete="off"
                placeholder="0"
              />
              <FieldDescription>원 단위로 입력합니다.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="product-description">상품 설명</FieldLabel>
              <Textarea
                id="product-description"
                placeholder="상품 상태, 거래 방법 등을 작성합니다."
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>

      <Separator className="my-6" />

      {/* 카테고리/상태 설정 placeholder */}
      <section>
        <FieldSet>
          <FieldLegend>판매 설정</FieldLegend>
          <FieldDescription>
            상품의 카테고리와 판매 상태를 설정합니다.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="product-category">카테고리</FieldLabel>
              <Input
                id="product-category"
                autoComplete="off"
                placeholder="예: 포토카드"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="product-status">판매 상태</FieldLabel>
              <Input
                id="product-status"
                autoComplete="off"
                placeholder="판매중"
                disabled
              />
              <FieldDescription>
                판매중 / 거래중 / 판매완료 / 비공개
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>

      <Separator className="my-6" />

      {/* ID 일괄 처리 placeholder */}
      <section>
        <FieldSet>
          <FieldLegend>ID 일괄 처리</FieldLegend>
          <FieldDescription>
            구매자에게 받은 상품 ID 목록을 붙여넣어 일괄 상태 변경합니다.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="bulk-ids">상품 ID 목록</FieldLabel>
              <Textarea
                id="bulk-ids"
                placeholder="ID를 쉼표 또는 줄바꿈으로 구분하여 입력합니다."
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>
    </div>
  );
}
