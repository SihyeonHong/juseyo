"use client";

import { 
  Info, 
  Command, 
  Sparkles, 
  Activity 
} from "lucide-react";

import { 
  Card, 
  CardContent,
  CardTitle 
} from "@/components/shadcn-ui/card";

// color palette item type definition
export interface ColorItem {
  name: string;
  variable: string;
  tailwindClass: string;
  bgClass: string;
  textClass: string;
  description: string;
  contrastText?: string;
  contrastClass?: string;
}

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
    description: "기본 text 및 foreground 컬러",
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
    description: "카드 내부의 기본 text 컬러",
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
    description: "비강조 힌트 text 컬러",
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
    description: "포커스 ring 표시용 컬러",
    contrastText: "Focus ring shadow color",
    contrastClass: "text-background"
  }
];

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
    description: "primary background 위의 text 컬러",
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
    description: "secondary background 위의 text 컬러",
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
    description: "accent background 위의 text 컬러",
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
    description: "destructive background 위의 text 컬러",
    contrastText: "Destructive text match",
    contrastClass: "text-destructive"
  }
];

// static color swatch card component
function ColorSwatchStatic({ item }: { item: ColorItem }) {
  return (
    <Card 
      size="sm" 
      className="overflow-hidden flex flex-col h-full hover:shadow-xs transition-all duration-300"
    >
      {/* 상단 swatch preview */}
      <div className={`h-20 ${item.bgClass} flex justify-center items-center p-3 text-center`}>
        {item.contrastText && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 backdrop-blur-xs ${item.contrastClass}`}>
            {item.contrastText}
          </span>
        )}
      </div>

      {/* 하단 spec description */}
      <CardContent className="p-3.5 flex flex-col flex-1">
        <CardTitle className="mb-1 text-foreground">{item.name}</CardTitle>
        
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
      </CardContent>
    </Card>
  );
}

export default function ColorPaletteTester() {
  return (
    <div className="space-y-8">
      {/* color test guide */}
      <Card>
        <CardContent className="flex gap-3 p-4">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            우측 상단의 다크/라이트 모드 버튼을 조작하여 각 토큰 변수들의 동적 대응 상태를 확인할 수 있습니다. 모든 컬러는 HEX 코드 하드코딩 없이 CSS 변수를 기반으로 맵핑되어 있습니다.
          </div>
        </CardContent>
      </Card>

      {/* base theme colors */}
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

      {/* brand colors */}
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

      {/* status feedback colors */}
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
  );
}
