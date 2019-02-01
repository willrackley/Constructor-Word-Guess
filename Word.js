var Letters = require("./Letters");

var Words = function(){
    this.newLetters = [];
    this.wordDisplay = function(){
        this.newLetters.toString();
        console.log(this.newLetters.join(''));
    } 
    this.wordGuess = function(x){
        charCheck();
    }
}



module.exports = Words;