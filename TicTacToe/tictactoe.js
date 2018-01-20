//
// TicTacToe
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
// There are 9 squares in a TicTacToe board, I label them as follows
//	nw	n	ne
//	w	c	e
//	sw	s	se
//
// I deliberately chose not to use arrays (which would have made the
// code a lot smaller) as I wanted the code to be very clear what it is doing
// We declare a variable for each square on the board, each variable 
// can have one of three possible values
// 0 - the square is empty
// 1 - the square has an X ( player piece)
// 2 - the square has an O (the computer piece)

var nw = 0;
var n = 0;
var ne = 0;
var w = 0;
var c = 0;
var e = 0;
var sw = 0;
var s = 0;
var se = 0;

// The variable possible holds whether there are any possible moves left
// 0 means no, 1 means yes

var possible = 1;

// The variable winner holds who has won (if anyone)
// 0 means no winner, 1 is player, 2 is the computer

var winner = 0;

// The variable valid holds whether a particular choice is valid or not
// for example if the space already has a value
// 0 means no, 1 means yes

var valid = 0;

// variable numOfSquares holds the value 9, the number of squares in a
// TicTacToe board, used when picking random numbers

var numOfSquares = 9;

// The game has 4 difficulty levels
// 0 - simplest level, just puts in random empty square
// 1 - random, but will complete line if 2 in a row with empty
// 2 - blocks your lines, tries to win
// 3 - as with level 2, but focuses on centre and corners - better strategy

// For this code, easy is 1, normal is difficulty 2, hard is level 3

var difficulty = 2;

var rndNum = 0;
var myVal = 0;

// variable goesfirst holds a value that gives which player goes
// first, if 0 its the player, if 1 it is the computer
// The first time the page is loaded the player will go first

var goesfirst = 0;

// This holds the colour to show when player has a winning line
var playerwincolour = "#80ff00";

// This holds the colour to show when computer has a winning line
var computerwincolour = "#ffc0a0";

// Shows whether this is the computers first move. Used if playing on
// hard level (level 3)

var computerFirstMove = 1;

var won = 0;
var lost = 0;
var draw = 0;

function pickDifficulty(difflevel)
{	
	difficulty = difflevel;
}

function putscore() 
{
 document.getElementById("won").innerHTML = won;
 document.getElementById("lost").innerHTML = lost;
 document.getElementById("draws").innerHTML = draw;
}


function checkWinner() 
{
 if ((nw == 1) && (n == 1) && (ne == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b1.style.backgroundColor = playerwincolour;
  document.all.b2.style.backgroundColor = playerwincolour;
  document.all.b3.style.backgroundColor = playerwincolour;
 }
 if ((w == 1) && (c == 1) && (e == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b4.style.backgroundColor = playerwincolour;
  document.all.b5.style.backgroundColor = playerwincolour;
  document.all.b6.style.backgroundColor = playerwincolour;
 }
 if ((sw == 1) && (s == 1) && (se == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b7.style.backgroundColor = playerwincolour;
  document.all.b8.style.backgroundColor = playerwincolour;
  document.all.b9.style.backgroundColor = playerwincolour;
 }
 if ((nw == 1) && (w == 1) && (sw == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b1.style.backgroundColor = playerwincolour;
  document.all.b4.style.backgroundColor = playerwincolour;
  document.all.b7.style.backgroundColor = playerwincolour;
 }
 if ((n == 1) && (c == 1) && (s == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b2.style.backgroundColor = playerwincolour;
  document.all.b5.style.backgroundColor = playerwincolour;
  document.all.b8.style.backgroundColor = playerwincolour;
 }
 if ((ne == 1) && (e == 1) && (se == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b3.style.backgroundColor = playerwincolour;
  document.all.b6.style.backgroundColor = playerwincolour;
  document.all.b9.style.backgroundColor = playerwincolour;
 }
 if ((nw == 1) && (c == 1) && (se == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b1.style.backgroundColor = playerwincolour;
  document.all.b5.style.backgroundColor = playerwincolour;
  document.all.b9.style.backgroundColor = playerwincolour;
 }
 if ((ne == 1) && (c == 1) && (sw == 1)) 
 {
  possible = 0; // no moves left
  winner = 1; // Player wins
  document.all.b3.style.backgroundColor = playerwincolour;
  document.all.b5.style.backgroundColor = playerwincolour;
  document.all.b7.style.backgroundColor = playerwincolour;
 }

 if ((nw == 2) && (n == 2) && (ne == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b1.style.backgroundColor = computerwincolour;
  document.all.b2.style.backgroundColor = computerwincolour;
  document.all.b3.style.backgroundColor = computerwincolour;
 }
 if ((w == 2) && (c == 2) && (e == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b4.style.backgroundColor = computerwincolour;
  document.all.b5.style.backgroundColor = computerwincolour;
  document.all.b6.style.backgroundColor = computerwincolour;
 }
 if ((sw == 2) && (s == 2) && (se == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b7.style.backgroundColor = computerwincolour;
  document.all.b8.style.backgroundColor = computerwincolour;
  document.all.b9.style.backgroundColor = computerwincolour;
 }
 if ((nw == 2) && (w == 2) && (sw == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b1.style.backgroundColor = computerwincolour;
  document.all.b4.style.backgroundColor = computerwincolour;
  document.all.b7.style.backgroundColor = computerwincolour;
 }
 if ((n == 2) && (c == 2) && (s == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b2.style.backgroundColor = computerwincolour;
  document.all.b5.style.backgroundColor = computerwincolour;
  document.all.b8.style.backgroundColor = computerwincolour;
 }
 if ((ne == 2) && (e == 2) && (se == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b3.style.backgroundColor = computerwincolour;
  document.all.b6.style.backgroundColor = computerwincolour;
  document.all.b9.style.backgroundColor = computerwincolour;
 }
 if ((nw == 2) && (c == 2) && (se == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b1.style.backgroundColor = computerwincolour;
  document.all.b5.style.backgroundColor = computerwincolour;
  document.all.b9.style.backgroundColor = computerwincolour;
 }
 if ((ne == 2) && (c == 2) && (sw == 2)) 
 {
  possible = 0; // no moves left
  winner = 2; // Computer wins
  document.all.b3.style.backgroundColor = computerwincolour;
  document.all.b5.style.backgroundColor = computerwincolour;
  document.all.b7.style.backgroundColor = computerwincolour;
 }
}

function checkFreeSpace() 
{
 if ((nw != 0) && (n != 0) && (ne != 0) && (w != 0) && (c != 0) && (e != 0) && (sw != 0) && (s != 0) && (se != 0)) 
 {
  possible = 0; // no moves left
 }
}


function playerChoice(chName) 
{
 document.getElementById("infobox").value = "";

 checkWinner(); // check is game has been won
 checkFreeSpace(); // check if any free spaces
 if (possible != 1) 
 {
  gameover(); // no more moves left
 } 
 else 
 {
  valid = 0; // set as not valid, then check if it is

  if (chName == 1) 
  {
   if (nw == 0) 
   {
    valid = 1;
    nw = 1;
   }
  }

  if (chName == 2) 
  {
   if (n == 0) 
   {
    valid = 1;
    n = 1;
   }
  }

  if (chName == 3) 
  {
   if (ne == 0) 
   {
    valid = 1;
    ne = 1;
   }
  }

  if (chName == 4) 
  {
   if (w == 0) 
   {
    valid = 1;
    w = 1;
   }
  }

  if (chName == 5) 
  {
   if (c == 0) 
   {
    valid = 1;
    c = 1;
   }
  }

  if (chName == 6) 
  {
   if (e == 0) 
   {
    valid = 1;
    e = 1;
   }
  }

  if (chName == 7) 
  {
   if (sw == 0) 
   {
    valid = 1;
    sw = 1;
   }
  }

  if (chName == 8) 
  {
   if (s == 0) 
   {
    valid = 1;
    s = 1;
   }
  }

  if (chName == 9) 
  {
   if (se == 0) 
   {
    valid = 1;
    se = 1;
   }
  }

  if (valid == 1) 
  {
   document.getElementById("b" + chName).innerHTML = "X";
   checkGame();
   computerChoice();
  }
 }
}

function computerCheckMove(passedVal) 
{
 // gets passed a value, checks if its valid
 // if valid choice, sets value to 1
 // and sets square value to 2

 if (passedVal == 1) 
 {
  if (nw == 0) 
  {
   valid = 1;
   nw = 2;
  }
 }

 if (passedVal == 2) 
 {
  if (n == 0) 
  {
   valid = 1;
   n = 2;
  }
 }
 if (passedVal == 3) 
 {
  if (ne == 0) 
  {
   valid = 1;
   ne = 2;
  }
 }

 if (passedVal == 4) 
 {
  if (w == 0) 
  {
   valid = 1;
   w = 2;
  }
 }
 if (passedVal == 5) 
 {
  if (c == 0) 
  {
   valid = 1;
   c = 2;
  }
 }

 if (passedVal == 6) 
 {
  if (e == 0) 
  {
   valid = 1;
   e = 2;
  }
 }
 if (passedVal == 7) 
 {
  if (sw == 0) 
  {
   valid = 1;
   sw = 2;
  }
 }

 if (passedVal == 8) 
 {
  if (s == 0) 
  {
   valid = 1;
   s = 2;
  }
 }
 if (passedVal == 9) 
 {
  if (se == 0) 
  {
   valid = 1;
   se = 2;
  }
 }
}

function computerEasyChoice() 
{
 // Just picks a random empty square
 valid = 0;
 while (valid == 0) 
 {
  rndNum = Math.random()
  myVal = Math.round((numOfSquares - 1) * rndNum) + 1;
  computerCheckMove(myVal);
 }

 document.getElementById("b" + myVal).innerHTML = "O";
}

function checkTwo(toCheck) 
{
 valid = 0;
 myVal = 0;


 // top horizontal line
 if ((nw == toCheck) && (n == toCheck) && (ne == 0)) 
 {
  valid = 1;
  myVal = 3;
  ne = 2;
 } 
 else if ((nw == toCheck) && (n == 0) && (ne == toCheck)) 
 {
  valid = 1;
  myVal = 2;
  n = 2;
 } 
 else if ((nw == 0) && (n == toCheck) && (ne == toCheck)) 
 {
  valid = 1;
  myVal = 1;
  nw = 2;
 }
 // middle horizontal line
 else if ((w == toCheck) && (c == toCheck) && (e == 0)) 
 {
  valid = 1;
  myVal = 6;
  e = 2;
 } 
 else if ((w == toCheck) && (c == 0) && (e == toCheck)) 
 {
  valid = 1;
  myVal = 5;
  c = 2;
 } 
 else if ((w == 0) && (c == toCheck) && (e == toCheck)) 
 {
  valid = 1;
  myVal = 4;
  w = 2;
 }
 // bottom horizontal line
 else if ((sw == toCheck) && (s == toCheck) && (se == 0)) 
 {
  valid = 1;
  myVal = 9;
  se = 2;
 } 
 else if ((sw == toCheck) && (s == 0) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 8;
  s = 2;
 } 
 else if ((sw == 0) && (s == toCheck) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 7;
  sw = 2;
 }
 // left vertical line
 else if ((nw == toCheck) && (w == toCheck) && (sw == 0)) 
 {
  valid = 1;
  myVal = 7;
  sw = 2;
 } 
 else if ((nw == toCheck) && (w == 0) && (sw == toCheck)) 
 {
  valid = 1;
  myVal = 4;
  w = 2;
 } 
 else if ((nw == 0) && (w == toCheck) && (sw == toCheck)) 
 {
  valid = 1;
  myVal = 1;
  nw = 2;
 }
 // middle vertical line
 else if ((n == toCheck) && (c == toCheck) && (s == 0)) 
 {
  valid = 1;
  myVal = 8;
  s = 2;
 } 
 else if ((n == toCheck) && (c == 0) && (s == toCheck)) 
 {
  valid = 1;
  myVal = 5;
  c = 2;
 } 
 else if ((n == 0) && (c == toCheck) && (s == toCheck)) 
 {
  valid = 1;
  myVal = 2;
  n = 2;
 }
 // right vertical line
 else if ((ne == toCheck) && (e == toCheck) && (se == 0)) 
 {
  valid = 1;
  myVal = 9;
  se = 2;
 } 
 else if ((ne == toCheck) && (e == 0) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 6;
  e = 2;
 } 
 else if ((ne == 0) && (e == toCheck) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 3;
  ne = 2;
 }
 // diag to right
 else if ((nw == toCheck) && (c == toCheck) && (se == 0)) 
 {
  valid = 1;
  myVal = 9;
  se = 2;
 } 
 else if ((nw == toCheck) && (c == 0) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 5;
  c = 2;
 } 
 else if ((nw == 0) && (c == toCheck) && (se == toCheck)) 
 {
  valid = 1;
  myVal = 1;
  nw = 2;
 }
 // diag to left
 else if ((ne == toCheck) && (c == toCheck) && (sw == 0)) 
 {
  valid = 1;
  myVal = 7;
  sw = 2;
 } 
 else if ((ne == toCheck) && (c == 0) && (sw == toCheck)) 
 {
  valid = 1;
  myVal = 5;
  c = 2;
 } 
 else if ((ne == 0) && (c == toCheck) && (sw == toCheck)) 
 {
  valid = 1;
  myVal = 3;
  ne = 2;
 }

}

function computerTryToWin() 
{
 checkTwo(2); // check lines of 2 with computer piece
}

function computerTryToBlock() 
{
 checkTwo(1); // check lines of 2 with player piece
}

function computerLevel1Choice() 
{
 // If has 2 in a row, then tries to win, otherwise picks random

 computerTryToWin();
 if (valid == 1) 
 {
  document.getElementById("b" + myVal).innerHTML = "O";
 } 
 else if (valid == 0) 
 {
  // no winning lines, just pick random

  computerEasyChoice();
 }
}

function computerLevel2Choice() 
{
 // If has 2 in a row, then tries to win
 // Then sees if player has 2 in a row, if so blocks
 // else goes random

 computerTryToWin();
 if (valid == 1) 
 {
  document.getElementById("b" + myVal).innerHTML = "O";
 } 
 else if (valid == 0) 
 {
  // Now see if can block player
  computerTryToBlock();
  if (valid == 1) 
  {
   document.getElementById("b" + myVal).innerHTML = "O";
  } 
  else if (valid == 0) 
  {
   // no winning lines, and nothing to block just pick random

   computerEasyChoice();
  }
 }
}

function computerLevel3Choice() 
{
 // If has 2 in a row, then tries to win
 // Then sees if player has 2 in a row, if so blocks
 // else goes for centre (or a cornet), then random
 // Very difficult to beat (hint, start with centre piece)

 computerTryToWin();
 if (valid == 1) 
 {
  document.getElementById("b" + myVal).innerHTML = "O";
 } 
 else if (valid == 0) 
 {
  // Now see if can block player
  computerTryToBlock();
  if (valid == 1) 
  {
   document.getElementById("b" + myVal).innerHTML = "O";
  } 
  else if (valid == 0) 
  {
   // no winning lines either, go for centre
   // or corners

   if (computerFirstMove == 1) 
   {
    // first try centre, then pick a corner at random
    if (c == 0) 
	{
     c = 2;
     myVal = 5;
     valid = 1;
     document.getElementById("b" + myVal).innerHTML = "O";
    } 
	else 
	{
     // If the centre is occupied, and this is the computer
     // first move, then all the corners are free.
     // Pick one at random

     var randomNumL3 = Math.floor(Math.random() * 4);

     if (randomNumL3 == 0) 
	 {
      nw = 2;
      myVal = 1;
      valid = 1;
      document.getElementById("b" + myVal).innerHTML = "O";
     }
     if (randomNumL3 == 1) 
	 {
      ne = 2;
      myVal = 3;
      valid = 1;
      document.getElementById("b" + myVal).innerHTML = "O";
     }
     if (randomNumL3 == 2) 
	 {
      sw = 2;
      myVal = 7;
      valid = 1;
      document.getElementById("b" + myVal).innerHTML = "O";
     }
     if (randomNumL3 == 3) 
	 {
      se = 2;
      myVal = 9;
      valid = 1;
      document.getElementById("b" + myVal).innerHTML = "O";
     }
    }

    computerFirstMove = 0;
   } 
   else 
   {
    if (valid == 0) 
	{
     computerEasyChoice();
    }
   }
  }
 }
}

function computerChoice() 
{
 if (possible == 1) 
 {
  if (difficulty == 0) 
  {
   computerEasyChoice();
  } 
  else if (difficulty == 1) 
  {
   computerLevel1Choice();
  } 
  else if (difficulty == 2) 
  {
   computerLevel2Choice();
  } 
  else if (difficulty == 3) 
  {
   computerLevel3Choice();
  }

  checkGame();
 }
}


function gameover() 
{
 document.getElementById("infobox").innerHTML = "Game over";
}

function checkGame() 
{
 checkWinner();
 checkFreeSpace();
 if (winner == 1) 
 {
  won = won + 1;
  document.getElementById("infobox").innerHTML = "You win";
 }
 if (winner == 2) 
 {
  lost = lost + 1;
  document.getElementById("infobox").innerHTML = "I win";
 }
 if ((winner == 0) && (possible == 0)) 
 {
  draw = draw + 1;
  document.getElementById("infobox").innerHTML = "A draw";
 }

 putscore();
}

function playAgain() 
{
 reset();
 if (goesfirst == 0) 
 {
  document.getElementById("infobox").innerHTML = "You go first";
  goesfirst++;
 } 
 else 
 {
  document.getElementById("infobox").innerHTML = "I go first";
  goesfirst = 0;
  computerChoice();
 }

}

function reset() 
{
 possible = 1;

 computerFirstMove = 1;

 nw = 0;
 n = 0;
 ne = 0;
 w = 0;
 c = 0;
 e = 0;
 sw = 0;
 s = 0;
 se = 0;

 winner = 0;

 document.getElementById("b1").innerHTML = "&nbsp;";
 document.getElementById("b2").innerHTML = "&nbsp;";
 document.getElementById("b3").innerHTML = "&nbsp;";
 document.getElementById("b4").innerHTML = "&nbsp;";
 document.getElementById("b5").innerHTML = "&nbsp;";
 document.getElementById("b6").innerHTML = "&nbsp;";
 document.getElementById("b7").innerHTML = "&nbsp;";
 document.getElementById("b8").innerHTML = "&nbsp;";
 document.getElementById("b9").innerHTML = "&nbsp;";

 document.getElementById("infobox").innerHTML = " ";

 document.all.b1.style.backgroundColor = "#ffffc0";
 document.all.b2.style.backgroundColor = "#ffffc0";
 document.all.b3.style.backgroundColor = "#ffffc0";
 document.all.b4.style.backgroundColor = "#ffffc0";
 document.all.b5.style.backgroundColor = "#ffffc0";
 document.all.b6.style.backgroundColor = "#ffffc0";
 document.all.b7.style.backgroundColor = "#ffffc0";
 document.all.b8.style.backgroundColor = "#ffffc0";
 document.all.b9.style.backgroundColor = "#ffffc0";
}


function myinit() 
{
 playAgain();
}
