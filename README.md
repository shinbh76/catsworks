# CatsWorks Admin Dashboard

DashStack 스타일의 Admin UI를 구현한 Next.js 기반 관리자 대시보드입니다.

## 주요 기능

- ✅ 라이트/다크 테마 지원
- ✅ 사이드바 접힘/펼침 기능
- ✅ 한국어/중국어 i18n 지원
- ✅ Order Lists 페이지 (29개 컬럼, 그룹 밴딩)
- ✅ Product Stock 페이지
- ✅ Asia Gothic 폰트 시스템
- ✅ Modern Minimal 디자인

## 기술 스택

- Next.js 16.1.0
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React (아이콘)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 필요한 파일

다음 파일들을 `public` 디렉토리에 추가해야 합니다:

### 폰트 파일 (`public/fonts/`)
- `a-asiagothic-light.woff2`
- `a-asiagothic-medium.woff2`
- `a-asiagothic-bold.woff2`
- `a-asiagothic-extrabold.woff2`

### 로고 파일 (`public/`)
- `catsworks-logo-h120.png` (라이트 모드, 펼침)
- `catsworks-icon-120.png` (라이트 모드, 접힘)
- `catsworks-logo-darkmode-fixed.png` (다크 모드, 펼침)
- `catsworks-icon-120-darkmode-tailwhite.png` (다크 모드, 접힘)
- `favicon.ico` (이미 `app/favicon.ico`에 있음)

## 프로젝트 구조

```
├── app/
│   ├── fonts.ts              # 폰트 설정
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 대시보드 페이지
│   ├── globals.css            # 전역 스타일
│   ├── orders/
│   │   └── list/              # 사입목록 페이지
│   └── products/              # 상품관리 페이지
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx      # 앱 셸 레이아웃
│   │   ├── sidebar.tsx        # 사이드바
│   │   └── topbar.tsx         # 상단 바
│   ├── page-header.tsx        # 페이지 헤더
│   └── ui/                    # shadcn/ui 컴포넌트
├── lib/
│   ├── contexts/              # React 컨텍스트
│   │   ├── i18n-context.tsx   # i18n 컨텍스트
│   │   ├── theme-context.tsx  # 테마 컨텍스트
│   │   └── sidebar-context.tsx # 사이드바 컨텍스트
│   ├── data/
│   │   └── order-lists.ts     # Order Lists 데이터
│   ├── i18n.ts                # i18n 번역
│   └── utils.ts               # 유틸리티 함수
└── public/                    # 정적 파일
```

## 주요 페이지

### 대시보드 (`/`)
메인 대시보드 페이지

### 사입목록 (`/orders/list`)
- 29개 컬럼 테이블
- 그룹별 밴딩 배경
- 필터 바 (날짜, 주문 유형, 주문 상태)
- 가로 스크롤 지원
- 첫 번째 컬럼(날짜) sticky

### 상품관리 (`/products`)
- 상품 목록 테이블
- 검색 기능
- 썸네일 이미지
- 컬러 도트 표시
- 편집/삭제 액션

## 디자인 시스템

### 컬러
- Primary: `#3EB991` (oklch(0.696 0.17 162.48))
- 테마: 라이트/다크 모드 지원

### 폰트
- Light (300): 테이블 데이터, 설명문, 필터바 텍스트
- Medium (500): 메뉴, 버튼, 폼 라벨
- Bold (700): 페이지 헤더, 테이블 헤더
- ExtraBold (800): 메인 대시보드 타이틀

### 아이콘
- 라이브러리: Lucide React
- 선 굵기: `strokeWidth={1.5}`

## 개발 가이드

### 새 페이지 추가
1. `app` 디렉토리에 새 페이지 디렉토리 생성
2. `AppShell` 컴포넌트로 감싸기
3. `PageHeader` 컴포넌트 사용
4. `useI18n` 훅으로 언어 지원

### 메뉴 추가
`components/layout/sidebar.tsx`의 `menuItems` 배열에 항목 추가

### 번역 추가
`lib/i18n.ts`의 `translations` 객체에 번역 추가

## 라이선스

Private
