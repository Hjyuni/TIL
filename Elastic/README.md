# elastic & kibana

> * 처음부터 시작하는 elastic: https://www.youtube.com/watch?v=1ZQ2n5K4pGg&list=PLhFRZgJc2afp0gaUnQf68kJHPXLG16YCf&index=13
> * elastic docs: https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html
> * kibana docs: https://www.elastic.co/guide/en/kibana/current/introduction.html
> * hosts: https://chashtag.tistory.com/23

* 외부 ip에 이름 달기

```shell
sudo vim /etc/hosts
# add
# ip       ipname
[my_ip]    myip
```

## 1. elasticsearch

### 1-0.install & exec

* elasticsearch (7.17.6)

> https://www.elastic.co/guide/en/elasticsearch/reference/7.17/targz.html

```shell
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.6-linux-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.6-linux-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.17.6-linux-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.17.6-linux-x86_64.tar.gz
cd elasticsearch-7.17.6/
bin/elasticsearch -d -p es.pid
# localhost:9200
curl -XGET localhost:9200
# logs
tail -f logs/es-cluster-1.log
# kill ports
kill `cat es.pid`
```

* port : 9200/9300
  * 9200: client(http)끼리 통신
  * 9300: node(tcp)끼리 통신

* start.sh

```sh
# createFile
bin/elasticsearch -d -p es.pid
```

* stop.sh

```sh
# createFile
kill `cat es.pid`
```

* chmod

```shell
ls -la
chmod 755 *.sh
# check
ls -la
```

* execute

```shell
./start.sh
./stop.sh
```



### 1-1. jvm options

> * doc: https://www.elastic.co/guide/en/elasticsearch/reference/current/advanced-configuration.html#set-jvm-options
> * xmx / xms : https://fathory.tistory.com/19

* config/jvm.options

```shell
sudo vim config/jvm.options
# add
-Xsx512gb
-Xsm512gb
```



### 1-2. elasticsearch.yml

> doc: https://esbook.kimjmin.net/02-install/2.3-elasticsearch/2.3.2-elasticsearch.yml

* settings cluster, node,, 

* cluster & node name on command

```shell
bin/elasticsearch -E node.name="node-new"
```



### 1-3. cluster 구성

> doc: https://esbook.kimjmin.net/03-cluster/3.1-cluster-settings
>
> cluster & node: https://blog.naver.com/indy9052/220942459559

* 노드끼리 합쳐지는걸 바인딩이라고 하는데 **cluster name을 같게** 해야함 
* 하나의 서버에서 두 노드의 클러스터가 다른 이름이면 다른 클러스터로 취급함
* 같은 클러스터내에 바인딩 된 노드는 데이터 공유
* discovery: 노드가 처음 실행될 때 같은 서버, 또는 `discovery.seed_hosts: [ ]` 에 설정된 네트워크 상의 다른 노드들을 찾아 하나의 클러스터로 바인딩 하는 과정



#### 1-3-1. network_host

* 엘라스틱에 접근할 수 있는 네트워크 설정
* config/elasticsearch.yml

```yaml
network.host: ["_local_","_site_"]
```

* settings file_descriptors

> doc: https://www.elastic.co/guide/en/elasticsearch/reference/7.17/file-descriptors.html

```shell
# 일시적으로 바꾸기
sudo su  
ulimit -n 65535
# 영구 설정
sudo vim /etc/security/limits.conf
# [계정이름] -n 65535
ubuntu -n 65535
```

* max virtual memory

> doc: https://www.elastic.co/guide/en/elasticsearch/reference/7.17/vm-max-map-count.html

```shell
# 일시적
sudo sysctl -w vm.max_map_count=262144
# 영구적
sudo vim /etc/sysctl.conf
vm.max_map_count=262144
```

* discovery settings

```yaml
# config/elasticsearch.yml
discovery.seed_hosts: ["ubuntu-15U760-GR30K"]
# or discovery.seed_hosts: ["ip address"]
cluster.initial_master_nodes: ["node-1"]
```



#### 1-3-2. cluster 암호화

> * 참고블로그: https://velog.io/@halim_limha/ElasticSearch-Cluster-%EC%95%94%ED%98%B8-%EA%B1%B8%EA%B8%B0
> * doc: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-basic-setup.html#encrypt-internode-communication

* bin/elasticsearch.yml

```yml
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
```

* 공개키/대칭키 만들기

```shell
./bin/elasticsearch-certutil ca
# id/password 지정
# /config
mkdir certs
./bin/elasticsearch-certutil cert \
--ca elastic-stack-ca.p12 \
--dns localhost \
--ip 127.0.0.1,::1 \
--out config/certs/es-cluster.p12
```

* bin/elasticsearch.yml

```yaml
xpack.security.transport.ssl.keystore.path: config/certs/es-cluster.p12
xpack.security.transport.ssl.truststore.path: config/certs/es-cluster.p12
```

* secure password 지정하기

```shell
./bin/elasticsearch-keystore create
./bin/elasticsearch-keystore add xpack.security.transport.ssl.keystore.secure_password
./bin/elasticsearch-keystore add xpack.security.transport.ssl.truststore.secure_password
```

* settings elastic ID/PASS

:star: 비번 까먹으면 data파일 전부 지워야 다시 설정 가능하니 주의할 것

```shell
# auto : pwd 자동생성
# interactive : pwd 사용자 지정
bin/elasticsearch-setup-passwords interactive
curl localhost:9200 -u elastic
```

* password 추가하기
  * 노드가 여cd러개 일 때 **설정한 노드 내에서만 사용 가능**한 계정
  * File Realm

```shell
# bin/elasticsearch-users useradd [유저이름] -p [pwd] -r [role]
bin/elasticsearch-users useradd Hjyuni -p [pwd] -r superuser
# check
cat config/users
cat config/users_roles
```



### 1-4. index & shards

> https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards

* document : 단일 데이터 단위
* indices : 저장 단위인 인덱스
* index : 도큐먼트를 모아놓은 집합, **인덱스명은 유일해야 함**
* shards : 인덱스가 분리되는 단위, 각 노드에 분산되어 저장됨
* replica : 복제본, 다른 노드에 복제됨



### 1-5. CRUD

> https://esbook.kimjmin.net/04-data

* document 접근 URL : `http://<호스트>:<포트>/<인덱스>/_doc/<도큐먼트 id> `

#### 1-5-1. CREATE (명령어: PUT,POST)

* PUT

```shell
# 같은 URL에 다른 내용의 도큐먼트를 다시 입력하게 되면 기존 도큐먼트를 덮어씀
PUT index/_doc/1
{
  "name":"Jongmin Kim",
  "message":"안녕하세요 Elasticsearch"
}
# 실수로 덮어지는거 예방 위해 _doc 대신 _create 사용 가능
PUT index/_create/1
{
  "name":"Jongmin Kim",
  "message":"안녕하세요 Elasticsearch"
}

# POST는 ID 자동생성
POST index/_doc
```

#### 1-5-2. READ (명령어: GET)

* GET
  * 문서 내용이 _source에 나타남

```shell
GET my_index/_doc/1
```

#### 1-5-3. UPDATE (명령어: POST)

* PUT으로 해도 가능 하지만 모든 필드를 작성 해야 해서 POST로 원하는 필드만 수정 가능

```shell
POST my_index/_update/1
{
  "doc": {
    "message":"안녕하세요 Kibana"
  }
}
```

#### 1-5-4. DELETE (명령어: DELETE)

```shell
# delete document
DELETE my_index/_doc/1
# delete index
DELETE my_index
```

#### 1-5-5. bulk api

> * guide book: https://esbook.kimjmin.net/04-data/4.3-_bulk
>
> * doc: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

* 여러 명령을 배치로 수행하기 위해 사용
* CRUD 한번에 가능, DELETE 제외하고 명령문과 데이터문을 한 줄씩 순서대로 입혀야 함

#### 1-5-6. search api

> https://esbook.kimjmin.net/04-data/4.4-_search

### 1-6. Search

#### 1-6-1. FullText

> https://esbook.kimjmin.net/05-search/5.1-query-dsl

* score 점수가 높은 순으로 나옴

* 검색시 쿼리를 넣지 않으면 해당 인덱스의 **모든** 도큐먼트를 검색

```elm
GET my_index/_search
# OR
GET my_index/_search
{
  "query":{
    "match_all":{ }
  }
}
# 
GET my_index/_search
{
  "query": {
    "match": {
      "message": "dog"
    }
  }
}
```



* 검색어가 여럿일 때 `operator` 옵션 사용하면 됨 : `<필드명>: { "query":<검색어>, "operator": }`

```shell
GET index/_search
{
  "query": {
    "match": {
      "message": {
        "query": "quick dog",
        "operator": "and"⭐
      }
    }
  }
}
```



* 띄어쓰기까지 정확하게 하려면 `match_phrase` 사용

  * 검색어 제한 가능성 높음

  * `slop`옵션을 줘서 띄어쓰기 사이에 단어 몇 개 들어가도 허용

```shell
GET index/_search
{
  "query": {
    "match": {
      "message": {
        "query": "quick dog",
        "slop": 1⭐
      }
    }
  }
}
```

#### 1-6-2. BoolQuery

> * els 가이드북: https://esbook.kimjmin.net/05-search/5.2-bool
> * 참고사이트: https://victorydntmd.tistory.com/314

* 사용 문법
  * must: 쿼리가 참인 도큐먼트들 검색
  * must_not: 쿼리가 거짓인 도큐먼트들 검색
  * should: 검색 결과 중 이 쿼리에 해당하는 도큐먼트 점수 높임
  * filter: 쿼리가 참인 도큐먼트를 검색하지만 스토어 계산 하지 않음

```shell
GET <인덱스명>/_search
{
  "query": {
    "bool": {
      "must": [
        { <쿼리> }, …
      ],
      "must_not": [
        { <쿼리> }, …
      ],
      "should": [
        { <쿼리> }, …
      ],
      "filter": [
        { <쿼리> }, …
      ]
    }
  }
}
```

#### 1-6-3. Exact Value Query

> * els가이드북: https://esbook.kimjmin.net/05-search/5.5-exact-value

* 참/거짓 여부만 판별해서 결과를 가져오는 것
* term, range,,
* score를 반영하지 않기 때문에 **filter내부에서 사용**
* filter 내부에서 bool쿼리를 포함하려면 filter내부에 bool쿼리를 다시 넣어주면 됨

#### 1-6-4. Range Query

> * els가이드북: https://esbook.kimjmin.net/05-search/5.6-range

* 숫자나 날짜 형식 등을 검색하는 쿼리
* `range : { <필드명>: { <파라메터>:<값> } }`형태로 입력됨
  
  * `gte`: 이상
  * `gt`: 초과
  * `lte`: 이하
  * `lt`: 미만
* 날짜 검색의 기본 값은 `yyyy-mm-ddThh:mm:ss`형식임
  * 형식을 바꾸고 싶으면 format필드를 써야함
  ```shell
  # 2020-12-31~2022값 검색
  GET <index>/_search
  {
  "query": {
    "range": {
      "date": {
        "gt": "31/12/2020",
        "lt": "2022",
        "format": "dd/MM/yyyy||yyyy"
      }
    }
  }
  }
  ```



---

## 2. kibana

### 2-0. install kibana

* kibana (7.17.6)

> https://www.elastic.co/guide/en/kibana/7.17/targz.html

```shell
curl -O https://artifacts.elastic.co/downloads/kibana/kibana-7.17.6-linux-x86_64.tar.gz
curl https://artifacts.elastic.co/downloads/kibana/kibana-7.17.6-linux-x86_64.tar.gz.sha512 | shasum -a 512 -c - 
tar -xzf kibana-7.17.6-linux-x86_64.tar.gz
cd kibana-7.17.6-linux-x86_64/
bin/kibana -d
```

* kibana.yml

```yml
# 외부 서버 넣으려면 설정 바꾸기
server.host: "localhost"
server.name: "my-kibana"
elasticsearch.hosts: ["http://localhost:9200"]
```

* settings user

```yml
# kibana.yml
elasticsearch.username: "kibana_system"
```

```shell
# shell
bin/kibana-keystore create
bin/kibana-keystore add elasticsearch.password
# check
bin/kibana-keystore list
```

* 실행하기

> * doc: https://www.elastic.co/guide/en/kibana/current/start-stop.html

```shell
# 1. 그냥 실행
bin/kibana
# 2. background 실행
# 2-1
bin/kibana &
# 2-2
sudo systemctl start kibana.service
```

* pm2로 실행하기

> nvm install on ubuntu: https://tecadmin.net/how-to-install-nvm-on-ubuntu-22-04/

```shell
# kibana에 알맞는 node version 찾기
# /kb-717 : kibana directory
cat package.json
# node version check
# install nvm & 알맞는 node version 
# nvm install [node version]
npm install pm2@latest --location=global
pm2 start kb-717/src/cli/cli.js -name kibana
pm2 stop kibana
pm2 list
pm2 delete kibana
```

* start.sh

```shell
pm2 start kb-717/src/cli/cli.js --name kibana
```

* stop.sh

```shell
pm2 stop kibana
```

* settings chmod

```shell
chmod 755 *.sh
```

