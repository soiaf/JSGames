//
// Othello
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
//

// Our board is a 8x8 grid, so 64 positions

var BoardArray = new Array(64);

// This array is used to show the value of squares
// that could be converted if a move was made to this
// square

var checkBoardArray = new Array(64);

// variable possible shows whether the player
// is allowed make their move. 1 means they can

var possible = 1;

// variable computerAllowedMove shows whether the computer
// is allowed make their move. 1 means they can
// This would be set to 0 if the player is making their  move

var computerAllowedMove = 0;

// Background colour for board

var backgroundBoardColour = "#ccffcc";

// Colour for computer piece (white)

var computerColour = "#ffffff";

// Colour for player piece (black)

var playerColour = "#000000";

// Possible move colour for player

var possibleColour = "#66ff66";

// Decides whether any move is allowed. This is to stop the computer 
// making its move before boards redrawn, all calculations made etc.

anyMoveAllowed = 1;

// Decides whether player is allowed play or not, removes possibility
// of a quick double click (1 means allowed play)

var playerAllowedMove = 1;

// The game has 3 difficulty levels
// 0 - Puts in square that gives it the most conversions
// 1 - Puts in squares that gives most conversions, but tries
//     to avoid 3 squares around each corner, and tries to get corners
// 2 - Based on even number theory. Tries to place piece in a free area
//     that has an odd number of empty squares. Uses weightings of squares
//     to choose square to place. Weights can dynamically change

var difficulty = 0;

// variable goesfirst holds a value that gives which player goes
// first, if 0 its the player, if 1 it is the computer
// The first time the page is loaded the player will go first

var goesfirst = 0;

// Holds whether there are any valid moves available to the player

var validMovesLeftPlayer = 1;

// Holds whether there are any valid moves available to the computer

var validMovesLeftComputer = 1;

// showPossibleMoves shows the possible choices that the player 
// has available

var showPossibleMoves = 0;

// lastShowPossibleMovesVal stores the previous value for showPossibleMoves 
// This is used as their is a continuous call to see if showPossibleMoves has
// been modified. This enables us to see if a change has been recently made

var lastShowPossibleMovesVal = 0;

// This is the default weights that we attach to each square, these
// weights can change throughout the game. The point on this is to
// attract the computer player to place in certain places (for example
// corners) while trying to avoid other squares (the diagonal beside
// a corner for example)

var initialWeights = new Array(50,-3,5,5,5,5,-3,50,
					 -3 ,-15,-2,-2,-2,-2,-15,-3,
					 5,0,2,0,0,2,0,5,
                               5,0,0,2,2,0,0,5,
					 5,0,0,2,2,0,0,5,
					 5,0,2,0,0,2,0,5,
					 -3 ,-15,-2,-2,-2,-2,-15,-3,
					 50,-3,5,5,5,5,-3,50);

// This array holds the weights that are modified throughout the game

var dynamicWeights = new Array(64);

// This holds the value of the square that the player last played
// Initially set to -1 (not valid move)

var lastPlayerMove = -1;

function findValidMoves(whichPlayer)
{

	// function checks the board looking for valid moves
	valOfPieceToBeChecked = 1;
	valOfOpponent = 2;

	if(whichPlayer==2)
	{
		valOfPieceToBeChecked = 2;
		valOfOpponent = 1;
	}

	for (i=0; i <64; i++)
	{
		// re-initialize our checking array
		checkBoardArray[i] = 0;
	}
	
	for (i=0; i <64; i++)
	{
		numOfSquares = 0;
		if(BoardArray[i]==0)
		{	
			// only check squares that are free

			// tempRow holds row, tempCol holds the column

			tempRow = Math.floor(i/8);
			tempCol = (i - (8 * tempRow));

			// check left
			if(tempCol!=0)
			{
				// we don't bother checking squares on the far left of board
				if(BoardArray[i-1]==valOfOpponent)
				{
					// only interested if square to left is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					squaresToCheck = tempCol;
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i-tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i-tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check diagonally up left (nw)

			if(tempCol!=0 && tempRow!=7)
			{
				// we don't bother checking squares on the far left of board or on top row
				if(BoardArray[i+7]==valOfOpponent)
				{
					// only interested if square to nw is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					check1 = tempCol;
					check2 = 7-tempRow;
					// use the smallest of check1 and check2
					squaresToCheck = check1;
					if(squaresToCheck>check2)
					{
						squaresToCheck = check2;
					}
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i+(tempCheck*8)-tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i+(tempCheck*8)-tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}


			// check diagonally down left (sw)

			if(tempCol!=0 && tempRow!=0)
			{
				// we don't bother checking squares on the far left of board or on bottom row
				if(BoardArray[i-9]==valOfOpponent)
				{
					// only interested if square to sw is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					check1 = tempCol;
					check2 = tempRow;
					// use the smallest of check1 and check2
					squaresToCheck = check1;
					if(squaresToCheck>check2)
					{
						squaresToCheck = check2;
					}
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i-(tempCheck*8)-tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i-(tempCheck*8)-tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check up
			if(tempRow!=7)
			{
				// we don't bother checking squares on the very top of board
				if(BoardArray[i+8]==valOfOpponent)
				{
					// only interested if square up is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					squaresToCheck = 7-tempRow;
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i+(tempCheck*8)]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i+(tempCheck*8)]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check diagonally up right (ne)

			if(tempCol!=7 && tempRow!=7)
			{
				// we don't bother checking squares on the far right of board or on top row
				if(BoardArray[i+9]==valOfOpponent)
				{
					// only interested if square to ne is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					check1 = 7-tempCol;
					check2 = 7-tempRow;
					// use the smallest of check1 and check2
					squaresToCheck = check1;
					if(squaresToCheck>check2)
					{
						squaresToCheck = check2;
					}
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i+(tempCheck*8)+tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i+(tempCheck*8)+tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check right
			if(tempCol!=7)
			{
				// we don't bother checking squares on the far right of board
				if(BoardArray[i+1]==valOfOpponent)
				{
					// only interested if square to right is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					squaresToCheck = 7-tempCol;
					loopExit = 1;

					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i+tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i+tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check diagonally down right (se)

			if(tempCol!=7 && tempRow!=0)
			{
				// we don't bother checking squares on the far right of board or on bottom row
				if(BoardArray[i-7]==valOfOpponent)
				{
					// only interested if square to nw is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					check1 = 7-tempCol;
					check2 = tempRow;
					// use the smallest of check1 and check2
					squaresToCheck = check1;
					if(squaresToCheck>check2)
					{
						squaresToCheck = check2;
					}
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i-(tempCheck*8)+tempCheck]== 0 )	// no good
						{
							loopExit = 0;
						}
						if(BoardArray[i-(tempCheck*8)+tempCheck]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}

			// check down
			if(tempRow!=0)
			{
				// we don't bother checking squares on the very bottom of board
				if(BoardArray[i-8]==valOfOpponent)
				{
					// only interested if square up is occupied and must
					// be of the opposing player type

					tempCheck = 1;
					squaresToCheck = tempRow;
					loopExit = 1;
					while(tempCheck<=squaresToCheck && loopExit==1 )
					{
						if(BoardArray[i-(tempCheck*8)]== 0 )	// no good, sorry
						{
							loopExit = 0;
						}
						if(BoardArray[i-(tempCheck*8)]== valOfPieceToBeChecked )	// good move
						{
							loopExit = 0;
							numOfSquares = numOfSquares + (tempCheck-1);
						}
						tempCheck++;
				
					}
				
				}
			}


		}

	checkBoardArray[i] = numOfSquares;

	}

}

function checkMovesAvailable(whichPlayer)
{
	findValidMoves(whichPlayer);

	movesAvailable = 0;

	for (i=0; i <64; i++)
	{
		if(checkBoardArray[i]>0)
		{
			movesAvailable = 1;
		}
	}

	return(movesAvailable);
}

function showValidMovesForPlayer()
{
	if(showPossibleMoves == 1)
	{
		for (i=0; i <64; i++)
		{
			if(checkBoardArray[i]>0)
			{
				tempSquare = i + 1;
				j = "a" + tempSquare ;
				myObj = document.getElementById(j);

				myObj.style.backgroundColor=possibleColour;
			}
		}
	}
}

function playMove(chName)
{
	if(possible==1)
	{
		checkGame();

		if(playerAllowedMove==1)
		{
			document.getElementById("infobox").innerHTML="";

			proposedMove=chName;
			proposedMove--;
			if(BoardArray[proposedMove]==0)	// place is empty
			{
				// next check if proposed placement is valid

				findValidMoves(1);
			
				if(checkBoardArray[proposedMove]>0)
				{
					placePiece(1,proposedMove);
					playerAllowedMove = 0;
					lastPlayerMove = proposedMove;
					showBoard();
					computerAllowedMove = 1;
				}
			}
		}
	}
}

function placePiece(placeWhichPlayer,placeWhichSquare)
{
	// places the piece on the board and converts as required

	// First thing to do is erase the indicators of possible moves

	tempSquare = placeWhichSquare + 1;

	colourToPaint = "";
	valOfPieceToBeChecked = 1;

	if(placeWhichPlayer==1)
	{
		valOfOpponent = 2;
		BoardArray[placeWhichSquare] = 1;
	}
	else
	{
		valOfOpponent = 1;
		BoardArray[placeWhichSquare] = 2;
		valOfPieceToBeChecked = 2;
	}

	// tempRow holds row, tempCol holds the column

	tempRow = Math.floor(placeWhichSquare/8);
	tempCol = (placeWhichSquare - (8 * tempRow));

	// check left

	numOfSquares = 0;

	if(tempCol!=0)
	{
		// we don't bother checking squares on the far left of board
		if(BoardArray[placeWhichSquare-1]==valOfOpponent)
		{
			// only interested if square to left is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			squaresToCheck = tempCol;
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare-tempCheck]== 0 )	// no good
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare-tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
				
		}

		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare-tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check diagonally up left (nw)
	numOfSquares = 0;

	if(tempCol!=0 && tempRow!=7)
	{
		// we don't bother checking squares on the far left of board or on top row
		if(BoardArray[placeWhichSquare+7]==valOfOpponent)
		{
			// only interested if square to nw is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			check1 = tempCol;
			check2 = 7-tempRow;
			// use the smallest of check1 and check2
			squaresToCheck = check1;
			if(squaresToCheck>check2)
			{
				squaresToCheck = check2;
			}
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare+(tempCheck*8)-tempCheck]== 0 )	// no good, sorry
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare+(tempCheck*8)-tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
		
			}
				
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare+(tempCheck*8)-tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}


	// check diagonally down left (sw)

	numOfSquares = 0;

	if(tempCol!=0 && tempRow!=0)
	{
		// we don't bother checking squares on the far left of board or on bottom row
		if(BoardArray[placeWhichSquare-9]==valOfOpponent)
		{
			// only interested if square to sw is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			check1 = tempCol;
			check2 = tempRow;
			// use the smallest of check1 and check2
			squaresToCheck = check1;
			if(squaresToCheck>check2)
			{
				squaresToCheck = check2;
			}
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare-(tempCheck*8)-tempCheck]== 0 )	// afraid not
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare-(tempCheck*8)-tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
				
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare-(tempCheck*8)-tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check up

	numOfSquares = 0;

	if(tempRow!=7)
	{
		// we don't bother checking squares on the very top of board
		if(BoardArray[placeWhichSquare+8]==valOfOpponent)
		{
			// only interested if square up is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			squaresToCheck = 7-tempRow;
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare+(tempCheck*8)]== 0 )	// no way
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare+(tempCheck*8)]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
		
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare+(tempCheck*8)] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check diagonally up right (ne)

	numOfSquares = 0;

	if(tempCol!=7 && tempRow!=7)
	{
		// we don't bother checking squares on the far right of board or on top row
		if(BoardArray[placeWhichSquare+9]==valOfOpponent)
		{
			// only interested if square to ne is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			check1 = 7-tempCol;
			check2 = 7-tempRow;
			// use the smallest of check1 and check2
			squaresToCheck = check1;
			if(squaresToCheck>check2)
			{
				squaresToCheck = check2;
			}
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare+(tempCheck*8)+tempCheck]== 0 )	// no go
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare+(tempCheck*8)+tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
							
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare+(tempCheck*8)+tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check right

	numOfSquares = 0;

	if(tempCol!=7)
	{
		// we don't bother checking squares on the far right of board
		if(BoardArray[placeWhichSquare+1]==valOfOpponent)
		{
			// only interested if square to right is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			squaresToCheck = 7-tempCol;
			loopExit = 1;

			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare+tempCheck]== 0 )	// sorry, no
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare+tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
				
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare+tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check diagonally down right (se)

	numOfSquares = 0;

	if(tempCol!=7 && tempRow!=0)
	{
		// we don't bother checking squares on the far right of board or on bottom row
		if(BoardArray[placeWhichSquare-7]==valOfOpponent)
		{
			// only interested if square to nw is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			check1 = 7-tempCol;
			check2 = tempRow;
			// use the smallest of check1 and check2
			squaresToCheck = check1;
			if(squaresToCheck>check2)
			{
				squaresToCheck = check2;
			}
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare-(tempCheck*8)+tempCheck]== 0 )	// good move? no!
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare-(tempCheck*8)+tempCheck]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
				
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare-(tempCheck*8)+tempCheck] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}

	// check down

	numOfSquares = 0;

	if(tempRow!=0)
	{
		// we don't bother checking squares on the very bottom of board
		if(BoardArray[placeWhichSquare-8]==valOfOpponent)
		{
			// only interested if square up is occupied and must
			// be of the opposing player type

			tempCheck = 1;
			squaresToCheck = tempRow;
			loopExit = 1;
			while(tempCheck<=squaresToCheck && loopExit==1 )
			{
				if(BoardArray[placeWhichSquare-(tempCheck*8)]== 0 )	// not a good move
				{
					loopExit = 0;
				}
				if(BoardArray[placeWhichSquare-(tempCheck*8)]== valOfPieceToBeChecked )	// good move
				{
					loopExit = 0;
					numOfSquares = numOfSquares + (tempCheck-1);
				}
				tempCheck++;
				
			}
				
		}
		if(numOfSquares>0)
		{
			tempCheck = 1;
			while(tempCheck<=numOfSquares)
			{
				BoardArray[placeWhichSquare-(tempCheck*8)] = valOfPieceToBeChecked;
				tempCheck++;
			}
		}
	}
}

function calculateEvenTheory(possibleSquare)
{
	// This function examines the list of possible moves for the computer play
	// and determines whether they contain an even or odd number of empty squares
	// Even number theory says that it is better to play into an odd number area
	// as you would then get to place the last square
	// Returns one of 2 possible values
	// 0 - area has even number of empty squares
	// 1 - area has odd number of empty squares

	// First we make a copy of the current board

	evenBoardArray = new Array(64);

	for (i=0; i <64; i++)
	{
		evenBoardArray[i] = BoardArray[i];
	}

	// We test how many empty squares are potentially in a region by assigning a
	// value of 3 (not empty, player or computer)

	evenBoardArray[possibleSquare] = 3;

	newEmptySquareFound = 1;

	while(newEmptySquareFound==1)
	{
		newEmptySquareFound = 0;

		for (i=0; i <64; i++)
		{
			if(evenBoardArray[i]==3)
			{
				// so, we iteratively look for squares that are empty and then
				// try to find empty squares around them

				tempRow = Math.floor(i/8);
				tempCol = (i - (8 * tempRow));

				if(tempCol !=0)
				{
					// west
					if(evenBoardArray[i-1] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i-1] = 3;
					}
				}
				if(tempCol !=0 && tempRow!=7)
				{
					// north west
					if(evenBoardArray[i+7]== 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i+7] = 3;
					}
				}
				if(tempRow!=7)
				{
					// north
					if(evenBoardArray[i+8] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i+8] = 3;
					}
				}
				if(tempRow!=7 && tempCol!=7)
				{
					// north east
					if(evenBoardArray[i+9] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i+9] = 3;
					}
				}
				if(tempCol!=7)
				{
					// east
					if(evenBoardArray[i+1] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i+1] = 3;
					}
				}
				if(tempRow!=0 && tempCol!=7)
				{
					// south east
					if(evenBoardArray[i-7] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i-7] = 3;
					}
				}
				if(tempRow!=0)
				{
					// south
					if(evenBoardArray[i-8] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i-8] = 3;
					}
				}
				if(tempRow!=0 && tempCol!=0)
				{
					// south west
					if(evenBoardArray[i-9] == 0)
					{
						newEmptySquareFound = 1;
						evenBoardArray[i-9] = 3;
					}
				}
			}
		}
	}

	// ok, now we calculate the number of empty squares

	numOfEmptySquares = 0;

	for (i=0; i <64; i++)
	{
		if(evenBoardArray[i]==3)
		{
			numOfEmptySquares++;
		}
	}

	if (numOfEmptySquares%2) 
	{
		return(1); 
	} 
	else 
	{ 
		return(0); 
	} 



}

function computerChoice() 
{
	if(computerAllowedMove == 1)
	{
		if(anyMoveAllowed == 1 && playerAllowedMove==0)
		{
			movesAvail = checkMovesAvailable(2);
			if(movesAvail==0)
			{
				// No moves available for computer
				validMovesLeftComputer = 0;
				playerAllowedMove = 1;
			}
			else
			{
				validMovesLeftComputer = 1;
			}
		
			if(validMovesLeftComputer==1)
			{
				// the computer makes its move very quickly, I put in a
				// tiny delay to make it as if it is 'thinking' about its 
				// move

				dateMC = new Date();
				curDateMC = null;

				do { curDateMC = new Date(); } 
					while(curDateMC-dateMC < 1250);

				if(difficulty==0)
				{
					computerLevel0Choice();
				}
				else if(difficulty==1)
				{
					computerLevel1Choice();
				}
				else if(difficulty==2)
				{
					adjustWeightings();
					computerLevel2Choice();
				}
			}
			showBoard();
			computerAllowedMove = 0;
			checkGame();
		}
	}
}

function adjustWeightings()
{
	// Here is where we adjust weights based on players last move

	if(lastPlayerMove>-1)
	{
			if( (lastPlayerMove==0) || (lastPlayerMove==7) || (lastPlayerMove==56) || (lastPlayerMove==63) )
			{
				// player has just made a corner move

				variableX = lastPlayerMove;

				if(lastPlayerMove==0 || lastPlayerMove==56)
				{
					if(BoardArray[variableX +1]==0 && BoardArray[variableX  + 2]==0)
					{
						dynamicWeights[variableX+1] = dynamicWeights[variableX +1] -1;
					}
					if(BoardArray[variableX +1]==1 && BoardArray[variableX +2]==0 && BoardArray[variableX+3]==0)
					{
						dynamicWeights[variableX +2] = dynamicWeights[variableX+2] - 3;
					}
					if(BoardArray[variableX +1]==1 && BoardArray[variableX +2]==1 && BoardArray[variableX +3]==0 && BoardArray[variableX +4]==0)
					{
						dynamicWeights[variableX +3] = dynamicWeights[variableX +3] - 3;
					}
					if(BoardArray[variableX  + 1]==1 && BoardArray[variableX  + 2]==1 && BoardArray[variableX  + 3]==1 && BoardArray[variableX  + 4]==0 && BoardArray[variableX  + 5]==0)
					{
						dynamicWeights[variableX  + 4] = dynamicWeights[variableX + 4] - 3;
					} 
				}
				if(lastPlayerMove==7 || lastPlayerMove==63)
				{
					if(BoardArray[variableX-1]==0 && BoardArray[variableX-2]==0)
					{
						dynamicWeights[variableX-1] = dynamicWeights[variableX-1] -1;
					}
					if(BoardArray[variableX -1]==1 && BoardArray[variableX -2]==0 && BoardArray[variableX-3]==0)
					{
						dynamicWeights[variableX-2] = dynamicWeights[variableX-2] - 3;
					}
					if(BoardArray[variableX -1]==1 && BoardArray[variableX -2]==1 && BoardArray[variableX -3]==0 && BoardArray[variableX -4]==0)
					{
						dynamicWeights[variableX-3] = dynamicWeights[variableX-3] - 3;
					}
					if(BoardArray[variableX  - 1]==1 && BoardArray[variableX  - 2]==1 && BoardArray[variableX  - 3]==1 && BoardArray[variableX  - 4]==0 && BoardArray[variableX  - 5]==0)
					{
						dynamicWeights[variableX-4] = dynamicWeights[variableX-4] - 3;
					} 
				}
				if(lastPlayerMove==0 || lastPlayerMove==7)
				{
					if(BoardArray[variableX +8]==0 && BoardArray[variableX  + 16]==0)
					{
						dynamicWeights[variableX+8] = dynamicWeights[variableX +8] -1;
					}
					if(BoardArray[variableX +8]==1 && BoardArray[variableX +16]==0 && BoardArray[variableX+24]==0)
					{
						dynamicWeights[variableX +16] = dynamicWeights[variableX+16] - 3;
					}
					if(BoardArray[variableX +8]==1 && BoardArray[variableX +16]==1 && BoardArray[variableX +24]==0 && BoardArray[variableX +32]==0)
					{
						dynamicWeights[variableX +24] = dynamicWeights[variableX +24] - 3;
					}
					if(BoardArray[variableX + 8]==1 && BoardArray[variableX + 16]==1 && BoardArray[variableX  + 24]==1 && BoardArray[variableX  + 32]==0 && BoardArray[variableX  + 40]==0)
					{
						dynamicWeights[variableX  + 32] = dynamicWeights[variableX + 32] - 3;
					} 
				}
				if(lastPlayerMove==56 || lastPlayerMove==63)
				{
					if(BoardArray[variableX -8]==0 && BoardArray[variableX  - 16]==0)
					{
						dynamicWeights[variableX-8] = dynamicWeights[variableX -8] -1;
					}
					if(BoardArray[variableX -8]==1 && BoardArray[variableX -16]==0 && BoardArray[variableX-24]==0)
					{
						dynamicWeights[variableX -16] = dynamicWeights[variableX-16] - 3;
					}
					if(BoardArray[variableX -8]==1 && BoardArray[variableX -16]==1 && BoardArray[variableX -24]==0 && BoardArray[variableX -32]==0)
					{
						dynamicWeights[variableX -24] = dynamicWeights[variableX -24] - 3;
					}
					if(BoardArray[variableX - 8]==1 && BoardArray[variableX - 16]==1 && BoardArray[variableX  - 24]==1 && BoardArray[variableX  - 32]==0 && BoardArray[variableX  - 40]==0)
					{
						dynamicWeights[variableX  - 32] = dynamicWeights[variableX - 32] - 3;
					} 
				}
			}
	}
	
	// lastly we reset the value 

	lastPlayerMove = -1;
}

function computerLevel2Choice()
{
	// At level 2 we no longer use any of the 'greedy algorithm' code. Instead
	// we use a mixture of weightings and even number theory. This is based on
	// the idea that it is better to place a square in a region that has an
	// odd number of squares (to force your opponent to make a move into an
	// even area). This gives an advantage as the person to place into an odd
	// number area should be able to make the last move into that area

	initialWorst = -200;	// could not actually be this low
	bestMoveSquare = 0;

	bestMoveVal = initialWorst;	// set to very negative
	canGo = 0;
	variableWeight = 0;	// can vary per potential move

	bestOddMoveVal = initialWorst;
	bestEvenMoveVal = initialWorst;
	bestOddMoveSquare = 0;
	bestEvenMoveSquare = 0;

	oddMoveAvailable = 0;
	evenMoveAvailable = 0;

	for (ml2=0; ml2 <64; ml2++)
	{
		if(checkBoardArray[ml2]>0)	// can make a move in that square
		{
			variableWeight = 0;
			canGo = 1;

			// Call even number theory calculator

			evenOrOdd = calculateEvenTheory(ml2);

			if(evenOrOdd==1)
			{
				// odd
				oddMoveAvailable = 1; 

				if( ( dynamicWeights[ml2] + variableWeight) > bestOddMoveVal )
				{
					bestOddMoveSquare = ml2;
					bestOddMoveVal = dynamicWeights[ml2] + variableWeight ;
				}
			}

			if(evenOrOdd==0)
			{
				// even

				evenMoveAvailable = 1;
				if( ( dynamicWeights[ml2] + variableWeight) > bestEvenMoveVal )
				{
					bestEvenMoveSquare = ml2;
					bestEvenMoveVal = dynamicWeights[ml2] + variableWeight ;
				}
			}
		}
	}

	// At this stage we have the best even move value and the best odd move value
	// First we check if either is a corner, we always go for that. We would then
	// try the best odd move, unless there is no odd move available
	if( (evenMoveAvailable==1) && ((bestEvenMoveSquare==0) || (bestEvenMoveSquare==7) || (bestEvenMoveSquare==56) || (bestEvenMoveSquare==63)) )
	{
		bestMoveSquare = bestEvenMoveSquare;
	}
	else
	{
		if(oddMoveAvailable==1)
		{
			// always go for the odd move, unless its negative and 'even move' available which is positive
			if( (bestOddMoveVal <0) && (evenMoveAvailable==1) && (bestEvenMoveVal>=0) )
			{
				bestMoveSquare = bestEvenMoveSquare;
			}
			else
			{
				// make the odd move
				bestMoveSquare = bestOddMoveSquare;
			}
		}
		else
		{
			// no odd moves available, go for even move (if available)
			bestMoveSquare = bestEvenMoveSquare;
		}
	}

	if(canGo==1)	// a move of some sort is available
	{
		if(bestMoveSquare==0)
		{
			// corner piece, change weight of diagonal beside it, also slightly add to 
			// either side
			if(BoardArray[1]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[1] = dynamicWeights[1] + 6;
			}
			else
			{
				dynamicWeights[2] = dynamicWeights[2] + 3;
			}
			if(BoardArray[8]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[8] = dynamicWeights[8] + 6;
			}
			else
			{
				dynamicWeights[16] = dynamicWeights[16] + 3;
			}

			dynamicWeights[9] = dynamicWeights[9] + 25;
		}
		if(bestMoveSquare==7)
		{
			// corner piece, change weight of diagonal beside it, also slightly add to 
			// either side
				
			if(BoardArray[6]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[6] = dynamicWeights[6] + 6;
			}
			else
			{
				dynamicWeights[5] = dynamicWeights[5] + 3;
			}
			if(BoardArray[15]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[15] = dynamicWeights[15] + 6;
			}
			else
			{
				dynamicWeights[23] = dynamicWeights[23] + 3;
			}

			dynamicWeights[14] = dynamicWeights[14] + 25;
		}
		if(bestMoveSquare==56)
		{
			// corner piece, change weight of diagonal beside it, also slightly add to 
			// either side
				
			if(BoardArray[57]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[57] = dynamicWeights[57] + 6;
			}
			else
			{
				dynamicWeights[58] = dynamicWeights[58] + 3;
			}
			if(BoardArray[48]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[48] = dynamicWeights[48] + 6;
			}
			else
			{
				dynamicWeights[40] = dynamicWeights[40] + 3;
			}

			dynamicWeights[49] = dynamicWeights[49] + 25;
		}
		if(bestMoveSquare==63)
		{
			// corner piece, change weight of diagonal beside it, also slightly add to 
			// either side
				
			if(BoardArray[62]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[62] = dynamicWeights[62] + 6;
			}
			else
			{
				dynamicWeights[61] = dynamicWeights[61] + 3;
			}

			if(BoardArray[55]==0)
			{
				// if square beside corner already taken, increase weight of square beside that
				dynamicWeights[55] = dynamicWeights[55] + 6;
			}
			else
			{
				dynamicWeights[47] = dynamicWeights[47] + 3;
			}

			dynamicWeights[54] = dynamicWeights[54] + 25;
		}


		placePiece(2,bestMoveSquare);
	}


	playerAllowedMove = 1;

}



function computerLevel1Choice()
{
	// At level 1 the computer plays using a weights system. Each square
	// has a certain weighting that influences whether a square should be
	// placed these. This weighting is modified through the course of the game
	// One in 8 goes (randomly) not the best move is made, this is to make the
	// computer player not completely predictable

	initialWorst = -200;	// could not actually be this low
	bestMoveSquare = 0;
	secondBestSquare = 0;
	secondBestVal = 0;
	bestMoveVal = initialWorst;	// set to very negative
	canGo = 0;
	variableWeight = 0;	// can vary per potential move
	

	for (i=0; i <64; i++)
	{
		if(checkBoardArray[i]>0)
		{
			variableWeight = 0;
			canGo = 1;
				
			if(i==1 && BoardArray[2]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==6 && BoardArray[5]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==8 && BoardArray[16]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==15 && BoardArray[23]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==48 && BoardArray[40]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==57 && BoardArray[58]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==63 && BoardArray[62]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}
			if(i==55 && BoardArray[47]==1)
			{
				// If picking a square beside the corner, but the opponent (the player)
				// has a square beside it and can jump immediately, give a strong negative
				variableWeight = variableWeight - 12;
			}


			if( (checkBoardArray[i] + dynamicWeights[i] + variableWeight) > bestMoveVal )
			{
				if(bestMoveVal> initialWorst )
				{
					secondBestSquare = bestMoveSquare;
					secondBestVal = bestMoveVal ;
				}
				bestMoveSquare = i;
				bestMoveVal = checkBoardArray[i] + dynamicWeights[i] + variableWeight ;
			}
		}
	}

	randomNum = Math.floor(Math.random() * 8);
	if(randomNum==3 && secondBestVal>0)
	{
		// 1 in 8 times we do something different, pick the 2nd best move
		placePiece(2,secondBestSquare);
	}
	else
	{
		if(canGo==1)	// a move of some sort is available
		{
			if(bestMoveSquare==0)
			{
				// corner piece, change weight of diagonal beside it, also slightly add to 
				// either side
				if(BoardArray[1]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[1] = dynamicWeights[1] + 6;
				}
				else
				{
					dynamicWeights[2] = dynamicWeights[2] + 3;
				}
				if(BoardArray[8]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[8] = dynamicWeights[8] + 6;
				}
				else
				{
					dynamicWeights[16] = dynamicWeights[16] + 3;
				}

				dynamicWeights[9] = dynamicWeights[9] + 25;
			}
			if(bestMoveSquare==7)
			{
				// corner piece, change weight of diagonal beside it, also slightly add to 
				// either side
				
				if(BoardArray[6]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[6] = dynamicWeights[6] + 6;
				}
				else
				{
					dynamicWeights[5] = dynamicWeights[5] + 3;
				}
				if(BoardArray[15]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[15] = dynamicWeights[15] + 6;
				}
				else
				{
					dynamicWeights[23] = dynamicWeights[23] + 3;
				}

				dynamicWeights[14] = dynamicWeights[14] + 25;
			}
			if(bestMoveSquare==56)
			{
				// corner piece, change weight of diagonal beside it, also slightly add to 
				// either side
				
				if(BoardArray[57]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[57] = dynamicWeights[57] + 6;
				}
				else
				{
					dynamicWeights[58] = dynamicWeights[58] + 3;
				}
				if(BoardArray[48]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[48] = dynamicWeights[48] + 6;
				}
				else
				{
					dynamicWeights[40] = dynamicWeights[40] + 3;
				}

				dynamicWeights[49] = dynamicWeights[49] + 25;
			}
			if(bestMoveSquare==63)
			{
				// corner piece, change weight of diagonal beside it, also slightly add to 
				// either side
				
				if(BoardArray[62]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[62] = dynamicWeights[62] + 6;
				}
				else
				{
					dynamicWeights[61] = dynamicWeights[61] + 3;
				}

				if(BoardArray[55]==0)
				{
					// if square beside corner already taken, increase weight of square beside that
					dynamicWeights[55] = dynamicWeights[55] + 6;
				}
				else
				{
					dynamicWeights[47] = dynamicWeights[47] + 3;
				}

				dynamicWeights[54] = dynamicWeights[54] + 25;
			}


			placePiece(2,bestMoveSquare);
		}
	}



	playerAllowedMove = 1;

}

function computerLevel0Choice()
{
	// At level 0 the computer plays a very simple game. It checks
	// each of its possible moves for the number of squares that it
	// could turn, and then picks the move that generates the most
	// A slight tweak is that if a corner is available it always 
	// picks that

	bestMoveSquare = 0;
	bestMoveVal = 0;
	cornerAvailable = 0;
	

	for (i=0; i <64; i++)
	{
		if(checkBoardArray[i]>0)
		{
			if(i==0 || i==7 || i==56 || i==63)
			{
				cornerAvailable = 1;
				bestMoveSquare = i;
				bestMoveVal = 100;		// 100 > 64, so this will be chosen move
			}
			if(checkBoardArray[i] > bestMoveVal )
			{
				bestMoveSquare = i;
				bestMoveVal = checkBoardArray[i] ;
			}
		}
	}

	if(bestMoveVal >0)
	{
		placePiece(2,bestMoveSquare);
	}

	playerAllowedMove = 1;

}

function playAgain() 
{
	reset();
	if(goesfirst==0)
	{
		document.getElementById("infobox").innerHTML="You go first";
		goesfirst++;
		checkGame();
		playerAllowedMove = 1;
		computerAllowedMove = 0;
	}
	else
	{
		document.getElementById("infobox").innerHTML="I go first";
		goesfirst = 0;
		playerAllowedMove = 0;	// block player till computer makes move
		computerAllowedMove = 1;
		anyMoveAllowed = 1;
	}

}

function showBoard()
{
	for (i=0; i <64; i++)
	{
		j = "a" + (i+1);
		myObj = document.getElementById(j);
		if(BoardArray[i]==0)
		{
			myObj.style.backgroundColor = backgroundBoardColour;
			myObj.innerHTML="";
		}
		if(BoardArray[i]==1)
		{
			myObj.style.backgroundColor = backgroundBoardColour;
			myObj.innerHTML="<img src='blackdisc.gif' width='16' height='16' align='center' />";
		}
		if(BoardArray[i]==2)
		{
			myObj.style.backgroundColor = backgroundBoardColour;
			myObj.innerHTML="<img src='whitedisc.gif' width='16' height='16' align='center' />";
		}

	}
}

function checkPossibleMovesActivated()
{
	myCheckBox=document.getElementById("showmoves");
	if(myCheckBox.checked==true)
	{
		showPossibleMoves = 1;
		// If it is the players move we immediately show possible moves

		if(lastShowPossibleMovesVal==0)	// just changed
		{
			if(validMovesLeftPlayer==1)
			{
				showValidMovesForPlayer();
			}
		}
		lastShowPossibleMovesVal = 1;
	}
	else
	{
		showPossibleMoves = 0;
		if(lastShowPossibleMovesVal==1)	// just changed
		{
			showBoard();
		}
		lastShowPossibleMovesVal  = 0;
	}

	// This actually does the computers move. If the computer is allowed make a move
	// here is where we call it
	if(computerAllowedMove ==1)
	{
		computerChoice();
	}

	if( validMovesLeftPlayer != 0 || validMovesLeftComputer != 0)
	{
		x = setTimeout(checkPossibleMovesActivated,1000);
	}
}


function checkGame()
{
	// check if player can make move

	movesAvail = checkMovesAvailable(1);
	if(movesAvail==0)
	{
		// No moves available for player
		validMovesLeftPlayer = 0;
		playerAllowedMove = 0;

		movesAvail = checkMovesAvailable(2);
		if(movesAvail==1)
		{
			computerAllowedMove = 1;
		}
		else
		{
			validMovesLeftComputer = 0;
		}
	}
	else
	{
		validMovesLeftPlayer = 1;
		playerAllowedMove = 1;
		showValidMovesForPlayer();
	}
	if( validMovesLeftPlayer == 0 && validMovesLeftComputer == 0)
	{
		playerCount = 0;
		computerCount = 0;
		// game over
		for (i=0; i <64; i++)
		{
			if(BoardArray[i]==1)
			{
				playerCount++;
			}
			if(BoardArray[i]==2)
			{
				computerCount++;
			}
		}
		if(playerCount>computerCount)
		{
			winString = "You win! " + playerCount + " to " + computerCount;
			document.getElementById("infobox").innerHTML=winString;
		}
		if(playerCount<computerCount)
		{
			winString = "I win! " + computerCount + " to " + playerCount;
			document.getElementById("infobox").innerHTML=winString;
		}
		if(playerCount==computerCount)
		{
			winString = "A draw! " + playerCount + " to " + computerCount;
			document.getElementById("infobox").innerHTML=winString;
		}

	}
}

function pickDifficulty(difflevel)
{
	difficulty = difflevel;
}

function reset() 
{

	// First we kill the timed call checkPossibleMovesActivated() by setting
	// both validMovesLeftPlayer and validMovesLeftComputer and waiting one second
	// checkPossibleMovesActivated() should then cease to operate
	// We restart one instance again at this bottom of this function

	document.getElementById("infobox").innerHTML="Please wait";

	validMovesLeftPlayer = 0;
	validMovesLeftComputer = 0;

	dateRS = new Date();
	curDateRS = null;

	do { curDateRS = new Date(); } 
		while(curDateRS-dateRS < 1250);



	possible = 1;
	computerAllowedMove = 0;
	validMovesLeftPlayer = 1;
	validMovesLeftComputer = 1;

	lastPlayerMove = -1;

	for (i=0; i <64; i++)
	{
		BoardArray[i] = 0;
	}

	// Our four starting positions
	BoardArray[35]=2;
	BoardArray[36]=1
	BoardArray[27]=1;
	BoardArray[28]=2;


	// load up our dynamic weights array with the initial values

	for (i=0; i <64; i++)
	{
		dynamicWeights[i] = initialWeights[i];
	}

	x = setTimeout(checkPossibleMovesActivated,1000);

	showBoard();	
}

