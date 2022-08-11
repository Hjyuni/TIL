-- bash
createdb -U postgres gyeonggi_graduates
psql -U postgres -d gyeonggi_graduates -f /postgres/PostgreSQL_data/gyeonggi_graduates.dump
---------------------------------------------------------------------------------------
-- psql
-- DB: gyeonggi_graduates
-- 한해 동안 특수학교에서 졸업한 학생의 수가 25명 이상이었던 학교 이름과 남,여 졸업생 수
SELECT 학교명, 졸업남자수, 졸업여자수 
FROM graduates 
WHERE 학교급명='특수학교' AND (졸업남자수+졸업여자수) >= 25;
---------------------------------------------------------------------------------------
-- 2014년에 남,여 통학 취업률이 50%가 넘은 학교의 지역명, 이름과 취업률(%) 출력
-- 1. division by zero error
SELECT 지역명, 학교명, (취업남자수+취업여자수)*100/(졸업남자수+졸업여자수) AS "취업률"
FROM graduates
WHERE (취업남자수+취업여자수)*100/(졸업남자수+졸업여자수) >= 50 AND SUBSTRING(기준년도::varchar,1,4)='2014';

-- 2. MY ANSWER
-- NULLIF(매개변수1, 매개변수2) : 매개변수 1과 2가 같으면 NULL 아니면 매개변수1 반환
SELECT 지역명, 학교명, (취업남자수+취업여자수)*100/NULLIF(졸업남자수+졸업여자수,0) AS "취업률"
FROM graduates
WHERE (취업남자수+취업여자수)*100/NULLIF(졸업남자수+졸업여자수,0) >= 50 AND SUBSTRING(기준년도::varchar,1,4)='2014';

-- ANSWER(책 기준)
-- EXTRACT(<특정 정보> FROM <날짜 및 시간 정보>) : 날짜 및 시간 데이터 타입에서 특정 정보만 빼오기
SELECT 학교명, 지역명, (취업남자수+취업여자수)*100/NULLIF(졸업남자수+졸업여자수,0) AS "취업률"
FROM graduates
WHERE EXTRACT(YEAR FROM 기준년도) = 2014
    AND (졸업남자수+졸업여자수) > 0
    AND (취업남자수+취업여자수)*100/(졸업남자수+졸업여자수) >= 50;
---------------------------------------------------------------------------------------
-- 진학률 내림차순으로 지역명에 경기도 고양시 일산이 포함되어 있는 기준년도(연도만 나오게), 학교명, 지역명(구만 나오게), 진학률 출력
-- MY ANSWER
SELECT EXTRACT(YEAR FROM 기준년도) AS 기준년도, 학교명, REPLACE(지역명, '경기도 고양시 ','') AS 지역명, (진학남자수+진학여자수)*100/NULLIF(졸업남자수+졸업여자수,0) AS 진학률
FROM graduates
WHERE 지역명 LIKE '경기도 고양시 일산%'
ORDER BY 진학률 DESC;

-- ANSWER(책 기준)
SELECT EXTRACT(YEAR FROM 기준년도) AS 기준년도, 학교명, REPLACE(지역명, '경기도 고양시 ','') AS 지역명,
    CASE
    WHEN (졸업남자수 + 졸업여자수) = 0
    THEN 0
    ELSE (진학남자수+진학여자수)*100/(졸업남자수+졸업여자수)
    END AS 진학률
FROM graduates
WHERE 지역명 LIKE '경기도 고양시 일산%'
ORDER BY 4 DESC;
---------------------------------------------------------------------------------------
-- bash
createdb -U postgres population_and_accident
psql -U postgres -d population_and_accident -f /postgres/PostgreSQL_data/population_and_accident.dump
---------------------------------------------------------------------------------------
-- psql
-- DB: population_and_accident
-- 교차로에서 사고자가 5명 이상인 대형 사고는 어느 시도, 시군구에서 발생했는지 사고자 수로 내림차순
SELECT a.시도, a.시군구, count(*) 사고횟수
FROM accident a JOIN road_type r USING(도로형태id)
WHERE r.대분류='교차로' AND (사망자수 + 부상자수 + 중상자수 + 경상자수 + 부상신고자수) >= 5
GROUP BY 시도, 시군구
ORDER BY 사고횟수 DESC;

-- ANSWER(책 기준)
SELECT 시도, 시군구, count(*) 사고횟수
FROM accident JOIN road_type USING(도로형태id)
WHERE road_type.대분류='교차로' AND (사망자수 + 부상자수 + 중상자수 + 경상자수 + 부상신고자수) >= 5
GROUP BY 시도, 시군구
ORDER BY 사고횟수 DESC;
---------------------------------------------------------------------------------------
-- 세대수 대비 사망자수가 많은 순으로 시도, 시군구를 출력
-- MY ANSWER : 못 품..
-- 참고할 만한 사이트: https://stackoverflow.com/questions/19601948/must-appear-in-the-group-by-clause-or-be-used-in-an-aggregate-function
SELECT a.시도, a.시군구, sum(a.사망자수)/p.세대수::integer
FROM accident a JOIN population p ON(a.시군구=p.시군구 AND a.시도=p.시도) 
GROUP BY a.시도, a.시군구;

-- ANSWER(책 기준)
SELECT p.시도, p.시군구, sigungu_acc.사망자수::decimal/p.세대수 AS 세대당_사망자수
FROM population p JOIN (
    SELECT 시군구, 시도, sum(사망자수) AS 사망자수
    FROM accident
    GROUP BY 시군구, 시도
    ORDER BY 사망자수 DESC
) sigungu_acc ON (p.시군구=sigungu_acc.시군구 AND p.시도=sigungu_acc.시도)
ORDER BY 세대당_사망자수 DESC;
---------------------------------------------------------------------------------------
-- 시도의 각 시군구 평균 사고 횟수 대비 각 시군구가 얼만큼 사고가 더 나는지 증감을 표로 표시
-- ANSWER(책 기준)
SELECT 시군구_사고횟수.시도, 시군구_사고횟수.시군구, 시군구_사고횟수.사고횟수, (시군구_사고횟수.사고횟수-시도_평균_사고횟수.평균_사고횟수) AS 평균대비_사고횟수_증감
FROM (
    SELECT 시군구, 시도, count(*) AS 사고횟수
    FROM accident
    GROUP BY 시군구, 시도
) 시군구_사고횟수 JOIN
(
    SELECT 시도, avg(사고횟수) AS 평균_사고횟수
    FROM (
        SELECT 시군구, 시도, count(*) AS 사고횟수
        FROM accident
        GROUP BY 시군구, 시도
    ) 시군구_사고횟수
    GROUP BY 시도
) 시도_평균_사고횟수
ON 시군구_사고횟수.시도=시도_평균_사고횟수.시도
ORDER BY 평균대비_사고횟수_증감 DESC;