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
    * `LIMIT` & `OFFSET` 사용할 때 주의점 : postgreSQL은 ORDER BY 를 하지 않으면 실행 결과의 순서를 보장하지 않음. 따라서 ORDER BY를 꼭 해줘야 함
    * 참고사이트: https://blog.billo.io/devposts/psql_offset_wo_order_by/
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

 

## 6) 데이터 유형

1. 숫자형
   * `INTEGER` or `INT` : 정수, -2147483648 ~ +2147483648 범위 내의 숫자 정보
   * `NUMERIC(p,q)` : 소수점도 정확히 입력받아야 할 때(=`DECIMAL`)
     * p : 전체 자리수
     * q : 소수점 자리 수
     * ex > NUMERIC(5,3) = 전체 길이 5, 소수점 3자리 수 (10.001, 23.999 ,,,,)
   * `FLOAT` : 부동소수점, `REAL` 또는 `DOUBLE PRECISION`으로 인식
   * `SERIAL` : `INTEGER` 기본 값으로 1씩 추가되고 값이 자동 생성, **pk데이터 타입으로 주로 사용**



2. 화폐형

* 금액을 저장하는 데이터 타입, 분수의 형태로 금액 저장
* 분수의 정밀도는 `lc_monetary` 설정에 따르며 테이블에선 소수점 두 자리수까지 표현
* 다양한 형식의 입력 가능, 출력은 `Locale` 설정에 따름
  * `Locale`이란 : 각 나라별로 국가, 지역, 언어코드 등 표시하는 방법이 다른데 이에 따른 식별자를 이용하면 각 나라에 맞는 사용자 인터페이스로 변경 가능



3. 문자형

* `VARCHAR(n)` : 가변적인 문자열 길이, n을 지정하지 않으면 임의의 길이의 **모든 문자열 허용**
* `CHAR(n)`: 문자길이+공백 으로 n의 크기에 맞게 저장되는 문자열
* `TEXT` : 길이에 상관없이 문자열 저장



4. 날짜 및 시간

* `TIMESTAMP` : 날짜와 시간 정보 모두 나타냄
  * `TIMESTAMP WITHOUT TIME ZONE`=`TIMESTAMP`: 현재 세계 표준시(UTC), 시간대 정보 반영 **없음**
  * `TIMESTAMP WITH TIME ZONE`=`TIMESTAMPTZ`: 현재 세계 표준시(UTC)+**시간대 정보 반영**
  * 참고사이트: https://blog.billo.io/devposts/psql_at_time_zone/
    * `TIMESTAMP(p)`: '초' 단위의 소수점 값 정확하게 표현 가능, 허용 범위 0~6
    * ex> `TIMESTAMP(6)`: HH:MM:SS.pppppp
* `DATE` : 날짜 정보만
* `TIME` : 시간 정보만
  * `TIME WITHOUT TIME ZONE`=`TIME`: 시간대 정보 반영하지 않음
    * `TIME WITH TIME ZONE`: 시간대 정보 반영



5. 불리언(boolean)

* 논리 데이터 타입이라고도 함
* `True`/`False`/`Null`를 나타냄
  * `True` : True, yes, on, 1
  * `False` : False, no, off, 0
  * `Null` : 알 수 없는 정보, 일부 불확실



6. 배열(Array)

* 여러 데이터를 하나의 집합으로 관리하기 위한 데이터 타입

* 배열 타입 입력할 때

  * 테이블 생성시에는 데이터타입[] 형태로 입력 (`INTEGER[]`,`VARCHAR[]`,,,)

  * 데이터 입력 시에는`Array[data1,data2,,]`형태 또는 `{data1,data2,,}`타입으로 입력할 수 있음



7. JSON(JavaScript Object Notation)형

* 서버와 웹 어플리케이션 간에 테이터를 주고 받을 때 사용
* 키(key)-값(value) 의 쌍으로 구성된 **JSON 오브젝트**와 배열과 비슷한 구조를 갖는 **JSON배열**로 나뉨
* JSON 데이터 타입 : `JSON` , `JSONB`
  * 두 데이터 타입 모두 동일한 값의 집합을 받아들이는 공통점 있음
  * `JSON`은 입력 텍스트를 정확한 사본을 만들어서 저장, 이것을 불러와 처리할 때는 데이터를 재분석한 다음 실행
  * `JSONB`은 텍스트를 이진 형태로 분해 후 저장해서 입력이 느리지만 출력 시에는 재분석 하지 않아서 **JSON보다 처리속도 빠름**



8. `CAST` : 데이터 타입 형변환

* CAST 연산자: `CAST (표현식 AS 바꿀 데이터 타입)`
* CAST형 연산자: `값::바꿀 데이터 타입`



## 7) 데이터 값 제한하기

* 무결성
  * 개체 무결성(Entity integrity) : 모든 테이블이 pk를 가져야 하고, pk는 중복값이 없어야 하며 null값을 허용하면 안된다는 속성
  * 참초 무결성(Referential integrity) : fk값이 null이 거나 참조된 테이블의 pk값과 동일해야하는 속성
  * 범위 무결성(Domain integrity) : 사용자가 정의한 도메인 내에서 관계형 db의 모든 열을 정의하도록 규정하는 속성
    * 도메인이란? 
    * 기본 데이터 타입을 기반으로 선택적으로 제약조건을 걸 수 있는 **사용자 정의 데이터 타입**



* 컬럼 값 제한하기

  1. NOT NULL : 빈 값(NULL)을 허용하지 않음
  2. UNIQUE : 유일한 값을 가져야 한다(NULL 허용)
  3. PRIMARY KEY (=주 식별자, 주 키, PK) : UNIQUE + NOT NULL, 데이터 타입으론 SERIAL 씀
  4. FOREIGN KEY
  
     * 부모 테이블이 자식 테이블보다 먼저 생성되어야 함
  
     * 부모 테이블은 자식 테이블과 같은 데이터 타입을 가져야 함
  
     * 부모 테이블에서 참조된 컬럼의 값만 자식 테이블에서 입력 가능
  
     * 참조되는 컬럼은 pk이거나 UNIQUE 제약조건 형식이어야 함
  
       * 컬럼 명이 참조하는 컬럼과 같은 경우 -> `REFERENCES 참조하는 테이블명`
  
       * 컬럼 명이 참조하는 컬럼과 다른 경우 -> `REFERENCES 참조하는 테이블명(참초하는 컬럼명)`
  
     * 기본적으로 부모 테이블은 자식 테이블보다 먼저 삭제 또는 수정 될 수 없지만 추가 조건을 부여하면 가능
  
       1) `ON DELETE/UPDATE NO ACTION` : DEFAULT
       2) `ON DELETE/UPDATE RESTRICT` : 지울 수 없음
       3) `ON DELETE/UPDATE SET NULL` : 부모 테이블이 지워지면 자식테이블의 참조하는 데이터는 NULL처리
       4) `ON DELETE/UPDATE CASCADE ` : 부모 테이블이 지워지면 자식테이블의 참조하는 행도 같이 지워버림
       5) `ON DELETE/UPDATE SET DEFAULT` : 부모 테이블 삭제시 자식테이블 생성했을 때에 정해놓은 DEFAULT값으로 대체, 이 때 **DEFAULT 값도 외래키 제약조건을 만족해야 함**
  5. CHECK
     * CHECK 뒤에 나오는 식이 불리언 타입의 True를 만족해야 함
