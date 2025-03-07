# Topic 3: Fetch and CORS
Using built-in JavaScript fetch function, we can send HTTP requests to the back-end and get HTTP responses without refreshing or redirecting the page. Cross Origin Resource Sharing (CORS) concept plays a critical role if we want to send a request to a different domain with the fetch function.
Follow learning steps below to prepare your report:
1. What is CORS?
2. Can we use the fetch function in our localhost page, to send a request to https://www.google.com/ and get a response?
3. Can we use the fetch function in our localhost page, to send a request to https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json and get a response? Compared to the previous case, what’s the difference?
4. How to share APIs we developed to other domains, just like what we experienced in step 3. Could you give us an example?

## 1 CORS 
### 1.1 跨來源資源共享 Cross-Origin Resource Sharing
CORS 允許指定的外部來源取得自身網站的資源，除了獲得許可的外部來源，其他的外部來源無法獲取自身網站的資料。  
例如: 字型、圖片、CSS樣式。

### 1.2 同源必須符合以下三個條件：
1. 同通訊協定（protocol / scheme）
2. 同網域（domain / hostname ）
3. 同通訊埠（port）
讓來自同源的請求才可以獲取資料。
這個機制可以保護網站的資料不會被任何人隨意取得。

## 2. 使用本機( localhost ) fetch google 資料
### 2.1 無法直接使用 fetch 取得 google 資料
`fetch("https://www.google.com/")`  

出現錯誤訊息
origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
### 2.2 需要在 requset 加入 mode: 'no-cors' 
```
fetch("https://www.google.com/", { 
            mode: 'no-cors' 
        })
```
非同源請求無法取得 body 的資料，Response 的內容被限制，不清楚這個資料要怎麼使用。

## 3. 使用本機( localhost ) fetch github 資料
### 3.1 可以使用 localhost 取得 github 資料
`fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json")`

### 3.2 比較 google 和 github 的差別
google 對跨源請求比較嚴格，相較之下 github 是協作與分享的平台，跨源請求的限制少很多。

## 4 如何將我們開發的 API 分享給其他網域
### 4.1 安裝 cors 套件：
`npm install cors`
### 4.2 在 Server 中設定 CROS：
設定允許 CROS 的白名單
```
const express = require('express');
const cors = require('cors');

const app = express();

// 允許所有網域的 CORS 請求（不推薦在生產環境中使用）
app.use(cors());

// 或者僅允許特定的網域進行 CORS 請求：
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://example.com']
// }));

app.get('/data', (req, res) => {
  res.json({ message: '這是來自伺服器的數據！' });
});

app.listen(9000, () => {
  console.log('伺服器運行在 http://localhost:9000');
});
```

## 5 補充
使用開發人員工具檢視 Google 網頁的 Response 中帶有 origin 的協定  
### 5.1 Referrer Policy:
strict-origin-when-cross-origin
- 同源請求（same-origin）：如果請求是發往相同的來源（例如，從 https://example.com 到 https://example.com），瀏覽器會傳送完整的 Referer，包括完整 URL（例如 https://example.com/page1）。
- 跨源請求（cross-origin）：如果請求是發往不同的來源（例如，從 https://example.com 到 https://another-site.com），行為會進一步取決於安全性：  
    - 如果當前頁面和目標頁面都使用 HTTPS（安全協議），則只傳送來源的「origin」（域名部分，例如 https://example.com），不包含路徑或查詢參數。
    - 如果請求從 HTTPS 頁面發往 HTTP 頁面（不安全的降級），則完全不傳送 Referer 資訊。
### 5.2 cross-origin-opener-policy:
same-origin-allow-popups; report-to="gws"
- 同源請求（same-origin）：只有當新開啟的視窗（例如彈出視窗）與原始頁面屬於「同源」（相同的協議、域名和埠號）時，兩者才能保留「開啟者關係」（opener relationship）。
- 跨源請求（cross-origin）：如果彈出視窗是跨源的（例如，從 https://example.com 開啟 https://another-site.com），則這種關係會被切斷，防止跨源視窗互相干擾。

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)  
[CORS 是什麼? 為什麼要有 CORS？](https://www.explainthis.io/zh-hant/swe/what-is-cors)
  
[Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)  
[Understanding and Fixing the “Strict-Origin-When-Cross-Origin” CORS Error](https://medium.com/@aleksej.gudkov/understanding-and-fixing-the-strict-origin-when-cross-origin-cors-error-340c6614f701)  
