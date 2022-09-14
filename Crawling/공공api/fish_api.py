# 공공데이터 api 갖고오기 : https://www.data.go.kr/data/15057327/openapi.do
import requests
import json
import math
import xmltodict

def get_fish_db(filename):
  """필요한 어종 정보만 갖고 오기"""
  service_key = ""
  api_url = 'http://apis.data.go.kr/1520635/OceanBiospeciesInfoService/getOceanBiospeciesResult?'
  res_lst = []
  cnt = 1
  i = 0
  while True:
    url = api_url + f"ServiceKey={service_key}&pageNo={cnt}&numOfRows=1000"
    # xml 반환
    resp = requests.get(url).text
    # xml to dict
    toDict = xmltodict.parse(resp)
    # json.dumps : 파이썬 객체를 json 파일로 저장하는 함수
    # json.loads : json 문자열을 파이썬 객체로 변환
    resp_body = json.loads(json.dumps(toDict))['response']['body']
    total = int(resp_body['totalCount'])
    fish_lst = resp_body['items']['item']
    for fish_cnt in range(0,len(fish_lst)):
      fish_dict = dict()
      fish_dict['id'] = i
      for fish in fish_lst[fish_cnt]:
        try:
          fish_dict['어종'] = fish['mfSpeciesKor']
        except KeyError:
          # continue: 다음 루프로
          # pass: 이 과정만 패스
          pass
        try:
          fish_dict['서식지'] = fish['mfHabitat']
        except KeyError:
          pass
        try:
          fish_dict['산란기'] = fish['mfOviposition']
        except KeyError:
          pass
        try:
          fish_dict['색깔'] = fish['mfColor']
        except KeyError:
          pass
        try:
          fish_dict['분포'] = fish['mfDistribution']
        except KeyError:
          pass
        try:
          fish_dict['형태'] = fish['mfFeature']
        except KeyError:
          pass
        try:
          fish_dict['참고문헌'] = fish['mfReferenceName']
        except KeyError:
          pass
      res_lst.append(fish_dict)
      i += 1
    if cnt == math.ceil(total/1000):
      break
    cnt += 1

  res_dict = dict()
  res_dict = res_lst

  # json으로 저장하기
  result_json = json.dumps(res_dict, ensure_ascii=False)
  with open(f'./db_data/{filename}.json', 'w', encoding='utf-8') as f:
      f.write(result_json)

def json_for_es_bulk(filename):
  with open(f'./db_data/{filename}.json','r',encoding='utf-8') as f:
    json_file = json.load(f)
  ndjson = ndjson.dump(json_file)
# json_for_es_bulk('fish')