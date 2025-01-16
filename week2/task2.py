booking={
    "John":[h for h in range(1,25)],
    "Bob":[h for h in range(1,25)],
    "Jenny":[h for h in range(1,25)]
    }
         
def book(consultants, hour, duration, criteria):
    # 將 criteria 與 consultant 建立 list 
    order = [[i[criteria], i["name"]] for i in consultants]
    # 依據 criteria 分別做排序
    if criteria == "price":  
        order.sort()  # 小到大
    elif criteria == "rate":
        order.sort(reverse = True)  # 大到小
        
    index = 0
    while index < len(order):
        consultant_name = order[index][1]
        available_hours = booking[consultant_name]
        end_hour = hour + duration - 1

        if all(h in available_hours for h in range(hour, end_hour + 1)):
            for _ in range(duration):
                available_hours.remove(hour)
                hour += 1
            
            print(consultant_name)
            return
        else:
            index += 1

    print("No Service")

consultants=[ 
    {"name":"John", "rate":4.5, "price":1000}, 
    {"name":"Bob", "rate":3, "price":1200}, 
    {"name":"Jenny", "rate":3.8, "price":800} 
]

book(consultants, 15, 1, "price")  # Jenny
book(consultants, 11, 2, "price")  # Jenny
book(consultants, 10, 2, "price")  # John
book(consultants, 20, 2, "rate")  # John
book(consultants, 11, 1, "rate")  # Bob
book(consultants, 11, 2, "rate")  # No Service
book(consultants, 14, 3, "price")  # John



