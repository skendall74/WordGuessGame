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
var guessesRemaining = 9;
var wins = 0;
var losses = 0;
var guessesRemaining = 9;

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

//_________________________
//RESET FUNCTION
//_________________________

function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomGame is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomGame[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomGame[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//___________________________
//FINAL COMPLETE FUNCTION
//___________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (gameWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("answer").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
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
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}
