function signup() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": document.getElementById("name").value,
        "username": document.getElementById("username").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://acm-quiz-portal.herokuapp.com/user/register", requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        window.alert(response.message)
    })
    .catch(error => console.log('error', error));
}

async function login(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    await fetch("https://acm-quiz-portal.herokuapp.com/user/authenticate", requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setCookie("token",response.token,7);
        setCookie("id",response.id,7);
    })
    .catch(error => console.log('error', error));
    location.replace("page.html");
}

function setCookie(name,value,exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
