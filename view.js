window.onload = init;
var introDiv = document.getElementById("introDiv");
var move = 800;

function init(){
	//var game = new Game();
	
	setTimeout(introAnimation,25);
	
}

function introAnimation(){
	move -= 100;

	introDiv.style.top = move + "px";
	if(introDiv.style.top != "-400px"){
		setTimeout(introAnimation,25);
	}
	if(introDiv.style.top == "-400px"){
		var game = new Game();
		drawButtons("buttonDiv",game);
		//addLocalStorageClear();
	}
}

//Game setup functions
//Some of these functions are called by event functions or previous setup functions. Calling functions listed in function header
function playerSetup(game,pDiv){
	/*
		This function takes the users name and passes it to the nameSubmit function
		for confirmation from the user
		
		Not called by other functions
		
		Sends user to:
			nameSubmit
	*/
	var div = document.getElementById(pDiv);
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	var fieldName = document.createElement("input");
	var buttonSubmit = document.createElement("button");
	
	title.innerHTML = "Welcome to the Moldy Basement!";
	info.innerHTML = "Your name, mortal?";
	
	fieldName.type = "text";
	fieldName.value = "Player1";
	fieldName.id = "nameField";
	fieldName.className = "field";
	div.appendChild(fieldName);
	
	buttonSubmit.innerHTML = "Submit";
	buttonSubmit.id = "buttonSubmit";
	buttonSubmit.className = "button";
	buttonSubmit.addEventListener("click",function(){
		nameSubmit(game,div,title,info,buttonSubmit,nameField)
	});
	div.appendChild(buttonSubmit);
}

function nameSubmit(game,div,title,info,button,field){
	/*
		This function confirms the users name and assigns it to the player1 object
		
		Called in the following functions:
			playerSetup
			
		Sends user to:
			characterSelect
	*/
	var radioConfirm = document.createElement("input");
	var radioDeny = document.createElement("input");
	var labelConfirm = document.createElement("p");
	var labelDeny = document.createElement("p");
	var buttonSubmit = document.createElement("button");
	var player;
	title.innerHTML = "Foolish mortal, thy name is now mine!";
	info.innerHTML = "That is...erh... " + nameField.value + "...right?";
	
	div.removeChild(button);
	div.removeChild(field);
	
	radioConfirm.type = "radio";
	radioConfirm.id = "radioConfirm";
	radioDeny.type = "radio";
	radioConfirm.name = "radio";
	radioDeny.name = "radio";
	radioDeny.id = "radioDeny";
	
	labelConfirm.innerHTML = "That's right!";
	labelDeny.innerHTML = "Erh...no..not quite";
	
	div.appendChild(labelConfirm);
	labelConfirm.appendChild(radioConfirm);
	div.appendChild(labelDeny);
	labelDeny.appendChild(radioDeny);
	
	buttonSubmit.innerHTML = "Submit";
	buttonSubmit.id = "buttonSubmit";
	buttonSubmit.className = "button";
	buttonSubmit.addEventListener("click",function(){
		if(radioConfirm.checked){
			div.removeChild(labelConfirm);
			div.removeChild(labelDeny);
			div.removeChild(buttonSubmit);
			player = new Player(field.value,1,"PC");
			//console.log(player.getName());
			characterSelect(game,player,div,title,info,button,field);
		}
		else{
			div.removeChild(labelConfirm);
			div.removeChild(labelDeny);
			div.removeChild(buttonSubmit);
			playerSetup(game,"infoDiv");
		}
		
	});
	div.appendChild(buttonSubmit);
}

function characterSelect(game,player,div,title,info,button,field){
	
	/*
		This function takes the user through character selection and adds 
		the selected character to the player objects character list
		
		Called in the following functions:
			nameSubmit
			
		Sends user to:
			gridSelect
	*/
	
	var selectCharacter = document.createElement("select");
	var optionWarrior = document.createElement("option");
	var optionRogue = document.createElement("option");
	var optionRanger = document.createElement("option");
	var optionMage = document.createElement("option");
	var buttonAdd = document.createElement("button");
	var charType;
	
	selectCharacter.id = "select";
	selectCharacter.className = "select";
	selectCharacter.addEventListener("change",function(){
		characterSelectEvent();
	});
	div.appendChild(selectCharacter);
	
	optionWarrior.innerHTML = "Warrior";
	optionWarrior.value = "Warrior";
	optionRogue.innerHTML = "Rogue";
	optionRanger.innerHTML = "Ranger";
	optionMage.innerHTML = "Mage";
	
	selectCharacter.appendChild(optionWarrior);
	selectCharacter.appendChild(optionRogue);
	selectCharacter.appendChild(optionRanger);
	selectCharacter.appendChild(optionMage);
	
	buttonAdd.id = "buttonAdd";
	buttonAdd.className = "button";
	buttonAdd.innerHTML = "Add";
	buttonAdd.addEventListener("click",function(){
		var charType = document.getElementById("select").value;
		buttonAddEvent(player,charType);
		
		if(player.getCharTotal() == 2){
			div.removeChild(buttonAdd);
			
			div.removeChild(selectCharacter);
			if(document.getElementsByClassName("charImage")[0]){
				document.getElementById("tableDiv").removeChild(document.getElementsByClassName("charImage")[0]);
			}
			removeAlerts("infoDiv");
			gridSelect(game,player,div,title,info);
		}
	});
	div.appendChild(buttonAdd);
}

function gridSelect(game,player,div,title,info){
	/*
		This function takes the user through grid selection
		
		Called by the following:
			characterSelect
			
		Goes to makeGame
	*/
	var buttonSelect = document.createElement("button");

	if(document.getElementById("alert")){
		document.getElementById("infoDiv").removeChild(document.getElementById("alert"));
	}
	
	title.innerHTML = "Good, good. Now select your dungeon!";
	info.innerHTML = "Select a 5x5, 8x8 or 10x10 dungeon. The larger the dungeon the greater that danger!";
	
	makeGridRadio(5,div,game);
	makeGridRadio(8,div,game);
	makeGridRadio(10,div,game);
	
	buttonSelect.id = "buttonSelect";
	buttonSelect.className = "button";
	buttonSelect.innerHTML = "Select";
	buttonSelect.addEventListener("click",function(){
	
		if(document.getElementById("radio5").checked){
			makeGame(game,player,5);
		}
		if(document.getElementById("radio8").checked){
			makeGame(game,player,8);
		}
		if(document.getElementById("radio10").checked){
			makeGame(game,player,10);
		}
		
		removeRadioGrid(div);
		div.removeChild(buttonSelect);
	});
	div.appendChild(buttonSelect);
}

function makeGame(game,player,size){
	/*
		This function initializes, draws and starts the selected game
		
		Called by the following:
			gridSelect
			
	*/
	var player2 = setupAiPlayer();
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	var turn = game.getTurn();
	
	game.initializeGame(player,player2,size);
	drawGrid(game,"tableDiv");
	title.innerHTML = "The game begins!";
	info.innerHTML = "it is " + game.getPlayer(game.getTurn()).getName() + "'s turn!\nPlease place your first character by clicking the desired tile.";
}

function setupAiPlayer(){
	/*
		This function creates the AI player and character
		
		Called by the following:
			makeGame
	*/
	
	var player = new Player("Zaphod",2,"MC");
	var character = new Warrior();
	
	character.initChar("W2",1000,3,50,1,2,1,"Taunt","Block",player.getName());
	player.addChar(character);
	
	return player;
}

function loadGame(pP1Name,pP2Name,game){
	/*
		This function reads a JSON file that represents a saved game and loads the saved state
		
		Called by the following:
			drawButtons (as event for load button)
	*/
	var httpRequest = new XMLHttpRequest();
	var response;
	var playerOne;//spelled out to help distinguish between local var and JSON object
	var playerTwo;
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	var turn;
	
	httpRequest.open("GET","saved_game.json",false);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	httpRequest.send();
	
	response = JSON.parse(httpRequest.responseText);
	
	//Get player info
	playerOne = new Player(response[1].player1.name,1,"PC");
	playerTwo = new Player(response[2].player2.name,2,"MC");
	
	//add players characters to players list
	addCharacters(playerOne,response[1].player1.charList[0].char1.charType);
	addCharacters(playerOne,response[1].player1.charList[1].char2.charType);
	addCharacters(playerTwo,response[2].player2.charList[0].char1.charType);
	
	//update added characters with saved states
	loadCharacter(playerOne,0,response[1].player1.charList[0].char1.currentHP,response[1].player1.charList[0].char1.currentAP,response[1].player1.charList[0].char1.isDead,response[1].player1.charList[0].char1.isStunned);	
	loadCharacter(playerOne,1,response[1].player1.charList[1].char2.currentHP,response[1].player1.charList[1].char2.currentAP,response[1].player1.charList[1].char2.isDead,response[1].player1.charList[1].char2.isStunned);
	loadCharacter(playerTwo,0,response[2].player2.charList[0].char1.currentHP,response[2].player2.charList[0].char1.currentAP,response[2].player2.charList[0].char1.isDead,response[2].player2.charList[0].char1.isStunned);
	
	//setup game
	game.initializeGame(playerOne,playerTwo,response[0].game.size);
	turn = game.getTurn();
	//place character pieces
	game.updateGrid(playerOne.getCharacter(0),response[1].player1.charList[0].char1.position);
	game.updateGrid(playerOne.getCharacter(1),response[1].player1.charList[1].char2.position);
	game.updateGrid(playerTwo.getCharacter(0),response[2].player2.charList[0].char1.position);
	
	//adjust game state to saved state
	game.updateGameState(response[0].game.gameState,response[0].game.round,response[0].game.turn);
	
	if(response[1].player1.turn == 1){
		game.updateTurnOrder(playerOne,playerTwo);
	}
	else{
		game.updateTurnOrder(playerTwo,playerOne);
	}
	
	removeButton("buttonPlay","buttonDiv");
	drawGrid(game,"tableDiv");
	
	title.innerHTML = "Welcome back!";
	info.innerHTML = "it is " + game.getPlayer(turn).getName() + "'s turn!\nPlease click a character to use.";
}

function addCharacters(pPlayer,character){
	//Helper function to loadGame function
	var playerChar;
	
	if(character == "Warrior"){
		playerChar = new Warrior();
		playerChar.initChar("W" + pPlayer.getPlayerNumber().toString(),1000,3,50,0,2,1,"Taunt","Block",pPlayer.getName());
	}
	if(character == "Rogue"){
		playerChar = new Rogue();
		playerChar.initChar("R" + pPlayer.getPlayerNumber().toString(),500,5,100,0,3,1,"Leap","Precision Strike",pPlayer.getName());
	}
	if(character == "Ranger"){
		playerChar = new Ranger();
		playerChar.initChar("Ra" + pPlayer.getPlayerNumber().toString(),250,4,150,0,3,3,"Overdraw","Exert",pPlayer.getName());
	}
	if(character == "Mage"){
		playerChar = new Mage();
		playerChar.initChar("M" + pPlayer.getPlayerNumber().toString(),200,3,50,initiative,2,3,"Heal","Paralysis",pPlayer.getName());
	}
	
	pPlayer.addChar(playerChar);
}

function loadCharacter(player,charNum,HP,AP,death,stun){
	//Helper function to loadGame function
	player.getCharacter(charNum).setCurrentHP(HP);
	player.getCharacter(charNum).setCurrentAP(AP);
	player.getCharacter(charNum).setDeath(death);
	player.getCharacter(charNum).setStun(stun);
	player.getCharacter(charNum).setPosition(0,0);
}

//Draw and Remove functions
function drawGrid(game,div){
	var tableDiv = document.getElementById(div);
	var table = document.createElement("table");
	
	//tableDiv.id = "tableDiv";
	//tableDiv.className = "tableDiv";
	table.id = "table";
	table.className = "table";
	
	//document.body.appendChild(tableDiv);
	tableDiv.appendChild(table);
	
	for(var i = 0; i < game.getGridSize(); i++){
		var tr = document.createElement("tr");
		
		tr.id = i.toString();
		table.appendChild(tr);
		for(var j = 0; j < game.getGridSize(); j++){
			var td = document.createElement("td");
			var image = document.createElement("img");
			
			td.id = i.toString() + j.toString();
			image.id = td.id;
			td.className = game.getGridIndex(i,j);
			image.className = td.className;
			td.addEventListener("click",function(){
				gamePlay(this,game,div);
			});
			
			if(image.className == "O"){
				image.src = "Images/Tiles/open.jpg";
			}
			if(image.className == "X"){
				image.src = "Images/Tiles/Obstacle2.jpg";
			}
			if(image.className == "X1"){
				image.src = "Images/Tiles/Obstacle1.jpg";
			}
			if(image.className == "X2"){
				image.src = "Images/Tiles/Obstacle1_1.jpg";
			}
			if(image.className == "X3"){
				image.src = "Images/Tiles/Obstacle2_1.jpg";
			}
			if(image.className.slice(0,1) != "O" && image.className.slice(0,1) != "X"){
				switch(image.className){
					case "W1":
						image.src = "Images/Tiles/p1Warrior.jpg";
						break;
					case "R1":
						image.src = "Images/Tiles/p1Rogue.jpg";
						break;
					case "Ra1":
						image.src = "Images/Tiles/p1Ranger.jpg";
						break;
					case "M1":
						image.src = "Images/Tiles/p1Mage.jpg";
						break;
					case "W2":
						image.src = "Images/Tiles/p2Warrior.jpg";
						break;
					case "R2":
						image.src = "Images/Tiles/p2Rogue.jpg";
						break;
					case "Ra2":
						image.src = "Images/Tiles/p2Ranger.jpg";
						break;
					case "M2":
						image.src = "Images/Tiles/p2Mage.jpg";
						break;
				}
			}
			td.appendChild(image);
			tr.appendChild(td);
		}
	}
}

function removeGrid(){
	if(document.getElementById("table")){
		var tableDiv = document.getElementById("tableDiv");
		var table = document.getElementById("table");
		tableDiv.removeChild(table);
		//document.body.removeChild(document.getElementById("tableDiv"));
	}
}

function drawButtons(div,game){

	var buttonDiv = document.getElementById(div);
	var buttonPlay = document.createElement("button");
	var buttonLoad = document.createElement("button");
	var buttonReset = document.createElement("button");
	

	buttonPlay.innerHTML = "Play";
	buttonPlay.id = "buttonPlay";
	buttonPlay.className = "button";
	buttonPlay.addEventListener("click",function(){
		buttonPlay.style.visibility = "hidden";
		playerSetup(game,"infoDiv");
	});
	buttonDiv.appendChild(buttonPlay);

	buttonLoad.innerHTML = "Load";
	buttonLoad.id = "buttonLoad";
	buttonLoad.className = "button";
	buttonLoad.addEventListener("click",function(){
		loadGame("player1","player2",game);
		buttonDiv.removeChild(document.getElementById("buttonLoad"));
	});
	buttonDiv.appendChild(buttonLoad);
	
	buttonReset.innerHTML = "Reset";
	buttonReset.id = "buttonReset";
	buttonReset.className = "button";
	buttonReset.addEventListener("click",function(){
		buttonPlay.style.visibility = "visible";
		resetGame(game,"tableDiv");
	});
	buttonDiv.appendChild(buttonReset);
}

function drawInfoButtons(yAxis,xAxis,tile,game,player,turn,round,div){
	var buttonConfirm = document.createElement("button");
	var buttonCancel = document.createElement("button");
	var info = document.getElementById("info");
	buttonConfirm.id = "buttonConfirm";
	buttonCancel.id = "buttonCancel";
	buttonConfirm.innerHTML = "confirm";
	buttonCancel.innerHTML = "cancel";
	
	buttonConfirm.addEventListener("click",function(){
		if(round == 1){
			firstRound(tile,game,div,player,turn,round,yAxis,xAxis);
		}
	});
	buttonCancel.addEventListener("click",function(){
		/*
			Bug found 10/14/2016
			
			Bug seems to be happening if a new grid is made. So if I make a 5x5 and then 
			an 8x8 or 10x10 and use the cancel button it breaks...does not if refresh
			...it appears to be screwing with initiative as well.
		*/
		title.innerHTML = "it is turn " + turn + " of round " + round;
		if(document.getElementById("buttonConfirm")){
			document.getElementById("infoDiv").removeChild(buttonConfirm);
		}
		if(document.getElementById("buttonCancel")){
			document.getElementById("infoDiv").removeChild(buttonCancel);
		}
		info.innerHTML = "";
	});
	info.innerHTML = "would you like to place your " + player.getCharacter(player.getInitiative() - 1).getClassName() + " at " + yAxis + " " + xAxis + "?";
	document.getElementById("infoDiv").appendChild(buttonConfirm);
	document.getElementById("infoDiv").appendChild(buttonCancel);
}

function drawCharOptButtons(tile,game,player){
	var buttonAttack;// = document.createElement("button");
	var buttonMove;// = document.createElement("button");
	var buttonSpecialAbility;// = document.createElement("button");
	var buttonEndTurn;
	var info = document.getElementById("info");
	var title = document.getElementById("title");
	var character = player.getCharByToken(tile.className);
	
	/* removeButton("buttonMove","infoDiv");
	removeButton("buttonAttack","infoDiv");
	removeButton("buttonSpecialAbility","infoDiv");
	removeButton("buttonConfirm","infoDiv");
	removeButton("buttonCancel","infoDiv");
	removeButton("buttonEndTurn","buttonDiv"); */
	
	removeAllInfoButtons();
	
	if(character.getStunState() == true){
			info.innerHTML = "This character is paralyzed and cannot move, attack or use abilities";
			
	}
	else{
		drawButton("buttonMove","infoDiv","Move");
		buttonMove = document.getElementById("buttonMove");
		buttonMove.addEventListener("click",function(){
			
			if(character.getCurrentAP() >= 1){
				moveCharacter(tile,game,tile.className,player);
			}
			else{
				info.innerHTML = "Not enough AP";
			}
		});

		drawButton("buttonAttack","infoDiv","Attack");
		buttonAttack = document.getElementById("buttonAttack");
		buttonAttack.addEventListener("click",function(){
			if(character.getCurrentAP() >= 1){
				attackCharacter(tile,game,character,player);
			}
			else{
				info.innerHTML = "Not enough AP";
			}
			
		});

		drawButton("buttonSpecialAbility","infoDiv","Special Ability");
		buttonSpecialAbility = document.getElementById("buttonSpecialAbility");
		buttonSpecialAbility.addEventListener("click",function(){
			if(character.getCurrentAP() >= 1){
				specialAbility(tile,game,character,player);
			}
			else{
				info.innerHTML = "Not enough AP";
			}
		});

		title.innerHTML = character.getClassName();
		info.innerHTML = "HP: " + character.getCurrentHP() + "/" + character.getHP() + "<br>" + "AP: " + character.getCurrentAP() + "/" + character.getAP();
		//make function to handle character stat display instead of ^ ... have it display all char stats
		
		
	}	
	drawButton("buttonEndTurn","buttonDiv","End Turn");
	buttonEndTurn = document.getElementById("buttonEndTurn");
	buttonEndTurn.addEventListener("click",function(){
		info.innerHTML = "Ending turn";
		removeAllInfoButtons();
		character.setStun(false);
		setTimeout(function(){
			endTurn(game,player);
			title.innerText = game.turnOrder[game.getTurn() - 1].getName() + "'s turn! \nPlease select a character";
			info.innerHTML = "";
			
		},1500);
	});
	
}

function makeGridRadio(size,div,game){
	var label = document.createElement("p");
	var radio = document.createElement("input");
	
	label.id = "label" + size;
	label.className = "label";
	label.innerHTML = size + "x" + size;
	div.appendChild(label);
	
	radio.type = "radio";
	radio.name = "radio";
	radio.id = "radio" + size;
	label.appendChild(radio);
}

function removeRadioGrid(div){
	if(document.getElementById("label5")){
		div.removeChild(document.getElementById("label5"));
	}
	if(document.getElementById("label8")){
		div.removeChild(document.getElementById("label8"));
	}
	if(document.getElementById("label10")){
		div.removeChild(document.getElementById("label10"));
	}
}

function removeAlerts(div){
	var div = document.getElementById(div);

	if(document.getElementById("alertWarrior")){
		div.removeChild(document.getElementById("alertWarrior"));
	}
	if(document.getElementById("alertRogue")){
		div.removeChild(document.getElementById("alertRogue"));
	}
	if(document.getElementById("alertRanger")){
		div.removeChild(document.getElementById("alertRanger"));
	}
	if(document.getElementById("alertMage")){
		div.removeChild(document.getElementById("alertMage"));
	}
}

function removeButton(button,div){
	if(document.getElementById(button)){
		document.getElementById(div).removeChild(document.getElementById(button));
	}
}

function removeAllInfoButtons(){
	removeButton("buttonMove","infoDiv");
	removeButton("buttonAttack","infoDiv");
	removeButton("buttonSpecialAbility","infoDiv");
	removeButton("buttonConfirm","infoDiv");
	removeButton("buttonCancel","infoDiv");
	removeButton("buttonEndTurn","buttonDiv");
	removeButton("buttonBlock","infoDiv");
	removeButton("buttonTaunt","infoDiv");
	removeButton("buttonPrecisionStrike","infoDiv");
	removeButton("buttonLeap","infoDiv");
	removeButton("buttonOverdraw","infoDiv");
	removeButton("buttonExert","infoDiv");
	removeButton("buttonParalyze","infoDiv");
	removeButton("buttonHeal","infoDiv");
}

function removeForReset(){
	var infoDiv = document.getElementById("infoDiv");
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	
	while(infoDiv.hasChildNodes()){
		if(infoDiv.lastChild.id != "title" && infoDiv.lastChild.id != "info"){
			infoDiv.removeChild(infoDiv.lastChild);
		}
		else{
			break;
		}
	}
	
	removeAllInfoButtons();
	title.innerHTML = "";
	info.innerHTML = "";
}

function drawButton(button,div,label){
	var newButton = document.createElement("button");
	var parentDiv = document.getElementById(div);
	
	newButton.id = button;
	newButton.className = "button";
	newButton.innerHTML = label;
	parentDiv.appendChild(newButton);
}

//Game play functions
function gamePlay(tile,game,div){
	//console.log(game.getGridIndex(0,0));
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	var yAxis = tile.parentNode.rowIndex//parseInt(tile.id.slice(0,1));
	var xAxis = tile.cellIndex//parseInt(tile.id.slice(1,2));
	var turn = game.getTurn();
	var round = game.getRound();
	var player = game.getPlayer(turn);
	var initiative;
	
	if(round == 1){
		
		if(turn == 1){
			if(tile.className == "O"){
				player = game.turnOrder[turn - 1];
				drawInfoButtons(yAxis,xAxis,tile,game,player,turn,round,div);
			}//end if ! obstacle
		}
		if(turn == 2){
			if(tile.className == "O"){
				player = game.turnOrder[turn - 1];
				drawInfoButtons(yAxis,xAxis,tile,game,player,turn,round,div);
			}
		}
	}//end if round 1
	
	if(round > 1){
		
		if(turn == 1){
			if(tile.className != "X" && tile.className != "O"){//is not obstacle or empty tile
				player = game.turnOrder[0];
				var character = player.getCharByToken(tile.className);
				if(character && character.getOwner() == player.getName()){//character !undefined and player owns character
					playerTurn(game,player,tile);
				}
				checkDeathState(tile,game,player,character);
			}
		}
		if(turn == 2){
			if(tile.className != "X" && tile.className != "O"){//is not obstacle or empty tile
				player = game.turnOrder[1];
				var character = player.getCharByToken(tile.className);
				if(character && character.getOwner() == player.getName()){//character !undefined and player owns character
					playerTurn(game,player,tile);
				}
				checkDeathState(tile,game,player,character);
			}
		}
	}//end if round > 1
	
	
	
}

function checkDeathState(tile,game,player,character){
	var info = document.getElementById("info");
	
	if(character && character.getDeathState() == true){
		game.removeCharacter(tile.id);
		removeGrid();
		drawGrid(game,"tableDiv");
		info.innerHTML = character.getClassName() + " has died";
		if(player.hasLivingCharacters() != true){
			setTimeout(function(){
				info.innerHTML = player.getName() + " loses the game!";
				setTimeout(endGame(),2000);
			},1500);
		}
	}
	
}

function playerTurn(game,player,tile){
	drawCharOptButtons(tile,game,player);
	removeGrid();//<-- remove grid and all associated event listeners
	drawGrid(game,"tableDiv");//<-- redraw grid with default event listeners
}

function endTurn(game,player){
	var turn = game.getTurn();
	var round = game.getRound();
	var numberOfCharacters = player.getCharTotal();
	
	if(turn == 1){
		turn++;
	}
	else{
		turn = 1;
		round++;
	}
	
	for(var i = 0; i < numberOfCharacters; i++){
		player.getCharacter(i).setCurrentAP(player.getCharacter(i).getAP());//reset AP to character AP total for each char in list
	}
	
	game.updateGameState(false,round,turn);
}

function firstRound(tile,game,div,player,turn,round,yAxis,xAxis){
	var title = document.getElementById("title");
	var info = document.getElementById("info");
	
	initiative = player.getInitiative();
	//console.log(initiative);
	title.innerText = game.turnOrder[turn - 1].getName() + "'s turn! \nPlease place your characters";
	game.placeToken(player.getCharacter(initiative - 1), yAxis, xAxis);
	game.turnOrder[turn - 1].updateInitiative();
	removeGrid();
	drawGrid(game,div);
	if(document.getElementById("buttonConfirm")){
		document.getElementById("infoDiv").removeChild(buttonConfirm);
	}
	if(document.getElementById("buttonCancel")){
		document.getElementById("infoDiv").removeChild(buttonCancel);
	}
	if(game.turnOrder[turn - 1].getInitiative() == 0){
		if(turn >= 2){
			turn = 1;//go back to first players turn
			round += 1;//go to next round
			title.innerHTML = "The game is afoot!";
			info.innerHTML = "Click one of your characters to see options.";
		}
		else{
			turn += 1;//go to second players turn
			title.innerText = game.turnOrder[turn - 1].getName() + "'s turn! \nPlease place a character";
		}
		game.updateGameState(false,round,turn);
		
	}
}

function moveCharacter(tile,game,character,player){
	var info = document.getElementById("info");
	var title = document.getElementById("title");
	var buttonConfirm;
	var buttonCancel = document.createElement("button");
	var destinationTile = 0;
	
	removeButton("buttonMove","infoDiv");
	removeButton("buttonAttack","infoDiv");
	removeButton("buttonSpecialAbility","infoDiv");
	removeButton("buttonConfirm","infoDiv");
	removeButton("buttonCancel","infoDiv");
	
	drawButton("buttonConfirm","infoDiv","Confirm");
	buttonConfirm = document.getElementById("buttonConfirm");
	buttonConfirm.addEventListener("click",function(){
		var yShift;// = 
		var xShift;// = 
		
		if(destinationTile == 0){
			info.innerHTML = "Please select a location";
		}
		else{
			yShift = destinationTile.parentNode.rowIndex - player.getCharByToken(character).getPosition().slice(0,1);
			xShift = destinationTile.cellIndex - player.getCharByToken(character).getPosition().slice(1,2);
		}
		
		if(Math.abs(xShift) + Math.abs(yShift) > player.getCharByToken(character).getCurrentAP()){
			info.innerHTML = "Not enough AP";
		}
		else{
			var AP = player.getCharByToken(character).getCurrentAP();
			var totalShift = Math.abs(xShift) + Math.abs(yShift);
			var newPosition = destinationTile.parentNode.rowIndex.toString() + destinationTile.cellIndex.toString();
			player.getCharByToken(character).setCurrentAP(AP - totalShift);
			game.updateGrid(player.getCharByToken(character),newPosition);
			removeGrid();
			drawGrid(game,"tableDiv");
			document.getElementById("infoDiv").removeChild(document.getElementById("buttonConfirm"));
			document.getElementById("infoDiv").removeChild(document.getElementById("buttonCancel"));
		}
	});
	
	drawButton("buttonCancel","infoDiv","Cancel");
	buttonCancel = document.getElementById("buttonCancel");
	buttonCancel.addEventListener("click",function(){
		removeButton("buttonConfirm","infoDiv");
		removeButton("buttonCancel","infoDiv");
		info.innerHTML = "";
		removeGrid();//<-- remove grid and all associated event listeners
		drawGrid(game,"tableDiv");//<-- redraw grid with default event listeners
		drawCharOptButtons(tile,game,player);
	});
	
	
	title.innerHTML = "Please select a tile to move to";
	info.innerHTML = "";
	
	for(var i = 0; i < game.getGridSize(); i++){
		for(var j = 0; j < game.getGridSize(); j++){
			var id = i.toString() + j.toString();
			var td = document.getElementById(id);
			var clickedCharacter = this.className;
			td.addEventListener("click",function(){
				if(this.className == "O"){
					info.innerHTML = "Move to " + this.parentNode.rowIndex + this.cellIndex + "?";
					destinationTile = this;
				}
				//need condition to handle clicking on another owned char
				if(clickedCharacter && player.getCharByToken(clickedCharacter).getOwner() == player.getName()){//<-- does not work with ranger (Ra1 will return a not 1)
					removeGrid();
					drawGrid(game,"tableDiv");
					drawCharOptButtons(tile,game,player);
				}
			});
		}
	}
	
}

function attackCharacter(tile,game,character,player){
	var buttonConfirm;
	var buttonCancel;
	var info = document.getElementById("info");
	var title = document.getElementById("title");
	var defendingCharacter;
	var currentAP = player.getCharByToken(character.token).getCurrentAP();
	//var attackingCharacter = player.getCharByToken(character);
	
	removeButton("buttonMove","infoDiv");
	removeButton("buttonAttack","infoDiv");
	removeButton("buttonSpecialAbility","infoDiv");
	
	title.innerHTML = "Select an enemy to attack";
	info.innerHTML = "";
	
	drawButton("buttonConfirm","infoDiv","Confirm");
	drawButton("buttonCancel","infoDiv","Cancel");
	
	buttonConfirm = document.getElementById("buttonConfirm");
	buttonCancel = document.getElementById("buttonCancel");
	
	buttonConfirm.addEventListener("click",function(){
		var damageDone;
		var attackerRange = character.getAtkRng();
		var yDifference = Math.abs(defendingCharacter.getPosition().slice(0,1) - character.getPosition().slice(0,1));
		var xDifference = Math.abs(defendingCharacter.getPosition().slice(1,2) - character.getPosition().slice(1,2));
		
		if(character.isTauntedByEnemy() && character.getTauntingCharacter() != defendingCharacter){
			info.innerHTML = "This character is being taunted by enemy " + character.getTauntingCharacter().getClassName() + " and must attack that character."
		}
		else{
			if(yDifference <= attackerRange && xDifference <= attackerRange){
				damageDone = game.combat(character,defendingCharacter);
				info.innerHTML = "Total damage done to enemy: " + damageDone;
				character.setCurrentAP(currentAP - 1);
				removeButton("buttonConfirm","infoDiv");
				removeButton("buttonCancel","infoDiv");
				setTimeout(function(){drawCharOptButtons(tile,game,player)},2000);
				character.setTaunt(false,"");
				if(character.getClassName() == "Warrior"){
					character.setTauntState(false);
				}
			}
			else{
				info.innerHTML = "Target is too far!";
			}
		}
		
		
		
	});
	buttonCancel.addEventListener("click",function(){
		removeButton("buttonConfirm","infoDiv");
		removeButton("buttonCancel","infoDiv");
		info.innerHTML = "";
		removeGrid();//<-- remove grid and all associated event listeners
		drawGrid(game,"tableDiv");//<-- redraw grid with default event listeners
		drawCharOptButtons(tile,game,player);
	});
	for(var i = 0; i < game.getGridSize(); i++){
		for(var j = 0; j < game.getGridSize(); j++){
			var id = i.toString() + j.toString();
			var td = document.getElementById(id);
			
			td.addEventListener("click",function(){
				var clickedCharacter;
				var playerTwo;
				if(player.getPlayerNumber() == 1){
					playerTwo = game.getPlayer(2);
					clickedCharacter = playerTwo.getCharByToken(this.className);
				}
				else{
					playerTwo = game.getPlayer(1);
					clickedCharacter = playerTwo.getCharByToken(this.className);
				}
				if(this.className != "O" && this.className != "X" && clickedCharacter && clickedCharacter.getOwner() != player.getName()){
					info.innerHTML = "Attack " + this.parentNode.rowIndex + this.cellIndex + "?";
					defendingCharacter = playerTwo.getCharByToken(this.className);//game.getPlayer(this.className.slice(1,2) - 1).getCharByToken(this.className);
				}
				if(this.className.slice(1,2) == player.getPlayerNumber()){//if other owned character
					removeGrid();
					drawGrid(game,"tableDiv");
					drawCharOptButtons(tile,game,player);
				}
			});
		}
	}
}

function specialAbility(tile,game,character,player){
		var title = document.getElementById("title");
		var info = document.getElementById("info");
		var clickedCharacter;
		var buttonCancel;
		
		removeButton("buttonMove","infoDiv");
		removeButton("buttonAttack","infoDiv");
		removeButton("buttonSpecialAbility","infoDiv");
		
		if(character.getClassName() == "Warrior"){
			var buttonBlock;
			var buttonTaunt;
			var blockCost = 2;
			var tauntCost = 2;
			title.innerHTML = "Warrior Abilities:";
			drawButton("buttonBlock","infoDiv","Block");
			drawButton("buttonTaunt","infoDiv","Taunt");
			
			buttonBlock = document.getElementById("buttonBlock");
			buttonBlock.addEventListener("click",function(){
				if(character.getCurrentAP() >= blockCost){
					character.setBlockState(true);
					character.setCurrentAP(character.getCurrentAP() - blockCost);
				}
				else{
					info.innerHTML = "Not enough AP";
				}
				setTimeout(removeAllInfoButtons(),1500);//should set time delay so user can see result
			});
			
			buttonTaunt = document.getElementById("buttonTaunt");
			buttonTaunt.addEventListener("click",function(){
				if(character.getCurrentAP() >= tauntCost){
					info.innerHTML = "Select enemy to taunt";
					removeAllInfoButtons();
					for(var i = 0; i < game.getGridSize(); i++){
						for(var j = 0; j < game.getGridSize(); j++){
							var id = i.toString() + j.toString();
							var td = document.getElementById(id);
							
							td.addEventListener("click",function(){
								var clickedCharacter;
								var playerTwo;
								if(player.getPlayerNumber() == 1){
									playerTwo = game.getPlayer(2);
									clickedCharacter = playerTwo.getCharByToken(this.className);
								}
								else{
									playerTwo = game.getPlayer(1);
									clickedCharacter = playerTwo.getCharByToken(this.className);
								}
								if(this.className != "O" && this.className != "X" && clickedCharacter && clickedCharacter.getOwner() != player.getName()){
									info.innerHTML = "Taunt " + this.parentNode.rowIndex + this.cellIndex + "?";
									clickedCharacter = playerTwo.getCharByToken(this.className);
									specialAbilityTaunt(this,game,player,character);
								}
								if(this.className.slice(1,2) == player.getPlayerNumber()){//if other owned character
									removeGrid();
									drawGrid(game,"tableDiv");
									drawCharOptButtons(tile,game,player);
								}
							});
						}
					}	
				}	
			});
		}
		
		if(character.getClassName() == "Rogue"){
			var buttonPrecisionStrike;
			var buttonLeap;
			var precisionStrikeCost = 3;
			var leapCost = 3;
			
			title.innerHTML = "Rogue Abilities:";
			drawButton("buttonPrecisionStrike","infoDiv","Precision Strike");
			drawButton("buttonLeap","infoDiv","leap");
			
			buttonPrecisionStrike = document.getElementById("buttonPrecisionStrike");
			buttonPrecisionStrike.addEventListener("click",function(){
				if(character.getCurrentAP() >= precisionStrikeCost){
					character.setPrecisionStrike(true);
					character.setCurrentAP(character.getCurrentAP() - precisionStrikeCost);
				}
				else{
					info.innerHTML = "Not enough AP";
				}
				setTimeout(removeAllInfoButtons(),1500);
			});
		}
		if(character.getClassName() == "Ranger"){
			var buttonOverdraw;
			var buttonExert;
			var overdrawCost = 4;
			var exertCost = 1;
			
			title.innerHTML = "Ranger Abilities:";
			drawButton("buttonOverdraw","infoDiv","Overdraw");
			drawButton("buttonExert","infoDiv","Exert");
			
			buttonOverdraw = document.getElementById("buttonOverdraw");
			buttonOverdraw.addEventListener("click",function(){
				if(character.getCurrentAP() >= overdrawCost){
					character.setOverdraw(true);
					character.setCurrentAP(character.getCurrentAP() - overdrawCost);
				}
				else{
					info.innerHTML = "Not enough AP";
				}
				removeAllInfoButtons();
			});
			
			buttonExert = document.getElementById("buttonExert");
			buttonExert.addEventListener("click",function(){
				if(character.currentAP >= exertCost){
					character.setExert(true);
					character.setCurrentAP(character.getCurrentAP() - exertCost);
				}
				else{
					info.innerHTML = "Not enough AP";
				}
				setTimeout(removeAllInfoButtons(),1500);
			});
		}
		if(character.getClassName() == "Mage"){
			var buttonParalyze;
			var buttonHeal;
			var paralyzeCost = 2;
			var healCost = 2;
			title.innerHTML = "Mage Abilities:";
			drawButton("buttonParalyze","infoDiv","Paralyze");
			drawButton("buttonHeal","infoDiv","Heal");
			
			buttonParalyze = document.getElementById("buttonParalyze");
			buttonParalyze.addEventListener("click",function(){
				var attackerRange = character.getAtkRng();
				
				if(character.getCurrentAP() >= paralyzeCost){
					info.innerHTML = "Select enemy to paralyze";
					removeAllInfoButtons();
					for(var i = 0; i < game.getGridSize(); i++){
						for(var j = 0; j < game.getGridSize(); j++){
							var id = i.toString() + j.toString();
							var td = document.getElementById(id);
							var yDifference;// = Math.abs(clickedCharacter.getPosition().slice(0,1) - character.getPosition().slice(0,1));
							var xDifference;//= Math.abs(clickedCharacter.getPosition().slice(1,2) - character.getPosition().slice(1,2));
							var castDistance;// = yDifference + xDifferenc;
							td.addEventListener("click",function(){
								var clickedCharacter;
								var playerTwo;
								if(player.getPlayerNumber() == 1){
									playerTwo = game.getPlayer(2);
									clickedCharacter = playerTwo.getCharByToken(this.className);
								}
								else{
									playerTwo = game.getPlayer(1);
									clickedCharacter = playerTwo.getCharByToken(this.className);
								}
								yDifference = Math.abs(clickedCharacter.getPosition().slice(0,1) - character.getPosition().slice(0,1));
								xDifference = Math.abs(clickedCharacter.getPosition().slice(1,2) - character.getPosition().slice(1,2));
								castDistance = yDifference + xDifference;
								if(this.className != "O" && this.className != "X" && clickedCharacter && clickedCharacter.getOwner() != player.getName() && castDistance <= attackerRange){
									info.innerHTML = "Paralyze " + this.parentNode.rowIndex + this.cellIndex + "?";
									clickedCharacter = playerTwo.getCharByToken(this.className);
									specialAbilityParalyze(this,game,player,character);
								}
								else{
									info.innerHTML = "Character is out of range!";
									setTimeout(function(){
										removeGrid();
										drawGrid(game,"tableDiv");
										drawCharOptButtons(tile,game,player);}
									,1500);
									
								}
								if(this.className.slice(1,2) == player.getPlayerNumber()){//if other owned character
									removeGrid();
									drawGrid(game,"tableDiv");
									drawCharOptButtons(tile,game,player);
								}
							});
						}
					}	
				}
				else{
					info.innerHTML = "Not enough AP";
					removeAllInfoButtons();
					drawCharOptButtons(tile,game,player);
				}
			});
			
			buttonHeal = document.getElementById("buttonHeal");
			buttonHeal.addEventListener("click",function(){
				if(character.getCurrentAP() >= healCost){
					info.innerHTML = "Select friend to heal";
					removeAllInfoButtons();
					for(var i = 0; i < game.getGridSize(); i++){
						for(var j = 0; j < game.getGridSize(); j++){
							var id = i.toString() + j.toString();
							var td = document.getElementById(id);
							
							td.addEventListener("click",function(){
								var clickedCharacter = player.getCharByToken(this.className);
								if(this.className != "O" && this.className != "X" && clickedCharacter && clickedCharacter.getOwner() == player.getName()){
									info.innerHTML = "Heal " + this.parentNode.rowIndex + this.cellIndex + "?";
									//clickedCharacter = playerTwo.getCharByToken(this.className);
									specialAbilityHeal(this,game,player,character);
								}
								/* if(this.className.slice(1,2) == player.getPlayerNumber()){//if other owned character
									removeGrid();
									drawGrid(game,"tableDiv");
									drawCharOptButtons(tile,game,player);
								} */
							});
						}
					}	
				}
			});
		}
		
		drawButton("buttonCancel","infoDiv","Cancel");
		buttonCancel = document.getElementById("buttonCancel");
		buttonCancel.addEventListener("click",function(){
			removeAllInfoButtons();
			info.innerHTML = "";
			removeGrid();//<-- remove grid and all associated event listeners
			drawGrid(game,"tableDiv");//<-- redraw grid with default event listeners
			drawCharOptButtons(tile,game,player);
		});
	
}

function specialAbilityTaunt(tile,game,player,character){
	var enemyPlayer;
	var tauntTarget;// = enemyPlayer.getCharByToken(tile);
	var info = document.getElementById("info");
	var buttonConfirm;
	var buttonCancel;
	
	if(player.getPlayerNumber() == 1){
		enemyPlayer = game.getPlayer(2);
	}
	else{
		enemyPlayer = game.getPlayer(1);
	}
	
	tauntTarget = enemyPlayer.getCharByToken(tile.className);
	
	if(tauntTarget.getOwner() != player){
		
		info.innerHTML = "Taunt?";
		drawButton("buttonConfirm","infoDiv","Confirm");
		drawButton("buttonCancel","infoDiv","Cancel");
		
		buttonConfirm = document.getElementById("buttonConfirm");
		buttonCancel = document.getElementById("buttonCancel");
		
		buttonConfirm.addEventListener("click",function(){
			character.setTauntState(true);
			character.setCurrentAP(character.getCurrentAP() - 2);
			tauntTarget.setTaunt(true,character);
			info.innerHTML = character.getClassName() + " is taunting enemy " + tauntTarget.getClassName();
			setTimeout(function(){removeAllInfoButtons()},1500);
		});
		
		buttonCancel.addEventListener("click",function(){
			removeAllInfoButtons();
		});
	}
	else{
		info.innerHTML = "Cannot taunt your own characters";
	}
}

function specialAbilityParalyze(tile,game,player,character){
	var enemyPlayer;
	var paralyzeTarget;
	var info = document.getElementById("info");
	var buttonConfirm;
	var buttonCancel;
	var paralyzeCost = 2;
	
	
	if(player.getPlayerNumber() == 1){
		enemyPlayer = game.getPlayer(2);
	}
	else{
		enemyPlayer = game.getPlayer(1);
	}
	
	paralyzeTarget = enemyPlayer.getCharByToken(tile.className);
	
	if(paralyzeTarget.getOwner() != player){
		
		info.innerHTML = "Paralyze?";
		drawButton("buttonConfirm","infoDiv","Confirm");
		drawButton("buttonCancel","infoDiv","Cancel");
		
		buttonConfirm = document.getElementById("buttonConfirm");
		buttonCancel = document.getElementById("buttonCancel");
		
		buttonConfirm.addEventListener("click",function(){
			if(character.paralyze()){
				paralyzeTarget.setStun(true);
				info.innerHTML = paralyzeTarget.getClassName() + " is stunned";
			}
			else{
				info.innerHTML = "Paralyze failed";
			}
			character.setCurrentAP(character.getCurrentAP() - paralyzeCost);
			setTimeout(function(){removeAllInfoButtons()},1500);
		});
		
		buttonCancel.addEventListener("click",function(){
			removeAllInfoButtons();
		});
	}
	else{
		info.innerHTML = "Cannot stun your own characters";
	}
}

function specialAbilityHeal(tile,game,player,character){
	var healTarget;
	var info = document.getElementById("info");
	var buttonConfirm;
	var buttonCancel;
	var healCost = 2;
	
	removeAllInfoButtons();
	drawButton("buttonConfirm","infoDiv","Confirm");
	drawButton("buttonCancel","infoDiv","Cancel");
	
	buttonConfirm = document.getElementById("buttonConfirm");
	buttonCancel = document.getElementById("buttonCancel");
	
	buttonConfirm.addEventListener("click",function(){
		if(player.getCharByToken(tile.className)){
			var healedAmount;
			healTarget = player.getCharByToken(tile.className);
			
			healedAmount = character.heal(healTarget);
			if(healTarget.getCurrentHP() + healedAmount >= healTarget.getHP()){
				healTarget.setCurrentHP(healTarget.getHP());
			}
			else{				
				healTarget.setCurrentHP(healedAmount + healTarget.getCurrentHP());
			}
			
			character.setCurrentAP(character.getCurrentAP() - healCost);
			
			info.innerHTML = "The character was healed: " + healedAmount;
			removeAllInfoButtons();
			setTimeout(function(){
				drawCharOptButtons(tile,game,player);
			},1500)
		}
	});
	
	buttonCancel.addEventListener("click",function(){
		removeAllInfoButtons();
	});
}

function clearStatusAilments(character){
	character.setStun(false);
	character.setTaunt(false,"");
}

function resetGame(game,div){
	game.reset();
	//game = new Game();
	var tableDiv = document.getElementById(div);
	var infoDiv = document.getElementById("infoDiv");
	
	if(document.getElementById("table")){
		tableDiv.removeChild(document.getElementById("table"));
	}
	
	removeForReset();
}

function endGame(){
	var info = document.getElementById("info");
	var title = document.getElementById("title");
	
	removeGrid();
	removeAllInfoButtons();
	title.innerHTML = "Thank you for playing!";
	info.innerHTML = "I hope you enjoyed the game!";
	
}

//Event functions
function buttonEvent(div,game,player1,player2,size){
		removeGrid();
		game.initializeGame(player1,player2,size);
		drawGrid(game,"tableDiv");
}

function radioCharacterEvent(charType){
	var image = document.createElement("img");
	var tableDiv = document.getElementById("tableDiv");
	
	image.className = "charImage";
	
	if(document.getElementById("imgWarrior")){
		tableDiv.removeChild(document.getElementById("imgWarrior"));
	}
	if(document.getElementById("imgRogue")){
		tableDiv.removeChild(document.getElementById("imgRogue"));
	}
	if(document.getElementById("imgRanger")){
		tableDiv.removeChild(document.getElementById("imgRanger"));
	}
	if(document.getElementById("imgMage")){
		tableDiv.removeChild(document.getElementById("imgMage"));
	}
	
	
	if(charType == "Warrior"){
		image.src = "Images/Temp/tempCharImg.jpg";
		image.id = "imgWarrior";
		tableDiv.appendChild(image);
	}
	if(charType == "Rogue"){
		image.src = "Images/Temp/tempCharImg.jpg";
		image.id = "imgRogue";
		tableDiv.appendChild(image);
	}
	if(charType == "Ranger"){
		image.src = "Images/Temp/tempCharImg.jpg";
		image.id = "imgRanger";
		tableDiv.appendChild(image);
	}
	if(charType == "Mage"){
		image.src = "Images/Temp/tempCharImg.jpg";
		image.id = "imgMage";
		tableDiv.appendChild(image);
	}
}

function characterSelectEvent(){
	var select = document.getElementById("select");
	
	if(select.value == "Warrior"){
		charType = "Warrior";
		info.innerHTML = "The warrior class is the tank. He doesn't do a lot of damage, but he can take it. When you need someone to get in the enemies face or draw their attention, he's the man for the job."
		radioCharacterEvent(charType);			
	}
	if(select.value == "Rogue"){
		charType = "Rogue";
		info.innerHTML = "The Rogue is sneaky and capable of getting into areas others can't. She can't take a hit like the warrior, nevertheless she is a skilled fighter with a precise strike capable of doing serious damage. Use her to get at enemies behind obstacles or to back up the warrior."
		radioCharacterEvent(charType);
	}
	if(select.value == "Ranger"){
		charType = "Ranger";
		info.innerHTML = "The ranger is probably the most mobile unit at your disposle. He is fast and has a good range for attack. Unlike the warrior or the rogue, the ranger cannot take damage, but is capable of dealing it."
		radioCharacterEvent(charType);
	}
	if(select.value == "Mage"){
		charType = "Mage";
		info.innerHTML = "The mage is physically weak but more than makes up for that with her magical ability. Useful as a healer or for controlling the flow of combat, the mage will prove valuable in all scenarios. Just keep her out of combat or you'll lose her."
		radioCharacterEvent(charType);
	}
	
}

function buttonAddEvent(player,charType){
	var character;
	var initiative;
	var alert = document.createElement("p");
	var infoDiv = document.getElementById("infoDiv");
	
	alert.id = "alert";
	if(player.getCharTotal() > 0){//if second character initiative is 2, else 1
		initiative = 2;
	}
	else{
		initiative = 1;
	}
	
	if(charType == "Warrior"){
		if(initiative == 2 && player.getCharacter(0).getClassName() == "Warrior"){//if warrior already in char list, warn to select different class
			alert.innerHTML = "Warrior has already been added. Please select another type";
		}
		else{
			character = new Warrior();
			character.initChar("W1",1000,3,50,initiative,2,1,"Taunt","Block",player.getName());
			player.addChar(character);
			alert.innerHTML = "Warrior added!";
			//alert.id = "alertWarrior";
			
		}
	}
	if(charType == "Rogue"){
		if(initiative == 2 && player.getCharacter(0).getClassName() == "Rogue"){
			alert.innerHTML = "Rogue has already been added. Please select another type";
		}
		else{
			character = new Rogue();
			character.initChar("R1",500,5,100,initiative,3,1,"Leap","Precision Strike",player.getName());
			player.addChar(character);
			alert.innerHTML = "Rogue added!";
			//alert.id = "alertRogue";
		}
		
	}
	if(charType == "Ranger"){
		if(initiative == 2 && player.getCharacter(0).getClassName() == "Ranger"){
			alert.innerHTML = "Ranger has already been added. Please select another type";
		}
		else{
			character = new Ranger();
			character.initChar("Ra1",250,4,150,initiative,3,3,"Overdraw","Exert",player.getName());
			player.addChar(character);
			alert.innerHTML = "Ranger added";
			//alert.id = "alertRanger";
		}
		
	}
	if(charType == "Mage"){
		if(initiative == 2 && player.getCharacter(0).getClassName() == "Mage"){
			alert.innerHTML = "Mage has already been added. Please select another type";
		}
		else{
			character = new Mage();
			character.initChar("M1",200,3,50,initiative,2,3,"Heal","Paralysis",player.getName());
			player.addChar(character);
			alert.innerHTML = "Mage added!";
			//alert.id = "alertMage";
		}
		
	}
	
	if(document.getElementById("alert")){
		infoDiv.removeChild(document.getElementById("alert"));
	}
	infoDiv.appendChild(alert);
}

