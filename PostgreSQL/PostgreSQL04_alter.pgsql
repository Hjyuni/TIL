DROP TABLE IF EXISTS book_info;

CREATE TABLE book_info (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

INSERT INTO book_info VALUES (1,'POSTGRE'),(2,'MYSQL');

-- ADD COLUMN
-- ALTER TABLE 테이블명 ADD COLUMN 컬럼명 데이터타입 제약조건;
-- ADD COLUMN에서는 NOT NULL 제약 조건을 처음부터 쓸 수 없음
ALTER TABLE book_info ADD COLUMN published_date DATE;
ALTER TABLE book_info ADD COLUMN published_date DATE NOT NULL; -- ERROR

-- 확인하기
SELECT * FROM book_info;
---------------------------------------------------------------------------------------
-- UPDATE NEW COLUMN
UPDATE book_info
SET published_date = '2022.06.16'
WHERE id = 1;

UPDATE book_info
SET published_date = '2022.06.17'
WHERE id = 2;

-- SET CONSTRAINT
-- ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 SET 제약조건
ALTER TABLE book_info ALTER COLUMN published_date SET NOT NULL;

-- 확인하기
\d book_info;
---------------------------------------------------------------------------------------
-- DROP COLUMN
-- ALTER TABLE 테이블명 DROP COLUMN 컬럼명;
ALTER TABLE book_info DROP COLUMN published_date;

-- 확인
SELECT * FROM book_info;
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS book_info;
DROP TABLE IF EXISTS library;

CREATE TABLE book_info (
    book_id INTEGER NOT NULL PRIMARY KEY,
    book_name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO book_info VALUES(1,'POSTGRESQL'),(2,'MYSQL'),(3,'MONGODB');

CREATE TABLE library (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    book_name VARCHAR(20) NOT NULL REFERENCES book_info(book_name)
);

INSERT INTO library VALUES (1,'SEOULLIBRARY','POSTGRESQL');

SELECT * FROM book_info;

-- DROP COLUMN CASCADE
-- ALTER TABLE 테이블명 DROP COLUMN 컬럼명 CASCADE;
ALTER TABLE book_info DROP COLUMN book_name CASCADE;

SELECT * FROM book_info;
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS book_info;
DROP TABLE IF EXISTS library;

CREATE TABLE book_info (
    book_id INTEGER NOT NULL PRIMARY KEY,
    book_name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO book_info VALUES(1,'POSTGRESQL'),(2,'MYSQL'),(3,'MONGODB');

CREATE TABLE library (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    book_name VARCHAR(20) NOT NULL REFERENCES book_info(book_name)
);

INSERT INTO library VALUES (1,'SEOULLIBRARY','POSTGRESQL');

-- RENAME COLUMN
-- ALTER TABLE 테이블명 RENAME 원래컬럼명 TO 바꿀컬럼명;
ALTER TABLE book_info RENAME book_name TO name;

\d book_info
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS book_info;

CREATE TABLE book_info (
    book_id INTEGER NOT NULL PRIMARY KEY,
    book_name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO book_info VALUES(1,'POSTGRESQL'),(2,'MYSQL'),(3,'MONGODB');

-- DROP CONSTRAINT NOT NULL
-- ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 DROP NOT NULL;
ALTER TABLE book_info
ALTER COLUMN name DROP NOT NULL;

\d book_info
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS book;

CREATE TABLE book (
    id INTEGER NOT NULL,
    name VARCHAR(20) NOT NULL
);

-- ADD CONSTRAINT PRIMARY KEY
-- ALTER TABLE 테이블명 ADD PRIMARY KEY (컬럼명);
ALTER TABLE book ADD PRIMARY KEY (id);

\d book
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS library;

CREATE TABLE library (
    lib_id INTEGER NOT NULL PRIMARY KEY,
    lib_name VARCHAR(30) NOT NULL,
    book_id INTEGER NOT NULL
);

-- ADD CONSTRAINT FOREIGN KEY
-- ALTER TABLE 테이블명 ADD FOREIGN KEY (자녀컬럼명) REFERENCES 부모테이블(부모컬럼명);
ALTER TABLE library ADD FOREIGN KEY (book_id) REFERENCES book (id);

\d library
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS water;

CREATE TABLE water (
    id SMALLINT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    location_no VARCHAR NOT NULL,
    description TEXT
);

INSERT INTO water VALUES(01, '천지', '02', '백두산 천지');

-- ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 TYPE 새로운 데이터 타입;
-- ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 SET DATA TYPE 새로운 데이터 타입;
ALTER TABLE water ALTER COLUMN id TYPE INTEGER,
                  ALTER COLUMN description TYPE VARCHAR;

-- 컬럼 속 데이터는 문자열인데 컬럼의 데이터 타입을 INTEGER로 바꾸려고 해서 에러남
ALTER TABLE water ALTER COLUMN location_no TYPE INTEGER; -- ERROR

-- USING 컬럼명::새로운데이터타입
ALTER TABLE water ALTER COLUMN location_no TYPE INTEGER USING location_no::INTEGER;

\d water
