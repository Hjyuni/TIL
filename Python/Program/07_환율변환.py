# pip install currencyconverter
from currency_converter import CurrencyConverter
import requests
from bs4 import BeautifulSoup

# 지원되는 통화목록 확인하기
# cc = CurrencyConverter()
# print(cc.currencies)

def get_exchange_rate(c1, c2):
  headers = {
    "User-Agent": "Mozilla/5.0",
    "Content-Type": "text/html; charset=UTF-8"
    }
  url = f"https://kr.investing.com/currencies/{c1}-{c2}"
  res = requests.get(url, headers=headers)
  print(res)
  print(res.content.decode('utf-8'))
  content = BeautifulSoup(res.content, 'html.parser')
  containers = content.find('span', {'data-test':'instrument-price-last'})
  print(containers.text)

get_exchange_rate('usd','krw')