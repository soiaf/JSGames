//
// Four in a Row
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
//
// A Connect-4 implementation
// A Connect-4 board is made up of seven columns, each column has six rows
//
// We need to declare a 2D array to hold all the board positions
// 2-D will be created in function resetBoardArray()
// A value of 0 means empty, 1 is the player, 2 is the computer

var BoardArray = new Array(7);

// We use tempBoardArray as our test area for testing potential moves etc.

var tempBoardArray = new Array(7);

// We hold a count for each column, this holds the number of pieces in that
// particular column. If it holds six then it is full.

var boardColumnCount = new Array(7);

// Hold a temp count for each column, used with tempBoardArray 

var tempBoardColumnCount = new Array(7);

// The variable possible holds whether there are any possible moves left
// 0 means no, 1 means yes

var possible = 1;

// The variable winner holds who has won (if anyone)
// 0 means no winner, 1 is player, 2 is the computer

var winner = 0;

// This holds the win count for the player and computer during this session

var numWinsPlayerThisSession = 0;
var numWinsComputerThisSession = 0;

// This holds whether the score has been updated once at the end of a game

var scoreUpdated = 0;


// The variable valid holds whether a particular choice is valid or not
// for example if the column is already full
// 0 means no, 1 means yes

var valid = 0;

// variable numOfColumns holds the value 7, the number of columns in a
// Connect-4 board, used when picking random numbers

var numOfColumns = 7;

// variable computerRowChosen holds the value of the row that the computer
// has decided to place

var computerRowChosen = 0; 

// The game has 4 difficulty levels
// 0 - simplest level, just puts in random empty column
// 1 - random, but will complete line if 3 in a row and possible to win
// 2 - random, but will complete line if 3 in a row and possible to win
//     also will try to block 4 in a row for the player
// 3 - as with level 2, but looks two moves ahead

var difficulty = 3;

var rndNum = 0;
var myVal = 0;

// variable goesfirst holds a value that gives which player goes
// first, if 0 its the player, if 1 it is the computer
// The first time the page is loaded the player will go first

var goesfirst = 0;

// Background colour for board

var backgroundBoardColour = "#cccccc";

// This holds the colour to show when player has a winning line
var playerwincolour = '#80ff00';

// This holds the colour to show when computer has a winning line
var computerwincolour = '#ffc0a0';

// Decides whether player is allowed play or not, removes possibility
// of a quick double click (1 means allowed play)

var playerAllowedMove = 1;

// This holds whether the computer is allowed move

var computerAllowedMove = 0;

// Decides whether any move is allowed. This is to stop the computer 
// making its move before the piece have fallen down

var anyMoveAllowed = 1;

// This shows whether the computer has made its move

var computerMoveMade = 0;

// Used to show which column the player has made their move

// var playerMoveMade = 0;




function resetBoardArray()
{
	BoardArray=new Array(7);
	for (i=0; i <7; i++)
	{
		BoardArray[i]=new Array(6);
	}

	for (j=0; j <6; j++)
	{
		for (i=0; i <7; i++)
		{
			BoardArray[i][j]=0;
		}
	}

	tempBoardArray=new Array(7);
	for (i=0; i <7; i++)
	{
		tempBoardArray[i]=new Array(6);
	}

	for (j=0; j <6; j++)
	{
		for (i=0; i <7; i++)
		{
			tempBoardArray[i][j]=0;
		}
	}

	// Also reset the counters for each column

	for (i=0; i <7; i++)
	{
		boardColumnCount[i]=0;
	} 	
}	

// This highlights the winning line. This assumes winner has been set
// so we know what colour to use
function highlightWinningLine(x1,y1,x2,y2,x3,y3,x4,y4)
{
	var myObj;
	var idString;
	var idCalc;
	var winnerColour;
	
	if(winner==1)
	{
		winnerColour = playerwincolour;
	}
	else if(winner==2)
	{
		winnerColour = computerwincolour;
	}
	else
	{
		// should not be here (as winner should be set) but we just set as 
		// background colour
		winnerColour = backgroundBoardColour;
	}
	
	idCalc = (y1*7) + x1 + 1;
	idString = "a" + idCalc;
	myObj = document.getElementById(idString);
	myObj.style.backgroundColor = winnerColour;

	idCalc = (y2*7) + x2 + 1;
	idString = "a" + idCalc;
	myObj = document.getElementById(idString);
	myObj.style.backgroundColor = winnerColour;
	
	idCalc = (y3*7) + x3 + 1;
	idString = "a" + idCalc;
	myObj = document.getElementById(idString);
	myObj.style.backgroundColor = winnerColour;
	
	idCalc = (y4*7) + x4 + 1;
	idString = "a" + idCalc;
	myObj = document.getElementById(idString);
	myObj.style.backgroundColor = winnerColour;

}	

function checkWinner()
{
	var currentPieceVal = 0;
	for (j=0; j <6; j++)
	{
		for (i=0; i <7; i++)
		{
			// check up
			if(j<3)
			{
				if(BoardArray[i][j]!=0)
				{
					currentPieceVal = BoardArray[i][j];

					if( (BoardArray[i][j+1]==currentPieceVal) && (BoardArray[i][j+2]==currentPieceVal)
						&& (BoardArray[i][j+3]==currentPieceVal) )
					{
						possible = 0;	// no moves left
						winner = currentPieceVal;
						highlightWinningLine(i,j,i,j+1,i,j+2,i,j+3);
					}
				}
			}
			// check right
			if(i<4)
			{
				if(BoardArray[i][j]!=0)
				{
					currentPieceVal = BoardArray[i][j];

					if( (BoardArray[i+1][j]==currentPieceVal) && (BoardArray[i+2][j]==currentPieceVal)
						&& (BoardArray[i+3][j]==currentPieceVal) )
					{
						possible = 0;	// no moves left
						winner = currentPieceVal;
						highlightWinningLine(i,j,i+1,j,i+2,j,i+3,j);
					}
				}
			}
			// check diag ne
			if(i<4 && j<3)
			{
				if(BoardArray[i][j]!=0)
				{
					currentPieceVal = BoardArray[i][j];

					if( (BoardArray[i+1][j+1]==currentPieceVal) && (BoardArray[i+2][j+2]==currentPieceVal)
						&& (BoardArray[i+3][j+3]==currentPieceVal) )
					{
						possible = 0;	// no moves left
						winner = currentPieceVal;
						highlightWinningLine(i,j,i+1,j+1,i+2,j+2,i+3,j+3);
					}
				}
			}
			// check diag nw
			if(j<3 && i>2)
			{
				if(BoardArray[i][j]!=0)
				{
					currentPieceVal = BoardArray[i][j];

					if( (BoardArray[i-1][j+1]==currentPieceVal) && (BoardArray[i-2][j+2]==currentPieceVal)
						&& (BoardArray[i-3][j+3]==currentPieceVal) )
					{
						possible = 0;	// no moves left
						winner = currentPieceVal;
						highlightWinningLine(i,j,i-1,j+1,i-2,j+2,i-3,j+3);
					}
				}
			}
		}
	}
}

function checkPotentialWinner(valToCheck)
{
	// used to check temp board array, returns 0 if no win
	// 1 if a win is possible

	var currentPieceVal = valToCheck;
	for (j=0; j <6; j++)
	{
		for (i=0; i <7; i++)
		{
			// check up
			if(j<3)
			{
				if(tempBoardArray[i][j]==valToCheck)
				{
					if( (tempBoardArray[i][j+1]==currentPieceVal) && (tempBoardArray[i][j+2]==currentPieceVal)
						&& (tempBoardArray[i][j+3]==currentPieceVal) )
					{
						return(1);
					}
				}
			}
			// check right
			if(i<4)
			{
				if(tempBoardArray[i][j]==valToCheck)
				{
					if( (tempBoardArray[i+1][j]==currentPieceVal) && (tempBoardArray[i+2][j]==currentPieceVal)
						&& (tempBoardArray[i+3][j]==currentPieceVal) )
					{
						return(1);
					}
				}
			}
			// check diag ne
			if(i<4 && j<3)
			{
				if(tempBoardArray[i][j]==valToCheck)
				{
					if( (tempBoardArray[i+1][j+1]==currentPieceVal) && (tempBoardArray[i+2][j+2]==currentPieceVal)
						&& (tempBoardArray[i+3][j+3]==currentPieceVal) )
					{
						return(1);
					}
				}
			}
			// check diag nw
			if(j<3 && i>2)
			{
				if(tempBoardArray[i][j]==valToCheck)
				{
					if( (tempBoardArray[i-1][j+1]==currentPieceVal) && (tempBoardArray[i-2][j+2]==currentPieceVal)
						&& (tempBoardArray[i-3][j+3]==currentPieceVal) )
					{
						return(1);
					}
				}
			}
		}
	}
	return(0);
}

function checkPotentialThreeOfFour(valToCheck, proposedI, proposedJ)
{
	// used to check temp board array, returns 0 if no win
	// 1 if a win is possible

	var currentPieceVal = valToCheck;
	for (j=0; j <6; j++)
	{
		for (i=0; i <7; i++)
		{
			// no need to check up
			// check right
			if(i<4)
			{
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j]==valToCheck) && (tempBoardArray[i+2][j]==valToCheck) && (tempBoardArray[i+3][j]==0) )
				{
					if (proposedJ == j)
					{
						if( (i==proposedI) || (proposedI == i+1) || (proposedI == i+2) )
						{
							return(1);
						}
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j]==valToCheck) && (tempBoardArray[i+2][j]==0) && (tempBoardArray[i+3][j]==valToCheck) )
				{
					if (proposedJ == j)
					{
						if( (i==proposedI) || (proposedI == i+1) || (proposedI == i+3) )
						{
							return(1);
						}
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j]==0) && (tempBoardArray[i+2][j]==valToCheck) && (tempBoardArray[i+3][j]==valToCheck) )
				{
					if (proposedJ == j)
					{
						if( (i==proposedI) || (proposedI == i+2) || (proposedI == i+3) )
						{
							return(1);
						}
					}
				}
				if( (tempBoardArray[i][j]==0) && (tempBoardArray[i+1][j]==valToCheck) && (tempBoardArray[i+2][j]==valToCheck) && (tempBoardArray[i+3][j]==valToCheck) )
				{
					if (proposedJ == j)
					{
						if( (proposedI==i+1) || (proposedI == i+2) || (proposedI == i+3) )
						{
							return(1);
						}
					}
				}



			}
			// check diag ne
			if(i<4 && j<3)
			{
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j+1]==valToCheck) && (tempBoardArray[i+2][j+2]==valToCheck) && (tempBoardArray[i+3][j+3]==0) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i+1) && (proposedJ == j+1)) || ((proposedI == i+2) && (proposedJ == j+2)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j+1]==valToCheck) && (tempBoardArray[i+2][j+2]==0) && (tempBoardArray[i+3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i+1) && (proposedJ == j+1)) || ((proposedI == i+3) && (proposedJ == j+3)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i+1][j+1]==0) && (tempBoardArray[i+2][j+2]==valToCheck) && (tempBoardArray[i+3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i+3) && (proposedJ == j+3)) || ((proposedI == i+2) && (proposedJ == j+2)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==0) && (tempBoardArray[i+1][j+1]==valToCheck) && (tempBoardArray[i+2][j+2]==valToCheck) && (tempBoardArray[i+3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i+1) && (proposedJ == j+1)) || ((proposedI == i+2) && (proposedJ == j+2)) || ((proposedI == i+3) && (proposedJ == j+3)) )
					{
						return(1);
					}
				}


			}

			// check diag nw
			if(j<3 && i>2)
			{
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i-1][j+1]==valToCheck) && (tempBoardArray[i-2][j+2]==valToCheck) && (tempBoardArray[i-3][j+3]==0) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i-1) && (proposedJ == j+1)) || ((proposedI == i-2) && (proposedJ == j+2)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i-1][j+1]==valToCheck) && (tempBoardArray[i-2][j+2]==0) && (tempBoardArray[i-3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i-1) && (proposedJ == j+1)) || ((proposedI == i-3) && (proposedJ == j+3)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==valToCheck) && (tempBoardArray[i-1][j+1]==0) && (tempBoardArray[i-2][j+2]==valToCheck) && (tempBoardArray[i-3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i) && (proposedJ == j)) || ((proposedI == i-3) && (proposedJ == j+3)) || ((proposedI == i-2) && (proposedJ == j+2)) )
					{
						return(1);
					}
				}
				if( (tempBoardArray[i][j]==0) && (tempBoardArray[i-1][j+1]==valToCheck) && (tempBoardArray[i-2][j+2]==valToCheck) && (tempBoardArray[i-3][j+3]==valToCheck) )
				{
					if (  ((proposedI == i-1) && (proposedJ == j+1)) || ((proposedI == i-2) && (proposedJ == j+2)) || ((proposedI == i-3) && (proposedJ == j+3)) )
					{
						return(1);
					}
				}
			}
		}
	}
	return(0);
}

function checkThreeOfFive(valToCheck)
{
	// if there are three pieces in a line, with an empty piece on
	// both sides of the line, then it is impossible to stop a win
	// Need to check for this situation
	// used to check temp board array, returns 0 if no win
	// 1 if a win is possible

	var currentPieceVal = valToCheck;
	for (j=0; j <6; j++)
	{
		for (i=0; i <3; i++)
		{
			// check right

			if(tempBoardArray[i][j]==0)	// empty piece
			{
				if(j==0)	// on bottom line
				{
					if( (tempBoardArray[i+1][j]==currentPieceVal) && (tempBoardArray[i+2][j]==currentPieceVal)
					&& (tempBoardArray[i+3][j]==currentPieceVal) && (tempBoardArray[i+4][j]==0) )
					{
						return(1);
					}
				}
				else
				{
					if( (tempBoardArray[i+1][j]==currentPieceVal) && (tempBoardArray[i+2][j]==currentPieceVal)
					&& (tempBoardArray[i+3][j]==currentPieceVal) && (tempBoardArray[i+4][j]==0) )
					{
						if( (tempBoardArray[i][j-1]!=0) && (tempBoardArray[i+4][j-1]!=0) )
						{
							return(1);
						}
					}				
				}
			}
		}
	}
	return(0);
}

function checkFreeSpace()
{
	if ( (boardColumnCount[0]==6) && (boardColumnCount[1]==6) && (boardColumnCount[2]==6) &&
		(boardColumnCount[3]==6) && (boardColumnCount[4]==6) && (boardColumnCount[5]==6) && (boardColumnCount[6]==6)) 	
	{
		possible = 0;	// no moves left
	}
}


function playerChoice(chName) 
{
	rowChosen = 0;
	pieceVal = 0;
	temp = 0;

	document.getElementById("infobox").innerHTML="";

	checkWinner();	// check is game has been won
	checkFreeSpace();	// check if any free spaces
	if (possible!=1) gameover();	// no more moves left
	else 
	{
		if(playerAllowedMove==1 )
		{
			temp=parseInt(chName)-1;

			if(boardColumnCount[temp]<6)
			{
				playerMoveMade = chName;

				playerAllowedMove = 0;
			}
		}
	}
}

function makePlayerMove()
{
	// Makes the player move

	temp=parseInt(playerMoveMade)-1;
	rowChosen = boardColumnCount[temp];
	boardColumnCount[temp]++;
	pieceVal = parseInt(playerMoveMade) + (rowChosen*7);

	BoardArray[temp][rowChosen]=1;
	addPieceColour(pieceVal,1);

	playerMoveMade = 0;

}

function addPieceColour(pieceLocation,xPlayer)
{
	anyMoveAllowed = 0;	// block till piece completely fallen

	if(xPlayer==1)
	{
		// player
		var toAddRow = Math.floor((pieceLocation-1)/7);
		var toAddColumn = (pieceLocation - (7 * toAddRow )) - 1;

		printFallingPlayerColour(toAddRow,5, toAddColumn);


	}
	if(xPlayer==2)
	{
		// computer
		var toAddRow = Math.floor((pieceLocation-1)/7);
		var toAddColumn = (pieceLocation - (7 * toAddRow )) - 1;

		printFallingComputerColour(toAddRow,5, toAddColumn);
	}
}

function printFallingPlayerColour(finalRowP,currentRowP, finalColumnP)
{
	// this is a recursive function that simulates the falling of the piece

	var pieceValP = 0;
	var tP;

	if(currentRowP<finalRowP)
	{
		// it was the player piece, allow the computer to now play
		anyMoveAllowed = 1;

		computerAllowedMove = 1;
	}
	else
	{

	if(currentRowP!=5)
	{
		// don't try to erase above the top row
		pieceValP	= (finalColumnP+1) + ((currentRowP+1)*7);

		myObj = document.getElementById("a" + pieceValP);
		myObj.innerHTML=" ";

	}

	// The below code could be made smaller
	// Column 0

	if((currentRowP==5) && (finalColumnP==0))
	{
		myObj = document.getElementById("a36");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}
	if((currentRowP==4) && (finalColumnP==0))
	{
		myObj = document.getElementById("a29");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}
	if((currentRowP==3) && (finalColumnP==0))
	{
		myObj = document.getElementById("a22");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}
	if((currentRowP==2) && (finalColumnP==0))
	{
		myObj = document.getElementById("a15");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}
	if((currentRowP==1) && (finalColumnP==0))
	{
		myObj = document.getElementById("a8");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}
	if((currentRowP==0) && (finalColumnP==0))
	{
		myObj = document.getElementById("a1");
		myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
	}

	// Column 1

	if( finalColumnP == 1)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a37");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a30");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a23");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a16");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a9");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a2");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 2

	if( finalColumnP == 2)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a38");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a31");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a24");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a17");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a10");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a3");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 3

	if( finalColumnP == 3)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a39");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a32");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a25");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a18");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a11");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a4");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 4

	if( finalColumnP == 4)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a40");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a33");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a26");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a19");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a12");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a5");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 5

	if( finalColumnP == 5)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a41");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a34");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a27");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a20");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a13");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a6");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 6

	if( finalColumnP == 6)
	{
		if(currentRowP==5)
		{
			myObj = document.getElementById("a42");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==4)
		{
			myObj = document.getElementById("a35");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==3)
		{
			myObj = document.getElementById("a28");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==2)
		{
			myObj = document.getElementById("a21");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==1)
		{
			myObj = document.getElementById("a14");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
		if(currentRowP==0)
		{
			myObj = document.getElementById("a7");
			myObj.innerHTML="<img src='red.gif' width='17' height='14' align='center' />";
		}
	}

	var fP = function() {printFallingPlayerColour(finalRowP,(currentRowP - 1), finalColumnP); };

	tP=setTimeout(fP,12);

	}

}

function printFallingComputerColour(finalRowC,currentRowC, finalColumnC)
{
	// this is a recursive function that simulates the falling of the piece

	var pieceValC = 0;
	var tC;

	if(currentRowC!=5)
	{
		// don't try to erase above the top row
		pieceValC	= (finalColumnC+1) + ((currentRowC+1)*7);
		myObj = document.getElementById("a" + pieceValC);
		myObj.innerHTML=" ";
	}

	// Really the below should be parameterised :)

	// Column 0

	if((currentRowC==5) && (finalColumnC==0))
	{
		myObj = document.getElementById("a36");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}
	if((currentRowC==4) && (finalColumnC==0))
	{
		myObj = document.getElementById("a29");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}
	if((currentRowC==3) && (finalColumnC==0))
	{
		myObj = document.getElementById("a22");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}
	if((currentRowC==2) && (finalColumnC==0))
	{
		myObj = document.getElementById("a15");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}
	if((currentRowC==1) && (finalColumnC==0))
	{
		myObj = document.getElementById("a8");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}
	if((currentRowC==0) && (finalColumnC==0))
	{
		myObj = document.getElementById("a1");
		myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
	}

	// Column 1

	if( finalColumnC == 1)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a37");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a30");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a23");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a16");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a9");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a2");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 2

	if( finalColumnC == 2)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a38");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a31");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a24");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a17");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a10");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a3");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 3

	if( finalColumnC == 3)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a39");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a32");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a25");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a18");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a11");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a4");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 4

	if( finalColumnC == 4)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a40");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a33");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a26");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a19");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a12");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a5");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 5

	if( finalColumnC == 5)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a41");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a34");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a27");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a20");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a13");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a6");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}

	// Column 6

	if( finalColumnC == 6)
	{
		if(currentRowC==5)
		{
			myObj = document.getElementById("a42");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==4)
		{
			myObj = document.getElementById("a35");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==3)
		{
			myObj = document.getElementById("a28");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==2)
		{
			myObj = document.getElementById("a21");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==1)
		{
			myObj = document.getElementById("a14");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
		if(currentRowC==0)
		{
			myObj = document.getElementById("a7");
			myObj.innerHTML="<img src='yellow.gif' width='17' height='14' align='center' />";
		}
	}


	if(currentRowC>finalRowC)
	{
		currentRowC = currentRowC - 1;

		var fC = function() {printFallingComputerColour(finalRowC,currentRowC, finalColumnC); };

		tC=setTimeout(fC,12);


	}

	if(currentRowC == finalRowC)
	{

		// finished displayed the computer colour, allow player to move (by showing computer has made move)
		computerMoveMade = 1;
		playerAllowedMove = 1;
		

	}

}

function computerCheckMove(passedVal)
{
// gets passed a value, checks if its valid
// if valid choice, sets value to 1
// and sets square value to 2

	if( boardColumnCount[passedVal-1]<6)			
	{
		valid=1;
		computerRowChosen = boardColumnCount[passedVal-1];
		boardColumnCount[passedVal-1]++;
	}
}

function computerEasyChoice()
{
// Just picks a random column (with free space)
	var pieceVal = 0;

	computerRowChosen = 0;
	valid = 0;
	while(valid==0)
	{
		rndNum=Math.random();
		myVal=Math.round((numOfColumns-1)* rndNum )+1;
		computerCheckMove(myVal);
	}
	
	pieceVal = myVal + (computerRowChosen*7);
	BoardArray[myVal-1][computerRowChosen]=2;
	addPieceColour(pieceVal,2);
}

function makeCopyOfBoard()
{
	// For some reason, array slice() didn't seem to work correctly, so doing my own
	// array copy.

	for (acr=0; acr <6; acr++)
	{
		for (acc=0; acc <7; acc++)
		{		
			tempBoardArray[acc][acr] = BoardArray[acc][acr]; 
		}
	}

	for (acc=0; acc <7; acc++)
	{
		tempBoardColumnCount[acc] = boardColumnCount[acc];
	}
}

function checkComputerThreeInRow()
{
	// function checks if computer player has three in a row that can
	// win on next move

	valid = 0;
	var checkThree = 0;

	for (mlm=1; mlm <8; mlm++)
	{
		// try adding a piece in each column, does computer 
		// win with this move?
		if(tempBoardColumnCount[mlm-1]<6)	// no point testing full column
		{			
			tempBoardArray[mlm-1][tempBoardColumnCount[mlm-1]]=2;

			retVal = checkPotentialWinner(2);
			tempBoardArray[mlm-1][tempBoardColumnCount[mlm-1]]=0;

			if(retVal==1)
			{
				valid = 1;
				checkThree = mlm;
			}
		}
	}

	return(checkThree);
}

function checkPlayerThreeInRow()
{
	// function checks if player has three in a row that can
	// win on next move

	valid = 0;
	var checkThreePlayer = 0;

	for (mlp=1; mlp <8; mlp++)
	{
		// try adding a piece in each column, does player 
		// win with this move?
		if(tempBoardColumnCount[mlp-1]<6)	// no point testing full column
		{			
			tempBoardArray[mlp-1][tempBoardColumnCount[mlp-1]]=1;		// test player piece

			retVal = checkPotentialWinner(1);
			tempBoardArray[mlp-1][tempBoardColumnCount[mlp-1]]=0;
	
			if(retVal==1)
			{
				valid = 1;
				checkThreePlayer = mlp;
			}
		}
	}
	return(checkThreePlayer);
}

function checkComputerUnstoppableThreeInRow()
{
	// function checks if computer player has three in a row that can
	// win on next move, but cannot be stopped e.g. where there is 
	// an empty square on both sides of the three in row

	valid = 0;
	var checkThreeUnstoppable = 0;

	for (mlmu=1; mlmu <8; mlmu++)
	{
		// try adding a piece in each column, does computer 
		// win with this move?
		if(tempBoardColumnCount[mlmu-1]<6)	// no point testing full column
		{			
			tempBoardArray[mlmu-1][tempBoardColumnCount[mlmu-1]]=2;

			retVal = checkThreeOfFive(2);
			tempBoardArray[mlmu-1][tempBoardColumnCount[mlmu-1]]=0;

			if(retVal==1)
			{
				valid = 1;
				checkThreeUnstoppable = mlmu;
			}
		}
	}

	return(checkThreeUnstoppable);
}

function checkPlayerUnstoppableThreeInRow()
{
	// function checks if player has three in a row that can
	// win on next move, but cannot be stopped e.g. where there is 
	// an empty square on both sides of the three in row

	valid = 0;
	var checkThreeUnstoppablePlayer = 0;

	for (mlpu=1; mlpu <8; mlpu++)
	{
		// try adding a piece in each column, does player 
		// win with this move?
		if(tempBoardColumnCount[mlpu-1]<6)	// no point testing full column
		{			
			tempBoardArray[mlpu-1][tempBoardColumnCount[mlpu-1]]=1;		// test player piece

			retVal = checkThreeOfFive(1);
			tempBoardArray[mlpu-1][tempBoardColumnCount[mlpu-1]]=0;
	
			if(retVal==1)
			{
				valid = 1;
				checkThreeUnstoppablePlayer = mlpu;
			}
		}
	}
	return(checkThreeUnstoppablePlayer );
}

function checkComputerThreeOfFour()
{
	// function checks if possible to make three in a row with the
	// fourth square empty


	valid = 0;
	var checkThreeOfFourComputer = 0;

	for (mtfm=1; mtfm <8; mtfm++)
	{
		// try adding a piece in each column, does computer get three
		// of four with this move (4th square empty)
 
		if(tempBoardColumnCount[mtfm-1]<6)	// no point testing full column
		{			
			tempBoardArray[mtfm-1][tempBoardColumnCount[mtfm-1]]=2;		// test computer piece

			retVal = checkPotentialThreeOfFour(2,(mtfm-1),tempBoardColumnCount[mtfm-1]);
			tempBoardArray[mtfm-1][tempBoardColumnCount[mtfm-1]]=0;
	
			if(retVal==1)
			{
				valid = 1;
				checkThreeOfFourComputer = mtfm;
			}
		}
	}
	return(checkThreeOfFourComputer );
}

function checkPlayerThreeOfFour()
{
	// function checks if possible for player to make three in a row with the
	// fourth square empty

	valid = 0;
	var checkThreeOfFourPlayer = 0;

	for (mtfp=1; mtfp <8; mtfp++)
	{
		// try adding a piece in each column, does computer get three
		// of four with this move (4th square empty)
 
		if(tempBoardColumnCount[mtfp-1]<6)	// no point testing full column
		{			
			tempBoardArray[mtfp-1][tempBoardColumnCount[mtfp-1]]=1;		// test player piece

			retVal = checkPotentialThreeOfFour(1,(mtfp-1),tempBoardColumnCount[mtfp-1]);
			tempBoardArray[mtfp-1][tempBoardColumnCount[mtfp-1]]=0;
	
			if(retVal==1)
			{
				valid = 1;
				checkThreeOfFourPlayer = mtfp;
			}
		}
	}
	return(checkThreeOfFourPlayer );
}


function computerLevel1Choice()
{
// If has 3 in a row, then tries to win, otherwise picks random

	var pieceVal = 0;
	var retVal = 0;
	var chosenColumn = 0;
	valid = 0;

	makeCopyOfBoard();
	chosenColumn = checkComputerThreeInRow();	

	if(valid==1)
	{
		pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

		BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
		boardColumnCount[chosenColumn-1]++;

		addPieceColour(pieceVal,2);
	}

	else if(valid==0)
	{
		// no winning lines, just pick random

		computerEasyChoice();
	}
	

}

function computerLevel2Choice()
{
// If has 3 in a row, then tries to win
// Then sees if player has 3 in a row, if so blocks
// else goes random

	var pieceVal = 0;
	var retVal = 0;
	var chosenColumn = 0;
	valid = 0;

	makeCopyOfBoard();
	chosenColumn = checkComputerThreeInRow();

	if(valid==1)
	{

		pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

		BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
		boardColumnCount[chosenColumn-1]++;

		addPieceColour(pieceVal,2);
	}

	else if(valid==0)
	{

		makeCopyOfBoard();
		chosenColumn = checkPlayerThreeInRow();

		if(valid==1)
		{
			pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

			BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
			boardColumnCount[chosenColumn-1]++;

			addPieceColour(pieceVal,2);
		}
		else
		{
			// no winning lines, just pick random

			computerEasyChoice();
		}
	}
	

}

function computerLevel3Choice()
{
// If has 3 in a row, then tries to win
// Then sees if player has 3 in a row, if so blocks
// Then checks if adding to a particular column will cause
// the computer to have an unstoppable three in a row, if so
// make the move
// Then checks if player on next move can add a piece that
// causes him to have an unstoppable three in a row
// Then checks if adding to a particular column will cause
// player to win on next move - so tries not to make that 
// move

	var pieceVal = 0;
	var retVal = 0;
	var chosenColumn = 0;
	valid = 0;
	var badColumnChoice = new Array(7);
	var foundBad = 0;
	var numBad = 0;

	for (ml3b=0; ml3b <7; ml3b++)
	{
		// initialize array that checks if a particular column is a bad choice
		// i.e. if putting a piece there will cause player to win on next move

		badColumnChoice[ml3b] = 0;
	}

	makeCopyOfBoard();
	chosenColumn = checkComputerThreeInRow();

	if(valid==1)
	{

		pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

		BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
		boardColumnCount[chosenColumn-1]++;

		addPieceColour(pieceVal,2);
	}

	else if(valid==0)
	{
		makeCopyOfBoard();
		chosenColumn = checkPlayerThreeInRow();

		if(valid==1)
		{
			pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

			BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
			boardColumnCount[chosenColumn-1]++;

			addPieceColour(pieceVal,2);
		}
		else
		{
			// Now check is adding a piece will allow it to have an unstoppable
			// three in a row, if so, make the move

			makeCopyOfBoard();

			chosenColumn = checkComputerUnstoppableThreeInRow();

			if(valid==1)
			{
				pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

				BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;
				boardColumnCount[chosenColumn-1]++;

				addPieceColour(pieceVal,2);
			}
			else
			{

				// Now check if the player adding a piece will allow it to have an unstoppable
				// three in a row, if so, block the move

				makeCopyOfBoard();

				chosenColumn = checkPlayerUnstoppableThreeInRow();

				if(valid==1)
				{
					pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

					BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;	
					boardColumnCount[chosenColumn-1]++;

					addPieceColour(pieceVal,2);
				}
				else
				{
					// now check if making a particular move will cause it to lose i.e.
					// putting a piece somewhere that allows the player to win on next move

					makeCopyOfBoard();

					for (ml3b=1; ml3b <8; ml3b++)
					{

						if(boardColumnCount[ml3b-1]<6)	// no point testing full column
						{			
							tempBoardArray[ml3b-1][boardColumnCount[ml3b-1]]=2;
							tempBoardColumnCount[ml3b-1]++;
					
							chosenColumn = checkPlayerThreeInRow();
							if(valid==1)
							{
								badColumnChoice[ml3b-1] = 1;
								foundBad = 1;
							}

							tempBoardColumnCount[ml3b-1]--;
							tempBoardArray[ml3b-1][boardColumnCount[ml3b-1]]=0;
						}

					}

					// ok, we have checked all columns, if found bad, try to avoid

					if(foundBad==1)
					{
						// ok, we found that there is a bad column to put things in, we need
						// to work out if there are any good columns available/left

						for (ml3b=0; ml3b <7; ml3b++)
						{
							if( (badColumnChoice[ml3b]==1) || (boardColumnCount[ml3b]==6) )
							{
								numBad++;
							}

						}

						if(numBad==7)
						{
							// all seven columns are either full, or placing a counter will result in 
							// the player winning, but we have no choice, so make our move
							computerEasyChoice();
						}
						else
						{

							computerRowChosen = 0;
							valid = 0;
							while(valid==0)
							{
								rndNum=Math.random();
								myVal=Math.round((numOfColumns-1)* rndNum )+1;
								if(badColumnChoice[myVal-1] != 1)
								{
									computerCheckMove(myVal);
								}
							}
	
							pieceVal = myVal + (computerRowChosen*7);
							BoardArray[myVal-1][computerRowChosen]=2;
							addPieceColour(pieceVal,2);
						}
					}
					else
					{
						// If very first move pick column 4

						if(boardColumnCount[3]==0)
						{
							BoardArray[3][0]=2;
							boardColumnCount[3]++;
							addPieceColour(4,2);

						}
						else
						{
							// See if it is possible to create a 3 of 4 situation for the computer
							makeCopyOfBoard();

							chosenColumn = checkComputerThreeOfFour();

							if(valid==1)
							{
								pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

								BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;	
								boardColumnCount[chosenColumn-1]++;

								addPieceColour(pieceVal,2);
							}
							else
							{
								// Finally see if it is possible to create a 3 of 4 situation for the computer
								makeCopyOfBoard();

								chosenColumn = checkPlayerThreeOfFour();
								if(valid==1)
								{
									pieceVal = chosenColumn + (boardColumnCount[chosenColumn-1]*7);

									BoardArray[chosenColumn-1][boardColumnCount[chosenColumn-1]]=2;	
									boardColumnCount[chosenColumn-1]++;

									addPieceColour(pieceVal,2);
								}
								else
								{
									// If none of the above, then we place our piece in a random column

									computerEasyChoice();
								}
							}
						}
					}
				}
			}
		}
	}
}

function computerChoice() 
{
	if(anyMoveAllowed == 1 && computerAllowedMove==1)
	{
		if(possible==1)
		{
			// the computer makes its move very quickly, I put in a
			// tiny delay to make it as if it is 'thinking' about its 
			// move

			var dateMC = new Date();
			var curDateMC = null;

			do { curDateMC = new Date(); } 
				while(curDateMC-dateMC < 500);

			if(difficulty==0)
			{
				computerEasyChoice();
			}
			else if(difficulty==1)
			{
				computerLevel1Choice();
			}
			else if(difficulty==2)
			{
				computerLevel2Choice();
			}
			else if(difficulty==3)
			{
				computerLevel3Choice();
			}

			computerAllowedMove = 0;	// stop computer making another move till player has made theirs
		
		}
		checkGame();
	}
}

function checkMovesAllowed()
{
	if(playerMoveMade>0)
	{
		// player has made a move 
		makePlayerMove();
	}
	if(computerAllowedMove == 1)
	{
		checkGame();
		if(possible==1)
		{
			computerChoice();
		}
	}

	if ((winner==0)&&(possible!=0))
	{
		x = setTimeout(checkMovesAllowed,750);
	}
}

function gameover() 
{
	document.getElementById("infobox").innerHTML="Game over.";
}

function checkGame() 
{
	checkWinner();
	checkFreeSpace();
	if (winner==1)
	{
		if(scoreUpdated==0)
		{
			numWinsPlayerThisSession++;
			scoreUpdated=1;
		} 
		document.getElementById("infobox").innerHTML="You win";

		updateScoreboard();
	}
	if (winner==2)
	{
		if(scoreUpdated==0)
		{
			numWinsComputerThisSession++;
			scoreUpdated=1;
		} 
		document.getElementById("infobox").innerHTML="I win";

		updateScoreboard(); 
	}
	if ((winner==0)&&(possible==0))
	{ 
		document.getElementById("infobox").innerHTML="A draw"; 
	}

}

function playAgain() 
{
	reset();
}

function updateScoreboard()
{
	myObj = document.getElementById("playernowscore");
	myObj.innerHTML=numWinsPlayerThisSession;

	myObj = document.getElementById("computernowscore");
	myObj.innerHTML=numWinsComputerThisSession;

}

function reset() 
{
	possible = 0;
	computerAllowedMove = 0;
	document.getElementById("infobox").innerHTML="Please wait";

	anyMoveAllowed = 0;	// stop till reset everything

	dateRS = new Date();
	curDateRS = null;

	do { curDateRS = new Date(); } 
		while(curDateRS-dateRS < 1000);


	scoreUpdated = 0;

	computerMoveMade = 0;
	playerClicked = 0;
	playerMoveMade = 0;

	resetBoardArray();

	boardColumn1 = 0;
	boardColumn2 = 0; 
	boardColumn3 = 0; 
	boardColumn4 = 0; 
	boardColumn5 = 0; 
	boardColumn6 = 0; 
	boardColumn7 = 0; 

	winner=0;

	updateScoreboard();


	x = setTimeout(clearBoardAndStartGame,500);

}

function clearBoardAndStartGame()
{
	document.getElementById("infobox").value=" ";

	for (i=0; i <42; i++)
	{
		j = "a" + (i+1);
		myObj = document.getElementById(j);
		myObj.style.backgroundColor = backgroundBoardColour;
		myObj.innerHTML="";
	}

	possible = 1;
	anyMoveAllowed = 1;

	if(goesfirst==0)
	{
		document.getElementById("infobox").innerHTML="You go first";
		goesfirst++;
		playerAllowedMove = 1;
	}
	else
	{
		document.getElementById("infobox").innerHTML="I go first";
		goesfirst = 0;
		playerAllowedMove = 0;	// block player till computer makes move
		anyMoveAllowed = 1;
		computerAllowedMove = 1;
	}

	x = setTimeout(checkMovesAllowed,1000);	// start main game engine
}

function resetScores()
{
	numWinsPlayerThisSession = 0;
	numWinsComputerThisSession = 0;
	updateScoreboard();
}

function pickDifficulty(difflevel)
{
	difficulty = difflevel;
}