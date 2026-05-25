"use client";

import { 
  Palette, 
  Layers, 
  Type 
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";

// shadcn UI Card 컴포넌트 추가
import { 
  Card, 
  CardContent 
} from "@/components/shadcn-ui/card";

// 분리된 테스터 하위 컴포넌트 임포트
import ColorPaletteTester from "./design-system/color-palette-tester";
import TypographyTester from "./design-system/typography-tester";
import UiComponentsTester from "./design-system/ui-components-tester";

// hydration 방지 및 클라이언트 마운트 감지용 subscription 함수
const subscribe = () => () => {};

export default function DesignSystemTester() {
  const t = useTranslations("ClientTest");
  const [activeTab, setActiveTab] = useState<"palette" | "typography" | "components">("palette");

  // useSyncExternalStore를 활용하여 SSR과 CSR 상태 불일치 없이 마운트 상태 확인
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );

  if (!isMounted) {
    return (
      <Card className="animate-pulse p-8">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-4 w-full bg-muted rounded mb-2" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </Card>
    );
  }

  return (
    <Card className="mt-8 overflow-hidden shadow-sm transition-all duration-300">
      {/* 컴포넌트 헤더 */}
      <div className="p-6 bg-secondary/30 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">주세요 디자인 시스템 통합 테스터</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("clientMessage")} (DESIGN.md 가이드에 입각한 컬러, 타이포 및 컴포넌트 스펙 모니터링)
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex bg-muted p-1 rounded-md shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("palette")}
            type="button"
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "palette"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            컬러 팔레트
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            type="button"
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "typography"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            타이포그래피
          </button>
          <button
            onClick={() => setActiveTab("components")}
            type="button"
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "components"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            UI 구성요소
          </button>
        </div>
      </div>

      {/* 탭 내용 영역 */}
      <CardContent className="p-6">
        {activeTab === "palette" && <ColorPaletteTester />}
        {activeTab === "typography" && <TypographyTester />}
        {activeTab === "components" && <UiComponentsTester />}
      </CardContent>
    </Card>
  );
}
