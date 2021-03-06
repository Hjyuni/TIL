from pymongo import MongoClient
from pprint import pprint

client = MongoClient('localhost', 27017)
db = client.test

# cursor = db.score.find()
# print(cursor)

score = db.score
cursor = score.find()
for doc in cursor:
    pprint(doc)

lee = score.find({'name': '이순신'})
# pprint(lee)
for doc in lee:
    pprint(doc)

lee2 = score.find_one({'name': '이순신'})
print(lee2)

print('score collection 안에 있는 doc 총 개수:', score.count_documents({}))

# 국어 점수가 60점보다 큰 도큐먼트 전체 출력
kor_60 = score.find({'kor': {'$gt': 60}}, {'_id':0})
for doc in kor_60:
    pprint(doc)

# count : estimated_document_count(),count_documents(조건)
score.estimated_document_count()
score.count_documents({})
score.count_documents({"name":"이순신"})

# sort
tot = score.find().sort("kor")
for kor in tot :
    print(kor)