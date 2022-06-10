# -*- coding:utf-8 -*-
import requests
import json


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
    resp = requests.post(url, data={"sido_cd": sido_code})
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

    return result_list


if __name__ == '__main__':
    # 전국의 모든 스타벅스 매장을 저장

    # 내가 한 거
    # res = dict()
    # res['list'] = getStore()
    # print(res)
    # res_json = json.dumps(res, ensure_ascii=False)
    # print(res_json)
    # with open('starbucks_all.json', 'w', encoding='utf-8') as f:
    #     f.write(res_json)

    list_all = list()
    sido_all = getSiDo()
    for sido in sido_all:
        if sido == '17':
            result = getStore(sido_code=sido)
            print(result)
            list_all.extend(result)
            # extend는 리스트만 추가
            # append는 요소와 리스트 모두 추가 가능 하지만 리스트를 추가하면 리스트 안에 리스트 생성
        else:
            gugun_all = getGuGun(sido)
            for gugun in gugun_all:
                result = getStore(gugun_code=gugun)
                print(result)
                list_all.extend(result)
    print(list_all)
    print(len(list_all))

    result_dict = dict()
    result_dict['list'] = list_all

    result = json.dumps(result_dict, ensure_ascii=False)
    with open('../starbucks_all.json', 'w', encoding='utf-8') as f:
        f.write(result)

# 시도,구군 코드 적으면 json파일 저장할 때 그 시도구군에 걸맞는 제목으로 자동으로 저장되게 해보기
