//VARIABLES
var videoGames = ["pacman", "asteroids", "donkeykong", "pitfall", "metroid", "supermario", "legendofzelda"]

//Empty variables to store values later
var ramdomGame = "";
var gameWord = [];
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesleft = 9;
var wins = 0;
var losses = 0;
var guessesleft = 9;

// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>


//_______________________
//GAME START FUNCTION
//_______________________

function Game() {
    //computer generates random videogames from videogames array
    randomGame = videoGames[Math.floor(Math.random() * videoGames.length)];

    //split the invidiual word into sperate arrays, and store into a new array
    gameWord = randomGame.split("");

    // store length of word in blanks, for later use
    blanks = gameWord.length;

    //creating a loop to generate "_" for each letter to array in stored in blanks
    for (var i = 0; i < blanks; i++)  {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within the HTML
    document.getElementById("answer").innerHTML = "  " + blanksAndCorrect.join("  ");

    // console logging
    console.log(ramdomGame);
    console.log(gameWord);
    console.log(blanks);
    console.log(blanksAndCorrect);
}

//________________
//RESET FUNCTION
//________________

function reset() {
    guessesleft = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//_______________________________
//CHECK LETTERS/COMPARE FUNCTION
//_______________________________

//If/Else, to see if letter selected matches random game
function checkLetters(letter) {
    var letterInGame = false;
    //if the generated randomGame is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomGame[i] == letter) {
            letterInGame = true;
        }
    }
    //if letterInGame (false)
    if (letterInGame) {
        //check each letter to see if it matches game
        for (var i = 0; i < blanks; i++) {
            if (randomGame[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesleft--;
    }
    console.log(blanksAndCorrect);
}

//________________________
//FINAL COMPLETE FUNCTION
//________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesleft)

    //if WON...then alert, play audio, display image and reset new round
    if (gameWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesleft === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/2-WordGuess.jpg"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses left countdown
    document.getElementById("answer").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesleft").innerHTML = " " + guessesleft;
}


//>>>>>>>>>>>>>>>>>>>
//___________________
// EXECUTE CODE 
//___________________

//call start game function

Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerwrong").innerHTML = "  " + wrongGuess.join(" ");
}
