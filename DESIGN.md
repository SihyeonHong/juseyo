# DESIGN.md — 주세요 (juseyo) Design System

AI 에이전트가 일관된 UI를 생성하기 위한 상세 디자인 시스템 문서입니다.
사람이 읽는 요약 버전은 `docs/design-guide.md`를 참조하세요.

---

## 1. Color Palette

shadcn-ui의 표준 CSS 변수 체계를 기반으로 하며, 모든 색상은 `src/app/globals.css`에 정의되어 있습니다.
디자인 스타일링 시 직접적인 색상 코드 사용을 엄격히 금지하며, 반드시 프로젝트에 정의된 시맨틱 CSS 변수를 최우선으로 사용해야 합니다.

### Tailwind 팔레트 우선 원칙

색상, 간격(Spacing) 등의 디자인 값을 새로 정할 때는 Tailwind CSS에서 제공하는 값을 우선적으로 탐색하여 적합한 값이 있으면 그것을 사용합니다. Tailwind 팔레트에 적절한 값이 없을 때에 한해 별도의 커스텀 값을 지정합니다.

예시:

```css
--link: #2563eb; /* blue-600 */
```

### Core Palette

| Token                      | Light Mode                  | Dark Mode                   | Role                    |
| -------------------------- | --------------------------- | --------------------------- | ----------------------- |
| `--background`             | `oklch(1 0 0)`              | `oklch(0.145 0.008 326)`    | 앱 전체 배경            |
| `--foreground`             | `oklch(0.145 0.008 326)`    | `oklch(0.985 0 0)`          | 기본 텍스트             |
| `--card`                   | `oklch(1 0 0)`              | `oklch(0.212 0.019 322.12)` | 카드 및 모달 배경       |
| `--card-foreground`        | `oklch(0.145 0.008 326)`    | `oklch(0.985 0 0)`          | 카드 내부 텍스트        |
| `--popover`                | `oklch(1 0 0)`              | `oklch(0.212 0.019 322.12)` | 팝오버 및 드롭다운 배경 |
| `--popover-foreground`     | `oklch(0.145 0.008 326)`    | `oklch(0.985 0 0)`          | 팝오버 내부 텍스트      |
| `--primary`                | `oklch(0.212 0.019 322.12)` | `oklch(0.922 0.005 325.62)` | 주조색                  |
| `--primary-foreground`     | `oklch(0.985 0 0)`          | `oklch(0.212 0.019 322.12)` | primary 위의 텍스트     |
| `--secondary`              | `oklch(0.96 0.003 325.6)`   | `oklch(0.263 0.024 320.12)` | 보조 배경               |
| `--secondary-foreground`   | `oklch(0.212 0.019 322.12)` | `oklch(0.985 0 0)`          | secondary 위의 텍스트   |
| `--muted`                  | `oklch(0.96 0.003 325.6)`   | `oklch(0.263 0.024 320.12)` | 비강조 배경             |
| `--muted-foreground`       | `oklch(0.542 0.034 322.5)`  | `oklch(0.711 0.019 323.02)` | 비강조 텍스트           |
| `--accent`                 | `oklch(0.96 0.003 325.6)`   | `oklch(0.263 0.024 320.12)` | 강조용 보조 배경        |
| `--accent-foreground`      | `oklch(0.212 0.019 322.12)` | `oklch(0.985 0 0)`          | accent 위의 텍스트      |
| `--destructive`            | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | 위험한 액션 (Red 계열)  |
| `--destructive-foreground` | `#FFFFFF`                   | `oklch(0.985 0 0)`          | destructive 위의 텍스트 |
| `--border`                 | `oklch(0.922 0.005 325.62)` | `oklch(1 0 0 / 10%)`        | 기본 경계선             |
| `--input`                  | `oklch(0.922 0.005 325.62)` | `oklch(1 0 0 / 15%)`        | 입력 필드 테두리선      |
| `--ring`                   | `oklch(0.711 0.019 323.02)` | `oklch(0.542 0.034 322.5)`  | 포커스 링 라인          |

위와 같이 Tailwind 팔레트에서 가져온 값이라면, 코드 옆에 주석으로 Tailwind 색상명을 명시합니다.

---

## 2. Typography Rules

### Font Family

- 기본: 'Pretendard'

### 타이포그래피 원칙

- Tailwind CSS 표준 폰트 크기 클래스(`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` 등)를 우선 사용합니다.
- `word-wrap: break-word` 속성이 body 전역에 적용되어 있습니다. 텍스트가 컨테이너를 벗어나는 것을 방지합니다.
- Weight는 400(본문), 500(UI/인터랙티브), 700(제목/강조)의 세 단계를 기본으로 사용하며, 비표준 두께의 남용을 지양합니다.

---

## 3. Layout Principles

### 화면 방향 (Orientation) 용어 정의

- Portrait: 디바이스 기기를 세로 방향으로 길게 든 세로 모드 상태
- Landscape: 디바이스 기기를 가로 방향으로 넓게 든 가로 모드 상태

### 최소 지원 너비 및 스크롤 정책

- 모든 페이지의 최소 지원 너비: `320px`
- 화면 너비가 `320px` 미만으로 줄어들 경우, UI가 붕괴하지 않도록 가로 스크롤을 허용합니다.

### 페이지 컨테이너 및 최대 너비

- 너비 및 여백 설정 시 Tailwind CSS의 반응형 유틸리티(`max-w-7xl`, `mx-auto`, `px-4` 등)를 조합하여 사용합니다.
- 예시: `src/app/[locale]/[userId]/mypage/page.tsx`에 적용된 `mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8` 구조를 참고합니다.

---

## 4. UI Library & Components

- 컴포넌트 라이브러리: `shadcn-ui` (`src/components/shadcn-ui` 아래에 설치된 표준 컴포넌트들을 최우선 사용합니다.)
- 아이콘: `lucide-react`를 최우선으로 사용합니다.

---

## 5. Dark Mode

- Tailwind CSS의 `class` 기반 다크 테마 모드를 지원합니다 (`<html>` 태그에 `.dark` 클래스를 전환).
- shadcn-ui의 표준 다크 모드 속성 규칙과 호환됩니다.
