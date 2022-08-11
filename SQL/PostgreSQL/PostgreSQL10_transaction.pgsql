-- TRANSACTION
-- BASIC
BEGIN;
UPDATE customer
SET phone_number = '010-1234-5678'
WHERE name = 'HJY';
COMMIT;

-- ROLLBACK
-- 트랜잭션 수행 중 문제가 생겨 원래 번호로 되돌려야 할 때
-- COMMIT 전에 ROLLBACK 사용해야 하는 것 주의
BEGIN;
UPDATE customer
SET phone_number = '010-1234-5678'
WHERE name = 'HJY';
ROLLBACK;
COMMIT;

-- SAVEPOINT
BEGIN;
UPDATE customer
SET phone_number = '010-1234-5678'
WHERE name = 'HJY';
SAVEPOINT savepoint1;
UPDATE customer
SET membership_point = membership_point + 10
WHERE id = 1;
ROLLBACK TO savepoint1;
UPDATE customer
SET membership_point = membership_point + 10
WHERE membership_point >= 450;
COMMIT;

-- AUTOCOMMIT
DELETE FROM develop_book WHERE book_id = 1 or book_id = 2 or book_id = 3;
COMMIT;

-- AUTOCOMMIT OFF
\set AUTOCOMMIT off

-- CHECK AUTOCOMMIT ON / OFF
\echo :AUTOCOMMIT
---------------------------------------------------------------------------------------
-- SET ISOLATION LEVEL
BEGIN;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
COMMIT;
