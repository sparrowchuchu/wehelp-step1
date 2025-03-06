console.log('> head 標籤內部加入script標籤 載入外部 JavaScript 檔案 ---');

let demoHead = document.querySelector('#demo');
let headDiv = document.createElement('div');
headDiv.innerHTML = 'script 標籤放在 head 標籤內部 加入子元素';
headDiv.style.color = 'darkblue';
headDiv.style.fontSize = '20px';
headDiv.style.height = '50px';
demoHead.appendChild(headDiv);



