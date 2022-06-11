## 출처 : 잔재미 코딩
## https://www.fun-coding.org/mongodb_basic6.html

# 1.library import
from bs4 import BeautifulSoup as bs4
import requests
from pymongo import MongoClient
import re
import time

# 2.mongodb connection
conn = MongoClient('localhost',27017)
actor_db = conn.cine21
actor_collection = actor_db.actor_collection

# 3.crawling url requests
# url = "http://www.cine21.com/rank/person/content"
# post_data = dict()
# post_data['section'] = 'actor'
# post_data['period_start'] = '2021-06-10'
# post_data['gender'] = 'all'
# post_data['page'] = 1

# res = requests.post(url, data=post_data)

# 4.parsing
# soup = bs4(res.content, 'html.parser')
# actors = soup.select('li.people_li div.name')

# for actor in actors:
#     print(actor.text)

# 5. 정규 표현식을 통한 배우 이름 추출
# https://www.fun-coding.org/DS&AL3-4.html
# re.sub('정규표현식','뭐로 바꿀건지',사용할데이터)
# test_data = '주지훈(6편)'
# print(re.sub('\(\w*\)','',test_data))
"""
for actor in actors:
    actor_name = re.sub('\(\w*\)','',actor.text)
"""

# 6. 배우 상세정보 추출
"""
actors_info_list = list()

for actor in actors:
    actor_link = 'http://www/cine21.com' + actor.select_one('a').attrs['href']
    res_actor = requests.get(actor_link)
    soup_actor = bs4(res_actor.content,'html.parser')
    default_info = soup_actor.select_one('ul.default_info')
    actor_details = default_info.select('li')
    
    actor_info_dict = dict()
    
    # 한 명의 배우 정보
    for actor_item in actor_details:
        # print(actor_item)
        actor_item_field = print(actor_item.select_one('span.tit').text)
        actor_item_value = re.sub('<span.*?>.*?</span>','',str(actor_item))
        actor_item_value = re.sub('<.*?>','',actor_item_value)
        actor_info_dict[actor_item_field] = actor_item_value
    actors_info_list.append(actor_info_dict)
"""

"""
- Greedy(.*) vs Non-Greedy(.*?)
- 정규식 연습 사이트 : https://regexr.com
    - <li><span class="tit">원어명</span>주지훈<li>
    - 위에꺼 넣어놓고 <.*>와 <.*?> 비교하기
- . 문자는 줄바꿈 문자인 \n을 제외한 모든 문자 한 개를 의미
- * 문자는 앞 문자가 0번 또는 그 이상 반복되는 패턴
- .* 는 문자가 0번 또는 그 이상 반복되는 패턴
"""

# 7.배우 흥행 지수와 출연 영화 추출
"""
hits = soup.select('ul.num_info > li > strong')
movies = soup.select('ul.mov_list')
for index, actor in enumerate(actors) : 
    print("배우이름:", re.sub('\(\w*\)','',actor.text))
    print("흥행지수:", int(hits[index].text.replace(',','')))
    movie_titles = movies[index].select('li a span')
    movie_title_list = list()
    for movie_title in movie_titles:
        movie_title_list.append(movie_title.text)
    print("출연영화:",movie_title_list)
"""

# 8.dict로 만들기 & 여러페이지 배우 추출하기
url = "http://www.cine21.com/rank/person/content"
post_data = dict()
post_data['section'] = 'actor'
post_data['period_start'] = '2021-06-10'
post_data['gender'] = 'all'

actors_info_list = list()

for i in range(1,21):
    post_data['page'] = i

    res = requests.post(url, data=post_data)
    soup = bs4(res.content, 'html.parser')

    actors = soup.select('li.people_li div.name')
    hits = soup.select('ul.num_info > li > strong')
    movies = soup.select('ul.mov_list')
    rankings = soup.select('li.people_li > span.grade')

    for index, actor in enumerate(actors):
        actor_name = re.sub('\(\w*\)','',actor.text)
        actor_hits = int(hits[index].text.replace(',',''))
        movie_titles = movies[index].select('li a span')
        movie_title_list = list()
        for movie_title in movie_titles:
            movie_title_list.append(movie_title.text)

        actor_info_dict = dict()
        actor_info_dict['배우이름'] = actor_name
        actor_info_dict['흥행지수'] = actor_hits
        actor_info_dict['출연영화'] = movie_title_list
        actor_info_dict['랭킹'] = rankings[index].text

        actor_link = 'http://www.cine21.com' + actor.select_one('a').attrs['href']
        res_actor = requests.get(actor_link)
        soup_actor = bs4(res_actor.content,'html.parser')
        default_info = soup_actor.select_one('ul.default_info')
        actor_details = default_info.select('li')

        for actor_item in actor_details:
            # print(actor_item)
            actor_item_field = actor_item.select_one('span.tit').text
            actor_item_value = re.sub('<span.*?>.*?</span>','',str(actor_item))
            actor_item_value = re.sub('<.*?>','',actor_item_value)
            actor_info_dict[actor_item_field] = actor_item_value
        actors_info_list.append(actor_info_dict)

# 9. mongodb에 넣기
# 여러번 돌리면 계속 들어가니 주의
# actor_collection.insert_many(actors_info_list)