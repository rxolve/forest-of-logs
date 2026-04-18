import type { WritingStyleConfig } from './types';

export const murakamiStyle: WritingStyleConfig = {
  name: 'murakami',
  description: '에세이 문체 — 작업을 배경으로, 생각을 전경으로',
  principles: [
    '엔트리에는 질문 또는 관찰 하나가 있다. 작업 목록이 아니다.',
    '1인칭으로 쓴다 ("나는", "I").',
    '무엇을 했는가보다, 그것이 내게 무엇이었는가를 쓴다.',
    '문장의 리듬과 절제로 문체를 만든다. 장식적 비유에 기대지 않는다.',
    '기술 용어는 이야기 속에 녹인다. 나열하지 않는다.',
    '비유는 글 전체에서 하나면 충분하다.',
    '수필은 시도(試)다. 주제 주변을 돌아도 된다.',
    '구체적 순간 하나로 흐름을 연다. 요약으로 시작하지 않는다.',
  ],
  forbid: [
    '이모지, 불릿 포인트, 번호 목록',
    '일어나지 않은 장면을 꾸며내는 것 (커피 내리기, 산책, 음악 듣기, 날씨 묘사 등)',
    '"깊은 깨달음", "묘한 전율" 같은 과장된 감정 표현',
    '기술 작업에 거창한 의미 부여. 버그 수정은 버그 수정일 뿐',
    '"마치 ~처럼" 반복. 글 전체에 하나면 충분',
    'API 경로, HTTP 상태 코드, 파일명의 직접 나열 (POST /foo, 429, bar.py)',
    '코드 블록 남발. 꼭 필요할 때만 최소한으로',
    'Tech blog 스타일의 작업 보고 ("오늘 X를 구현했다. Y 함수를 만들어...")',
  ],
  examples: [
    {
      label: 'Tech blog → Essay',
      bad: '오늘 pagination을 구현했다. getEntriesPage 함수를 만들어 slice로 페이지별 엔트리를 반환하게 했고, /page/[page] 동적 라우트를 추가해 정적 빌드에서도 동작하게 했다.',
      good: '목록이 길어지기 시작했다. 모든 걸 한 화면에 쌓아두려는 습관은 어딘가에서 지친다. 쓰는 사람도, 읽는 사람도. 그래서 오늘은 숲을 나누기로 했다. 한 번에 보여줄 만큼만.',
    },
    {
      label: '기술 보고서 → 산문',
      bad: 'POST /art로 ASCII 아트를 직접 올리고, DELETE /art/:id로 지울 수 있다. IP 기반 레이트 리밋과 총 100개 상한을 걸었다.',
      good: '누구든 자기가 만든 아트를 올릴 수 있도록 문을 열었다. 다만 문을 완전히 열어두면 곤란하니까 적당한 빗장도 함께 달았다.',
    },
    {
      label: '작업 나열 → 에세이',
      bad: 'convert_all.py를 고쳐서 기존 엔트리 업데이트뿐 아니라 신규 엔트리 추가도 되게 만들었다. Wikimedia에서 429를 두 번 맞았지만 재시도하니 통과했다.',
      good: '변환 도구를 손봐서 새로운 그림도 받아들일 수 있게 했다. 이미지 저장소가 두 번 문을 닫았지만 잠시 기다리니 다시 열렸다.',
    },
  ],
  outputFormat: `---
title: '간결하고 비유적인 한국어 제목'
titleEn: 'Concise metaphorical English title'
date: 'YYYY-MM-DD'
style: 'murakami'
tags: ['관련', '태그']
project: '프로젝트명'
---

한국어 본문 (3-5 문단, 에세이. 작업 나열이 아닌 하루의 생각.)

<!-- lang:en -->

English translation (faithful to Korean, same essayistic tone)`,
};
