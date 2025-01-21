from urllib import request, error
from http import cookiejar
from bs4 import BeautifulSoup
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
    soup = BeautifulSoup(data, 'html.parser')
    # print(soup.prettify())
    print("Parse Url Data Successfully.") 
    return soup

# Here is URL for PTT lottery board:
url = 'https://www.ptt.cc/bbs/Lottery/index.html'


'''
1. 取得資料/解析資料
'''
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 \
        Safari/537.36'}
cj = cookiejar.CookieJar()

# Manually create a cookie and add it to the CookieJar
cookie = cookiejar.Cookie(
    version=0,  # Cookie version (0 means Netscape format)
    name='over18',
    value='1',
    port=None,
    port_specified=False,
    domain='www.ptt.cc',  # Replace with the actual domain you're requesting
    domain_specified=True,
    domain_initial_dot=False,
    path='/',  # Path of the cookie
    path_specified=True,
    secure=False,  # Whether the cookie is secure
    expires=None,  # Expires (None means session cookie)
    discard=True,
    comment=None,
    comment_url=None,
    rest={}
)
cj.set_cookie(cookie)
opener = request.build_opener(request.HTTPCookieProcessor(cj))
try:
    req = request.Request(url, headers = headers)
    response = opener.open(req)
except error.HTTPError as e:
    print(e)
else:
    print("Get Url Data Successfully.")
data = response.read().decode('utf-8')
soup = BeautifulSoup(data, 'html.parser')
# print(soup.prettify())
print("Parse Url Data Successfully.")  


'''
2. 爬取資料/清理資料
'''
article = []
titles = soup("div", "title")
nrecs = soup("div", "nrec")
like = []
for nrec in nrecs:
    for i in nrec:
        # print(i.contents)
        like.append(i.contents[0])
        
print(like)
print(titles)



'''
3. 整理資料/輸出資料
'''



