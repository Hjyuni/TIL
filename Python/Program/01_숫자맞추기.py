import random

"""
random module
1. random.random() : 0.0 ~ 0.9999.. 사이의 실수 반환
2. random.uniform(a,b) : a,b 사이의 실수값 반환
3. random.randint(a,b) : a이상 b이하의 정수값 반환
4. random.randrange(a,b) : a이상 b미만의 정수값 반환
5. random.shuffle(seq) : 시퀀스 객체 섞기
6. random.choice(seq) : 시퀀스 객체 중 무작위로 하나 뽑기

"""

ran_num = random.randint(1, 100)
game_cnt = 1
while True:
    try:
        num = int(input("1~100사이의 숫자 입력:"))    
        
        if (num < 1) or (num > 100):
            print("숫자의 범위를 확인해 주세요")
        elif num > ran_num:
            print("down")
        elif num < ran_num:
            print("up")
        else:
            print(f"{game_cnt}번 만에 맞춤")
            break
        game_cnt += 1
    except:
            print("숫자를 입력해 주세요")