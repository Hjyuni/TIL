# PostgreSQL

> download : https://www.postgresql.org/download/ (window installer 클릭!)

* download할 때 stack builder 안쓸거면 체크 해제하기
* 환경변수 설정
  * 제어판 - 시스템 및 보안 - 시스템 - 설정변경 - 고급 - 환경변수
  * Path에 Postgre bin경로 넣기: `C:\Program Files\PostgreSQL\14\bin`

* cmd

```shell
# version확인
psql --version
# postgres 접속하기
# psql -U 사용자계정
psql -U postgres
# 접속완료
# 여기서 postgre는 db명
postgres=#
```

* SQL shell 명령어

| 명령어 | 설명                               |
| ------ | ---------------------------------- |
| \?     | 도움말                             |
| \q     | psql 종료                          |
| \l     | db 조회                            |
| \c     | 입력한 db로 이동 (ex. \c postgres) |
| \e     | 외부편집기로 SQL쿼리 입력 가능     |
| \dt    | 현재 db의 테이블 확인              |

---

## 1) db/테이블 생성&삭제

1. db 생성&이동하기
   * `CREATE DATABASE db이름;` : 생성
   * `\c db이름;` : db이름으로 이동하기
   * db명은 **소문자만** 입력 가능(대문자로 입력해도 소문자로 바뀜)
2. db 삭제하기
   * `DROP DATABASE db명;` : db 삭제하기
   * **현재 접속**되어 있는 상태에서 삭제 **불가능**
3. table 생성하기
   * `CREATE TABLE table이름` : table 생성
   * `\dt`로 현재 db의 table 목록 확인 가능
4. table 삭제하기
   * `DROP TABLE table이름` : table 삭제



## 2) 데이터 입력하기

* `INSERT INTO TABLE이름 VALUES(입력할 데이터1,데이터2,,,)`

* 순서를 정해서 집어 넣거나 데이터를 생략해서 집어넣거나 한번에 여러개 넣을 수 있음
