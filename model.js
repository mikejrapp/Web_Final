

function Game(){
//This 
	this.isGameOver;
	this.round; //increments each round
	this.turn; //keeps track of player turn. Toggles between 1 and 2 instead of incrementing
	//this.initiative; //keeps track of character turn
	this.turnOrder = new Array();
	//this.mobChars = new Array();
	//this.playerChars = new Array();
	this.players = new Array();
	this.grid = new Array();
	this.gridSize;
	
	this.initializeGame = function(player1,player2,size){
	//this function is used to set up the game for the first time.
		if(this.grid.length > 0){
			this.grid = new Array();
		}
	
		this.isGameOver = false;
		this.round = 1;
		this.turn = 1;
		//this.initiative = this.players[0].characters.length; //since player 1 will have biggest character list always use that to initialize the game.
		this.setTurnOrder(player1,player2);
		
		
		//temp setup to debug
		//this.turnOrder.push(player2);
		//this.turnOrder.push(player1);
		
		this.setGrid(size);
		this.gridSize = size;
		this.players.push(player1);
		this.players.push(player2);
		
		// for(var i = 0; i < player2.characters.length; i++){
			// this.mobChars.push(player2.getCharacter(i));
		// }
	}
	
	this.reset = function(size){
		//this function returns the game to the first turn without but keeps the turn order.
		if(this.grid.length > 0){
			this.grid = new Array();
		}
		this.isGameOver = false;
		this.round = 1;
		this.turn = 1;
		this.setGrid(size);
		this.gridSize =size;
	}
	
	this.setGrid = function(size){
	//this function generates the game grid based on size
		for(var i = 0; i < size; i++){
			this.grid.push([]);
			for(var j = 0; j < size; j++){
				this.grid[i].push(this.setObstacles(size,i,j));
			}
		}
	}
	
	this.setObstacles = function(size,i,j){
	//this function is used to assign the static obstacles for the grid based on size
		var combinedIndex = i.toString() + j.toString();
		if(size == 5){
			switch(combinedIndex){
				case "11":
					return "X1";
					break;
				case "12":
					return "X";
					break;
				case "21":
					return "X2";
					break;
				case "24":
					return "X";
					break;
				case "34":
					return "X3";
					break;
				default:
					return "O";
			}
		}//end if 5
		
		if(size == 8){
			switch(combinedIndex){
				case "12":
					return "X1";
					break;
				case "13":
					return "X";
					break;
				case "22":
					return "X3";
					break;
				case "34":
					return "X";
					break;
				case "35":
					return "X1";
					break;
				case "36":
					return "X2";
					break;
				case "43":
					return "X";
					break;
				case "44":
					return "X3";
					break;
				case "61":
					return "X2";
					break;
				case "62":
					return "X";
					break;
				default:
					return "O";
			}
		}//end if 8
		
		if(size == 10){
			switch(combinedIndex){
				case "17":
					return "X1";
					break;
				case "18":
					return "X";
					break;
				case "22":
					return "X3";
					break;
				case "26":
					return "X2";
					break;
				case "27":
					return "X";
					break;
				case "32":
					return "X2";
					break;
				case "33":
					return "X";
					break;
				case "37":
					return "X1";
					break;
				case "41":
					return "X";
					break;
				case "42":
					return "X2";
					break;
				case "58":
					return "X1";
					break;
				case "59":
					return "X";
					break;
				case "64":
					return "X3";
					break;
				case "65":
					return "X2";
					break;
				case "73":
					return "X";
					break;
				case "74":
					return "X";
					break;
				case "82":
					return "X1";
					break;
				default:
					return "O";
			}
		}
	}
	
	this.getGridSize = function(){
	//this function returns the size of the grid
		return this.gridSize;
	}
	
	this.getGridIndex = function(i,j){
	//this function returns the value at index I and index J
		try{
			return this.grid[i][j];
		}
		catch(e){
			console.log("Out of bounds");
			alert("An error has occured");
			location.reload();
		}
		
		
	}
	
	this.setTurnOrder = function(player1,player2){
	//This function simulates a coin toss and determines which player goes first
		/* var coinToss = Math.floor((Math.random() * 2 )+ 1);
		
		if(coinToss == 1){
			console.log(player1.getName() + " will go first");
			this.turnOrder.push(player1);
			this.turnOrder.push(player2);
		}
		else{
			console.log(player2.getName() + " will go first");
			this.turnOrder.push(player2);
			this.turnOrder.push(player1);
		} */
		this.turnOrder[0] = player1;
		this.turnOrder[1] = player2;
	}
	
	this.getTurn = function(){
		return this.turn;
	}

	this.getPlayer = function(playerNumber){
		for(var i = 0; i < this.turnOrder.length; i++){
			if(this.turnOrder[i].getPlayerNumber() == playerNumber){
				return this.turnOrder[i];
			}
		}
	}
	
	
	this.placeToken = function(character, indexI, indexJ){
		//this function places a character token on the board at index I (y coordinate) and index J (x coordinate)
		var token = character.getToken();
		
		if(this.grid[indexI][indexJ] != "X"){
			this.grid[indexI][indexJ] = token;
			character.setPosition(indexI,indexJ);
		}
	}
	
	this.updateGrid = function(character, pos){//removig pos1 temporarily
	//this function moves a character token from pos1 to pos2 which are both passed as the combined index of it's current position and the combined index of it's new position
	//The positions are obtained by the id of the "tile" and are passed as a string to be parsed into the x and y coordinates.
		var charToken = character.getToken();
		var previousI = character.getPosition().slice(0,1);//pos1.slice(0,1);
		var previousJ = character.getPosition().slice(1,2);
		console.log(character.getToken() + " " + character.getPosition());
		//console.log("previous i index: " + previousI);
		//var previousJ = pos1.slice(1,2);
		//console.log("previous j index: " + previousJ);
		var newI = pos.slice(0,1);
		var newJ = pos.slice(1,2);
		
		try{
			character.setPosition(newI,newJ);
			console.log(character.getPosition());
		}
		catch(e){
			alert("An error has occurred");
		}
		if(this.grid[newI][newJ] != "X"){
			this.grid[previousI][previousJ] = "O";
			this.grid[newI][newJ] = charToken;
		}
		else{
			alert("that is not a legal move");
		}
		
	}
	
	this.removeCharacter = function(pos){
		var i = pos.slice(0,1);
		var j = pos.slice(1,2);
		
		this.grid[i][j] = "O";
	}
	
	this.updateGameState = function(pGameOver,pRound,pTurn,pInitiative){
	//this function updates the basic game state
		this.isGameOver = pGameOver;
		this.round = pRound;
		this.turn = pTurn;
		//this.initiative = pInitiative;
	}
	
	this.updateTurnOrder = function(player1,player2){
		//This function is used to change or update the turn order
		//The first player passed to the function is put in index 0, the second index 1.
		this.turnOrder[0] = player1;
		this.turnOrder[1] = player2;
	}
	
	this.getRound = function(){
		return this.round;
	}
	
	this.combat = function(attackingCharacter,defendingCharacter){
		//add combat handler
		var attackValue = attackingCharacter.getAttack();
		var defenseHP = defendingCharacter.getCurrentHP();
		var attackRoll = Math.floor((Math.random() * 100) + 1);
		var damageRoll = Math.floor((Math.random() * 5) + 1);
		var damage;
		
		//need checks for special abilities and conditional modifiers
		if(attackingCharacter.getClassName() == "Rogue"){
			if(attackingCharacter.getPrecisionStrikeState() == true){
				if(attackRoll < 25){//if attack rolled failed
					attackRoll = 25;//attack success
				}
			}
		}
		
		
		
		if(attackRoll >= 75){
			//max damage
			damage = attackValue;
		}
		else if(attackRoll >= 50 && attackRoll < 75){
			// 3/4 damage + damageRoll
			damage = Math.round(attackValue * .75) + damageRoll;
			
		}
		else if(attackRoll >= 25 && attackRoll < 50){
			// 1/4 damage + damageRoll
			damage = Math.round(attackValue * .25) + damageRoll;
			
		}
		else{
			//no damage
			damage = 0;
		}
		
		if(attackingCharacter.getClassName() == "Rogue"){
			if(attackingCharacter.getPrecisionStrikeState() == true){
				damage = attackingCharacter.precisionStrike(damage);
				attackingCharacter.setPrecisionStrike(false);
			}
		}
		
		if(attackingCharacter.getClassName() == "Ranger"){
			if(attackingCharacter.getOverdrawState() == true){
				damage = attackingCharacter.overdraw(damage);
				attackingCharacter.setOverdraw(false);
			}
		}
		
		if(defendingCharacter.getClassName() == "Warrior"){
			if(defendingCharacter.getBlockState() == true){
				damage = defendingCharacter.block(damage);
				defendingCharacter.setBlockState(false);
				defendingCharacter.setCurrentHP(defenseHP - damage);
			}
			else{
				defendingCharacter.setCurrentHP(defenseHP - damage);
			}
		}
		else{
			defendingCharacter.setCurrentHP(defenseHP - damage);
		}
		
		if(defendingCharacter.getCurrentHP() <= 0){
			defendingCharacter.setDeath(true);
		}
		
		return damage;
		
	}
	
	
	/**************************************************
		special ability function needed
	***************************************************/
	
	//The following functions are specifically for testing and will not be used in the final product.
	
	this.printGameState = function(){
	//this function is more to test than anything
	//it displays some of the current game state as an alert
		alert("Round: " + this.round + "\nPlayer Turn: " + this.turnOrder[this.turn - 1].getName() + "\nGame Over: " + this.isGameOver);
	}
	//keep test function at bottom
	this.test = function(size){
	//this is a test function that can be changed to test specific cases.
		for(var i = 0; i < size; i++){
			for(var j = 0; j < size; j++){
				console.log(this.grid[i][j]);
			}
		}
		
		console.log("the game is over: " + this.isGameOver);
		console.log("round: " + this.round);
		console.log("turn: " + this.turn);
		
		for(var i = 0; i < this.turnOrder.length; i++){
			console.log(this.turnOrder[i].getName());
		}
	}
	
}

function Player(pName,pNumber,pType){
	this.playerName = pName;
	this.playerNumber = pNumber;//player 1 or player 2
	this.initiative = 0;
	this.playerType = pType;//PC or mob
	this.characters = new Array();
	this.charTotal = 0;
	
	this.addChar = function(character){
		//this function adds a character to the players character list
		this.characters.push(character);
		this.initiative += 1;
		this.charTotal += 1;
	}
	
	this.getName = function(){
	//this function returns the players name
		return this.playerName;
	}
	
	this.getPlayerNumber = function(){
	//this function returns the players number (P1 or P2)
		return this.playerNumber;
	}
	
	this.getPlayerType = function(){
	//this function returns the players type (PC or mob)
		return this.playerType;
	}
	
	this.getCharacter = function(pos){
		//this needs exception handling
		return this.characters[pos];
	}
	
	this.hasLivingCharacters = function(){
		var totalLivingCharacters = 0;
		
		for(var i = 0; i < this.characters.length; i++){
			if(this.characters[i].isDead != true){
				totalLivingCharacters++;
			}
		}
		
		if(totalLivingCharacters > 0){
			return true;
		}
		else{
			return false;
		}
	}
	
	this.getCharByToken = function(pToken){
		for(var i = 0; i < this.characters.length; i++){
			if(this.characters[i].token == pToken){
				return this.characters[i];
			}
			if(this.characters[i] != pToken && i == this.characters.length){
				return "undefined";
			}
		}
	}
	
	this.getCharTotal = function(){
		return this.charTotal;
	}
	
	this.getInitiative = function(){
		return this.initiative;
	}
	
	this.updateInitiative = function(){
		if(this.initiative > 0){
			this.initiative -= 1;
		}
		else{
			this.initiative = this.charTotal;//reset to end of array for count backwards
		}
		
	}

}
	
function Character(){
	this.token;
	this.isDead;
	this.isStunned;
	this.isStunned;
	this.isTaunted;
	this.healthPoints;
	this.actionPoints;
	this.attack;
	this.initiative;
	this.moveSpeed;
	this.attackRange;
	this.currentHP;
	this.currentAP;
	this.specialAbilities = new Array();
	this.position;
	this.owner //<-- var to determine who the character belongs to
	this.tauntingCharacter;//<-- var to determine who is taunting this character
	
	this.initChar = function(token,HP,AP,atk,init,mvSpd,atkRng,abl1,abl2,pOwner){
		//this is more intended to be used after creating an object which inherits this.
		this.token = token;
		this.isDead = false;
		this.isStunned = false;
		this.isTaunted = false;
		this.healthPoints = HP;
		this.currentHP = HP;
		this.actionPoints = AP;
		this.currentAP = AP;
		this.attack = atk;
		this.initiative = init;
		this.moveSpeed = mvSpd;
		this.attackRange = atkRng;
		this.specialAbilities.push(abl1);
		this.specialAbilities.push(abl2);
		this.owner = pOwner;
		this.tauntingCharacter = "";
	}
	
	this.setDeath = function(deathState){
		this.isDead = deathState;
	}
	
	this.setStun = function(stunState){
		this.isStunned = stunState;
	}
	
	this.setTaunt = function(tauntState,pTauntingCharacter){
		this.isTaunted = tauntState;
		this.tauntingCharacter = pTauntingCharacter;
	}
	
	this.setCurrentHP = function(HP){
		this.currentHP = HP;
	}
	
	this.setCurrentAP = function(AP){
		this.currentAP = AP;
	}
	
	this.setOwner = function(pOwner){
		this.owner = pOwner;
	}
	
	this.getToken = function(){
		return this.token;
	}
	
	this.getHP = function(){
		return this.healthPoints;
	}
	
	this.getAP = function(){
		return this.actionPoints;
	}
	
	this.getAttack = function(){
		return this.attack;
	}
	
	this.getInit = function(){
		return this.initiative;
	}
	
	this.getMvSpd = function(){
		return this.moveSpeed;
	}
	
	this.getAtkRng = function(){
		return this.attackRange;
	}
	
	this.getCurrentHP = function(){
		return this.currentHP;
	}
	
	this.getCurrentAP = function(){
		return this.currentAP;
	}
	
	this.getSpclAbl = function(pos){
		return this.specialAbilities[pos];
	}
	
	this.getToken = function(){
		return this.token;
	}
	
	this.setPosition = function(indexI,indexJ){
		this.position = indexI.toString() + indexJ.toString();
	}
	
	this.getPosition = function(){
		return this.position;
	}
	
	this.getOwner = function(){
		return this.owner;
	}
	
	this.getStunState = function(){
		return this.isStunned;
	}
	
	this.getDeathState = function(){
		return this.isDead;
	}
	
	this.isTauntedByEnemy = function(){
		return this.isTaunted;
	}
	
	this.isTauntingEnemy = function(){
		return this.isTaunting;
	}
	
	this.getTauntingCharacter = function(){
		return this.tauntingCharacter;
	}
}
	
function Warrior(){
	this.className = "Warrior";
	this.isTaunting = false;
	this.isBlocking = false;
	
	this.setTauntState = function(tauntState){
		this.isTaunting = tauntState;
	}
	
	this.setBlockState = function(blockState){
		this.isBlocking = blockState;
	}
	
	this.getTauntState = function(){
		return this.isTaunting;
	}
	
	this.getBlockState = function(){
		return this.isBlocking;
	}
	
	this.getClassName = function(){
		return this.className;
	}
	
	this.block = function(incomingDamage){
		var blockedDamage = 0;
		var blockChance = Math.floor((Math.random() * 100) + 1);
		
		if(blockChance >= 80){
			blockedDamage = incomingDamage;//block all incoming damage
		}
		if(blockChance < 80 && blockChance >= 50){
			blockedDamage = incomingDamage * .5;//block half of damage
		}
		if(blockChance < 50 && blockChance >= 25){
			blockedDamage = incomingDamage * .25;//block a quarter of damage
		}
		
		return incomingDamage - blockedDamage;
	}
	
	this.taunt = function(enemyPlayer){
		//set the player to being taunted. Setup isTaunted for character type which checks if isTaunted is on
		//if isTaunted is on, only can attack this character until turn counter runs out.
		var tauntChance = Math.floor((Math.random() * 100) + 1);
		
		if(tauntChance >= 25){
			enemyPlayer.setTaunt(true);
		}
	}
}
	
	Warrior.prototype = new Character();
	
function Rogue(){
	this.isPrecisionStrikeOn = false;
	this.className = "Rogue";
	
	this.setPrecisionStrike = function(precisionStrikeState){
		this.isPrecisionStrikeOn = precisionStrikeState;
	}
	
	this.getClassName = function(){
		return this.className;
	}
	
	this.getPrecisionStrikeState = function(){
		return this.isPrecisionStrikeOn;
	}
	
	this.precisionStrike = function(damage){
		var critChance = Math.floor((Math.random() * 100) + 1);
		var bonusDamage = damage + 20;
		
		if(critChance > 66){//33% chance to crit...pretty high, but think I will keep since it only does small amount of bonus damage
			return bonusDamage;
		}
		else{
			return damage;//base damage
		}
	}
	
	this.leap = function(targetTile){
		//need to setup to analyze target tile vs char current AP
		//analyze whether target tyle is vertical or horizontal move
		
		
	}
}

	Rogue.prototype = new Character();

function Ranger(){
	this.isOverdrawing;
	this.isExerting;
	this.className = "Ranger";
	
	this.getClassName = function(){
		return this.className;
	}
	
	this.setOverdraw = function(overdrawState){
		this.isOverdrawing = overdrawState;
	}
	
	this.setExert = function(exertState){
		this.isExerting = exertState;
	}
	
	this.getOverdrawState = function(){
		return this.isOverdrawing;
	}
	
	this.getExertState = function(){
		return this.isExerting;
	}
	
	this.overdraw = function(baseDamage){
		//guaranteed overdraw...loses this turn
		return baseDamage * 1.5;
	}
}

	Ranger.prototype = new Character();

function Mage(){
	this.className = "Mage";
	
	this.getClassName = function(){
		return this.className;
	}
	
	this.paralyze = function(){
		var paralyzeChance = Math.floor((Math.random() * 100) + 1);
		
		if(paralyzeChance >= 25){
			return true;
		}
		else{
			return false;
		}
	}
	
	this.heal = function(healTarget){
		var targetCurrentHP = healTarget.getCurrentHP();
		var healTotal;
		var healChance = Math.floor((Math.random() * 100) + 1);
		
		if(healChance >= 66){
			healTotal = targetCurrentHP;
		}
		else{
			healTotal = targetCurrentHP / 2;
		}
		
		return healTotal;
	}
}

	Mage.prototype = new Character();