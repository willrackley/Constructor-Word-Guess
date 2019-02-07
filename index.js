var Words = require("./Word");
var inquirer = require("inquirer");

var gameWords = ["lexus", "audi" ,"bentley", "toyota", "jaguar"];
var indexCtr = 0; 
var winCtr = 0;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var chosenWordToSend = gameWords[indexCtr];
var wrongLetters = [];
var guessPropertyArray = [];
var guessesRemaining = 7;
var word = new Words(chosenWordToSend);

//this function is the main logic of the game that runs after the intitial
// function that explains the game to the user
var continuePlay = function(){

    if(guessesRemaining > 0){
   
        inquirer.prompt([
            {
                name: "GuessLetter",
                type: "input",
                message: "Guess a Letter a-z",
            }
        ]).then(function(answers) {
            var checkedchar = answers.GuessLetter.toLowerCase();
            
            //this array takes the 'guessed' property from the letter object and stores it
            //in the array. every time a letter is guessed correctly the property turns to 'true'
            //once the array items all true, thats when we know the word was guessed correctly
            guessPropertyArray = [];
            for(i=0; i < word.newLetters.length; i++){
                word.wordGuess(checkedchar);
                wordCheck(word.newLetters[i]);
            }
            
            //checks to see if the letter the user guessed, matches the letter objects
            //if it is then we know the user guessed correctly
            if(chosenWordToSend.includes(checkedchar)){
                console.log("\nCORRECT!");

            //this makes sure the user's input is actually a letter.
            } else if (!chosenWordToSend.includes(checkedchar) && !alphabet.includes(checkedchar)){
                console.log("\nPLEASE TYPE A LETTER FROM A-Z");
            } else {
                console.log("\nINCORRECT!");
                guessesRemaining--;
                wrongLetters.push(checkedchar);
            }

            //this tells us the user figured out the word
            if(guessPropertyArray.indexOf(false) === -1){
                guessesRemaining = 0;
                winCtr++;
            }

            //the winCtr is incremented after every word is guess correctly
            //once we get to the end of all the words to be guessed(5), we make the guesses zero and 
            //end the game (end game code to follow)
            if(winCtr === 5){
                guessesRemaining = 0; 
            }

            console.log('\n========================');
            word.wordDisplay();
            console.log("\nyou have " + guessesRemaining + " guesses remaining");
            console.log("\nletters you've guessed incorrectly: " + wrongLetters.join(' '));
            console.log('\n\n========================');
            console.log("\n");
            
            continuePlay();

            function wordCheck(key){
                guessPropertyArray.push(key.guessed); 
            }
        });

      //this is run once the user correctly guess all the words
    } else if(guessesRemaining === 0 && winCtr === 5){
        
        inquirer.prompt([
            {
                name: "completedGame",
                type: "list",
                message: "Great Job! You've Completed the game!",
                choices: ["PLAY AGAIN", "END GAME"]
                
            }
        ]).then(function(answers) {
            if(answers.completedGame === "PLAY AGAIN"){
                indexCtr = 0;
                winCtr = 0;
                chosenWordToSend = gameWords[indexCtr];
                word = new Words(chosenWordToSend);
                guessesRemaining = 7;
                wrongLetters = [];
                correctLetters = [];

                userGuess();
            }
        }); 

      //this is ran after the user runs out of guesses. (the game ends and they have the option to play again).
    } else if(guessesRemaining === 0 && guessPropertyArray.indexOf(false) !== -1){
        inquirer.prompt([
            {
                name: "gameOver",
                type: "list",
                message: "GAME OVER!",
                choices: ["PLAY AGAIN", "END GAME"]
                
            }
        ]).then(function(answers) {
            if(answers.gameOver === "PLAY AGAIN"){
                indexCtr = 0;
                winCtr = 0;
                chosenWordToSend = gameWords[indexCtr];
                word = new Words(chosenWordToSend);
                guessesRemaining = 7;
                wrongLetters = [];
                correctLetters = [];

                userGuess();
            }
        });
    
      //this is ran when the user guess a word correctly, they are asked if they want to play a new word
    } else if (guessesRemaining === 0 && guessPropertyArray.indexOf(false) === -1){
        
        inquirer.prompt([
            {
                name: "nextWord",
                type: "list",
                message: "Great Job! Would you like to play another word?",
                choices: ["YES", "NO"]
                
            }
        ]).then(function(answers) {
            if(answers.nextWord === "YES"){
                indexCtr++;
                chosenWordToSend = gameWords[indexCtr];
                word = new Words(chosenWordToSend);
                guessesRemaining = 7;
                wrongLetters = [];
                correctLetters = [];

                console.log('\n========================');
                word.wordDisplay();
                console.log("\nyou have " + guessesRemaining + " guesses remaining")
                console.log('\n\n========================');
                console.log("\n");

                continuePlay();  
            }  
        });
    } 
}
    
//this function initalizes the game and gives the user instructions
//on how to play. The word to guess is also displayed
var userGuess = function(){   
    
    inquirer.prompt([
        {
        name: "initialQuestion",
        message: "Welome to 'Guess That Car'! \n Guess the make of a car one letter at a time. \n Wanna Play?",
        type: "list",
        choices: ["YES", "NO"]
        }, 
        
    ]).then(function(answers) {
        if(answers.initialQuestion === "YES"){
            console.log('\n========================');
            word.wordDisplay();
            console.log("\nyou have " + guessesRemaining + " guesses remaining");
            console.log("\nletters you've guessed incorrectly: " + wrongLetters.join(' '));
            console.log('\n\n========================');
            console.log("\n");
            continuePlay();
        } else {
            return;
        }
    });  
}


userGuess();
