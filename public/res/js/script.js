function getCookie(name) {
    var cname = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    var d = new Date();
    d.setTime(d.getTime() - (60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=;" + expires + ";path=/";
}

function getQuestion(){ 
    const token =  getCookie("token")
    const id =  getCookie("id")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "id": id
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://acm-quiz-portal.herokuapp.com/quiz/getQuestion", requestOptions)
      .then(response => response.json())
      .then(response => {
          if(response.questionType == "text"){
            
            var div = document.getElementById("questionmcq");  
            div.style.display = "none"

            var div = document.getElementById("questiontext");  
            div.style.display = "block"

            document.getElementById("txt index").innerHTML = response.questionIndex
            document.getElementById("txt ques").innerHTML = response.question
            document.getElementById("txt desc").innerHTML = response.description
          }
          if(response.message == "Quiz Completed"){
            window.alert("Quiz Completed");
            return
        }

          if(response.questionType == "mcq"){
            
            var div = document.getElementById("questionmcq");  
            div.style.display = "block"

            var div = document.getElementById("questiontext");  
            div.style.display = "none"

            document.getElementById("mcq index").innerHTML = response.questionIndex
            document.getElementById("mcq ques").innerHTML = response.question
            document.getElementById("opt A").innerHTML = "(a)  " + response.options.a
            document.getElementById("opt B").innerHTML = "(b)  " +response.options.b
            document.getElementById("opt C").innerHTML = "(c)  " +response.options.c
            document.getElementById("opt D").innerHTML = "(d)  " +response.options.d
          }
          if(response.skippable == "false"){
            document.getElementById("skip").style.display = "none"
          } else {
            document.getElementById("skip").style.display = "block"
          }
          console.log(response)

      })
      .catch(error => console.log('error', error));
}



function checkAnswer(){
    const token =  getCookie("token")
    const id =  getCookie("id")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id,
        "answer": document.getElementById("ans").value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://acm-quiz-portal.herokuapp.com/quiz/checkAnswer", requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        document.getElementById('ans').value = ''
        if(response.message == "Wrong"){
            window.alert("Try Again")
        }
        getQuestion();
    })
    .catch(error => console.log('error', error));
}

function logout_user(){
    deleteCookie("id");
    deleteCookie("token");
	location.replace("index.html");
}

function skipquestion(){
    const token =  getCookie("token")
    const id =  getCookie("id")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://acm-quiz-portal.herokuapp.com/quiz/skipQuestion/", requestOptions)
    .then(response => response.json())
    .then(response => {
        window.alert("Question Skipped!");
        console.log("Question Skipped!");
        getQuestion();
    })
    .catch(error => console.log('error', error));
}