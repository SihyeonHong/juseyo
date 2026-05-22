<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Rules

## 참조 문서

코드를 작성하기 전에, 관련된 프로젝트 문서를 먼저 확인하세요.

- 제1 source (Product Strategy Document): `product/Product Strategy Document.md`
- PRD (Product Requirement Document): `product/PRD_주세요_v0.1.md`
- 코드 컨벤션, 커밋 컨벤션, 브랜치 전략: `docs/conventions.md`
- 디자인 가이드 (사람용 요약): `docs/design-guide.md`
- 디자인 시스템 (AI용 상세 스펙): `DESIGN.md`
- API 엔드포인트 명세: `docs/api-specification.md`

## 주석 작성 규칙

1. 주석은 한글로 작성합니다.
2. 기술적인 외래어(예: locale, wrapper 등)는 한국어 발음으로 표기하지 말고 영어 원단어 그대로 표기합니다.
3. 완전한 문장(예: '~합니다.')으로 작성할 필요 없이, 핵심만 간결하게 작성합니다. 불필요하거나 자명한 설명은 생략합니다.

## TypeScript 타입 체크

코드를 수정하거나 추가한 후 타입 체크가 필요한 경우, 다음 규칙을 따르세요.

1. 반드시 프로젝트 루트에서 `npx tsc --noEmit`을 실행하세요. 특정 파일 경로를 인자로 전달하면 `tsconfig.json`의 경로 별칭(`@/*`)이 무시되어 잘못된 에러가 발생합니다.
2. 특정 파일의 오류만 보고 싶다면 전체 체크 후 필터링하세요: `npx tsc --noEmit | Select-String "파일명"`
3. `--project`와 개별 파일 경로를 동시에 사용하면 TS5042 에러가 발생합니다. 조합하지 마세요.
4. 중요한 비즈니스 로직 수정, 새 라이브러리 도입, 공용 인터페이스(`@/types`) 수정 시에는 반드시 타입 체크를 수행하세요.

## 도구 사용 원칙

- 내부 도구(예: `list_dir`, `view_file`, `grep_search`)를 우선 사용하세요. 특히 파일 탐색은 내장 시스템 기능으로 충분합니다.
- 내부 도구로 해결할 수 없는 작업에 한해 터미널 명령(`run_command`)을 사용하세요. e.g., 빌드, 테스트, CLI 실행(예: `npm`, `npx`, `git`) 등

### 금지

- 광범위한 재귀 탐색(예: `dir /s`)을 사용하지 마세요. `node_modules` 등이 포함되어 비효율적입니다.
- Powershell 명령어(`dir`, `Get-ChildItem`) 호출을 금지합니다. 내부 도구 및 `npm`, `npx`, `git` 등의 명령어 사용만으로 충분합니다. 이것으로 처리할 수 없어 Powershell 명령어가 필요할 가능성은 희박합니다.

## 사용자 승인 규칙 (Strict)

터미널 명령(`run_command`) 도구를 호출하기 전에는 반드시 사전에 채팅창을 통해 다음 세 가지 항목을 작성하여, 사용자에게 명령어의 필요성을 충분히 설명해야 합니다. 냅다 명령어만 던지며 승인을 요청하는 행위를 엄격히 금지합니다.

- 'Target Command': 실행하려는 정확한 명령어
- 'Purpose': 왜 이 명령어가 필요한지에 대한 구체적 이유
- 'Expected': 실행 후 예상되는 결과

위 설명을 생략하고 도구 호출 팝업만 띄울 경우 해당 작업은 즉시 거부됩니다.

# Formatting & Tone Rules (Strict)

Use Formal, reporting tone.

아래의 Allowlist에서 허용하는 syntax를 제외하고는 모두 반드시 raw text(plain text)로만 작성해야 합니다.
핵심 정보는 오직 큰따옴표("")나 작은따옴표('')만을 사용해 강조해야 합니다.
다른 syntax 사용은 시도하지 않습니다. 특히 **볼드체**를 엄격히 금지합니다.

Restrict all output formatting strictly to the following 'Allowlist' of Markdown syntax.
Any text not covered by the Allowlist must be rendered as raw text.
Apply emphasis 'only' via double("") or single('') quotation marks.

## Allowlist

- Heading
- ordered/unordered list
- link
- code block, inline code
