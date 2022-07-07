# input basic
"""
map 함수 : map(function, iterable)
참고 : https://blockdmask.tistory.com/531

split 함수 : 특정 문자 기준으로 나눈 후 리스트로 반환
참고 : https://blockdmask.tistory.com/469
"""

# 1. 하나 입력
num = int(input())

# 2. 한 줄 입력
a, b = map(int,input().split())

# 3. list를 통해 한 줄 입력받기
num = list(map(int, input().split()))

# 4. 한 줄로 문자열 변수 여러개 입력 받기
a, b = input().split()

# 5. 문자열 여러 줄 입력받기(1) : [input() for _ in range(n)]
str = [input() for _ in range(3)]

# 6. 문자열 한 줄에 띄어쓰기 없는 여러 줄 입력받기(2) - 2차원 배열 : [list(map(int, input())) for _ in range(n)]
arr = [list(map(int, input())) for _ in range(4)]

# 7. 한 줄에 띄어쓰기 있는 2차원 배열 : [list(map(int, input().split())) for _ in range(n)]
arr = [list(map(int, input().split())) for _ in range(2)]