//
// Nine Letter Word
//
// Copyright (c) 2017 Peter McQuillan
//
// All Rights Reserved. 
// 
// Distributed under the BSD Software License (see license.txt) 
//
//
// Player is shown a 3 x 3 grid that has a nine letter word hidden in it

// This holds the word we are trying to guess/work out

var wordToGuess = "";

// This holds whether any more guesses are allowed

var possible = 1;

// This holds the word to be guessed as an array

var wordArray = new Array(11);

// This holds whether we have guessed a particular letter or not

var guessedArray = new Array(11);

// This holds the string we are currently building 

var workingString = "";

// This holds the width of our screen

var availWidth = 240;



// List of words

var normalWordArray = new Array('abandoned', 'abdicated', 'abdominal', 'abhorrent', 'absconded', 'abseiling', 'absorbent', 'abundance', 'accompany', 'accordion', 'acetylene', 'acquiesce', 'acrobatic', 'activated', 'addictive', 'adjective', 'adjourned', 'admirable', 'admission', 'adoration', 'adulthood', 'advantage', 'adventure', 'adversity', 'aerobatic', 'aeroplane', 'affection', 'affidavit', 'affluence', 'aftermath', 'afternoon', 'alchemist', 'algorithm', 'altimeter', 'amazement', 'ambiguous', 'ambitions', 'ampersand', 'anaerobic', 'anecdotal', 'anonymous', 'anthology', 'apartment', 'arbitrage', 'arbitrary', 'armadillo', 'artichoke', 'assembled', 'associate', 'astronaut', 'aubergine', 'auxiliary', 'avalanche', 'awestruck', 'bacterial', 'bandwidth', 'barometer', 'behaviour', 'benchmark', 'betrothal', 'bicyclist', 'biography', 'biologist', 'blackbird', 'blatantly', 'bleakness', 'blindfold', 'bloodline', 'bluntness', 'boatswain', 'bookmaker', 'boomerang', 'breakfast', 'brickwork', 'briefcase', 'brusquely', 'bulldozer', 'bumblebee', 'butterfly', 'byproduct', 'calculate', 'calibrate', 'canonical', 'carbuncle', 'caretaker', 'carnivore', 'casserole', 'catalysis', 'causative', 'cavalcade', 'cedarwood', 'celebrity', 'centurion', 'character', 'chartered', 'chemistry', 'childhood', 'chiropody', 'chocolate', 'chopstick', 'chromatic', 'cinematic', 'circulate', 'clampdown', 'clustered', 'coalition', 'cognisant', 'collapsed', 'colleague', 'composite', 'computing', 'concisely', 'condiment', 'condition', 'consensus', 'container', 'continent', 'cooperate', 'copiously', 'corollary', 'corrosion', 'crescendo', 'criticism', 'crocodile', 'crossword', 'cultivate', 'custodian', 'deceptive', 'dehydrate', 'demeanour', 'designers', 'detective', 'detergent', 'dexterity', 'diligence', 'dimension', 'diplomacy', 'discarded', 'divergent', 'diversion', 'draconian', 'duplicate', 'ecologist', 'economist', 'editorial', 'elucidate', 'endorphin', 'enrolment', 'entertain', 'enumerate', 'essential', 'establish', 'evolution', 'excursion', 'exemplary', 'explosion', 'exquisite', 'extortion', 'fabricate', 'factorial', 'fantastic', 'fascinate', 'favourite', 'festivity', 'feudalism', 'fictional', 'fireplace', 'flammable', 'flotation', 'foolproof', 'foreigner', 'fortified', 'fortnight', 'fractured', 'fragrance', 'freighter', 'frequency', 'frugality', 'frustrate', 'furniture', 'geography', 'gladiator', 'glycerine', 'gradation', 'gymnastic', 'gyroscope', 'haphazard', 'happiness', 'hardcover', 'harshness', 'hatchback', 'heartburn', 'herbivore', 'hurricane', 'hydration', 'hyperbole', 'hypnotism', 'imaginary', 'immediacy', 'impartial', 'implement', 'inaudible', 'incessant', 'indelible', 'injection', 'innocuous', 'innovator', 'inorganic', 'insoluble', 'insomniac', 'interlude', 'interpret', 'intricate', 'inversion', 'invisible', 'isolation', 'isometric', 'judgement', 'judiciary', 'juxtapose', 'kilometre', 'labyrinth', 'landscape', 'legendary', 'lethargic', 'limousine', 'locksmith', 'logistics', 'longevity', 'longitude', 'loquacity', 'lymphatic', 'maelstrom', 'magnitude', 'mandatory', 'marsupial', 'mausoleum', 'mediation', 'mercenary', 'metabolic', 'meteorite', 'migration', 'moderator', 'monastery', 'multitude', 'narration', 'navigator', 'neolithic', 'nocturnal', 'nostalgia', 'nutrition', 'obfuscate', 'obnoxious', 'occupancy', 'ombudsman', 'oscillate', 'outsource', 'outspoken', 'overgrown', 'overthrow', 'pacemaker', 'paintwork', 'palpitate', 'paperback', 'parabolic', 'paragraph', 'passenger', 'permanent', 'perplexed', 'persevere', 'pessimist', 'photocopy', 'pineapple', 'plausible', 'pneumonia', 'political', 'pollution', 'porcupine', 'practical', 'pragmatic', 'pregnancy', 'prejudice', 'primitive', 'principal', 'promenade', 'proximity', 'quadruped', 'quartered', 'quicksand', 'quotation', 'radiation', 'raspberry', 'rebellion', 'reduction', 'refurbish', 'relevance', 'reprimand', 'reptilian', 'residence', 'rigmarole', 'rustproof', 'sandpaper', 'sarcastic', 'scientist', 'sculpture', 'secondary', 'seductive', 'shortcake', 'sincerity', 'sleepwalk', 'sleuthing', 'snowflake', 'southwest', 'spacesuit', 'speculate', 'springbok', 'statement', 'steadfast', 'steamship', 'stopwatch', 'storeroom', 'succulent', 'sunflower', 'surfboard', 'sweetcorn', 'swordfish', 'synthetic', 'telegraph', 'testimony', 'therapist', 'threshold', 'toothpick', 'transport', 'treatment', 'triathlon', 'turquoise', 'ultimatum', 'unbridled', 'undivided', 'unlimited', 'validated', 'variously', 'vegetable', 'vigilance', 'vividness', 'waterfall', 'waterfowl', 'wearisome', 'whirlpool', 'windblown', 'wistfully', 'wrestling', 'xylophone', 'yardstick', 'zealously', 'zookeeper', 'zoologist');  


function jumble(word) {
 
    // Rand function will return 2-part array
    // [0] -> Index of rand, [1] -> random found value (from args)

    var rand = function()
	{
        var myRand = Math.floor(Math.random() * arguments.length);
        return [myRand, arguments[myRand]];
    },
 
    // Split passed word into array
    word = word.split(''),
 
    // Cache word length for easy looping
    length = word.length,
 
    // Prepare empty string for jumbled word
    jumbled = '',
 
    arrIndexes = [];
    while (length--) 
	{
        arrIndexes.push(length);
    }
 
    // Cache word length again:
    length = word.length;
 
    // Another loop
    while (length--) 
	{
        // Get a random number, must be one of
        // those found in arrIndexes
        var rnd = rand.apply(null,arrIndexes);
        // Append random character to jumbled
        jumbled += word[rnd[1]];
        // Remove character from arrIndexes
        // so that it is not selected again:
        arrIndexes.splice(rnd[0],1);
    }
 
    // Return the jumbled word
    return jumbled;
 
}


function generateWord()
{
	// selects a new word at random
	var i;
	var randomNum = 1;

	randomNum = Math.floor(Math.random() * normalWordArray.length);
	wordToGuess = normalWordArray[randomNum];

	wordToGuess = wordToGuess.toLowerCase();

	var jumbledword = jumble(wordToGuess);

	for (i=1; i < 10 ; i++)
	{
		wordArray[i] = jumbledword[i-1];
	}
	
}

function resetGuessedArray()
{
	var i;
	
	for (i=1; i < 10 ; i++)
	{
		guessedArray[i] = 0;
	}

}


function drawBoard()
{
	document.getElementById('b1').innerHTML = wordArray[1];
	document.getElementById('b2').innerHTML = wordArray[2];
	document.getElementById('b3').innerHTML = wordArray[3];
	document.getElementById('b4').innerHTML = wordArray[4];
	document.getElementById('b5').innerHTML = wordArray[5];
	document.getElementById('b6').innerHTML = wordArray[6];
	document.getElementById('b7').innerHTML = wordArray[7];
	document.getElementById('b8').innerHTML = wordArray[8];
	document.getElementById('b9').innerHTML = wordArray[9];
}

function playerChoice(chName)
{
	if(possible==1)
	{
		if(guessedArray[chName]==1)
		{
			// already guessed this cell
			return;
		}
		guessedArray[chName] = 1;	// mark as guessed

		var tmpChoiceString = "b" + chName;
		document.getElementById(tmpChoiceString ).innerHTML = " ";

		workingString = workingString + wordArray[chName];

		document.getElementById('guessbox').innerHTML = workingString;	
	}	

	checkWinner();	
}

function checkWinner()
{
	if(workingString==wordToGuess)
	{
		possible = 0;
		document.getElementById('infobox').innerHTML = "Well done!";
	}
}

function resetBoard()
{
	// we are not picking a new word, we are just tidying up the board etc.

	if(possible==1)
	{
		workingString = "";
		resetGuessedArray();
		drawBoard();
		document.getElementById('guessbox').innerHTML = "&nbsp;";
	}

}

function playAgain() 
{
	reset();

}

function giveup()
{
	if(possible==1)
	{
		possible = 0;
		document.getElementById('guessbox').innerHTML = "<font color='red'>" + wordToGuess + "</font>" ;
		document.getElementById('infobox').innerHTML = "Sorry, try again.";

	}
}

function getHint()
{
	document.getElementById('infobox').innerHTML = "Please wait. Attempting to get hint for the word.";

	var myHostString = "http://api.datamuse.com/words?sp=" + wordToGuess +"&md=d&max=1";
	
	var xhr = createCORSRequest('GET', myHostString);
	if (!xhr) 
	{
		document.getElementById('infobox').innerHTML = "Sorry, unable to get hint.";
	}
	else
	{
		xhr.send();
	}

	xhr.onload = function () 
	{
		// handle txt
		var t = xhr.responseText;
		var myObj = JSON.parse(t);
		
		var definition = null;
		
		if(myObj[0] && myObj[0].defs[0])
		{
			definition = myObj[0].defs[0];
		}
		
		if(!definition)
		{
			// word not found
			document.getElementById('infobox').innerHTML = "Sorry, unable to get a hint for this word.";
		}
		else
		{
			// string found
			
			var definitionString = definition;

			// excellent, the word was found. The only thing to check now is that the word itself is not mentioned in the definition.
			// if it is we replace it with "[---]"
			// we also need to remove any \t in the result
			
			var temp = definitionString;
			
			temp = temp.replace("\t", " ");
			
			
			var indexRep = temp.indexOf(wordToGuess);
			while(indexRep != -1)
			{
				temp = temp.replace(wordToGuess, "[---]");
				indexRep = temp.indexOf(wordToGuess);
			}

			var verifiedDefinitionString = temp;
								
			document.getElementById('infobox').innerHTML = verifiedDefinitionString;
		}
	}
	xhr.onerror = function() 
	{
		// bad stuff happened
		document.getElementById('infobox').innerHTML = "Sorry, unable to get hint.";
	} 

}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function reset() 
{
	possible = 1;

	workingString = "";
	document.getElementById('guessbox').innerHTML = "&nbsp;";
	document.getElementById('infobox').innerHTML = "&nbsp;";
	resetGuessedArray();
	generateWord();
	drawBoard();
	
}

function myinit()
{
	reset();
}
