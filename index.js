const Word = require("./word");
const inquirer = require("inquirer");
const randomWords = require("random-words");
const chalk = require('chalk');

var tries;
var gameWordArray = [];
var guessWordArray = [];
var originalWordArray = [];
var guessedLetterStr = "";

var getRandomWords = function() {
    gameWordArray = [];
    originalWordArray = randomWords({ min: 2, max: 4 });
    originalWordArray.forEach(word => {
        gameWordArray.push(new Word(word));
    });
};

var newGame = function() {
    tries = 5;
    getRandomWords();
    guessWordArray = [];
    guessedLetterStr = "";
    gameWordArray.forEach(word => {
        guessWordArray.push(word.getWordStr());
    });
    console.log(
        "\nYou will get 2-4 random words. They are " + 
        "\njust random words and may not make a " + 
        "\ncoherent phrase. Guess all the letters in " + 
        "\neach word to win!\n"
    );
    console.log("\n" + guessWordArray.join("  ") + "\n");
    promptForLetter();
};

var promptForLetter = function() {
    inquirer
        .prompt([
            {
                name: "guessedLetter",
                message: chalk.cyanBright("Guess a letter!"),
                validate: function(value) {
                    if (value.length === 1 && /[a-z]/i.test(value) && !guessedLetterStr.includes(value)) {
                        return true;
                    }
                    return "Enter a valid letter or one you haven't guessed!";
                }
            }
        ])
        .then(answers => {
            guessWordArray = [];
            correctGuess = false;
            guessedLetterStr += answers.guessedLetter.toLowerCase() + " ";
            gameWordArray.forEach(word => {
                if (word.guessLetter(answers.guessedLetter.toLowerCase())) {
                    correctGuess = true;
                }
                guessWordArray.push(word.getWordStr());
            });

            if (correctGuess) {
                console.log(chalk.green("\n  --- Correct! Great job! ---  \n"));
            } else {
                tries--;
                console.log(chalk.redBright("\n  --- Nope! Letter is not in the word! ---  \n"));
            }

            if (hasWonGame()) {
                console.log(guessWordArray.join("  ") + "\n");
                console.log(chalk.green("Congratulations! You won!"));
                playAgain();
            } else if (tries > 0) {
                console.log(chalk.yellowBright("\nYou have " + tries + " tries remaining!\n"));
                console.log(chalk.magentaBright("Guessed Letters: " + guessedLetterStr + "\n"));
                console.log(guessWordArray.join("  ") + "\n");
                promptForLetter();
            } else {
                console.log(guessWordArray.join("  ") + "\n");
                console.log(chalk.redBright("You have ran out of tries!" + chalk.yellowBright("\nThe answer was: " + originalWordArray.join(" "))));
                playAgain();
            }


        });
};

var logOutWords = function() {
    gameWordArray.forEach(word => {
        guessWordArray.push(word.getWordStr());
    });
}

var hasWonGame = function() {
    hasWon = true;
    guessWordArray.forEach(word => {
        if (word.includes("_")) {
            hasWon = false;
            return false;
        }
    });
    return hasWon;
};

var playAgain = function() {
    inquirer.prompt([
        {
            name: "restart",
            type: "confirm",
            message: chalk.cyanBright("Do you want to play again?")
        }
    ]).then(answer => {
        if (answer.restart) {
            newGame();
        }
    });
}

newGame();
