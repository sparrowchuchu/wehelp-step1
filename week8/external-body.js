console.log('> body 標籤底部加入script標籤 載入外部 JavaScript 檔案 ---');

let demoBody = document.querySelector('#demo');
let bodyDiv = document.createElement('div');
bodyDiv.innerHTML = 'script 標籤放在 body 標籤底部 加入子元素';
bodyDiv.style.color = 'darkblue';
bodyDiv.style.fontSize = '20px';
bodyDiv.style.height = '50px';
demoBody.appendChild(bodyDiv);



