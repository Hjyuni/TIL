-- INSTALL PROCEDURE LANGUAGE
CREATE LANGUAGE PLpgSQL;

-- CREATE FUNCTION
CREATE FUNCTION MUL(A INTEGER, B INTEGER)
RETURNS INTEGER AS
$$ BEGIN
RETURN A*B
END; $$
LANGUAGE PLpgSQL;

-- REPLACE
REPLACE FUNCTION MUL(A INTEGER, B INTEGER, C INTEGER)
RETURNS INTEGER AS
$$ BEGIN
RETURN A*B*C
END; $$
LANGUAGE PLpgSQL;

-- CHECK FUNCTION LIST
\df

-- USE FUNCTION
SELECT mul(10,20,30);
---------------------------------------------------------------------------------------
-- TRIGGER
CREATE TABLE subs_table(
    subs_id INTEGER,
    subs_name VARCHAR(80)
);

CREATE TABLE num_subs(
    subs_num INTEGER
);

CREATE FUNCTION inc()
RETURNS TRIGGER AS
$$BEGIN
UPDATE num_subs SET subs_num += 1;
RETURN NULL;
END;$$
LANGUAGE PLpgSQL;

CREATE TRIGGER subs_insert AFTER INSERT ON subs_table
FOR EACH ROW EXECUTE PROCEDURE inc();

INSERT INTO subs_table VALUES (1,'A'),(2,'B'),(3,'C');

SELECT * FROM num_subs;
---------------------------------------------------------------------------------------
-- VIEW
-- POPULATION_AND_ACCIDENT TABLE
CREATE VIEW 지역별사망자 AS
SELECT 발생일시, 사망자수, 시도, 시군구
FROM accident;

-- CHECK VIEW LIST
\dv

-- CHECK REFERENCE RELATIONSHIP : \d+ VIEW_NAME
\d+ 지역별사망자

-- DROP VIEW_NAME
DROP VIEW 지역별 사망자

-- HOW TO USE VIEW 1
-- 기존 테이블처럼 사용하기
SELECT 발생일시, 시도, 시군구, 사망자수 FROM 지역별사망자
WHERE 사망자수 = (
    SELECT max(사망자수) FROM 지역별사망자
);

-- HOW TO USE VIEW 2
-- 생성된 뷰를 참조하는 새로운 뷰 만들기
CREATE VIEW 최대사망자수 AS
SELECT max(사망자수)
FROM 지역별사망자;

SELECT 발생일시, 시도, 시군구, 사망자수 FROM 지역별사망자
WHERE 사망자수 = (
    SELECT * FROM 최대사망자수
);

\d+ 최대사망자수
---------------------------------------------------------------------------------------
-- MATERIALIZED VIEW
CREATE MATERIALIZED VIEW 지역평균_인구정보 AS
SELECT 시도, avg(세대수) AS 세대수, avg(세대당_인구) AS 세대당_인구, avg(남여_비율) AS 남여_비율
FROM population
GROUP BY 1
ORDER BY 세대수 DESC
WITH DATA;

SELECT * FROM 지역평균_인구정보;

CREATE MATERIALIZED VIEW 지역평균_인구정보_NO_DATA AS
SELECT 시도, avg(세대수) AS 세대수, avg(세대당_인구) AS 세대당_인구, avg(남여_비율) AS 남여_비율
FROM population
GROUP BY 1
ORDER BY 세대수 DESC
WITH NO DATA;

SELECT * FROM 지역평균_인구정보_NO_DATA;

REFRESH MATERIALIZED VIEW 지역평균_인구정보_NO_DATA;

SELECT * FROM 지역평균_인구정보_NO_DATA;

-- CHECK MATERIALIZED VIEW
\dm

DROP MATERIALIZED VIEW VIEW_NAME;
---------------------------------------------------------------------------------------
-- 복잡한 SQL문
SELECT not_spicy.name AS not_spicy_name, spicy.name AS spicy_name, (not_spicy.avg_rating + spicy.avg_rating) AS avg_sum_rating
FROM (
    SELECT ramen.name, ramen.id AS item_id,ramen.is_spicy, COALESCE(avg_rating,0) AS avg_rating
    FROM (
        SELECT avg(rating.rating) AS avg_rating, item_type, item_id
        FROM rating
        WHERE item_type='ramen'
        GROUP BY item_type, item_id
    ) r_rating RIGHT JOIN ramen ON ramen.id = r_rating.item_id
    WHERE ramen.is_spicy = FALSE
) not_spicy, (
    SELECT ramen.name, ramen.id AS item_id, ramen.is_spicy, COALESCE(avg_rating,0) AS avg_rating
    FROM (
        SELECT avg(rating,rating) AS avg_rating, item_type, item_id
        FROM rating
        WHERE item_type='ramen'
        GROUP BY item_type, item_id
    ) r_rating RIGHT JOIN ramen ON ramen.id = r_rating.item_id
    WHERE ramen.is_spicy = TRUE
) spicy;

-- VIEW
CREATE VIEW not_spicy_view AS
SELECT ramen.name, ramen.id AS item_id, ramen.is_spicy, COALESCE(avg_rating, 0) AS avg_rating
FROM (
    SELECT avg(rating.rating) AS avg_rating, item_type, item_id
    FROM rating
    WHERE item_type = 'ramen'
    GROUP BY item_type, item_id
) r_rating RIGHT JOIN ramen ON ramen.id = r_rating.item_id
WHERE ramen.is_spicy = FALSE;

CREATE VIEW spicy_view AS
SELECT ramen.name, ramen.id AS item_id, ramen.is_spicy, COALESCE(avg_rating, 0) AS avg_rating
FROM (
    SELECT avg(rating.rating) AS avg_rating, item_type, item_id
    FROM rating
    WHERE item_type = 'ramen'
    GROUP BY item_type, item_id
) r_rating RIGHT JOIN ramen ON ramen.id = r_rating.item_id
WHERE ramen.is_spicy = TRUE;

-- 복잡한 SQL문을 VIEW로 간단하게 만들기
SELECT not_spicy.name AS not_spicy_name, spicy.name AS spicy_name, (not_spicy.avg_rating + spicy.avg_rating) AS avg_sum_rating
FROM (
    SELECT * FROM not_spicy_view
) not_spicy, (
    SELECT * FROM spicy_view
)