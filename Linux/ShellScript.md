# ShellScript

## 0. 환경 변수

> 참고사이트(ubuntu 환경변수 설정):https://jjig810906.tistory.com/62
>
> 참고사이트(shell, bashrc)의 개념⭐: https://dohk.tistory.com/191

* 환경변수란
  * 운영체제 수준에서 선언하는 변수
  * 운영체제 해당 환경에서 실행되는 프로세스가 모두 참조할 수 있음
* `export 환경변수=값`: **임시로** 환경변수 선언, 재부팅하거나 로그아웃 하면 사라짐
* **특정** 유저에게만 영구적으로 적용하고 싶은 경우 `~/.bash_profile`파일 수정

```shell
$ vi ~/.bash_profile
export $AGE=28
$ source ~/.bash_profile
```



* **모든** 유저에게 영구적으로 적용하고 싶은 경우 `/etc/profile`파일 수정

```shell
$ vi /etc/profile
export $NAME=jyuni
```



* `$PATH`: 운영체제가 명령어의 실행파일을 찾는 경로

  * 절대/상대 경로 없이 단독으로 명령어로 수행할 수 있게 함
  * 내가 만든 .sh와 같은 파일의 위치도 `$PATH`에 등록하면 경로를 매번 입력하거나 찾지 않아도 됨
  * 나갔다 들어오면 사라지므로 영구적으로 PATH설정해놓고 싶으면  `/etc/profile`파일 수정 해야함

  ```shell
  $ sudo vi /etc/profile
  $ export PATH=$PATH:/home/ubuntu/bin
  ```


## 1. shell script란?

* CLI환경에서 실행할 수 있는 명령어 리스트

* 위에 아래와 같은 표시가 있다면 shell script

  > 참고사이트1(#!/bin/sh): https://storycompiler.tistory.com/101
  >
  > 참고사이트2(zsh란): http://choesin.com/zsh-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%99%9C-bash-%EB%8C%80%EC%8B%A0-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%A9%EB%8B%88%EA%B9%8C

  * `#!/bin/bash`: bin/bash를 사용하는 bash shell script
  * ⭐`#!/bin/sh`: 현재 커서 이후 단어 복사, 숫자 yw로 쓰면 숫자만큼의 단어 복사
  * `#!/bin/zsh`: bin/zsh를 사용하는 zshell shell script
  * `#!` 스크립트를 실행할 쉘을 지정하는 선언문(shebang이라고 읽음)

* sh 또는 bash shell을 많이 쓰지만 도커에서 sh가 기본이 된 alpine linux를 사용하기 때문에 sh에 쓰는 것에 익숙해 지는 것이 좋음

---

## 2. 사용 방법

* `./[filename]`
* 실행 안되면 `chmod +x [filename]`해줄 것

---

## 3. 변수

### 3-1. 변수 규칙

* 영문, 숫자, _ 만 사용 가능
* unix shell에서는 변수명을 **대문자**로 작성하는 것이 관습
  * `$변수명`: 변수사용
    * script내에서 선언한 변수 뿐만이 아닌 환경변수, 쉘변수도 `$변수명`으로 읽어올 수 있음
  * `readonly 변수명`: 읽기 전용 변수로 선언
  * `unset 변수명`: 변수 할당 해제

```shell
# name.sh
#!/bin/sh
NAME=park
echo $NAME
readonly NAME
NAME=kim 📌error
echo $NAME
```

```shell
$ ./name.sh
$ chmod +x name.sh
$ ./name.sh
```

### 3-2. 특수목적 변수

* `$$` : 현재 쉘의 프로세스 아이디
* `$0` : 현재 스크립트의 파일 이름
* `$n`: 스트립트 실행시 넘겨준 n번째 인자
* `$#`: script에 넣어준 인자의 개수
* `$*`: 모든 인자를 ""로 감싸서 반환
* `$@`: 각 인자를 ""로 감싸서 반환
* `$?`: 마지막으로 실행된 명령어의 종료 상태
* `$!`: 마지막 백그라운드 명령어의 프로세스 아이디

```shell
#!/bin/sh
echo "PID: $$"
echo "fileName: $0"
echo "firstParam: $1"
echo "secondParam: $2"
echo "quote @: $@"
echo "quote *: $*"
echo "totalNum: $#"
```

* `$*`와 `$@` 다른 점

```shell
# test.sh
#!/bin/sh
echo "arg1: $1"
echo "arg2: $2"
```

```shell
# test-quote.sh
#!/bin/sh
echo '$* without quotes'
./test.sh $*
echo '$@ without quotes'
./test.sh $@
echo '$* with quotes'
./test.sh "$*"
echo '$@ without quotes'
./test.sh "$@"
```

```shell
$ chmod +x test.sh test-quote.sh
$ ./test-quote 1 2
```

* `$?` & `$!`

```shell
# success.sh
#!/bin/sh
echo "success"
exit 0
# fail.sh
#!/bin/sh
echo "fail"
exit 1
```

```shell
# exec.sh
#!/bin/bash
./success.sh
if [ $? -ne 0 ]; then
	echo "failed"
	exit 1
fi
sleep 10 &
echo "back pid: $!"
echo "success step"
```

---

## 4. if 조건문

* if 는 항상 `fi`로 닫음
* 조건 뒤에는 `; then`으로 다음 수행 알려줌

```shell
# sh if문 기본 틀
if [ 조건 ]; then
    [if script]
elif [ 조건2 ]; then
    [elif script]
else
    [else script]
fi⭐⭐⭐
```

---

## 5. case 조건문

* case는 항상 `esac`으로 닫음
* case 대상 변수 뒤에는 in과 pattern이 와야함
* 위에서부터 차례대로 확인
* `*)`는 디폴트, if문의 else의 역할
* 조건문에 정규표현식 사용 가능

```shell
case [word] in
[조건1])
    조건1 결과
    ;;
[조건2])
    조건2 결과
    ;;
*)
    모든 조건 충족 안됐을 때
    ;;
esac
```

```shell
# case.sh
#!/bin/sh
OPTION-"${1}"
case ${OPTION} in
    -f) FILE="${2}"
        echo "filename: $FILE"
        ;;
    -d) DIR="${2}"
        echo "dirname: $DIR"
        ;;
    *)
        echo "error"
```

---

## 6. 기본연산자

* awk/expr 등과 같은 외부 프로그램 사용

```shell
$ expr 2 + 2
$ expr 4\* 2
$ expr 4 % 2
```

* 산술연산자
  * `+`: `expr $a + $b`
  * `-`: `expr $a - $b`
  * `*`: `expr $a \* $b`
  * `/`: `expr $a / $b`
  * `%`: `expr $a % $b`
  * `=`: `expr a = $b` b의 값이 a에 할당
  * `[ $a=$b ]`: 값이 같은 경우에 true, 값 비교
  * `[ $a != $b ]`: 값이 다른 경우에 true
    * [] 사이 공백 필수
* 관계연산자
  * `-eq`: 두 값이 같은 경우 true
  * `-ne`: 두 값이 다른 경우 true
  * `-gt`: `a>b`(초과)인 경우 true
  * `-lt`: `a<b`(미만)인 경우 true
  * `-ge`: `a<=b`(이상)인 경우 true
  * `-le`: `a>=b`(이하)인 경우 true

* bool
  * `!`: 논리적 부정
  * `-o`: OR
  * `-a`: AND

---

## 7. while 문

* `while ~ do ~ done`

```shell
a=0
while [ $a -lt 10 ]
do  
    # -n 개행을 없앰
    echo -n "$a"
    a = `expr $a + 1`
done
```

---

## 8. single quote

* ?[]"`\`$;()|^<>`: 메타캐릭터로 특수한 목적으로 사용됨
* `''`을 이용하면 위의 특수 목적 문자를 출력할 수 있음
* ``을 이용하여 shell명령어 사용 가능

---

## 9. escape sequence

* `echo -e`: backslash escape

  * `\\`: backslash

  * `\a`: alert

  * `\b`: backspace

  * `\c`: 줄바꿈 삭제

  * `\f`: form양식

  * `\n`: 줄바꿈

  * `\r`: 맨 앞으로 이동

  * `\t`: 가로방향 탭

  * `\v`: 새로방향 탭

  ```shell
  echo -e "hi\nhellos"
  ```

---

## 10. function

* `function_name() {}`: 함수 선언
* `function_name`: 함수 사용
* `function_name param1 param2`: 함수에 파라미터 param1 param2 전달

```shell
Hi() {
  echo "Hello World $1"
  return 10
}
Hi jy 
```

 
