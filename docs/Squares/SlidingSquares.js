//
// Sliding Squares
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
//

// Our board is a 4x4 grid, so 16 positions

var BoardArray = new Array(16)

// Our hole starts in the last position, i.e. square 15

var hole=15

// The variable shuffled shows whether the board has been
// shuffled by the user. This is used so as to only show the
// congratulations message after the board has been shuffled

var shuffled = 0;

var chosenImage = 1;	// default numbers

var holeImage="nums/hole.png";

var tickImage="nums/tick.png";

function resetBoard()
{
	for (var j = 0 ; j < 16 ; j++ ) 
	{
			BoardArray[j]=j;
	}
	hole=15;
	shuffled = 0;
}

function generateImageString(imageNum)
{
	// passed one parameter, the number of the square to generate
	// the image URI for

	var imageString="";

	imageString = "nums/number" + imageNum + ".png";

	return(imageString);
}

function swap(h,oldTilePos,showImage)
{
	var graphicString;
	var myObj;
	
	var hT=BoardArray[h];
	var t=BoardArray[oldTilePos];

	hole=oldTilePos;
	BoardArray[h] = t;
	BoardArray[oldTilePos] = hT;

	var posVal = 0;
	posVal = t + 1;

	if(showImage==1)
	{
		graphicString = generateImageString(posVal);

		if(h==0)
		{
			myObj = document.getElementById("pos0");
			myObj.src = graphicString;
		}
		if(oldTilePos==0)
		{
			myObj = document.getElementById("pos0");
			myObj.src = holeImage;
		}
		if(h==1)
		{
			myObj = document.getElementById("pos1");
			myObj.src = graphicString;
		}
		if(oldTilePos==1)
		{
			myObj = document.getElementById("pos1");
			myObj.src = holeImage;
		}	
		if(h==2)
		{
			myObj = document.getElementById("pos2");
			myObj.src = graphicString;
		}
		if(oldTilePos==2)
		{
			myObj = document.getElementById("pos2");
			myObj.src = holeImage;
		}	
		if(h==3)
		{
			myObj = document.getElementById("pos3");
			myObj.src = graphicString;
		}
		if(oldTilePos==3)
		{
			myObj = document.getElementById("pos3");
			myObj.src = holeImage;
		}


		if(h==4)
		{
			myObj = document.getElementById("pos4");
			myObj.src = graphicString;
		}
		if(oldTilePos==4)
		{
			myObj = document.getElementById("pos4");
			myObj.src = holeImage;
		}

		if(h==5)
		{
			myObj = document.getElementById("pos5");
			myObj.src = graphicString;
		}
		if(oldTilePos==5)
		{
			myObj = document.getElementById("pos5");
			myObj.src = holeImage;
		}


		if(h==6)
		{
			myObj = document.getElementById("pos6");
			myObj.src = graphicString;
		}
		if(oldTilePos==6)
		{
			myObj = document.getElementById("pos6");
			myObj.src = holeImage;
		}

		if(h==7)
		{
			myObj = document.getElementById("pos7");
			myObj.src = graphicString;
		}
		if(oldTilePos==7)
		{
			myObj = document.getElementById("pos7");
			myObj.src = holeImage;
		}

		if(h==8)
		{
			myObj = document.getElementById("pos8");
			myObj.src = graphicString;
		}
		if(oldTilePos==8)
		{
			myObj = document.getElementById("pos8");
			myObj.src = holeImage;
		}

		if(h==9)
		{
			myObj = document.getElementById("pos9");
			myObj.src = graphicString;
		}
		if(oldTilePos==9)
		{
			myObj = document.getElementById("pos9");
			myObj.src = holeImage;
		}

		if(h==10)
		{
			myObj = document.getElementById("pos10");
			myObj.src = graphicString;
		}
		if(oldTilePos==10)
		{
			myObj = document.getElementById("pos10");
			myObj.src = holeImage;
		}

		if(h==11)
		{
			myObj = document.getElementById("pos11");
			myObj.src = graphicString;
		}
		if(oldTilePos==11)
		{
			myObj = document.getElementById("pos11");
			myObj.src = holeImage;
		}

		if(h==12)
		{
			myObj = document.getElementById("pos12");
			myObj.src = graphicString;
		}
		if(oldTilePos==12)
		{
			myObj = document.getElementById("pos12");
			myObj.src = holeImage;
		}

		if(h==13)
		{
			myObj = document.getElementById("pos13");
			myObj.src = graphicString;
		}
		if(oldTilePos==13)
		{
			myObj = document.getElementById("pos13");
			myObj.src = holeImage;
		}

		if(h==14)
		{
			myObj = document.getElementById("pos14");
			myObj.src = graphicString;
		}
		if(oldTilePos==14)
		{
			myObj = document.getElementById("pos14");
			myObj.src = holeImage;
		}

		if(h==15)
		{
			myObj = document.getElementById("pos15");
			myObj.src = graphicString;
		}
		if(oldTilePos==15)
		{
			myObj = document.getElementById("pos15");
			myObj.src = holeImage;
		}
	}
}

function move(tile)
{
	var distance=Math.abs(hole-tile);
	if ( distance==1 || distance==4 ) 
	{
		swap(hole,tile,1);
	}
	checkboard();
}

function checkboard()
{

	// Checks to see if the player has successfully sorted the board

	var myObj;
	var cb;
	
	var chck = 1;
	for (cb = 0 ; cb < 16 ; cb++ ) 
	{
		if(BoardArray[cb] != cb)
		{
			chck = 0;
		}
	}

	if(chck==1 && shuffled==1 )
	{
		myObj = document.getElementById("pos15");
		myObj.src = tickImage;
		shuffled = 0;
	}
}

function scramble()
{
	// there are 4 possible ways that we can shuffle,
	// up, down, left and right.
	// To make the shuffle more random, I actually try
	// to shuffle diagonally
	// we pick a random number within a range of 4, and 
	// randomize as appropriate :)

	var randomNum;
	var pieceToSwop;

	shuffled = 1;

	for (var i=0; i < 1000 ; i++ ) 
	{
		randomNum = Math.floor(Math.random() * 4);

		if(randomNum==0)
		{
			// move space up and then left (nw)
			if(hole>3)
			{
				pieceToSwop = hole-4;
				swap(hole,pieceToSwop,0);
				if(hole!=0 && hole!=4 && hole!=8 && hole!=12)
				{
					pieceToSwop = hole-1;
					swap(hole,pieceToSwop,0);
				}	
			}

		}
		if(randomNum==1)
		{
			// move space down and then left (sw)
			if(hole<12)
			{
				pieceToSwop = hole+4;
				swap(hole,pieceToSwop,0);
				if(hole!=0 && hole!=4 && hole!=8 && hole!=12)
				{
					pieceToSwop = hole-1;
					swap(hole,pieceToSwop,0);
				}
			}

		}
		if(randomNum==2)
		{
			// move space up and then right (ne)
			if(hole>3)
			{
				pieceToSwop = hole-4;
				swap(hole,pieceToSwop,0);
				if(hole!=3 && hole!=7 && hole!=11 && hole!=15)
				{
					pieceToSwop = hole+1;
					swap(hole,pieceToSwop,0);
				}
			}
		}
		if(randomNum==3)
		{
			// move space down and then right (se)
			if(hole<12)
			{
				pieceToSwop = hole+4;
				swap(hole,pieceToSwop,0);
				if(hole!=3 && hole!=7 && hole!=11 && hole!=15)
				{
					pieceToSwop = hole+1;
					swap(hole,pieceToSwop,0);
				}
			}

		}
	}
}

function showBoard()
{
	var myObj;
	var graphicString;
	
	var sbidx = 0;
	for (var sbi=0; sbi < 16 ; sbi++ ) 
	{
		sbidx = BoardArray[sbi];
		if(sbidx!=15)
		{
			sbidx++;
		
			graphicString = generateImageString(sbidx);
		}
		else
		{
			graphicString = holeImage;
		}
		if (sbi==0)
		{
			myObj = document.getElementById("pos0");
			myObj.src = graphicString;
		}
		if (sbi==1)
		{
			myObj = document.getElementById("pos1");
			myObj.src = graphicString;
		}
		if (sbi==2)
		{
			myObj = document.getElementById("pos2");
			myObj.src = graphicString;
		}
		if (sbi==3)
		{
			myObj = document.getElementById("pos3");
			myObj.src = graphicString;
		}
		if (sbi==4)
		{
			myObj = document.getElementById("pos4");
			myObj.src = graphicString;
		}
		if (sbi==5)
		{
			myObj = document.getElementById("pos5");
			myObj.src = graphicString;
		}
		if (sbi==6)
		{
			myObj = document.getElementById("pos6");
			myObj.src = graphicString;
		}
		if (sbi==7)
		{
			myObj = document.getElementById("pos7");
			myObj.src = graphicString;
		}
		if (sbi==8)
		{
			myObj = document.getElementById("pos8");
			myObj.src = graphicString;
		}
		if (sbi==9)
		{
			myObj = document.getElementById("pos9");
			myObj.src = graphicString;
		}
		if (sbi==10)
		{
			myObj = document.getElementById("pos10");
			myObj.src = graphicString;
		}
		if (sbi==11)
		{
			myObj = document.getElementById("pos11");
			myObj.src = graphicString;
		}
		if (sbi==12)
		{
			myObj = document.getElementById("pos12");
			myObj.src = graphicString;
		}
		if (sbi==13)
		{
			myObj = document.getElementById("pos13");
			myObj.src = graphicString;
		}
		if (sbi==14)
		{
			myObj = document.getElementById("pos14");
			myObj.src = graphicString;
		}
		if (sbi==15)
		{
			myObj = document.getElementById("pos15");
			myObj.src = graphicString;
		}
	}
}		

function myinit()
{
	playAgain();
}
		


function playAgain()
{    
	resetBoard();
	showBoard();
}

function scrambleBoard()
{
	scramble();
	showBoard();
}
