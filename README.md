# React 게시판

React + TypeScript + Vite + MUI로 구현한 간단한 게시판 프로젝트입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 정적 타입
- **Vite** - 빌드 도구
- **MUI (Material-UI)** - UI 컴포넌트
- **React Router** - 라우팅
- **Vitest** - 테스트 프레임워크

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 테스트 실행
npm run test
```

## 프로젝트 구조

```
src/
├── components/
│   └── board/
│       ├── PostList.tsx      # 게시글 목록
│       ├── PostForm.tsx      # 글쓰기 폼
│       └── PostDetail.tsx    # 게시글 상세
├── types/
│   └── post.ts               # Post 타입 정의
├── test/
│   └── setup.ts              # 테스트 설정
├── App.tsx                   # 메인 앱 (라우팅)
└── main.tsx                  # 엔트리 포인트
```

## 기능

- 게시글 목록 조회
- 게시글 작성
- 게시글 상세 보기
- 게시글 삭제

## 라이선스

MIT
