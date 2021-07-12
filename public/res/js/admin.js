function addtextquestion(){
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+ getCookie("token"));
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"questionIndex":  document.getElementById("Question Number").value,
		"questionType":  "text",
		"questionData": {
		  "question":  document.getElementById("Question").value,
		  "description":  document.getElementById("Description").value,
		  "answer":  document.getElementById("Answer").value,
		  "skippable":  document.getElementById("Skippable").value
		}
	});

	var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
	};

	fetch("https://acm-quiz-portal.herokuapp.com/question/", requestOptions)
	.then(response => response.text())
	.then(response => console.log(response))
	.catch(error => console.log('error', error));
}

function addmcqquestion(){
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+ getCookie("token"));
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"questionIndex": document.getElementById("Question Number").value,
		"questionType": "mcq",
		"questionData": {
		  "question": document.getElementById("Question").value,
		  "options": {
			"a": document.getElementById("Option A").value,
			"b": document.getElementById("Option B").value,
			"c": document.getElementById("Option C").value,
			"d": document.getElementById("Option D").value,
		  },
		  "answer": document.getElementById("Answer").value,
		  "skippable": document.getElementById("Skippable").value,
		}
	});

	var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
	};

	fetch("https://acm-quiz-portal.herokuapp.com/question/", requestOptions)
	.then(response => response.text())
	.then(response => console.log(response))
	.catch(error => console.log('error', error));
}

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



var formAnimator = {
	init: function() {
	  this.form = document.querySelector('form');
		this.button = document.querySelector('button');
	  this.path = document.querySelector('path');
	  this.createPath();
	  this.form.addEventListener('submit', this.animate, false);
	  window.addEventListener('resize', this.createPath);
	},
	
	createPath: function() {
	  console.log('creating path');
	  var that = formAnimator;
		that.dPath = 'M' + (that.button.offsetLeft + that.button.offsetWidth) + ' ' + that.form.offsetHeight + ' H' + that.form.offsetWidth + ' V0 H0 V' + that.form.offsetHeight + ' H' + that.button.offsetLeft;
		console.log(that.dPath);
	  that.path.setAttribute('d', that.dPath);
	  },
	
	animate: function(e) {
	  var that = formAnimator;
		e.preventDefault();
	  that.path.classList.add('animate');
	  that.path.classList.remove('hidden');
	  that.button.classList.add('valid');
	  that.path.addEventListener('webkitAnimationEnd', function() {
		this.classList.remove('animate');
		this.classList.add('hidden');
		that.button.classList.remove('valid');
	  }, false);
	  }
	
}
  
window.addEventListener('DOMContentLoaded', function() {
	
	formAnimator.init();
	
}, false);

