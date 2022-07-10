from requests import delete


test_list = ["가","나","다","라","마","바"]

def delete_data(index):
    # 범위 넘어갔을 떄
    if index < 0 or index > len(test_list):
        print("index out of range")

    # 데이터 삭제하기
    test_list[index] = None

    # 데이터 한칸씩 앞당기기
    for i in range(index+1,len(test_list)):
        test_list[i-1] = test_list[i]

    # 맨 끝 데이터 없애주기
    del test_list[-1]

delete_data(3)
print(test_list)