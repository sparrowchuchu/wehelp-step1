# Task 5: Cross-Site Scripting (XSS)
Cross-Site Scripting (XSS) is one of the most common attack methods. Try to study the basic concept, replicate the attack steps, and tell us how to prevent this kind of attack from the developer’s view.
Follow learning steps below to prepare your report:
1. What is XSS?
2. You are a hacker! Design and do a real XSS attack on a web system. Show us your work.
3. Based on the scenario you did in the previous step, how could it be prevented?

## 1. XSS 跨站腳本攻擊
概念和 SQL Injection 類似，XSS 是使用 JavaScript 腳本，惡意插入奇怪的東西，例如論壇貼文中加入\<script\> 加入 DOM 操作魔改原始網站 \</script\>


## 2. 我是 hacker!?
\<script\> 可以做的事 \</script\>  
1. 獲取其他使用者的 cookies。 
2. 偽裝原始網站設計的輸入框，引誘其他使用者輸入機敏資訊。
3. 加入含有釣魚網站的彈出式視窗。  

參考資料裡有展示的 code ，目前試過在輸入框輸入`<script>alert(1)</script>`，網站都有防範機制，不會直接執行腳本。

## 3. 如何預防
1. 對程式中所有可能傳遞資料的地方做檢查。例如: 參數、headers、URL、cookies、JSON、SOAP、XML data inputs。 
2. 限制進入後端的資料格式。例如: 字串。
3. 設定 cookie 的使用規則。



[什麼是 Cross-site scripting](https://www.cloudflare.com/zh-tw/learning/security/threats/cross-site-scripting/)  
[A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/)  
[什麼是 XSS 攻擊？如何防範？](https://www.explainthis.io/zh-hant/swe/what-is-xss)
[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)  

