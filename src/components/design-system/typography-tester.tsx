"use client";

import { Info } from "lucide-react";

import { 
  Card, 
  CardContent 
} from "@/components/shadcn-ui/card";

// typography spec item type definition
export interface FontSpecItem {
  role: string;
  size: string;
  weight: string;
  weightLabel: string;
  lineHeight: string;
  letterSpacing: string;
  usage: string;
  style: React.CSSProperties;
}

const typographySpecs: FontSpecItem[] = [
  {
    role: "Display",
    size: "24px (1.5rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.3",
    letterSpacing: "-0.5px",
    usage: "페이지 타이틀, 큰 숫자 강조",
    style: { fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.5px" }
  },
  {
    role: "Heading 1",
    size: "20px (1.25rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.4",
    letterSpacing: "-0.4px",
    usage: "섹션 제목",
    style: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.4, letterSpacing: "-0.4px" }
  },
  {
    role: "Heading 2",
    size: "17px (1.0625rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.4",
    letterSpacing: "-0.3px",
    usage: "하위 섹션 제목, 로고 텍스트",
    style: { fontSize: "1.0625rem", fontWeight: 700, lineHeight: 1.4, letterSpacing: "-0.3px" }
  },
  {
    role: "Heading 3",
    size: "16px (1rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.4",
    letterSpacing: "-0.3px",
    usage: "카드 내부 제목, 강조 라벨",
    style: { fontSize: "1rem", fontWeight: 700, lineHeight: 1.4, letterSpacing: "-0.3px" }
  },
  {
    role: "Body Strong",
    size: "14px (0.875rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.5",
    letterSpacing: "-0.3px",
    usage: "가격, 중요 수치",
    style: { fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: "-0.3px" }
  },
  {
    role: "Body Medium",
    size: "14px (0.875rem)",
    weight: "500",
    weightLabel: "Medium",
    lineHeight: "1.5",
    letterSpacing: "normal",
    usage: "네비게이션, 버튼 텍스트",
    style: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "normal" }
  },
  {
    role: "Body",
    size: "14px (0.875rem)",
    weight: "400",
    weightLabel: "Regular",
    lineHeight: "1.6",
    letterSpacing: "normal",
    usage: "일반 본문 텍스트",
    style: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6, letterSpacing: "normal" }
  },
  {
    role: "Caption",
    size: "13px (0.8125rem)",
    weight: "500",
    weightLabel: "Medium",
    lineHeight: "1.4",
    letterSpacing: "normal",
    usage: "보조 설명, 필터 칩 텍스트",
    style: { fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4, letterSpacing: "normal" }
  },
  {
    role: "Small",
    size: "12px (0.75rem)",
    weight: "500",
    weightLabel: "Medium",
    lineHeight: "1.5",
    letterSpacing: "normal",
    usage: "힌트, 메타데이터, 카트 아이템",
    style: { fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "normal" }
  },
  {
    role: "Micro",
    size: "11px (0.6875rem)",
    weight: "600",
    weightLabel: "SemiBold",
    lineHeight: "1.3",
    letterSpacing: "normal",
    usage: "라벨, 뱃지, 단위 텍스트",
    style: { fontSize: "0.6875rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "normal" }
  },
  {
    role: "Tag",
    size: "10px (0.625rem)",
    weight: "700",
    weightLabel: "Bold",
    lineHeight: "1.3",
    letterSpacing: "0.4px",
    usage: "뱃지, 상태 태그, 카드 카테고리",
    style: { fontSize: "0.625rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "0.4px" }
  }
];

export default function TypographyTester() {
  return (
    <div className="space-y-6">
      {/* typography guide tip */}
      <Card>
        <CardContent className="flex gap-3 p-4">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            DESIGN.md에 정의된 Pretendard 폰트 규격 지침서에 기반한 타이포 계층 구조 테스터입니다. 폰트 굵기(Weight)는 400(Regular), 500(Medium), 700(Bold) 3단계 구조를 원칙으로 합니다.
          </div>
        </CardContent>
      </Card>

      {/* typography spec table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-12 gap-2 p-3 bg-secondary/30 border-b border-border text-xs font-semibold text-muted-foreground">
            <div className="col-span-2">역할명 (Role)</div>
            <div className="col-span-3">규격 스펙 (Spec)</div>
            <div className="col-span-5">실제 예문 테스터 (Live Text)</div>
            <div className="col-span-2 text-right">주요 용도 (Usage)</div>
          </div>

          <div className="divide-y divide-border">
            {typographySpecs.map((spec) => (
              <div 
                key={spec.role} 
                className="grid grid-cols-1 md:grid-cols-12 gap-2 p-4 md:p-3 items-center hover:bg-muted/30 transition-colors"
              >
                {/* role name */}
                <div className="col-span-1 md:col-span-2 flex flex-col md:block">
                  <span className="text-xs font-bold text-foreground">{spec.role}</span>
                  <span className="md:hidden text-[9px] text-muted-foreground mt-0.5">{spec.usage}</span>
                </div>

                {/* spec definition */}
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-1.5 md:block space-y-0.5">
                  <div className="text-[10px] md:text-xs font-mono text-muted-foreground">
                    Size: <span className="text-foreground font-semibold">{spec.size}</span>
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-muted-foreground">
                    Weight: <span className="text-foreground font-semibold">{spec.weight} ({spec.weightLabel})</span>
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-muted-foreground">
                    LineHeight: <span className="text-foreground font-semibold">{spec.lineHeight}</span>
                  </div>
                  {spec.letterSpacing !== "normal" && (
                    <div className="text-[10px] md:text-xs font-mono text-muted-foreground">
                      Spacing: <span className="text-foreground font-semibold">{spec.letterSpacing}</span>
                    </div>
                  )}
                </div>

                {/* live preview text area */}
                <div className="col-span-1 md:col-span-5 py-2 md:py-0 border-y border-dashed border-border md:border-0 my-1 md:my-0">
                  <p style={spec.style} className="text-foreground font-sans truncate">
                    신뢰할 수 있는 주세요 디자인 시스템 12,345원 (100%)
                  </p>
                </div>

                {/* usage notes */}
                <div className="hidden md:block col-span-1 md:col-span-2 text-right text-xs text-muted-foreground">
                  {spec.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
