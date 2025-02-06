
let signin = document.querySelector('#signin-form');
if (signin){
    signin.addEventListener('submit', function (event) {
        let checkbox = document.querySelector('#terms');
        if (!checkbox.checked) {
            event.preventDefault();
            alert("Please check the checkbox first");
        }
    });
}

let numInput= document.querySelector('#num')
let submitBtn= document.querySelector('#submit-btn')
if (numInput && submitBtn){
    submitBtn.addEventListener('click', function(){
        let num = numInput.value;
        url = "/square/" + num;
        window.location.replace(url);
    });
}

console.log("week4.js loaded");

