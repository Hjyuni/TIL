test_list = ["가","나","다","라","마","바"]

def insert_data(index, data):
    # 범위를 벗어났을 때
    if index < 0 or index > len(test_list):
        print("index out of range")
    
    # 데이터를 삽입했을 때에 데이터가 하나씩 뒤로 이동할 자리 만들어주기
    test_list.append(None)
    # 배열 크기
    len_list = len(test_list)

    for i in range(len_list-1, index, -1):
        # 삽입할 데이터 위치를 기준으로 뒤에 있는 데이터 뒤로 한칸씩 이동시키기
        test_list[i] = test_list[i-1]
        # 데이터를 삽입할 위치에 공간 만들기
        test_list[i-1] = None

    # 데이터 삽입하기
    test_list[index] = data

insert_data(1,"A")
print(test_list)
insert_data(3,"B")
print(test_list)
