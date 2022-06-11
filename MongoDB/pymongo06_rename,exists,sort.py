from genericpath import exists
from pymongo import MongoClient
import pymongo

conn = MongoClient()
actor_db = conn.cine21
actor_collection = actor_db.actor_collection

# 1개의 데이터만 추출해보기
actor_collection.find_one({})

# 5개의 데이터만 추출해보기
docs = actor_collection.find().limit(5)
for doc in docs:
    print(doc)

# $rename : 필드 이름바꾸기
# "다른 이름"이라는 필드를 "다른이름"으로 바꾸기
actor_collection.update_many({},{"$rename":{"다른 이름":"다른이름"}})

# sort : 정렬하기
asc = actor_collection.find().sort('생년월일')
desc = actor_collection.find().sort('생년월일',pymongo.DESCENDING)

for info in asc:
    print(info)

for info in desc:
    print(info)

# $exists
# "다른 이름"이라는 필드를 가진 배우 추출하기
names = actor_collection.find({"다른 이름":{"$exists":True}})
for info in names:
    print(info)

# "특기"가 없는 배우의 학교 출력
school = actor_collection.find({"특기":{"$exists":False}},{"학교":1,"_id":0})
for info in school:
    print(info)

# "생년월일"가 있는 배우의 "이름"을 "흥행지수" 내림차 순으로 정렬해서 출력
names = actor_collection.find({"생년월일":{"$exists":True}},{"배우이름":1,"_id":0}).sort("흥행지수",pymongo.DESCENDING)
for info in names:
    print(info)