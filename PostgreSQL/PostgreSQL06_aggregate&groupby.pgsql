CREATEDB -U postgres union_example
psql -U postgres -d union_example -f C:/TIL/PostgreSQL/PostgreSQL_data/union_example.dump
---------------------------------------------------------------------------------------
SELECT * FROM rating;

-- DISTINCT
SELECT DISTINCT item_type
FROM rating;

-- DISTINCT 여러 컬럼
SELECT DISTINCT item_id, item_type
FROM rating
ORDER BY item_type;

-- GROUP BY
SELECT item_type
FROM rating
GROUP BY item_type;

SELECT item_id, item_type
FROM rating
GROUP BY item_id, item_type;

-- GROUP BY WITH AGGREGATE FUNCTION
SELECT item_type, count(*)
FROM rating
GROUP BY item_type;

SELECT item_id, item_type, count(*)
FROM rating
GROUP BY item_id, item_type;

SELECT item_id, item_type, count(*)
FROM rating
GROUP BY 1, 2;

-- HAVING
SELECT item_type, count(*)
FROM rating
GROUP BY item_type
HAVING count(*) > 3;

SELECT item_type, count(*)
FROM rating
WHERE item_type LIKE '%a%'
GROUP BY item_type
HAVING count(*) > 3;

-- 명령어 순서 : FROM - WHERE - GROUP BY - HAVING - SELECT - DISTINCT - ORDER BY - LIMIT
SELECT item_type, count(*)
FROM rating
WHERE item_type LIKE '%a%'
GROUP BY 1
HAVING count(*) > 3
ORDER BY 1
LIMIT 1;
---------------------------------------------------------------------------------------
-- AVG
SELECT AVG(rating) FROM rating;

-- COUNT
SELECT COUNT(rating) FROM rating;

-- MAX
SELECT MAX(rating) FROM rating;

-- MIN
SELECT MIN(rating) FROM rating;

-- SUM
SELECT SUM(rating) FROM rating;

-- WHERE 절에서 집계함수 사용 안됨, 서브쿼리 사용해야 함
SELECT item_id, item_type FROM rating
WHERE rating = max(rating); -- ERROR

SELECT item_id, item_type FROM rating
WHERE rating = (
    SELECT max(rating) FROM rating
);
---------------------------------------------------------------------------------------
SELECT * FROM ramen;

-- bool_and(컬럼명) = every(컬럼명)
SELECT bool_and(is_spicy) FROM ramen;
SELECT every(is_spicy) FROM ramen;
-- bool_or(컬럼명)
SELECT bool_or(is_spicy) FROM ramen;
