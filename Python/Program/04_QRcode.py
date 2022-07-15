# pip install qrcode
# pip install image
from asyncore import read
import qrcode
import os
# 단순 QR코드 생성이라 어떠한 문자라도 가능함
qr_data = 'https://www.youtube.com/'
qr_img = qrcode.make(qr_data)
path = os.path.dirname(os.path.abspath(__file__)) + '\\' + 'youtube' + '.png'
qr_img.save(path)

# 여러개의 QR코드 생성기
"""
path = r'qr코드 만들 여러개 주소가 들어가 있는 txt파일 경로'
with open(path, 'rt', encoding="UTF8") as f:
    lines = f.readlines()

    for line in lines:
        line = line.strip()
        print(line)

        qr_data = line
        qr_img = qrcode.make(qr_data)

        save_path = os.path.dirname(os.path.abspath(__file__)) + '\\' + qr_data + '.png'
        qr_img.save(save_path)
"""


