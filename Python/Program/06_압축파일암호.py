import itertools
import zipfile

def un_zip(passwd_str, min_len, max_len, zFile):
  for i in range(min_len, max_len + 1):
  # itertools.product(문자열, repeat=n) : 모드 쌍을 지어서 리턴함
    to_attempt = itertools.product(passwd_str, repeat=i)
    for attempt in to_attempt:
      # 튜플 반환
      # print(attempt)
      passwd = ''.join(attempt)
      print(passwd)
      try:
        zFile.extractall(pwd = passwd.encode())
        print(f"비번: {passwd}")
        return 1
      except:
        pass

passwd_str = "0123456789abcdefghijklmnoprrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

zFile = zipfile.ZipFile(r'파일위치')

min_len = 1
max_len = 5

unzip_result = un_zip(passwd_str, min_len, max_len, zFile)

if unzip_result == 1:
  print("비번 찾기 성공")
else:
  print("비번 찾기 실패")