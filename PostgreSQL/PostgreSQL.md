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
     * documentation : https://www.techonthenet.com/postgresql/primary_keys.php
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



## 8) 테이블 변경하기 (ALTER TABLE)

* 컬럼 추가하기
  * `ALTER TABLE 테이블명 ADD COLUMN 컬럼명 데이터타입 제약조건`
  * 새로운 컬럼을 추가할 때 기존에 있던 열들은 모두 NULL값을 가짐 따라서 만약 ADD COLUMN 뒤 **제약조건에 NOT NULL을 추가하면 오류 발생**
  * 컬럼 생성 후 컬럼에 값을 넣은 후에 다시 NOT NULL 제약조건 추가하면 됨
* 컬럼 수정하기
  * `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 SET 제약 조건`
* 컬럼 삭제하기

  * `ALTER TABLE 테이블명 DROP COLUMN 컬럼명` 

  * `ALTER TABLE 테이블명 DROP COLUMN 컬럼명 CASCADE` : 다른 컬럼이 지우려고 하는 컬럼을 참조할 때 
* 컬럼 이름 변경하기

  * `ALTER TABLE 테이블명 RENAME 기존컬럼명 TO 새컬럼명;`
  * `ALTER TABLE 테이블명 RENAME COLUMN 기존컬럼명 TO 새컬럼명;`
* 제약조건 제거/추가하기
  * `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 DROP 제약조건`
  * `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 ADD 제약조건`
* 데이터 타입 변경하기
  * `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 TYPE 새로운 데이터 타입`
  * `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 SET DATA TYPE 새로운데이터타입;`
* 데이터 값 형변환 동시에 컬럼의 데이터 타입을 바꾸기
  * `USING 컬럼명::새로운데이터타입`



## 9) 연산자와 함수

* 논리 연산자와 비교 연산자 : 조건이 참 또는 거짓인지 판별하는 연산자

  * 논리 연산자 : `AND`, `OR`, `NOT`

  | A    | B    | A `AND` B | A `OR` B | `NOT` A |
  | ---- | ---- | --------- | -------- | ------- |
  | T    | T    | T         | T        | F       |
  | T    | F    | F         | T        | F       |
  | T    | NULL | NULL      | T        | F       |
  | F    | F    | F         | F        | F       |
  | F    | NULL | F         | NULL     | T       |
  | NULL | NULL | NULL      | NULL     | NULL    |

  * 비교 연산자
    * IS TRUE / IS NOT TRUE
    * IS FALSE / IS NOT FALSE
    * ⭐IS NULL / IS NOT NULL



* 범위 연산자 
  * `BETWEEN A AND B` : A 이상 B 이하
  * `NOT BETWEEN A AND B` : A 미만 B 초과



* CASE 함수

  * ```SQL
    CASE
    	WHEN <조건1> THEN <결과1>
    	WHEN <조건2> THEN <결과2>
    	ELSE <결과3>
    END
    ```



* COALESCE 함수
  * 보통 NULL 값을 다른 기본 값으로 대체할 때 자주 사용
  * NULL값이 아닌 첫 매개변수 반환
  * 컬럼을 매개변수로 넣은 경우 해당 컬럼의 데이터 타입과 이후 평가하는 데이터 타입이 일치해야 함
  * `COALESCE(<매개변수1>,<매개변수2>,,,)`



* NULLIF 함수
  * 특정 값을 NULL로 바꾸고 싶을 때 사용
  * `NULLIF(<매개변수1>,<매개변수2>)` 
    * `매개변수1=매개변수2` : NULL 반환
    * `매개변수1<>매개변수2` : 매개변수1 반환



* 배열 연산자
  * `<@` or `@>` : 포함관계 확인
  * `&&` : 원소 단위로 겹침유무 확인, 두 배열을 비교하여 하나라도 겹치는 원소가 있다면 결과는 `TRUE`
  * `||` 배열끼리 병합하거나 원소를 추가하고 싶을 때 



* 배열 함수
  * `array_append(배열, 원소)` : 배열 **맨 뒤**에 원소 추가
  * `array_prepend(원소, 배열)` : 배열 **맨 앞**에 원소 추가
  * `array_remove(배열, 원소)` : 배열의 특정 원소를 **삭제**
  * `array_replace(배열, 원소1, 원소2)` : 배열의 특정 원소(원소1)를 다른 원소(원소2)와 **대체**
  * `array_cat(배열1,배열2)` : 두 배열 **병합**



* JSON 연산자
  * `->` : JSON객체에서 키 값으로 밸류 값을 불러오거나 JSON 배열에서 인덱스로 JSON 오브젝트 불러오기
    * `'{"키1":"값1","키2":"값2"}' -> '키1'`
    * `[{"키1":"값1"},{"키2":"값2"}] -> 인덱스번호` 
  * `->>` : JSON 오브젝트, JSON 배열 속 데이터 텍스트로 불러오기
    * ` '{"키1":"값1","키2":"값2"}' ->> '키1' `
  * `#>` : 특정한 경로의 값 가져오기
    * `'{"키1":"값1","키2":"값2"}' #> '{경로}'`
  * `#>>` : 특정한 경로의 값 텍스트 타입으로 가져오기
    * `'{"키1":"값1","키2":"값2"}' #>> '{경로}'`
  * JSON타입에서는 `<,>,<=,>=,=,<>` 사용 불가능, JSONB에서는 가능



* JSONB 연산자
  * `@>` & `<@` : 포함관계
  * `?` : 가장 바깥 단의 JSONB에 해당하는 문자열의 키가 존재하는지
  * `?|` : 배열 속 원소가 키 값으로 하나 이상 존재하는지
  * `?&` : 배열속 원소가 키 값으로 모두 존재하는지
  * `||` : 2개의 JSONB 병합
  * `-` : JSONB 오브젝트의 하나 이상의 원소 삭제하거나 JSONB 배열의 해당 인덱스 번호의 원소를 삭제



* JSON & JSONB함수
  * JSON & JSONB 오브젝트 생성
    * `json_build_object('키1','값1','키2','값2',,)` : JSON 오브젝트 생성, 키와 값 쌍이 맞아야 함
    * `jsonb_build_object('키1','값1','키2','값2',,)` : JSONB 오브젝트 생성, 키와 값 쌍이 맞아야 함
  * JSON & JSONB 배열 생성
    * `json_build_array('값1','값2','값3','값4',,)` : JSON 배열 생성, 키와 값 쌍이 맞지 않아도 됨
    * `jsonb_build_array('값1','값2','값3','값4',,)` : JSON 배열 생성, 키와 값 쌍이 맞지 않아도 됨
  * JSON & JSONB 배열 길이
    * `json_array_length('['값1','값2','값3','값4',,]')` : 배열의 길이
    * `jsonb_array_length('['값1','값2','값3','값4',,]')` : 배열의 길이
  * JSON & JSONB 키와 값 분리해서 보기
    * `json_each('{"키1":"값1","키2":"값2"}')`
    * `jsonb_each('{"키1":"값1","키2":"값2"}')`
  * JSON & JSONB 값들 분리해서 보기
    * `json_array_elements('["값1","값2","값3"]')`
    * `jsonb_array_elements('["값1","값2","값3"]')`



* 시간 및 날짜 연산자
  * `DATE ('YYYY-MM-DD')+ 정수` = 정수만큼 일자가 더해져서 나옴
  * `DATE ('YYYY-MM-DD') + TIME('HH:MM:SS')` = 'YYYY-MM-DD HH:MM:SS'
  * `INTERVAL '시간' * 시간` = 곱해진 시간
  * `TIME(HH:MM) * 정수` = H에 곱해짐
  * `DATE ('YYYY-MM-DD') * 정수` = ERROR
  * `INTERVAL '시간' / 정수,실수` -> 분모가 0이 되지 않게 조심 



* 시간 및 날짜 함수
  * `CURRENT_DATE` : 현재 날짜 정보
  * `CURRENT_TIME` : 현재 시간 + 시간대 정보
    * `CURRENT_TIME(n)` : 밀리초 n자리 수까지
  * `CURRENT_TIMESTAMP` : 현재 날짜 및 시간 + 시간대 정보
    * `CURRENT_TIMESTAMP(n)` : 밀리초 n자리 수까지
  * `LOCALTIME` : 시간대 정보 없이 현재 시간 정보 반환
    * `LOCALTIME(n)` : 밀리초 n자리 수까지
  * `LOCALTIMESTAMP` : 시간대 정보 없이 현재 날짜 및 시간 정보 반환
    * `LOCALTIMESTAMP(n)` : 밀리초 n자리 수까지
  * `now()` : 현재 트랜잭션이 시작할 때의 시간 반환
  * `timeofday()` : 현재 작업이 시작할 때의 시간 반환
  * `age(<timestamp>)` : 남은 기간을 표시할 때
  * `extract(<특정 정보> FROM <날짜 및 시간 정보>)` : 날짜 및 시간 데이터 타입에서 특정 정보만 빼오기
    * 특정 정보에 들어갈 수 있는 값
      * `CENTURY`: 세기
      * `QUARTER`: 분기 (1년을 4로 나눔)
      * `YEAR`,`MONTH`,`DAY`: 년, 월, 일
      * `HOUR`,`MINUTE`,`SECOND`: 시, 분, 초
      * `ISODOW` : 월(1) ~ 일(7)로 요일 표시
      * `DOW` : 일(0) ~ 토(6)로 요일 표시
      * `TIMEZONE` : 시간대
  * `date_part('<특정정보>',<날짜 및 시간정도>)` : extract와 같은데 특정 정보를 문자열로 받아와야 함
  * `date_trunc('<특정정보>',시간 데이터 타입의 컬럼명)` : 특정 정보만 남기고 삭제, ISODOW, DOW, TIMEZONE 빼고 extract함수의 특정정보 사용 가능



* 자주 쓰이는 연산자
  * 연산자
    * `EXISTS` : 행이 **하나라도** 존재하면 참
      * 참고사이트1: https://gent.tistory.com/278
      * 참고사이트2: https://woogie-db.tistory.com/33
    * `IN` : 행 값 중 **하나라도** 표현식과 **같으면** 참, EXISTS와 작용법은 같으나 EXISTS가 성능 면에서는 더 우수
    * `NOT IN` : 행 값 중 **하나라도** 표현식과 **다르면** 참
    * `ANY` : 행 값 중 **하나라도** 표현식과 **같다면** 참
    * `ALL` : 행 값 중 **모두** 표현식과 **같다면** 참
  * LIKE 연산자
    * `LIKE` (=`~~`) : 패턴 매칭
    * `NOT LIKE` (=`!~~`) : 패턴 매칭 안되는 것
    * `ILIKE` (=`~~*`) : 패턴 매칭(대소문자 구분 안 함)
    * `NOT LIKE` (=`!~~*`) : 패턴 매칭 (대소문자 구분 안 함)
      * `_`: 한 글자를 의미
      * `%`: 글자 앞 뒤에 붙는 아무 문자 의미
  * `SIMILAR TO` : 정규표현 정의를 사용하여 패턴 해석
    * documentation : https://www.postgresql.org/docs/current/functions-matching.html
  * `||` : 병합연산자
  * `LENGTH` : 문자열 길이
  * `substring('문자열',시작점,끝점)`: 시작점부터 끝점 까지문자열 자르기
  * `LEFT(문자열,n)`: 왼쪽부터 n번째 까지 잘라줘
  * `RIGHT(문자열,n)`: 오른쪽부터 n번째 까지 잘라줘





