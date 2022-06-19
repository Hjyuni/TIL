-- shell(psql 진입 전)
CREATEDB -U postgres function_example
psql -U postgres -d function_example -f C:/TIL/PostgreSQL/PostgreSQL_data/function_example.dump

-- psql 진입 후 확인
psql -U postgres
\c function_example
\dt
---------------------------------------------------------------------------------------
-- BETWEEN A AND B (81이상 90이하)
SELECT * FROM student_score WHERE score BETWEEN 81 AND 90;
-- BETWEEN NOT A AND B (81미만 90초과)
SELECT * FROM student_score WHERE score NOT BETWEEN 81 AND 90;
---------------------------------------------------------------------------------------
-- CASE WHEN THEN 함수
SELECT id, name, score,
       CASE
        WHEN score BETWEEN 90 AND 100 THEN 'A'
        WHEN score BETWEEN 80 AND 89 THEN 'B'
        WHEN score BETWEEN 70 AND 79 THEN 'C'
        WHEN score < 70 THEN 'F'
       END AS grade
FROM student_score;
---------------------------------------------------------------------------------------
-- COALESCE(매개변수1,매개변수2,,,,) : NULL이 아닌 첫 번째 매개변수 반환
SELECT COALESCE(NULL,NULL,3,4); -- 3 반환
SELECT COALESCE(NULL,NULL); -- NULL 반환

INSERT INTO student_score(name, score)
VALUES ('Jungyoon',NULL),('Minseok',NULL);

-- COALESCE(컬럼,X) : 컬럼의 값이 NULL이면 X 반환, 이 때 컬럼과 X의 데이터 타입은 같아야 함
-- score가 비어있음 0으로 처리해라
SELECT id, name,
       COALESCE(score,0),
       CASE
        WHEN score BETWEEN 90 AND 100 THEN 'A'
        WHEN score BETWEEN 80 AND 89 THEN 'B'
        WHEN score BETWEEN 70 AND 79 THEN 'C'
        WHEN COALESCE(score,0) < 70 THEN 'F'
       END AS grade
FROM student_score;
---------------------------------------------------------------------------------------
-- NULLIF(매개변수1, 매개변수2) : 매개변수1과 2가 같으면 NULL, 다르면 매개변수1 반환
SELECT students,
       COALESCE((12/NULLIF(students,0))::char,'indivisible') AS division
FROM division_by_zero;
---------------------------------------------------------------------------------------
-- ARRAY OPERATOR
SELECT ARRAY[5.1,1.5,3]::INTEGER[] = ARRAY[5,2,3] AS result; -- TRUE(형변환 하면서 올림해버림)
SELECT ARRAY[5,3,3] > ARRAY[5,2,4] AS result; -- TRUE(세 번째 원소의 상관 없이 두 번째 원소의 대소 관계로 t나옴)

-- && 두 배열 중 하나라도 겹치면 결과는 참
SELECT ARRAY[1,2,3] && ARRAY[1,5] AS result;

-- 왼쪽 배열이 오른쪽 배열을 포함하는지 여부
SELECT ARRAY[1,2,3] @> ARRAY[1,3] AS result;
-- 오른쪽 배열이 왼쪽 배열을 포함하는지 여부
SELECT ARRAY[1,2,3] <@ ARRAY[1,3] AS result;

-- || 배열 연산자를 병합
SELECT ARRAY[1,2,3]||ARRAY[4,5];
SELECT ARRAY[[1,2,3],[4,5,6]]||ARRAY[7,8,9];
SELECT 1||ARRAY[2,3,4];

-- 2차원 배열
CREATE TABLE td_array (
    id SERIAL,
    name VARCHAR(30),
    schedule INTEGER[][]
);

-- 2차원 배열 입력방법1 '{{},{},{}}'
INSERT INTO td_array(name, schedule)
VALUES ('9DAYS','{{1,2,3},{4,5,6},{7,8,9}}');

-- 2차원 배열 입력방법2 ARRAY[[],[],[]]
INSERT INTO td_array(name, schedule)
VALUES ('9DAYS',ARRAY[[1,2,3],[4,5,6],[7,8,9]]);
---------------------------------------------------------------------------------------
-- ARRAY FUNCTION
-- array_append(배열, 원소) : 배열 **맨 뒤**에 원소 추가
SELECT array_append(ARRAY[10,20],30);

-- array_prepend(원소, 배열) : 배열 **맨 앞**에 원소 추가
SELECT array_prepend(10,ARRAY[20,30]);

-- array_remove(배열, 원소) : 배열의 특정 원소를 **삭제**
SELECT array_remove(ARRAY[10,20,30,40],20);

-- array_replace(배열, 원소1, 원소2) : 배열의 원소1을 원소2로 **대체**
SELECT array_replace(ARRAY[10,100,30,40],100,20);

-- array_cat(배열1, 배열2) : 배열1과 배열2 병합
SELECT array_cat(ARRAY[10,20],ARRAY[30,40,50]);
---------------------------------------------------------------------------------------
-- JSON OPERATOR
-- '{"키1":"값1","키2":"값2"}' -> '키1' : 저장된 키로 값을 불러오고 싶을 때
SELECT '{"p":"python","j":"java","s":"spark"}'::json -> 'p';

-- [{"키1":"값1"},{"키2":"값2"},{"키3":"값3"},{"키4":"값4"}] -> 인덱스번호 : 인덱스 번호를 활용해 키,값 가져오고 싶을 때
SELECT '[{"p":"python"},{"j":"java"},{"s":"spark"},{"h":"hadoop"}]'::json -> 3;
SELECT '[{"p":"python"},{"j":"java"},{"s":"spark"},{"h":"hadoop"}]'::json -> -1;

-- '{"키1":"값1","키2":"값2"}' ->> '키1' : JSON 배열을 TEXT로 불러오고 싶을 때
SELECT '{"p":"python","j":"java","s":"spark"}'::json ->> 'p';

-- '{"키1":"값1","키2":"값2"}' #> '{경로}' : 특정 경로의 값 가져오기
SELECT '{"i":{"love":{"cake":"tiramisu"}}}'::json #> '{"i","love","cake"}';
SELECT '{"post":[{"gre":{"sql":"do it"}},{"t":"sql"}]}'::json #> '{"post",1,"t"}';

-- '{"키1":"값1","키2":"값2"}' #>> '{경로}' : 특정 경로의 값 TEXT로 가져오기
SELECT '{"i":{"love":{"cake":"strawberry"}}}'::json #>> '{"i","love","cake"}';
---------------------------------------------------------------------------------------
-- JSONB OPERATOR
-- @>
SELECT '{"A":0,"B":1}'::jsonb @> '{"B":1}'::jsonb;
-- <@
SELECT '{"A":0,"B":1}'::jsonb <@ '{"B":1}'::jsonb;

-- ? : username이라는 키가 존재하나?
SELECT '{"username":"jungyoon","python":"hello"}'::jsonb ? 'username';

-- ?| : JSONB에 배열 속 원소가 키 값으로 '1개 이상' 존재하나?
SELECT '{"hello":0,"psql":1,"world":2}'::jsonb ?| ARRAY['a','hello']; -- t
SELECT '{"hello":0,"psql":1,"world":2}'::jsonb ?| ARRAY['a','b']; -- f

-- ?& : JSONB에 배열 속 원소가 키 값으로 '모두' 존재하나?
SELECT '{"hello":0,"psql":1,"world":2}'::jsonb ?& ARRAY['psql','hello']; -- t
SELECT '{"hello":0,"psql":1,"world":2}'::jsonb ?& ARRAY['a','hello']; -- f

-- || : 두 JSONB배열 병합
SELECT '{"username":"jungyoon"}'::jsonb||'{"python":"hello"}'::jsonb;

-- '-' : 하나 또는 복수의 원소 삭제
-- 하나의 원소 삭제
SELECT '{"A":0,"B":1,"C":2}'::jsonb - 'B';

-- 복수의 원소 삭제
SELECT '{"A":0,"B":1,"C":2}'::jsonb - ARRAY['A','C'];

-- 인덱스를 이용해 삭제 (JSONB배열 - 인덱스번호)
SELECT '["A","B","C"]'::jsonb - 1;
---------------------------------------------------------------------------------------
-- JSON FUNCTION
-- JSON OBJECT
SELECT json_build_object('a',1,'b',2,'c',3);
SELECT json_build_object('a',1,'b',2,'c',3,4); -- ERROR
-- JSONB OBJECT
SELECT jsonb_build_object('d',4,'e',5,'f',6);

-- JSON ARRAY
SELECT json_build_array('a',1,'b',2,'c',3);
SELECT json_build_array('a',1,'b',2,'c',3,4);

-- JSONB ARRAY
SELECT jsonb_build_array('a',1,'b',2,'c',3);

-- JSON ARRAY LENGTH
SELECT json_array_length('["a","b","c",1,2,3]'::json) AS len;

-- JSONB ARRAY LENGTH
SELECT jsonb_array_length('["a","b","c",1,2,3]'::json) AS len;

-- JSON KEY-VALUE EACH
SELECT * FROM json_each('{"jungyoon":"i like you","jungmin":"i like you too"}');

-- JSONB KEY-VALUE EACH
SELECT * FROM jsonb_each('{"jungyoon":"i like you","jungmin":"i like you too"}');

-- JSON KEY-VALUE EACH TEXT (VALUE:Text)
SELECT * FROM json_each_text('{"jungyoon":"i like you","jungmin":"i like you too"}');

-- JSONB KEY-VALUE EACH TEXT (VALUE:Text)
SELECT * FROM jsonb_each_text('{"jungyoon":"i like you","jungmin":"i like you too"}');

-- JSON VALUE값만 추출
SELECT * FROM json_array_elements('[1,"a",{"b":"c"},["d",2,3]]');

-- JSONB VALUE값만 추출
SELECT * FROM jsonb_array_elements('[1,"a",{"b":"c"},["d",2,3]]');

-- JSON ARRAY ELEMENTS
SELECT comments -> 'username' AS username, comments -> 'contents' AS contents
FROM json_array_elements('[{
    "username":"jungyoon",
    "contents":"hahaha"
},{
    "username":"jungmin",
    "contents":"hohoho"
}]') comments;
---------------------------------------------------------------------------------------
-- 날짜 및 시간 OPERATOR
-- 일(DAY) 더하기
SELECT date '2022-07-29' + integer '7';

-- 시간(TIME) 더하기
SELECT date '2022-07-29' + time '12:00';

-- 날짜끼리 빼기 (결과: 일자)
SELECT date '2022-07-29' - date '1997-07-29';

-- INTERVAL : 날짜간격 및 시간간격
SELECT 60 * interval '1 second';
SELECT 60 * interval '2 second';

-- 시간 곱하기
SELECT 2 * time '4:00';

-- 날짜 * 정수 : ERROR
SELECT date '2022-06-19' * 3; -- ERROR

-- 나누기 : 분모가 0이 되지 않게 조심
SELECT interval '2 hour' / FLOAT '1.2';
---------------------------------------------------------------------------------------
-- 날짜 및 시간 FUNCTION
-- CURRENT_DATE : 현재 날짜 정보
SELECT CURRENT_DATE;

-- CURRENT_TIME : 현재 시간 + 시간대 정보
SELECT CURRENT_TIME;
SELECT CURRENT_TIME(2); -- 밀리초 자리수
SELECT CURRENT_TIME(0);

-- CURRENT_TIMESTAMP : 현재 날짜 및 시간 + 시간대 정보
SELECT CURRENT_TIMESTAMP;
SELECT CURRENT_TIMESTAMP(2);

-- LOCALTIME : 시간대 정보 없이 현재 시간 정보 반환
SELECT LOCALTIME;
SELECT LOCALTIME(1);

-- LOCALTIMESTAMP : 시간대 정보 없이 현재 날짜 및 시간 정보 반환
SELECT LOCALTIMESTAMP;
SELECT LOCALTIMESTAMP(0);

-- now() : 현재 트랜잭션이 시작할 때의 시간 반환
-- timeofday() : 현재 작업이 시작할 때의 시간 반환
SELECT now(), timeofday();

-- age(<timestamp>) : 남은 기간을 표시할 때
SELECT age(timestamp '2022-07-29');
SELECT age('2022-07-29'); -- ERROR

-- extract(<특정 정보> FROM <날짜 및 시간 정보>) : 날짜 및 시간 데이터 타입에서 특정 정보만 빼오기
SELECT extract(CENTURY FROM TIMESTAMP '2022-07-29');
SELECT extract(QUARTER FROM TIMESTAMP '2022-07-29');

SELECT extract(YEAR FROM TIMESTAMP '2022-07-29');
SELECT extract(MONTH FROM TIMESTAMP '2022-07-29');
SELECT extract(DAY FROM TIMESTAMP '2022-07-29');

SELECT extract(HOUR FROM TIMESTAMP '2022-07-29 12:24:36');
SELECT extract(MINUTE FROM TIMESTAMP '2022-07-29 12:24:36');
SELECT extract(SECOND FROM TIMESTAMP '2022-07-29 12:24:36');

SELECT extract(ISODOW FROM TIMESTAMP '2022-07-31 12:24:36');
SELECT extract(DOW FROM TIMESTAMP '2022-07-31 12:24:36');
SELECT extract(TIMEZONE FROM TIMESTAMP '2022-07-29 12:24:36');

-- date_part('<특정정보>',<날짜 및 시간정보>) : extract와 같은데 특정 정보를 문자열로 받아와야 함
SELECT date_part('YEAR',TIMESTAMP '2022-06-19');
SELECT date_part('HOUR',now());

-- function_example.timebox
SELECT * FROM timebox;

-- date_trunc('<특정정보>',시간 데이터 타입의 컬럼명) : 특정 정보만 남기고 삭제, ISODOW, DOW, TIMEZONE 빼고 extract함수의 특정정보 사용 가능
SELECT id, date_trunc('century', times) FROM timebox;
SELECT id, date_trunc('quarter', times) FROM timebox;

SELECT id, date_trunc('year', times) FROM timebox;
SELECT id, date_trunc('month', times) FROM timebox;
SELECT id, date_trunc('day', times) FROM timebox;

SELECT id, date_trunc('hour', times) FROM timebox;
SELECT id, date_trunc('minute', times) FROM timebox;
SELECT id, date_trunc('second', times) FROM timebox;
---------------------------------------------------------------------------------------
-- function_example DB
SELECT * FROM real_amount;
SELECT * FROM assumption_amount;
SELECT * FROM exception;

-- EXISTS
SELECT * FROM real_amount
WHERE EXISTS (
    SELECT * FROM assumption_amount
);

SELECT * FROM real_amount
WHERE NOT EXISTS (
    SELECT * FROM exception
);

SELECT * FROM real_amount
WHERE EXISTS (
    SELECT * FROM exception
);

-- IN, NOT IN
SELECT * FROM real_amount WHERE amount IN (10,20,30);
SELECT * FROM real_amount WHERE amount NOT IN (10,20,30);

-- ANY
SELECT * FROM real_amount WHERE 30 = ANY ( SELECT amount FROM assumption_amount );
SELECT * FROM real_amount WHERE 100 = ANY ( SELECT amount FROM assumption_amount );

-- ALL
SELECT * FROM real_amount WHERE 5 <= ALL(
    SELECT amount FROM assumption_amount
);
---------------------------------------------------------------------------------------
-- LIKE / NOT LIKE : 대소문자 구분함
SELECT 'JUNGYOON' LIKE '__YOON'; -- 글자 수 안맞아서 f
SELECT 'JUNGYOON' LIKE '____YOON';
SELECT 'JUNGYOON' LIKE '%YOON';
SELECT 'JUNGYOON' LIKE 'J%';
SELECT 'JUNGYOON' LIKE 'J%YOON';
SELECT 'JUNGYOON' LIKE '_%YOON';
SELECT 'JUNGYOON' LIKE '%YO%';
SELECT 'JUNGYOON' LIKE '%yo%'; -- 대소문자 구분해서 f

SELECT 'JUNGYOON' NOT LIKE '__YOON';
SELECT 'JUNGYOON' NOT LIKE '____YOON';
SELECT 'JUNGYOON' NOT LIKE '%YOON';
SELECT 'JUNGYOON' NOT LIKE 'J%';
SELECT 'JUNGYOON' NOT LIKE 'J%YOON';
SELECT 'JUNGYOON' NOT LIKE '_%YOON';
SELECT 'JUNGYOON' NOT LIKE '%YO%';
SELECT 'JUNGYOON' NOT LIKE '%yo%';

-- ILIKE / NOT ILIKE : 대소문자 구분 하지 않음
SELECT 'aAbBcCdD' ILIKE 'AA%';
SELECT 'aAbBcCdD' ILIKE '%bb%';
SELECT 'aAbBcCdD' ILIKE '_b%'; -- f

SELECT 'aAbBcCdD' NOT ILIKE 'AA%';
SELECT 'aAbBcCdD' NOT ILIKE '%bb%';
SELECT 'aAbBcCdD' NOT ILIKE '_b%';

-- SIMILAR TO
SELECT 'HUR JUNGYOON' SIMILAR TO '(HUR|HEO)%';
SELECT 'HUR JUNGYOON' SIMILAR TO '(HUR|HEO)'; -- f
SELECT 'HUR JUNGYOON' SIMILAR TO '(HUR&HEO)%'; -- f

-- ||
SELECT 'I WANNA'||' STUDY '||'postgreSQL';
SELECT 'I HAVE '||3000||'WON';

-- LENGTH
SELECT length('ABCDEFG') AS len;

-- SUBSTRING
SELECT substring('ABC_12345678' FROM 1 FOR 3),substring('ABC_12345678' FROM 5 FOR 12);
SELECT substring('ABC_12345678',1,3);


-- LEFT
SELECT left('ABCDEabcde',5);

-- RIGHT
SELECT right('ABCDEabcde',5);

-- CONCAT
SELECT concat('MY','NAME','IS',NULL,'JUNGYOON');

-- POSITION
SELECT position('JUNGYOON' in 'MY NAME IS JUNGYOON');

-- REPLACE
SELECT replace('MY NAME IS JUNGYOON','YOON','MIN');