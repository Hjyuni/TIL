# 1. input()
a = input()
b = input('문자열 입력:')
# input은 뭘 넣어도 str
print(type(a))

# 2. int(input())
c = int(input('첫 번째 숫자 입력:'))
d = int(input('두 번째 숫자 입력:'))

# 3. 변수1, 변수2 = input().split('기준문자열')
# 기준 문자열이 공백 일 때에는 공백을 기준으로 분리
e, f = input().split()
g, h = input().split(',')
g, h = int(g), int(h)
print(e,f,g,h)

# 4. map(int, input.slpit())
i, j = map(int, input('숫자 두 개 입력(공백기준):').split())
k, l = map(int, input('숫자 두 개 입력(콤마기준):').split(','))