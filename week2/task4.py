"""
There is a number sequence: 0, 4, 8, 7, 11, 15, 14, 18, 22, 21, 25, …
Find out the nth term in this sequence.
"""
def get_number(index):
    reduce = index//3
    add = index - reduce
    print(add*4 - reduce)

get_number(1) # print 4
get_number(5) # print 15
get_number(10) # print 25
get_number(30) # print 70

