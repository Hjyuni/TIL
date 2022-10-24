# 16 심사문제
a = int(input())
for i in range(1,10):
  print(a,'*',i,'=',a*i)

# 17 심사문제
price = int(input())
while price > 1350:
  price -= 1350
  print(price)

# 18 심사문제
start, stop = map(int, input().split())
i = start
while True:
  if i == stop+1:
    break
  if i % 10 == 3:
    i += 1
    continue
  print(i, end=' ')
  i += 1

# 사각형 별 만들기
for i in range(5):
  for j in range(5):
    print('*',end='')
  print()

# 계단식 별 만들기
for i in range(5):
  for j in range(5):
    if j <= i:
     print('*',end='')
  print()

# 대각선 별 만들기
for i in range(5):
  for j in range(5):
    if j == i:
     print('*',end='')
    else:
      print(' ',end='')
  print()

# 계단식 별 거꾸로 만들기
for i in range(5):
  for j in range(5):
    if j >= i:
      print('*',end='')
  print()

for i in range(5):
  for j in range(5):
    if j < i:
      print(' ',end='')
    else:
      print('*',end='')
  print()

# 산모양으로 별찍기
star = int(input())
for i in range(star):
  # for i in reversed(range(star)):
  # reversed안쓸 때 시작점 잘 확인할 것
  for j in range(star-1,-1,-1):
    if j > i:
      print(' ', end='')
    else:
      print('*',end='')
  for j in range(star):
    if j < i:
      print('*', end='')
  print()
