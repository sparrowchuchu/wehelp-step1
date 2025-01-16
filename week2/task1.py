def find_and_print(messages,current_station):
    green_line = [
        "Songshan","Nanjing Sanmin","Taipei Arena","Nanjing Fuxing","Songjiang Nanjing",
        "Zhongshan","Beimen","Ximen","Xiaonanmen","Chiang Kai-shek Memorial Hall",
        "Guting","Taipower Building","Gongguan","Wanlong","Jingmei",
        "Dapinglin",["Qizhang","Xiaobitan"],"Xindian City Hall","Xindian"
    ]

    friends_station={}  # "friend":[index, branch_index, station]
    for friend, message in messages.items():
        # print(friend, message)
        for index, station in enumerate(green_line):
            branch_index = 0
            if isinstance(station, str) and (station in message):
                friends_station[friend] = [index, branch_index, station]
            elif isinstance(station, list): 
                for branch_station in station:
                    if isinstance(branch_station, str) and (branch_station in message):
                        friends_station[friend] = [index, branch_index, branch_station]
                    branch_index += 1
            else: pass
    # print(friends_station)

    current_branch_index = 0
    flag = False
    not_found = True
    for current_index, station in enumerate(green_line):
        if isinstance(station, str) and (station == current_station):
            not_found = False
            break
        elif isinstance(station, list):
            for branch_station in station:
                if isinstance(branch_station, str) and (branch_station == current_station):
                    not_found = False
                    flag = True
                    break
                current_branch_index += 1
            if flag:
                break
            current_branch_index = 0
        else: pass
    
    if not_found:
        print("Current station not found.")
        return

    distance = {friend:abs(current_index - index[0]) + index[1] for friend, index in friends_station.items()}

    # print("current_station:",current_station," current_index:",current_index)
    # print(distance)
    nearest_friend = [friend for friend, dis in distance.items() if dis == min(distance.values())]

    print(nearest_friend[0])

messages={
    "Leslie":"I'm at home near Xiaobitan station.",
    "Bob":"I'm at Ximen MRT station.",
    "Mary":"I have a drink near Jingmei MRT station.",
    "Copper":"I just saw a concert at Taipei Arena.",
    "Vivan":"I'm at Xindian station wait for you."
}

find_and_print(messages,"Wanlong")  # print Mary
find_and_print(messages,"Songshan")  # print Copper
find_and_print(messages,"Qizhang")  # print Leslie
find_and_print(messages,"Ximen")  # print Bob
find_and_print(messages,"Xindian City Hall")  # print Vivian


