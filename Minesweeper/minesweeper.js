//
// Minesweeper
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
// In this version of Minesweeper, I generate the mine
// field after the user has selected their first square
// If you mark a square as being a mine, it cannot then be
// 'selected', you have to unmark the square as being a mine first

// Our board is a 8x9 grid, so 72 positions
// A value of 0 means empty/safe
// A value of 1 means a mine is present here

var BoardArray = new Array(72);

// This array holds the count for each square, a value of 0 
// means no mines in the immediate vicinity of that square

var countArray = new Array(72);

// This array holds what the player has done. 
// 0 means that it is still covered
// 1 means that they have selected it
// 2 means that they have marked this as being a mine

var chosenArray = new Array(72);

var numOfSquares = 72;

// This holds the number of mines hidden in the minefield.

var numOfMines = 14;

var backgroundBoardColour = "#cccccc";

var clearedColour = "#eeeeee";

var explodedBoardColour = "#ff0000";

// This variable indicates whether the player is allowed
// make their move or not. We temporarily block when generating
// the minefield, redrawing the board etc.

var possible = 1;

// Holds whether this is the players first go

var firstGo = 1;

// This decides the customer action
// 0 means a normal selection
// 1 means mark/unmark as being a mine

var chosenAction = 0;

// Normal border colour

var normalBorderColour = "#000000";

// Sets whether we have won or not, 1 means we have won
// 2 means the mines have won

var winner = 0;

var bestTime = 9999;

// This holds our explosion sound object - plays sound if we hit a mine

var explosionSound;

var mouseInUse = false;

// used when calculating the time playing the gameover
var start;
var clockVar;

function alternateAction()
{
	var myAltObj = document.getElementById("swaptext");

	if(chosenAction==0)
	{
		chosenAction = 1;
		myAltObj.innerHTML="(un)mark mine";
	}
	else
	{
		chosenAction = 0;
		myAltObj.innerHTML="clear square";
	}
}

function generateMines(chosenSquare)
{
	// selects 14 (numOfMines) squares at random and places a mine at that square
	// We don't pick the first square that the user has selected

	var randomNum = Math.floor(Math.random() * numOfSquares);
	
	var i = 0;
	
	while(i < numOfMines)
	{
		if( (randomNum != chosenSquare) && (BoardArray[randomNum]!=1) )
		{
			i++;
			BoardArray[randomNum]=1;
		}
		randomNum = Math.floor(Math.random() * numOfSquares);
	}

	// Now that we have picked the mine positions, we generate our array that holds
	// the vicinity count for each square. A square with a mine has a count of 9

	var tempRow;
	var tempCol;

	for (i=0; i <numOfSquares; i++)
	{
		// 8 squares per row, 9 columns
		// tempRow holds row, tempCol holds the column

		tempRow = Math.floor(i/8);
		tempCol = (i - (8 * tempRow));

		// check down
		if(tempRow!=0)
		{
			// bottom row does not have a down
			if(BoardArray[i-8]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check up
		if(tempRow!=8)
		{
			// top row does not have an 'up'
			if(BoardArray[i+8]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check right
		if(tempCol!=7)
		{
			// right most column does not have a 'right'
			if(BoardArray[i+1]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check left
		if(tempCol!=0)
		{
			// left most column does not have a 'left'
			if(BoardArray[i-1]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check se
		if(tempRow!=0 && tempCol!=7 )
		{
			// bottom row does not have a down, right most column no right
			if(BoardArray[i-7]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check sw
		if(tempRow!=0 && tempCol!=0 )
		{
			// bottom row does not have a down, left most column no left
			if(BoardArray[i-9]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check ne
		if(tempRow!=8 && tempCol!=7 )
		{
			// top row does not have an up, right most column no right
			if(BoardArray[i+9]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// check nw
		if(tempRow!=8 && tempCol!=0 )
		{
			// top row does not have an up, left most column no left
			if(BoardArray[i+7]==1)
			{
				countArray[i] = countArray[i]+1;
			}
		}

		// lastly, if the square is actually a mine itself, we just set
		//its count to be 9 - more than it could be

		if(BoardArray[i]==1)
		{
			countArray[i] = 10;
		}


	}
	
}

function playMove(chName)
{
	var proposedMove;
	
	if(possible==1)
	{
		proposedMove=chName;
		proposedMove--;

		if(firstGo==1)
		{
			firstGo = 0;
			generateMines(proposedMove);
		}

		if(chosenAction==0)
		{
			if(chosenArray[proposedMove]==2)
			{
				// marked as a mine, cannot play a piece unless it is unmarked
			}
			else
			{
				// picking a square
				if(BoardArray[proposedMove]==1)
				{
					// picked a mine! Game over
					gameover();
					possible=0;
				}
				else
				{
					if(countArray[proposedMove]==0)
					{
						// If we have just selected a square that is empty, we clear all squares in
						// its vicinity that are also empty

						chosenArray[proposedMove]=1;
						selectEmptySquares();
					}
					else
					{
						chosenArray[proposedMove]=1;
					}
				}
			}
		}

		if(chosenAction==1)
		{
			// marking/unmarking as a mine
			
			var j;
			var myObj;
			
			if(chosenArray[proposedMove]==2)
			{
				// already marked, unmark
				// also need to clear the square

				j = "a" + (proposedMove+1);
				myObj = document.getElementById(j);
				myObj.innerHTML="Y";

				chosenArray[proposedMove]=0;
			}
			else
			{
				if(chosenArray[proposedMove]==0)
				{
					// mark
					chosenArray[proposedMove] = 2;	
				}
				else
				{
					// otherwise trying to mark an already cleared cell, ignore.
				}
			}

		}

	
		showBoard();	
	}
}

function playMoveRightClick(chName)
{
	var backupChosenAction = chosenAction;
	chosenAction = 1;
	
	playMove(chName);
	
	chosenAction = backupChosenAction;
}

function selectEmptySquares()
{
	// This function clears all squares around an empty square (a square with no
	// mines in its immediate vicinity)
	// Function is done iteratively instead of recursively as I was encountering
	// stack/memory issues with my recursive implementation

	var i;
	var tempRow;
	var tempCol;
	var newEmptySquareFound = 1;

	while(newEmptySquareFound==1)
	{
		newEmptySquareFound = 0;

		for (i=0; i <numOfSquares; i++)
		{
			if(countArray[i]==0 && chosenArray[i]==1)
			{
				// so, we iteratively look for squares that are empty that
				// have already been selected, we then make sure that all
				// squares around it are clear
		
				tempRow = Math.floor(i/8);
				tempCol = (i - (8 * tempRow));

				if(tempCol !=0)
				{
					// west
					if(countArray[i-1] == 0 && chosenArray[i-1] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i-1] = 1;
				}
				if(tempCol !=0 && tempRow!=8)
				{
					// north west
					if(countArray[i+7] == 0 && chosenArray[i+7] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i+7] = 1;
				}
				if(tempRow!=8)
				{
					// north
					if(countArray[i+8] == 0 && chosenArray[i+8] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i+8] = 1;
				}
				if(tempRow!=8 && tempCol!=7)
				{
					// north east
					if(countArray[i+9] == 0 && chosenArray[i+9] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i+9] = 1;
				}
				if(tempCol!=7)
				{
					// east
					if(countArray[i+1] == 0 && chosenArray[i+1] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i+1] = 1;
				}
				if(tempRow!=0 && tempCol!=7)
				{
					// south east
					if(countArray[i-7] == 0 && chosenArray[i-7] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i-7] = 1;
				}
				if(tempRow!=0)
				{
					// south
					if(countArray[i-8] == 0 && chosenArray[i-8] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i-8] = 1;
				}
				if(tempRow!=0 && tempCol!=0)
				{
					// south west
					if(countArray[i-9] == 0 && chosenArray[i-9] == 0)
					{
						newEmptySquareFound = 1;
					}
					chosenArray[i-9] = 1;
				}
			}
		}
	}

}

function pickAction(actionlevel)
{
	chosenAction = actionlevel;
}

function showBoard()
{
	var i;
	var j;
	var myObj;
	
	for (i=0; i <numOfSquares; i++)
	{
		j = "a" + (i+1);
		myObj = document.getElementById(j);

		if(chosenArray[i]==0)
		{
			myObj.style.backgroundColor = backgroundBoardColour;
			myObj.innerHTML=" ";
		}
		if(chosenArray[i]==1 && countArray[i]!=0)
		{
			myObj.style.backgroundColor = clearedColour;
			myObj.innerHTML=countArray[i];
		}
		if(chosenArray[i]==1 && countArray[i]==0)
		{
			myObj.style.backgroundColor = clearedColour;
			myObj.innerHTML=" ";
		}
		if(chosenArray[i]==2)
		{
			myObj.style.backgroundColor = backgroundBoardColour;
			myObj.innerHTML="X";
		}
	}

	if(winner==2)
	{
		for (i=0; i <numOfSquares; i++)
		{
			if(BoardArray[i]==1)
			{
				j = "a" + (i+1);
				myObj = document.getElementById(j);
				myObj.style.backgroundColor =	explodedBoardColour;
				myObj.innerHTML="X";
			}
		}
	}

	checkGame();


}

function gameover() 
{
	explosionSound.play();
	
	winner = 2;
	document.getElementById("left1").innerHTML="<font color='#ff0000'>G</font>";
	document.getElementById("left2").innerHTML="<font color='#ff0000'>A</font>";
	document.getElementById("left3").innerHTML="<font color='#ff0000'>M</font>";
	document.getElementById("left4").innerHTML="<font color='#ff0000'>E</font>";
	document.getElementById("left5").innerHTML=" ";
	document.getElementById("left6").innerHTML="<font color='#ff0000'>O</font>";
	document.getElementById("left7").innerHTML="<font color='#ff0000'>V</font>";
	document.getElementById("left8").innerHTML="<font color='#ff0000'>E</font>";
	document.getElementById("left9").innerHTML="<font color='#ff0000'>R</font>";

	document.getElementById("right1").innerHTML="<font color='#ff0000'>G</font>";
	document.getElementById("right2").innerHTML="<font color='#ff0000'>A</font>";
	document.getElementById("right3").innerHTML="<font color='#ff0000'>M</font>";
	document.getElementById("right4").innerHTML="<font color='#ff0000'>E</font>";
	document.getElementById("right5").innerHTML=" ";
	document.getElementById("right6").innerHTML="<font color='#ff0000'>O</font>";
	document.getElementById("right7").innerHTML="<font color='#ff0000'>V</font>";
	document.getElementById("right8").innerHTML="<font color='#ff0000'>E</font>";
	document.getElementById("right9").innerHTML="<font color='#ff0000'>R</font>";
}

function checkGame() 
{
	var i;
	var coveredSquares = 0;	// will be set to 1 if covered blocks found
	var numMinesMarked = 0;
	
	for (i=0; i <numOfSquares; i++)
	{
		if(chosenArray[i]==0)
		{
			coveredSquares = 1;
		}
		if(chosenArray[i]==2)
		{
			// marked as being mine
			numMinesMarked++;
		}
	}

	if(coveredSquares==0)
	{
		if(numMinesMarked==numOfMines)
		{
			// player has marked the correct number of mines
			winner=1;
			possible=0;
		}
	}

	if (winner==1)
	{
		var scoreDate=new Date()
		var now=scoreDate.valueOf(); 
		var playedTime=Math.floor((now-start)/1000);

		if(playedTime < bestTime)
		{ 
			bestTime = playedTime;
			document.all.besttime.innerHTML=bestTime ;
			
			// This saves the best time score so its saved for next time we play
			if (typeof(Storage) !== "undefined") 
			{
    			// Code for localStorage
				localStorage.setItem("minesweeperbesttime", bestTime);
			}
		}

		document.getElementById("left1").innerHTML=" ";
		document.getElementById("left2").innerHTML="<font color='#00ff00'>Y</font>";
		document.getElementById("left3").innerHTML="<font color='#00ff00'>O</font>";
		document.getElementById("left4").innerHTML="<font color='#00ff00'>U</font>";
		document.getElementById("left5").innerHTML=" ";
		document.getElementById("left6").innerHTML="<font color='#00ff00'>W</font>";
		document.getElementById("left7").innerHTML="<font color='#00ff00'>I</font>";
		document.getElementById("left8").innerHTML="<font color='#00ff00'>N</font>";
		document.getElementById("left9").innerHTML=" ";


		document.getElementById("right1").innerHTML=" ";
		document.getElementById("right2").innerHTML="<font color='#00ff00'>Y</font>";
		document.getElementById("right3").innerHTML="<font color='#00ff00'>O</font>";
		document.getElementById("right4").innerHTML="<font color='#00ff00'>U</font>";
		document.getElementById("right5").innerHTML=" ";
		document.getElementById("right6").innerHTML="<font color='#00ff00'>W</font>";
		document.getElementById("right7").innerHTML="<font color='#00ff00'>I</font>";
		document.getElementById("right8").innerHTML="<font color='#00ff00'>N</font>";
		document.getElementById("right9").innerHTML=" ";
	}

}

function startGame()
{
	// Gets called when we load up index.html

	reset();
}

function playAgain() 
{
	clearTimeout(clockVar); 
	reset();
}

function reset() 
{
	var i;
	possible = 1;
	firstGo = 1;
	winner = 0;

	for (i=0; i <numOfSquares; i++)
	{
		BoardArray[i] = 0;
		countArray[i] = 0;
		chosenArray[i] = 0;
	}

	document.getElementById("left1").innerHTML=" ";
	document.getElementById("left2").innerHTML=" ";
	document.getElementById("left3").innerHTML=" ";
	document.getElementById("left4").innerHTML=" ";
	document.getElementById("left5").innerHTML=" ";
	document.getElementById("left6").innerHTML=" ";
	document.getElementById("left7").innerHTML=" ";
	document.getElementById("left8").innerHTML=" ";
	document.getElementById("left9").innerHTML=" ";

	document.getElementById("right1").innerHTML=" ";
	document.getElementById("right2").innerHTML=" ";
	document.getElementById("right3").innerHTML=" ";
	document.getElementById("right4").innerHTML=" ";
	document.getElementById("right5").innerHTML=" ";
	document.getElementById("right6").innerHTML=" ";
	document.getElementById("right7").innerHTML=" ";
	document.getElementById("right8").innerHTML=" ";
	document.getElementById("right9").innerHTML=" ";

	showBoard();

	var resetDate=new Date()
	start=resetDate.valueOf();

	clockVar = setTimeout(showTime,500);
}

function showTime()
{
	var scoreDate=new Date()
	var now=scoreDate.valueOf(); 
	document.all.gametime.innerHTML=Math.floor((now-start)/1000); 

	if( ((now-start)/1000) > 10000)
	{
		gameover();
		possible=0;
		showBoard();
	}
	else
	{
		if(possible==1)
		{
			clockVar = setTimeout(showTime,500);
		}
	}
}

function myinit()
{
	// default is touch screen, but if mouse parameter passed we work with that
	
	if(getAllUrlParams().mouse)
	{
		mouseInUse = true;
	}
	
	if(mouseInUse==true)
	{
		var myChangeActionObj = document.getElementById("changeactionsection");
		myChangeActionObj.innerHTML="<br>";
		var myAltObj = document.getElementById("swaptext");
		myAltObj.innerHTML="Left Click to Clear, Right Click to mark/unmark";
	}
	
	// load the best time if previously saved
	if (typeof(Storage) !== "undefined") 
	{
    	// Code for localStorage
		if (localStorage.minesweeperbesttime)
		{
			bestTime = Number(localStorage.minesweeperbesttime);
			document.all.besttime.innerHTML=bestTime ;
		}
	}
	
	// setup our explosion sound
	
	explosionSound = new sound("explosion.wav");
	
	reset();
}

function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


// code got from https://www.sitepoint.com/get-url-parameters-with-javascript/
// I slightly modified it to handle parameters with no values
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();

	  if(paramValue === true)
	  {
		  // don't do anything
	  }
	  else
	  {
		  // if we pass a parameter with no value this line causes a problem, as paramValue has value of true (not a string)
		paramValue = paramValue.toLowerCase();
	  }
	  
      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}



