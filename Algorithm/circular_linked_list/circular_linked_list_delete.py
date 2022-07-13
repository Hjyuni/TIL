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
node3.data = "yes"
node2.link = node3

node4 = Node()
node4.data = "hsc"
node3.link = node4
node4.link = node1

# circular delete
node2.link = node3.link
del(node3)

current = node1
print(current.data, end=' ')
while current.link != node1:
    current = current.link
    print(current.data, end=' ')