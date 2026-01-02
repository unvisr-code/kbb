# K-Booking Beauty (MVP) PRD

## 1. 개요

K-Booking Beauty는 **외국인 고객 대상 네일샵 예약 중개 모바일 퍼스트 웹 서비스**다. 고객용(영문 UI)과 샵 관리자용(국문 UI)을 명확히 분리해 운영한다. 결제는 **예약금 선결제 + 잔액 현장 결제** 구조이며, MVP에서는 **네일샵 카테고리만** 제공하고 자동화·확장 기능은 제외한다.

---

## 2. 목표

* 외국인 고객이 **회원가입 없이** 네일샵을 탐색하고 예약 요청 및 예약금 결제까지 완료할 수 있다.
* 샵 업주가 관리자 페이지에서 **시술 등록**과 **예약 승인/거절**을 처리할 수 있다.
* 예약 승인/거절 결과가 고객 화면 및 이메일로 전달되고, 거절 시 예약금 환불 안내까지 일관되게 제공된다.
* 운영자는 완료/노쇼 기준으로 정산(월 2회)을 수행할 수 있는 최소한의 데이터가 축적된다(자동 리포트는 제외).

### 핵심 KPI (MVP)

* 고객 플로우 완료율: 리스트→상세→예약요청→결제 완료
* 예약 요청 대비 승인율(샵별)
* 결제 성공률/환불 성공률
* 예약 확정 후 노쇼율

---

## 3. 범위

### In Scope (MVP)

* 고객(EN) 웹: 샵 리스트/필터, 샵 상세 + 시술 리스트, 날짜·시간 선택, 비회원/구글 로그인, 예약금 결제, 상태 화면(대기/확정/거절)
* 오너(KR) 웹: 카카오/구글 로그인, 샵 정보 등록(최초 1회), 시술 등록/관리, 예약 요청 리스트, 예약 승인/거절, 확정 리스트, 예약 완료/노쇼 처리(상태 업데이트)
* 이메일: 예약 요청 접수(선택), 승인 확정 메일, 거절 안내 메일(환불 안내 포함), 리마인드 메일
* 정산 데이터: 완료/노쇼 예약금 중 플랫폼 수수료/샵 정산 금액 산정에 필요한 필드 저장

### Out of Scope (MVP)

* 다른 뷰티 카테고리(헤어/피부 등)
* 정산 리포트 자동화/대시보드, 자동 송금
* 멀티 언어(영/한 외), 다중 통화
* 가격/예약금 정책 A/B, 동적 수수료
* 자동 캘린더 연동(구글 캘린더 등)
* CS 챗봇/티켓 시스템

---

## 4. 사용자/권한

### 4.1 고객(Customer)

* 비회원 예약(이름+이메일)
* 선택: Google OAuth로 이메일 자동 입력

### 4.2 샵 업주(Owner)

* 관리자 페이지 로그인: 카카오 또는 구글 OAuth
* 자신의 샵/시술/예약만 조회·수정 가능

### 4.3 운영자(Ops, 내부)

* MVP 단계에서는 별도 UI 제공 없이도 되지만, 최소한의 운영 기능(정산/환불 확인/샵 검수)을 위해 **간단한 내부 페이지 또는 DB 콘솔 기반 운영 프로세스**를 정의한다.

---

## 5. 서비스 플로우 및 화면 정의

> 화면 ID는 기획 문서의 UI-1~UI-7 체계를 따른다.

### 5.1 고객(EN) 플로우

1. **A-1 접속** → UI-1 고객 메인/네일샵 리스트

* 진입: SNS/검색/링크
* 회원가입 없이 접근
* 기본 언어: 영어
* 지역별 리스트 노출

2. **A-2 탐색** → UI-1 동일

* 스크롤/필터
* 카드: 대표 이미지, 시작가, Foreigner-friendly 배지

3. **A-3 샵 상세 확인** → UI-2 샵 상세 + 시술 리스트

* 샵 정보 + 시술 리스트
* 시술 카드: 총 금액, 예약금(20,000 KRW 고정), 현장 결제 금액, 소요 시간

4. **A-4 시술 선택** → UI-2 동일

* 시술 선택 시 다음 단계 이동

5. **A-5 날짜/시간 선택 & 예약 요청** → UI-3

* 캘린더/타임슬롯 선택
* CTA: “Request booking”
* 문구: “Booking is confirmed after salon approval”

6. **A-6 고객 정보 입력/로그인 선택** → UI-4

* 비회원: 이름 + 이메일
* 선택: Google 로그인(이메일 자동)
* 이메일 용도: 리마인드/결과 메일

7. **A-7 예약금 결제** → UI-5

* 표시: Deposit 20,000 KRW / Platform fee included / Remaining balance paid at salon
* 해외 카드(Visa/Mastercard) 결제

8. **A-8 승인 대기** → UI-6

* 상태: “Waiting for confirmation”
* 예약 요약 정보

9. **A-9 확정/거절 결과** → UI-7

* 승인: 확정 화면 + 확정 메일
* 거절: 거절 화면 + 환불 안내

10. **A-10 리마인드 & 방문** → UI-7(확정 화면)

* 리마인드 메일 자동 발송
* 방문 후 잔액 현장 결제

### 5.2 오너(KR) 플로우

1. **B-1 로그인** → (Owner) UI-1 온보딩/로그인

* 카카오/구글 간편 로그인

2. **B-2 샵 기본 정보 등록(최초 1회)** → UI-2

* 상호명, 주소, 연락처, 영업시간 등

3. **B-3 시술 등록** → UI-3

* 시술명(한글), 가격, 예약금(20,000 고정), 소요 시간, 이미지
* 영문 입력 불필요

4. **B-4 예약 요청 확인** → UI-4

* 고객 결제 완료 시 예약 요청 생성

5. **B-5 예약 승인/거절** → UI-5

* 승인: 고객 확정 메일 자동 발송
* 거절: 예약금 전액 환불 처리(또는 운영자 승인 워크플로우)

6. **B-6 시술 진행** → UI-6

* 확정 리스트 기반으로 방문 고객 대응

7. **B-7 예약 완료/노쇼 & 정산** → UI-7

* 완료 또는 노쇼로 상태 처리
* 예약금 20,000 중 플랫폼 5,000 / 샵 15,000
* 정산 주기: 월 2회(1~15→20일, 16~말→익월 5일)

---

## 6. 정보구조(IA) & 라우팅 제안

### 6.1 고객(EN)

* `/` : UI-1 Salon list
* `/salons/:salonId` : UI-2 Salon detail + services
* `/salons/:salonId/book?serviceId=` : UI-3 Date/time select
* `/checkout` : UI-4 Customer info
* `/payment` : UI-5 Deposit payment
* `/booking/:bookingId/pending` : UI-6 Waiting
* `/booking/:bookingId/result` : UI-7 Confirmed/Rejected

### 6.2 오너(KR)

* `/owner/login` : UI-1
* `/owner/onboarding` : UI-2 (샵 정보)
* `/owner/services` : UI-3 (시술 등록/관리)
* `/owner/bookings/requests` : UI-4
* `/owner/bookings/:bookingId` : UI-5
* `/owner/bookings/confirmed` : UI-6
* `/owner/settlement` : UI-7(요약) — MVP에서는 최소 화면 또는 안내만 제공 가능

### 6.3 운영자(Ops, 내부)

* `/ops` (선택): 예약/결제/환불/정산 상태 조회, CSV 내보내기

---

## 7. 예약(Booking) 상태 모델

### 7.1 상태 정의

* `DRAFT` : 고객이 날짜/시간 선택 전
* `REQUESTED` : 고객이 예약 요청 제출(결제 전 또는 결제 직후)
* `DEPOSIT_PAID` : 예약금 결제 성공
* `WAITING_CONFIRMATION` : 샵 승인 대기(=DEPOSIT_PAID 이후 기본)
* `CONFIRMED` : 샵 승인 완료
* `REJECTED` : 샵 거절
* `REFUND_PENDING` : 환불 요청됨
* `REFUNDED` : 환불 완료
* `COMPLETED` : 시술 완료
* `NO_SHOW` : 노쇼 처리
* `CANCELLED_BY_CUSTOMER` (옵션, MVP 제외 가능)

### 7.2 승인 SLA (정책 제안)

* 승인/거절 응답 권장 시간(예: 12~24시간) 표기
* SLA 초과 시 운영자 개입(수동) — MVP에서는 운영 프로세스 문서로 처리

---

## 8. 기능 요구사항

### 8.1 고객(EN) 기능

#### (1) 샵 리스트(UI-1)

* [필수] 지역 필터(예: 구/동, 또는 “Seoul / …”)
* [필수] 정렬(추천/가격 낮은순)
* [필수] 카드 구성: 대표 이미지, 시작가, Foreigner-friendly 배지
* [필수] 무한 스크롤/페이지네이션

#### (2) 샵 상세 + 시술(UI-2)

* [필수] 샵 기본 정보(이름, 위치, 운영시간, 연락처 노출 정책)
* [필수] 시술 리스트(가격/예약금/현장결제/소요시간)
* [필수] 시술 선택 → 예약 단계로 이동

#### (3) 날짜/시간 선택(UI-3)

* [필수] 캘린더 + 타임슬롯 선택
* [필수] 선택 불가 슬롯(이미 예약됨/휴무/영업시간 외)
* [필수] “샵 승인 후 확정” 문구 고정 노출

#### (4) 고객 정보(UI-4)

* [필수] 비회원 입력: name, email
* [선택] Google OAuth: email 자동 입력
* [필수] 개인정보 동의 체크박스(이메일 안내 목적)

#### (5) 결제(UI-5)

* [필수] 예약금 20,000원 고정 표시
* [필수] 해외 카드 결제(Visa/Master)
* [필수] 결제 실패/취소 재시도
* [필수] 결제 완료 시 Booking 생성/업데이트 및 상태 전환

#### (6) 상태 화면(UI-6, UI-7)

* [필수] Pending: 예약 요약 + 상태
* [필수] Confirmed: 확정 정보(일시/샵/시술/주소/주의사항)
* [필수] Rejected: 거절 안내 + 환불 안내(예: 전액 환불, 처리 시간)

#### (7) 이메일

* [필수] Confirmed email
* [필수] Rejected + refund 안내
* [필수] Reminder email(예약 24시간 전 등)

### 8.2 오너(KR) 기능

#### (1) 로그인(UI-1)

* [필수] 카카오/구글 OAuth
* [필수] 최초 로그인 시 샵 생성/연결

#### (2) 샵 정보(UI-2)

* [필수] 상호명, 주소, 연락처, 영업시간
* [필수] 대표 이미지/갤러리(최소 1장)
* [필수] 외국인 친화 여부 토글(배지 노출)

#### (3) 시술 등록(UI-3)

* [필수] 시술명(한글), 가격, 소요시간(분)
* [필수] 예약금 20,000 고정 노출(변경 불가)
* [필수] 이미지 업로드
* [필수] 시술 활성/비활성

#### (4) 예약 요청(UI-4)

* [필수] 요청 리스트(일시, 시술, 고객명/이메일, 결제여부)
* [필수] 필터(대기/확정/완료)

#### (5) 승인/거절(UI-5)

* [필수] 승인 버튼 → 상태 `CONFIRMED` 전환 + 고객 메일 발송
* [필수] 거절 버튼 → 상태 `REJECTED` 전환 + 환불 프로세스 트리거
* [필수] 동시성 처리(이미 처리된 요청 재처리 방지)

#### (6) 확정 리스트(UI-6)

* [필수] 날짜 기준 정렬
* [필수] 예약 상세 확인

#### (7) 완료/노쇼(UI-7)

* [필수] 예약을 `COMPLETED` 또는 `NO_SHOW`로 처리
* [필수] 정산 대상 데이터 축적(완료/노쇼 기준)

### 8.3 운영(Ops) 요구사항 (MVP 최소)

* [필수] 예약금 환불 상태 확인(요청/완료)
* [필수] 정산 기준 데이터 추출(기간, 샵별 완료/노쇼, 정산액)
* [필수] 샵 검수/비활성(문제 샵 노출 중단)

---

## 9. 결제/환불 정책 및 기술 요구

### 9.1 결제 정책

* 예약금: 20,000 KRW 고정
* 결제 수단: 해외 카드(Visa/Master)
* 결제 주체: 플랫폼(고객이 플랫폼에 예약금 결제)

### 9.2 환불 정책 (거절 시)

* 샵 거절 시 **예약금 전액 환불**
* 환불 처리 SLA 안내(예: PG 정책에 따라 3~7영업일)

### 9.3 결제 시스템 요구사항

* 결제 생성/확정/웹훅 처리(결제 성공 여부를 서버에서 검증)
* 환불 API 연동 또는 운영자 수동 환불 프로세스 정의
* 결제/환불 로그(거래 ID, 상태, 금액, 통화, 실패 사유)

> **결제 PG 선택은 MVP 의사결정 항목**: 국제 카드 결제 가능 여부, 환불 API 지원, 수수료, 정산 주기 등을 비교해 결정한다.

---

## 10. 데이터 모델(초안)

### 10.1 핵심 엔티티

* `User` (선택): 고객은 익명/게스트 가능, 오너는 OAuth 기반
* `Salon`

  * id, ownerId, name, address, phone, businessHours(json), isForeignerFriendly, images[], status(active/inactive)
* `Service`

  * id, salonId, nameKo, priceTotal, depositAmount(=20000), durationMin, image, isActive
* `Booking`

  * id, salonId, serviceId, customerName, customerEmail, date, timeSlot, status
  * totalPrice, depositAmount, remainingAmount
  * paymentId, paymentStatus, refundStatus
  * createdAt, confirmedAt, completedAt
* `Payment`

  * id, provider, providerTxnId, amount, currency, status, failureReason, webhookPayload
* `SettlementLine`(옵션)

  * bookingId, salonId, period, platformFee(=5000), salonPayout(=15000), status

### 10.2 정산 규칙

* 완료/노쇼 예약 기준
* 예약금 20,000 중

  * 플랫폼 수수료 5,000
  * 샵 정산 15,000

---

## 11. API 요구사항(예시)

### 고객

* `GET /api/salons?region=&filter=`
* `GET /api/salons/:id`
* `GET /api/salons/:id/services`
* `POST /api/bookings` (salonId, serviceId, datetime, customerName/email)
* `POST /api/payments/create` (bookingId)
* `POST /api/payments/webhook` (PG webhook)
* `GET /api/bookings/:id`

### 오너

* `POST /api/owner/login` (OAuth callback)
* `PUT /api/owner/salons/:id` (샵 정보)
* `POST /api/owner/services`
* `PUT /api/owner/services/:id`
* `GET /api/owner/bookings?status=`
* `POST /api/owner/bookings/:id/confirm`
* `POST /api/owner/bookings/:id/reject`
* `POST /api/owner/bookings/:id/complete` / `.../no-show`

### 운영

* `GET /api/ops/settlement?from=&to=` (CSV export)
* `GET /api/ops/refunds?status=`

---

## 12. UI/콘텐츠 요구사항

### 12.1 언어/톤

* 고객: 영어(간결, 명확)
* 오너: 한국어(운영 중심)

### 12.2 필수 고지 문구(예시)

* UI-3: “Booking is confirmed after salon approval.”
* UI-5: “Reservation Deposit: 20,000 KRW (Platform fee included). Remaining balance paid at salon.”

### 12.3 반응형

* Mobile-first 필수
* Desktop에서는 카드 그리드 확장

---

## 13. 비기능 요구사항

* 성능: LCP/CLS 최적화, 이미지 최적화(WebP/AVIF)
* 안정성: 결제 웹훅 중복 수신/재시도 대비(idempotency)
* 보안: OAuth 보안, CSRF/Rate limiting, 개인정보 최소 수집
* 준법: 개인정보처리방침/이용약관, 해외 사용자 고려(GDPR 고지 문구 검토)
* 로깅/모니터링: 결제/환불/승인 이벤트 필수 로깅

---

## 14. 엣지 케이스 & 처리

* 결제 성공했으나 웹훅 지연 → 상태는 서버 기준으로 확정
* 오너가 승인/거절을 동시에 클릭(중복 요청) → 최초 1회만 반영
* 동일 타임슬롯 중복 예약 → 확정 시점 또는 요청 시점에 락 정책 결정
* 샵이 응답하지 않음 → 운영자 수동 거절/환불 정책(추후)
* 환불 실패/지연 → 운영자 알림/재시도 프로세스

---

## 15. 운영 정책(초안)

* 샵 온보딩 체크리스트: 기본 정보/이미지/시술 3개 이상 등록 권장
* 승인 응답 가이드: 가능한 12시간 내 처리 권장
* 노쇼 기준: 방문 시간 기준 X분 경과 시(정책은 MVP에서 간단히 문서화)
* 정산: 월 2회, 운영자 수동 계산/송금

---

## 16. 개발 체크리스트(권장)

* 결제 PG 선정 및 테스트 카드 결제/환불 시나리오 검증
* 이메일 발송 인프라(템플릿/트리거/발송 로그)
* 예약 상태 전환 테스트(상태 머신)
* 권한(Owner가 타 샵 데이터 접근 불가)
* 이미지 업로드(스토리지, 리사이즈)

---

## 17. 마일스톤(예시)

1. IA/디자인 확정 (UI-1~UI-7)
2. 데이터 모델 + API 스캐폴딩
3. 고객 플로우(리스트→결제→대기) 완성
4. 오너 플로우(온보딩→시술→승인/거절) 완성
5. 결제/웹훅/환불 연결
6. 이메일/리마인드 스케줄
7. 운영(정산 데이터 추출) 최소 구현
8. QA/런칭

---

## 18. 오픈 이슈(결정 필요)

* 결제 PG: 국제 카드 지원, 환불 API, 정산/수수료 구조
* 예약 타임슬롯 생성 방식: 샵 영업시간 기반 자동 생성 vs 수동 등록
* 승인 대기 시간 정책/자동 거절 여부
* 고객 취소 기능(MVP 제외 가능) 포함 여부
* 샵 주소 표기(지도 링크 제공 여부)
