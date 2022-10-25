a, b = map(int,input().split())
while True:
  if a == b+1:
    break
  elif a % 5 == 0 and a % 7 == 0:
    print('FizzBuzz')
  elif a % 5 == 0:
    print('Fizz')
  elif a % 7 == 0:
    print('Buzz')
  else:
    print(a)
  a += 1
