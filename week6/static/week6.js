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

const signin = document.forms['signinForm'];
if (signin){
    signin.addEventListener('submit', function (event) {
        let username = signin.username.value;
        let password = signin.password.value;
        if (username == "" || password == "") {
            event.preventDefault();
            alert("Please fill in all the fields.");
        }
    });
}

// console.log("week6.js loaded");

