//
// Reflexes
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
// Try and catch 25 rabbits in the fastest time possible!

var BoardArray = new Array(35);

var currentSquare = 0;

var rabbitstarget=25;
var score=0;
var start;
var bestTime=50; 
 
function putscore(){
	var scoreDate=new Date()
	var now=scoreDate.valueOf();
	document.all.score.innerHTML=score ;  
	document.all.time.innerHTML=(now-start)/1000;   
	
	if (score==rabbitstarget){
		if (  (now-start)/1000 < bestTime ) {
			// new high score

			bestTime=(now-start)/1000 
			document.all.besttime.innerHTML=bestTime ;
			
			// This saves the best time score so its saved for next time we play
			if (typeof(Storage) !== "undefined") 
			{
    			// Code for localStorage
				localStorage.setItem("reflexesbesttime", bestTime);
			}
			
		}
	}
}

function playAgain()
{
	reset();

	var tmp=Math.floor(30*Math.random()) +1;  // 30 = 0-29

	currentSquare = tmp;
	BoardArray[tmp]=1;
	
	var tmpString = "pos_" + tmp;

	var myObj = document.getElementById(tmpString);
	myObj.innerHTML="<img src='rabbit.png' height='100%' weight='100%' />";

	var resetDate=new Date()
	start=resetDate.valueOf();
	putscore();
}

 
function reset()
{	
	var i;
	var resetString;
	var myObjReset;
	
    BoardArray[0]=0;
	for (i=1; i <31; i++)
	{
		resetString = "pos_" + i;

		myObjReset = document.getElementById(resetString);
		myObjReset.innerHTML="&nbsp;";

		BoardArray[i]=0;
	}

	score=0;
}

function gameover()
{
	return;
}
 
function myselect(cell)
{
	if(score>=rabbitstarget)
	{
		return;
	}
	var oncell=false;

	if(BoardArray[cell]==1)
	{
		oncell=true;
		BoardArray[cell]=0;

		var locationString1 = "pos_" + cell;
		var myObj1 = document.getElementById(locationString1);
		myObj1.innerHTML="&nbsp;";
	}

 
	if (oncell==true) {

		var r=Math.floor(30*Math.random()) +1;

		while(r==currentSquare)
		{	
			// do not want rabbit to reappear in the same square they were in
			r=Math.floor(30*Math.random()) +1;  
		}
		
		if(r>30)
		{
			r =1;
		}

		BoardArray[r]=1;
		currentSquare = r;

		var locationString = "pos_" + r;

		var myObj = document.getElementById(locationString);

		myObj.innerHTML="<img src='rabbit.png' height='100%' weight='100%' />";
 
		score=score+1;
		putscore();
	}

	if(score==rabbitstarget)
	{
		var locationString2 = "pos_" + currentSquare;
		var myObj2 = document.getElementById(locationString2);
		myObj2.innerHTML="&nbsp;";
		gameover();
	}
}

function myinit()
{
	// load the best time if previously saved
	if (typeof(Storage) !== "undefined") 
	{
    	// Code for localStorage
		if (localStorage.reflexesbesttime)
		{
			bestTime = Number(localStorage.reflexesbesttime);
			document.all.besttime.innerHTML=bestTime ;
		}
	}
	
	reset();
}
