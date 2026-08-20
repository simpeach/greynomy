# portfolio

콘텐츠PD 심재욱의 영상 포트폴리오 웹사이트입니다.

**https://simpeach.github.io/portfolio/**

## 개요

메인 페이지 한 장과 프로젝트 상세 페이지 17장, 모두 정적 HTML입니다. 메인의
작업 카드를 누르면 해당 프로젝트 페이지로 이동합니다.

디자인은 Google Stitch로 만든 초안을 그대로 살렸습니다. Tailwind와 웹폰트는
CDN에서 불러오고, 그 밖의 빌드 도구나 패키지 의존성은 없습니다. 파일을 고치고
새로고침하면 바로 반영됩니다.

## 저장소 구조

```
.
├── index.html        메인 — 히어로 · 작업 목록 · ABOUT ME · 연락처
├── projects/         프로젝트 상세 페이지 17장
│   ├── commercial-film.html      CF 3편 (센스데이 · 디펜드 · 더마틱스)
│   ├── finetoday.html            파인투데이코리아
│   ├── glasslock.html            글라스락
│   ├── hello-zeronate.html       헬로 제로네이트
│   ├── hl.html                   HL
│   ├── hyundai-culture.html      현대백화점 문화센터
│   ├── jinro.html                하이트진로 '진로'
│   ├── lotteria.html             롯데리아 '스낵의 아리아'
│   ├── lotts-snacktown-live.html 롯데리아 '랏츠 스낵타운' 라이브
│   ├── maxim.html                맥심 커피믹스
│   ├── mirae-n.html              미래엔 '문해길'
│   ├── posco.html                포스코
│   ├── shilla.html               신라호텔
│   ├── snap-photography.html     스냅사진 촬영
│   ├── sony.html                 소니 알파 유니버스
│   ├── tu-brand-film.html        TU치과 브랜드 필름
│   └── tu-influencer.html        TU치과 인플루언서 협업
└── images/           156장 — 파일명이 곧 사용처 (jinro-01.png → jinro.html)
```

파일명은 전부 영문입니다. 한글 파일명은 주소창에서 `%ED%97%AC...` 형태로
바뀌어 읽기 어려워집니다.

## 로컬에서 보기

```bash
git clone https://github.com/simpeach/portfolio.git
```

`index.html`을 더블클릭해도 열리지만, 서버를 띄우는 편이 확실합니다.

```bash
python3 -m http.server 8000
```

`http://localhost:8000`으로 접속합니다. Tailwind와 폰트를 CDN에서 받아오므로
인터넷 연결이 필요합니다.

## 내용 수정하기

| 바꾸고 싶은 것 | 고칠 곳 |
|---|---|
| 소개 문구, 연락처, 경력 | `index.html`의 `#about-me` 섹션 |
| 작업 카드 제목 · 역할 | `index.html`의 해당 카드 |
| 프로젝트 상세 내용 | `projects/` 안의 해당 파일 |
| 사진 교체 | `images/`에 같은 이름으로 덮어쓰기 |

카드를 새로 추가할 때는 `projects/`에 페이지를 만들고, `index.html`의 카드를
`<a href="projects/새페이지.html">`로 감싸면 됩니다.

## 이미지에 대하여

이미지는 전부 저장소 안에 있습니다(19MB). 원래 Stitch가 만든 임시 주소를
가리키고 있었는데, 그 주소는 Stitch 프로젝트가 정리되면 사라져서 사이트의
사진이 한꺼번에 비어버립니다.

영상은 반대로 저장소에 넣지 않습니다. git은 용량이 큰 이진 파일에 약해서 한 번
커밋하면 나중에 지워도 기록에 남고, GitHub는 파일 하나가 100MB를 넘으면 푸시를
거부합니다. YouTube나 인스타그램에 올린 뒤 링크로 연결해주세요. `.gitignore`에
영상 확장자를 미리 넣어두었습니다.

## 모바일 대응 규칙

Stitch 초안은 넓은 화면 기준으로 줄바꿈이 박혀 있어서, 좁은 화면에서는 문장
중간이 끊깁니다. 다음 세 가지로 처리해 두었으니 내용을 고치실 때 같은 방식을
쓰시면 됩니다. 모두 `md:`(768px) 기준이라 데스크톱 화면에는 영향이 없습니다.

| 상황 | 쓰는 것 |
|---|---|
| 넓은 화면에서만 줄을 바꾸고 싶을 때 | `<br class="hidden md:inline">` |
| 한 줄씩 나뉜 `<div>`를 좁은 화면에서 이어붙일 때 | `class="inline md:block"` |
| 한글이 단어 중간에서 잘릴 때 | 각 페이지 `<head>`의 `word-break: keep-all` 규칙이 처리 |

제목이나 수치의 괄호 설명(`조회수 약 6.8만` / `(32개 평균)`)처럼 합치면 뜻이
흐려지는 줄바꿈은 모든 화면에서 유지합니다.

## 배포

`main`에 반영되면 GitHub Pages가 1~2분 안에 자동으로 배포합니다. 별도 작업은
없습니다.

주소의 `portfolio`는 저장소 이름에서 옵니다. 저장소 이름을 바꾸면 사이트 주소도
함께 바뀌고, 옛 주소는 연결되지 않습니다.

## 기여하기

1. 작업할 브랜치를 새로 만듭니다 (`git checkout -b my-change`)
2. 변경 사항을 커밋합니다
3. 브랜치를 푸시하고 Pull Request를 엽니다

`main`에 직접 커밋하지 않고 브랜치와 PR을 거치면, 변경 이력이 남고 되돌리기도
쉬워집니다.

## 라이선스

아직 라이선스가 지정되지 않았습니다. 라이선스가 없는 저장소는 기본적으로 모든
권리가 저작자에게 유보되므로, 공개적으로 활용될 여지를 두려면 `LICENSE` 파일을
추가해주세요.

사진과 영상 등 작업물의 저작권은 코드 라이선스와 별개입니다. 코드에만 라이선스를
적용하고 작업물은 제외하려면 그 사실을 명시해주세요.
