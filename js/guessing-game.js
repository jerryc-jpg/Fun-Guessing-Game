/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100)
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

class Game {
    constructor() {
        this.playersGuess = null
        this.pastGuesses = []
        this.winningNumber = generateWinningNumber()
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower() {
        return this.playersGuess < this.winningNumber
    }

    playersGuessSubmission(num) {
        if (typeof num === 'number' && num > 0 && num <= 100) {
            this.playersGuess = num
            return this.checkGuess(num)
        } else {
            throw 'That is an invalid guess.'
        } 

    }

    checkGuess(num) {
        if (num === this.winningNumber) {
            return "You Win! 🎉"
        } 
        if (this.pastGuesses.includes(num)) {
            return "You have already guessed that number."
        } 
        if (!this.pastGuesses.includes(num) && num !== this.winningNumber) {
            this.pastGuesses.push(num)
        } 
        if (this.pastGuesses.length === 5) {
            return "You Lose. The Winning Number was " + this.winningNumber
        }
        
        const difference = Math.abs(num - this.winningNumber);

        if (difference < 10) {
            if (num - this.winningNumber < 0) {
                return "You're burning up! Guess higher!";
            } else {
                return "You're burning up! Guess lower!";
            }
        }

        if (difference < 25) {
            if (num - this.winningNumber < 0) {
                return "You're lukewarm. Guess higher!";
            } else {
                return "You're lukewarm. Guess lower!";
            }
        }

        if (difference < 50) {
            if (num - this.winningNumber < 0) {
                return "You're a bit chilly. Guess higher!";
            } else {
                return "You're a bit chilly. Guess lower!";
            }
        }

        if (difference < 100) {
            if (num - this.winningNumber < 0) {
                return "You're ice cold! Guess higher!";
            } else {
                return "You're ice cold! Guess lower!";
            }
        }
    }

    provideHint() {
        return shuffle([this.winningNumber, 
            generateWinningNumber(), 
            generateWinningNumber(), 
            generateWinningNumber(), 
            generateWinningNumber(), 
            generateWinningNumber(), 
            generateWinningNumber(), 
            generateWinningNumber()]);
    }

}

function newGame() {
    return new Game();
}

let game = newGame()

const submitButton = document.getElementById('submit')
const resetButton = document.getElementById('reset')
const hintButton = document.getElementById('hint')
const feedbackElement = document.getElementById('guess-feedback');
const guessListElement = document.getElementById('guess-list');
const playerInputElement = document.getElementById('player-input');

submitButton.addEventListener('click', function() {
    try {
        const guess = parseInt(playerInputElement.value);
        const feedback = game.playersGuessSubmission(guess);
        feedbackElement.innerHTML = feedback;
        guessListElement.children[game.pastGuesses.length - 1].innerHTML = guess;
        playerInputElement.value = "";
    } catch (error) {
        feedbackElement.innerHTML = 'That is an invalid guess.';
        playerInputElement.value = "";
    }
});

resetButton.addEventListener('click', function() {
    game = newGame();
    feedbackElement.innerHTML = 'Make your Guess!';
    guessListElement.children[0].innerHTML = '<image src="https://www.seekpng.com/png/detail/45-456052_clip-arts-related-to-star-clipart-transparent-background.png" alt="yellow star" width="25px" height="20px">';
    guessListElement.children[1].innerHTML = '<image src="https://www.seekpng.com/png/detail/45-456052_clip-arts-related-to-star-clipart-transparent-background.png" alt="yellow star" width="25px" height="20px">';
    guessListElement.children[2].innerHTML = '<image src="https://www.seekpng.com/png/detail/45-456052_clip-arts-related-to-star-clipart-transparent-background.png" alt="yellow star" width="25px" height="20px">';
    guessListElement.children[3].innerHTML = '<image src="https://www.seekpng.com/png/detail/45-456052_clip-arts-related-to-star-clipart-transparent-background.png" alt="yellow star" width="25px" height="20px">';
    guessListElement.children[4].innerHTML = '<image src="https://www.seekpng.com/png/detail/45-456052_clip-arts-related-to-star-clipart-transparent-background.png" alt="yellow star" width="25px" height="20px">';
    playerInputElement.value = ""

})

hintButton.addEventListener('click', function() {
    const hints = game.provideHint();
    feedbackElement.innerHTML = `The winning number is ${hints[0]}, ${hints[1]}, ${hints[2]}, ${hints[3]}, ${hints[4]}, ${hints[5]}, ${hints[6]}, or ${hints[7]} .`;
})



