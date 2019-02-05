var Letters = require("./Letters");



var Words = function(){
    this.newLetters = [];
    this.wordDisplay = function(){
        this.newLetters.toString();
        console.log(this.newLetters.join(''));
       
    } 
    this.wordGuess = function(x){
        for(i=0; i < this.newLetters.length; i++){
            this.newLetters[i].charCheck(x);
        }  
    }
    this.addLetters = function(char){
        this.newLetters.push(new Letters(char));
    }
   
}



module.exports = Words;