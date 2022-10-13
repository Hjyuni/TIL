import psutil

cpu = psutil.cpu_freq()
cpu_core = psutil.cpu_count(logical=False)
memory = psutil.virtual_memory
disk = psutil.disk_partitions()
net = psutil.net_io_counters()

curr_sent = 0
curr_recv = 0

prev_sent = 0
prev_recv = 0

while True:
  # 1초 동안의 cpu사용량의 평균값
  cpu_p = psutil.cpu_percent(interval=1)
  print(f'CPU 사용량: {cpu_p}%')

  # 사용가능한 메모리 출력
  memory = psutil.virtual_memory()
  memory_avail = round(memory.available/1024**3,1)
  print(f'사용 가능한 메모리: {memory_avail}GB')

  # 네트워크에서 보내고 받은 크기 출력
  net = psutil.net_io_counters()
  curr_sent = net.bytes_sent/1024**2
  curr_recv = net.bytes_recv/1024**2

  # 1초 동안 보내고 받는 데이터 출력
  sent = round(curr_sent-prev_sent,1)
  recv = round(curr_recv-prev_recv,1)

  print(f'보내기: {sent}MB 받기: {recv}MB')

  prev_sent = curr_sent
  prev_recv = curr_recv
