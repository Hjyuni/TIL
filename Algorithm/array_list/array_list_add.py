# array list add data
myFriend = []          # 빈 배열

def add_data(friend):
    myFriend.append(None) # 사람이 추가되면 배열에 빈자리 생성
    fLen = len(myFriend)  # 배열 크기 측정(인덱스)
    myFriend[fLen-1] = friend

add_data('hjy')
add_data('ksh')
add_data('lhb')
add_data('kjw')
add_data('ysm')

print(myFriend)