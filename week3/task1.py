from urllib import request, error
import json
import csv
import re

def getUrlData(url):
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
           AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 \
           Safari/537.36'}
    try:
        req = request.Request(url, headers = headers)
        response = request.urlopen(req)
    except error.HTTPError as e:
        print(e)
    else:
        print("Get Url Data Successfully.")
    data = response.read().decode('utf-8')
    dict_data = json.loads(data)
    return dict_data

def writeCsvFile(fileName, result):
    with open(fileName, 'w', encoding='utf-8', newline = '') as csvFile:
        csvWriter = csv.writer(csvFile)
        for row in result:
            csvWriter.writerow(row)
    print(f'Write CSV File {fileName} Successfully.')


# Here are URLs for tourist spots in Taipei provided by Taipei City Government:
urls = {
    'ass_1':'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1',
    'ass_2':'https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'
    }

'''
1. 取得資料
'''
ass_1 = getUrlData(urls['ass_1'])
ass_2 = getUrlData(urls['ass_2'])

'''
2. 檢查資料/清理資料
'''
list_ass_1 = ass_1['data']['results']
result_ass_1 = []  # ['SERIAL_NO', 'stitle', 'longitude', 'latitude', 'info']
for dict_data in list_ass_1:
    # 'District' : You can extract the district from the address column in source data.
    pattern = r'https:.+?\.jpg'  # 非貪婪模式 +?
    match = re.search(pattern, dict_data['filelist'], re.IGNORECASE)  # re.I 搜尋忽略大小寫
    if match:
        img_url = match.group()
        # print(dict_data['_id'], "找到的匹配 Image URL \n", img_url)
    else:
        print(dict_data['_id'], "String 內不含符合規則的 Image URL")
    result_ass_1.append([dict_data['SERIAL_NO'], dict_data['stitle'], dict_data['longitude'],
                   dict_data['latitude'], img_url, dict_data['info']]) 

list_ass_2 = ass_2['data']
list_2_ass_2 = [list(item.values()) for item in list_ass_2]
result_ass_2 = []  # ['SERIAL_NO', 'MRT', district]
set_mrt = set()
for item in list_2_ass_2:
    # print(item)
    pattern = r'[\u4e00-\u9fff]{2}區'  # 所有中文字 [\u4E00-\u9FFF]
    match = re.search(pattern, item[2], re.IGNORECASE)  # re.I 搜尋忽略大小寫
    if match:
        district = match.group()
        # print("District :", district)
    else:
        print(item[2], "String 內不含符合規則的 District")
    set_mrt.add(item[0])
    result_ass_2.append([item[1], item[0], district])
writeCsvFile('ass_1.csv', result_ass_1)
writeCsvFile('ass_2.csv', result_ass_2)

'''
3. 整理資料/輸出資料
'''
spot = []  # [SpotTitle, District, Longitude, Latitude, ImageURL]
mrt = [[i] for i in set_mrt]  # [StationName, AttractionTitle1, AttractionTitle2, AttractionTitle3, ...]
for i in result_ass_1:  # ['SERIAL_NO', 'stitle', 'longitude', 'latitude', 'info']
    for j in result_ass_2:  # ['SERIAL_NO', 'MRT', district]
        if i[0] == j[0]:
            spot.append([i[1], j[2], i[2], i[3] ,i[4]])
            for m in mrt:
                if j[1] == m[0]:
                    print(j[2], m[0])
                    m.append(i[1])
                    break
            break
writeCsvFile('spot.csv', spot)
writeCsvFile('mrt.csv', mrt)




