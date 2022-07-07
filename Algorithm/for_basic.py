# 1. 백준 2438번 : https://www.acmicpc.net/problem/2438
n = int(input())
# me
for i in range(1,n+1):
    print(i * '*')

# book
for i in range(n):
    for j in range(i+1):
        print('*',end="")
    print()
#-----------------------------------------------------#
# 2. 백준 2439번 : https://www.acmicpc.net/problem/2439
# me
for i in range(1,n+1):
    print((n-i)*' '+"*"*i)

# book
for i in range(1,n):
    for j in range(n-i-1):
        print(' ',end="")
    for j in range(i+1):
        print('*',end="")
    print()
#-----------------------------------------------------#
# 3. 백준 2442번 : https://www.acmicpc.net/problem/2442
# me
for i in range(1, n+1):
    print((n-i)*' '+((i*2)-1)*'*')
    
# book
for i in range(n):
    for j in range(n-i-1):
        print(' ',end="")
    for j in range(2*i + 1):
        print('*', end="")
    print()