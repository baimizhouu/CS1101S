class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
class LinkedList:
    def __init__(self, *datas):
        self.head = None
        if datas:
            self.head = Node(datas[0])
            current = self.head
            while current.next:
                current = current.next
            for i in range(1, len(datas)):
                current.next = Node(datas[i])
                current = current.next
    def add(self, *datas):
        if not self.head:
            self.head = Node(datas[0])
            current = self.head
            while current.next:
                current = current.next
            for i in range(1, len(datas)):
                current.next = Node(datas[i])
                current = current.next
        else:
            current = self.head
            while current.next:
                current = current.next
            for i in range(0, len(datas)):
                current.next = Node(datas[i])
                current = current.next
        return self
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=' ')
            current = current.next
        print()
        return self
    def delete(self, data):
        current = self.head
        while current:
            if(current.next.data == data):
                current.next = current.next.next
                break
            current = current.next
        return self
    def search(self, data):
        current = self.head
        while current:
            if(current.next.data == data):
                return True
        return False
    def append(self, llist):
        current = self.head
        while current.next:
            current = current.next
        to = llist.head

        while to:
            node = Node(to.data)
            current.next = node
            current = current.next
            to = to.next
        return self
