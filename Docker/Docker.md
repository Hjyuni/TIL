# Docker

> book : 그림과 실습으로 배우는 도커&쿠버네티스
>
> sample_code_source : https://github.com/wikibook/dkkb/tree/main/sample_files
>
> docker_hub : https://hub.docker.com

## 0. install

### 1) install Docker on Ubuntu

> install on ubuntu : https://docs.docker.com/desktop/linux/install/ubuntu/

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



### 2) use Docker on Vscode

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



