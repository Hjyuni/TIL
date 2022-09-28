# Linux 기본 명령어

## 1.`--help` `-h`

* `명령어 --help`: 명령어 사용법

```shell
$ cd --help
```



## 2. `man`

* `man 명령어`: 명령어에 대한 메뉴얼

```shell
$ sudo apt install man-db
$ minimize
# find의 활용법에 대해 알려줘(j와 k로 위아래 움직이기 가능)
$ man find
```



## 3. `cd`(Change Directory)

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



## 4. `pwd`(Print Work Directory)

* 현재 터미널이 위치한 디렉토리 경로
* `/`: root directory
* `~`: 현재 로그인한 유저의 home directory

```shell
$ pwd
```



## 5. `ls`(List Segments)

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



## 6. `mkdir`(Make Directory)

* 폴더(디렉토리) 만드는 명령어
* 기본은 상대경로, 모든 경로 입력하면 절대경로로 폴더 생성

```shell
$ mkdir test
```



## 7. `rm`(remove)

* 지정한 파일 지움, 지우기 전에 한 번 더 되물음
* `-f`옵션 : 되묻지 않고 강제로 지움
* `-r`(recursive)옵션: 디렉토리와 디렉토리 안의 모든 내용을 지울 수 있음
* `rmdir`(remove directory)=`rm -r`: 디렉토리 삭제



## 8. `df`(Disk Filesystem)

* 디스트 공간에 대한 정보를 볼 수 있음
* `-h`옵션: human readable, 보기 쉽게 바꿔주는 옵션

```shell
$ df -h
```



## 9.`du`(Disk Usage)

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



## 10. `chmod`(Change Mode)

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



## 11. `touch`

* 빈 파일 생성

```shell
# touch [filename]
$ touch test
```



## 12. `cat`

* 파일 내용을 출력

```shell
$ echo "hello" >> test
$ cat test
```



## 13. `echo`

> 참고사이트: https://jjeongil.tistory.com/997

* 인수로 전달되는 텍스트/문자열을 표시하는데 사용 (python의 print느낌)

```shell
# echo [option] [string]
$ echo "hello"
```



## 14. `head`

* 파일 또는 파이프된 데이터의 시작점을 볼 수 있음

```shell
$ man find > test.txt
$ head test.txt
# 앞에서 5번째 줄만 보여줘
$ head -n 5 test.txt
```



## 15. `tail`

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



## 16. `comm`(compare)

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



## 17.`cmp`(compare)

* 두 파일을 byte로 비교

```shell
$ cmp test.txt test1.txt
```



## 18. `diff`(difference)

* 두 파일을 라인별로 비교해서 차이점만 보여줌
* `a`(add), `c`(change), `d`(delete)

```shell
$ diff test.txt test1.txt
```



## 19. `less`

*  페이지 단위로 로드하기 때문에 메모리 사용량 적음
* vi는 **편집** 용도, less는 **확인** 용도
* 로그 파일 볼 때 활용하기 좋음

```shell
$ apt install less
# j or k로 윗아래 줄 옮겨다닐 수 있음
$ less test.txt
```



## 20. `ln -s `

> 참고사이트: https://server-talk.tistory.com/140

* `ln -s $ORIGIN_PATH $TARGET_PATH`

* **symbolic link** 만들기
  * 윈도우의 바로가기 파일과 같은 역할

```shell
$ ln -s ../test/test.txt test
# 폴더도 가능
$ ln -s test1dir test2dir
```



## 21. `alias`

* 별칭 지정
* 환경변수 추가해야 지속적으로 사용 가능

```shell
$ alias hi='echo hi $@'
$ hi jy
```



## 22. `cp`(copy)

* 복사하기

```shell
# cp [복사할 파일이름] [저장할 파일이름]
cp hello hello_copy
# 디렉토리 복사
cp -r dir dir_copy
```



## 23. `mv`(move)

* 파일이나 디렉토리 이동

``` shell
# 파일 이름 바꾸기
$ mv hello.txt hi.txt
# 파일을 다른 폴더로 옮기기
$ mv hello.txt test/
# 이름 바꾸면서 다른 폴더로 옮기기
$ mv hello.txt test/hi.txt
```



## 24. `find`

* `find [filename or directoryname]`

* `find . -name [filename]` 

```shell
# test로 시작하는 파일 찾아줘
$ find . -name 'test*'
# 사이에 es 들어오는 파일 찾아줘
$ find . -name '*es*'
# 사이에 숫자 들어오는 파일 찾아줘
$ find . -name '*[0-9]*'
```

