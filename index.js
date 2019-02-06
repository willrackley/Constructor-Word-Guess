var Words = require("./Word");
//var Letters = require("./Letters");
var inquirer = require("inquirer");

var gameWords = ["lexus","audi"]
var randWordSelect = Math.floor(Math.random() * 2);
var chosenWordToSend = gameWords[randWordSelect];
var correctLetters = [];
var wrongLetters = [];
var guessedArray = [];
var trueCtr = 0;
var guessesRemaining = 7;
var word = new Words(chosenWordToSend);
var contWord = new Words(chosenWordToSend);
var trueCtr = 0;


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
        var  wordCheckArray = [];
        for(i=0; i < word.newLetters.length; i++){
            word.wordGuess(checkedchar);
        
       }
     
       if(chosenWordToSend.includes(checkedchar)){
        console.log("\nCORRECT!");
       } else {
        console.log("\nINCORRECT!");
        guessesRemaining--;
        wrongLetters.push(checkedchar);
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
}
   
}
  



var userGuess = function(){   
    
inquirer.prompt([
    {
      name: "initialQuestion",
      message: "Welome to 'Guess That Car'! \n Guess the make or model of a car one letter at a time. \n Wanna Play?",
      type: "confirm",
      default: true
    }, 
    
]).then(function(answers) {

    
    console.log('\n========================');
        word.wordDisplay();
        console.log("\nyou have " + guessesRemaining + " guesses remaining")
        console.log('\n\n========================');
        console.log("\n");
       
        continuePlay();
        

    });
    
}


  




userGuess();
