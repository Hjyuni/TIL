from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test
score = db.score

# mongoShell에서는 field에 ""안붙여도 되지만 pymongo에는 붙여줘야 함
# mongoShell : insertMany
insert1 = score.insert_many(
    [
        {"name": "한지민", "kor": 100, "eng": 30, "math": 50},
        {"name": "송강", "kor": 50, "eng": 100, "math": 70}
    ]
)
print(insert1)
# _id 확인하기
print(insert1.inserted_ids)

# mongoShell : insertOne
insert2 = score.insert_one({'name': '신민아', 'kor': 50, 'eng': 70, 'math': 100})
print(insert2)
print(insert2.inserted_id)

num = db.num
insert3 = num.insert_many(
    [
        { "number" : i } for i in range(100)
    ]
)
