# -*- coding:utf-8 -*-
import requests
import json

# (https://www.starbucks.co.kr/) = endpoint(root라고 생각!) (store/store_map.do) = serviceURL
"""
JSON(JavaScript Object Notation)
: 속성-값 쌍 또는 "키-값쌍"으로 이루어진 데이터 오브젝트를 전달하기 위해
인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포멧
비동기 브라우저/ 서버 통신(AJAX)을 위해, 넓게는 XML을 대체하는 주요 데이터 포멧
인터넷에서 자료를 주고 받을 때 사용
"""

"""
__ajaxCall("/store/getSidoList.do", : url
            {}, : data
            true(비동기), : async
            "json", : dataType
            "post", : 전송방식
            function(_response) {...} :성공했으면,,,
"""


def getSiDo():
    # __ajaxCall("/store/getSidoList.do", {}(보내는 방식), true(비동기), "json", "post",
    url = "https://www.starbucks.co.kr/store/getSidoList.do"
    resp = requests.post(url)
    # print(resp) 정상 응답
    sido_lst = resp.json()['list']
    sido_code = list(map(lambda x: x['sido_cd'], sido_lst))
    sido_nm = list(map(lambda x: x['sido_nm'], sido_lst))
    # print(sido_code)
    # print(sido_nm)
    sido_dict = dict(zip(sido_code, sido_nm))  # dict(zip(키리스트,값리스트)) = 두개의 길이가 같아야 함
    # print(sido_dict)
    return sido_dict


# rest/restful 찾아보기
def getGuGun(sido_code):
    url = "https://www.starbucks.co.kr/store/getGugunList.do"
    resp = requests.post(url, data={"sido_cd":sido_code})
    sido_lst = resp.json()
    gugun_lst = resp.json()['list']
    gugun_dict = dict(zip(list(map(lambda x: x['gugun_cd'], gugun_lst)),
                          list(map(lambda x: x['gugun_nm'], gugun_lst))))
    return gugun_dict


def getStore(sido_code='', gugun_code=''):
    url = "https://www.starbucks.co.kr/store/getStore.do"
    resp = requests.post(url, data={'ins_lat': '37.577896',
                                    'ins_lng': '127.086007',
                                    'p_sido_cd': sido_code,
                                    'p_gugun_cd': gugun_code,
                                    'in_biz_cd': '',
                                    'set_date': ''})
    store_lst = resp.json()['list']
    # s_name, tel, doro_addreaa, lat, lot
    result_list = []
    for store in store_lst:
        store_dict = dict()
        store_dict['s_name'] = store['s_name']
        store_dict['tel'] = store['tel']
        store_dict['doro_address'] = store['doro_address']
        store_dict['lat'] = store['lat']
        store_dict['lot'] = store['lot']
        result_list.append(store_dict)
    result_dict = dict()
    result_dict['store_lst'] = result_list
    print(result_dict)

    result_json = json.dumps(result_dict, ensure_ascii=False)
    with open('starbucks01.json', 'w', encoding='utf-8') as f:
        f.write(result_json)

    return result_json


if __name__ == '__main__':
    print(getSiDo())
    sido = input('도시 코드를 입력해 주세요: ')
    if sido == '17':
        getStore(sido_code='17', gugun_code='')
    else:
        print(getGuGun(sido))
        gugun = input('구군 코드를 입력해 주세요: ')
        getStore(gugun_code=gugun)
