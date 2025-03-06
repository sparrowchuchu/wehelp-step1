console.log('> Async : head 標籤內使用 Async 屬性載入外部 JavaScript 檔案 ---');

let demoAsync = document.querySelector('#demo');
let asyncDiv = document.createElement('div');
asyncDiv.innerHTML = '使用 Async 屬性加入子元素';
asyncDiv.style.color = 'darkblue';
asyncDiv.style.fontSize = '20px';
asyncDiv.style.height = '50px';
demoAsync.appendChild(asyncDiv);


