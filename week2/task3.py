def func(*data):
    mid=[]
    for name in data:
        if len(name)>= 4:
            mid.append(name[2])
        else :
            mid.append(name[1])
    
    unique = [item for item in mid if mid.count(item) == 1]
    if len(unique) == 0:
        print("沒有")
    else:
        for u in unique:
            print(data[mid.index(u)])
    

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

