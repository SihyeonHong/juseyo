import SectionContainer from "@/components/mypage/section-container";
import { Separator } from "@/components/shadcn-ui/separator";
import EmptySection from "@/components/tester/empty-section";

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8">
      <p className="text-xs">{userId}님의 마이페이지</p>

      {/* 수직으로 구성된 3개 섹션 및 구분선 */}
      <div className="flex flex-col gap-2">
        <SectionContainer title="마켓 프로필">
          <EmptySection title="마켓 프로필" />
        </SectionContainer>

        <Separator className="bg-border/60" />

        <SectionContainer title="상품 관리">
          <EmptySection title="상품 관리" />
        </SectionContainer>

        <Separator className="bg-border/60" />

        <SectionContainer title="회원정보 관리">
          <EmptySection title="회원정보 관리" />
        </SectionContainer>
      </div>
    </div>
  );
}
