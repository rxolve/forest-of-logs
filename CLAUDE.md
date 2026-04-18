# 로그의 숲 — Forest of Logs

개발 세션을 기록하는 블로그.

## 빠른 시작

```bash
git clone <repo-url> && cd forest-of-logs
./setup.sh        # FOL_PATH 환경변수 + /fol 커맨드 + 의존성 설치
source ~/.zshrc   # 환경변수 적용
```

셋업 후 아무 프로젝트에서 Claude Code에 `/fol`을 입력하면 오늘의 개발 일지가 자동 생성됩니다.

### setup.sh가 하는 일

1. `FOL_PATH` 환경변수를 셸 설정(`.zshrc`/`.bashrc`)에 등록
2. `.claude/skills/fol/SKILL.md`를 `~/.claude/skills/fol/SKILL.md`에 복사
3. `pnpm install` 실행

---

## 기술 스택

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + 커스텀 prose
- **Content**: gray-matter + next-mdx-remote
- **Code Highlight**: rehype-pretty-code + shiki
- **Theme**: next-themes (light/dark)
- **Export**: `output: 'export'` (정적 빌드)
- **Package Manager**: pnpm

## 디렉토리 구조

```
app/_types/            → 타입 정의
app/_lib/              → 유틸리티 (entries.ts, mdx.ts, metadata.ts)
app/_components/       → 공유 컴포넌트
content/entries/       → 마크다운 일지 (YYYY/MM/YYYY-MM-DD.md)
styles/                → 문체 시스템 (murakami.ts 등)
.claude/skills/fol/SKILL.md → /fol 스킬 원본
setup.sh               → 환경 셋업 스크립트
```

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 파일/폴더 | kebab-case | `entry-card.tsx` |
| React 컴포넌트 | PascalCase | `EntryCard` |
| 타입/인터페이스 | PascalCase | `EntryMeta` |
| 함수 | camelCase | `getAllEntries` |

## 코드 스타일

- Prettier: 싱글 따옴표, 세미콜론, 2칸 들여쓰기, trailing comma es5
- `import type` 사용 (런타임에 불필요한 타입)

---

## /fol 커맨드

Claude Code 글로벌 슬래시 커맨드. 어떤 프로젝트에서든 `/fol` 입력 시:

1. 세션 작업을 돌아보고 핵심 2-3가지 파악
2. 하루키 문체로 한/영 일지 작성
3. `$FOL_PATH/content/entries/YYYY/MM/YYYY-MM-DD.md`에 저장

스킬 원본: `.claude/skills/fol/SKILL.md`
유저 레벨: `~/.claude/skills/fol/SKILL.md` (setup.sh가 복사)

스킬을 수정한 후 다른 환경에서 `./setup.sh`를 다시 실행하면 반영됩니다.

---

## 일지 문체 (에세이, not tech blog)

문체 규칙의 **단일 원천**은 `styles/murakami.ts`입니다. `principles`, `forbid`, `examples`, `outputFormat` 네 필드에 모든 규칙이 있습니다.

- `/fol` 커맨드는 일지 작성 시 이 파일을 읽어 따릅니다.
- 엔트리 페이지는 `style` 프론트매터 값으로 `tryGetStyle()`을 호출해 description을 표시합니다.
- 새 스타일 추가는 `styles/`에 파일을 만들고 `styles/index.ts`의 레지스트리에 등록합니다.

프론트매터는 한/영 제목을 모두 지원합니다:

```yaml
title: '한국어 제목'
titleEn: 'English title'
```

`titleEn`이 없으면 영어 UI에서도 `title`로 폴백됩니다.

---

## 보안 규칙 (퍼블릭 레포)

이 레포는 **공개 저장소**입니다. 아래 항목은 코드, 일지, 커밋 메시지 어디에도 절대 포함하지 마세요.

- API 키, 시크릿, 토큰, 비밀번호
- `.env` 파일 내용 또는 환경변수 값
- 내부 서버 URL, IP 주소, 데이터베이스 접속 정보
- 고객/사용자 개인정보 (이름, 이메일, 연락처 등)
- 회사 내부 비즈니스 로직, 비공개 API 엔드포인트
- 절대 경로 (홈 디렉토리, 사용자명이 포함된 경로)

`/fol` 커맨드로 일지를 생성할 때도 위 규칙을 반드시 지켜야 합니다.
작업 내용을 서술할 때 구체적인 값이 아닌 추상적인 설명으로 대체하세요.
