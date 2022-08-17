# Jenkins

## 0. install (Window11)

### 0-1. java

> 로그인 후 각자 운영체제에 맞게 다운: https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html

* 설치시 빈칸 또는 한글이 들어가지 않도록 주의

* jre는 필요하다면 설치할 것

* PATH지정

  * This PC 오른쪽 마우스 > 고급시스템설정 > 환경변수 > PATH지정 > 이름:`JAVA_HOME` / 값: `C:\Program Files\Java\jdk1.8.0_202`

* 확인

  ```cmd
  cd \
  java -version
  ```



### 0-2. Jenkins

> download: https://www.jenkins.io/
>
> * jenkins.war 다운로드

* JENKINS_HOME 위치 지정
  * JENKINS_HOME을 설정하지 않으면 사용자 계정의 .jenkins 압축이 풀림
  * 서버 이전, 계정 변경에 대비하기 위해 별도 위치 권장(C:\Program Files\Jenkins\jenkins.war)
  * This PC 오른쪽 마우스 > 고급시스템설정 > 환경변수 > PATH지정 > 이름:`JENKINS_HOME` / 값: `C:\Program Files\Jenkins`
* port 설정, 실행 스크립트 작성
  * 진행 도중 방화벽 액세스 허용 선택할 것

```cmd
# C:\Program Files\Jenkins
>java -jar jenkins.war --httpPort=8081
```

* localhost:8081 접속
* `C:\Users\hjy07\.jenkins\secrets\initialAdminPassword`들어가서 비번 복사 후 붙여넣기
* plugin 설치



### 0-3. git

> download: https://git-scm.com/downloads



### 0-4. maven

> download: https://maven.apache.org/download.cgi
>
> * Binary.zip 다운

* 압축해제 후 `C:\Program Files\Maven`에 옮기기



### 0-5. jenkins에 설정

* manage jenkins > Global Tool Configuration
* JDK, Git, Maven 각자 경로에 맞게 추가하기

![image-20220817111755356](C:\Users\hjy07\AppData\Roaming\Typora\typora-user-images\image-20220817111755356.png)

![image-20220817111817123](C:\Users\hjy07\AppData\Roaming\Typora\typora-user-images\image-20220817111817123.png)

![image-20220817111837056](C:\Users\hjy07\AppData\Roaming\Typora\typora-user-images\image-20220817111837056.png)

* Manage jenkins > manage plugins

![image-20220817112246928](C:\Users\hjy07\AppData\Roaming\Typora\typora-user-images\image-20220817112246928.png)

* `C:\Program Files\Maven\apache-maven-3.8.6\conf\settings.xml` 들어가서 161 번째 줄 http > https로 바꾸기

---

## 1. Jenkins 개념

* job

  * jenkins가 실행하는 작업의 최소 단위

  * 실행 방법: 즉시 실행 / 스케줄에 따라 실행 / 다른 job이 종료한 뒤에 실행


