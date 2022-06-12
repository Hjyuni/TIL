from pymongo import MongoClient

conn = MongoClient()
db = conn.cine21
actor = db.actor_collection

# or
# 특기가 존재 하거나 흥행지수가 10000이상이 넘는 배우의 doc
docs = actor.find({"$or":[{"특기:":{"$exists":True}},{"흥행지수":{"$gte":10000}}]})
for doc in docs:
    print(doc)

# nor
# 흥행지수가 50000이상이 넘지 않거나 5000이하보다 적지 않은 배우의 이름
docs = actor.find({"$nor":[{"흥행지수":{"$gte":50000}},{"흥행지수":{"$lte":5000}}]},{"배우이름":1,"_id":0})
for doc in docs:
    print(doc)

# in
# 배우 이름이 손석구,김윤석,최귀화인 doc출력
docs = actor.find({"배우이름":{"$in":["손석구","김윤석","최귀화"]}})
for doc in docs:
    print(doc)

# nin : not in
# 배우 이름이 손석구,김윤석,최귀화가 아닌 배우이름, 흥행지수 출력
docs = actor.find({"흥행지수":{"$nin":["손석구","김윤석","최귀화"]}},{"배우이름":1,"흥행지수":1,"_id":0})
for doc in docs:
    print(doc)