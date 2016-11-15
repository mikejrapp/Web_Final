
function addLocalStorageClear(){
	var userLogin = localStorage["userLogin"];
	var loginDisplay = document.getElementById("title");
	
	loginDisplay.innerHTML = userLogin;
	
	addLocalStorageOptions(document.getElementById("buttonDiv"));
}

function addLocalStorageOptions(div){
	var buttonClear = document.createElement("button");
	
	buttonClear.innerHTML = "Clear local storage";
	buttonClear.id = "clear";
	buttonClear.className = "button";
	buttonClear.addEventListener("click",function(){
		clearLocalStorage();
	});
	div.appendChild(buttonClear);
}

function clearLocalStorage(){
	localStorage.clear();
	
	if(localStorage["userLogin"]){
		alert("did not clear. userLogin appears as: " + localStorage["userLogin"]);
	}
	else{
		alert("local storage is cleared");
	}
}