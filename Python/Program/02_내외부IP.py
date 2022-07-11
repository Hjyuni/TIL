# pip install requests
import socket
import requests
import re

in_ip = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
in_ip.connect(("www.google.co.kr",443))
print("내부 IP:", in_ip.getsockname()[0])

req = requests.get("http://ipconfig.kr")
out_ip = re.search(r'IP Address : (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})', req.text)[1]
print("외부 IP : ",out_ip)