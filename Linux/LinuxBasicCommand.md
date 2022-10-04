# Linux 기본 명령어

## 1. basic

### 1.`--help` `-h`

* `명령어 --help`: 명령어 사용법

```shell
$ cd --help
```



### 2. `man`

* `man 명령어`: 명령어에 대한 메뉴얼

```shell
$ sudo apt install man-db
$ minimize
# find의 활용법에 대해 알려줘(j와 k로 위아래 움직이기 가능)
$ man find
```



### 3. `cd`(Change Directory)

* 지정한 디렉토리로 이동
* `/`: root. 시스템의 가장 시작 or 디렉토리 구분자
* `~`: home. 로그인한 유저의 home경로
* `..`: 상위 디렉토리
* `.`: 현재 디렉토리
* `-`: 이전 위치

```shell
$ cd ~
$ cd ..
$ cd .
$ cd -
```



### 4. `pwd`(Print Work Directory)

* 현재 터미널이 위치한 디렉토리 경로
* `/`: root directory
* `~`: 현재 로그인한 유저의 home directory

```shell
$ pwd
```



### 5. `ls`(List Segments)

* 디렉토리의 파일 정보
* `ls-al`: 숨김파일과 파일의 모든 정보 표시
* `ls-il`: 파일 또는 디렉토리의 inode number 표시
  * inode란 리눅스에서 파일 또는 디렉토리의 고유 식별 부호, 파일 이름이 바뀌어도 유지됨
* `ll [directory]`: ls -l과 동일하며 권한, 소유자, 갱신일 등 확인 가능

```shell
$ ls
$ ls -al
$ ls -il
```



### 6. `mkdir`(Make Directory)

* 폴더(디렉토리) 만드는 명령어
* 기본은 상대경로, 모든 경로 입력하면 절대경로로 폴더 생성

```shell
$ mkdir test
```



### 7. `rm`(remove)

* 지정한 파일 지움, 지우기 전에 한 번 더 되물음
* `-f`옵션 : 되묻지 않고 강제로 지움
* `-r`(recursive)옵션: 디렉토리와 디렉토리 안의 모든 내용을 지울 수 있음
* `rmdir`(remove directory)=`rm -r`: 디렉토리 삭제



### 8. `df`(Disk Filesystem)

* 디스트 공간에 대한 정보를 볼 수 있음
* `-h`옵션: human readable, 보기 쉽게 바꿔주는 옵션

```shell
$ df -h
```



### 9.`du`(Disk Usage)

* 디스크 사용량, 사용률을 볼 수 있음
* `-h`: human readable
* `-s`: summary, 전체 디스크 사용량
* `-d`: max-depth를 지정해서 해당 depth만큼 보여줌

```shell
$ du -h
# 전체 사용량
$ du -sh
# du -d [n]
$ du -h -d 2
```



### 10. `chmod`(Change Mode)

* 파일의 접근 권한 변경

* 파일 권한의 종류

  * `r`(read,4), `w`(write,2), `x`(execute,1)

* 파일 권한의 범위

  * `u`(user, 파일소유자), `g`(group), `o`(other), `a`(all, 모든 사용자)

  ```shell
  # check user
  $ echo $USER
  $ whoami
  # check groups
  $ groups
  $ groups [username]
  ```
  
* 변환 방법

  * `+`(추가), `-`(제거), `=`(지정)

  * | Filetype               | owner          | group          | other          |
    | ---------------------- | -------------- | -------------- | -------------- |
    | `d`(폴더) or `-`(파일) | r(4) w(2) x(1) | r(4) w(2) x(1) | r(4) w(2) x(1) |

    ```shell
    $ ll
    ⭐drwx------⭐ 1 root root 4096 Sep 29 16:20 ./
    ⭐drwxr-xr-x⭐ 1 root root 4096 Sep 27 17:13 ../
    # 모든 user에게
    $ chmod +x test.txt
    # user에게만 exec권한 부여
    $ chmod u+x test.txt
    # group, other에게 exec권한 부여
    $ chmod g+x,o+x test.txt
    # user-모든권한/group-읽기,쓰기/other-권한x
    $ chmod 760 test.txt
    ```

### 11. `touch`

* 빈 파일 생성

```shell
# touch [filename]
$ touch test
```



### 12. `cat`

* 파일 내용을 출력

```shell
$ echo "hello" >> test
$ cat test
```



### 13. `echo`

> 참고사이트: https://jjeongil.tistory.com/997

* 인수로 전달되는 텍스트/문자열을 표시하는데 사용 (python의 print느낌)
* 파이프와 함께 많이 사용
* `echo $(command)` 로 다른 명령어의 결과 확인 가능

```shell
# echo [option] [string]
$ echo "hello"
$ echo $(ls)
```



### 14. `head`

* 파일 또는 파이프된 데이터의 시작점을 볼 수 있음

```shell
$ man find > test.txt
$ head test.txt
# 앞에서 5번째 줄만 보여줘
$ head -n 5 test.txt
```



### 15. `tail`

* 파일 또는 파이프된 데이터의 끝점을 볼 수 있음

```shell
$ tail test.txt
# 끝에서 3번째 줄만 보여줘
$ tail -n 3 test.txt
```

* `tail -f $filename` : 실시간으로 append되는 내용을 확인할 수 있음

```shell
$ while sleep 1; do echo "hello world at $(date +%s)" >> test.log; done &
$ tail -f test.log
$ ps -ef | grep sleep
$ kill -9 $pid
```



### 16. `comm`(compare)

* 두 파일을 라인별로 비교
* 옵션과 함께 사용

```shell
# > 원래 있던 내용은 포맷하고 이 내용을 넣어줘
$ echo "hello1" > test.txt
# >> 마지막 줄에 넣어줘
$ echo "hello2" >> test.txt
$ cp test.txt test1.txt
$ echo "hello3" >> test1.txt
$ comm test.txt test1.txt
$ comm -12 test.txt test1.txt
```



### 17.`cmp`(compare)

* 두 파일을 byte로 비교

```shell
$ cmp test.txt test1.txt
```



### 18. `diff`(difference)

* 두 파일을 라인별로 비교해서 차이점만 보여줌
* `a`(add), `c`(change), `d`(delete)

```shell
$ diff test.txt test1.txt
```



### 19. `less`

*  페이지 단위로 로드하기 때문에 메모리 사용량 적음
* vi는 **편집** 용도, less는 **확인** 용도
* 로그 파일 볼 때 활용하기 좋음

```shell
$ apt install less
# j or k로 윗아래 줄 옮겨다닐 수 있음
$ less test.txt
```



### 20. `ln -s `

> 참고사이트: https://server-talk.tistory.com/140

* `ln -s $ORIGIN_PATH $TARGET_PATH`

* **symbolic link** 만들기
  * 윈도우의 바로가기 파일과 같은 역할

```shell
$ ln -s ../test/test.txt test
# 폴더도 가능
$ ln -s test1dir test2dir
```



### 21. `alias`

* 별칭 지정
* 환경변수 추가해야 지속적으로 사용 가능

```shell
$ alias hi='echo hi $@'
$ hi jy
```



### 22. `cp`(copy)

* 복사하기

```shell
# cp [복사할 파일이름] [저장할 파일이름]
cp hello hello_copy
# 디렉토리 복사
cp -r dir dir_copy
```



### 23. `mv`(move)

* 파일이나 디렉토리 이동

``` shell
# 파일 이름 바꾸기
$ mv hello.txt hi.txt
# 파일을 다른 폴더로 옮기기
$ mv hello.txt test/
# 이름 바꾸면서 다른 폴더로 옮기기
$ mv hello.txt test/hi.txt
```



### 24. `find`

* `find [filename or directoryname]`

* `find . -name [filename]`

* `find . -name [filename] -mindepth [n]`

* `find . -maxdepth [n] -name [filename]` 

```shell
# test로 시작하는 파일 찾아줘
$ find . -name 'test*'
# 사이에 es 들어오는 파일 찾아줘
$ find . -name '*es*'
# 사이에 숫자 들어오는 파일 찾아줘
$ find . -name '*[0-9]*'
# 상위/하위 폴더 위치 지정해서 찾을 수도 있음
$ find . -name '*[0-9]*' -mindepth 1
$ find . -maxdepth 1 -name '*[0-9]*'
```



### 25. `which`

* `$PATH`에 등록된 경로 중에서 주어진 이름의 실행 파일 위치 찾음
* 사용하고 있는 명령어가 설치된 위치를 알려줌

```shell
$ which sudo
$ which python
$ which $PATH
```



### 26. `grep`

* 대량의 파일에서 주어진 텍스트 또는 정규 표현식 패턴에 일치하는 텍스트를 찾는 명령어
* 파이프(`|`)와 함께 다양한 명령어와 조합하여 사용
* `-n` 옵션: 몇 번째 줄인지 표시해줌
* `-r` 옵션: 디렉토리에서 텍스트를 찾아줌 

```shell
$ netstat -nlpt | grep 22
$ grep 'the' test.txt
# search directory
# 현재 경로에서 the 검색해줘
$ grep -r 'the' .
$ grep -rn '[1-9]0\{4\}' | grep 'the'

```



### 27. `sed`

* `sed 's/바꿀대상/바꾸고자하는결과/g' 대상파일` : 대상 파일에 대해 바꾸고 싶은 대상에 대해 원하는 결과물로 바꿔줌
  * `g`(global): 모든 대상을 바꿔줌 g가 없으면 맨 앞에 하나만 바꿔줌
* vim 에서 `:%s/바꿀대상/바꾸고자하는결과/g`로 바꿀 수 있음
* `-i` 옵션: 파일에 바로 저장
* `-e`옵션: 여러개 바꾸기

```shell
$ sed -i 's/the/a/g' test.txt
$ sed -e 's/the/a/g' -e 's/THE/A/g' test.txt
```



### 28. `xargs`

> 참고사이트: https://jjeongil.tistory.com/1574

* 파이프 앞의 명령어를 뒤의 명령어 맨 뒤 인수로 넣어줘



### 29. `uname`

* 이름, 버전, 기타, 시스템 정보 확인
* `-a` 옵션: all
* `-s` 옵션: 커널이름
* `-m` 옵션: 하드웨어
* `-n` 옵션: 노드 이름(=hostname)

```shell
uname -a
# kernel name
uname -s
# hardware name
uname -m
# node name
uname -n
```



### 30. `ps`(process)

> 참고사이트: https://jhnyang.tistory.com/268

* `top`명령어 사용해도 됨

* 현재 실행중인 프로세스 보여줌
* 어떤 프로세스에 문제가 있는지 보여줌
* 내가 실행한 어플리케이션 프로세스의 상태 보여줌
* `-ef` 옵션: process들의 상태 확인
* `aux` 옵션: peocess들의 상태 cpu,메모리 사용률과 함께 확인
* `grep`: 파이프와 함께 써서 원하는 프로세스만 확인 가능

```shell
$ top
$ ps -ef
$ ps aux
$ ps aux | grep python
# &은 백그라운드 실행
$ sleep 1000 &
$ ps -ef | grep sleep
```



### 31. `kill`

* 프로세스 종료 시킬 때 사용
* `kill -9 $pid` : 프로세스 강제 종료
* `kill -15 $pid`or`kill $pid` : 종료하겠다는 신호 보냄, k8s에서 많이 씀



### 32. `shutdown`

* 시스템 종료



### 33. `halt`

* 시스템 강제 종료



### 34. `reboot`

* 시스템 재시작



### 35. `ss`(socket status)

* 네트워크, 소켓의 사용을 쉽게 확인할 수 있음
* 열려있는 포트 확인할 때 사용
* `less`, `grep` 등과 함께 사용 
* `netstat`가 더 가독성이 좋음

```shell
$ ss
# 열려있는 모든 소켓
$ ss -a
# listening된 소켓
$ ss -l
# tcp 소켓
$ ss -t
# udp 소켓
$ ss -u
# 소켓 상태 통계
$ ss -s
# process name과 pid 함께 표시
$ ss -p
# extended output
$ ss -e
# memory 사용량
$ ss -m
```



### 36. `netstat`

> 참고사이트: https://miiingo.tistory.com/256

* 다양한 네트워크 설정 사항이나 통계 정보 확인
* `-n` 옵션: 도메인 주소를 IP(숫자)로 표시
* `-l` 옵션: listening된 네트워크만 표시
* `-p` 옵션: PID 또는 프로그램 이름 표시
* `-t` 옵션: tcp 프로토콜

```shell
$ sudo apt install net-tools
$ sudo netstat -nlpt | grep [port_num]
```



### 37. `clear`

* 터미널 창 깨끗하게



### 38. `history`

* 지나간 터미널 명령어의 기록
* 세션 종료하면 사라짐
* `!num`으로 다시 불러올 수 있음

```shell
$ history
$ history | grep install
$ echo $(!127)
```



### 39. `redirection`

* 출력 결과를 파일에 저장할 때
* `>`: 기존 파일의 내용을 지우고 저장
* `>>`: 기존 파일의 맨 마지막 줄에 저장
* `<`: 파일의 데이터를 명령어에 입력

```shell
# 라인의 갯수 세어줘
$ wc -l < test.txt
```

* `<<`: 지정한 단어까지의 데이터를 명령어에 입력

```shell
$ test.txt << END
> 1
> 2
> 3
> 4
> 5
> END
```



### 40. `stdout`,`stderror`

* Process의 표준 입출력 제어
* `1>`: stdout을 지정된 파일에 저장
* `2>`: stderror를 지정된 파일에 저장
* `2>&1 또는 &>`: stderror를 stdout에 포함시켜서 저장
*  `>/dev/null`: 출력 결과를 **제거**

```shell
$ find . -name "test*" 1> ~/stdout.log 2> ~/stderror.log
# 아래 두 명령어는 같음
$ find . -name "test*" 1> ~/both.log 2>&1
$ find . -name "test*" &> ~/both.log
# error만 볼거야
$ find . -name "test*" 1> /dev/null 2> ~/stderror.log
```

---

## 2. vi 명령어

### 1. `esc`

* 이동모드, 편집할 수 없음
* 라인 숫자 같이 보기
  * `:set number`: number mode on
  * `set nonumber`: number mode off



### 2. 커서 이동

* `h`: 왼쪽으로 커서 이동
* `j`: 아래로 커서 이동
* `k`: 위쪽으로 커서 이동
* `l`: 오른쪽으로 커서 이동
* `w`: 다음 단어로 커서 이동
* `b`: 이전 단어로 커서 이동



### 3. 행 이동

* `gg`: 첫 행으로 이동
* `shift+ g`: 마지막 행으로 이동
* `^`: 현재 행의 첫 단어로 이동
* `$`: 현재 행의 마지막 단어로 이동
* `:[num]`: 타이핑한 숫자에 해당하는 행으로 이동

* `[num] + shift + g`: 타이핑한 숫자에 해당하는 행으로 이동
* `[num] + enter`: 해당 숫자 만큼 아래로 행 이동 



### 4. 문자 검색 이동

* 정규식 이용 가능
* `/문자열+enter` : 커서 다음부터 문자열 검색
* `?문자열+enter`: 커서 이전부터 문자열 검색
* `n`: 정방향 검색 반복
* `N`: 역방향 검색 반복



### 5. 입력

* `i`: 현재 커서 위치에 글자 추가
* `I`: 현재 줄 처음 글자에 추가
* `a`: 현재 커서 다음 위치에 추가
* `A`: 현재 줄 마지막 글자에 추가
* `o`: 아래 줄에 추가
* `O`: 윗 줄에 추가
* `s`: 현재 커서 글자 지우고 입력모드로 전환
* `r`: 현재 커서 글자 지우고 한 글자 입력 받아 바꾼 뒤 명령모드로 전환



### 6. 삭제

* `x`: 현재 커서 위치 문자 삭제
* `X`: 현재 커서 위치 이전 문자 삭제
* `dw`: 현재 커서 위치 단어 삭제
  * `[num] + dw`: 숫자만큼의 단어 삭제
* `db`: 현재 커서 위치 이전 단어 삭제
* `dd`: 현재 커서 위치 줄 삭제
  * `[num] + dd`: 숫자만큼의 줄 삭제

* `d^`: 현재 줄에서 현재 커서 위치 이전 문자열을 마지막 문자까지 삭제
* `d0`: 현재 줄에서 현재 커서 위치 이전 문자열을 끝까지 삭제
* `d$`: 현재 줄에서 현재 커서 위치 이후 끝까지 삭제



### 7. 복사 붙여넣기

* `shift+v`: 라인 전체 선택

* `y`: 복사, w, b, ^, 0, $ 등 다른 이동 표현과 함께 쓰면 그만큼 복사
* `yw`: 현재 커서 이후 단어 복사
  * `[num] + yw`: 숫자 만큼의 단어가 복사됨

* `yb`: 현재 커서 이전 단어 복사
  * `[num] + yb`: 숫자 만큼의 이전 단어 복사
* `yy`: 현재 줄 복사
  * `[num] + yy`: n줄 복사
* `p`: 복사된 항목을 현재 커서 이후에 붙여넣기
* `P`: 복사된 항목을 현재 커서 이전에 붙여넣기
* `u`: esc 명령보드에서 undo
* `Ctrl+r`: esc 명령모드에서 redo



### 8. 여러 파일 열기

* `vi file1 file2 file3`
  * `:n`: 다음 파일로 이동
  * `:N`: 이전 파일로 이동
  * `:ls`: 현재 열려있는 파일 리스트
  * `:b[num]`: 숫자에 해당하는 버퍼로 이동
  * `:bd[num]`: n번째 파일 닫기
  * `bw`: 현재 파일 닫기
  * `:e [tab] or [filename]`: 해당 파일을 현재 vi창에서 새로운 파일로 열기
  * `:cd [tab] or [filename]`: 해당 **디렉토리**로 이동
  * `:! [shellCommand]`: vi 내에서 쉘 명령어 쓰기
  * `:split`: 현재 열려있는 파일과 같은 파일을 **수평**으로 나눠서 열기
  * `:split [filename]`: 다른 파일을 현재파일과 함께 **수평**으로 나눠서 보기
  * `:vsplit` : 현재 열려있는 파일과 같은 파일을 **수직**으로 나눠서 열기
  * `:vsplit [filename]`: 다른 파일을 현재파일과 함께 **수직**으로 나눠서 보기
* 화면 분할 상태에서 파일 이동
  * `Ctrl+w+j`: 아래 파일로 이동
  * `Ctrl+w+k`: 위 파일로 이동
  * `Ctrl+w+l`: 오른쪽 파일로 이동
  * `Ctrl+w+h`: 왼쪽 파일로 이동
* 화면 분할 상태에서 창 크기 조절
  * 좌우
    * `Ctrl+w+=`: 균일 상태
    * `Ctrl+w+>`: 오른쪽 1칸 확장
    * `Ctrl+w+[num]+>`: 오른쪽 n칸 확장
    * `Ctrl+w+<`: 왼쪽 1칸 확장
    * `Ctrl+w+[num]+<`: 왼쪽 n칸 확장
  * 상하
    * `Ctrl+w+=`: 균일 상태
    * `Ctrl+w+'+'`: 위로 1칸 확장
    * `Ctrl+w+[num]'+'`: 위로 n칸 확장
    * `Ctrl+w+'-'`: 아래로 1칸 확장
    * `Ctrl+w+[num]'-'`: 아래로 n칸 확장
    * `Ctrl+w+'_'`: 해당 윈도우가 위아래 모든 칸 차지

⭐`tmux`

---

## 3. 환경변수

> 참고사이트:https://jjig810906.tistory.com/62

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

  
