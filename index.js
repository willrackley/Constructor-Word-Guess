var Words = require("./Word");
var inquirer = require("inquirer");

var gameWords = ["lexus", "audi" ,"bentley", "toyota"];
var randWordSelect = Math.floor(Math.random() * gameWords.length);
var indexCtr = 0;
var chosenWordToSend = gameWords[indexCtr];
var correctLetters = [];
var wrongLetters = [];

var wordCheckArray = [];
var guessesRemaining = 7;
var word = new Words(chosenWordToSend);



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
        wordCheckArray = [];
        for(i=0; i < word.newLetters.length; i++){
            word.wordGuess(checkedchar);
            wordCheck(word.newLetters[i]);
        }
        
       if(chosenWordToSend.includes(checkedchar)){
        console.log("\nCORRECT!");
        correctLetters.push(checkedchar);
       } else {
        console.log("\nINCORRECT!");
        guessesRemaining--;
        wrongLetters.push(checkedchar);
       }

       
       if(wordCheckArray.indexOf(false) === -1){
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
            wordCheckArray.push(key.guessed);
            
        }
    });
} else if(guessesRemaining === 0 && wordCheckArray.indexOf(false) !== -1){
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
            chosenWordToSend = gameWords[indexCtr];
            word = new Words(chosenWordToSend);
            guessesRemaining = 7;
            wrongLetters = [];
            correctLetters = [];

            userGuess();
        }

    });
   
} else if (guessesRemaining === 0 && wordCheckArray.indexOf(false) === -1){
    
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
