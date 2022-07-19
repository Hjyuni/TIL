# HTML / CSS

> * HTML 한번에 끝내기(이수안 컴퓨터) 
>   * 유튜브 강의: https://www.youtube.com/watch?v=VozMYcCYvtg
>   * 노션: https://suanlab.notion.site/HTML-256b041d35654311849f1c348e19219d
> * CSS 한번에 끝내기(이수안 컴퓨터) 
>   * 유튜브 강의: 
>   * 노션: 
>
> 

## 1) HTML

* 웹페이지의 뼈대를 구성하는 언어

### 1-0. intro

* vsc에서 html파일 생성 후 `html:5`치면 기본 틀 자동완성 됨
* `<html>`등과 같은 것을 태그라고 함
* `<html></html>`과 같이 보통 페어로 이뤄져 있지만 시작 태그만 있는 경우도 있음
* 뼈대태그
  * `<html>`: HTML의 시작과 끝을 표시
    * `<head>`: 웹페이지 문서에 대한 정보로 메타데이터 정의
      * 메타데이터란?: 데이터를 설명해주는 데이터
      * 이 웹페이지가 무슨 문서인지에 대한 설명
    * `<body>`: 웹페이지에 뭘 띄울지 실질적인 내용이 들어감 

---

### 1-1. 기본태그

* `<h1>~<h6>`: 제목을 표시할 때 사용하는 태그, 사용 숫자가 작아질수록 글자가 작아짐
* `<p>` : 단락 태그, paragraph의 줄임말
* `<br>` : 강제 줄바꿈 태그, 끝 태그 없음
* `<pre>` : 텍스트 서식을 그대로 출력함, 공통된 서식을 지정할 때에는 되도록 방해가 되므로 지양할 것
* `<hr>` : 수평선 태그
* 텍스트 서식
  * `<b>` : 굵게
  * `<i>` : 이탤릭체
  * `<small>` : 글씨 작게
  * `<ins>` : 밑줄
  * `<del>` : 가운데 선
  * `<mark>` : 하이라이트
  * `<strong>` : 중요
  * `<code>` : 코드
  * `<em>` : 강조
  * `<sup>` : 위첨자
  * `<sub>` : 아래첨자
* `<q>` : 짧은 인라인으로 사용, 인용구(quotation) 약자
* `<blockquote>` : 길이가 긴 인용구는 블록 인용구 태그를 사용하여 별도 단락으로 표현 가능
* `<abbr>` : 약어(abbreviation) 정의
* `<cite>` : citation, 인용되는 작품의 제목
* `<address>` : 문서 작성자/소유자 연락처 정의
* `<a>` : 다른 사이트로 통하는 링크나 같은 페이지의 다른 위치로 이동하는 링크를 만들 때 사용
  * `href` : 속성에 값을 설정하요 이동할 곳 지정
  * `target` : 속성을 통해 새로운 페이지가 열릴 곳을 지정
    * `_blank` : 새로운 창
    * `_self` : 현재 창
    * `_parent` : 웹 브라우저 부모 창
    * `_top` : 웹 브라우저 전체 영역

---

### 1-2. 리스트 태그

* `<ul>` : 순서가 없는 리스트
* `<ol>` : 순서가 있는 리스트
  * `<li>` : 태그를 사용하여 각 항목을 입력
* `<dl>` : definition list, 정의 리스트
  * `<dt>` : definition term, 정의어
  * `<dd>` : definition descript, 정의어에 대한 설명 

---

### 1-3. 테이블 태그

* `<table>` : 테이블 생성
* `<tr>` : 테이블의 행
* `<th>` : 테이블의 헤드
* `<td>` : 테이블의 열
* `<caption>` : 테이블의 캡션
* `<rowspan>` : 셀을 세로로 병합, 병합하고 싶은 행의 수를 설정
* `<colspan>` : 셀을 가로로 병합, 병합하고 싶은 열의 수를 설정

---

### 1-4. 멀티미디어 태그

#### 1-4-1. 이미지 태그

* `<img>`
  * 속성
    - `src` : 이미지 파일 경로
    - `title` : 이미지 제목
    - `width` : 이미지 가로 크기
    - `height` : 이미지 세로 크기
    - `alt` : 이미지 대체 텍스트
    - `style` : 이미지 스타일 정의
    - `border` : 이미지 테두리 두께

#### 1-4-2. 오디오 태그

* `<audio>`
  * 속성
    - `src` : 오디오 파일의 경로
    - `controls` : 오디오 파일의 재생 제어기 표시
    - `autoplay` : 자동 재생
    - `loop` : 반복 재생
    - `muted` : 초기에 음소거 상태
    - `preload` : 오디오 파일 미리 다운로드

#### 1-4-3. 비디오 태그

* `<video>`
  - 속성
    - `src` : 비디오 파일의 경로
    - `controls` : 비디오 파일의 재생 제어기 표시
    - `autoplay` : 자동 재생
    - `width` : 비디오의 가로크기
    - `height` : 비디오의 세로크기
    - `loop` : 반복 재생
    - `muted` : 초기에 음소거 상태
    - `preload` : 비디오 파일 미리 다운로드
    - `poster` : 비디오의 썸네일

---

### 1-5. 공간분할 태그

* `<div>` : 웹 문서의 **전체 공간**을 block형식으로 분할, 레이아웃 구성, 컨텐츠 분할할 때 사용

> div태그 참고사이트: https://coding-factory.tistory.com/188

* `<span>` : 웹문서의 **한 줄**에 대해서 inline 형식으로 분할
* `<iframe>` : 태그를 이용해 웹 문서 내에 다른 웹 문서 표시할 때 사용, 사용 지양
  - `src`: 포함할 페이지의 URL 정의
  - `width`: 너비
  - `height`: 높이
  - `title`: 아이프레임 제목
  - `name`: 링크 대상 이름
  - `scrolling`: 스크롤바

---

### 1-6. 폼태그

* `<form>` : 웹에서 폼을 만드는데 사용되는 태그, 웹 상에는 아무것도 뜨지 않고 내가 폼 태그를 이제부터 쓸거라는 의미

  > 참고사이트 : https://mainia.tistory.com/4246

  * `name` : form 이름
  * `action` : 입력 데이터를 처리하는 웹 프로그램(JSP, PHP 등), 폼 내부에 데이터를 보내는 목적지 URL을 지정
  * `method` : 전송 방식(GET/POST)
    * GET방식 : URL 뒷부분에 파라미터를 추가하여 데이터 전달, URL에 어떤 데이터가 전송되는지 표현되어 있어 보안에 취약, 글자 제약 있음
    * POST방식 : HTTP Request 헤더에 파라미터를 추가하여 데이터 전송, 글자수 제약 없음
  * `type` : 입력 양식 모양



* 폼관련 태그

1. `<input>` : 입력 제어
2. `<select>` : 드롭다운 리스트
3. `<textarea>` : 긴 텍스트 문자열
4. `<button>` : 버튼
5. `<fieldset>` : 폼을 감싸주는
6. `<datalist>` : 입력 제어에 대해 미리 정의된 옵션 리스트
7. `<output>` : 계산 결과

---

### 1-7. input 태그

- 주요 공통 속성
  - `readonly` : 읽기 전용
  - `disabled` : 비활성화
  - `autocomplete` : 자동 완성
  - `autofocus` : 웹 페이지 로드시 초기에 포커싱 설정
  - `placeholder` : 입력 폼에 희미하게 설명을 보여줌
  - `required` : 필수 속성
  - `spellcheck` : 오타 점검
- type
  * text
  * password
  * button
  * radio : 하나만 선택해야 할 때
  * checkbox : 여러개 선택
  * date
  * month
  * week
  * time
  * datetime-local
  * color
  * number
  * range
  * email
  * url
  * tel
  * file
  * submit
  * reset

---

### 1-8. semantic

> 참고사이트 : https://velog.io/@syoung125/%EC%8B%9C%EB%A7%A8%ED%8B%B1-%ED%83%9C%EA%B7%B8-Semantic-Tag-%EC%9E%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

* 의미가 있는 태그
  * `<header>` : 페이지의 제목과 같은 소개내용 포함
  * `<nav>` : 메뉴, 목차 등
  * `<aside>` : 간접적으로 문서와 관련된 내용 나타냄
  * `<main>` : 지배적인 콘텐츠 영역
  * `<footer>` : 섹션의 작성자에 대한 정보, 저작권 데이터 또는 관련 문서에 대한 링크 포함

