# pip install gtts
# pip install playsound
from gtts import gTTS
from playsound import playsound
import os
# 1. 텍스트를 음성으로 변환
text = "안녕하세요, 한국인입니다."
tts = gTTS(text=text, lang='ko')
tts.save(r"C:\TIL\Python\Program\hi.mp3")

# 2. mp3파일 파이썬에서 바로 실행하는 코드
# 경로를 .py파일의 실행경로로 이동, 현재 경로로 이동
os.chdir(os.path.dirname(os.path.abspath(__file__)))
playsound("C:\TIL\Python\Program\hi.mp3")

# txt파일 읽기
file_path = "C:\TIL\Python\Program\hi.txt"
with open(file_path, 'rt', encoding='UTF8') as f:
    read_file = f.read()
tts = gTTS(text=read_file, lang='ko')

tts.save('TestText.mp3')
playsound("C:\TIL\Python\Program\TestText.mp3")