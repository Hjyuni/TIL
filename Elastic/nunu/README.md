# 누누강 프로젝트 엘라스틱

## 1. install elastic 8.3.2

```shell
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.3.2-linux-x86_64.tar.gz
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.3.2-linux-x86_64.tar.gz.sha512
$ shasum -a 512 -c elasticsearch-8.3.2-linux-x86_64.tar.gz.sha512 
$ tar -xzf elasticsearch-8.3.2-linux-x86_64.tar.gz
```

* 설치시 났던 에러

  > 설정 항목이 겹쳐셔 나는 에러

```shell
Exception in thread "main" org.elasticsearch.common.settings.SettingsException: Failed to load settings from [elasticsearch.yml]

Caused by: org.elasticsearch.xcontent.XContentParseException: [121:29] Duplicate field 'cluster.initial_master_nodes'
```

---

## 2. jaso analyzer

* 한국어 자동완성 위한 플러그인(엘라스틱 서치 버전 동일해야함)

```shell
# install plugin
$ bin/elasticsearch-plugin install https://github.com/netcrazy/elasticsearch-jaso-analyzer/releases/download/v8.3.2/jaso-analyzer-plugin-8.3.2-plugin.zip
```

* settings

```shell
$ curl -u elastic -XPUT -H 'Content-Type: application/json' http://localhost:9200/fish/ -d '{
  "settings": {
    "index": {
      "analysis": {
        "filter": {
          "suggest_filter": {
            "type": "edge_ngram",
            "min_gram": 1,
            "max_gram": 50
          }
        },
        "tokenizer": {
          "jaso_search_tokenizer": {
            "type": "jaso_tokenizer",
            "mistype": true,
            "chosung": false
          },
          "jaso_index_tokenizer": {
            "type": "jaso_tokenizer",
            "mistype": true,
            "chosung": true
          }
        },
        "analyzer": {
          "suggest_search_analyzer": {
            "type": "custom",
            "tokenizer": "jaso_search_tokenizer"
          },
          "suggest_index_analyzer": {
            "type": "custom",
            "tokenizer": "jaso_index_tokenizer",
            "filter": [
              "suggest_filter"
            ]
          }
        }
      }
    }
  }
}'
```

* 검색기준

```shell
curl -u elastic -XPUT -H 'Content-Type: application/json' http://localhost:9200/fish/_mapping -d '{
  "properties": {
    "어종": {⭐
      "type": "text",
      "store": true,
      "analyzer": "suggest_index_analyzer",
      "search_analyzer": "suggest_search_analyzer"
    }
  }
```

```shell
# insert data
curl -u elastic -XPOST "http://localhost:9200/_bulk" -H 'Content-Type: application/json' --data-binary @fishNDJSON.json
```

```shell
# test
curl -u elastic -XPOST -H 'Content-Type: application/json' http://localhost:9200/fish/_search?pretty=true -d '{
    "query" : {
        "match" : { "어종" : "쥐ㅊ" }
    }
}'
```

## 3. connect node

