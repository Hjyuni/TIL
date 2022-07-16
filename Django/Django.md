# Django



## 1. Overview

### 1) django 설치하기

* anaconda 설치하기
  * https://www.anaconda.com/products/distribution
  * all users로 설치하기
  * 환경변수 체크하기
* python version 확인하기

```shell
python --version
```

* 가상환경 만들기

```shell
# anaconda prompt
# conda create -n 가상환경이름 같이설치할패키지버전
conda create -n django python=3.7
conda env list
# 가상환경 삭제하기
# conda remove --name 가상환경이름 --all
conda activate django
# conda deactivate
```

* django 다운받기

```shell
# django 3버전 중 제일 최신걸로 다운받아줘
pip install "django~=3.0.0"
# 버전 확인하기
django-admin --version
python -m django --version
```

---

### 2) django 프로젝트 생성하기

* django 프로젝트 생성
  * `django-admin startproject 프로젝트명`
  * `python -m django startproject 프로젝트명`

```shell
# cmd
conda env list
conda activate django
cd \
cd TIL
# start project
django-admin startproject studydjango
# dir(윈도우) = ls(리눅스)
dir
cd studydjango
# start . = open . (mac)
# 안에 파일명 확인하기
start .
```

* 기본적으로 생성된 파일/디렉토리 목록

  * 기본 템플릿 : django/conf/project_template

  * `manage.py` : 명령행을 통해 각종 명령을 수행
  * `studydjango` : 프로젝트명으로 생성된 디렉토리. 이 이름을 참도하고 있는 코두가 몇 개 있어 함부로 수정하지 말 것
    * `__init__.py` : 모든 파이썬 패키지에는 `__init__.py`를 두며 패키지를 임포트할 때 임포트 대상
    * `settings.py` : 현재 프로젝트에서 장고 기본설정(`django/conf/global_settings.py`)을 덮어쓰고 새롭게 지정할 설정들
    * `urls.py` : 최상위 URL설정
    * `wsgi.py` : 실서비스에서의 웹서비스 진입점
    * `asgi.py` : 비동기 지원

* 프로젝트 초기화 작업 및 개발서버 구동
  * 아래 명령어 작성하고 http://localhost:8000/admin/ 으로 접속 후 로그인

```shell
# cmd
# 위에서 이미 진행
django-admin startproject studydjango
cd studydjango

# 서버 구동
python manage.py migrate
# id&pwd 설정
python manage.py createsuperuser
python manage.py runserver
```

⭐웹서비스 개발 시에는 가급적 chrome/firefox 사용하기

---

### 3) django 주요 기능들

1. Function Based Views : 함수로 HTTP 요청 처리
2. Models : 데이터베이스와의 인터페이스
3. Templates : 복잡한 문자열 조합을 보다 용이하게. 주로 HTML 문자열 조합 목적으로 사용하지만  푸쉬 메세지나 이메일 내용을 만들 때에도 쓰면 편리
4. Admin 기초 : 심플한 데이터베이스 레코드 관리 UI
5. Logging : 다양한 경로로 메세지 로깅
6. Static Files : 개발 목적으로의 정적인 파일 관리
7. Messages framework : 유저에게 1회성 메세지 노출 목적
8. Classed Based Views : 클래스로 함수 기반 뷰 만들기
9. Forms : 입력폼 생성, 입력값 유효성 검사 및 DB로의 저장
10. 테스팅
11. 국제화 & 지역화
12. 캐싱
13. Geographic : DB의 Geo 기능 활용
14. Sending Emails
15. Syndication Feeds (RSS/Atom)
16. Sitemaps



* 장고 기본 앱
  * admin, auth, messages, sessions, staticfiles



* 장고 기본 구조
  * URLConf : 미리 url 별로 호출할 함수를 리스트에 등록
  * View : url에 맞춰 호출된 함수
  * models : 파이썬 코드로 데이터베이스와 통신
  * templates : 복잡한 문자열을 손쉽게 조합하기 위한 문자열 렌더링 엔진



* 장고 앱의 필요성
  * 현재 프로젝트의 블로그 기능을 다른 프로젝트에서도 사용하려한다면, 블로그를 **장고앱 형태로 격리해서 만들어 두면 됨**
  * 재사용성을 목적으로한 파이썬 패키지
  * 하나의 앱이름은 현재 프로젝트 상에서 **유일**해야 함
  * 새롭게 생성한 장고앱이나 외부 라이브러리 형태의 장고앱은 **필히 settings.INSTALLED_APPS에 등록** 시켜줘야만 장고앱으로서 대접 받음
  * 아래 명령으로 기본 앱템플릿으로부터 생성
    * `python manage.py startapp <앱이름>`

---