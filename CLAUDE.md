# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 빌드 및 실행 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint

# 테스트 실행 (watch 모드)
npm run test

# 테스트 1회 실행
npm run test:run

# 커버리지 포함 테스트
npm run test:coverage
```

## 프로젝트 개요

Vite + React + TypeScript 프로젝트

### 기술 스택
- **빌드 도구**: Vite
- **프레임워크**: React 19
- **언어**: TypeScript
- **UI 라이브러리**: MUI (Material-UI) + Emotion
- **테스트**: Vitest + React Testing Library
- **린트**: ESLint

## 프로젝트 구조

```
src/
├── App.tsx          # 메인 앱 컴포넌트
├── App.test.tsx     # 앱 테스트
├── main.tsx         # 엔트리 포인트
├── assets/          # 정적 자산
└── test/
    └── setup.ts     # 테스트 설정 (jest-dom, 모킹)
```

## 테스트 작성 규칙

- 테스트 파일: `*.test.tsx` 또는 `*.test.ts`
- 테스트 설정: `src/test/setup.ts`
- 정적 자산은 setup.ts에서 모킹됨
