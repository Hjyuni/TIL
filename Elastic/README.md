# elastic & kibana

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

```markdown
bin/elasticsearch -d -p es.pid
```

* stop.sh

```markdown
kill `cat es.pid`
```

* chmod

```shell
ls -la
# execute
chmod 755 *.sh
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



---



* kibana (7.17.6)

> https://www.elastic.co/guide/en/kibana/7.17/targz.html

```shell
curl -O https://artifacts.elastic.co/downloads/kibana/kibana-7.17.6-linux-x86_64.tar.gz
curl https://artifacts.elastic.co/downloads/kibana/kibana-7.17.6-linux-x86_64.tar.gz.sha512 | shasum -a 512 -c - 
tar -xzf kibana-7.17.6-linux-x86_64.tar.gz
cd kibana-7.17.6-linux-x86_64/
bin/kibana -d
```

