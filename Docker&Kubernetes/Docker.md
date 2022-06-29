# Docker

> book : 그림과 실습으로 배우는 도커&쿠버네티스
>
> sample_code_source : https://github.com/wikibook/dkkb/tree/main/sample_files
>
> docker_hub : https://hub.docker.com
>
> docker_document : https://docs.docker.com/reference/

## 0. install

### 0-1. install Docker on Ubuntu

> install on ubuntu : https://docs.docker.com/desktop/linux/install/ubuntu/
>
> 참고사이트 : https://shanepark.tistory.com/237

1. 설치에 필요한 소프트웨어 설치하기
   * `ca-certificates` : 인증서 관련 모듈
   * `curl` : HTTP 등을 통해 파일을 내려받기 위한 모듈
   * `gnupg` : 디지털 서명을 사용하기 위한 모듈
   * `lsb-release` : 리눅스 배포판을 식별하는데 이용되는 모듈

```shell
sudo apt-get install \
ca-certificates \
curl \
gnupg \
lsb-release
```

2. PGP키 추가
   * PGP(Pretty Good Privacy) 키란?
     * 컴퓨터 파일을 암호화하고 복호화하는 프로그램

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

3. fingerprint 확인

```shell
sudo apt-key fingerprint 0EBFCD88
```

4. repository 추가

```shell
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. repository update

```shell
sudo apt-get update
```

6. install docker

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

7. 관리자 외의 사용자도 도커를 사용할 수 있도록

```shell
sudo usermod -aG docker $USER
```

8. check docker version

```shell
docker --version
```



### 0-2. use Docker on Vscode

> https://docs.microsoft.com/ko-kr/learn/modules/use-docker-container-dev-env-vs-code/
>
> https://89douner.tistory.com/123



## 1. Docker 개념

* Docker(도커)란?

  * 서버에서 사용되는 소프트웨어
  * 데이터 또는 프로그램을 격리시키는 기능을 제공하는 소프트웨어
  * 다양한 프로그램과 데이터를 **각각 독립된 환경에 격리하는 기능** 제공
  * 컨테이너를 다루는 기능을 제공하는 소프트웨어가 도커
  * 도커 엔진이 있어야 도커를 사용할 수 있고 컨테이너를 만들 수 있음
  * 도커는 리눅스 운영체제가 사용됨, window나 macOS에서도 도커를 사용하면 내부적으로는 리눅스 운영체제가 사용되고 있는 것임
  * 컨테이너 안에 들어있는 프로그램은 **다른 프로그램과 격리된 상태**(독립된 상태)가 되므로 프로그램 간 공유로 인해 생기는 문제가 해결됨
  * 도커를 이용하면 물리적 환경의 차이, 서버 구성의 차이를 무시할 수 있으므로 운영 서버와 개발 서버의 환경 차이로 인한 문제 발생 방지



* Container(컨테이너)란?

  * **독립된** 창고에 데이터나 프로그램을 두는 것

  * 컨테이너를 만들려면 **이미지** 필요 (ubuntu 운영체제 설치할 때 사용하는 iso파일 생각하면 됨)
  * 컨테이너를 어떤 도커 엔진에서 다른 도커 엔진으로 옮기기 쉬움
  * 빈 컨테이너라고 해서 아예 빈 것이 아님, 운영체제의 '커널 외의 주변 부분'이 들어가 있음
    * 도커에서는 컨테이너가 완전히 분리돼 있어서 밑바탕이 되는 리눅스 운영체제의 주변 부분이 컨테이너 속 프로그램의 명령을 전달받을 수 없음
    * 주변부분만 컨테이너에 넣어놓고 커널은 밑바탕에 있는 것을 빌려쓰는 형태 때문에 도커의 '가벼움'이라는 특성 유지 가능
  * 컨테이너 하나를 업데이트 하면서 계속 사용하기보다는 업데이트된 소프트웨어가 들어있는 새로운 컨테이너를 사용하는 것이 좋음
  * 데이터는 물리적 서버의 디스크를 연결해 데이터를 기록할 수 있도록 해서 컨테이너를 버려도 데이터는 보존됨
  * 데이터 보존이 안되는 상황도 있으니 컨테이너 지울 때 잘 확인할 것



* 이미지(image)란?
  * 컨테이너를 만드는데 사용
  * 컨테이너를 찍어내는 틀과 같음, 컨테이너의 설계도 역할을 함
  * 이미지로 컨테이너를 만들 수도 있지만 **컨테이너로 이미지를 만들 수도 있음**
  * 도커 허브(https://hub.docker.com) : 공개된 컨테이너 이미지가 모여있는 곳
  * 공식 이미지를 사용하거나 커스텀 이미지를 만들어 사용하길 권장, **이미지는 신중하게 골라서 사용할 것**



* Server(서버)란?
  * 어떤 서비스를 제공(serve)하는 것
  * 두 가지 의미가 있음
    * 기능적 의미의 서버 : 웹서버, 데이터베이스서버 등과 같이 기능을 제공한다는 의미의 서버
    * 물리적 의미의 서버 : 물리적 컴퓨터로서의 서버
    * 하나의 물리적 컴퓨터로서의 서버에 여러개의 기능적 의미의 서버를 함께 둘 수 있음
  * 서버는 **여러 사람이 원격으로 접근해** 사용 가능
  * 서버의 기능은 소프트웨어가 제공, 따라서 소프트 웨어를 설치하면 서버의 기능을 갖고있음



* 운영체제란?
  * 소프트웨어나 프로그램의 명령을 하드웨어에 전달하는 역할
  * '커널'과 '그 외의 주변 부분'으로 구성됨
  * 주변 부분이 프로그램의 연락 내용을 커널에 전달하고 커널이 하드웨어를 다룸
  * 주변 부분은 프로그램에서 명령을 전달받거나 커널이 실행한 결과를 프로그램에 다시 전달하는 역할을 함



## 2. Docker 실행하기

### 2-1. Docker 엔진 명령어

* 도커 엔진 시작

  ```shell
  sudo systemctl start docker
  ```

* 도거 엔진 종료

  ```shell
  sudo systemctl stop docker
  # Warning: Stopping docker.service, but it can still be activated by:docker.socket가 뜬다면
  sudo systemctl stop docker.socket
  ```

* 도커 엔진 상태 확인

  ```shell
  sudo systemctl status docker
  ```

* 도커 자동 실행 설정

  ```shell
  sudo systemctl enable docker
  ```

---

### 2-2. Docker 명령어 기본

* 도커 명령어 기본

  * `docker '상위command' '하위command' '대상'`

  * command : 상위 커맨드, 하위 커맨드로 구성되어 있으며 상위 커맨드는 '**무엇을**', 하위 커맨드는 '**어떻게**'에 해당하는 내용 지정
  * 대상 : 컨테이너명 또는 이미지명 등 구체적인 이름

  ```shell
  # docker '상위command' '하위command' '대상'
  # penguin이라는 container 실행하기
  docker container run penguin
  # penguin이라는 image 다운받기
  docker image pull penguin
  # penguin이라는 이미지로 container 시작하기
  docker container start penguin
  ```

* 도커 명령어 옵션과 인자

  * `docker '상위command' '하위command' '옵션' '대상' '인자'`
  * 옵션 : `-` 또는 `--`로 시작하는 것이 일반적이고 안붙을 때도 있음
    * `--name` : 이름을 지정
    * `-p host_port_num : container_post_num` : 포트 번호 지정
    * `-v host_disk : container_directory` : 볼륨 마운트
    * `--net=network_name` : 컨테이너를 네트워크에 연결
    * `-e env_name=value` : 환경변수 설정
    * `-d` : 백그라운드 실행
    * `-i` : 컨테이너에 터미널 연결
    * `-t` : 특수키 사용 가능하도록 함
    * `-help` : 사용 방법 안내 메시지
  * 인자 : `-` 또는 `--`로 시작하는 경우 많음. 대상에 전달할 값을 지정. 문자코드 또는 포트번호 등을 전달할 수 있음

  ```shell
  # docker '상위command' '하위command' '옵션' '대상' '인자'
  # -d : 백그라운드 실행 옵션
  # --mode=1 : 모드 1로 실행하는 옵션
  docker container run -d penguin --mode=1
  ```

* 도커 상세 버전 확인

  ```shell
  docker version
  ```

---

### 2-3. Docker 하위 커맨드 & 주요 옵션

* 컨테이너 조작 관련 하위 커맨드 (상위 커맨드 : `container`)

  * `start` : 컨테이너 실행
    * 주요 옵션 : `-i`
  * `stop` : 컨테이너 정지
  * `create` : 도커 이미지로부터 컨테이너를 생성
    * 주요 옵션 : `--name / -e / -p / -v`
  * `run` : 도커 이미지를 내려받고 컨테이너를 생성해 실행 (=`docker image pull + docker container create + docker container start`):star:
    * 주요 옵션 :  `--name / -e / -p / -v / -d / -i / -t`
  * `rm` : 정지 상태의 컨테이너 삭제:star:
    * 주요 옵션 : `-f / -v`
  * `exec` : 실행 중인 컨테이너 속에서 프로그램 실행
    * 주요 옵션 :  `-i / -t`
  * `ls` : 컨테이너 목록 출력:star:
    * 주요 옵션 : `-a`
  * `cp` : 도커 컨테이너와 도커 호스트 간에 파일 복사
  * `commit` : 도커 컨테이너를 이미지로 변환

  ```shell
  # docker container 하위command 옵션
  # container 생략 가능한 경우도 있고 안되는 경우도 있음
  docker container start
  docker start
  
  docker container stop
  docker stop
  
  docker container create
  docker create
  
  docker container run
  docker run
  
  docker container rm
  docker rm
  
  docker container exec
  docker exec
  
  docker container ls
  docker ps
  
  docker container cp
  docker cp
  
  docker container commit
  docker commit
  ```

* 이미지 조작 관련 하위 커맨드 (상위 커맨드 : `image`)

  * `pull` : 도커 허브 등의 repository에서 이미지 내려받기
  * `rm` : 도커 이미지 삭제
  * `ls` : 내려 받은 이미지의 목록 출력
  * `build` : 도커 이미지 생성
    * 주요 옵션 : `-t`

  ```shell
  # docker image 하위command 옵션
  # image 생략 가능한 경우 있고 안되는 경우도 있음
  docker image pull
  docker pull
  
  docker image rm
  docker rmi
  
  docker image ls
  
  docker image build
  docker build
  ```

* 볼륨 조작 관련 하위 커맨드 (상위 커맨드 : `volume`)

  > volume
  >
  > : 컨테이너에 마운트 가능한 공간

  * `create` : 볼륨 생성
    * 주요 옵션 : `--name`
  * `inspect` : 볼륨의 상세 정보를 출력
  * `ls` : 볼륨의 목록 출력
    * 주요 옵션 : `-a`
  * `prune` : 현재 마운트 되지 않은 볼륨 모두 삭제
  * `rm` : 지정한 볼륨을 삭제

  ```shell
  # docker volume 하위command 옵션
  # volume 생략 안됨
  docker volume create
  docker volume inspect
  docker volume ls
  docker volume prune
  docker volume rm
  ```

* 네트워크 조작 관련 하위 커맨드 (상위 커맨드 : `network`)

  >network
  >
  >: 도커 네트워크와 관련된 기능 실행

  * `connect` : 컨테이너를 도커 네트워크에 연결
  * `disconnect` : 컨테이너를 도커 네트워크 연결에서 해제
  * `create` : 도커 네트워크를 생성
  * `inspect` : 도커 네트워크의 상세 정보 출력
  * `ls` : 도커 네트워크의 목록 출력
  * `prune` : 현재 컨테이너가 접속하지 않은 네트워크 모두 삭제
  * `rm` : 지정한 네트워크를 삭제

  ```shell
  # docker network 하위command 옵션
  docker network connect
  docker network disconnect
  docker network create
  docker network inspect
  docker network ls
  docker network prune
  docker network rm
  ```

* 그 외 상위 커맨드 (도커 심화)

  > 도커 스웜(Docker Swarm)
  >
  > : 여러 호스트 서버의 컨테이너들을 배포 및 관리하기 위한 툴
  >
  > 참고 사이트 : https://honggg0801.tistory.com/22

  * `checkpoint` : 현재 상태를 일시적으로 저장한 후 나중에 해당 시점의 상태로 되돌릴 수 있음

  * `node` : 도커 스웜의 노드를 관리

  * `plugin` : 플러그인을 관리

  * `secret` : 도커 스웜의 비밀값 정보를 관리하는 기능

  * `service` : 도커 스웜의 서비스 관리

  * `stack` : 도커 스웜 또는 쿠버네티스에서 여러 개의 서비스를 합쳐 구성한 스택을 관리하는 기능

  * `swarm` : 도커 스웜을 관리하는 기능

  * `system` : 도커 엔진의 정보를 확인하는 기능

* 단독으로 쓰이는 커맨드
  * `login` : 도커 registry에 로그인
    * 주요 옵션 : `-u / -p`
  * `logout` : 도커 registry에 로그아웃
  * `search` : 도커 registry를 검색
  * `version` : 도커 엔진 및 명령행 도구의 버전 출력

---

### 2-4. 컨테이너 생성, 실행, 상태확인, 종료, 삭제

* 컨테이너 이름 : apa000ex1
* 이미지 이름 : httpd

1. run

   * `docker run` = `docker image pull + docker container create + docker container start`

   ```shell
   # httpd(아파치 이미지)를 사용해 apa000ex1이라는 이름의 컨테이너 생성하고 실행
   docker run --name apa000ex1 -d httpd
   ```

2. ls

   * 컨테이너 실행 중인지 확인
   * 생략된 명령어로 많이 사용
   * status가 `Up`이면 실행중, `Exited`면 종료된 상태

   ```shell
   docker container ls
   docker ps
   
   CONTAINER ID   IMAGE     COMMAND              CREATED              STATUS              PORTS     NAMES
   d1d4ff73af0e   httpd     "httpd-foreground"   About a minute ago   Up About a minute   80/tcp    apa000ex1
   
   ```

3. stop

   * 컨테이너 종료

   ```shell
   docker stop apa000ex1
   ```

4. 컨테이너 상태 (종료됐나) 확인 & 컨테이너 존재 여부 확인

   * `-a` : 옵션을 붙이면 컨테이너가 존재하는지 확인 가능

   ```shell
   # 종료됐나 확인
   docker ps
   # 컨테이너 존재 여부 확인
   docker ps -a
   docker container ls -a
   ```

5. 컨테이너 삭제

   * 삭제하기 전에 무조건 컨테이너 실행 중지를 먼저 해야함:star:

   ```shell
   docker rm apa000ex1
   ```

6. 컨테이너 존재 여부 확인

   ```shell
   docker ps -a
   ```

---

### 2-5. 컨테이너 통신

* 아파치(apache)란?
  * 웹 서버 기능을 제공하는 소프트웨어
  * 동작 중인 서버에 html,이미지,시스템 파일 등을 두면 이 파일을 웹사이트 형태로 표현할 수 있음



* 컨테이너 이름 : apa000ex2
* 이미지 이름 : httpd
* 포트 설정 : 8080:80

1. 컨테이너 생성 및 실행

   * `-p host_port_num : container_post_num` 명령어를 통해 포트 설정

   ```shell
   # httpd 이미지를 사용해 apa000ex2라는 이름의 컨테이너를 생성하고 백그라운드로 실행 & 포트 설정
   docker run --name apa000ex2 -d -p 8080:80 httpd
   ```

2. 컨테이너 실행 상태 확인

   ```shell
   docker ps
   docker container ls
   ```

3. 웹 브라우저를 통해 아파치에 접근 가능한지 확인

   * http://localhost:8080/ 에 들어가보기
   * `It works!` 뜨면 됨

4. 컨테이너 실행 중지

   ```shell
   docker stop apa000ex2
   ```

5. 컨테이너 삭제

   ```shell
   docker rm apa000ex2
   ```

6. 컨테이너 존재 여부 확인

   ```shell
   docker ps -a
   ```

* 아파치 컨테이너 여러개 실행해보기

  * 컨테이너 이름 : apa000ex3, apa000ex4, apa000ex5
  * 이미지 이름 : httpd
  * 포트 설정 : 8081:80, 8082:80, 8083:80

  ``` shell
  # run
  docker run --name apa000ex3 -d -p 8081:80 httpd
  docker run --name apa000ex4 -d -p 8082:80 httpd
  docker run --name apa000ex5 -d -p 8083:80 httpd
  # 컨테이너 실행 상태 확인
  docker ps
  # http://localhost:8081/
  # http://localhost:8082/
  # http://localhost:8083/
  # stop
  docker stop apa000ex3 apa000ex4 apa000ex5
  # rm
  docker rm apa000ex3 apa000ex4 apa000ex5
  # 컨테이너 존재 확인
  docker ps -a
  ```

  

* nginx 컨테이너 실행해보기

  * 컨테이너 이름 : nginx000ex6
  * 이미지 이름 : nginx
  * 포트 설정 : 8084:80

  ```shell
  # run
  docker run --name nginx000ex6 -d -p 8084:80 nginx
  # 컨테이너 실행 상태 확인
  docker ps
  # http://localhost:8084/
  # stop
  docker stop nginx000ex6
  # rm
  docker rm nginx000ex6
  # 컨테이너 존재 확인
  docker ps -a
  ```

  

* mySQL 컨테이너 실행해보기

  :star:인자를 반드시 지정해줘야 함, 여기선 지정 안해서 제대로 작동 안됨

  * 컨테이너 이름 : mysql000ex7
  * 이미지 이름 : mysql
  * mysql root password : 1234

  ```shell
  # run
  docker run --name mysql000ex7 -dit -e MYSQL_ROOT_PASSWORD=1234 mysql
  # 컨테이너 실행 상태 확인
  docker ps
  # stop
  docker stop mysql000ex7
  # rm
  docker rm mysql000ex7
  # 컨테이너 존재 확인
  docker ps -a
  ```


---

### 2-6. 이미지 삭제

* 이미지가 많아지면 용량을 많이 차지하므로 이미지를 그때그때 삭제할 것
* 컨테이너 명령어랑 헷갈리지 말 것:star:

1. 해당 이미지로 만들어져 있는 컨테이너가 있는지 확인

```shell
docker ps -a
```

2. 이미지가 존재하는지 확인

```shell
docker image ls
```

3. 이미지 삭제

```shell
# docker image rm 이미지명
docker image rm httpd nginx mysql
```

---

### 2-7. 여러 컨테이너 연동해 실행

* 워드프레스 : 워드프레스 컨테이너 + mySQL 컨테이너
* 컨테이너 두 개가 연결되려면 가상 네트워크를 만들고 이 네트워크에 두 개의 컨테이너를 소속시켜 두 컨테이너를 연결해야 함



1. 네트워크 생성

```shell
docker network create wordpress000net1
```

2. 컨테이너 생성 및 실행

* mySQL컨테이너
  * 옵션
    * 컨테이너 이름(`--name`) : mysql000ex11
    * 네트워크 이름(`--net`) : wordpress000net1
    * mysql root password(`-e MYSQL_ROOT_PASSWORD`) : rootpass
    * mysql database(`-e MYSQL_DATABASE`) : wordpress000db
    * mysql user(`-e MYSQL_USER`) : wordpress000hur
    * mysql password(`-e MYSQL_PASSWORD`) : userpass
  * 인자
    * `--character-set-server=utf8mb4` : 문자 인코딩으로 UTF8사용
    * `--collation-serve=utf8mb4_unicode_ci` : 정렬 순서 UTF8따름
    * `--default-authentication-plugin=mysql_native_password` : 인증방식(mysql인증 방식을 바꿨는데 아직 지원 안해서 인증 방식을 예전걸(native)로 바꿔줘야함)

```shell
docker run --name mysql000ex11 -dit --net=wordpress000net1 -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=wordpress000db -e MYSQL_USER=wordpress000hur -e MYSQL_PASSWORD=userpass mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
```

* wordpress컨테이너
  * 옵션
    * 컨테이너 이름(`--name`) : wordpress000ex12
    * 네트워크 이름(`--net`) : wordpress000net1
    * 포트 번호(`-p`) : 8085:80
    * db 컨테이너 이름(`-e WORDPRESS_DB_HOST`) : mysql000ex11
    * db 이름(`-e WORDPRESS_DB_NAME`) : wordpress000db
    * db 사용자 이름(`-e WORDPRESS_DB_USER`) : wordpress000hur
    * db password(`-e WORDPRESS_DB_PASSWORD`) : userpass

```shell
docker run --name wordpress000ex12 -dit --net=wordpress000net1 -p 8085:80 -e WORDPRESS_DB_HOST=mysql000ex11 -e WORDPRESS_DB_NAME=wordpress000db -e WORDPRESS_DB_USER=wordpress000hur -e WORDPRESS_DB_PASSWORD=userpass wordpress
```

3. 컨테이너 상태 확인

```shell
docker ps
```

4. http://localhost:8085/ 확인하기 (워드프레스 화면)
5. 컨테이너 종료

```shell
docker stop mysql000ex11 wordpress000ex12
```

6. 컨테이너 지우기&상태, 존재 확인

```shell
docker rm mysql000ex11 wordpress000ex12
docker ps
docker ps -a
```

7. 이미지&네트워크 지우고 확인하기

```shell
# image
docker image rm mysql wordpress
docker image ls
# network
docker network ls
docker network rm wordpress000net1
docker network ls
```



* 레드마인 & mySQL 연동하기

```shell
# create network
docker network create redmine000net2
# mysql container
docker run --name mysql000ex13 -dit --net=redmine000net2 -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=redmine000db -e MYSQL_USER=redmine000hur -e MYSQL_PASSWORD=userpass mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
# redmine container
docker run -dit --name redmine000ex14 --network redmine000net2 -p 8086:3000 -e REDMINE_DB_MYSQL=mysql000ex13 -e REDMINE_DB_DATABASE=redmine000db -e REDMINE_DB_USERNAME=redmine000hur -e REDMINE_DB_PASSWORD=userpass redmine
# ps
docker ps
# http://localhost:8086/
# stop
docker stop mysql000ex13 redmine000ex14
# rm
docker rm mysql000ex13 redmine000ex14
# check
docker ps
docker ps -a
# rm image
docker image ls
docker image rm mysql redmine
# check
docker image ls
# rm network
docker network ls
docker network rm redmine000net2
# check
docker network ls
```



* 레드마인 & mariaDB 연동하기

```shell
# create network
docker network create redmine000net3
# mariaDB container
docker run --name mariadb000ex15 -dit --net=redmine000net3 -e MYSQL_ROOT_PASSWORD=mariarootpass -e MYSQL_DATABASE=redmine000db -e MYSQL_USER=redmine000hur -e MYSQL_PASSWORD=userpass mariadb --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
# redmine container
docker run -dit --name redmine000ex16 --network redmine000net3 -p 8087:3000 -e REDMINE_DB_MYSQL=mariadb000ex15 -e REDMINE_DB_DATABASE=redmine000db -e REDMINE_DB_USERNAME=redmine000hur -e REDMINE_DB_PASSWORD=userpass redmine
# check
docker ps
# http://localhost:8087/
# stop
docker stop mariadb000ex15 redmine000ex16
# rm container
docker rm mariadb000ex15 redmine000ex16
# check
docker ps
docker ps -a
# rm image
docker image ls
docker image rm mariadb redmine
# check
docker image ls
# rm network
docker network ls
docker network rm redmine000net3
# check
docker network ls
```



* wordpress & mariaDB 연동하기

```shell
# create network
docker network create wordpress000net4
# mariaDB container
docker run --name mariadb000ex17 -dit --net=wordpress000net4 -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=wordpress000db -e MYSQL_USER=wordpress000hur -e MYSQL_PASSWORD=1234 mariadb --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
# wordpress container
docker run --name wordpress000ex18 -dit --net=wordpress000net4 -p 8088:80 -e WORDPRESS_DB_HOST=mariadb000ex17 -e WORDPRESS_DB_NAME=wordpress000db -e WORDPRESS_DB_USER=wordpress000hur -e WORDPRESS_DB_PASSWORD=1234 wordpress
# check
docker ps
# http://localhost:8088/
# stop
docker stop mariadb000ex17 wordpress000ex18
# rm container
docker rm mariadb000ex17 wordpress000ex18
# check
docker ps
docker ps -a
# rm image
docker image ls
docker image rm mariadb wordpress
# check
docker image ls
# rm network
docker network ls
docker network rm wordpress000net4
# check
docker network ls
```

---

### 2-8. 컨테이너에서 mySQL/postgreSQL 실행해보기

* mySQL

> 참고사이트 : https://poiemaweb.com/docker-mysql

```shell
# mysql container
docker run --name mysql-con -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql
# check
docker ps -a
# connect mysql docker container
docker exec -it mysql-con /bin/bash
> mysql -u root -p
# exit
exit
# stop
docker stop mysql-con
# rm container
docker rm mysql-con
# check
docker ps -a
# rm image
docker image rm mysql
# check
docker image ls
```

* postgreSQL

> 참고사이트 : https://judo0179.tistory.com/96

```shell
# postgre container
docker run --name postgre -p 5432:5432 -e POSTGRES_PASSWORD=1234 -d postgres
# check
docker ps -a
# exec postgre
docker exec -it postgres /bin/bash
> psql -U postgres
# exit
exit
# stop all container
docker stop $(docker ps -a -q)
# rm all container
docker rm $(docker ps -a -q)
# check
docker ps -a
# rm image
docker image ls
docker image rm postgres
# check
docker image ls
```

---

## 3. Docker 응용

### 3-1. 파일 복사 command

* host -> container
  * `docker cp container_name:container_path` (=`docker container cp container_name:container_path`)
* container -> host
  * `docker cp container_name:container_path host_path` (=`docker container cp container_name:container_path host_path`)
* 파일 복사 
  * `docker cp 원본경로 복사할경로`



* 호스트 파일을 컨테이너 속으로 복사하기

```shell
# apache container
docker run --name apa000ex19 -d -p 8089:80 httpd
# http://localhost:8089/
# host -> container
docker cp /home/jyoon/TIL/Docker&Kubernetes/index.html apa000ex19:/usr/local/apache2/htdocs/
# http://localhost:8089/
```



* 컨테이너 파일을 호스트로 복사하기

  * 파일명 바꾸고 지우기

  ```shell
  mv /home/jyoon/TIL/index.html /home/jyoon/TIL/Docker&Kubernetes/index2.html
  rm /home/jyoon/TIL/Docker&Kubernetes/index.html
  ```

  * 컨테이너 파일 호스트로 복사하기

  ```shell
  # 호스트 파일을 컨테이너 속으로 복사하기에서 사용했던 컨테이너
  docker cp apa000ex19:/usr/local/apache2/htdocs/index.html /home/jyoon/TIL/Docker&Kubernetes/
  # 뒷정리
  # rm container
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)
  # rm image
  docker image ls
  docker image rm httpd
  # check
  docker ps -a
  docker image ls
  ```

---

### 3-2. Volume Mount

* 볼륨(volume)이란?
  * 스토리지의 한 영역을 분할한 것
* 마운트(mount)란?
  * '연결하다'라는 뜻
  * 대상을 연결해 운영체제 또는 소프트웨어의 관리하에 두는 일
* 데이터 퍼시스턴시(data persistency)
  * 매번 데이터를 옮기는 것이 아닌 처음부터 컨테이너 외부에 둔 데이터에 접근해 사용하는 것



* 마운트 종류

  * 볼륨 마운트(volume mount)

    * 도커 엔진이 관리하는 영역 내에 만들어진 볼륨을 컨테이너에 디스크 형태로 마운트

    * 이름만으로 관리가 가능해서 다루기 쉬움
    * 볼룸에 비해 직접 조작하기는 어려워 **임시 목적의 파일**이나 **자주 쓰지 않지만 지우면 안되는 파일** 두는 목적으로 많이 사용

    ```shell
    # create volume mount
    docker volume create volume_name
    # rm volume mount
    docker volume rm volume_name
    ```

    

  * 바인드 마운트(bind mount)

    * 도커 엔진에서 관리하지 않는 영역의 기존 directory를 컨테이너에 마운트
    * 파일 단위로도 마운트 가능
    * **자주 사용하는 파일** 두는 목적으로 많이 사용

  * 파일을 직접 편집해야 할 일이 많다면 바인드 마운트, 그렇지 않다면 볼륨 마운트 사용



* 바인드 마운트 해보기

```shell
# mkdir
cd TIL/Docker&Kubernetes
mkdir apa_folder
# bind mount
docker run --name apa000ex20 -d -p 8089:80 -v /home/jyoon/TIL/Docker&Kubernetes/apa_folder:/usr/local/apache2/htdocs httpd
# http://localhost:8089/
cp /home/jyoon/TIL/Docker&Kubernetes/index.html /home/jyoon/TIL/Docker&Kubernetes/apa_folder/
# http://localhost:8089/
# rm container
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```



* 볼륨 마운트 해보기

```shell
# create volume mount
docker volume create apa000vol1
# httpd container
docker run --name apa000ex21 -d -p 8091:80 -v apa000vol1:/usr/local/apache2/htdocs httpd
# 상세정보확인
docker volume inspect apa000vol1
docker container inspect apa000ex21
# stop & rm
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
# rm image
docker image ls
docker image rm httpd
# rm volume
docker volume rm apa000vol1
# check
docker ps -a
docker image ls
docker volume ls
```



* 볼륨 백업
  * 참고사이트 : https://royleej9.tistory.com/entry/Docker-volume-BackupRestore

```shell
# 볼륨 압축
docker run --rm -v apa000vol1:/source -v /home/jyoon/Documents/target busybox tar czvf /target/backup_apa.tar.g -C /source .
# 복원
docker run --rm -v apa000vol2:/source -v /home/jyoon/Documents/target busybox tar xzvf /target/backup_apa.tar.g -C /source
```

---

### 3-3. 컨테이너로 이미지 만들기

:star:컨테이너를 이동 할 때에는 이미지로 먼저 변환해야함

1. commit 명령어로 컨테이너를 이미지로 변환

   * `docker commit 'container_name' 'new_image_name'`

   ```shell
   # container
   docker run --name apa000ex22 -d -p 8092:80 httpd
   # commit으로 이미지 만들기
   docker commit apa000ex22 ex22_original1
   # check
   docker image ls
   ```

   

2. dockerfile 스크립트로 이미지 만들기

   * dockerfile : 도커 이미지를 만드는 파일
   * `docker build -t '생성할 이미지 이름' '재료 폴더 경로'`

   ``` shell
   # TIL/Docker&Kubernetes/apa_folder
   nano Dockerfile
   # nano
   FROM httpd
   COPY index.html /usr/local/apache2/htdocs
   # cmd
   docker build -t ex22_original2 /home/jyoon/TIL/Docker&Kubernetes/apa_folder
   # check
   docker image ls
   # stop & rm container
   docker stop $(docker ps -a -q)
   docker rm $(docker ps -a -q)
   # rm image
   docker image rm httpd ex22_original1 ex22_original2
   # check
   docker ps -a
   docker image ls
   ```

---

### 3-4. 컨테이너 개조

* shell 필요
  * 보통 bash사용, bash가 실행되면 shell에 입력된 명령은 도커 엔진이 아닌 **해당 컨테이너로 전달**, **컨테이너 내부를 다루게 됨**
    * `docker exec (옵션) 'container_name /bin/bash'`
  * bash를 통해 컨테이너 내부를 조작하는 동안에는 도커 명령을 사용할 수 없음
  * 작업이 끝나면 다시 나와야함
    * `exit`

---

### 3-5. 도커 허브

* docker registry : 이미지를 배포하는 장소, 도커 제작사 외의 다른 기업이나 개인도 운영할 수 있음
* docker hurb : 도커 제작사에서 운영하는 공식 도커 레지스트리

* 태그와 이미지 업로드

  * 이미지에 태그를 부여해 복제

    ```shell
    # docker tag 원래_이미지_이름 레지스트리_주소/리포지토리_이름:버전
    docker tag apa000ex22 abc.comm/bpache:13
    ```

  * 이미지 업로드

    ```shell
    # docker push 레지스트리_주소/리포지토리_이름:버전
    docker push abc.comm/bpache:13
    ```

* 비공개 레지스트리 만들기

```shell
docker run -d -p 5000:5000 registry
```





