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
  * 9200: client
  * 9300: node

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
-Xsm512db
```

### 1-2. elasticsearch.yml

> doc: https://esbook.kimjmin.net/02-install/2.3-elasticsearch/2.3.2-elasticsearch.yml

* settings cluster, node,, 

* cluster & node name on command

```shell
bin/elasticsearch -E node.name="node-new"
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

