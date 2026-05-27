"use client";

import { Palette, Layers, Type } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";

// shadcn UI Card 컴포넌트 추가
import { Card, CardContent } from "@/components/shadcn-ui/card";

// 분리된 테스터 하위 컴포넌트 임포트
import ColorPaletteTester from "./color-palette-tester";
import TypographyTester from "./typography-tester";
import UiComponentsTester from "./ui-components-tester";

// hydration 방지 및 클라이언트 마운트 감지용 subscription 함수
const subscribe = () => () => {};

export default function DesignSystemTester() {
  const t = useTranslations("ClientTest");
  const [activeTab, setActiveTab] = useState<
    "palette" | "typography" | "components"
  >("palette");

  // useSyncExternalStore를 활용하여 SSR과 CSR 상태 불일치 없이 마운트 상태 확인
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );

  if (!isMounted) {
    return (
      <Card className="animate-pulse p-8">
        <div className="bg-muted mb-4 h-6 w-48 rounded" />
        <div className="bg-muted mb-2 h-4 w-full rounded" />
        <div className="bg-muted h-4 w-3/4 rounded" />
      </Card>
    );
  }

  return (
    <Card className="mt-8 overflow-hidden shadow-sm transition-all duration-300">
      {/* 컴포넌트 헤더 */}
      <div className="bg-secondary/30 border-border flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Palette className="text-primary h-5 w-5" />
            <h2 className="text-foreground text-lg font-bold">
              주세요 디자인 시스템 통합 테스터
            </h2>
          </div>
          <p className="text-muted-foreground text-xs">
            {t("clientMessage")} (DESIGN.md 가이드에 입각한 컬러, 타이포 및
            컴포넌트 스펙 모니터링)
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-muted flex shrink-0 self-start rounded-md p-1 md:self-auto">
          <button
            onClick={() => setActiveTab("palette")}
            type="button"
            className={`flex cursor-pointer items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeTab === "palette"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            컬러 팔레트
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            type="button"
            className={`flex cursor-pointer items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeTab === "typography"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Type className="h-3.5 w-3.5" />
            타이포그래피
          </button>
          <button
            onClick={() => setActiveTab("components")}
            type="button"
            className={`flex cursor-pointer items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeTab === "components"
                ? "bg-card text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
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
