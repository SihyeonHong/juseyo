"use client";

import { useState } from "react";
import { 
  Layers, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle 
} from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardAction 
} from "@/components/shadcn-ui/card";

export default function UiComponentsTester() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="space-y-8">
      {/* shadcn UI Button test section */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            1. Shadcn UI 버튼 컴포넌트 테스트 (Shadcn UI Buttons)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* variant test */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">variant</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default Variant</Button>
              <Button variant="outline">Outline Variant</Button>
              <Button variant="secondary">Secondary Variant</Button>
              <Button variant="ghost">Ghost Variant</Button>
              <Button variant="destructive">Destructive Variant</Button>
              <Button variant="link">Link Variant</Button>
            </div>
          </div>

          {/* size test */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">size</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small (xs)</Button>
              <Button size="sm">Small (sm)</Button>
              <Button size="default">Default Size</Button>
              <Button size="lg">Large (lg)</Button>
              <Button size="icon" aria-label="Icon default"><Layers className="size-4" /></Button>
              <Button size="icon-xs" aria-label="Icon xs"><Layers className="size-3" /></Button>
              <Button size="icon-sm" aria-label="Icon sm"><Layers className="size-3.5" /></Button>
              <Button size="icon-lg" aria-label="Icon lg"><Layers className="size-4" /></Button>
            </div>
          </div>

          {/* state test */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">state</h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled Button</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* shadcn UI Card test section */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            2. 카드 컴포넌트 테스트 (Cards)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* default size card */}
            <Card>
              <CardHeader>
                <CardTitle>Shadcn UI Card (Default)</CardTitle>
                <CardDescription>이 카드는 기본(default) 사이즈의 shadcn/ui Card 컴포넌트입니다.</CardDescription>
                <CardAction>
                  <Button variant="outline" size="xs">설정</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed">
                  이 영역은 CardContent 컴포넌트의 내부 본문 콘텐츠입니다. 다양한 레이아웃 요소와 텍스트를 배치하기에 용이합니다.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-[10px] text-muted-foreground">생성일: 2026-05-25</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">취소</Button>
                  <Button size="sm">저장</Button>
                </div>
              </CardFooter>
            </Card>

            {/* sm size card */}
            <Card size="sm">
              <CardHeader>
                <CardTitle>Shadcn UI Card (Small)</CardTitle>
                <CardDescription>이 카드는 소형(sm) 사이즈의 Card 컴포넌트입니다.</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="xs" aria-label="More options">
                    <Layers className="size-3" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] leading-normal text-muted-foreground">
                  여백과 글자 크기가 본문 폭에 맞게 조금 더 조밀하게 조정되어 정보 밀도가 높은 UI 레이아웃에 최적화되어 있습니다.
                </p>
              </CardContent>
              <CardFooter className="justify-end gap-1.5">
                <Button variant="outline" size="xs">확인</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* form control focus ring test section */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            3. 폼 컨트롤 포커싱 링 검사 (Form Controls)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
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
        </CardContent>
      </Card>

      {/* status alert banner test section */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            4. 상태별 피드백 배너 (Alerts)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3 max-w-2xl">
            {/* Success alert banner */}
            <Card className="border border-success/20 bg-success-bg text-success text-xs">
              <CardContent className="flex items-start gap-3 p-3.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">성공 상태 알림 (Success Status)</span>
                  <span className="opacity-90">작업이 완벽하게 완료되었습니다. 시스템이 정상 운영 중입니다.</span>
                </div>
              </CardContent>
            </Card>

            {/* Warning alert banner */}
            <Card className="border border-warning/20 bg-warning-bg text-warning text-xs">
              <CardContent className="flex items-start gap-3 p-3.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">주의 경고 알림 (Warning Status)</span>
                  <span className="opacity-90">네트워크 리소스 상태에 유의하세요. 보조 설정 점검이 필요합니다.</span>
                </div>
              </CardContent>
            </Card>

            {/* Error/Destructive alert banner */}
            <Card className="border border-destructive/20 bg-destructive/10 text-destructive text-xs">
              <CardContent className="flex items-start gap-3 p-3.5">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">치명적 오류 알림 (Destructive Status)</span>
                  <span className="opacity-90">해당 작업을 수행하는 동안 내부 검증에 실패했습니다.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
