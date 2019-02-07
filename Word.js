var Letters = require("./Letters");


var Words = function(answer){
    this.newLetters = [];
    
    //creates letter variable from letter constructor and pushes that to our newLetters array
    for(var i=0; i < answer.length; i++){
        var addLetter = new Letters(answer[i]);
        this.newLetters.push(addLetter);
    }

    this.wordDisplay = function(){
        for(i=0; i< this.newLetters.length; i++){
            this.newLetters[i].toString();
        }
        var displayedWord = this.newLetters.join('')
        console.log("\n" + displayedWord);   
        
    } 
    this.wordGuess = function(x){
        for(var i=0; i < this.newLetters.length; i++){
            this.newLetters[i].charCheck(x);
        }  
    }  
}

module.exports = Words;