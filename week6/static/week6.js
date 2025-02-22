function delConfirm(){
    let result = confirm("確定要刪除嗎?");
    if (result){
        return true;
    }
    return false;
} 

function validataForm(){
    let signupForm = document.forms['signupForm'];
    let name = signupForm.name.value;
    let username = signupForm.username.value;
    let password = signupForm.password.value;
    let checkbox = signupForm.terms;
    let nameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    let usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    let passwordRegex = /^[a-zA-Z0-9_]{8,50}$/;
    if (name == "" || username == "" || password == "") {
        alert("Please fill in all the fields.");
        return false;  // Prevent form submission
    }
    if (!nameRegex.test(name)) {
        alert("Name must be at least 3 characters.");
        return false;
    }
    if (!usernameRegex.test(username)) {
        alert("UserName must be at least 3 characters.");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters.");
        return false;
    }
    if (!checkbox.checked) {
        alert("Please check the terms first.");
        return false;
    }
    return true;  // Allow form submission
}

const signin = document.forms['signinForm'];
if (signin){
    signin.addEventListener('submit', function (event) {
        let username = signin.username.value;
        let password = signin.password.value;
        let usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        let passwordRegex = /^[a-zA-Z0-9_]{8,50}$/;
        if (username == "" || password == "") {
            event.preventDefault();
            alert("Please fill in all the fields.");
        }
        if (!usernameRegex.test(username)) {
            event.preventDefault();
            alert("UserName must be at least 3 characters.");
        }
        if (!passwordRegex.test(password)) {
            event.preventDefault();
            alert("Password must be at least 8 characters.");
        }
    });
}

// console.log("week6.js loaded");

