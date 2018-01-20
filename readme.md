## JavaScript Games
**Copyright (c) 2017 Peter McQuillan**

_All Rights Reserved. Distributed under the BSD Software License (see license.txt)_

This is a collection of HTML/JavaScript games that I originally wrote as widgets for mobile phones but have updated to make available for normal web browsers.

### 9 Letter Word

In this game the player is presented with a 3x3 grid. In each box is a letter. Using all the letters a nine letter word can be made. Click on each letter in the order you think it is in the word.

If you make a mistake you can press **Reset**

If you get stuck you can press **Get Hint** to get a dictionary definition of the word.
I use _api.datamuse.com_ to get the dictionary definition, The code then does a check to ensure the secret word itself does not appear in the definition, if it does then it is removed.

To add or remove words you simply edit the array _normalWordArray_


### Four In A Row

To play you click on a column and it will drop your disc (red for the player) in that column. The goal of the game is to get 4 red discs in a row, either horizontally, vertically or diagonally, and not let your opponent (the computer, playing yellow) get 4 of their discs in a row.

This game has 2 difficulty levels, _normal_ and _hard_.
Internally the game actually has 4 difficulty levels, with _normal_ mapping to level 2 and _hard_ mapping to level 3.

So, for example, if you wanted to make the game easier for a child you could modify the **index.html** file and change the value of the radio button for _normal_ to be 1 or 0.
One of the nice touches of this version is that there is a very simple animation effect when the discs are dropped in the columns.
 
### Hangman

In this classic game you are trying to guess the secret word to save the life of the prisoner.
Click on a letter you think is part of the word - if you are correct the letter will be shown in all the places in the word it is present.
If you are incorrect then a new graphic will appear.
If you are incorrect too many times then the prisoner will be hanged.

If you get stuck you can press **Get Hint** to get a dictionary definition of the word.
I use _api.datamuse.com_ to get the dictionary definition, The code then does a check to ensure the secret word itself does not appear in the definition, if it does then it is removed.

If you want a more child friendly version of the game there are a number of changes you can do.
- change the graphics to something like a flower losing its petals
- Add or remove words from the _normalWordArray_ variable
- Increase the number of allowed failed attempts, in *playerChoice* function change the line _if(numberIncorrectGuesses==6)_

There are other changes you can do with the game as well, if you want to add your own words and definitions, you can. As per above, you can add a word to the _normalWordArray_ variable or one of the _hardWordArray_ variables.
To add a definition for a non-dictionary word, you can modify the *getHint* function in the _if(!definition)_ section.

You could also increase the difficulty by increasing _numberIncorrectGuesses_ if the player presses the **Get Hint** button.

### Minesweeper

In this game the player is presented with an 8x9 grid. The idea of the game is that there are 14 mines hidden in the grid and you are trying to find them.

This version of the game works with mice input and touch input.

If using a touchscreen, then you need to press the *Change Action* button to ensure that clicking on a square has your desired effect - either clearing the square or marking (or unmarking an already marked) square.
If you are using a mouse then left clicking will clear the square, right clicking will mark/unmark the square.

If you clear a square and there are mines adjacent to that square, a number will appear in the box. This number represents the number of mines in squares directly adjacent to that square.
You must mark all the mines and clear all the other squares to win.
On most browsers if you try to clear a square that has a mine on it you will hear an explosion sound effect, and obviously it will be game over.

If you know that the player will only be using a mouse to play the game then you can hide the *Change Action* button by appending _mouse_ to the URL

e.g. index.html?mouse

The game stores your fastest time to clear the minefield so if your browser supports *localStorage* then this time will be saved on the browser so even if you close the browser and come back to the game, it remembers your best time.

### Reflexes

In this simple game you are trying to catch 25 rabbits in the fastest time. Once you press *New Game* a rabbit will appear, tap the rabbit to catch it and another rabbit will immediately appear. 
This game is good fun to play on a touch screen device, though be careful not to get too carried away :smiley:

The game stores your fastest time to catch all the rabbits so if your browser supports *localStorage* then this time will be saved on the browser so even if you close the browser and come back to the game, it remembers your best time.

The JavaScript code for this game is quite straightforward, so once you know the basics of JavaScript this may be a good piece of code to understand, and possibly makes changes to. You could for example make the grid bigger, make more than one rabbit appear at a time or even make the rabbit disappear and appear in a different place if not caught quickly enough.

### Reversi

This game is also known as Othello in some countries.
For more info on the rules on playing this game I would recommend starting with the [Reversi Wikipedia](https://en.wikipedia.org/wiki/Reversi) page.

The game has 3 different difficulty levels, each level corresponds to the following rules for how the computer plays

 0 - Puts in square that gives it the most conversions

 1 - Puts in squares that gives most conversions, but tries
     to avoid 3 squares around each corner, and tries to get corners

 2 - Based on even number theory. Tries to place piece in a free area
     that has an odd number of empty squares. Uses weightings of squares
     to choose square to place. Weights can dynamically change

Possible improvements to this game would obviously be to add other skill levels/algorithms the computer could use to play. 

It would also be nice to add a feature where you can start the game in a different board layout and so you could practice playing different sorts of scenarios.

### Rock Paper Scissors

This is a very simple game where you choose from rock, paper or scissors. 

Rock beats Scissors, Paper beats Rock, Scissors beats Paper.

A possible modification to this game would be to make it support the game _Rock Paper Scissors Lizard Spock_
 

### Sliding Squares

In this game the numbers 1 to 15 appear in numeric order in a 4x4 grid. Pressing the *Shuffle Board* buttons causes the numbers to be shuffled around.

Your goal is to get the numbers back in the correct order, Clicking on a square beside the hole moves that piece into the hole.

This game is easy to modify to make it more personal. Simply find any image (ideally square-ish) and split it into 16 equal size segments (there are lots of online sites that can do this). Ensure that each image ends with the numbers 1 through 15 as appropriate.
You then change the value of the variables _holeImage_ and _tickImage_ to point to your new folder (you could copy *hole.png* and *tick.png* from the _nums_ folder). 

You also need to modify the code that sets the variable _imageString_ in the function *generateImageString*


### Tic Tac Toe

This game is known by a number of other names, for example *noughts and crosses* or *Xs and Os*

This is a simple game where the player places their mark in an empty spot in the 3x3 grid. The player or computer who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

There are a choice of 3 difficulty levels, though internally there are actually 4 (with difficulty 0 being very easy). The default difficulty (normal) is level 2.
It is possible to beat the computer on level 3 difficulty (hard), though it is not easy to do so.

I wrote the source code for this game so that it would be easier to follow for people learning JavaScript. While the code is relatively long (at over 850 lines of code) much of this code is simply checking variants of winning line combinations etc. so hopefully intermediate learners of JavaScript would be able to understand how the code works.


