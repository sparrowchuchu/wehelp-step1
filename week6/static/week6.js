function delConfirm(){
    let result = confirm("確定要刪除嗎?");
    if (result){
        return true;
    }
    return false;
}

function validataForm(){
    let name = document.querySelector("#signup-name").value;
    let username = document.querySelector("#signup-username").value;
    let password = document.querySelector("#signup-password").value;
    let checkbox = document.querySelector('#signup-terms');
    if (name == "" || username == "" || password == "") {
        alert("Please fill in all the fields.");
        return false;  // Prevent form submission
    }
    if (!checkbox.checked) {
        alert("Please check the terms first.");
        return false;
    }
    return true;  // Allow form submission
}

const signin = document.querySelector('#signin-form');
if (signin){
    signin.addEventListener('submit', function (event) {
        let username = document.querySelector("#signin-username").value;
        let password = document.querySelector("#signin-password").value;
        if (username == "" || password == "") {
            event.preventDefault();
            alert("Please fill in all the fields.");
        }
    });
}

// console.log("week6.js loaded");

