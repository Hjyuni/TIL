# SQL

>  Book: 데이터 분석을 위한 SQL 레시피

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