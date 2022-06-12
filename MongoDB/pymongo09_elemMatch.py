from pymongo import MongoClient

conn = MongoClient()
db = conn.cine21
sample = db.elem_sample

# sample.insert_many([
#     {"results":[82, 85, 88]},
#     {"results":[75, 88, 91]}
# ])

# 90이상, 85미만의 숫자가 모두 있는 results만 나옴
docs = sample.find({"results":{"$gte":90,"$lt":85}})
for doc in docs:
    print(doc)

# 85<=results<90
docs = sample.find({"results":{"$elemMatch":{"$gte":85,"$lt":90}}})
for doc in docs:
    print(doc)