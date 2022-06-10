import json
from pymongo import MongoClient

"""
1. starbucks_all.json읽어온다
2. 읽어온 파일 한 줄씩 json_data로 저장한다.
3. json_data를 dict로 변환한다 (resulr_dict)
    result_dict에 'list'라는 키를 입력하여, 리턴된 value를 반복문으로 출력하자
"""
# 1. starbucks_all.json읽어온다
# 2. 읽어온 파일 한 줄씩 json_data로 저장한다.
with open('starbucks_all.json', 'r', encoding='utf-8') as f:
    data = f.readline()

# 3. json_data를 dict로 변환한다 (resulr_dict)
result_dict = json.loads(data)
print(result_dict)

# 4.result_dict에 'list'라는 키를 입력하여, 리턴된 value를 반복문으로 출력하자
for d in result_dict['list']:
    print(d)

# 5.mongodb와 연결(db:test/collection:starbucks01)
client = MongoClient('localhost', 27017)
db = client['test']
starbucks01 = db['starbucks01']
# 6.result_dict['list']  값을 mongodb에 저장
res = starbucks01.insert_many(result_dict['list'])
# print(res)

# 7. starbucks01 collection전체 출력
all = starbucks01.find({})
for data in all:
    print(data)
