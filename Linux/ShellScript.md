# ShellScript

## 1. shell script란?

* CLI환경에서 실행할 수 있는 명령어 리스트

* 위에 아래와 같은 표시가 있다면 shell script

  > 참고사이트1: https://storycompiler.tistory.com/101
  >
  > 참고사이트2: http://choesin.com/zsh-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%99%9C-bash-%EB%8C%80%EC%8B%A0-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%A9%EB%8B%88%EA%B9%8C

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

