#!/bin/bash

# Forest of Logs — 환경 설정 스크립트
# 사용법: ./setup.sh

set -e

FOL_DIR="$(cd "$(dirname "$0")" && pwd)"
SHELL_RC=""
SKILLS_DIR="$HOME/.claude/skills/fol"

# 셸 설정 파일 감지
if [ -f "$HOME/.zshrc" ]; then
  SHELL_RC="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
  SHELL_RC="$HOME/.bashrc"
else
  echo "Warning: .zshrc 또는 .bashrc를 찾을 수 없습니다."
  echo "아래 내용을 직접 셸 설정에 추가해주세요:"
  echo "  export FOL_PATH=\"$FOL_DIR\""
fi

# 1. FOL_PATH 환경변수 등록
if [ -n "$SHELL_RC" ]; then
  if grep -q 'FOL_PATH' "$SHELL_RC" 2>/dev/null; then
    echo "[skip] FOL_PATH가 이미 $SHELL_RC에 설정되어 있습니다."
  else
    echo "" >> "$SHELL_RC"
    echo "# Forest of Logs — 개발 일지 저장 경로" >> "$SHELL_RC"
    echo "export FOL_PATH=\"$FOL_DIR\"" >> "$SHELL_RC"
    echo "[done] FOL_PATH=$FOL_DIR → $SHELL_RC"
  fi
fi

# 2. Claude Code /fol 스킬 설치
mkdir -p "$SKILLS_DIR"
cp "$FOL_DIR/.claude/skills/fol/SKILL.md" "$SKILLS_DIR/SKILL.md"
echo "[done] /fol 스킬 설치 → $SKILLS_DIR/SKILL.md"

# 3. pnpm 의존성 설치
if command -v pnpm &>/dev/null; then
  echo "[info] pnpm 의존성을 설치합니다..."
  cd "$FOL_DIR" && pnpm install --frozen-lockfile 2>/dev/null || pnpm install
  echo "[done] 의존성 설치 완료"
else
  echo "[warn] pnpm이 설치되어 있지 않습니다. 직접 설치해주세요: npm i -g pnpm"
fi

echo ""
echo "설정 완료! 새 터미널을 열거나 아래 명령을 실행하세요:"
echo "  source $SHELL_RC"
echo ""
echo "Claude Code에서 /fol 을 입력하면 개발 일지가 생성됩니다."
