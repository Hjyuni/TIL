# 딕셔너리: 키-값 형식으로 저장하며 키는 중복되면 가장 뒤에 있는 값만 사용함
# 빈 딕셔너라 값 만들기
x = {}
x = dict()
lux = {'health': 490, 'health': 800, 'mana': 334, 'melee': 550, 'armor': 18.72}
print(lux['health'])    # 키가 중복되면 가장 뒤에 있는 값만 사용함

# 키: 정수, 실수, 불 사용 가능
# 값: 리스트, 딕셔너리 등을 포함한 모든 자료형 사용 가능
x = {100: 'hundred', False: 0, 3.5: [3.5, 3.5]}

"""
딕셔너리 = dict(키1=값1, 키2=값2)
딕셔너리 = dict(zip([키1, 키2], [값1, 값2]))
딕셔너리 = dict([(키1, 값1), (키2, 값2)])
딕셔너리 = dict({키1: 값1, 키2: 값2})
"""


# 심사문제
key = input().split()
val = map(float,input().split())
dict = dict(zip(key,val))
print(dict)