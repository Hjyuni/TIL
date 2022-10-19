# pip install pyautogui
# pip install pyperclip
import pyautogui
import pyperclip
import time

# 마우스 좌표 출력
"""
while True:
  print(pyautogui.position())
  time.sleep(0.1)
"""
weather = ["서울 날씨", "시흥 날씨", "청주 날씨", "부산 날씨", "강원도 날씨"]

addr_x = 1140
addr_y = 79
start_x = 1001
start_y = 277
end_x = 1832
end_y = 635

for region_weather in weather:
  # pyautogui.moveTo(x,y,시간): 지정된 시간동안 해당 좌표로 이동
  pyautogui.moveTo(addr_x, addr_y, 1)
  time.sleep(0.2)
  pyautogui.click()
  time.sleep(0.2)
  pyautogui.write("www.naver.com", interval=0.1)
  pyautogui.write(["enter"])
  time.sleep(1)

  pyperclip.copy(region_weather)
  pyautogui.hotkey("ctrl", "v")
  time.sleep(0.5)
  pyautogui.write(["enter"])
  time.sleep(1)
  pyautogui.screenshot(f"{region_weather}.png", region=(start_x, start_y, end_x-start_x, end_y-start_y))