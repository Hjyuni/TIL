from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test
score = db.score

del01 = score.delete_one({'name': '한지민'})
print(del01)
print(del01.deleted_count)
del02 = score.delete_one({'name': '송강'})
print(del02)
print(del02.deleted_count)


# test field가 없는 doc을 모두 찾아서 삭제
del03 = score.delete_many({'test': {'$exists': False}})
print(del03)
print(del03.deleted_count)

