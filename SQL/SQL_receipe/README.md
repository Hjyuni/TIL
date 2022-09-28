# SQL

>  Book: 데이터 분석을 위한 SQL 레시피
>
>  Data: http://hanbit.co.kr/src/10060

## 0. System

### 0-1. PostgreSQL

* 오픈소스 RDB

* MySQL 등 다른 RDB와 비교하면 표준 SQL을 잘 준수하고, 윈도함수, CTE 등 분석에 필수적으로 사용하는 구문 등을 모두 구현
* 가장 오래된 역사를 가졌음

---

### 0-2. Apache Hive

* HDFS라고 부르는 분산 파일 시스템 위의 데이터를 SQL스러운 인터페이스로 간단하게 처리해주는 시스템
* `MapReduce`: 분산 파일 시스템 위의 데이터의 순서를 맞추는 방법으로 고안된 알고리즘
* Hadoop의 일부분, HiveQL이라 부르는 SQL스러운 쿼리 언어
* 작성한 쿼리를 자동으로 MapReduce로 변환해서 간단하게 병렬 분산 처리를 할 수 있음
* Hive는 **파일 기반의 시스템에 있음**
  * 특정 데이터 하나를 변경하거나 제거하는 것이 어려움
  * 인덱스가 default로 존재하지 않아 쿼리 실행 따 파일 전체를 조작해야 함
  * 동적 스키마 정의 가능
  * SQL만으로는 구현하기 어려운 문자열 처리 등을 간단하게 할 수 있음

---

### 0-3. Amazon Redshift

* AWS에서 제공하는 분산 병렬 RDB⭐
* PostgreSQL와 호환성을 가져서 psql 클라이언트에서 바로 Redshift에 접속 가능
* 사용시간에 따라 비용이 발생하고 노드 인스턴스를 관리할 전문적 지식 필요

---

### 0-4. BidQuery

* 빅데이터 분석을 위해 구글에서 제공하는 클라우드 서비스
* 직접 노드 관리할 필요가 없으며 데이터의 양에 따라 비용이 발생

---

### 0-5. SparkSQL

* MapReduce를 사용한 분산 처리 프레임 워크인 Apache Spark의 기능 중 SQL인터페이스와 관련된 기능을 나타내는 용어
* 다양한 처리를 쉽게 분산 처리 할 수 있는 기능 제공

---

## 1. Data

* 무결성 VS 정합성 : https://blog.naver.com/PostView.naver?blogId=remocon33&logNo=222479119313&parentCategoryNo=53&categoryNo=&viewDate=&isShowPopularPosts=true&from=search

### 1-1. 업무 데이터

* **서비스와 시스템을 운용하기 위한** 목적으로 구축된 db에 존재하는 데이터
* 대부분의 데이터가 **갱신형 데이터**(새로운 데이터를 삽입하는 대신 기존의 데이터를 갱신)임
* 갱신형 데이터는 두 가지로 나뉨
  * 트랜잭션 데이터: 사용자의 행동을 기록한 데이터(구매 데이터, 리뷰 데이터 등)
  * 마스터 데이터: 서비스와 시스템이 정의하고 있는 데이터(상품 이름, 상품 카테고리 등)
* 특징
  * 데이터의 정밀도가 높음
  * 데이터를 추출하는 시점에 따라 추출되는 데이터가 바뀔 수 있음
  * 데이터의 확장성을 배제하고 데이터의 정합성을 쉽게 유지
  * 트랜잭션 기능으로 인해 데이터의 정합성 보장
    * 데이터 정합성: 데이터가 서로 모순 없이 일관되게 일치해야 함
  * 서비스의 방문횟수, 사용자 유도 등의 데이터 분석에는 사용할 수 없음

---

### 1-2. 로그 데이터

* 누적형 데이터 
* 사용자 엔드포인트, IP 주소, URL, 레퍼러 등의 정보를 저장한 것
* 추출 방법에 따라 데이터의 정밀도가 달라짐
* 과거의 로그 데이터 변경되지 않음
* 웹사이트에서의 행동을 기록할 때 활용

---

## 2. 하나의 값 조작하기

* 업무데이터의 경우 db에 코드 값을 저장하고 이러한 코드 값의 의미를 다른 테이블에서 관리하는 경우가 있는데 이러면 리포트의 코드가 무엇을 의미하는지 정확하게 알 수 없음 따라서 데이터 분석에 적합한 형태로 미리 가공해야함
* 어떤 값과 Null을 연산하면 결과가 Null이 나올 수 있으므로 Null이 나오지 않게 데이터를 가공해야함

### 2-1. CASE ~ WHEN ~ THEN ~ END

> https://www.w3schools.com/sql/sql_case.asp

```sql
# CASE WHEN 조건1 THEN 결과1 WHEN 조건2 THEN 결과2 ELSE default
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```

### 2-2. substring

1. substring

> https://w3resource.com/PostgreSQL/substring-function.php

```sql
# substring(abcdef from 2 for 3) : abc 중 1번째 자리부터 3개 보여줘(bcd)
substring(string [from <str_pos>] [for <ext_char>])
```

2. regexp_replace

* 주어진 문자역에서 특정 패턴을 찾아서 주어진 다른 모양으로 치환하는 함수

3. regexp_substr

* 정규 표현식
  * `?`: 앞 문자가 0번 또는 1번 표시되는 패턴(없어도 되고 한 번 있어도 되는 패턴)
  * `*`: 앞 문자가 0번 또는 그 이상 반복되는 패턴
  * `+`: 앞 문자가 1번 또는 그 이상 반복되는 패턴
  * `[]`: []사이의 문자들과 매치