class Node():
    def __init__(self):
        self.data = None
        self.link = None

node1 = Node()
node1.data = "hjy"

node2 = Node()
node2.data = "hms"
node1.link = node2

node3 = Node()
node3.data = "hsc"
node2.link = node3

node4 = Node()
node4.data = "yes"
node3.link = node4

node5 = Node()
node5.data = "ysm"
node4.link = node5
# 끝 노드와 첫 노드 연결
node5.link = node1

current = node1
print(current.data, end =' ')
while current.link != node1 :
	current = current.link
	print(current.data, end=' ')
