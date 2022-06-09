# MongoDB

> MongoDB Document : https://www.mongodb.com/docs/
>
> MongoDB download : https://www.mongodb.com/try/download/community
>
> for Window : https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0
>
> Robo 3T download : https://robomongo.org/

## 1. NoSQL란?

* Not Only SQL
* RDBMS의 한계를 극복하기 위해 만들어진 새로운 형태의 데이터 저장소
* RDBMS처럼 고정된 스키마 및 JOIN이 존재하지 않음
* 스키마 변경이 필요 없음
* RDBMS를 기본으로 사용하지만 초당 데이터가 수십만개씩 쌓이는 서비스가 많아지면서 NoSQL 많이 사용

| SQL             | NoSQL              |
| --------------- | ------------------ |
| 정해진 규격     | 정해진 규격 없음   |
| Join 가능       | Join 불가능        |
| 트랜잭션 사용   | 트랜잭션 사용 안함 |
| 분산처리 어려움 | 분산처리 쉬움      |

* NoSQL는 각 데이터베이스마다 기반으로 하는 데이터 모델이 다르므로 데이터 모델별로 대표적인 데이터베이스를 알아둘 필요가 있음

| Type              | DataBase             |
| ----------------- | -------------------- |
| Key-Value Store   | redis⭐, riak         |
| Wide Column Store | Hbase⭐, cassandra⭐   |
| Document Store    | mongoDB⭐, CouchDB    |
| Graph Store       | Neo4j, InfiniteGraph |

---

## 2. MongoDB란?

* Document DB : JSON 기반의 Document 데이터 관리

* mongoDB 데이터베이스 구조
  * Database - Collection - Document (RDBMS : Database - Table - Data)
  * mongoDB 데이터베이스 : Collection의 집합
  * mongoDB collection : Document의 집합
* RDBMS와 비교하기

| RDBMS       | MongoDB          |
| ----------- | ---------------- |
| Database    | Database         |
| Table       | Collection       |
| Tuple / Row | Document         |
| Column      | Key / Field      |
| Table Join  | Embedded Join    |
| Primary Key | Primary Key(_id) |

---

## 3. mongoDB shell

1. `show dbs` : 무슨 db가 있나 확인할 때
2. `use db이름` : 특정 db를 사용할 때
3. `show collections` : collections 확인할 때
4. `db.collection이름.find()` : collection 안의 document확인
5. `db.stats()` : db의 통계 정보 확인
6. `db.collection.stats()` : collection의 통계 정보 확인
6. `db.createCollection("collection이름")` : collection 생성하기
   * `db.createCollection("collection이름",{capped:true, size:100000})` : 최초 제한된 크기로 생성된 공간에서만 데이터를 저장
   * `db.collection이름.isCapped()` : capped 되어 있는지 여부
8. `db.collection이름.renameCollection("바꿀이름")` : collection이름 바꾸기
9. `db.collection이름.drop()` : collection 삭제

---

## 4. SQL과 CRUD 비교하기

* CRUD란?
  * Create(Insert), Read(Search), Update, Delete(Drop)의 줄임말

### 1) collection 입력(create,insert) 

* collection 생성
  * primary key를 위한 별도 컬럼 만들 필요 없음
  * mongodb는 collection에서 _id가 각 Document마다 자동생성되어 primary key 역할을 함
  * 컬럼마다 데이터 타입 정할 필요 없음

* collection 입력

  * `db.collection이름.insertOne({<field>:<value>})` : 하나의 document생성
  * `db.collection이름.insertMany([{<field1>:<value1>},{<field2>:<value2>},{<field3>:<value3>}])` : 여러 개의 document생성 (리스트 안에 넣어줘야 함)

  ```shell
  db.users.insertMany(
  	[
  		{name:"kkk",age:26},
  		{name:"aaa",age:15},
  		{name:"bbb",age:16}
  	]	
  )
  ```

  

### 2) collection 검색(read, search)

* collection 검색
  * `db.collcetion이름.findOne()`: 조건에 만족하는 하나의 document만 검색
  * `db.collcetion이름.find()`:조건에 맞는 doc를 list로 출력

* 비교문법

| 문법   | 기호 |
| ------ | ---- |
| `$eq`  | =    |
| `$gt`  | >    |
| `$gte` | >=   |
| `$in`  |      |
| `$lt`  | <    |
| `$lte` | <=   |
| `$ne`  | !=   |
| `$nin` |      |

* SQL의 LIKE

```shell
# SELECT * FROM users WHERE user_id LIKE '%cd%'
db.users.find({user_id:/cd/})
# SELECT * FROM users WHERE user_id LIKE 'bc%'
db.users.find({user_id:/^bc/})
# SELECT * FROM users WHERE user_id LIKE '%01'
db.users.find({user_id:/01$/})
```

* sort
  * 1:asc, -1:desc

```shell
# SELECT * FROM users ORDER BY user_id
db.users.find().sort({user_id:1})
# SELECT * FROM users ORDER BY user_id DESC
db.users.find().sort({user_id:-1})
```



* count
  * `db.collection이름.count()` or `db.collection이름.find().count()`
  * `db.collection이름.count(조건)` or `db.collection이름.find(조건).count()`
* distinct
  * `db.collection이름.distinct("field이름")`
* limit
  * `db.collection이름.find().limit(n)`
* skip
  * `db.collection이름.find().skip(n) `: 맨 처음 n개 스킵하기
* pretty
  * `db.collection이름.pretty()`: collection 예쁘게 보기



### 3) collection 수정(update)

* collection 수정

  > https://stackoverflow.com/questions/35848688/whats-the-difference-between-replaceone-and-updateone-in-mongodb

  * `db.collection이름.updateOne()`: 매칭되는 한 개의 document field수정
  * `db.collection이름.updateMany()`: 매칭되는 모든 document field수정
  * `db.collection이름.replaceOne()`: 매칭되는 document **전체**를 수정

* document에 배열 추가

  > https://www.mongodb.com/docs/manual/reference/operator/update/each/

  * `db.collection이름.updateOne({<field>:<value>},{$push:{<field>:{$each: [ <value1>, <value2> ... ]}}})`: field에 배열 추가 (중복 **제거하지 않고** 추가)
  
  * `db.collection이름.replaceOne({<field>:<value>},{$addToSet:{<field>:{$each: [ <value1>, <value2> ... ]}}})`: field에 배열 추가 (중복 **제거하고** 추가)
  
    

### 4) collection 삭제 (delete)

* collection 삭제
  * `db.collection이름.deleteOne()` : 매칭되는 한 개의 document 삭제
  * `db.collection이름.deleteMany()` : 매칭되는 모든 document 삭제
  * `db.collection이름.drop()` : collection 삭제



### 5) aggregation

> documentation: https://www.mongodb.com/docs/manual/aggregation/
>
> 참고사이트1: https://www.fun-coding.org/mongodb_advanced1.html
>
> 참고사이트2: https://jaehun2841.github.io/2019/02/24/2019-02-24-mongodb-2/#%EC%98%88%EC%A0%9C-1

* 데이터 처리 파이프라인의 개념을 모델로 함
* 여러 단계의 파이프라인을 거쳐 변화하고 하나의 문서의 형태로 집계 가능
* collection aggregate

```shell
db.collection.aggregate(
	{$match: ...},    # = WHERE, HAVING
	{$project: ...},  # = SELECT
	{$group: ...}     # = GROUP BY
)
```



* 참고

  * mapreduce : map이라는 방식으로 원하는 데이터 추출 후 reduce라는 방법으로 추출한 데이터 정제 

    * mongodb 5.0부터 사용하지 말라고 권장, 대신 aggregate를 쓰라고 권고

    > documentation : https://www.mongodb.com/docs/manual/core/map-reduce/
    >
    > 참고사이트 1: https://datamod.tistory.com/122

---

## 5. pymongo

### 1) pymongo 사용하기

⭐⭐mongoshell과 달리 <field>에 ""해줘야 하는거 잊지 않기 (ex: {"name":"홍길동"})

* python에서 mongodb사용하기

  1. 설치하기

     * `pip install pymongo`

  2. pymongo 라이브러리 import하기

     * `from pymongo import MongoClient`

  3. mongodb 접속(localhost)

     * `변수 = MongoClient() `

     * `변수 = MongoClient('localhost', 27017) `
     * `변수 = MongoClient('mongodb://localhost:27017')`

  4. 사용할 db, collection 생성 또는 선택 (**없으면 자동으로 생성됨**)

     * `db = MongoClient연결된변수['db이름']`
     * `db = MongoClient연결된변수.db이름`
     * `collection = db.['collection이름']`
     * `collection = db.collection이름`
     
     

### 2) collection 입력

* `collection이름.insert_one({<field>:<value>})`
* `collection이름.insert_many([{<field1>:<value1>}, {<field2>:<value2>}, {<field3>:<value3>},,,])`



### 3) collection 검색

* `collection이름.find_one(조건)`
* `collection이름.find(조건)` : 결과가 **list로 반환**돼서 안에 객체를 보려면 for문 써야함.
* count
  * `collection이름.estimated_document_count()` 
  * `collection이름.count_documents(조건)` : **조건에 맞는** document의 개수, **조건 안넣으면 오류나니 주의**
* sort
  * `collection이름.find().sort(정렬기준)`



### 4) collection 수정

* `collection이름.update_one({<field>:<value>},{"$set":{<field1>:<value1>}})`: **가장 먼저 검색되는** 조건에 맞는 한 document만 수정
* `collection이름.update_many({<field>:<value>},{"$set":{<field1>:<value1>}})`: 조건에 맞는 **모든** document **field** 수정
* `collection이름.replace_one({<field>:<value>},{<field1>:<value1>})`: 조건에 맞는 모든 document **전체** 수정



### 5) collection 삭제

* `collection이름.delete_one({<field>:<value>},{"$set":{<field1>:<value1>}})`: **가장 먼저 검색되는** 조건에 맞는 한 document만 삭제
* `collection이름.delete_many({<field>:<value>},{"$set":{<field1>:<value1>}})`: 조건에 맞는 **모든** document 삭제
