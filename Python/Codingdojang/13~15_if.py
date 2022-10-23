# 심사문제-13
money = int(input())
coupon = input()
if coupon == 'Cash3000':
  money = money-3000
if coupon == 'Cash5000':
  money = money-5000
print(money)

# 심사문제-14
k, e, m, s = map(int, input().split())
avg = (k+e+m+s) / 4
if k >= 0 and k <= 100 and e >= 0 and e <= 100 and m >= 0 and m <= 100 and s >= 0 and s <= 100:
  if avg >= 80:
    print('합격')
  else:
    print('불합격')
else:
  print('잘못된 점수')

# 심사문제-15
age = int(input())
balance = 9000
if age >= 7 and age <= 12:
  balance -= 650
elif age >= 13 and age <= 18:
  balance -= 1050
else:
  balance -= 1250
print(balance)