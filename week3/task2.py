from urllib import request, error
from http import cookiejar
from bs4 import BeautifulSoup
import csv


def getUrlData(url):
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
        domain='www.ptt.cc',
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
        print(response.getcode())
        # print(e)
        pass
    else:
        pass
    data = response.read().decode('utf-8')
    soup = BeautifulSoup(data, 'html.parser')
    # print(soup.prettify())    
    return soup

def writeCsvFile(fileName, result):
    with open(fileName, 'w', encoding='utf-8', newline = '') as csvFile:
        csvWriter = csv.writer(csvFile)
        for row in result:
            csvWriter.writerow(row)
    print(f'Write CSV File {fileName} Successfully.')
    

article_title = []
like_count = []
publish_time = []

# 1. 取得資料/清理資料
# Here is URL for PTT lottery board:
ppt_url = 'https://www.ptt.cc/bbs/Lottery/index.html'
soup = getUrlData(ppt_url)

page = 1
while page < 4: 
    print(f'start getting page {page} data.')
    titles = soup('div', 'title')
    for title in titles:
        try:
            article_title.append(title.a.text)
        except Exception as e:  # 本文已被刪除
            article_title.append(title.text.strip())
            publish_time.append('')
            # print(e)
        else:
            url = 'https://www.ptt.cc' + title.a['href']
            try:
                article = getUrlData(url)
                article_metaline = article('div', 'article-metaline') [2]
                pt = article_metaline('span', 'article-meta-value')[0].text
                publish_time.append(pt)
            except Exception as e:    # [公告] 沒有發布日期
                publish_time.append('')
                # print(e)
    
    likes = soup('div', 'nrec')
    for like in likes:
        try:
            like_count.append(like.span.text)
        except Exception as e:  # 沒有讚或噓
            like_count.append('0')
            # print(e)
    
    next_page = soup('a', 'btn wide')[1]['href']
    next_page_url = 'https://www.ptt.cc' + next_page
    soup = getUrlData(next_page_url)
    page += 1

# 2. 整理資料
lottery = [[article_title[i], like_count[i], publish_time[i]] for i in range(len(article_title))]

# 3. 輸出資料
writeCsvFile('article.csv', lottery)


