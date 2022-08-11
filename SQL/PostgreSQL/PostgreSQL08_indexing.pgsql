-- CREATE INDEX
CREATE INDEX name_idx ON ramen(name);
-- 확인하기
\d ramen

-- COMPOUND COLUMN INDEX
CREATE INDEX item_index ON rating(item_type ASC, item_id DESC);

-- UNIQUE INDEX
CREATE UNIQUE INDEX dring_name_idx ON drink(name);

INSERT INTO public.drink(name, quantity, shelf_life, volume)
VALUES ('오렌지주스', 1, 10, 120);

-- HASH INDEX
CREATE INDEX hash_idx ON users USING HASH(name);

-- GIN INDEX
-- to_tsvector FUNCTION
SELECT to_tsvector('english',content) FROM boards;

-- 검색하고자 하는 tsvector에 tsquery를 @@로 연산하면 해당 단어가 포함된 데이터를 찾을 수 있음
SELECT id, title
FROM boards
WHERE to_tsvector('english',content) @@ to_tsquery('time');

CREATE INDEX gin_idx ON boards USING GIN(to_tsvector('english',content));

-- PARTIAL INDEX
CREATE INDEX spicy_idx ON ramen(shelf_life) WHERE is_spicy;

-- UPDATE / DELETE INDEX
ALTER INDEX spicy_idx RENAME TO partial_index;
DROP INDEX partial_index;

-- CONCURRENTLY INDEX
CREATE INDEX CONCURRENTLY spicy_idx ON ramen(shelf_life) WHERE is_spicy;
DROP INDEX CONCURRENTLY spicy_idx;

-- EXPLAIN
EXPLAIN ANALYZE SELECT * FROM ramen WHERE is_spicy = true;

CREATE INDEX ocuured_at_idx ON accident(발생일시);
CREATE INDEX province_idx ON accident(시도);

-- 순차탐색
EXPLAIN SELECT * FROM public.accident
WHERE 발생일시 < '2019-08-12 00:00:00';

-- INDEX탐색
EXPLAIN SELECT * FROM public.accident
WHERE 발생일시 < '2019-08-11 00:00:00';

-- BITMAP탐색
EXPLAIN SELECT * FROM public.accident
WHERE 발생일시 < '2019-08-11 00:00:00' AND 시도='충북';

-- STATICS
-- PG_STAT_USER_INDEXES VIEW
SELECT
    schemaname AS schema_name,
    relname AS table_name,
    indexrelname AS index_name,
    pg_size_pretty(pg_relation_size(indexrelid::regclass)) AS index_size,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- 통계를 새로 수집하기 시작한 일시
SELECT stats_reset FROM pg_stat_bgwriter;

-- 통계 정보가 오래되었을 때 기존 통계정보 초기화 시키고 최신 통계정보 다시 축적
-- 현재 DB의 통계정보가 전부 지워지기 때문에 미리 통계 정보 저장하고 실행하기
SELECT * FROM pg_stat_reset();