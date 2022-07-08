# 1. 백준 10818번 : https://www.acmicpc.net/problem/10818
# me
try:
    n = int(input())
    n_list = list(map(int,input().split()))
    
    n_max = n_list[0]
    n_min = n_list[0]

    if n != len(n_list):
        raise Exception(f"{n}개의 숫자를 적어주세요")

    for i in range(n):
        if n_max < n_list[i]:
            n_max = n_list[i]
        elif n_min > n_list[i]:
            n_min = n_list[i]
    print(n_min, n_max)
except Exception as e:
    print(e)

# book
n = int(input())
arr_list = list(map(int, input().split()))

max_num = arr_list[0]
min_num = arr_list[0]

for num in arr_list:
    if num > max_num:
        max_num = num
    if num < min_num:
        min_num = num
print(min_num, max_num)
#-----------------------------------------------------#
# 2. 백준 2953번 : https://www.acmicpc.net/problem/2953
# me
# 틀림..왜?
score = [list(map(int,input().split())) for _ in range(5)]
sum_score = []

for i in range(len(score)):
    sum_score.append(sum(score[i]))

rank_fisrt = sum_score[0]
participant_num = 0

for i in range(len(sum_score)):
    if rank_fisrt < sum_score[i]:
        rank_fisrt = sum_score[i]
        participant_num = i + 1
print(participant_num, rank_fisrt)

# rank_fisrt = sum_score[0] -> rank_fisrt = 0으로 바꾸니까 정답
score = [list(map(int,input().split())) for _ in range(5)]
sum_score = []

for i in range(len(score)):
    sum_score.append(sum(score[i]))

rank_fisrt = 0
participant_num = 0

for i in range(len(sum_score)):
    if rank_fisrt < sum_score[i]:
        rank_fisrt = sum_score[i]
        participant_num = i + 1
print(participant_num, rank_fisrt)

# book
human=[list(map(int, input().split())) for _ in range(5)]
humanScore=[0]*5
score=0
for i in range(5):
    sum=0
    for j in range(4):
        sum += human[i][j]
    humanScore[i]=sum
    score=max(score,sum)
    
for i in range(5):
    if humanScore[i]==score:
        print(i+1,score)
        break