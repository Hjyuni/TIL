DROP TABLE develop_book IF EXISTS;

CREATE TABLE develop_book (
    book_id INTEGER,
    date DATE,
    name VARCHAR(80)
);

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