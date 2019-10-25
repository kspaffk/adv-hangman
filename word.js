var Letter = require("./letter");

var Word = function(word) {
    this.letters = [];
    for (var i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word.charAt(i)));
    }
    this.getWordStr = function() {
        return this.letters.join("");
    }

    this.guessLetter = function(char) {
        var correctGuess = false;
        this.letters.forEach(letter => {
            if (letter.char === char) {
                letter.beenGuessed = true;
                correctGuess = true;
            }
        });
        return correctGuess;
    }
}

module.exports = Word;



