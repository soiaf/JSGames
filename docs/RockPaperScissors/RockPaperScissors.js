//
// Rock Paper Scissors
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
// Rock beats Scissors
// Paper beats Rock
// Scissors beats Paper
//

var won = 0;
var lost = 0;
var draw = 0;
var allowedMove = 0;

  
function putscore()
{
	document.getElementById("won").innerHTML = won;
	document.getElementById("lost").innerHTML = lost;
	document.getElementById("draws").innerHTML = draw;
}
 
function reset()
{
    allowedMove = 1;	// player allowed move
}


function myselect(playerchoice)
{
	// 1 is rock
	// 2 is paper
	// 3 is scissors

	if(allowedMove==0)
	{
		return;
	}

	allowedMove = 0;	// block further moves

	var rndNum=Math.random();
	var computerVal=Math.round(3 * rndNum )+1;

	if(computerVal<1 || computerVal>3)
	{
		// should never happen, but better safe than sorry

		computerVal = 2;
	}

	if(playerchoice==1)
	{
		if(computerVal==1)
		{
			document.getElementById("computer_choice").innerHTML="<img src='rock.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="A draw";
			draw =  draw + 1;
		}
		if(computerVal==2)
		{
			document.getElementById("computer_choice").innerHTML="<img src='paper.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You lose";
			lost =  lost + 1;
		}
		if(computerVal==3)
		{
			document.getElementById("computer_choice").innerHTML="<img src='scissors.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You win";
			won =  won + 1;
		}
	}

	if(playerchoice==2)
	{
		if(computerVal==1)
		{
			document.getElementById("computer_choice").innerHTML="<img src='rock.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You win";
			won =  won + 1;
		}
		if(computerVal==2)
		{
			document.getElementById("computer_choice").innerHTML="<img src='paper.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="A draw";
			draw =  draw + 1;
		}
		if(computerVal==3)
		{
			document.getElementById("computer_choice").innerHTML="<img src='scissors.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You lose";
			lost =  lost + 1;
		}
	}

	if(playerchoice==3)
	{
		if(computerVal==1)
		{
			document.getElementById("computer_choice").innerHTML="<img src='rock.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You lose";
			lost =  lost + 1;
		}
		if(computerVal==2)
		{
			document.getElementById("computer_choice").innerHTML="<img src='paper.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="You win";
			won =  won + 1;
		}
		if(computerVal==3)
		{
			document.getElementById("computer_choice").innerHTML="<img src='scissors.png' width='100%' height='100%' />";
			document.getElementById("infobox").innerHTML="A draw";
			draw =  draw + 1;
		}
	}

	putscore();

	var x = setTimeout(clearComputerPiece,2000);
}

function clearComputerPiece()
{
	document.getElementById("computer_choice").innerHTML="Make Your Move!";
	document.getElementById("infobox").innerHTML="";
	allowedMove = 1;
}

function myinit()
{
	reset();
}