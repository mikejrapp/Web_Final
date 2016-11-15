window.onload = init;

function init(){
	var buttonLogin = document.getElementById("buttonLogin");
	var userName = document.getElementById("userName");
	
	userName.addEventListener("click",function(){
		highlight(this);
	});
	
	buttonLogin.addEventListener("click",function(){
		login();
	});
}

function login(){
	var httpRequest = new XMLHttpRequest();
	var loginDisplay = document.getElementById("test");
	var data = "userName=" + document.getElementById("userName").value + "&password=" + document.getElementById("password").value;
	httpRequest.open("POST","http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php",false);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	httpRequest.send(data);
	
	if(httpRequest.status == 200){
		var response = JSON.parse(httpRequest.responseText);
		var userLogin;
		
		if(response["result"] == "valid"){
			loginDisplay.innerHTML = "logging in as: " + response["userName"];
			localStorage["userLogin"] = response["userName"] + response["timestamp"];
			setTimeout(loadGamePage,800);
		}
		else{
			test.innerHTML = "User name or password not recognized";
		}
		
	}
}

function highlight(field){
	field.focus();
	field.select();
}

function loadGamePage(){
	window.location.href = "MVC.html";
}