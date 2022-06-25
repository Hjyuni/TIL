# PostgreSQL

> BOOK : 모두를 위한 PostgreSQL
>
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
| \df    | 현재 db에 만들어진 모든 함수       |

---

## 1. 테이블 및 데이터 다루기 기초

### 1) db/테이블 생성&삭제

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



### 2) 데이터 입력하기

* `INSERT INTO TABLE이름 VALUES(입력할 데이터1,데이터2,,,)`
* 순서를 정해서 집어 넣거나 데이터를 생략해서 집어넣거나 한번에 여러개 넣을 수 있음



### 3) 데이터 조회하기

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



### 4) 데이터 수정하기

* `UPDATE 테이블명 SET 컬럼명 = 바꿀 데이터 내용 WHERE 수정할 로우 데이터 RETURNING *`
  * `RETURNING`  : 수정한 데이터 바로 조회
  * 만약 WHERE에 아무 내용도 적지 않으면 모든 내용 변함



`+` 테이블 복사하기

`CREATE TABLE 테이블명 AS SELECT * FROM 복사할 테이블 이름`

`+` 테이블 이름 변경하기

`ALTER TABLE 원래 테이블 이름 RENAME TO 테이블 이름`



### 5) 데이터 삭제하기

* `DELETE FROM 테이블명 WHERE 컬럼명 = 삭제할 데이터`

* `DELETE FROM 테이블명` : 모든 데이터 삭제

 

## 2. 데이터 유형

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

  > `JSON` vs `JSONB`
  >
  > https://brownbears.tistory.com/504

  * 두 데이터 타입 모두 동일한 값의 집합을 받아들이는 공통점 있음
  * `JSON`은 입력 텍스트를 정확한 사본을 만들어서 저장, 이것을 불러와 처리할 때는 데이터를 재분석한 다음 실행
  * `JSONB`은 텍스트를 이진 형태로 분해 후 저장해서 입력이 느리지만 출력 시에는 재분석 하지 않아서 **JSON보다 처리속도 빠름**



8. `CAST` : 데이터 타입 형변환

* CAST 연산자: `CAST (표현식 AS 바꿀 데이터 타입)`
* CAST형 연산자: `값::바꿀 데이터 타입`



## 3. 데이터 값 제한하기

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



## 4. 테이블 변경하기 (ALTER TABLE)

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



## 5. 연산자와 함수

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



* 자주 쓰이는 연산자/함수
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
  * `substring('문자열',시작점,끝점)`=`substring('문자열',from 시작점 for 끝점)`=: 시작점부터 끝점 까지문자열 자르기
  * `LEFT(문자열,n)`: 왼쪽부터 n번째 까지 잘라줘
  * `RIGHT(문자열,n)`: 오른쪽부터 n번째 까지 잘라줘
  * `concat('문자열1','문자열2',,)`: 문자열 더하기, `||`와 같음
  * `position('찾을 문자열' in '문자열')` : 문자열 내에 찾을 문자열의 위치가 어디있는지
  * `replace('문자열','a','b')` : 문자열 내의 a를 b로 바꿔줘



## 6. 데이터의 집계 및 결합

1. 데이터 그룹화

   * `DISTINCT` : 중복데이터 제거 하고 보여줌, 여러 컬럼에도 지정 가능

   * `GROUP BY` : 원하는 자료 그룹화

     ⭐ GROUP BY 절에는 항상 같은 컬럼을 적거나 GROUP BY관련 함수를 사용해야 함

     ⭐ DISTINCT와 다른 점은 GROUPBY는 **집계함수를 사용**할 수 있고, 연산 이후에 **HAVING절로 조건에 맞는 정보를 걸러낼 수 있다**

     ⭐SELECT 절에 적은 컬럼 순서대로 숫자를 적어도 됨

   * `HAVING` : **집계된 데이터**를 조회할 때 사용

     * WHERE은 **집계 전 데이터**를 조회할 때 사용
     * WHERE에서는 **집계함수 사용하지 않음**
     * WHERE절은 집계하지 않고 조건 검색, 따라서 HAVING보다 **성능면에서 더 우수**



⭐⭐⭐명령어 우선순위

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT



2. 기본적인 집계함수
   * `AVG(컬럼명)` : NULL값이 아닌 모든 입력값의 **평균**
   * `COUNT(*)` : 입력한 행의 **총 개수**
   * `COUNT(컬럼명)` : NULL값이 아닌 모든 입력값의 **개수**
   * `MAX(컬럼명)` : NULL값이 아닌 모든 입력값의 **최대값**
   * `MIN(컬럼명)` : NULL값이 아닌 모든 입력값의 **최소값**
   * `SUM(컬럼명)` : NULL값이 아닌 모든 입력값의 **합**



3. BOOLEAN 연산 집계 함수

   * `bool_and(컬럼명)`=`every(컬럼명)` : 입력된 데이터가 **모두** 참이면 참

   * `bool_or(컬럼명)` : 입력된 데이터가 **하나라도** 참이면 참

     

4. 배열을 담는 집계함수
   * `ARRAY_AGG(컬럼명)` : 컬럼명에 있는 값들을 배열형태로 출력(null 포함), GROUP BY와 함께 쓸 수 있음



5. JSON 집계 함수
   * `json_agg` : null을 포함해 json배열로 집계한 값
   * `jsonb_agg` : null을 포함해 jsonb배열로 집계한 값
   * `json_object_agg(name,value)` : 키-값 쌍을 json개체로 집계한 값, value는null 포함 key는 null 포함하지 않음
   * `jsonb_object_agg(name,value)` : 키-값 쌍을 jsonb개체로 집계한 값, value는null 포함 key는 null 포함하지 않음



6. 여러 테이블 연결하기

* 두 테이블은 서로 컬럼의 수가 동일해야함

* 컬럼은 같은 위치에 동일 형식과 의미가 담겨있어야 함
  * `UNION ALL` : 중복값 제거하지 않고 전부 합침 (성능 면에서 더 우수)
  * `UNION` : 중복값 제거하고 합침
  * `INTERSECT ALL` : 중복값 제거하지 않고 교집합
  * `INTERSECT` : 중복값 제거하고 교집합
  * `EXCEPT ALL` : A테이블에서 B테이블에 있는 값을 뺀 후 결과값(A테이블) 보여줌(중복허용)
  * `EXCEPT` : A테이블에서 B테이블에 있는 값을 뺀 후 중복값 제거하고 보여줌



7. FROM절을 활용한 데이터 결합
   * FROM에 여러 테이블을 넣으면 CROSS JOIN과 같은 결과값이 나옴



## 7. JOIN

* `A (INNER) JOIN B` : 두 테이블 사이의 연관된 데이터만 하나의 테이블로 출력
* `A LEFT JOIN B ` : A테이블을 기준으로 B테이블과 연결
* `A RIGHT JOIN B ` : B테이블을 기준으로 A테이블과 연결
* `A FULL OUTER JOIN B` : 연결된 행은 서로 연결하여 출력, 서로 연결되지 않은 행은 NULL로 출력



* 연결 컬럼 선언하기
  * `A JOIN B ON 조건` 
  * `A JOIN B USING 조건` : 두 테이블을 연결하는 컬럼의 이름이 서로 다르면 사용 불가



## 8. 데이터 모델링과 인덱싱

### 1-데이터 모델링

* 저장할 데이터의 구조를 정하는 작업
* 많은 양의 데이터를 빈번하게 조회하는 서비스에서 중요



* 관계

  * `일대일(1:1)` : 2개의 테이블이 서로 일대일로 연결되어 있는 관계
  * `일대다(1:M)` : 하나의 테이블이 다른 테이블에 속하는 관계, 보통 N에 속하는 테이블이 1에 속하는 테이블의 pk를 갖고 있음
    * 하나의 테이블로 일대다 관계를 표현하면 전반적인 읽기 성능 향상 (+)
    * 중복되는 정보를 수정할 때 효율이 나빠지고 일관성이 깨질 가능성이 높아짐 (-)
  * `다대다(M:N) ` : 여러 테이블과 여러 테이블간의 관계, 테이블 사이의 다대다 관계를 표현하기 위해 중간에 조회 테이블을 만듦
  * 참고사이트 : https://hanamon.kr/%EA%B4%80%EA%B3%84%ED%98%95-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84-%EA%B4%80%EA%B3%84-%EC%A2%85%EB%A5%98/

* 정규화&비정규화

  * 정규화 : 데이터의 중복성을 제거하거나 줄이기 위해 데이터 구성, 데이터 조회시 비효율적

  * 비정규화 : 정규화된 테이블을 시스템의 성능향상 및 개발과 운영의 단순화를 위해 중복 통합, 분리 등을 수행하는 것

    * 비정규화 하는 경우

      * 자주 함께 조회하는 테이블

      * 집계 연산이 빈번하게 일어나는 상황

      * 자주 조회되지 않는 테이블

  * 참고사이트 : https://velog.io/@bsjp400/Database-DB-%EC%A0%95%EA%B7%9C%ED%99%94-%EB%B9%84%EC%A0%95%EA%B7%9C%ED%99%94%EB%9E%80

  

### 2-데이터 인덱싱

* 특징
  * 인덱스는 쿼리 작업을 효율적으로 만듬
  * 인덱스를 만들면 새로운 데이터를 생성하거나 제거하는 작업이 빈번할 때 속도가 저하될 수 있음



* 생성방법

  ```sql
  CREATE INDEX 인덱스명 ON 테이블명 [USING 인덱스종류]
  ```

  



* 종류

  1. B-Tree 인덱스

     * 가장 기본적인 형태의 인덱스
     * 각각 노드에 있는 키들은 전부 정렬되어 있어야 함
     * 부모노드의 키 사이사이와 자식들 노드들이 연결되어 있는데 이 연결된 노드는 **두 키 값 사이의 값들만 가져야 함**
     * 루트노드 부터 크기를 비교하면서 자식 노드를 조회하는 방법을 이용해 검색 실행
     * B-Tree 구조에서 자식 노드를 엄청 많이 만들거나 반대로 하나의 노드에 키 값이 적게 들어있게 되면 효율이 떨어짐, 따라서 검색할 때 가장 적은 횟수의 조회를 하도록 정해진 규칙에 맞춰서 인덱스를 정리 해야함

     

  2. Hash 인덱스

     * 값을 직접 인덱싱 하지 않고 값을 해시화 함수를 통해 더 작은 크기의 값으로 변형한 뒤 이 값을 기준으로 B-Tree 구조를 만듬 
     * B-Tree 구조만 사용했을 때보다 인덱스 크기면에서 훨씬 작아짐
     * 인덱스를 메모리에 캐싱하고 검색속도가 기존 방법보다 조금 더 빠르다는 이점이 있음
     * 해시화 함수를 거치면서 원래의 값을 변형하기 때문에 인덱스한 컬럼 값 사이의 크기 비교가 불가능해져 정렬과 비교 연산에 해시 인덱스 활용 불가
     * 해시 인덱스를 일반적인 상황에서 사용하기 힘들며, 인덱싱 하려고 하는 컬럼 값들의 크기가 크고, 값이 잘 겹치지 않고, 등호를 이용한 빠른 값 검색을 해야하는 상황이라면 사용 고려 가능

     

  3. GIN(Generalized Inverted Index)

     * 참고사이트 : https://daesuni.github.io/postgres-fulltext-search/

     * 전문(Full Text) 검색을 주 목적으로 하는 인덱스
     * 주로 긴 문자열이 들어가는 컬럼에 설정
     * 이 인덱스를 활용해서 전문 검색을 효율적으로 하기 위해서는 tsvector라는 데이터 형식을 사용해야함
     * TEXT형식에 인덱스를 생성하려면 `to_tsvector`라는 함수를 이용해 TEXT형식을 변환해야함



* 컬럼 수에 따른 인덱스의 종류

  1. 단일 컬럼 인덱스 : 한 가지 종류의 인덱스 컬럼 값을 갖는 방식 (ex : pk컬럼을 갖는 인덱스)

     * 컬럼에 어떤 값을 검색하거나 값의 범위에 해다아는 데이터를 불러올 때 사용할 수 있고, 정렬도 가능
     * 두 가지 컬럼의 값을 동시에 일치하도록 검색하는 경우는 불가능

     

  2. 복합 컬럼 인덱스 : 인덱스를 대상으로 하는 값을 여러 개의 컬럼으로 갖는 방식

     * 두 컬럼의 값들을 어떻게 정렬해서 설정할지 정해주어야 함
     * 어떤 컬럼을 우선으로 정할지 중요⭐⭐
     * 단일 컬럼 인덱스의 기능 모두 포함
     * 두 컬럼의 우선순위가 중요하지 않을 때 더 포괄적인, 값의 중복이 빈번한 컬럼에 우선순위 부여

     

  3. 고유 인덱스 : 지정한 컬럼에 중복되는 값을 갖지 않도록 하는 인덱스

     

  4. 부분 인덱스 : 특정 조건에 맞는 값들에 대해서만 인덱스 생성



* 인덱스 수정 및 삭제
  * 수정 : `ALTER INDEX 인덱스명 RENAME TO 새인덱스명`
  * 삭제 : `DROP INDEX 인덱스명`



* 동시처리 기능이 필요한 인덱스
  * 인덱스를 생성하려고 하는 테이블의 데이터 수가 많을 때 인덱스 생성 시간이 오래걸리고 서비스에 에러가 발생 -> 읽기 전용이라서
  * `CONCURRENTLY` 옵션 사용하면 됨
    * `CREATE / DROP INDEX CONCURRENTLY`
  * 이 옵션을 사용하면 인덱스 생성시간이 더 오래걸리니 쓰기 작업이 얼마나 필요한지 판단 후 사용할 것



* 인덱스 관리하기
  * `EXPLAIN` :쿼리문이 어떻게 실행될지를 예상한 쿼리 계획을 출력
  * `EXPLAIN ANALYZE` : 쿼리를 실행한 후 실행한 쿼리 계획과 실제 소요시간 함께 출력
  * 실행계획 종류
    * Filter : 원하는 정보만을 걸러내기
    * Sequential Scan : 순차적으로 정보 읽어내기 
    * Index Scan : 인덱스를 조회하여 원하는 정보를 찾고 테이블에서 해당 정보 불러오기
    * Index-only scan : 인덱스를 조회하고 원하는 정보 바로 불러오기
    * Bitmap Heap Scan : Bitmap Index Scan을 통해 얻은 위치 정보로 원하는 정보를 테이블에서 불러오기
    * Bitmap Index Scan : 인덱스를 조회하여 다수의 정보 위치를 비트맵에 저장
    * Subquery Scan : 서브 쿼리의 결과로 얻은 테이블을 탐색
    * 참고사이트 : https://seungtaek-overflow.tistory.com/5



* pg_stat_user_indexes
  * 인덱스 사용에 대한 통계 정보 확인하게 해줌
  * 실시간 정보는 아님
  * `SELECT stats_reset FROM pg_stat_bgwriter;` 쿼리로 통계 수집 시작 일시 확인 가능
  * `SELECT * FROM pg_stat_reset();`
    * 통계 정보가 오래되었을 때 기존 통계정보 초기화 시키고 최신 통계정보 다시 축적
    * 현재 DB의 통계정보가 전부 지워지기 때문에 미리 통계 정보 저장하고 실행하기⭐⭐



## 9. 함수와 뷰

### 1-함수

* 함수

  * 원하는 목적 달성을 위해 여러 작업들을 하나의 단위로 묶은 것
  * CREATE FUNCTION documentation : https://www.postgresql.org/docs/current/sql-createfunction.html

  ```SQL
  CREATE [ OR REPLACE ] FUNCTION
      name ( [ [ argmode ] [ argname ] argtype [ { DEFAULT | = } default_expr ] [, ...] ] )
      [ RETURNS rettype
        | RETURNS TABLE ( column_name column_type [, ...] ) ]
    { LANGUAGE lang_name
      | TRANSFORM { FOR TYPE type_name } [, ... ]
      | WINDOW
      | { IMMUTABLE | STABLE | VOLATILE }
      | [ NOT ] LEAKPROOF
      | { CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT }
      | { [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER }
      | PARALLEL { UNSAFE | RESTRICTED | SAFE }
      | COST execution_cost
      | ROWS result_rows
      | SUPPORT support_function
      | SET configuration_parameter { TO value | = value | FROM CURRENT }
      | AS 'definition'
      | AS 'obj_file', 'link_symbol'
      | sql_body
    } ...
  ```

  * DROP FUNCTION documentation : https://www.postgresql.org/docs/current/sql-dropfunction.html

  ```SQL
  DROP FUNCTION [ IF EXISTS ] name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] [, ...]
      [ CASCADE | RESTRICT ]
  ```

  



* 프로시저 언어 : 함수와 트리거를 만드는데 사용, 복잡한 연산 처리가 용이
  * PL/pgSQL, PL/TCL, PL/Perl, PL/Python 등이 있음
  * `CREATE LANGUAGE 언어이름` : 프로시저 언어 설치하기



* 트리거

  * 어떠한 행동이나 작업을 했을 때 미리 저장해놓은 작업이 자동으로 실행되도록 하는 것
  * `FOR EACH ROW EXECUTE PROCEDURE funtion_name();` : 트리거 실행시 실행할 **함수**를 실행하는 코드
  * CREATE TRIGGRT documentation : https://www.tutorialspoint.com/postgresql/postgresql_triggers.htm

  ```SQL
  CREATE TRIGGER trigger_name [BEFORE|AFTER|INSTEAD OF] event_name ON table_name
  FOR EACH ROW EXECUTE PROCEDURE funtion_name();
  ```

  * DROP TRIGGER documentation : https://www.postgresql.org/docs/current/sql-droptrigger.html

  ```SQL
  DROP TRIGGER [ IF EXISTS ] name ON table_name [ CASCADE | RESTRICT ]
  ```

  



### 2-뷰

* 뷰

  * 일종의 라이브러리
  * 기존에 만든 쿼리문을 하나의 가상 테이블로 만들어뒀다가 필요한 곳에 적절히 사용하는 기능
  * 정의된 쿼리문을 다시 실행시키지만 저장하지 않음

    ⭐실제하는 테이블이 아니라 가상의 테이블임

  * 뷰가 생성되면 참조한 테이블과 연결되기 때문에 뷰를 제거하지 않고 삭제할 수 없고 수정할 때에도 제한적

  * CREATE VIEW documentation : https://www.postgresql.org/docs/9.2/sql-createview.html

    ```sql
    CREATE [ OR REPLACE ] [ TEMP | TEMPORARY ] VIEW name [ ( column_name [, ...] ) ]
        [ WITH ( view_option_name [= view_option_value] [, ... ] ) ]
        AS query
        
    -- DROP
    DROP view_name
    ```

  * DROP VIEW documentation : https://www.postgresql.org/docs/current/sql-dropview.html

    ```SQL
    DROP VIEW [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]
    ```



* 구체화된 뷰(Materialized View)

  * 가상의 테이블이 아닌 실제로 존재하는 테이블의 형태로 뷰를 만듬
  * 저장된 쿼리문을 실행한 후 실행 결과를 별도로 저장해 둠
  * 일반적인 뷰보다 읽기 성능은 더 빠르지만 자주 업데이트 되는 상황에서는 오히려 성능이 더 안좋음
  * 데이터가 변하지 않으면서 읽기 연산이 자주 사용되는 경우 사용하는 것이 좋음
  * documentation : https://www.postgresql.org/docs/current/rules-materializedviews.html
  * CREATE MATERIALIZED VIEW documentation : https://www.postgresql.org/docs/current/sql-creatematerializedview.html

  ```sql
  CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] table_name
      [ (column_name [, ...] ) ]
      [ USING method ]
      [ WITH ( storage_parameter [= value] [, ... ] ) ]
      [ TABLESPACE tablespace_name ]
      AS query
      [ WITH [ NO ] DATA ]
  ```

  * DROP MATERIALIZED VIEW documentation : https://www.postgresql.org/docs/current/sql-dropmaterializedview.html

  ```SQL
  DROP MATERIALIZED VIEW [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]
  ```




## 10. 트랜잭션

* 트랜잭션
  * 작업 수행의 단위로 쓰이는 논리적인 개념
  * 데이터를 처리하는 작업 중 오류가 발생해서 원하는 결과값이 나오지 못할 상황이 됐을 때 해당 작업 전체 취소
  * 단계별로 분리되어있던 작업이 하나의 작업으로 그룹화 됨
  * 작업 전체가 완벽하게 잘 수행되거나 아니면 아예 수행되지 않음
  * 작업 중간의 오류로 인해 발생할 수 있는 데이터의 불일치를 방지하여 작업의 신뢰도를 높임



* 특징(ACID)⭐⭐
  * 원자성(**A**tomicity) : 작업의 수행이 전체가 다 수행되거나 아무것도 안되거나 하는 개념, 작업을 부분별로 보지 않고 하나의 단위로 보는 것을 의미
  * 일관성(**C**onsistency) : 작업 과정에서 오류가 없이 완벽히 수행되었을 때 갑자기 다른 트랜잭션에 의해 해당 테이블의 값이 수정되지 않는 특징
  * 고립성(**I**solation) : 트랜잭션이 수행되는 동안에는 다른 외부 요소들의 간섭이 없어야 한다는 특징
  * 지속성(**D**urability) : 한 트랜잭션이 외내부의 문제 없이 잘 수행되었으면 수행된 트랜잭션에 대한 데이터는 수정되거나 없어지지않고 남아있는 특징
  
  

* 트랜잭션 수행 명령어

  * `begin` : 트랜잭션 시작을 알리는 명령어
  * `rollback` : 수행되고 있는 트랜잭션의 잘못된 지점을 멈추고 다시 처음으로 돌아가는 명령어, 이전에 잘못 수행됐던 과정은 초기화 됨
  * `savepoint` : 원하는 특정 지점을 기준으로 이전에 수행한 작업까지 문제가 없었다면 저장하겠다는 명령어
  * `commit` : 트랜잭션 종료 명령어, 모든 변경사항이 db에 저장되면 저장된 데이터들은 어떤 경우에도 변경되지 않음, commit후 rollback을 실행해도 효과 없음

  ⭐⭐트랜잭션이 수행되는 동안 다른 트랜잭션은 간섭할 수 없음



* 자동커밋
  * INSERT, UPDATE, DELETE와 같은 경우에는 따로 커밋을 쓰지 않아도 자동으로 커밋이 됨
  * 자동 커밋이 원치 않을 때 `\set AUTOCOMMIT off`을 이용해 끌 수 있음



* PostgreSQL ROLLBACK에서는 **DDL명령어 이후에 롤백으로 데이터 복구 가능**



* 트랜잭션 병행 문제
  * 오손 읽기(Dirty read) : 커밋되지 않은 변경을 잘못 읽는 결과가 나오는 문제
  * 비반복적 읽기(Nonrepeatable read) : 두 트랜잭션이 서로 간섭하여 값이 다르게 읽히는 문제
  * 가상 읽기(Phantom read) : 원래 없었던 데이터가 새로 생긴 것을 확인했을 때 발생하는 문제



* 고립화 수준

  * 데이터 읽기 중 발생하는 일관성 문제를 해결하기 위해 설정

  | 고립화수준 | 명칭                                  | 특징                                                         | 문제                                 |
  | ---------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
  | 0단계      | 실행되지 않는 읽기 (Read Uncommitted) | 트랜잭션 처리중인 데이터를 다른 트랜잭션이 읽는 것을 허용    | 오손읽기 / 비반복적 읽기 / 가상 읽기 |
  | 1단계      | 실행된 읽기 (Read Committed)          | 완료된 트랜잭션의 데이터만 읽는 것을 허용. 대부분의 DBMS가 채택하고 있는 고립화 레벨 | 비반복적 읽기 / 가상 읽기            |
  | 2단계      | 반복적 읽기 (Repeatable Read)         | 먼저 실행된 트랜잭션이 종료될 때 까지 뒤에 실행된 트랜잭션이 먼저 실행된 트랜잭션의 데이터를 수정하는 것을 허용하지 않음 | 가상읽기                             |
  | 3단계      | 직렬화 (Serializable)                 | 먼저 실행된 트랜잭션의 데이터를 뒤에 실행된 트랜잭션이 수정, 삭제, 생성하는 것을 허용하지 않음 | -                                    |

  * 설정하기
    * documentation : https://www.postgresql.org/docs/current/sql-set-transaction.html

  ```SQL
  BEGIN TRANSACTION ISOLATION LEVEL [REPEATABLE READ/SERIALIZABLE];
  ```

  * 고립화 수준을 높이면 데이터의 불일치가 일어날 확률을 줄이고, 일관성이 높아지고, 동시성이 낮아짐

    동시성이 낮아지면 시간이 더 걸리고 성능을 저하시킴



## 11. 보안과 백업

### 1-보안

* 롤(Role)
  * 개인이 될수도 있고 그룹이 될수도 있음
  *  db를 이루는 테이블, 함수, 뷰, 시퀀스 등의 데이터베이스 객체들에 대한 소유권과 권한을 부여할 수 있는 특성
  *  ROLE 생성 / 삭제
  
  ```SQL
  CREATE ROLE role_name;
  DROP ROLE role_name;
  ```
  
  



* 속성
  * 로그인 권한 : 로그인을 할 수 있는 권한
  * 슈퍼유저 권한 : 모든 권한을 다 가진 사용자를 의미, 슈퍼유저 롤로 작업을 하는 경우 보안상의 문제가 발생할 수 있기 때문에 접근권한이 적절하게 제한된 롤로 작업하는 것이 좋음
  * DB생성 권한 : DB를 생성할 권한, 슈퍼유저가 아닌 롤로 작업할 경우 이 권한이 있어야 함
  * 롤 생성 권한 : 롤을 생성할 권한



* 권한 부여 명령어

  * CREATE ROLE documentation : https://www.postgresql.org/docs/current/sql-createrole.html
  * ALTER ROLE documentation : https://www.postgresql.org/docs/current/sql-alterrole.html
  * 참고사이트 : https://myinfrabox.tistory.com/234

  * `SUPERUSER` : 슈퍼유저
  * `CREATEDB` : DB생성권한
  * `CREATEROLE` : 롤 생성 권한
  * `REPLICATION` : 권한 복제
  * `BYPASSRLS` : RLS 통과 권한



* 클라이언트 접근보안

  * `PostgreSQL설치폴더경로/data/pg_hba.conf` : 클라이언트 접근을 제어하기 위해 사용하는 파일

  * 필드 특성

    * `TYPE` : 연결 타입을 결정하는 필드
    * `DATABASE` :  데이터베이스를 지정하는 필드
    * `USER` : 데이터베이스 사용자를 지정하는 필드
    * `ADDRESS` : 클라이언트 머신의 주소를 지정하는 필드

  * 인증방법

    * `TRUST` : 모든 사용자 접근 가능, 집에서 혼자 사용하는 환경에서만 사용
    * `PASSWORD` 
      * `PASSWORD` : 암호화 되어있지 않은 암호를 입력받아 인증되는 구조
      * `MD5` : 128비트 길이의 해시값으로 암호화하여 인증하는 방법
      * `SCRAM-SHA256` : MD5와 비슷하게 암호화, 현재 가장 안전하게 암호 보호할 수 있는 방법
      * `PAM` : PAM을 사용하여 인증, PAM은 인증만을 위한 프레임워크를 사용하여 기존의 애플리케이션으로부터 인증 과정을 떼어내는 방법
      * `ident` : TCP/IP 연결이 되어있을 때 사용자의 이름을 활용하여 인증, 서버의 사용자 이름과 연결하려고 하는 사용자의 이름이 일치할 경우에 접속 허용
      * `peer` : TCP/IP 연결이 되어있지 않을 때 사용자의 이름을 활용하여 인증
      * `reject` : 특정 클라이언트 무조건적으로 인증 거부
      * 그 외 `GSS`, `SSPI`, `LDAP`, `RADIUS`, `BSD`, 인증서 등등,,,

  * 참고사이트 : https://brownbears.tistory.com/154



* 테이블 보안
  * `GRANT` : 권한 부여
    * `GRANT 권한 ON 테이블명 TO 사용자명`
  * GRANT 참고사이트 : https://www.devkuma.com/docs/postgresql/%EC%97%AD%ED%95%A0-%ED%85%8C%EC%9D%B4%EB%B8%94-%EB%B7%B0-%EB%93%B1%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B6%8C%ED%95%9C%EC%9D%84-%EC%B6%94%EA%B0%80-grant/
  * `REVOKE` : 권한 회수
    * `REVOKE 권한 ON 테이블명 FROM 사용자명`
  * 권한
    * CREATE
    * SELECT
    * INSERT
    * UPDATE
    * DELETE
    * REFERENCES
    * TRUNCATE
    * TRIGGER
    * CONNECT : 특정 DB에 사용자가 접속할 수 있는 권한을 줌
    * EXECUTE : 특정 함수나 연산자를 사용할 수 있는 권한
    * TEMPORARY : DB에 임시 테이블을 만들 수 있는 권한
    * USAGE : 특정 스키마 내부의 개체에 접근할 수 있는 권한을 주고, 주어진 절차적 언어로 함수를 만들 수 있는 권한을 줌



* 함수 보안

  * SECURITY INVOKER :  함수를 **호출**하는 롤의 권한에 따라 함수도 권한을 갖는 것

  * SECURITY DEFINER : 함수를 **만든** 롤의 권한에 따라 함수가 권한을 갖는 것

    * SECURITY DEFINER 문제 해결방안

      ```sql
      BEGIN;
      CREATE FUNCTION '함수 설정'
      SECURITY DEFINER;
      REVOKE ALL ON FUNCTION '함수명' FROM PUBLIC;
      GRANT '권한' ON FUNCTION '함수명' TO 'role명';
      COMMIT;
      ```

      

### 2-백업

* 파일기반 백업

  * 백업할 필요가 없는 파일들도 하게 되어 파일의 용량이 커서 잘 사용 안하는 방식

  ``` SQL
  tar -cf backup.tar 'data_path'
  ```



* dump

  ```sql
  -- db TO dumpfile
  pg_dump 'db_name' > 'dumpfile_name'
  -- dumpfile TO db
  psql 'db_name' < 'dumpfile_name'
  ```



* dump_all

  * 다수의 db와 db객체 이외의 정보들까지 백업하기 위해 사용

  ```sql
  pg_dumpall > 'dumpfile_name'
  ```



* 아카이브백업
  * 참고사이트 : https://mozi.tistory.com/560
