from pymongo import MongoClient

conn = MongoClient()
db = conn['cine21']
actor = db['actor_collection']

# or
# 범죄도시2 또는 브로커에 출연한 배우들의 doc
docs = actor.find({"$or":[{"출연영화":"범죄도시2"},{"출영영화":"브로커"}]})
for doc in docs:
    print(doc)

# list자체를 찾기
# 범죄도시2, 연애 빠진 로맨스 에만 출연한 배우
# 위 2개 영화에만 출연했어야 한다는거 주의
docs = actor.find({"출연영화":["범죄도시2","연애 빠진 로맨스"]})
for doc in docs:
    print(doc)

# $all : list에서 and역할
# 범죄도시2와 뺑반에 모두 출연한 배우의 doc
docs = actor.find({"출연영화":{"$all":["범죄도시2","뺑반"]}})
for doc in docs:
    print(doc)

# 인덱스 번호로 찾기
# 출연영화 리스트의 0번째가 범죄도시2인 doc
docs = actor.find({"출연영화.0":"범죄도시"})
for doc in docs:
    print(doc)

# list사이즈로 찾기
# 출연 영화가 3개인 배우의 이름
docs = actor.find({"출연영화":{"$size":5}},{"배우이름":1,"_id":0})
for doc in docs:
    print(doc)