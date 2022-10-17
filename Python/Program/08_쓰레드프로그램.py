import threading
import time
"""
# 스레드는 독립적으로 동작하도록 설정되어있음
def thread_1():
  while True:
    print("스레드1 동작")
    time.sleep(1)
t1 = threading.Thread(target=thread_1)
# 메인 코드가 동작할 때에만 쓰레드 동작하는 코드 만들기
# t1.daemon = True 주석처리 하면 스레드 독립적으로 작동
t1.daemon = True
t1.start()

while True:
  print("main")
  time.sleep(2)
"""
#--------------------------
# 다수의 스레드 동작
# 스레드1, 스레드2, 메인스레드가 모두 경쟁적으로 실행하고 종료 
# 사람이 보기에는 동시에 실행되는 것처럼 보이지만 독립적으로 실행 되는 것
def sum(name, val):
  for i in range(0, val):
    print(f"{name}:{i}")
t1=threading.Thread(target=sum, args=('스레드1', 10))
t2=threading.Thread(target=sum, args=('스레드2', 10))

t1.start()
t2.start()
print("main")