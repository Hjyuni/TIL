from bs4 import BeautifulSoup
import requests
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

"""
concurrent.futures: 병렬 작업을 실행하기 위한 모듈
ThreadPoolExecutor: 스레드 풀을 사용하여 호출을 비동기적으로 실행
ProcessPoolExecutor: 프로세스 풀을 사용하여 호출을 비동기적으로 실행
참고사이트1: https://docs.python.org/ko/3/library/concurrent.futures.html
참고사이트2: https://velog.io/@cha-suyeon/%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%97%90%EC%84%9C-%EC%8A%A4%EB%A0%88%EB%93%9C%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%ED%92%80-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
"""

def get_page_num():
    url = 'https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=FILE&keyword=%EA%B5%90%EC%9C%A1&detailKeyword=&publicDataPk=&recmSe=N&detailText=&relatedKeyword=&commaNotInData=&commaAndData=&commaOrData=&must_not=&tabId=&dataSetCoreTf=&coreDataNm=&sort=&relRadio=&orgFullName=&orgFilter=&org=&orgSearch=&currentPage=1&perPage=10&brm=&instt=&svcType=&kwrdArray=&extsn=&coreDataNmArray=&pblonsipScopeCode='
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')
    page_num = soup.find('nav', {'class': 'pagination'})
    # isdigit(): 숫자인지 아닌지 bool값으로 반환
    # lambda: https://wikidocs.net/64
    # filter: https://xfrnk2.github.io/fft/python-filter_and_remove_none_in_list/
    nums = list(filter(None, map(lambda x: x.text if x.text.isdigit() else None, page_num)))

    return nums


def get_titles(i):
    sub_url = 'https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=FILE&keyword=%EA%B5%90%EC%9C%A1&currentPage=' + i
    soup = BeautifulSoup(requests.get(sub_url).text, 'html.parser')
    titles = soup.select('span[class=title]')
    for title in titles:
        print(title.text.strip())


def get_all_page_loop(nums):
    for i in nums:
        sub_url = 'https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=FILE&keyword=%EA%B5%90%EC%9C%A1&currentPage=' + i
        soup = BeautifulSoup(requests.get(sub_url).text, 'html.parser')
        titles = soup.select('span[class=title]')
        for title in titles:
            print(title.text.strip())

"""
스레드(thread) VS 프로세스(process)의 차이
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html

ThreadPoolExecutor VS ProcessPoolExecutor
- https://hamait.tistory.com/828
"""


def get_all_page_thread(nums):
    with ThreadPoolExecutor(max_workers=10) as executor:
        for num in nums:
            future = executor.submit(get_titles, num)
        for _ in nums:
            future.result()


def get_all_page_process(nums):
    with ProcessPoolExecutor(max_workers=10) as executor:
        for num in nums:
            future = executor.submit(get_titles, num)
        for _ in nums:
            future.result()


if __name__ == '__main__':
    nums = get_page_num()
    # get_titles('1')
    # get_all_page_loop(nums)
    # get_all_page_thread(nums)
    # get_all_page_process(nums)