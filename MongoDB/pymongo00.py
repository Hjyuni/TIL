# pip install pymongo
from pymongo import MongoClient

# client = MongoClient()
# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://localhost:27017')

# use test(mongoDB)
# db = client.test
db = client['test']

# collection = db.score
collection = db['score']

# db.score.find()
result = collection.find()
# print(result)

for res in result:
    print(res)
