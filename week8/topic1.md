# Topic 1: HTML `<script>` Attributes
There are 2 attributes, defer and async, that we can use in `<script>` tag to change the script loading and executing behavior.
Follow learning steps below to prepare your report:
1. What happens If we add a defer attribute to a `<script>` tag?
2. What happens If we add an async attribute to a `<script>` tag?
3. When to use these 2 attributes? Could you give us code examples to illustrate the use cases for these 2 attributes?

## 1. `<script>` tag 加入 defer
瀏覽器在渲染 HTML 頁面遇到到帶有 defer 屬性的 script 標籤，會同時解析 script 檔和下一行 html 程式。  
直到整個 HTML 頁面渲染完畢才會執行 script 檔。  

`<script src="external-defer.js" defer></script>`  

## 2. `<script>` tag 加入 async
瀏覽器在渲染 HTML 頁面遇到到帶有 async 屬性的 script 標籤，會同時解析 script 檔和下一行 html 程式。  
當 script 檔解析完成，瀏覽器會暫停渲染 HTML 頁面並執行 script 檔。  
直到 script 檔執行完畢再繼續渲染 HTML 頁面。  

`<script src="external-async.js" async></script>`  

![Async VS Defer](/week8/async_vs_defer.jpeg)

## 3. 使用 defer 跟 async 的時機
### defer
1. Javascript DOM 操作
2. 希望 script 檔的執行順序是可預期的。

### async
1. script 檔的執行不影響 HTML 本身。
2. 不在意執行順序，希望 script 檔解析完成後能馬上執行。

External-JS.html
```
<!DOCTYPE html>
<html>
<head>
    <script src="external-head.js"></script>
    <script src="external-defer.js" defer></script>
    <script src="external-async.js" async></script>
    <title>External JavaScript</title>
</head>
<body>
    <h1>External JavaScript</h1>
    <h3>defer 和 async 屬性的比較</h3>
    <hr/>
    <div id="demo"></div>

    <script src="external-body.js"></script>
</body>
</html>
```

external-head.js
```
console.log('> head 標籤內部加入script標籤 載入外部 JavaScript 檔案 ---');

let demoHead = document.querySelector('#demo');
let headDiv = document.createElement('div');
headDiv.innerHTML = 'script 標籤放在 head 標籤內部 加入子元素';
demoHead.appendChild(headDiv);
```

external-defer.js
```
console.log('> Defer : head 標籤內使用 Defer 屬性載入外部 JavaScript 檔案 ---');

let demoDefer = document.querySelector('#demo');
let deferDiv = document.createElement('div');
deferDiv.innerHTML = '使用 Defer 屬性加入子元素';
demoDefer.appendChild(deferDiv);
```

external-async.js
```
console.log('> Async : head 標籤內使用 Async 屬性載入外部 JavaScript 檔案 ---');

let demoAsync = document.querySelector('#demo');
let asyncDiv = document.createElement('div');
asyncDiv.innerHTML = '使用 Async 屬性加入子元素';
demoAsync.appendChild(asyncDiv);
```

external-body.js
```
console.log('> body 標籤底部加入script標籤 載入外部 JavaScript 檔案 ---');

let demoBody = document.querySelector('#demo');
let bodyDiv = document.createElement('div');
bodyDiv.innerHTML = 'script 標籤放在 body 標籤底部 加入子元素';
demoBody.appendChild(bodyDiv);
```


[How do you add JavaScript to your page?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript#how_do_you_add_javascript_to_your_page)  
[Async VS Defer - Understand The JavaScript Execution](https://jeetsdev.hashnode.dev/async-vs-defer-understand-javascript-execution)