import googletrans
from os import linesep

translator = googletrans.Translator()

# r = raw string
read_file_path = r'해석할 영어 파일 위치'
write_file_path = r'해석 후 저장할 위치'

with open(read_file_path, 'r') as f:
  readLines = f.readlines()

for lines in readLines:
  result = translator.translate(lines, dest='ko')
  print(result.text)
  with open(write_file_path, 'a', encoding='UTF8') as f:
    f.write(result.text + '\n')