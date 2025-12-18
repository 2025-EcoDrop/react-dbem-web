글꼴 출처 링크: https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13372623&menuNo=200023

---

# 💊 DBEM - 프론트엔드

React 기반 SPA로 구현된 폐의약품 수거 대행 서비스의 프론트엔드입니다.  

---

## 📌 기술 스택

- React (create-react-app 기반)
- React Router (페이지 네비게이션)
- CSS 모듈
- Kakao Maps JavaScript API (지도 렌더링 및 위치 표시)
- Kakao Maps Geocoding API (위도, 경도를 주소 변환)

---

## 📋 주요 기능

### 1. 사용자 인증 및 세션 관리
- JWT Access Token / Refresh Token 기반 인증
- 로그인, 로그아웃, 회원가입 UI 및 API 연동
- 인증 상태에 따른 페이지 접근 제어

### 2. 약 리뷰 페이지
- 리뷰 목록 조회
- 리뷰 상세 페이지 제공
- 리뷰 작성, 수정, 삭제 기능

### 3. 수거 예약 페이지
- 수거 예약 생성, 수정, 삭제 기능
- 사용자 현재 위치 조회 가능 시, 자동으로 위치 정보 불러오기
- 위치 정보를 불러올 수 없을 시, 사용자가 직접 주소를 입력하도록 지원
- 지도와 입력 폼을 연동하여 위치 정보 표시

### 4. 예약 현황 통합 조회 페이지
- 예약 상태별 정보 확인
  1. 본인이 작성한 수거 예약 & 신청중 상태
  2. 본인이 작성한 수거 예약 & 수락됨 상태
  3. 본인이 작성한 수거 예약 & 완료됨 상태
  4. 본인이 수락한 수거 예약 & 수락함 상태
  5. 본인이 수락한 수거 예약 & 완료함 상태

### 5. 포인트 페이지
- 사용자 기본 정보 조회
- 포인트 정보 조회

---

## 📁 주요 프로젝트 구조
```bash
src/
│ 
├── apis/ # 백엔드 API 요청 로직
│ 
├── components/ # 재사용 컴포넌트
│ 
├── pages/ # 라우팅 페이지
│ 
├── styles/ # CSS 모듈
│ 
└── App.js # 라우터 및 전역 상태 관리
```

---

## 🧪 설치 및 실행

```bash
npm install
npm start
```

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
