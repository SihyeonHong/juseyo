# DESIGN.md — 주세요 (juseyo) Design System

AI 에이전트가 일관된 UI를 생성하기 위한 상세 디자인 시스템 문서입니다.
사람이 읽는 요약 버전은 `docs/design-guide.md`를 참조하세요.

---

## 1. Visual Theme & Atmosphere

### 디자인 철학

"주세요"는 중고거래 판매 중인 상품 관리 도구입니다. 디자인은 "따뜻한 보라(Warm Purple)" 톤으로, 부드럽고 신뢰감 있는 느낌을 추구합니다. 가볍고 깔끔한 도구 감성을 유지합니다.

### 키워드

- 따뜻함 (Warm): 차가운 그레이 대신 보라 틴트가 섞인 따뜻한 톤
- 가벼움 (Light): 저밀도 레이아웃, 충분한 여백, 시각적 여유
- 깔끔함 (Clean): 최소한의 장식, 명확한 계층 구조
- 신뢰감 (Trustworthy): 거래 도구로서의 안정감, 일관된 패턴

### 무드

- 배경은 연한 라벤더 화이트, 콘텐츠는 순백 카드 위에 배치
- 그라데이션은 primary → accent 방향(보라 → 핑크)으로 사용하며, 로고와 CTA에 제한적으로 적용
- 전체적으로 밝고 개방적인 분위기를 유지하되, 다크 모드에서도 따뜻한 보라의 정체성은 보존

---

## 2. Color Palette & Roles

shadcn/ui의 CSS 변수 체계를 기반으로 하며, 모든 색상은 HSL 대신 현대적인 OKLCH 형식으로 `src/app/globals.css`에 정의되어 있습니다.

### Core Palette (Light Mode)

| Token                      | OKLCH Value                 | Equivalent HEX | Role                                                 |
| -------------------------- | --------------------------- | -------------- | ---------------------------------------------------- |
| `--background`             | `oklch(1 0 0)`              | `#FFFFFF`      | 앱 전체 배경 (순백색)                                |
| `--foreground`             | `oklch(0.145 0.008 326)`    | `#252329`      | 기본 텍스트 (보라 틴트가 섞인 짙은 그레이)           |
| `--card`                   | `oklch(1 0 0)`              | `#FFFFFF`      | 카드, 모달, 패널의 배경 (순백색)                     |
| `--card-foreground`        | `oklch(0.145 0.008 326)`    | `#252329`      | 카드 내부 텍스트                                     |
| `--popover`                | `oklch(1 0 0)`              | `#FFFFFF`      | 팝오버 및 드롭다운 배경                              |
| `--popover-foreground`     | `oklch(0.145 0.008 326)`    | `#252329`      | 팝오버 내부 텍스트                                   |
| `--primary`                | `oklch(0.212 0.019 322.12)` | `#3E3946`      | 주조색 (shadcn 기본 설정에 따른 매우 어두운 딥 퍼플) |
| `--primary-foreground`     | `oklch(0.985 0 0)`          | `#FBFBFC`      | primary 위의 텍스트 (밝은 라벤더 화이트)             |
| `--secondary`              | `oklch(0.96 0.003 325.6)`   | `#F4F3F5`      | 보조 배경 및 비활성 버튼/뱃지 배경                   |
| `--secondary-foreground`   | `oklch(0.212 0.019 322.12)` | `#3E3946`      | secondary 위의 텍스트                                |
| `--muted`                  | `oklch(0.96 0.003 325.6)`   | `#F4F3F5`      | 비강조 배경                                          |
| `--muted-foreground`       | `oklch(0.542 0.034 322.5)`  | `#8B8296`      | 비강조 텍스트 (placeholder 및 보조 힌트 라벨)        |
| `--accent`                 | `oklch(0.96 0.003 325.6)`   | `#F4F3F5`      | 포인트 및 강조용 보조 배경                           |
| `--accent-foreground`      | `oklch(0.212 0.019 322.12)` | `#3E3946`      | accent 위의 텍스트                                   |
| `--destructive`            | `oklch(0.577 0.245 27.325)` | `#EF4444`      | 삭제, 오류 등 위험한 액션 (Red 계열)                 |
| `--destructive-foreground` | `#FFFFFF`                   | `#FFFFFF`      | destructive 위의 텍스트                              |
| `--border`                 | `oklch(0.922 0.005 325.62)` | `#EAE9EC`      | 기본 경계선 및 테두리 선                             |
| `--input`                  | `oklch(0.922 0.005 325.62)` | `#EAE9EC`      | 입력 필드 테두리선                                   |
| `--ring`                   | `oklch(0.711 0.019 323.02)` | `#B2A8BD`      | 포커스 시 발생하는 링 라인                           |

### Extended & Alert Colors

| Token             | HEX Value | Role                                          |
| ----------------- | --------- | --------------------------------------------- |
| `--primary-light` | `#6D5FA0` | primary의 밝은 변형 (보조 강조용)             |
| `--accent-light`  | `#F5C6D3` | accent의 밝은 변형 (소프트 핑크 뱃지 배경 등) |
| `--success`       | `#3DAA6A` | 성공 상태 표시                                |
| `--success-bg`    | `#E8F7EF` | 성공 상태 배경                                |
| `--warning`       | `#E0A030` | 경고 상태 표시                                |
| `--warning-bg`    | `#FFF8E8` | 경고 상태 배경                                |

### Dark Mode Palette

다크 모드에서는 보라빛의 정체성을 띠는 어두운 톤을 사용하여 눈의 피로를 덜고 시각적 일치를 이룹니다.

| Token                    | OKLCH Value                 | Equivalent HEX           | Notes                                        |
| ------------------------ | --------------------------- | ------------------------ | -------------------------------------------- |
| `--background`           | `oklch(0.145 0.008 326)`    | `#252329`                | 보라빛 다크 그레이 배경                      |
| `--foreground`           | `oklch(0.985 0 0)`          | `#FBFBFC`                | 부드러운 라벤더 화이트 텍스트                |
| `--card`                 | `oklch(0.212 0.019 322.12)` | `#3E3946`                | 배경 대비 한 단계 밝은 다크 서피스 카드 배경 |
| `--card-foreground`      | `oklch(0.985 0 0)`          | `#FBFBFC`                | 카드 내부 텍스트                             |
| `--popover`              | `oklch(0.212 0.019 322.12)` | `#3E3946`                | 팝오버 및 드롭다운 다크 배경                 |
| `--popover-foreground`   | `oklch(0.985 0 0)`          | `#FBFBFC`                | 팝오버 내부 텍스트                           |
| `--primary`              | `oklch(0.922 0.005 325.62)` | `#EAE9EC`                | 다크 모드 주조색 (밝은 라벤더 실버 계열)     |
| `--primary-foreground`   | `oklch(0.212 0.019 322.12)` | `#3E3946`                | primary 위의 다크 텍스트                     |
| `--secondary`            | `oklch(0.263 0.024 320.12)` | `#494353`                | 어두운 라벤더 보조 배경                      |
| `--secondary-foreground` | `oklch(0.985 0 0)`          | `#FBFBFC`                | secondary 위의 텍스트                        |
| `--muted`                | `oklch(0.263 0.024 320.12)` | `#494353`                | 비강조 어두운 배경                           |
| `--muted-foreground`     | `oklch(0.711 0.019 323.02)` | `#B2A8BD`                | 비강조 어두운 텍스트                         |
| `--accent`               | `oklch(0.263 0.024 320.12)` | `#494353`                | 포인트 및 강조용 다크 보조 배경              |
| `--accent-foreground`    | `oklch(0.985 0 0)`          | `#FBFBFC`                | accent 위의 텍스트                           |
| `--destructive`          | `oklch(0.704 0.191 22.216)` | `#D9383A`                | 다크 모드 삭제 및 오류 상태                  |
| `--border`               | `oklch(1 0 0 / 10%)`        | `rgba(255,255,255,0.1)`  | 다크 모드 카드 및 구분선용 경계 테두리       |
| `--input`                | `oklch(1 0 0 / 15%)`        | `rgba(255,255,255,0.15)` | 다크 모드 입력 폼 테두리선                   |
| `--ring`                 | `oklch(0.542 0.034 322.5)`  | `#8B8296`                | 다크 모드 포커스 링 라인                     |

### Sidebar Component Token (Light & Dark)

shadcn/ui 사이드바가 활용하는 세부 시맨틱 변수 규칙입니다.

| Token                          | Light OKLCH                 | Dark OKLCH                   | Equivalent HEX (Light/Dark)         |
| ------------------------------ | --------------------------- | ---------------------------- | ----------------------------------- |
| `--sidebar`                    | `oklch(0.985 0 0)`          | `oklch(0.212 0.019 322.12)`  | `#FBFBFC` / `#3E3946`               |
| `--sidebar-foreground`         | `oklch(0.145 0.008 326)`    | `oklch(0.985 0 0)`           | `#252329` / `#FBFBFC`               |
| `--sidebar-primary`            | `oklch(0.212 0.019 322.12)` | `oklch(0.488 0.243 264.376)` | `#3E3946` / `#303B91`               |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)`          | `oklch(0.985 0 0)`           | `#FBFBFC` / `#FBFBFC`               |
| `--sidebar-accent`             | `oklch(0.96 0.003 325.6)`   | `oklch(0.263 0.024 320.12)`  | `#F4F3F5` / `#494353`               |
| `--sidebar-accent-foreground`  | `oklch(0.212 0.019 322.12)` | `oklch(0.985 0 0)`           | `#3E3946` / `#FBFBFC`               |
| `--sidebar-border`             | `oklch(0.922 0.005 325.62)` | `oklch(1 0 0 / 10%)`         | `#EAE9EC` / `rgba(255,255,255,0.1)` |
| `--sidebar-ring`               | `oklch(0.711 0.019 323.02)` | `oklch(0.542 0.034 322.5)`   | `#B2A8BD` / `#8B8296`               |

### Chart Component Token (Light & Dark)

데이터 시각화 차트에 사용되는 테마 변수 매핑입니다.

| Token       | Light OKLCH                 | Dark OKLCH                  | Equivalent HEX |
| ----------- | --------------------------- | --------------------------- | -------------- |
| `--chart-1` | `oklch(0.865 0.012 325.68)` | `oklch(0.865 0.012 325.68)` | `#DBD9DD`      |
| `--chart-2` | `oklch(0.542 0.034 322.5)`  | `oklch(0.542 0.034 322.5)`  | `#8B8296`      |
| `--chart-3` | `oklch(0.435 0.029 321.78)` | `oklch(0.435 0.029 321.78)` | `#706879`      |
| `--chart-4` | `oklch(0.364 0.029 323.89)` | `oklch(0.364 0.029 323.89)` | `#5E5767`      |
| `--chart-5` | `oklch(0.263 0.024 320.12)` | `oklch(0.263 0.024 320.12)` | `#494353`      |

### 색상 사용 원칙

- HEX/RGB/OKLCH 상수를 개별 컴포넌트에 인라인 스타일로 하드코딩하여 사용하지 않습니다. 반드시 `var(--background)`, `var(--primary)` 등 시맨틱 CSS 변수로 참조합니다.
- 상태 피드백 색상(success, warning, destructive)은 관련된 특수 상황의 사용자 안내 맥락에만 국한하여 활용합니다.
- 그라데이션 사용을 지양합니다.

---

## 3. Typography Rules

### 폰트 패밀리

- Primary: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### 타이포그래피 계층 (Tailwind CSS 표준 매핑)

| Role        | Tailwind Class | Size (px)       | Weight       | Line Height             | Letter Spacing  | 용도                          |
| ----------- | -------------- | --------------- | ------------ | ----------------------- | --------------- | ----------------------------- |
| Display     | `text-2xl`     | 24px (1.5rem)   | 700 (bold)   | 1.3 (`leading-tight`)   | -0.02em         | 페이지 타이틀, 큰 숫자 강조   |
| Heading 1   | `text-xl`      | 20px (1.25rem)  | 700 (bold)   | 1.4                     | -0.02em         | 주요 섹션 제목                |
| Heading 2   | `text-lg`      | 18px (1.125rem) | 700 (bold)   | 1.4                     | -0.01em         | 하위 섹션 제목, 로고 텍스트   |
| Heading 3   | `text-base`    | 16px (1rem)     | 700 (bold)   | 1.4                     | -0.01em         | 카드 내부 제목, 강조 라벨     |
| Body        | `text-sm`      | 14px (0.875rem) | 400 (normal) | 1.6 (`leading-relaxed`) | normal          | 일반 본문 텍스트              |
| Body Medium | `text-sm`      | 14px (0.875rem) | 500 (medium) | 1.5                     | normal          | 네비게이션, 일반 버튼 텍스트  |
| Body Strong | `text-sm`      | 14px (0.875rem) | 700 (bold)   | 1.5                     | -0.01em         | 가격, 중요 수치               |
| Caption     | `text-xs`      | 12px (0.75rem)  | 500 (medium) | 1.4                     | normal          | 보조 설명, 필터 칩 텍스트     |
| Small       | `text-xs`      | 12px (0.75rem)  | 500 (medium) | 1.5                     | normal          | 힌트, 메타데이터, 보조 정보   |
| Micro / Tag | `text-[10px]`  | 10px (0.625rem) | 600~700      | 1.3                     | 0.03em ~ 0.05em | 상태 뱃지, 카드 카테고리 태그 |

### 타이포그래피 원칙

- Weight는 400(본문), 500(UI/인터랙티브), 700(제목/강조)의 세 단계를 기본으로 사용하며, 비표준 두께의 남용을 지양합니다.
- 제목에는 자간 조절 유틸리티(예: `tracking-tight`)를 적용하여 응집력 있는 시각 구조를 형성합니다.
- 숫자(가격 등)는 중요성을 표현하기 위해 본문보다 크거나 굵게(Body Strong 이상) 처리하여 시각적 위계를 강화합니다.
- 단위 텍스트("원", "%")는 숫자보다 작은 크기와 낮은 weight로 결합하여 구분합니다.
- `word-wrap: break-word` 속성이 body 전역에 기본 적용되므로, 모든 텍스트 컨테이너는 단어가 무분별하게 화면을 벗어나지 않도록 방어 설계되어 있습니다.

---

## 4. Component Stylings

shadcn/ui 컴포넌트의 기본 디자인 사양을 준수하며, 일부 핵심 요소들은 아래 가이드라인을 참조하여 구현합니다.

### Buttons

| Variant     | 용도                               | 특징                                                                            |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| Primary     | 주요 CTA ("등록하기", "저장" 등)   | `var(--primary)` 배경, `var(--primary-foreground)` 텍스트, `--radius-sm` radius |
| Secondary   | 보조 액션 ("임시 저장", "취소" 등) | `var(--secondary)` 배경, `var(--secondary-foreground)` 텍스트                   |
| Ghost       | 네비게이션 버튼, 아이콘 버튼       | 투명 배경, 호버 시 `var(--secondary)` 배경                                      |
| Destructive | 삭제, 위험한 액션                  | `var(--destructive)` 배경, `var(--destructive-foreground)` 텍스트               |
| Outline     | 보조 경계선 버튼                   | 투명 배경, border, `var(--foreground)` 또는 상황에 맞는 텍스트                  |

---

## 5. Layout Principles

### 간격 스케일

Tailwind CSS의 표준 spacing 시스템을 기반으로 레이아웃을 설계합니다. 주로 아래 클래스 단위들을 사용하며 비표준 하프 유닛 spacing의 무분별한 사용을 피합니다:

| Tailwind spacing | px   | 용도                                       |
| ---------------- | ---- | ------------------------------------------ |
| `1` (`0.25rem`)  | 4px  | 아이콘과 텍스트 사이 미세 간격             |
| `2` (`0.5rem`)   | 8px  | 칩/뱃지 내부 padding, 아이템 간격          |
| `3` (`0.75rem`)  | 12px | 작은 카드 간 간격, 컴포넌트 내부 padding   |
| `4` (`1rem`)     | 16px | 일반 카드 패딩, 입력 폼 그룹 간 간격       |
| `5` (`1.25rem`)  | 20px | 모바일 페이지 좌우 패딩, 주요 섹션 간 간격 |
| `6` (`1.5rem`)   | 24px | 리스트 카드 간 간격, 헤더 패딩             |
| `8` (`2rem`)     | 32px | 페이지 상단 margin, 섹션 대형 구분 간격    |

### 최소 지원 너비 (Minimum Width) 및 스크롤 정책

- 최소 지원 너비: `320px`
- 모든 페이지의 루트 요소 및 래퍼는 최소 너비 `min-width: 320px`를 보장하도록 마크업합니다 (`body` 태그에 설정됨).
- 화면 너비가 `320px` 미만으로 줄어들 경우 UI를 강제로 욱여넣어 레이아웃이 붕괴하지 않도록 방지하고, `320px` 레이아웃 구조를 보존한 채 브라우저가 자연스럽게 좌우 가로 스크롤을 발생시키도록 허용합니다.

### 화면 방향 (Orientation) 용어 정의

- Portrait: 디바이스 기기를 세로 방향으로 길게 든 세로 모드 상태
- Landscape: 디바이스 기기를 가로 방향으로 넓게 든 가로 모드 상태

### 페이지 컨테이너 및 최대 너비

- 모바일 사용자 페이지 (e.g. `[userId]/page.tsx` 등): 모바일 Portrait 뷰에 부합하는 `max-width: 430px` 컨테이너를 기본으로 적용하며, 대형 스크린에서는 `margin: 0 auto`로 중앙 정렬합니다.
- 관리자 및 대형 페이지 (e.g. 마이페이지, 대시보드 등): 태블릿 및 데스크탑 Landscape 스펙에 최적화된 최대 너비 `1024px` (`max-w-5xl`) 또는 `1280px` (`max-w-7xl`) 컨테이너를 설정하고 동일하게 중앙 배치합니다.
- 페이지 기본 좌우 여백: `px-5` (20px) 또는 `px-4.5` (18px) 적용

### 시각적 리듬

- 대단위 독립 섹션 구분 시에는 8px 높이의 구분선 영역(`big-separator`, border-top/bottom 및 연한 secondary 배경)을 배치하여 시각적 인지 전환을 돕습니다.
- 구조가 같은 컴포넌트 카드가 빽빽하게 중복 배치되는 단조로움을 막고, 카드 상단 여백이나 크기 조절로 화면 리듬을 유지합니다.

---

## 6. Depth & Elevation

---

## 7. Do's and Don'ts

### Do

- 색상을 적용할 때는 반드시 `var(--background)`, `var(--primary)` 등 시맨틱 CSS 변수만을 사용합니다.
- 타이포그래피 스타일링 시 Tailwind CSS의 표준 클래스(`text-xs`, `text-sm` 등)를 우선합니다.
- 카드 구성 시 서피스 분할(background와 card의 고도 대비)을 활용하여 정보 가독성을 지킵니다.
- 기기에 구애받지 않도록 `min-width: 320px`를 루트 레이어에 보장합니다.
- 아이콘 선정이 필요할 때는 `lucide-react`를 최우선으로 탐색하여 일관된 펜 두께를 맞춥니다.
- 버튼 및 체크박스는 상호작용 피드백을 위해 포커스/호버 효과와 클릭 축소 효과(`active:scale-[0.97]`)를 활용합니다.

### Don't

- HEX/RGB/OKLCH 상수를 소스코드 인라인 스타일에 직접 하드코딩하지 않습니다.
- shadcn/ui에 기지원되는 기본 컴포넌트가 존재함에도 개별 custom 컴포넌트를 무분별하게 신규 작성하지 않습니다.
- 가로/세로 너비를 고정된 절댓값(pixel) 위주로 과하게 사용하여 반응형 레이아웃 붕괴를 유발하지 않습니다.

---

## 8. Responsive Behavior

### 브레이크포인트 (Tailwind v4 기준)

| 뷰포트 단계          | Tailwind Prefix | 가로 너비 범위   | 기기 및 방향 매칭 설명                                       |
| -------------------- | --------------- | ---------------- | ------------------------------------------------------------ |
| Mobile (모바일)      | (기본)          | `< 640px`        | 1단 세로형 배치 중심, 스마트폰 Portrait 모드                 |
| Tablet (태블릿)      | `sm:`           | `640px ~ 767px`  | 1.5단 구성, 대화면 스마트폰 Landscape / 소형 태블릿 Portrait |
| Small Desktop (소형) | `md:`           | `768px ~ 1023px` | 가로 2단 배치 분기, 일반 태블릿 Portrait 모드                |
| Large Desktop (대형) | `lg:`           | `>= 1024px`      | 최대 가로 너비 제한 적용구간, 태블릿 Landscape 및 PC 모니터  |

### 터치 영역 편의성

- 모바일 디바이스 상에서 누르기 편하도록 최소 터치 타깃 영역 `44x44px` 규격을 확보합니다.
- 터치 버튼의 padding은 사방 12px 이상, 칩의 경우 좌우 14px 이상의 여유를 줍니다.

---

## 9. Dark Mode

### 전환 메커니즘

- Tailwind CSS의 `class` 기반 다크 테마 모드를 지원합니다 (`<html>` 태그에 `.dark` 클래스를 전환).
- shadcn/ui의 기본 다크 모드 속성 규칙과 100% 호환되어, 시스템 테마 및 사용자 선택 테마에 능동 반응합니다.

### 비-색상 요소 처리

- 다크 모드 활성화 시 테두리(`var(--border)`) 및 입력 영역(`var(--input)`)은 자동으로 어둡고 미세하게 반투명한 `oklch(1 0 0 / 10%)` 규격으로 완만하게 디밍 처리됩니다.
- 그라데이션 CTA 영역도 다크 테마 변수 스케일의 OKLCH 값으로 자연스럽게 어우러져 일관된 브랜드 정체성을 지속 전달합니다.

---

## 10. Agent Quick Reference

### 자주 쓰는 시맨틱 변수 모음

```css
/* 추후 추가 */
```
