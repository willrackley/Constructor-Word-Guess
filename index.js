var Words = require("./Word");
//var Letters = require("./Letters");
var inquirer = require("inquirer");

var gameWords = ["lexus","audi"]
var randWordSelect = Math.floor(Math.random() * 2);
var chosenWordToSend = [];
var tobeChecked = [];
var guessedArray = [];
var guessesRemaining = 7; 
var word = new Words();

var continuePlay = function(){
    
    inquirer.prompt([
        {
            name: "GuessLetter",
            type: "input",
            message: "Guess a Letter",
        }
    ]).then(function(answers) {
        for(i=0; i < word.newLetters.length; i++){
           var checkedchar = answers.GuessLetter;
           
            word.wordGuess(checkedchar);
           
            
       }
       console.log('\n');
       word.wordDisplay();
       console.log('\n');
      
       if(tobeChecked.indexOf("false") === guessedArray.indexOf("false")){
            guessesRemaining--;
            console.log("Wrong! you have " + guessesRemaining + " guesses remaining")
        }
        
        console.log('\n');

        if(guessesRemaining > 0){
            continuePlay();
        }
    });
   
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
        
        
        chosenWordToSend = gameWords[randWordSelect];
        
       
        //grabs a random word from the cars list and places places holders in the newLetters array
        for(var i = 0; i < chosenWordToSend.length; i++) {
            var letterArg = chosenWordToSend.charAt(i) ;
            word.addLetters(letterArg);
            tobeChecked.push(word.newLetters[i].guessed);

        }
        console.log('\n');
        word.wordDisplay();
        console.log('\n');
        console.log("you have " + guessesRemaining + " guesses remaining")
        console.log('\n');
        
       
            continuePlay();
        

    });
    
}


  




userGuess();
