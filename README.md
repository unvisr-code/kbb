# KBB (K-Beauty Booking)

한국의 외국인 친화적 네일 살롱 예약 플랫폼

## 소개

KBB는 한국을 방문하는 외국인들이 영어 지원이 가능한 네일 살롱을 쉽게 찾고 예약할 수 있는 웹 애플리케이션입니다. 고객과 살롱 점주 모두를 위한 인터페이스를 제공합니다.

## 주요 기능

### 고객용 (Customer)
- 지역별 네일 살롱 검색 및 필터링 (강남, 홍대, 성수, 이태원 등)
- 외국인 친화적 살롱 필터
- 가격/평점 기준 정렬
- 서비스 선택 및 예약
- 실시간 예약 상태 확인

### 점주용 (Owner)
- 대시보드 및 예약 관리
- 예약 요청 승인/거절
- 서비스 메뉴 관리
- 정산 내역 조회
- 온보딩 프로세스

## 기술 스택

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5
- **UI**: React 18
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 5 (with persist middleware)
- **Animation**: Framer Motion
- **Form**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 프로젝트 구조

```
src/
├── app/
│   ├── (customer)/              # 고객용 페이지
│   │   ├── page.tsx             # 메인 페이지 (살롱 목록)
│   │   ├── salons/[salonId]/    # 살롱 상세 및 예약
│   │   ├── checkout/            # 체크아웃
│   │   │   ├── page.tsx
│   │   │   ├── _components/     # 페이지 전용 컴포넌트
│   │   │   └── _schemas/        # Zod 검증 스키마
│   │   ├── payment/             # 결제
│   │   │   ├── page.tsx
│   │   │   ├── _components/     # Mock 결제 컴포넌트
│   │   │   └── _hooks/          # 커스텀 훅
│   │   └── booking/             # 예약 상태 페이지
│   └── owner/                   # 점주용 페이지
│       ├── login/               # 로그인
│       ├── onboarding/          # 온보딩
│       ├── bookings/            # 예약 관리
│       ├── services/            # 서비스 관리
│       └── settlement/          # 정산
├── components/
│   ├── ui/                      # 공통 UI 컴포넌트
│   ├── layout/                  # 레이아웃 컴포넌트
│   └── customer/                # 고객용 컴포넌트
├── lib/
│   ├── mock/                    # Mock 데이터
│   └── utils.ts                 # 유틸리티 함수
├── stores/                      # Zustand 스토어 (persist 적용)
│   ├── authStore.ts
│   ├── bookingStore.ts
│   └── filterStore.ts
└── types/                       # TypeScript 타입 정의
    ├── salon.ts
    ├── service.ts
    ├── booking.ts
    └── user.ts
```

## 시작하기

### 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # 린트 검사
```

## 페이지 라우트

### 고객용 페이지

| URL | 설명 |
|-----|------|
| http://localhost:3000 | 메인 페이지 (살롱 목록) |
| http://localhost:3000/salons/salon-001 | 살롱 상세 페이지 |
| http://localhost:3000/salons/salon-001/book | 예약 페이지 (서비스/날짜/시간 선택) |
| http://localhost:3000/checkout | 체크아웃 페이지 (고객 정보 입력) |
| http://localhost:3000/payment | 결제 페이지 (Mock 결제) |
| http://localhost:3000/booking/booking-001/pending | 예약 대기 상태 페이지 |
| http://localhost:3000/booking/booking-001/result | 예약 결과 페이지 |

### 점주용 페이지

| URL | 설명 |
|-----|------|
| http://localhost:3000/owner | 점주 메인 (예약 요청으로 리다이렉트) |
| http://localhost:3000/owner/dashboard | 대시보드 (예약 요청으로 리다이렉트) |
| http://localhost:3000/owner/login | 점주 로그인 (Mock) |
| http://localhost:3000/owner/onboarding | 점주 온보딩 |
| http://localhost:3000/owner/bookings/requests | 예약 요청 목록 |
| http://localhost:3000/owner/bookings/confirmed | 확정된 예약 목록 |
| http://localhost:3000/owner/bookings/booking-001 | 예약 상세 페이지 |
| http://localhost:3000/owner/services | 서비스 관리 |
| http://localhost:3000/owner/settlement | 정산 내역 |

> **참고**: Mock 데이터 ID 형식은 `salon-001`, `booking-001` (3자리 숫자 패딩)입니다. `/checkout`과 `/payment` 페이지는 예약 플로우를 통해 접근해야 합니다.

## 지원 지역

| 영문 | 한글 |
|------|------|
| Gangnam | 강남 |
| Hongdae | 홍대 |
| Seongsu | 성수 |
| Itaewon | 이태원 |
| Myeongdong | 명동 |
| Sinsa | 신사 |
| Apgujeong | 압구정 |

## 서비스 카테고리

- Gel Nail (젤 네일)
- Nail Art (네일 아트)
- Pedicure (페디큐어)
- Nail Care (네일 케어)
- Removal (제거)
- Extension (연장)
- Hand Care (핸드 케어)

## 예약 흐름

1. **살롱 선택** - 메인 페이지에서 원하는 살롱 선택
2. **서비스 선택** - 살롱의 서비스 메뉴에서 선택
3. **날짜/시간 선택** - 캘린더에서 예약 가능한 시간대 선택
4. **예약 요청** - 고객 정보 입력 및 예약금 결제
5. **점주 승인** - 점주가 예약 요청을 확인하고 승인/거절
6. **예약 확정** - 승인 시 예약 확정, 거절 시 환불 처리

## 결제 구조

- **예약금**: 20,000원 (고정)
  - 플랫폼 수수료: 5,000원
  - 살롱 지급액: 15,000원
- **잔액**: 시술 당일 현장 결제

> **참고**: 현재 결제는 Mock 처리되며, 실제 카드 정보를 수집하지 않습니다.

## 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 환경 변수

현재 Mock 데이터를 사용하므로 별도의 환경 변수가 필요하지 않습니다.

## 개발 노트

### 코드 컨벤션

- 페이지별 컴포넌트는 `_components/` 디렉토리에 배치
- 페이지별 훅은 `_hooks/` 디렉토리에 배치
- Zod 스키마는 `_schemas/` 디렉토리에 배치
- `_` 접두사 디렉토리는 라우트에서 제외됨

### Mock 데이터

- 살롱: `salon-001` ~ `salon-003`
- 예약: `booking-001` ~ `booking-005`
- 서비스: `service-001` ~ `service-010`

## License

Private - All rights reserved
