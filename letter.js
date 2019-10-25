var Letter = function(char) {
    this.char = char;
    this.beenGuessed = false;
    this.toString = function() {
        if (this.beenGuessed) {
            return this.char + " ";
        } 
        return "_ ";
    }
    this.checkChar = function(char) {
        if (char === this.char) {
            this.beenGuessed = true;
        }
    }
}

module.exports = Letter;