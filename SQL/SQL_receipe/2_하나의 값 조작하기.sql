-- 2-1.코드 값을 레이블로 변경하기
DROP TABLE IF EXISTS mst_users;
CREATE TABLE mst_users(
    user_id         varchar(255)
  , register_date   varchar(255)
  , register_device integer
);

INSERT INTO mst_users
VALUES
    ('U001', '2016-08-26', 1)
  , ('U002', '2016-08-26', 2)
  , ('U003', '2016-08-27', 3)
;

-- CASE WHEN
SELECT 
  user_id
  , CASE
      WHEN register_device=1 THEN '데스크톱'
      WHEN register_device=2 THEN '스마트폰'
      WHEN register_device=3 THEN '애플리케이션'
      -- ELSE ''
    END AS device_name
FROM mst_users;

-----------------------------------------------------
-- 2-2. URL에서 요소 추출하기

DROP TABLE IF EXISTS access_log ;
CREATE TABLE access_log (
    stamp    varchar(255)
  , referrer text
  , url      text
);

INSERT INTO access_log 
VALUES
    ('2016-08-26 12:02:00', 'http://www.other.com/path1/index.php?k1=v1&k2=v2#Ref1', 'http://www.example.com/video/detail?id=001')
  , ('2016-08-26 12:02:01', 'http://www.other.net/path1/index.php?k1=v1&k2=v2#Ref1', 'http://www.example.com/video#ref'          )
  , ('2016-08-26 12:02:01', 'https://www.other.com/'                               , 'http://www.example.com/book/detail?id=002' )
;

-- URL 함수, 정규표현식
-- 1)도메인 추출
-- 1.Postgresql : substring함수 + 정규표현식
SELECT
  stamp
  , substring(referrer from 'https?://([^/]*)') AS referrer_host
FROM access_log;

-- 2.Redshift : 정규 표현식에 그룹을 사용할 수 없음
-- regexp_substr, regexp_replace 함수 조합해서 사용
SELECT
  stamp
  , regexp_replace(regexp_substr(referrer, 'https?://[^/]*'), 'https?://', '') AS referrer_host
FROM access_log;

-- 3.Hive, SparkSQL : parse_url 함수
SELECT
  stamp
  ,  parse_url(referrer, 'HOST') AS referrer_host
FROM access_log;

-- 4.Bigquery : host함수
SELECT
  stamp
  , host(referrer) AS referrer_host
FROM access_log;

-----------------------------------------------------
-- 2)URL 경로와 GET 매개변수에 있는 특정 키 값을 추출
-- 1.Postgresql : substring함수 + 정규표현식
SELECT
  stamp
  , url
  , substring(url from '//[^/]+([^?#]+)') AS path
  , substring(url from 'id=([^&]*)') AS id
FROM access_log;

-- 2.Redshift : 정규 표현식에 그룹을 사용할 수 없음
-- regexp_substr, regexp_replace 함수 조합해서 사용
SELECT
  stamp
  , url
  , regexp_replace(regexp_substr(url, '//[^/]+[^?#]+'), '//[^/]+','') AS path
  , regexp_replace(regexp_substr(url, 'id=[^&]*'), 'id=','') AS id
FROM access_log;

-- 3.Bigquery : regexp_extract 함수 사용하기
SELECT
  stamp
  , url
  , regexp_extract(url, '//[^/]+([^?#]+)') AS path
  , regexp_extract(url, 'id=([^&]*)') AS id
FROM access_log;

-- 4.Hive, SparkSQL : parse_url
SELECT
  stamp
  , url
  , parse_url(url, 'PATH') AS path
  , regexp_extract(url, 'QUERY', 'id') AS id
FROM access_log;
