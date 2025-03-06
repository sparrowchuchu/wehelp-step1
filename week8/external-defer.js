console.log('> Defer : head 標籤內使用 Defer 屬性載入外部 JavaScript 檔案 ---');

let demoDefer = document.querySelector('#demo');
let deferDiv = document.createElement('div');
deferDiv.innerHTML = '使用 Defer 屬性加入子元素';
deferDiv.style.color = 'darkblue';
deferDiv.style.fontSize = '20px';
deferDiv.style.height = '50px';
demoDefer.appendChild(deferDiv);

