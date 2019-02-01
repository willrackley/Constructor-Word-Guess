var Words = require("./Word");
var Letters = require("./Letters");

var inquirer = require("inquirer");

var gameWords = ["lexus","audi"]
var randWordSelect = Math.floor(Math.random() * 2);
var chosenWordToSend = [];
inquirer.prompt([
    {
      name: "initialQuestion",
      message: "Welome to 'Guess That Car'! \n Guess the make or model of a car one letter at a time. \n Wanna Play?",
      type: "confirm",
      
      
    }, 
]).then(function(answers) {
    if(answers.initialQuestion){
        var word = new Words();
        
        chosenWordToSend = gameWords[randWordSelect];
        
        Words.prototype.addLetters = function(char){
            this.newLetters.push(new Letters(char));
        }
        //grabs a random word from the cars list and places places holders in the newLetters array
        for(var i = 0; i < chosenWordToSend.length; i++) {
            var letterArg = chosenWordToSend.charAt(i) ;
            word.addLetters(letterArg);

        }
       word.wordDisplay();
    }
});