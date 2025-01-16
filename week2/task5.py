def find(spaces, stat, n):
    available_spaces =[]
    for i in range(len(spaces)):
        if stat[i]:
            available_spaces.append(spaces[i]-n)
        else:
            available_spaces.append(-1)
    min = 100
    for num in available_spaces:
        if num >= 0 and num < min:
            min = num
    if min in available_spaces:
        print(available_spaces.index(min))
    else:
        print(-1)
find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2) # print 5
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4) # print -1
find([4, 6, 5, 8], [0, 1, 1, 1], 4) # print 2



