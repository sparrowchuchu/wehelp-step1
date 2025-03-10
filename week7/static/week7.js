const signin = document.forms['signinForm'];
if (signin){
    signin.addEventListener('submit', function (event) {
        let username = signin.username.value;
        let password = signin.password.value;
        let usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        let passwordRegex = /^[a-zA-Z0-9_]{6,50}$/;
        if (username == "" || password == "") {
            event.preventDefault();
            alert("Please fill in all the fields.");
        }
        if (!usernameRegex.test(username)) {
            event.preventDefault();
            alert("The username must be between 3 and 15 characters.");
        }
        if (!passwordRegex.test(password)) {
            event.preventDefault();
            alert("The password must be between 6 and 50 characters.");
        }
    });
}

document.querySelector("#updateNameBtn").addEventListener("click", function(event){
    let updateName = document.querySelector("#updateName").value;
    let result = document.querySelector("#updateNameResult");
    let nameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,15}$/;
    if (!nameRegex.test(updateName)) {
        result.innerHTML = "請輸入 3~15 個字";
    } else {
        fetch("/api/member", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: updateName })
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.ok) {
                result.innerHTML = "更新成功";
            } else {
                result.innerHTML = "更新失敗";
            }
        })
        .catch(error => {
            console.error("Error fetching member data:", error);
            result.innerHTML = "請稍後在試";
        });
    }
});

document.querySelector("#queryNameBtn").addEventListener("click", function(){
    let queryName = document.querySelector("#queryName").value;
    let result = document.querySelector("#queryNameResult");
    if (!queryName) {
        result.innerHTML = "請輸入會員的Username";
    }

    fetch(`/api/member?username=${queryName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.data) {
            result.innerHTML = `${data.data.name}(${data.data.username})`;
        } else {
            result.innerHTML = "沒有這個使用者";
        }
    })
    .catch(error => {
        console.error("Error fetching member data:", error);
        result.innerHTML = "請稍後在試";
    });
});



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
    let nameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,15}$/;
    let usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    let passwordRegex = /^[a-zA-Z0-9_]{6,50}$/;
    if (name == "" || username == "" || password == "") {
        alert("Please fill in all the fields.");
        return false;  // Prevent form submission
    }
    if (!nameRegex.test(name)) {
        alert("The name must be between 3 and 15 characters.");
        return false;
    }
    if (!usernameRegex.test(username)) {
        alert("The username must be between 3 and 15 characters.");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("The password must be between 6 and 50 characters.");
        return false;
    }
    if (!checkbox.checked) {
        alert("Please check the terms first.");
        return false;
    }
    return true;  // Allow form submission
}



