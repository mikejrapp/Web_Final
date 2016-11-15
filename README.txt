READ ME

The JSON file is titled saved_game.json and can be found in the same directory 
as the other files.

As the title suggests the file is meant to represent a saved game that can be loaded
from the main game page.(A load button has been added to the game page).

Since several of the variables for the characters are actually constants
(Total Health Points, etc) the file only contains the data for true
variables like Current Health Points and Action Points.

I have added to the information displayed on the screen when Player 1 clicks
one of their characters. It now shows the characters current HP and AP out of total 
HP and AP. This means that you can adjust the data in the JSON file for the current HP/AP
values. Other values from that file that will reflect on the game page if you change them are
the player names and the character positions.

Note: 
Character positions that will not work for the following game sizes:

	5x5:
		Positions: 11,12,21,24,34 will not work as they are static obstacles
	8x8:
		Positions: 13,14,22,34,35,36,43,44,61,62 are static obstacles
	10x10:
		Positions: 17,18,22,26,27,32,33,37,41,42,58,59,64,65,73,74,82 are static obstacles

Setting each character position to the same position will also not work.

These are handled in the game so if they are set to a static obstacle or an occupied tile you
will get an error message.

I have also just discovered a bug that causes the game to only allow a player to click
characters that belong to "Player 1" so for now it is best to leave the "turn" values as
they are for the game object and player objects. I am currently working on debugging 
that issue.

The code for this assignment starts in the "loadGame" function.