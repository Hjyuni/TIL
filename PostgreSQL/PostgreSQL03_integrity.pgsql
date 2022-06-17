-- DOMAIN
CREATE DOMAIN phone AS integer CHECK (VALUE > 0 AND VALUE < 9);

CREATE TABLE domain_example (
    id phone
);

INSERT INTO domain_example VALUES (3); -- 성공
INSERT INTO domain_example VALUES (7); -- 성공
INSERT INTO domain_example VALUES (-1); -- 실패
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS phone_info;

-- NOT NULL
CREATE TABLE phone_info (
    info_id NUMERIC(3) NOT NULL,
    name VARCHAR(15) NOT NULL,
    tel INTEGER[] NOT NULL,
    Email VARCHAR
);
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS phone_info;

-- UNIQUE
CREATE TABLE phone_info (
    info_id NUMERIC(3) UNIQUE NOT NULL,
    name VARCHAR(15) NOT NULL,
    tel INTEGER[] NOT NULL,
    Email VARCHAR
);

DROP TABLE IF EXISTS phone_info;

-- UNIQUE 제약 조건이 여러 개인 경우
CREATE TABLE phone_info (
    info_id NUMERIC(3) NOT NULL,
    name VARCHAR(15) NOT NULL,
    tel INTEGER[] NOT NULL,
    Email VARCHAR,
    UNIQUE (info_id, name, tel)
);
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS phone_info;

-- PRIMARY KEY
CREATE TABLE phone_info (
    info_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    tel INTEGER[] NOT NULL,
    Email VARCHAR
);

-- PRIMARY KEY 여러 개인 경우
CREATE TABLE book_info (
    info_id SERIAL NOT NULL,
    name VARCHAR(15) NOT NULL,
    admin_no SERIAL NOT NULL REFERENCES phone_info(info_id), 
    tel INTEGER[] NOT NULL,
    Email VARCHAR,
    PRIMARY KEY (info_id, admin_no)
);
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL
);

INSERT INTO subject VALUES (00001,'MATH'),
                           (00002,'SCIENCE'),
                           (00003,'PROGRAMMING');

-- FK 컬럼 명이 참조하는 컬럼과 같은 경우 : REFERENCES 참조하는 테이블명
CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_id NUMERIC(5) REFERENCES subject,
    teacher_certifi_date DATE
);

INSERT INTO teacher VALUES (00011,'HUR',00001,'2020-01-05'), -- 성공
                           (00021,'KIM',00002,'2020-02-22'), -- 성공
                           (00031,'LEE',00003,'2020-03-07'), -- 성공
                           (00041,'PARK',00004,'2020-07-29'); -- 실패
---------------------------------------------------------------------------------------
DROP TABLE IF EXISTS teacher;

-- FK 컬럼 명이 참조하는 컬럼과 다른 경우 : REFERENCES 참조하는 테이블명(참조하는 컬럼명)
CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_code NUMERIC(5) REFERENCES subject(subj_id),
    teacher_certifi_date DATE
);
---------------------------------------------------------------------------------------
-- FK가 여러 개인 경우 : FOREIGN KEY(COL1,COL2) REFERENCES 참조하는 테이블명(참조하는 COL1,참조하는 COL2)
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL,
    stud_count NUMERIC(20) NOT NULL,
    UNIQUE (subj_id,subj_name)
);

INSERT INTO subject VALUES (00001,'MATH',40),
                           (00002,'SCIENCE',60),
                           (00003,'PROGRAMMING',80);

CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_code NUMERIC(5) NOT NULL,
    subj_name VARCHAR(60) NOT NULL,
    teacher_certifi_date DATE NOT NULL,
    FOREIGN KEY (subj_code, subj_name) REFERENCES subject (subj_id, subj_name)
);

-- ON DELETE NO ACTION : DEFAULT
DELETE FROM subject WHERE subj_id = 00002; -- ERROR
---------------------------------------------------------------------------------------
-- ON DELETE RESTRICT
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL
);

INSERT INTO subject VALUES (00001,'MATH'),
                           (00002,'SCIENCE'),
                           (00003,'PROGRAMMING');

CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_id NUMERIC(5) REFERENCES subject ON DELETE RESTRICT,
    teacher_certifi_date DATE NOT NULL
);

INSERT INTO teacher VALUES (00011,'HUR',00001,'2020-01-05'),
                           (00021,'KIM',00002,'2020-02-22'),
                           (00031,'LEE',00003,'2020-03-07');

DELETE FROM subject WHERE subj_id = 00002; -- ERROR
---------------------------------------------------------------------------------------
-- ON DELETE CASCADE
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL
);

INSERT INTO subject VALUES (00001,'MATH'),
                           (00002,'SCIENCE'),
                           (00003,'PROGRAMMING');

CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_id NUMERIC(5) REFERENCES subject ON DELETE CASCADE,
    teacher_certifi_date DATE NOT NULL
);

INSERT INTO teacher VALUES (00011,'HUR',00001,'2020-01-05'),
                           (00021,'KIM',00002,'2020-02-22'),
                           (00031,'LEE',00003,'2020-03-07');

SELECT * FROM teacher;

-- 참조된 값 지우기
DELETE FROM subject WHERE subj_id = 00002;
SELECT * FROM subject;

-- 자식 테이블 확인하기
SELECT * FROM teacher;
---------------------------------------------------------------------------------------
-- ON DELETE SET NULL
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL
);

INSERT INTO subject VALUES (00001,'MATH'),
                           (00002,'SCIENCE'),
                           (00003,'PROGRAMMING');

CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_id NUMERIC(5) REFERENCES subject ON DELETE SET NULL,
    teacher_certifi_date DATE NOT NULL
);

INSERT INTO teacher VALUES (00011,'HUR',00001,'2020-01-05'),
                           (00021,'KIM',00002,'2020-02-22'),
                           (00031,'LEE',00003,'2020-03-07');

SELECT * FROM teacher;

-- 참조된 값 지우기
DELETE FROM subject WHERE subj_id = 00002;
SELECT * FROM subject;

-- 자식 테이블 확인하기
SELECT * FROM teacher;
---------------------------------------------------------------------------------------
-- ON DELETE SET NULL
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;

CREATE TABLE subject (
    subj_id NUMERIC(5) NOT NULL PRIMARY KEY,
    subj_name VARCHAR(60) NOT NULL
);

INSERT INTO subject VALUES (00001,'MATH'),
                           (00002,'SCIENCE'),
                           (00003,'PROGRAMMING');

CREATE TABLE teacher (
    teacher_id NUMERIC(5) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    subj_id NUMERIC(5) DEFAULT 1 REFERENCES subject ON DELETE SET DEFAULT,
    teacher_certifi_date DATE NOT NULL
);

INSERT INTO teacher VALUES (00011,'HUR',00001,'2020-01-05'),
                           (00021,'KIM',00002,'2020-02-22'),
                           (00031,'LEE',00003,'2020-03-07');

SELECT * FROM teacher;

-- 참조된 값 지우기
DELETE FROM subject WHERE subj_id = 00002;
SELECT * FROM subject;

-- 자식 테이블 확인하기
SELECT * FROM teacher;
---------------------------------------------------------------------------------------
-- CHECK
CREATE TABLE order_info (
    order_no INTEGER NOT NULL PRIMARY KEY,
    cust_name VARCHAR(100),
    price MONEY,
    order_qty INTEGER CHECK (order_qty > 0)
);
---------------------------------------------------------------------------------------
-- 실습하기
-- CREATE TABLE COUNTRY
CREATE TABLE country (
    country_cd SERIAL NOT NULL PRIMARY KEY,
    country_name VARCHAR(30) NOT NULL,
    region VARCHAR(30) NOT NULL
);

-- CREATE DOMAIN PWCHAR
CREATE DOMAIN pwchar AS char CHECK (8 <= char_length(VALUE) AND char_length(VALUE) <= 16);

-- CREATE TABLE USERS
CREATE TABLE users (
    user_pk SERIAL NOT NULL,
    user_id VARCHAR(30) NOT NULL UNIQUE,
    user_pw PWCHAR NOT NULL,
    user_age NUMERIC(3) NOT NULL,
    register_date DATE NOT NULL,
    country_cd SERIAL REFERENCES country,
    PRIMARY KEY (user_pk, country_cd)
);

-- CREATE TABLE TOPIC
CREATE TABLE topic (
    topic_cd SERIAL NOT NULL PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL UNIQUE
);

-- CREATE TABLE BOARD
CREATE TABLE board (
    board_pk SERIAL NOT NULL,
    board_user VARCHAR(30) NOT NULL,
    board_date DATE NOT NULL,
    topic_cd SERIAL NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    hidden BOOLEAN NOT NULL,
    likes INTEGER NOT NULL,
    comments JSON,
    PRIMARY KEY (board_pk, topic_cd),
    FOREIGN KEY (board_user) REFERENCES users (user_id),
    FOREIGN KEY (topic_cd) REFERENCES topic
);