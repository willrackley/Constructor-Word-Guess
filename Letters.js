

var Letters = function(char){
    this.char = char;
    this.guessed = false;
    this.toString = function(){
        if(this.guessed){
            return this.char + " ";
        } else {
            
            char = "_ "
            return char;
        }
        //console.log(this.char);
    }
    this.charCheck = function(x){
        
        if(this.char === x){
            this.guessed = true;
            
        } else {
            this.guessed = false;
            //guessesRemaining--;
            //console.log("You have " + guessesRemaining + " left.")
        }
    }
}



module.exports = Letters;