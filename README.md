# subscribeRepoIssues

## 프로젝트 소개
> 원하는 GitHub Repository의 issue를 볼 수 있는 웹페이지

> 기간: 2021.04.13 ~ 2021.04.17

## 프로젝트 구성 안내
> CRA 활용 초기세팅

> 기술스택
 - React
 - Styled-components, ant design
 - octokit/core
 
> 폴더 구조
```
└── src
    ├── common
    │   ├── constant.js
    │   ├── hook
    │   │   └── useFetchIssue.js
    │   └── util
    │       └── fetch.js
    │
    ├── pages
    │   ├── detail
    │   │   ├── component
    │   │   └── container
    │   │       └── Detail.js
    │   └── home
    │       ├── component
    │       │   ├── AddRepoModal.js
    │       │   └── RepoCard.js
    │       └── container
    │           └── Home.js
    ├── styles
    │    └── GlobalStyle.js
    ├── Routes.js
    ├── index.js
```
## 프로젝트 설치
1. 해당 프로젝트를 클론
2. 터미널에서 클론 받은 폴더가 있는 곳으로 이동
3. npm i (패키지 설치)
4. npm start

## 프로젝트 실행
> 홈
<img width="781" alt="스크린샷 2021-04-17 오전 4 53 31" src="https://user-images.githubusercontent.com/66003183/115079281-e9d6fe00-9f3b-11eb-9a11-4648d6e06c6c.png">
<img width="747" alt="스크린샷 2021-04-17 오전 4 53 44" src="https://user-images.githubusercontent.com/66003183/115079738-97e2a800-9f3c-11eb-9664-077f4531e307.png">

1. Add Repo를 클릭, Repository의 Owner Name과 Repo Name을 입력

2. OK를 누르면 내가 등록한 Repository 이름과 총 이슈의 갯수를 보여줍니다.

3. View Detail로 이슈 리스트가 있는 상세 페이지로 이동합니다.

4. 휴지통 모양을 눌러 해당 Repository를 삭제할 수 있습니다.

> 디테일
<img width="759" alt="스크린샷 2021-04-17 오전 4 53 56" src="https://user-images.githubusercontent.com/66003183/115079811-b6e13a00-9f3c-11eb-9a0c-72c098fda1ba.png">

1. Go Home 버튼을 누르면 Repository 목록이 있는 홈으로 이동합니다.

2. 각 이슈의 번호와 제목을 보여주며, 이슈 번호를 클릭하면 실제 GitHub 이슈 페이지로 이동합니다.

3. 페이지네이션 및 페이지당 목록 갯수를 선택할 수 있습니다.

