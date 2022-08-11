-- INNER JOIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating, ramen
WHERE ramen.id = rating.item_id AND rating.item_type = 'ramen';

SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating JOIN ramen ON ramen.id = rating.item_id AND rating.item_type = 'ramen';

-- EXPLAIN을 이용해 동작원리 살펴볼 수 있음
EXPLAIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating, ramen
WHERE ramen.id = rating.item_id AND rating.item_type = 'ramen';

EXPLAIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating JOIN ramen ON ramen.id = rating.item_id AND rating.item_type = 'ramen';

-- LEFT JOIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating LEFT JOIN ramen ON ramen.id = rating.item_id AND rating.item_type = 'ramen';

-- RIGHT JOIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating RIGHT JOIN ramen ON ramen.id = rating.item_id AND rating.item_type = 'ramen';

-- FULL OUTER JOIN
SELECT rating.user_id, rating.rating, ramen.name, ramen.quantity, ramen.is_spicy
FROM rating FULL OUTER JOIN ramen ON ramen.id = rating.item_id AND rating.item_type = 'ramen';
---------------------------------------------------------------------------------------
-- JOIN 사용 위치
SELECT users.name, ramen.name, rating.rating, ramen.quantity, ramen.is_spicy
FROM rating
JOIN ramen
ON ramen.id = rating.item_id AND rating.item_type = 'ramen'
JOIN users
ON users.id = rating.user_id
WHERE rating >= 3;

-- 괄호 사용하기
SELECT users.name, ramen.name, rating.rating, ramen.quantity, ramen.is_spicy
FROM (
    (
        rating JOIN ramen
        ON ramen.id = rating.item_id AND rating.item_type = 'ramen'
    ) JOIN users
    ON users.id = rating.user_id
)
WHERE rating >= 3;
---------------------------------------------------------------------------------------
-- ON
SELECT drink_rating.user_id, drink_rating.rating, drink.name, drink.quantity, drink.volume
FROM (
    (
        SELECT rating.item_id AS id, rating.rating, rating.user_id
        FROM rating
        WHERE rating.item_type = 'drink'
    ) drink_rating
    JOIN drink
    ON drink.id = drink_rating.id
);

-- USING
SELECT drink_rating.user_id, drink_rating.rating, drink.name, drink.quantity, drink.volume
FROM (
    (
        SELECT rating.item_id AS id, rating.rating, rating.user_id
        FROM rating
        WHERE rating.item_type = 'drink'
    ) drink_rating
    JOIN drink
    ON drink.id = drink_rating.id
);
---------------------------------------------------------------------------------------
-- COLAESCE
SELECT canned_food.name, COALESCE(sum(can_rating.rating),0)
FROM canned_food 
LEFT JOIN (
    SELECT *
    FROM rating
    WHERE item_type = 'canned_food'
)
ON canned_food.id = can_rating.item_id
GROUP BY canned_food.name;

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