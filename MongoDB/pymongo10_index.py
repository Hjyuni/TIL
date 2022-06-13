from pymongo import MongoClient
import pymongo

conn = MongoClient()
db = conn.cine21
actor = db.actor_collection

# single field index
actor.create_index('배우이름') # = actor.create_index([('배우이름',1)]) / actor.create_index([('배우이름',pymongo.ASCENDING)])
actor.create_index([('랭킹',-1)]) # = actor.create_index([('랭킹',pymongo.DESCENDING)])
actor.create_index([('출연영화','text')]) # = actor.create_index(['출연영화',pymongo.TEXT])

# Compound field index
actor.create_index([('출연영화',pymongo.TEXT),('직업',pymongo.TEXT)])

# index info
print(actor.index_information())

# text 검색
# 부분 검색 가능
docs = actor.find({"$text":{"$search":"도시"}})
for doc in docs:
    print(doc)

# regex
docs = actor.find({"배우이름":{"$regex":"김.+"}})
for doc in docs:
    print(doc)


# drop index
actor.drop_indexes()
actor.drop_index([('배우이름',1)])
