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

shadcn/ui의 CSS 변수 체계를 기반으로 합니다. 아래 값들은 `src/app/globals.css`의 `:root`에서 정의됩니다.

### Core Palette (Light Mode)

| Token                      | Value     | Role                                                                    |
| -------------------------- | --------- | ----------------------------------------------------------------------- |
| `--background`             | `#F7F5FB` | 앱 전체 배경. 보라 틴트가 섞인 따뜻한 화이트.                           |
| `--foreground`             | `#1E1827` | 기본 텍스트. 순수 검정(#000) 대신 보라빛 다크를 사용하여 부드러움 유지. |
| `--card`                   | `#FFFFFF` | 카드, 모달, 패널의 배경. 순백으로 background와 대비.                    |
| `--card-foreground`        | `#1E1827` | 카드 내부 텍스트. foreground와 동일.                                    |
| `--primary`                | `#4A3F6B` | 주조색. 따뜻한 딥 퍼플. CTA, 로고, 활성 상태에 사용.                    |
| `--primary-foreground`     | `#FFFFFF` | primary 위의 텍스트.                                                    |
| `--secondary`              | `#F0EBF8` | 보조 배경. 연한 라벤더. 비활성 버튼, 뱃지 배경 등.                      |
| `--secondary-foreground`   | `#4A3F6B` | secondary 위의 텍스트. primary와 동일 색상.                             |
| `--muted`                  | `#F0EBF8` | 비강조 배경. secondary와 유사하게 사용.                                 |
| `--muted-foreground`       | `#9E93AB` | 비강조 텍스트. 힌트, placeholder, 비활성 라벨.                          |
| `--accent`                 | `#D4708A` | 포인트 색상. 소프트 핑크. 뱃지, 태그, 부수적 강조.                      |
| `--accent-foreground`      | `#FFFFFF` | accent 위의 텍스트.                                                     |
| `--destructive`            | `#EF4444` | 삭제, 오류 등 위험한 액션. red-500 계열.                                |
| `--destructive-foreground` | `#FFFFFF` | destructive 위의 텍스트.                                                |
| `--border`                 | `#E2DAF5` | 카드, 입력 필드 등의 테두리. 보라 틴트가 섞인 부드러운 선.              |
| `--input`                  | `#E2DAF5` | 입력 필드 테두리. border와 동일.                                        |
| `--ring`                   | `#6D5FA0` | 포커스 링. primary의 밝은 변형.                                         |

### Extended Colors

| Token             | Value     | Role                                                  |
| ----------------- | --------- | ----------------------------------------------------- |
| `--primary-light` | `#6D5FA0` | primary의 밝은 변형. 포커스 링, 호버 상태, 보조 강조. |
| `--accent-light`  | `#F5C6D3` | accent의 밝은 변형. 뱃지 배경, 부드러운 강조 영역.    |
| `--success`       | `#3DAA6A` | 성공 상태. 판매 중, 완료, 정상 등.                    |
| `--success-bg`    | `#E8F7EF` | 성공 배경.                                            |
| `--warning`       | `#E0A030` | 경고 상태. 예약 중, 주의 등.                          |
| `--warning-bg`    | `#FFF8E8` | 경고 배경.                                            |

### Dark Mode Palette

다크 모드에서는 "따뜻한 보라" 정체성을 유지합니다. 순수 검정(#000) 배경 대신 보라빛 어두운 톤을 사용합니다.

| Token                | Dark Value | Notes                                      |
| -------------------- | ---------- | ------------------------------------------ |
| `--background`       | `#0F0D15`  | 보라빛 블랙. 순수 검정 대비 따뜻함 유지.   |
| `--foreground`       | `#E8E5F0`  | 밝은 라벤더 화이트. 순백 대신 부드러운 톤. |
| `--card`             | `#1A1725`  | 배경보다 약간 밝은 보라 다크.              |
| `--primary`          | `#8B7FC0`  | 라이트 모드의 primary를 밝게 조정.         |
| `--secondary`        | `#252030`  | 어두운 라벤더.                             |
| `--muted-foreground` | `#7A7088`  | 라이트 모드보다 약간 밝아야 가독성 확보.   |
| `--accent`           | `#E08DA3`  | 핑크를 약간 밝게 조정.                     |
| `--border`           | `#2E2940`  | 어두운 보라 테두리.                        |

### 색상 사용 원칙

- HEX/RGB 코드를 직접 사용하지 않습니다. 반드시 CSS 변수로 참조합니다.
- primary 외의 화려한 색상은 한 화면에 하나만 사용합니다.
- 상태 색상(success, warning, destructive)은 해당 상태를 전달하는 맥락에서만 사용합니다.
- 그라데이션은 `linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)` 패턴으로 로고, CTA 등에 제한적으로 사용합니다.

---

## 3. Typography Rules

### 폰트 패밀리

- Primary: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### 타이포그래피 계층

| Role        | Size             | Weight  | Line Height | Letter Spacing | 용도                                           |
| ----------- | ---------------- | ------- | ----------- | -------------- | ---------------------------------------------- |
| Display     | 24px (1.5rem)    | 700     | 1.3         | -0.5px         | 페이지 타이틀, 큰 숫자 강조                    |
| Heading 1   | 20px (1.25rem)   | 700     | 1.4         | -0.4px         | 섹션 제목                                      |
| Heading 2   | 17px (1.0625rem) | 700     | 1.4         | -0.3px         | 하위 섹션 제목, 로고 텍스트                    |
| Heading 3   | 16px (1rem)      | 700     | 1.4         | -0.3px         | 카드 내부 제목, 강조 라벨                      |
| Body        | 14px (0.875rem)  | 400     | 1.6         | normal         | 일반 본문 텍스트                               |
| Body Medium | 14px (0.875rem)  | 500     | 1.5         | normal         | 네비게이션, 버튼 텍스트                        |
| Body Strong | 14px (0.875rem)  | 700     | 1.5         | -0.3px         | 가격, 중요 수치                                |
| Caption     | 13px (0.8125rem) | 500     | 1.4         | normal         | 보조 설명, 필터 칩 텍스트                      |
| Small       | 12px (0.75rem)   | 500     | 1.5         | normal         | 힌트, 메타데이터, 카트 아이템                  |
| Micro       | 11px (0.6875rem) | 400~600 | 1.3         | normal         | 라벨, 뱃지, 단위 텍스트                        |
| Tag         | 10px (0.625rem)  | 600~700 | 1.3         | 0.3~0.5px      | 뱃지, 상태 태그, 카드 카테고리. uppercase 가능 |

### 타이포그래피 원칙

- Weight는 400(본문), 500(UI/인터랙티브), 600~700(제목/강조)의 세 단계를 기본으로 사용합니다.
- 제목에는 약간의 음수 자간(letter-spacing)을 적용하여 응집력 있는 텍스트를 만듭니다.
- 숫자(가격 등)는 본문보다 크거나 굵게 처리하여 시각적 위계를 강화합니다.
- 단위 텍스트("원", "%")는 숫자보다 작은 크기와 낮은 weight로 구분합니다.
- `word-wrap: break-word`가 전역으로 적용됩니다.

---

## 4. Component Stylings

shadcn/ui 컴포넌트를 사용하되, 아래 가이드에 따라 커스터마이징합니다.

### Buttons

| Variant     | 용도                               | 특징                                           |
| ----------- | ---------------------------------- | ---------------------------------------------- |
| Primary     | 주요 CTA ("등록하기", "저장" 등)   | `--primary` 배경, 흰색 텍스트, 8px radius      |
| Secondary   | 보조 액션 ("임시 저장", "취소" 등) | `--secondary` 배경, `--primary` 텍스트, border |
| Ghost       | 네비게이션 버튼, 아이콘 버튼       | 투명 배경, 호버 시 `--secondary` 배경          |
| Destructive | 삭제, 위험한 액션                  | `--destructive` 배경, 흰색 텍스트              |
| Outline     | 보조 경계선 버튼                   | 투명 배경, border, 텍스트 색상은 컨텍스트 따름 |

- 버튼 내부 텍스트: 14px, weight 700, letter-spacing -0.2px
- 기본 padding: 12px 20px (Primary), 12px 16px (Secondary)
- border-radius: 8px (`--radius-sm`)
- CTA 버튼에 한해 `linear-gradient(135deg, var(--primary), var(--primary-light))` 그라데이션 적용 가능

### Cards

- 배경: `var(--card)` (#FFFFFF)
- 테두리: `1px solid var(--border)`
- border-radius: 14px (`--radius-md`)
- 그림자: `0 2px 12px rgba(74, 63, 107, 0.10)` — 보라 틴트가 섞인 아주 미세한 그림자
- 내부 padding: 18px (데스크탑), 10~12px (카드 body 영역)
- 호버: 없음 또는 아주 미세한 scale(0.97) + 그림자 강화 (카드 선택 시)

### Inputs & Forms

- 전체 너비 사용 (`width: 100%`)
- 테두리: `1.5px solid var(--border)`
- border-radius: 8px (`--radius-sm`)
- 배경: `var(--background)` (라이트 모드에서 연한 라벤더)
- padding: 10px 12px
- placeholder 색상: `var(--muted-foreground)`
- 포커스 시: `border-color: var(--primary-light)`
- textarea: `min-height: 80px`, `resize: vertical`

### Badges & Tags

- 필터 칩(active): `var(--primary)` 배경, 흰색 텍스트, 20px radius, 1.5px border
- 필터 칩(inactive): `var(--card)` 배경, `var(--muted-foreground)` 텍스트, `var(--border)` border
- 상태 뱃지: 해당 상태의 `--*-bg` 배경 + 텍스트 색상, 20px radius
- 카드 내 태그: `var(--accent)` 색상, 10px, weight 600~700, uppercase

### Navigation

- 상단에 고정(sticky), backdrop-filter: blur(12px)
- 배경: `rgba(247, 245, 251, 0.92)` (라이트 모드 배경의 반투명)
- 하단 테두리: `1px solid var(--border)`
- padding: 12px 18px
- 로고: 28x28px 아이콘(primary→accent 그라데이션 배경, 8px radius) + 17px weight 700 텍스트

---

## 5. Layout Principles

### 간격 스케일

Tailwind CSS의 spacing 시스템을 기반으로 합니다. 아래 값들을 주로 사용합니다:

| Tailwind | px   | 용도                                   |
| -------- | ---- | -------------------------------------- |
| `1`      | 4px  | 아이콘과 텍스트 사이 미세 간격         |
| `1.5`    | 6px  | 라벨-입력 필드 간격                    |
| `2`      | 8px  | 칩/뱃지 내부 padding, 아이템 간격      |
| `2.5`    | 10px | 카드 body padding, 리스트 아이템 간격  |
| `3`      | 12px | 카드 간 간격, 컴포넌트 간 간격         |
| `3.5`    | 14px | 프로필 메타 간격, 필터 바 padding      |
| `4`      | 16px | 폼 그룹 간 간격                        |
| `4.5`    | 18px | 페이지 좌우 padding, 섹션 카드 padding |
| `5`      | 20px | 섹션 상단 margin                       |
| `7`      | 28px | 큰 구분선 margin                       |

### 페이지 컨테이너

- 모바일 우선 설계: `max-width: 430px` (모바일 뷰 기준)
- 페이지 좌우 padding: 18px
- 대형 화면에서는 중앙 정렬 (`margin: 0 auto`)

### 컨텐츠 최대 너비

- 모바일 컨텐츠: 430px
- 데스크탑 컨텐츠: 프로젝트 성격에 따라 결정 (관리자는 더 넓을 수 있음)

### 시각적 리듬

- 주요 섹션 사이에는 구분선(`big-separator`: 8px 높이, border-top/bottom)을 사용합니다.
- 같은 유형의 섹션을 연속 배치하지 않고, 높이와 밀도의 변화를 주어 리듬감을 만듭니다.

---

## 6. Depth & Elevation

### 그림자 시스템

| Level           | CSS                                   | 용도                        |
| --------------- | ------------------------------------- | --------------------------- |
| Flat (Level 0)  | 없음                                  | 배경, 텍스트 블록           |
| Card (Level 1)  | `0 2px 12px rgba(74, 63, 107, 0.10)`  | 일반 카드, 리스트 아이템    |
| Float (Level 2) | `0 -4px 24px rgba(74, 63, 107, 0.14)` | 하단 고정 바, floating 요소 |

### 원칙

- 그림자에는 순수 검정(`rgba(0,0,0,...)`) 대신 primary 계열(`rgba(74, 63, 107, ...)`)을 사용하여 보라 무드를 유지합니다.
- 그림자 opacity는 10~14% 범위를 유지합니다. 그림자가 뚜렷하게 보이면 너무 강한 것입니다.
- 서피스 계층: background(#F7F5FB) < card(#FFFFFF) < modal(#FFFFFF + Level 2 shadow)

### Border vs Shadow

- 카드: border(`1px solid var(--border)`) + shadow(Level 1) 함께 사용
- 입력 필드: border만 사용, shadow 없음
- 모달/시트: shadow(Level 2)로 구분, border는 선택적

### Border Radius Scale

| Token         | Value | 용도                           |
| ------------- | ----- | ------------------------------ |
| `--radius-sm` | 8px   | 버튼, 입력 필드, 작은 컨테이너 |
| `--radius-md` | 14px  | 카드, 섹션 카드                |
| `--radius-lg` | 20px  | 필터 칩, 뱃지, pill 형태 요소  |
| Full circle   | 50%   | 아바타, 체크박스 원형          |

---

## 7. Do's and Don'ts

### Do

- shadcn/ui의 CSS 변수 체계를 통해 모든 색상 지정
- primary 색상을 CTA, 활성 상태, 로고 등 핵심 포인트에 집중 사용
- 카드 위에 콘텐츠 배치 (background와의 미세한 대비가 시각적 구분 역할)
- 그림자에 보라 틴트를 유지 (`rgba(74, 63, 107, opacity)`)
- 숫자와 단위의 크기/weight 차이를 만들어 위계 강화
- 모든 인터랙티브 요소에 포커스 상태 유지 (접근성)
- 상태 피드백(로딩, 성공, 오류)을 사용자에게 명확히 전달
- lucide-react에서 제공하는 아이콘을 우선 탐색

### Don't

- CSS에 HEX/RGB 색상 코드를 직접 하드코딩하지 말 것
- 순수 검정(`#000000`)을 텍스트나 배경에 사용하지 말 것 (보라빛 다크 `#1E1827` 사용)
- 순수 회색(`#gray...`)을 테두리나 배경에 사용하지 말 것 (보라 틴트가 섞인 값 사용)
- 한 화면에 3가지 이상의 강조 색상을 동시 사용하지 말 것
- 그림자 opacity를 15% 이상으로 높이지 말 것
- shadcn 컴포넌트가 있는데 같은 역할의 커스텀 컴포넌트를 만들지 말 것
- lucide-react 외의 아이콘 라이브러리를 혼용하지 말 것
- 그라데이션을 CTA/로고 외의 일반 UI 요소에 남용하지 말 것
- 같은 유형의 섹션을 연속 반복 배치하지 말 것 (시각적 리듬 유지)

---

## 8. Responsive Behavior

### 브레이크포인트

| Name          | Tailwind Prefix | Width Range    | 설명                            |
| ------------- | --------------- | -------------- | ------------------------------- |
| Mobile        | (기본)          | < 640px        | 1단 세로형, 좌우 padding 최소화 |
| Tablet        | `sm:`           | 640px ~ 767px  | 여유 있는 1~2단, 간격 확대      |
| Small Desktop | `md:`           | 768px ~ 1023px | 본격적 가로 배치 시작           |
| Large Desktop | `lg:`           | 1024px ~       | 최대 너비 제한, 중앙 정렬       |

### 터치 타깃

- 최소 터치 영역: 44x44px (Apple HIG 기준)
- 버튼 padding: 12px 이상
- 필터 칩 padding: 6px 14px, 칩 간 간격 8px
- 네비게이션 아이콘 버튼: padding 4px 이상 (실제 아이콘 20px + padding으로 28px 확보)

### 축소 전략

- 제품 그리드: 2열(모바일) → 3~4열(데스크탑)
- 카트/하단 바: 고정(fixed) → 모바일에서 full-width, 데스크탑에서 컨테이너 내부
- 네비게이션: 가로 배치 유지 → 모바일에서 핵심 아이콘만 노출
- 최소 너비 320px 미만 시: 레이아웃 유지하고 가로 스크롤 발생

---

## 9. Dark Mode

### 전환 메커니즘

- Tailwind CSS의 `class` 전략을 사용합니다 (`darkMode: 'class'`).
- `<html>` 태그에 `class="dark"`를 토글하여 전환합니다.
- shadcn/ui의 표준 다크 모드 패턴을 따릅니다.

### 비-색상 요소의 다크 모드 처리

- 그림자: opacity를 라이트 모드보다 약간 높이고(12~18%), 색상은 더 어둡게 조정
- 이미지: 밝기 조정 없음 (원본 유지)
- 테두리: `var(--border)`가 다크 버전으로 자동 전환
- 그라데이션: primary/accent의 다크 버전 값이 적용되어 자연스럽게 어두워짐
- backdrop-filter: blur 유지, 배경색만 다크 모드 값으로 전환

---

## 10. Agent Quick Reference

### 자주 쓰는 색상 변수

```css
/* 배경 */
background: var(--background); /* 페이지 배경 */
background: var(--card); /* 카드/패널 배경 */
background: var(--secondary); /* 보조 배경, 비활성 */
background: var(--primary); /* CTA, 활성 상태 */
background: var(--accent); /* 포인트 뱃지, 태그 */
background: var(--destructive); /* 삭제/오류 */

/* 텍스트 */
color: var(--foreground); /* 기본 텍스트 */
color: var(--muted-foreground); /* 보조 텍스트, 힌트 */
color: var(--primary); /* 강조 텍스트, 가격 */
color: var(--accent); /* 포인트 텍스트, 태그 */

/* 테두리 */
border-color: var(--border); /* 기본 테두리 */
border-color: var(--primary-light); /* 포커스 테두리 */
```

### 자주 쓰는 그림자

```css
/* 카드 */
box-shadow: 0 2px 12px rgba(74, 63, 107, 0.1);

/* 하단 고정 바 */
box-shadow: 0 -4px 24px rgba(74, 63, 107, 0.14);
```

### 자주 쓰는 그라데이션

```css
/* 로고, CTA 버튼 배경 */
background: linear-gradient(
  135deg,
  var(--primary) 0%,
  var(--primary-light) 100%
);

/* 장식적 배경 (뱃지, 공지) */
background: linear-gradient(135deg, #eee8ff 0%, #ffe8f0 100%);
```

### 컴포넌트 생성 프롬프트 예시

- "카드 컴포넌트: 흰색 배경, 1px solid var(--border) 테두리, 14px radius, 0 2px 12px rgba(74,63,107,0.10) 그림자. 내부 padding 18px."
- "Primary 버튼: linear-gradient(135deg, var(--primary), var(--primary-light)) 배경, 흰색 텍스트, 14px weight 700, 8px radius, 12px 20px padding."
- "필터 칩(active): var(--primary) 배경, 흰색 텍스트, 13px weight 500, 20px radius, 6px 14px padding."
- "입력 필드: var(--background) 배경, 1.5px solid var(--border) 테두리, 8px radius, 10px 12px padding. 포커스 시 border-color var(--primary-light)."
