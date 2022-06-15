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



## 3) 데이터 조회하기

* `SELECT 컬럼 FROM 테이블명`
  * `LIMIT` : 반환하는 ROW의 개수 지정
  * `OFFSET` : 반환하는 ROW의 시작시점 지정(postgreSQL : ROW 시작점을 0으로 봄)
  * `ORDER BY` : 반환하는 ROW 정렬할 때 사용
  * `WHERE` : 지정한 ROW만 반환되도록
  * `ORDER BY` : 조회할 데이터 정렬(ASC: 오름차순(default), DESC: 내림차순)
    * 여러 개의 컬럼 정렬도 가능
    * **왼쪽에서 오른쪽 순으로 정렬**
    * SELECT에 나온 컬럼의 순서로 표현 가능
  * 서브쿼리 : 쿼리 안에 쿼리



## 4) 데이터 수정하기

* `UPDATE 테이블명 SET 컬럼명 = 바꿀 데이터 내용 WHERE 수정할 로우 데이터 RETURNING *`
  * `RETURNING`  : 수정한 데이터 바로 조회
  * 만약 WHERE에 아무 내용도 적지 않으면 모든 내용 변함



`+` 테이블 복사하기

`CREATE TABLE 테이블명 AS SELECT * FROM 복사할 테이블 이름`

`+` 테이블 이름 변경하기

`ALTER TABLE 원래 테이블 이름 RENAME TO 테이블 이름`



## 5) 데이터 삭제하기

* `DELETE FROM 테이블명 WHERE 컬럼명 = 삭제할 데이터`

* `DELETE FROM 테이블명` : 모든 데이터 삭제

 
