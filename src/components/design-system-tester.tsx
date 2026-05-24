"use client";

import { 
  Palette, 
  Layers, 
  Type,
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Sparkles,
  Command,
  Activity
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";

// 컬러 팔레트 타입 정의
interface ColorItem {
  name: string;
  variable: string;
  tailwindClass: string;
  bgClass: string;
  textClass: string;
  description: string;
  contrastText?: string;
  contrastClass?: string;
}

// 타이포그래피 스펙 타입 정의
interface FontSpecItem {
  role: string;
  size: string;
  weight: string;
  weightLabel: string;
  lineHeight: string;
  letterSpacing: string;
  usage: string;
  style: React.CSSProperties;
}

// hydration 방지 및 클라이언트 마운트 감지용 subscription 함수
const subscribe = () => () => {};

export default function DesignSystemTester() {
  const t = useTranslations("ClientTest");
  const [activeTab, setActiveTab] = useState<"palette" | "typography" | "components">("palette");
  const [inputText, setInputText] = useState("");

  // useSyncExternalStore를 활용하여 SSR과 CSR 상태 불일치 없이 마운트 상태 확인
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );

  if (!isMounted) {
    return (
      <div className="p-8 border border-border bg-card rounded-md animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-4 w-full bg-muted rounded mb-2" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
    );
  }

  // 기본 테마 컬러 정의
  const baseColors: ColorItem[] = [
    {
      name: "Background",
      variable: "var(--background)",
      tailwindClass: "bg-background",
      bgClass: "bg-background",
      textClass: "text-foreground",
      description: "전체 화면의 base background 컬러",
      contrastText: "Foreground Text",
      contrastClass: "text-foreground"
    },
    {
      name: "Foreground",
      variable: "var(--foreground)",
      tailwindClass: "text-foreground",
      bgClass: "bg-foreground",
      textClass: "text-background",
      description: "기본 텍스트 및 전경 컬러",
      contrastText: "Background Text",
      contrastClass: "text-background"
    },
    {
      name: "Card",
      variable: "var(--card)",
      tailwindClass: "bg-card",
      bgClass: "bg-card border border-border",
      textClass: "text-card-foreground",
      description: "콘텐츠 카드의 background 컬러",
      contrastText: "Card Foreground",
      contrastClass: "text-card-foreground"
    },
    {
      name: "Card Foreground",
      variable: "var(--card-foreground)",
      tailwindClass: "text-card-foreground",
      bgClass: "bg-card-foreground",
      textClass: "text-card",
      description: "카드 내부의 기본 텍스트 컬러",
      contrastText: "Card Base Text",
      contrastClass: "text-card"
    },
    {
      name: "Muted",
      variable: "var(--muted)",
      tailwindClass: "bg-muted",
      bgClass: "bg-muted",
      textClass: "text-muted-foreground",
      description: "비활성 또는 비강조 영역 background 컬러",
      contrastText: "Muted Foreground",
      contrastClass: "text-muted-foreground"
    },
    {
      name: "Muted Foreground",
      variable: "var(--muted-foreground)",
      tailwindClass: "text-muted-foreground",
      bgClass: "bg-muted-foreground",
      textClass: "text-card",
      description: "비강조 힌트 텍스트 컬러",
      contrastText: "Muted text demo",
      contrastClass: "text-card"
    },
    {
      name: "Border",
      variable: "var(--border)",
      tailwindClass: "border-border",
      bgClass: "bg-border",
      textClass: "text-foreground",
      description: "구분선 및 테두리 기본 컬러",
      contrastText: "Border line element",
      contrastClass: "text-foreground"
    },
    {
      name: "Input",
      variable: "var(--input)",
      tailwindClass: "border-input",
      bgClass: "bg-input",
      textClass: "text-foreground",
      description: "form input 컨트롤 테두리 컬러",
      contrastText: "Input box border style",
      contrastClass: "text-foreground"
    },
    {
      name: "Ring",
      variable: "var(--ring)",
      tailwindClass: "ring-ring",
      bgClass: "bg-ring",
      textClass: "text-background",
      description: "포커스 링 표시용 컬러",
      contrastText: "Focus ring shadow color",
      contrastClass: "text-background"
    }
  ];

  // 브랜드 컬러 정의
  const brandColors: ColorItem[] = [
    {
      name: "Primary",
      variable: "var(--primary)",
      tailwindClass: "bg-primary",
      bgClass: "bg-primary",
      textClass: "text-primary-foreground",
      description: "메인 브랜드 퍼플 컬러",
      contrastText: "Primary Foreground Text",
      contrastClass: "text-primary-foreground"
    },
    {
      name: "Primary Foreground",
      variable: "var(--primary-foreground)",
      tailwindClass: "text-primary-foreground",
      bgClass: "bg-primary-foreground border border-border",
      textClass: "text-primary",
      description: "primary background 위의 텍스트 컬러",
      contrastText: "Primary Tone Contrast",
      contrastClass: "text-primary"
    },
    {
      name: "Primary Light",
      variable: "var(--primary-light)",
      tailwindClass: "bg-primary-light",
      bgClass: "bg-primary-light",
      textClass: "text-white",
      description: "보조 퍼플 및 활성화 강조 컬러",
      contrastText: "White text over light primary",
      contrastClass: "text-white"
    },
    {
      name: "Secondary",
      variable: "var(--secondary)",
      tailwindClass: "bg-secondary",
      bgClass: "bg-secondary",
      textClass: "text-secondary-foreground",
      description: "연한 라벤더 보조 background 컬러",
      contrastText: "Secondary Foreground Text",
      contrastClass: "text-secondary-foreground"
    },
    {
      name: "Secondary Foreground",
      variable: "var(--secondary-foreground)",
      tailwindClass: "text-secondary-foreground",
      bgClass: "bg-secondary-foreground",
      textClass: "text-secondary",
      description: "secondary background 위의 텍스트 컬러",
      contrastText: "Secondary Contrast Accent",
      contrastClass: "text-secondary"
    },
    {
      name: "Accent",
      variable: "var(--accent)",
      tailwindClass: "bg-accent",
      bgClass: "bg-accent",
      textClass: "text-accent-foreground",
      description: "소프트 핑크 포인트 컬러",
      contrastText: "Accent Foreground Text",
      contrastClass: "text-accent-foreground"
    },
    {
      name: "Accent Foreground",
      variable: "var(--accent-foreground)",
      tailwindClass: "text-accent-foreground",
      bgClass: "bg-accent-foreground border border-border",
      textClass: "text-accent",
      description: "accent background 위의 텍스트 컬러",
      contrastText: "Accent Tone Contrast",
      contrastClass: "text-accent"
    },
    {
      name: "Accent Light",
      variable: "var(--accent-light)",
      tailwindClass: "bg-accent-light",
      bgClass: "bg-accent-light",
      textClass: "text-accent",
      description: "매우 연한 핑크 톤 강조 영역 컬러",
      contrastText: "Accent text over pink background",
      contrastClass: "text-accent"
    }
  ];

  // 상태 컬러 정의
  const statusColors: ColorItem[] = [
    {
      name: "Success",
      variable: "var(--success)",
      tailwindClass: "bg-success",
      bgClass: "bg-success",
      textClass: "text-white",
      description: "성공 메시지 및 완료 상태 컬러",
      contrastText: "Success Check Text",
      contrastClass: "text-white"
    },
    {
      name: "Success BG",
      variable: "var(--success-bg)",
      tailwindClass: "bg-success-bg",
      bgClass: "bg-success-bg border border-success/20",
      textClass: "text-success",
      description: "성공 알림 배너 background 컬러",
      contrastText: "Success status text check",
      contrastClass: "text-success"
    },
    {
      name: "Warning",
      variable: "var(--warning)",
      tailwindClass: "bg-warning",
      bgClass: "bg-warning",
      textClass: "text-white",
      description: "주의 및 경고 상태 메인 컬러",
      contrastText: "Warning Warning Text",
      contrastClass: "text-white"
    },
    {
      name: "Warning BG",
      variable: "var(--warning-bg)",
      tailwindClass: "bg-warning-bg",
      bgClass: "bg-warning-bg border border-warning/20",
      textClass: "text-warning",
      description: "경고 알림 배너 background 컬러",
      contrastText: "Warning alert text check",
      contrastClass: "text-warning"
    },
    {
      name: "Destructive",
      variable: "var(--destructive)",
      tailwindClass: "bg-destructive",
      bgClass: "bg-destructive",
      textClass: "text-destructive-foreground",
      description: "오류 및 삭제 등 유해한 작업 상태 컬러",
      contrastText: "Destructive Foreground Text",
      contrastClass: "text-destructive-foreground"
    },
    {
      name: "Destructive Foreground",
      variable: "var(--destructive-foreground)",
      tailwindClass: "text-destructive-foreground",
      bgClass: "bg-destructive-foreground border border-border",
      textClass: "text-destructive",
      description: "destructive background 위의 텍스트 컬러",
      contrastText: "Destructive text match",
      contrastClass: "text-destructive"
    }
  ];

  // 타이포그래피 세부 스펙 정의
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

  // 컬러 스와치 카드 컴포넌트 (복사 기능 제외)
  const ColorSwatchStatic = ({ item }: { item: ColorItem }) => {
    return (
      <div className="bg-card border border-border rounded-md overflow-hidden hover:shadow-xs transition-all duration-300 flex flex-col">
        {/* 상단 컬러 스와치 미리보기 영역 */}
        <div className={`h-20 ${item.bgClass} flex justify-center items-center p-3 text-center transition-all duration-300`}>
          {item.contrastText && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 backdrop-blur-xs ${item.contrastClass}`}>
              {item.contrastText}
            </span>
          )}
        </div>

        {/* 하단 컬러 스펙 설명 영역 */}
        <div className="p-3.5 flex flex-col flex-1 bg-card">
          <h4 className="font-bold text-xs text-foreground mb-1">{item.name}</h4>
          
          <p className="text-[10px] text-muted-foreground leading-relaxed mb-3 flex-1">
            {item.description}
          </p>

          <div className="space-y-1 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between text-[9px] font-mono py-0.5 px-1 rounded bg-muted/40 text-foreground/70">
              <span className="text-[8px] text-muted-foreground">VAR</span>
              <span className="truncate ml-1">{item.variable}</span>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono py-0.5 px-1 rounded bg-muted/40 text-foreground/70">
              <span className="text-[8px] text-muted-foreground">TW</span>
              <span className="truncate ml-1">{item.tailwindClass}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 border border-border bg-card text-foreground rounded-lg overflow-hidden shadow-sm transition-all duration-300">
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
      <div className="p-6">
        {activeTab === "palette" ? (
          <div className="space-y-8">
            {/* 컬러 테스트 안내 */}
            <div className="flex gap-3 p-4 rounded-md bg-secondary/20 border border-border text-xs text-foreground/90">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                우측 상단의 다크/라이트 모드 버튼을 조작하여 각 토큰 변수들의 동적 대응 상태를 확인할 수 있습니다. 모든 컬러는 HEX 코드 하드코딩 없이 CSS 변수를 기반으로 맵핑되어 있습니다.
              </div>
            </div>

            {/* 기본 테마 컬러 */}
            <div>
              <div className="flex items-center gap-2 mb-3.5 pb-1 border-b border-border/60">
                <Command className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-foreground">기본 테마 컬러 (Base Theme Colors)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {baseColors.map((color) => (
                  <ColorSwatchStatic key={color.name} item={color} />
                ))}
              </div>
            </div>

            {/* 브랜드 컬러 */}
            <div>
              <div className="flex items-center gap-2 mb-3.5 pb-1 border-b border-border/60">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-foreground">브랜드 정체성 컬러 (Brand Colors)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandColors.map((color) => (
                  <ColorSwatchStatic key={color.name} item={color} />
                ))}
              </div>
            </div>

            {/* 상태 피드백 컬러 */}
            <div>
              <div className="flex items-center gap-2 mb-3.5 pb-1 border-b border-border/60">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-foreground">피드백 상태 컬러 (Status Colors)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statusColors.map((color) => (
                  <ColorSwatchStatic key={color.name} item={color} />
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === "typography" ? (
          <div className="space-y-6">
            {/* 타이포 안내 팁 */}
            <div className="flex gap-3 p-4 rounded-md bg-secondary/20 border border-border text-xs text-foreground/90">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                DESIGN.md에 정의된 Pretendard 폰트 규격 지침서에 기반한 타이포 계층 구조 테스터입니다. 폰트 굵기(Weight)는 400(Regular), 500(Medium), 700(Bold) 3단계 구조를 원칙으로 합니다.
              </div>
            </div>

            {/* 타이포 테스트 테이블 */}
            <div className="border border-border rounded-md overflow-hidden bg-card">
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
                    {/* 역할 이름 */}
                    <div className="col-span-1 md:col-span-2 flex flex-col md:block">
                      <span className="text-xs font-bold text-foreground">{spec.role}</span>
                      <span className="md:hidden text-[9px] text-muted-foreground mt-0.5">{spec.usage}</span>
                    </div>

                    {/* 스펙 명세 */}
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

                    {/* 실물 텍스트 테스트 영역 */}
                    <div className="col-span-1 md:col-span-5 py-2 md:py-0 border-y border-dashed border-border md:border-0 my-1 md:my-0">
                      <p style={spec.style} className="text-foreground font-sans truncate">
                        신뢰할 수 있는 주세요 디자인 시스템 12,345원 (100%)
                      </p>
                    </div>

                    {/* 용도 기재 */}
                    <div className="hidden md:block col-span-1 md:col-span-2 text-right text-xs text-muted-foreground">
                      {spec.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 버튼 인터페이스 */}
            <div>
              <h3 className="text-sm font-bold mb-4 pb-1 border-b border-border/60">1. 프리미엄 버튼 콜렉션 (Buttons)</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-97 transition-all cursor-pointer"
                >
                  Primary
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-secondary text-secondary-foreground hover:opacity-90 active:scale-97 transition-all cursor-pointer border border-border"
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-accent text-accent-foreground shadow-xs hover:opacity-90 active:scale-97 transition-all cursor-pointer"
                >
                  Accent
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-destructive text-destructive-foreground shadow-xs hover:opacity-90 active:scale-97 transition-all cursor-pointer"
                >
                  Destructive
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-card border border-border text-foreground hover:bg-muted active:scale-97 transition-all cursor-pointer"
                >
                  Outline Mode
                </button>
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                >
                  Disabled State
                </button>
              </div>
            </div>

            {/* 카드 둥글기 스펙 검사 */}
            <div>
              <h3 className="text-sm font-bold mb-4 pb-1 border-b border-border/60">2. 카드 및 테두리 반경 검사 (Radii & Cards)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border p-5 rounded-sm flex flex-col justify-between h-32 transition-transform duration-200 hover:-translate-y-0.5">
                  <div>
                    <span className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      rounded-sm (8px)
                    </span>
                    <h4 className="text-sm font-semibold mt-2.5">Small Rounded Card</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">정밀한 모듈 영역에 매핑됩니다.</p>
                </div>
                <div className="bg-card border border-border p-5 rounded-md flex flex-col justify-between h-32 transition-transform duration-200 hover:-translate-y-0.5">
                  <div>
                    <span className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      rounded-md (14px)
                    </span>
                    <h4 className="text-sm font-semibold mt-2.5">Medium Rounded Card</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">표준 정보 블록 및 그리드 요소용입니다.</p>
                </div>
                <div className="bg-card border border-border p-5 rounded-lg flex flex-col justify-between h-32 transition-transform duration-200 hover:-translate-y-0.5">
                  <div>
                    <span className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      rounded-lg (20px)
                    </span>
                    <h4 className="text-sm font-semibold mt-2.5">Large Rounded Card</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">메인 섹션 및 다이얼로그 모달용입니다.</p>
                </div>
              </div>
            </div>

            {/* 폼 컨트롤 포커스 인터랙션 */}
            <div>
              <h3 className="text-sm font-bold mb-4 pb-1 border-b border-border/60">3. 폼 컨트롤 포커싱 링 검사 (Form Controls)</h3>
              <div className="max-w-md space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="search-field" className="text-xs font-semibold text-foreground/80 block">
                    인터랙티브 검색바 데모 (border & focus ring 검사)
                  </label>
                  <div className="relative">
                    <input
                      id="search-field"
                      type="text"
                      placeholder="검색어를 입력하고 링(ring) 초점을 관찰해 보세요..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full text-xs py-2.5 pl-9 pr-4 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring"
                    />
                    <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 상태별 알림 배너 */}
            <div>
              <h3 className="text-sm font-bold mb-4 pb-1 border-b border-border/60">4. 상태별 피드백 배너 (Alerts)</h3>
              <div className="space-y-3 max-w-2xl">
                {/* Success alert banner */}
                <div className="flex items-start gap-3 p-3.5 rounded-md bg-success-bg border border-success/20 text-success text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">성공 상태 알림 (Success Status)</span>
                    <span className="opacity-90">작업이 완벽하게 완료되었습니다. 시스템이 정상 운영 중입니다.</span>
                  </div>
                </div>

                {/* Warning alert banner */}
                <div className="flex items-start gap-3 p-3.5 rounded-md bg-warning-bg border border-warning/20 text-warning text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">주의 경고 알림 (Warning Status)</span>
                    <span className="opacity-90">네트워크 리소스 상태에 유의하세요. 보조 설정 점검이 필요합니다.</span>
                  </div>
                </div>

                {/* Error/Destructive alert banner */}
                <div className="flex items-start gap-3 p-3.5 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">치명적 오류 알림 (Destructive Status)</span>
                    <span className="opacity-90">해당 작업을 수행하는 동안 내부 검증에 실패했습니다.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
