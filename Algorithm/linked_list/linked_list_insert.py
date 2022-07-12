# linked_list 기본 구현
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

# insert newNode
newNode = Node()
newNode.data = "ydw"
newNode.link = node3.link
node3.link = newNode

current = node1
print(current.data, end = ' ')
while current.link != None :
	current = current.link
	print(current.data, end = ' ')