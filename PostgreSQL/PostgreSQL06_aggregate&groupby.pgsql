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
---------------------------------------------------------------------------------------
SELECT * FROM canned_food;

-- canned_food의 name들을 배열 형태로
SELECT array_agg(name) FROM canned_food;

-- GROUP BY와 함께 사용
SELECT id, weight, array_agg(name)
FROM canned_food
GROUP BY 1,2
ORDER BY 1;
---------------------------------------------------------------------------------------
SELECT * FROM company_json;

-- 두 개의 출력결과 다른 것 확인하기
-- JSON_AGG()
-- JSON형태로 저장
SELECT id, json_agg(information)
FROM company_json
GROUP BY 1;

-- JSONB_AGG()
-- 입력된 그대로 저장
SELECT id, jsonb_agg(information)
FROM company_json
GROUP BY 1;

SELECT id,json_agg(name)
FROM ramen
GROUP BY 1
ORDER BY 1;

SELECT json_agg(name) FROM ramen;

-- JSON_OBJECT_AGG()
SELECT json_object_agg(id,name) FROM ramen;

SELECT id,quantity,shelf_life,json_object_agg(name,is_spicy)
FROM ramen
GROUP BY 1,2,3
ORDER BY 1;

-- JSONB_OBJECT_AGG()
-- 공백 사라짐
SELECT id,quantity,shelf_life,jsonb_object_agg(name,is_spicy)
FROM ramen
GROUP BY 1,2,3
ORDER BY 1;
---------------------------------------------------------------------------------------
SELECT count(*), max(rating) FROM rating;

SELECT item_id, item_type, max(rating), min(rating)
FROM rating
GROUP BY 1, 2
ORDER BY 1;

SELECT user_id, max(rating), min(rating)
FROM rating
GROUP BY 1
ORDER BY 1;

SELECT item_id, item_type, max(rating), min(rating), avg(rating)
FROM rating
GROUP BY 1, 2
HAVING avg(rating) > 2
ORDER BY 1;

SELECT item_id, item_type, json_object_agg(user_id,rating)
FROM rating
GROUP BY 1,2;

SELECT item_id, item_type, json_object_agg(user_id,rating)
FROM rating
GROUP BY 1,2
HAVING avg(rating) > 2;
---------------------------------------------------------------------------------------
-- practice
CREATEDB -U postgres population_and_accident
psql -U postgres -d population_and_accident -f C:/TIL/PostgreSQL/PostgreSQL_data/population_and_accident.dump

---------------------------------------------------------------------------------------
-- UNION ALL: 중복값 제거 하지 않고 전부 합침
(SELECT * FROM drink)
UNION ALL
(SELECT * FROM drink);

-- UNION : 중복값 제거 후 합침
(SELECT * FROM drink)
UNION
(SELECT * FROM drink);

-- 두 테이블의 컬럼수는 같아야함
(SELECT name FROM drink)
UNION ALL
(SELECT name, quantity FROM drink); -- ERROR

-- 컬럼은 같은 위치에 동일 형식, 의미가 담겨야 함
(SELECT id, name, quantity FROM drink)
UNION ALL
(SELECT id, name, is_spicy FROM drink); -- ERROR

-- INTERSECT ALL
((SELECT * FROM drink)
UNION ALL
(SELECT * FROM drink))
INTERSECT ALL
((SELECT * FROM drink)
UNION
(SELECT * FROM drink));

-- INTERSECT
((SELECT * FROM drink)
UNION ALL
(SELECT * FROM drink))
INTERSECT
((SELECT * FROM drink)
UNION
(SELECT * FROM drink));

-- EXCEPT ALL
((SELECT id, name, quantity FROM drink)
UNION ALL
(SELECT id, name, quantity FROM ramen))
EXCEPT ALL
((SELECT id, name, quantity FROM drink)
UNION ALL
(SELECT id, name, quantity FROM canned_food));

-- EXCEPT
((SELECT id, name, quantity FROM drink)
UNION ALL
(SELECT id, name, quantity FROM ramen))
EXCEPT
((SELECT id, name, quantity FROM drink)
UNION ALL
(SELECT id, name, quantity FROM canned_food));
---------------------------------------------------------------------------------------
(
    SELECT name, quantity, 'drink' AS item_type FROM drink
)
UNION ALL
(
    SELECT name, quantity, 'ramen' AS item_type FROM ramen
)
UNION ALL
(
    SELECT name, quantity, 'canned_food' AS item_type FROM canned_food
)
ORDER BY quantity DESC;

SELECT item_type, array_agg(name)
FROM (
    (
        SELECT name, quantity, 'drink' AS item_type FROM drink
    )
    UNION ALL
    (
        SELECT name, quantity, 'ramen' AS item_type FROM ramen
    )
    UNION ALL
    (
        SELECT name, quantity, 'canned_food' AS item_type FROM canned_food
    )
)
WHERE quantity <= 20
GROUP BY 1;
---------------------------------------------------------------------------------------
-- FROM & CROSS JOIN : 같은 결과값 나옴
SELECT * FROM rating, ramen;
SELECT * FROM rating CROSS JOIN ramen;

