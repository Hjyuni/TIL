# HTML / CSS / JS

## 1) HTML

> HTML 한번에 끝내기(이수안 컴퓨터) 
>
> * 유튜브 강의: https://www.youtube.com/watch?v=VozMYcCYvtg
> * 노션: https://suanlab.notion.site/HTML-256b041d35654311849f1c348e19219d

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



---



## 2) CSS

> CSS 한번에 끝내기(이수안 컴퓨터) 
>
> * 유튜브 강의: https://www.youtube.com/watch?v=J3ef9c-sZ14
> * 노션: https://suanlab.notion.site/CSS-c4af7d87a8da44b6970e2d826e15d032

* 웹페이지의 디자인을 구성하는 언어

### 2-0. intro

* css 우선 적용 순서

  > 참고사이트1: https://heinafantasy.com/170
  >
  > 참고사이트2: https://abcdqbbq.tistory.com/14

  

* css 구성요소

  * 선택자(selector) : 스타일을 적용할 대상 지정
  * 속성명(property) : 속성의 이름
  * 속성값(value) : 속성에 적용할 값
  * 선택자 {속성명:속성값;} 과 같이 사용하여 스타일 적용

  ```css
  p {
    color: purple;
    text-align: center;
  }
  ```


* css 적용 방법

  * 인라인 스타일 : HTML 요소의 여는 태그에 style 속성으로 지정

  ```css
  <b style="color: pink">1. 인라인 스타일</b>
  ```

  * 내부 스타일 : 같은 HTML 문서 내부에 `<style>`태그를 사용하여 지정

  ```css
  <style>
  p{
    background-color: coral;
  }
  </style>
  ```

  * 외부 스타일⭐: HTML 문서와는 별개의 파일르 style지정, **현업에서 가장 많이 선호하는 방법**

  ```css
  # style.css
  p {
    color: red;
  }
  # index.html
  <!DOCTYPE html>
  <html>
    <head>
      <title>외부 스타일<title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <p>외부 스타일</p>
    </body>
  </html>
  ```

---

### 2-1. Selector

#### 2-1-1.기본 선택자

  1. 전체 선택자

  * 모든 태그를 선택

  * `*{내용;}`

  

  2. 태그 선택자

  * 지정한 태그 선택
  * `태그명{내용;}`

  

  3. id 선택자

  * 특정 id태그 선택(중복없이)
  * `#id{내용;}`

  

  4. class 선택자

  * 특정 class태그 선택
  * `.class{내용;}`

  

  5. 속성 선택자

  * 특정 속성 또는 속성값 태그 선택
  * `선택자{속성=값;}`

---

#### 2-1-2. 반응 선택자

1. `태그:link` : 반응하지 않은 링크, 방문하지 않은 링크

2. `태그:visited` : 방문했던 링크

3. `태그:hover` : 마우스를 올려놓는 순간

4. `태그:active` : 마우스를 클릭하는 순간

* LVHA : 링크속성 지정순서
  * link - visited - hover - active
  * 참고사이트 : https://codedragon.tistory.com/5405

---

#### 2-1-3. 구조 선택자

> `nth-child(n)` vs `nth-of-type(n)`
>
> * 참고사이트 : https://firerope.tistory.com/5

1. `E:root` : 최상위 태그 선택
2. `E:nth-child(n)` : 순서와 일치하는 E태그 선택
3. `E:nth-last-child(n)` : 뒤에서부터 순서와 일치하는 E태그 선택
4. `E:nth-of-type(n)` : 순서가 일치하는 E태그 선택(순서에 E태그만 포함)
5. `E:nth-last-id-type(n)` : 뒤에서부터 순서와 일치하는 E태그 선택(순서에 E태그만 포함)
6. `E:first-child(n)` : 맨 첫번째 태그가 E태그인 경우 선택
7. `E:last-child(n)` : 맨 뒤에 태그가 E태그인 경우 선택
8. `E:first-of-type(n)` : E태그 중 첫번째 선택
9. `E:last-of-type(n)` : E태그 중 마지막 선택
10. `E:only-child` : 유일한 자식인 E태그 선택
11. `E:only-of-type` : 유일한 타입의 E태그 선택
12. `E:empty` : 텍스트와 공백을 포함하여 자식요소가 없는 E태그 선택

---

#### 2-1-4. 상태 선택자

1. `:enabled` : 사용 가능한 form 관련 태그 선택
2. `:disabled` : 사용 불가능한 form 관련 태그 선택
3. `:checked` : 현재 선택된 form관련 태그
4. `:focus` : 현재 초점이 맞춰진 form관련 태그

---

#### 2-1-5. 기타 선택자

1. `E:lang(ko)`: lang 속성 값이 ko 인 태그 선택
2. `E:not(S)`: S가 아닌 E 태그 선택
3. `E:target`: E의 url 요청 시 선택
4. `E::first-line`: E 태그의 첫번째 줄 선택
5. `E::first-letter`: E 태그의 첫번째 문자 선택
6. `E::before`: E 태그의 시작 지점 태그 선택
7. `E::after`: E 태그의 끝 지점 태그 선택

---

#### 2-1-6. 선택자 조합

1. `A  B`: 선택자 B가 포함된 선택자 A 선택
2. `A > B`: 선택자 A의 직계 자손인 선택자 B 선택
3. `A + B`: A 선택자 바로 다음의 B 선택자 선택
4. `A ~ B`: A 선택자 다음에 인접해있는 모든 선택자 B 선택
5. `A, B`: 선택자 A와 선택자 B 선택

---

### 2-2. CSS style

#### 2-2-1. 박스 스타일

* 웹 페이지의 전체 레이아웃
* 구성
  * content: 실제 내용
  * padding: content와 테두리 사이의 공간
  * border: 테두리 두께
  * margin: 테두리와 최종경계 사이 여백

* 방향

  > 참고 사이트: https://ofcourse.kr/css-course/margin-padding-%EC%86%8D%EC%84%B1

  * 기본적으로 `top - right - bottom - left`순임

  * `padding/margin: 0px` : 상하좌우 모두 0px
  * `padding/margin: 0px 10px`: 상하 0px, 좌우 10px
  * `padding/margin: 0px 10px 20px 30px` : 위 0px, 오른쪽 10px, 아래 20px, 왼쪽 30px
  * `padding/margin: 0px 10px 20px`: 위 0px, 좌우 10px, 아래 20px

---

#### 2-2-2. 테두리 스타일

* `solid`: 실선
* `dotted`: 점선
* `dashed`: 줄점선
* `double`: 두 줄
* 이 외: `ridge`, `groove`, `inset`, `outset`...

---

#### 2-2-3. 배경화면 스타일

* `background-repeat`: 배경화면 이미지 반복법
* `background-attachment`

> background-attachment 참고사이트: https://developer.mozilla.org/ko/docs/Web/CSS/background-attachment

---

#### 2-2-4. 폰트 스타일

1. `font-size`: 폰트 사이즈
2. `font-align`: 폰트 정렬
3. `font-family`: 사용할 폰트 이름
4. `font-weight`: 폰트 두께
5. `font-style`: 폰트 스타일

---

#### 2-2-5. 링크 스타일

* `text-decoration `

> 참고 사이트: https://blog.naver.com/pos195/222650902314

---

#### 2-2-6. 테이블 스타일

* `border-collapse` : 테이블 라인 표시 안하기

---

### 2-3. CSS 속성

#### 2-3-1. 가시 속성

> * `inline` vs `block` vs `inline-block`: https://ruden91.github.io/blog/inline-vs-block-vs-inline-block/
>
> * visibility, display : https://unabated.tistory.com/entry/displaynone-%EA%B3%BC-visibilityhidden-%EC%9D%98-%EC%B0%A8%EC%9D%B4

1. `display: inline` : **text 크기 만큼만 공간을 점유**하고 **줄바꿈을 하지 않음**
   * width/height 적용 불가
   * margin/padding-top/bottom 적용불가
   * line-height 원하는대로 사용 불가

2. `display: block` : 무조건 한 줄 점유, 다음 태그는 **줄바꿈 적용**
   * width/height 적용 가능
   * margin/padding-top/bottom 적용 가능
   * line-height 원하는대로 사용 가능

3. `display: inline-block` : inline + block 특징 둘 다 갖고 있는 속성, 기본적인 특징은 inline 속성과 비슷하지만 width/height 등 적용 가능
   * width/height 적용 가능
   * margin/padding-top/bottom 적용 가능
   * line-height 원하는대로 사용 가능

4. `display: none` : 아예 존재하지 않음, 보이지도 않고 해당 공간도 존재하지 않음
5. `visibility: hidden` : 보이지만 않고 해당 공간은 존재
6. `opacity: 숫자` : 공간의 투명도 조절

---

#### 2-3-2. 위치 속성

> * 위치속성 참고사이트 : https://www.daleseo.com/css-position/
> * absolute 참고사이트 : https://www.daleseo.com/css-position/
> * position 참고사이트: https://developer.mozilla.org/ko/docs/Web/CSS/position#%EC%8B%9C%EB%8F%84%ED%95%B4%EB%B3%B4%EA%B8%B0
> * z-index 참고사이트: https://www.codingfactory.net/10878

1. `position: static` : HTML 작성 순서 그대로 부라우저 화면에 표시가 됨
2. `position: relative` : 요소를 원래 위치에서 벗어날 수 있게 배치
3. `position: absolute` : position이 static이 아닌 첫 번째 상위 요소가 해당 요소의 배치 기준으로 설정 
4. `position: fixed` :  스크롤 하더라도 고정되어 사라지지 않음
5. `position: sticky`
6. `z-index: int` : 겹치는 영역 위치 조절

---

#### 2-3-3. overflow

1. `overflow: visible`: 콘텐츠를 자르지 않고 안쪽 여백 상자 밖에 그릴 수 있음
2. `hidden`: 콘텐츠를 안 쪽 여백상자에 맞추기 위해 잘라냄, 스크롤바 제공x
3. `overflow: clip`: hidden과 마찬가지로 콘텐츠 안 쪽 여뱅을 상자에 맞춰 자르는데, 코드를 사용한 스크롤링도 방지
4. `overflow: scroll`: 콘텐츠를 안 쪽 여백상자에 맞추기 위해 잘라냄, 잘라냈는지 여부 상관 없이 항상 스크롤바 노출
5. `overflow: auto`: 브라우저가 자동으로 생성, 크기에 맞으면 스크롤바 생성 안하고 크기가 잘렸으면 스크롤바 생성됨
6. `overflow: overlay`: scroll과 동일하게 동작하지만 스크롤바가 동작을 차지하는 대신 콘텐츠 위에 위치

---

#### 2-3-4. float

> 참고사이트1: https://developer.mozilla.org/ko/docs/Web/CSS/float
>
> 참고사이트2: https://velog.io/@eunsonny/TIL.-CSS-float

1. `float: left`: 좌측 부동
2. `float: right`: 우측 부동
3. `float: inline-first`: 블록의 시작쪽 부동
4. `float: inline-end`: 블록의 끝쪽 부동

---

## 3) JS

> * 생활코딩 : https://opentutorials.org/course/3085/18869
>
> * 코딩앙마 js 초급: https://www.youtube.com/watch?v=KF6t61yuPCY
> * 코딩앙마 js 중급: https://www.youtube.com/watch?v=4_WLS9Lj6n4

### 3-0. intro

* html위에서 동작하는 동적인 언어(html은 정적)
* `<script>`태그 안에서 사용

---

### 3-1. event

* 웹 상에서 발생 가능한 모든 이벤트(마우스 클릭, 키보드 치기,,,)
* `<input>`의 onclick, onchange, onkeydown 등등..

---

### 3-2. data type

> mdn data type: https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures
>
> mdn string: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String

* 비교 연산자

> `===`와`==`의 차이: https://velog.io/@filoscoder/-%EC%99%80-%EC%9D%98-%EC%B0%A8%EC%9D%B4-oak1091tes

⭐`===`은 엄격한 비교

⭐`==`타입이 달라도 자동으로 변형 후 비교(1=='1' -> true)

---

### 3-3. array

> w3schools array: https://www.w3schools.com/jsref/jsref_push.asp

---

### 3-4. function

> `window`객체란? https://bigtop.tistory.com/48
>
> `this` vs `self`: https://velog.io/@woohyun_park/self-vs-this
>
> self란? https://geundung.dev/101 
>
> scope란? https://medium.com/@su_bak/javascript-%EC%8A%A4%EC%BD%94%ED%94%84-scope-%EB%9E%80-bc761cba1023

---

### 3-5. object

* 객체: **연관된 함수와 연관된 변수들을 그루핑해서 정리정돈하기 위한** 수납 상자로서 존재

* 메소드(method): 객체에 속해있는 함수
