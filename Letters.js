

var Letters = function(char){
    this.char = char;
    this.guessed = false;
    this.toString = function(){
        if(this.guessed){
            return this.char + " ";
        } else if(!this.guessed){
            return "_ ";
        } else {
            return this.char;
        }
        //console.log(this.char);
    }
    this.charCheck = function(x){
        
        if(this.char === x){
            this.guessed = true;
            
        } 
    }
}



module.exports = Letters;