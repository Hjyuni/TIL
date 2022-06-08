from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['test']
score = db['score']

# 이름이 유재석인 doc 찾아서 midtern의 kor점수를 100점으로 변경
update01 = score.update_one({'name': '유재석'}, {'$set': {'midterm.kor': 80}})
print(update01)
print(update01.matched_count)
print(update01.modified_count)

update02 = score.update_many({'eng': {'$gt': 70}},
                             {'$set': {'eng': 10}})
print(update02.matched_count)
print(update02.modified_count)

replace = score.replace_one({'eng': {'$gt': 70}},
                             {'eng': 10})