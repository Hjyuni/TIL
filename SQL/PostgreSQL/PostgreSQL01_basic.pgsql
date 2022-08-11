DROP TABLE IF EXISTS develop_book;
---------------------------------------------------------------------------------------
CREATE TABLE develop_book (
    book_id INTEGER,
    date DATE,
    name VARCHAR(80)
);
---------------------------------------------------------------------------------------
-- INSERT
-- INSERT INTO TABLE이름 VALUES(data1, data2, data3)
INSERT INTO develop_book VALUES (1,'2019-12-17','맛있는 MongoDB');

-- 순서 지정하고 자료 집어넣기
INSERT INTO develop_book (book_id,date,name) VALUES (2, '2019-12-25', '''자바''');
INSERT INTO develop_book (book_id,name,date) VALUES (3,'HTML/CSS', '2020-01-03');

-- 한 번에 여러 자료 집어넣기
INSERT INTO develop_book VALUES
(4,'2020-01-24','Python'),
(5,'2020-02-04','C언어'),
(6,'2020-02-15','C++언어'),
(7,'2020-03-10','mySQL');

-- 순서 지정하고 한 번에 자료 집어넣기
INSERT INTO develop_book (book_id, date, name) VALUES
(8,'2020-04-01','Go언어'),
(9,'2020-04-07','PHP'),
(10,'2020-04-17','Ruby');

-- 생략하고 자료 집어넣기
INSERT INTO develop_book (book_id, name) VALUES (11,'???');
---------------------------------------------------------------------------------------
-- SELECT
-- 모든 자료 조회
SELECT * FROM develop_book;
-- 선택한 자료 조회
SELECT name FROM develop_book;
---------------------------------------------------------------------------------------
-- LIMIT
-- 3개의 자료만 출력
SELECT * FROM develop_book LIMIT 3;
-- OFFSET 2부터 출력
SELECT * FROM develop_book OFFSET 2;
-- 4개의 자료만 출력 하는데 OFFSET 1부터
SELECT * FROM develop_book LIMIT 4 OFFSET 1;
---------------------------------------------------------------------------------------
-- ORDER BY
-- book_id 오름차순 정렬
SELECT * FROM develop_book ORDER BY book_id;
SELECT * FROM develop_book ORDER BY book_id ASC;
-- book_id 내림차순 정렬
SELECT * FROM develop_book ORDER BY book_id DESC;
-- 여러 컬럼 정렬
SELECT * FROM develop_book ORDER BY book_id,name;
-- SELECT 순으로 정렬 (name 정렬 후 book_id 정렬)
SELECT book_id,name FROM develop_book ORDER BY 2,1;
---------------------------------------------------------------------------------------
-- 서브쿼리
SELECT * FROM develop_book 
WHERE '2020-01-03' = (SELECT date FROM develop_book WHERE book_id=3);
---------------------------------------------------------------------------------------
-- UPDATE
-- book_id가 2인 데이터의 name을 java로 바꿔줘
UPDATE develop_book
SET name = 'java'
WHERE book_id = 2
RETURNING *;

-- name이 Python인 데이터의 date을 2020-01-25로 바꿔줘
UPDATE develop_book
SET date = '2020-01-25'
WHERE name = 'Python';
---------------------------------------------------------------------------------------
-- 테이블 복사
CREATE TABLE duplicate_table AS
SELECT * FROM develop_book;
-- 테이블 이름 변경
ALTER TABLE duplicate_table RENAME TO develop_book2;
-- 테이블 삭제
DROP TABLE develop_book2;
---------------------------------------------------------------------------------------
-- DELETE
DELETE FROM develop_book WHERE book_id = 11;