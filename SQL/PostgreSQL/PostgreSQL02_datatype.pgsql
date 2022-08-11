DROP TABLE IF EXISTS develop_book;
---------------------------------------------------------------------------------------
-- 숫자형
CREATE TABLE develop_book (
    book_id NUMERIC(6), -- 6자리 정수
    date INTEGER, -- 소수점 자리를 제외한 정수
    name VARCHAR(80),
    price MONEY -- 화폐형
);
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS develop_book;
---------------------------------------------------------------------------------------
-- 문자형
CREATE TABLE develop_book (
    book_id NUMERIC(6), -- 6자리 정수
    book_name VARCHAR(80), -- 80자 이하의 문자열(가변적)
    pub_date INTEGER, -- 소수점 자리를 제외한 정수
    price MONEY -- 화폐형
);
---------------------------------------------------------------------------------------
-- 날짜 및 시간
CREATE TABLE datetime_example (
    type_ts TIMESTAMP, -- 날짜, 시간 정보 모두 나타냄, 시간대 정보 반영하지 않음
    type_tstz TIMESTAMPTZ, -- 날짜, 시간 정보 모두 나타냄, 시간대 정보 반영함
    type_date DATE, -- 날짜만
    type_time TIME -- 시간만
);

-- 시간 데이터 입력
-- 'YYYY-MM-DD HH:MM:SS+시간대'
INSERT INTO datetime_example
VALUES ('2022-06-16 22:00:30+09', '2022-06-16 22:00:30+09', '2022-06-16', '22:00:00');
-- type_tstz : 2022-06-16 06:00:30+09
SELECT * FROM datetime_example;

-- 현재 시간대 정보
SHOW TIMEZONE;
-- 시간대 바꾸기
SET TIMEZONE = 'Europe/Rome';
-- type_tstz : 2022-06-16 06:00:30+02
SELECT * FROM datetime_example;

-- 실습 한 번 더
SET TIMEZONE = 'America/Los_Angeles';
-- type_tstz : 2022-06-16 06:00:30-07
SELECT * FROM datetime_example;
---------------------------------------------------------------------------------------
-- 배열형
-- 데이터타입[]
CREATE TABLE phone_info (
    info_id NUMERIC(3),
    name VARCHAR(15),
    tel INTEGER[], -- 여러 개의 핸드폰 번호를 넣을 수 있음
    Email VARCHAR
);
-- 배열형 입력 방법1 : Array[data1,data2,,]
INSERT INTO phone_info 
VALUES (001, 'Hjyuni', Array[01011112222,01033334444], 'ABC@gmail.com');
-- 배열형 입력 방법2 : {data1,data2,,}
INSERT INTO phone_info 
VALUES (002, 'Kjyuni', {01055556666,01077778888}, 'abc@gmail.com');
---------------------------------------------------------------------------------------
-- JSON
CREATE TABLE programming_book_order (
    id NUMERIC(3),
    order_info JSON NOT NULL
);

INSERT INTO programming_book_order
VALUES (001,'{"customer":"jy","books":{"product":"python","qty":2}}'),
       (002,'{"customer":"ms","books":{"product":"java,"qty":1}}'),
       (003,'{"customer":"es","books":{"product":"C++,"qty":3}}');
---------------------------------------------------------------------------------------
-- CAST
-- CAST 연산자
SELECT CAST ('3000' AS INTEGER);

SELECT CAST ('2022-06-16' AS TEXT),
       CAST ('2022-06-16' AS DATE);

SELECT CAST ('1' AS BOOLEAN),
       CAST ('0' AS BOOLEAN),
       CAST ('YES' AS BOOLEAN),
       CAST ('NO' AS BOOLEAN),
       CAST ('ON' AS BOOLEAN),
       CAST ('OFF' AS BOOLEAN);

-- CAST형 연산자
SELECT '11:15:00'::TIME,
       '2022-06-16 23:39:50'::TIMESTAMP;