# SAD (Software Architecture Document)

> 작성일: 2026-05-24
> 버전: v0.1
> 작성자: AI (코드베이스 및 프로젝트 문서 기반)
> 상태: 초안 (Draft)
> 기반 문서: [Product Strategy Document](./Product%20Strategy%20Document.md), [Product Requirement Document](./Product%20Requirement%20Document.md), [Software Requirements Specification](./Software%20Requirements%20Specification.md)

---

## 1. 개요

### 1.1 목적

이 문서는 "주세요" 시스템의 소프트웨어 아키텍처를 기술한다. 시스템의 구조적 결정사항, 컴포넌트 분해, 데이터 흐름, 기술 선택의 근거를 문서화하여 개발 및 유지보수 시 아키텍처 기준으로 활용한다.

### 1.2 범위

이 문서는 "주세요" 시스템의 프론트엔드(Next.js) 아키텍처를 중심으로 기술한다. 백엔드(NestJS)는 별도 레포지토리에서 관리되므로 본 문서에서는 인터페이스 수준에서만 다룬다.

### 1.3 아키텍처 목표

| 목표 | 설명 |
|---|---|
| 모바일 우선 | 320px 최소 너비부터 데스크톱까지 반응형 대응 |
| 플랫폼 중립성 | 외부 판매 플랫폼 API에 의존하지 않는 독립적 구조 |
| 관심사 분리 | 프론트엔드/백엔드 완전 분리, 컴포넌트 단위 모듈화 |
| 국제화 내재 | 라우팅 수준에서 다국어 지원을 내장 |
| 점진적 확장 | MVP에서 시작하여 기능을 점진적으로 추가할 수 있는 구조 |

---

## 2. 아키텍처 개요

### 2.1 시스템 아키텍처

"주세요"는 프론트엔드와 백엔드가 분리된 클라이언트-서버 아키텍처를 채택한다.

```
┌─────────────────────────────────────────────────────────────────┐
│                        클라이언트 (브라우저)                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────────┐
│                     Vercel Edge Network                         │
│                     (CDN + Edge Functions)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Next.js 16 프론트엔드                       │   │
│  │                                                         │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │   │
│  │  │ Middleware   │  │ Server       │  │ Client        │  │   │
│  │  │ (i18n       │  │ Components   │  │ Components    │  │   │
│  │  │  routing)   │  │ (SSR/SSG)    │  │ (Interactivity│  │   │
│  │  └─────────────┘  └──────────────┘  └───────────────┘  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST API (HTTPS)
┌───────────────────────────▼─────────────────────────────────────┐
│                     NestJS 백엔드                                │
│                     (별도 레포지토리)                             │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐     │
│  │ Auth     │  │ Product      │  │ Image Processing      │     │
│  │ Module   │  │ Module       │  │ Module (Sharp)        │     │
│  └──────────┘  └──────────────┘  └───────────┬───────────┘     │
│                                               │                 │
└───────────────────────────┬───────────────────┼─────────────────┘
                            │                   │
                    ┌───────▼──────┐    ┌───────▼──────┐
                    │  Database    │    │  Google Cloud │
                    │  (TBD)      │    │  Storage     │
                    └──────────────┘    └──────────────┘
```

### 2.2 아키텍처 스타일

- 프론트엔드: App Router 기반 하이브리드 렌더링 (Server Components 기본 + 필요 시 Client Components)
- 백엔드: 모듈 기반 REST API 서버 (NestJS)
- 통신: stateless REST API, 쿠키 기반 세션 인증
- 배포: 프론트엔드(Vercel), 백엔드(AWS 검토 중)

---

## 3. 기술 스택

### 3.1 프론트엔드

| 영역 | 기술 | 버전 | 선택 근거 |
|---|---|---|---|
| 프레임워크 | Next.js | 16.2.2 | App Router, Server Components, 하이브리드 렌더링 |
| UI 라이브러리 | React | 19.2.4 | React Compiler 지원, 최신 Concurrent Features |
| 언어 | TypeScript | 5.x | 타입 안전성, 개발 생산성 |
| 스타일링 | Tailwind CSS | 4.x | 유틸리티 퍼스트, 빠른 프로토타이핑, 디자인 토큰 통합 |
| 국제화 | next-intl | 4.12.0 | Next.js App Router 네이티브 통합, 서버/클라이언트 양쪽 지원 |
| 테마 | next-themes | 0.4.6 | 라이트/다크 모드 전환, SSR 호환, class 전략 |
| 아이콘 | lucide-react | 1.16.0 | 트리 셰이킹 가능, 일관된 디자인 |
| 폰트 | Pretendard | 로컬 호스팅 | 한국어 최적화, 9개 weight 지원 |
| 컴파일러 | React Compiler | 1.0.0 | 자동 메모이제이션, 렌더링 최적화 |
| 린팅 | ESLint | 9.x | flat config, import 정렬, 미사용 import 자동 제거 |
| 포맷팅 | Prettier | 3.8.x | Tailwind 클래스 정렬 플러그인 |

### 3.2 백엔드 (별도 레포지토리)

| 영역 | 기술 | 선택 근거 |
|---|---|---|
| 프레임워크 | NestJS | 모듈 기반 구조, TypeScript 네이티브, DI 지원 |
| 이미지 처리 | Sharp | 고성능 서버사이드 이미지 처리 |
| 이미지 저장 | Google Cloud Storage | 비용 효율적 오브젝트 스토리지 |
| 데이터베이스 | TBD | 추후 결정 |

### 3.3 인프라

| 영역 | 기술 | 선택 근거 |
|---|---|---|
| 프론트엔드 호스팅 | Vercel | Next.js 네이티브 지원, Edge Functions, 글로벌 CDN |
| 백엔드 호스팅 | AWS (검토 중) | 유연한 서버 구성, 스케일링 옵션 |
| 이미지 CDN | GCS | Sharp 처리 결과 직접 저장 |

---

## 4. 프론트엔드 아키텍처 상세

### 4.1 디렉토리 구조

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css               # 글로벌 스타일 + 디자인 토큰 (CSS Custom Properties)
│   ├── fonts.ts                  # Pretendard 로컬 폰트 설정
│   ├── fonts/                    # Pretendard woff2 폰트 파일 (9 weights)
│   └── [locale]/                 # i18n 동적 세그먼트
│       ├── layout.tsx            # locale별 루트 레이아웃 (Provider 계층)
│       ├── page.tsx              # 홈 페이지
│       └── tester/
│           └── page.tsx          # 디자인 시스템 테스터 페이지
├── components/                   # 공용 컴포넌트
│   ├── design-system-tester.tsx  # 디자인 시스템 시각적 테스터
│   ├── theme-provider.tsx        # next-themes ThemeProvider wrapper
│   └── theme-toggle.tsx          # 테마 순환 토글 버튼
├── i18n/                         # 국제화 설정
│   ├── request.ts                # 서버 사이드 locale 해석
│   └── routing.ts                # locale 라우팅 정의 + 네비게이션 유틸리티 export
└── proxy.ts                      # next-intl middleware (locale 라우팅)
```

향후 확장 시 아래 디렉토리를 추가할 예정이다.

```
src/
├── lib/                          # 유틸리티, API 클라이언트, 헬퍼
├── types/                        # 공용 TypeScript 타입 정의
├── hooks/                        # 커스텀 React hooks
└── stores/                       # 클라이언트 상태 관리 (필요 시)
```

### 4.2 라우팅 구조

Next.js App Router의 파일 시스템 기반 라우팅을 사용하며, 모든 페이지 경로는 `[locale]` 동적 세그먼트 하위에 위치한다.

#### 현재 구현된 라우트

| 경로 패턴 | 파일 | 설명 |
|---|---|---|
| `/{locale}` | `src/app/[locale]/page.tsx` | 홈 페이지 |
| `/{locale}/tester` | `src/app/[locale]/tester/page.tsx` | 디자인 시스템 테스터 |

#### MVP 계획 라우트

| 경로 패턴 | 설명 | 인증 |
|---|---|---|
| `/{locale}` | 랜딩/홈 | 불필요 |
| `/{locale}/login` | 로그인 | 불필요 |
| `/{locale}/signup` | 회원가입 | 불필요 |
| `/{locale}/dashboard` | 판매자 대시보드 (상품 목록) | 필요 |
| `/{locale}/products/new` | 상품 등록 | 필요 |
| `/{locale}/products/[id]` | 상품 상세/수정 | 필요 |
| `/{locale}/products/[id]/edit-image` | 이미지 편집 | 필요 |
| `/{locale}/[userId]` | 판매자 공개 마켓 페이지 | 불필요 |

### 4.3 Provider 계층

`src/app/[locale]/layout.tsx`에서 정의되는 Provider 계층 구조는 다음과 같다.

```
<html lang={locale} className={pretendard.variable} suppressHydrationWarning>
  <body className="antialiased">
    <NextIntlClientProvider messages={messages}>    ← i18n 메시지 제공
      <ThemeProvider>                                ← 테마 상태 관리
        {children}                                   ← 페이지 컨텐츠
      </ThemeProvider>
    </NextIntlClientProvider>
  </body>
</html>
```

Provider 순서의 근거는 다음과 같다.

1. `NextIntlClientProvider`가 최외곽에 위치하여 하위 모든 컴포넌트에서 번역 함수를 사용할 수 있도록 한다.
2. `ThemeProvider`는 `attribute="class"`, `defaultTheme="system"` 설정으로 `<html>` 요소에 `dark` 클래스를 토글한다.

### 4.4 렌더링 전략

Next.js App Router의 기본 동작에 따라 Server Components를 기본으로 사용하며, 인터랙티브 요소에만 `'use client'` 지시어를 적용한다.

| 유형 | 용도 | 예시 |
|---|---|---|
| Server Component | 데이터 페칭, 정적 렌더링, SEO | 페이지 컴포넌트, 레이아웃 |
| Client Component | 사용자 인터랙션, 브라우저 API | 테마 토글, 폼 입력, 장바구니 선택 |

### 4.5 컴포넌트 설계 원칙

- 파일/폴더 명명: kebab-case
- 컴포넌트 명명: PascalCase
- 한 파일에 하나의 컴포넌트, 단일 책임 원칙
- Props 인터페이스: `[ComponentName]Props`으로 명명
- Export: `export default function`

### 4.6 상태 관리

현재 글로벌 상태 관리 라이브러리를 사용하지 않으며, 다음 전략을 따른다.

| 범위 | 방식 | 예시 |
|---|---|---|
| 서버 상태 | Server Components에서 직접 fetch | 상품 목록, 사용자 정보 |
| 로컬 UI 상태 | React hooks (`useState`, `useReducer`) | 폼 입력, 모달 열림/닫힘 |
| 테마 상태 | next-themes | 라이트/다크 모드 |
| i18n 상태 | next-intl (URL 기반) | 현재 locale |

MVP 이후 클라이언트 상태 관리가 복잡해질 경우 Zustand 등의 도입을 검토한다.

---

## 5. 국제화 (i18n) 아키텍처

### 5.1 구성

- 라이브러리: next-intl v4.12.0
- 지원 locale: `ko` (기본), `en`
- locale 감지: 비활성화 (`localeDetection: false`)
- URL 전략: 기본 locale은 prefix 생략 가능 (예: `/` = `/ko`)

### 5.2 흐름

```
요청 유입
    │
    ▼
Middleware (src/proxy.ts)
    │  locale 라우팅 처리
    │  - 매칭 패턴: /((?!api|_next|_vercel|.*\\..*).*)
    │  - 기본 locale ko → prefix 생략
    ▼
Server Component
    │  getRequestConfig (src/i18n/request.ts)
    │  - locale 검증 → messages/{locale}.json 동적 import
    ▼
NextIntlClientProvider
    │  메시지 전달
    ▼
Client Component
    useTranslations() 호출로 번역 접근
```

### 5.3 번역 파일 구조

```
messages/
├── ko.json          # 한국어 번역
└── en.json          # 영어 번역
```

네임스페이스 단위로 구분하며, 현재 `HomePage`, `ClientTest`, `displayMode` 네임스페이스가 정의되어 있다. 기능 추가에 따라 네임스페이스를 확장한다.

### 5.4 내부 링크 규칙

`next/link`, `next/navigation`의 기본 export를 직접 사용하지 않는다. 반드시 `@/i18n/routing`에서 export하는 `Link`, `redirect`, `usePathname`, `useRouter`를 사용한다. 이 규칙은 locale prefix 자동 처리를 위한 것이다.

---

## 6. 디자인 시스템 아키텍처

### 6.1 토큰 기반 설계

디자인 토큰은 CSS Custom Properties로 정의하며, `src/app/globals.css`에서 `:root`와 `.dark` 선택자로 라이트/다크 모드 값을 제공한다. Tailwind CSS v4의 `@theme` 블록을 통해 CSS 변수를 Tailwind 유틸리티 클래스로 매핑한다.

```
globals.css                    Tailwind @theme              사용
─────────────                  ─────────────                ─────
:root {                        @theme {                     className=
  --primary: #4A3F6B;    →      --color-primary: var(...)    "bg-primary"
  --background: #F7F5FB;  →      --color-background: var(...)  "bg-background"
}                              }
.dark {
  --primary: #8B7FC0;    (자동 전환)
}
```

### 6.2 색상 팔레트

라이트 모드와 다크 모드에 대해 의미론적(semantic) 토큰을 사용한다.

| 토큰 | 라이트 모드 | 다크 모드 | 용도 |
|---|---|---|---|
| `--background` | #F7F5FB | #0F0D15 | 페이지 배경 |
| `--foreground` | #1E1827 | #E8E5F0 | 기본 텍스트 |
| `--card` | #FFFFFF | #1A1725 | 카드 배경 |
| `--primary` | #4A3F6B | #8B7FC0 | CTA, 강조 요소 |
| `--accent` | #D4708A | #E08DA3 | 보조 강조, 배지 |
| `--border` | #E2DAF5 | #2E2940 | 테두리 |
| `--destructive` | #EF4444 | #EF4444 | 삭제, 오류 |
| `--success` | #3DAA6A | — | 성공 피드백 |
| `--warning` | #E0A030 | — | 경고 피드백 |

### 6.3 타이포그래피

- 폰트: Pretendard (로컬 호스팅, woff2 서브셋)
- 9개 weight 지원 (100~900)
- CSS 변수 `--font-pretendard`로 등록 후 Tailwind `--font-sans`에 매핑
- 기본 body: 14px/400, Display: 24px/700

### 6.4 반응형 breakpoints

| 이름 | 기준 너비 | 용도 |
|---|---|---|
| Mobile | 기본 (< 640px) | 모바일 레이아웃 |
| Tablet | 640px+ | 태블릿 레이아웃 |
| Small Desktop | 768px+ | 소형 데스크톱 |
| Large Desktop | 1024px+ | 대형 데스크톱 |

최소 지원 너비: 320px. 이보다 좁은 화면에서는 수평 스크롤이 발생한다.

---

## 7. 외부 시스템 인터페이스

### 7.1 NestJS 백엔드 API

프론트엔드는 NestJS 백엔드와 REST API를 통해 통신한다. API 명세는 [docs/api-specification.md](../docs/api-specification.md)에서 관리하며, 현재 작성 예정 상태이다.

예상되는 주요 API 도메인은 다음과 같다.

| 도메인 | 설명 |
|---|---|
| Auth | 회원가입, 로그인, 로그아웃, 세션 관리 |
| Products | 상품 CRUD, 상태 변경, 일괄 처리 |
| Images | 이미지 업로드, 편집(분할/합치기), 다운로드 |
| Users | 사용자 프로필 조회/수정 |
| Market | 공개 마켓 페이지 데이터 조회 |

### 7.2 API 통신 규약

- 프로토콜: HTTPS
- 인증: 쿠키 기반 세션 (서버 사이드 검증)
- 요청/응답 형식: JSON
- 응답 구조: `{ data, error, message }`
- 오류 처리: HTTP 표준 상태 코드 (400, 401, 403, 404, 500)

### 7.3 Google Cloud Storage

- 용도: 상품 이미지 및 편집 이미지 저장
- 접근: NestJS 백엔드를 경유하여 접근 (프론트엔드에서 직접 접근하지 않음)
- 이미지 URL: GCS의 공개 URL을 프론트엔드에서 직접 로드

---

## 8. Middleware 아키텍처

### 8.1 현재 구현

`src/proxy.ts`에서 next-intl middleware를 생성하여 locale 기반 라우팅을 처리한다.

```
요청
  │
  ▼
proxy.ts (next-intl/middleware)
  │  매처: /((?!api|_next|_vercel|.*\\..*).*)
  │  - API, 정적 파일, _next 리소스 제외
  │  - locale 판별 → 적절한 locale 경로로 라우팅
  │  - 기본 locale(ko)은 URL prefix 생략
  ▼
App Router
  │  [locale] 동적 세그먼트로 페이지 렌더링
  ▼
응답
```

### 8.2 향후 확장

인증 기능 구현 시 middleware에 세션 검증 로직을 추가해야 한다. next-intl middleware와 인증 middleware를 체이닝하는 구조를 검토할 필요가 있다.

---

## 9. 빌드 및 개발 환경

### 9.1 개발 서버

- 명령: `npm run dev` (내부적으로 `next dev` 실행)
- React Compiler: `reactCompiler: true` 설정으로 자동 메모이제이션 활성화
- Hot Module Replacement: Next.js 기본 제공

### 9.2 빌드

- 명령: `npm run build` → `next build`
- 출력: `.next/` 디렉토리
- 배포: Vercel에 자동 배포 (Git push 트리거)

### 9.3 코드 품질

| 도구 | 용도 |
|---|---|
| TypeScript strict mode | 타입 안전성 (`npx tsc --noEmit`으로 검증) |
| ESLint 9 (flat config) | 코드 린팅, import 정렬, 미사용 import 제거 |
| Prettier + Tailwind 플러그인 | 코드 포맷팅, Tailwind 클래스 정렬 |

### 9.4 브랜치 전략

```
main ──────────────────────────────────── (배포 브랜치)
  │
  └── dev ─────────────────────────────── (개발 브랜치, 삭제하지 않음)
        │
        ├── feature/상품-등록 ──────────── (기능 브랜치, merge 후 삭제)
        ├── feature/이미지-편집 ────────── (기능 브랜치, merge 후 삭제)
        └── fix/로그인-오류 ───────────── (버그 수정, merge 후 삭제)

main ← hotfix/긴급수정 ──────────────── (긴급 수정, merge 후 삭제)
```

- 모든 merge는 `merge` 전략 사용 (rebase는 브랜치 오분기 수정 시에만)
- 커밋 메시지: 한국어, conventional commit 형식 (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)

---

## 10. 배포 아키텍처

```
┌──────────────────────────────────────────────┐
│                  Git Repository               │
│                  (GitHub)                     │
└─────────────┬───────────────┬────────────────┘
              │               │
         push to main    push to main
              │               │
   ┌──────────▼──────┐  ┌────▼──────────────┐
   │  Vercel          │  │  AWS (검토 중)     │
   │  (프론트엔드)    │  │  (백엔드)          │
   │                  │  │                    │
   │  Next.js SSR     │  │  NestJS API        │
   │  Edge Functions  │  │  Sharp 이미지 처리  │
   │  글로벌 CDN      │  │                    │
   └──────────────────┘  └──────┬─────────────┘
                                │
                         ┌──────▼──────────┐
                         │  Google Cloud   │
                         │  Storage        │
                         └─────────────────┘
```

---

## 11. 보안 아키텍처

### 11.1 인증

- 이메일 기반 인증 (MVP)
- 쿠키 기반 세션 관리
- 서버 사이드 세션 검증 (모든 인증 필요 API 요청)
- 소셜 로그인 OAuth 2.0 흐름 (P2)

### 11.2 인가

| 리소스 | 비인증 사용자 | 인증 판매자 (본인) | 인증 판매자 (타인) |
|---|---|---|---|
| 공개 마켓 페이지 | 읽기 | 읽기 | 읽기 |
| 상품 등록 | 불가 | 가능 | 불가 |
| 상품 수정/삭제 | 불가 | 가능 (본인 소유만) | 불가 |
| 일괄 상태 변경 | 불가 | 가능 (본인 소유만) | 불가 |

### 11.3 프론트엔드 보안 고려사항

- 환경 변수: `NEXT_PUBLIC_` prefix가 없는 변수는 서버 사이드에서만 접근
- XSS 방지: React의 기본 이스케이핑, dangerouslySetInnerHTML 사용 금지
- CSRF: 쿠키 기반 세션에 SameSite 속성 적용

---

## 12. 현재 구현 상태 및 기술 부채

### 12.1 구현 완료

- Next.js 16 + React 19 프로젝트 기반 구조
- Tailwind CSS v4 + CSS Custom Properties 기반 디자인 토큰 시스템
- next-intl v4 국제화 라우팅 (ko, en)
- next-themes 테마 관리 (시스템/라이트/다크)
- Pretendard 로컬 폰트 (9 weights)
- React Compiler 활성화
- ESLint + Prettier 코드 품질 도구
- 디자인 시스템 시각적 테스터 컴포넌트

### 12.2 미구현 (MVP 대상)

- 사용자 인증 UI 및 로직
- 상품 CRUD 페이지 및 API 연동
- 이미지 편집 UI
- 판매자 공개 마켓 페이지
- 장바구니형 거래 보조 기능
- `src/lib/` 디렉토리 (API 클라이언트, 유틸리티)
- `src/types/` 디렉토리 (공용 타입 정의)
- API 명세서 (`docs/api-specification.md`)

### 12.3 아키텍처 결정 필요 사항

| 항목 | 설명 | 영향 |
|---|---|---|
| 백엔드 데이터베이스 | DB 종류 미결정 (PostgreSQL, MongoDB 등) | 데이터 모델, ORM 선택 |
| 인증 middleware 체이닝 | next-intl + 인증 middleware 조합 방식 | 세션 검증 흐름 |
| 이미지 업로드 방식 | 직접 GCS 업로드 vs 백엔드 경유 | 보안, 성능, 구현 복잡도 |
| 클라이언트 상태 관리 | 복잡도 증가 시 Zustand 등 도입 여부 | 장바구니 기능, 폼 상태 |
| API 클라이언트 패턴 | fetch wrapper, React Query, SWR 등 | 데이터 페칭, 캐싱 |

---

## 13. 변경 이력

| 버전 | 날짜 | 변경 내용 |
|---|---|---|
| v0.1 | 2026-05-24 | 코드베이스 및 프로젝트 문서 기반 초안 작성 |
