# Django

> lecture-github: https://github.com/askcompany-kr/django-with-react

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
# conda env -n 가상환경이름
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
  * `studydjango` : 프로젝트명으로 생성된 디렉토리. 이 이름을 참고하고 있는 코드가 몇 개 있어 함부로 수정하지 말 것
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
13. Geographic : DB의 Geo 기능 활용(PostgreSQL중심)
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
  * 앱 생성 후
    * 해당 **앱 폴더** 아래 `urls.py`생성
    * **프로젝트 폴더** 아래 `settings.INSTALLED_APPS`에 앱 이름 추가
    * **프로젝트 폴더** 아래 `urls.py`에 앱 경로 추가

---

### 4) 간단하게 프로젝트 해보기

1. 앱 생성

```shell
# vscode
# django 프로젝트 생성 후
# C:\TIL\Django\studydjango
# blog1앱 만들기
python manage.py startapp blog1
# studydjango/blog1/urls.py 생성하기
# urls.py 파일 아래에
urlpatterns = []
```

2. ~/studydjango/studydjango/settings.py

```python
# 앱을 settings.INSTALLED_APPS에 등록
INSTALLED_APPS = [
    ...,
    'blog1',
]
# shell
python manage.py runserver
```

3. ~/studydjango/blog1/models.py

```python
from django.db import models

# 포스팅 저장하기
class Post(models.Model):
    # CharField : 최대 길이 정의가 필요한 문자열(단일 라인 입력)
    # TextField : 길이 정의가 필요하지 않은 문자열(다중 행 크기 조정 가능한 입력)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

* `auto_now_add` VS `auto_now` : https://codermun-log.tistory.com/175

4. makemigrations / migrate (테이블생성)

```shell
# python manage.py makemigrations <앱이름>
python manage.py makemigrations blog1
# python manage.py migrate <앱이름>
python manage.py migrate blog1
```

5. ~/studydjango/blog1/admin.py

```python
# admin page에서 포스팅 가능
from .models import Post

admin.site.register(Post)
```

6. ~/studydjango/studydjango/urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog1/', include('blog1.urls')),
]
```

7. ~/studydjango/blog1/views.py

```python
from .models import Post

def post_list(request):
    # DB에서 모든 포스팅을 가져와
    qs = Post.objects.all() # QuerySet
    # 목록을 리스트로 가져와
    return render(request, 'blog1/post_list.html',{
        'post_list' : qs,
    })
```

8. blog1에서 새로운 폴더 templates 생성
   * /blog1/templates/**blog1**/post_list.html
   * blog1이라는 폴더 하나 더 만들어야 됨⭐

```python
<h1>Post List</h1>

{% for post in post_list %}
    <h2>{{ post.title }}</h2>
    {{ post.content }}
{% endfor %}
```

9. ~/studydjango/blog1/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```

10. http://127.0.0.1:8000/blog1/

---

## 2. Django Model

### 1) orm이란?

> 참고사이트: https://gmlwjd9405.github.io/2019/02/01/orm.html

* Object-relational mapping
* 객체와 관계형 데이터베이스의 데이터를 자동으로 매핑 해주는 것
* 장고에서 orm을 쓰더라도 sql이 어떻게 실행되고 있는지 파악해야함(`django-debug-toolbar`활용할 것)
* 장고orm은 RDB만 지원: mysql, postgresql, oracle
* 장고 orm 말고 다른 orm도 많음

---

### 2) django models

* db테이블과 python클래스를 **1:1로 매핑**
* 모델 클래스명은 **단수형**으로(ex. Apple(O), Apples(X))
* 모델 클래스명의 첫 글자는 **대문자**
* 서비스에 맞는 db설계 필수

---

### 3) model 활용 순서

* 장고 모델을 통해 db관리할 경우

1. 모델 클래스 작성
2. 모델 클래스로부터 마이그레이션 파일 생성(`python manage.py makemigrations`)
3. 마이그레이션 파일을 db에 적용(`python manage.py migrate`)
4. 모델 활용

* 장고 외부에서 db관리할 경우

1. db로부터 모델 클래스 소스 생성
2. inspectdb 명령
3. 모델 활용

---

### 4) model명과 db테이블명

* db테이블명(default): "앱이름_모델명"
  * app이름: django, 모델명: user, 테이블명: django_user
* 커스텀 지정: 모델 Meta 클래스의 db_table 속성 변경(makemigrations전에)

---

### 5) 실습

* ~/studydjango/

```shell
$python manage.py startapp instagram
```



* ~/studydjango/studydjango/settings.py

```python
# 앱을 settings.INSTALLED_APPS에 등록
INSTALLED_APPS = [
    ...,
    'blog1',
    'instagram',
]
```



* ~/studydjango/instagram/urls.py

```shell
# urls.py 생성 후
urlpatterns=[]
```



* ~/studydjango/studydjango/urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog1/', include('blog1.urls')),
    path('instagram/', include('instagram.urls')),
]
```



* ~/studydjango/instagram/models.py

```python
from django.db import models

# Create your models here.
class Post(models.Model):
  message = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)
```



* shell

```shell
$python manage.py makemigrations instagram
$python manage.py migrate instagram
# 쿼리 보기
# python manage.py sqlmigrate instagram 0001_initial
```



* dbshell

```shell
$python manage.py dbshell
>>> .tables
```

---

### 6) 기본 지원되는 모델 필드 타입

> doc: https://docs.djangoproject.com/en/3.2/ref/models/fields/#field-types
>
> django-model-utils: https://django-model-utils.readthedocs.io/en/latest/

* Primary Key: AutoField, BigAutoField
* 문자열: CharField, TextField, SlugField
* 날짜/시간: DateField, TimeField, DateTimeField, DurationField
* 참/거짓: BooleanField, NullBooleanField
* 숫자: IntegerField, SmallIntegerField, PositiveIntegerField, PositiveSmallIntegerField, BigIntegerField, DecimalField, FloatField
* 파일: BinaryField, FileField, ImageField, FilePathField
* 이메일: EmailField
* URL: URLField
* UUID: UUIDField
* IP: GenericIPAddressField
* RealtionTypes: ForeignKey, OneToOneField, ManyToManyField

---

### 7)자주 쓰는 필드 공통 옵션 

* `blank` : 장고 단에서 validation시에 empty 허용 여부 (디폴트: False)
* `null` (DB 옵션) : null 허용 여부 (디폴트: False) 
* `db_index` (DB 옵션) : 인덱스 필드 여부 (디폴트: False) - migration시 사용
* `default` : 디폴트 값 지정, 혹은 값을 리턴해줄 함수 지정 사용자에게 디폴트값을 제공코자 할 때 
* `unique` (DB 옵션) : 현재 테이블 내에서 유일성 여부 (디폴트: False) 
* `choices` : select 박스 소스로 사용 
* `validators` : validators를 수행할 함수를 다수 지정 모델 필드에 따라 고유한 validators들이 등록 (ex- 이메일만 받기) 
* `verbose_name` : 필드 레이블, 미지정시 필드명이 사용 
* `help_text` : 필드 입력 도움말

⭐⭐설계한 db구조에 따라 최대한 필드 타입 **타이트**하게 지정할 것

⭐⭐blank/null **최소화** 할 것
