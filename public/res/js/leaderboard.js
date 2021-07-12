var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  fetch("https://acm-quiz-portal.herokuapp.com/quiz/leaderboard", requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response.length)
        var j;
        var rows = "";
        for (j = 0; j < response.length; j++) {

            console.log(response[j]);
            rows += "<tr><td>" + response[j].user_name + "</td><td>" + (j+1) + "</td><td>" +  response[j].score + "</td><td>" + response[j].current_question + "</td></tr>";   
        }
        document.getElementById("leaderboardbody").innerHTML = rows;
    })
    .catch(error => console.log('error', error));