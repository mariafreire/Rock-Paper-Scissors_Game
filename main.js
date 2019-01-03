let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getCompChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if(letter === "r") return "Rock";
    if(letter === "p") return "Paper";
    return "Scissors";
}

function win(userChoice, compChoice) {
    const smallCompWord = "computer".fontsize(3).sub().fontcolor("#F2F6D0");
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(compChoice)}${smallCompWord}. You win!  🏆`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 350);
}

function lose(userChoice, compChoice) {
    const smallCompWord = "computer".fontsize(3).sub().fontcolor("#F2F6D0");
    const userChoice_div = document.getElementById(userChoice);
    compScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertToWord(userChoice)} loses to ${convertToWord(compChoice)}${smallCompWord}. You lost! 😿`
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 350);
}

function draw(userChoice, compChoice) {
    const smallCompWord = "computer".fontsize(3).sub().fontcolor("#F2F6D0");
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML= `${convertToWord(userChoice)} equals ${convertToWord(compChoice)}${smallCompWord}. It's a draw! 😶`;
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 350);
}

function game(userChoice) {
    const compChoice = getCompChoice();
    switch (userChoice + compChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, compChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, compChoice);
            break;
        case "rr":
        case "ss":
        case "pp":
            draw(userChoice, compChoice);
            break;
    }
}

/*! onClickOrTap.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/onClickOrTap */
/**
 * Run a callback after a click or tap, without running duplicate callbacks for the same event
 * @param  {Node}   elem       The element to listen for clicks and taps on
 * @param  {Function} callback The callback function to run on a click or tap
 */
var onClickOrTap = function (elem, callback) {

    // Make sure a callback is provided
    if ( !callback || typeof(callback) !== 'function' ) return;

    // Variables
    var isTouch, startX, startY, distX, distY;

    /**
     * touchstart handler
     * @param  {event} event The touchstart event
     */
    var onTouchStartEvent = function (event) {
        // Disable click event
        isTouch = true;

        // Get the starting location and time when finger first touches surface
        startX = event.changedTouches[0].pageX;
        startY = event.changedTouches[0].pageY;
    };

    /**
     * touchend handler
     * @param  {event} event The touchend event
     */
    var onTouchEndEvent = function (event) {

        // Get the distance travelled and how long it took
        distX = event.changedTouches[0].pageX - startX;
        distY = event.changedTouches[0].pageY - startY;

        // If a swipe happened, do nothing
        if ( Math.abs(distX) >= 7 || Math.abs(distY) >= 10 ) return;

        // Run callback
        callback(event);

    };

    /**
     * click handler
     * @param  {event} event The click event
     */
    var onClickEvent = function (event) {
        // If touch is active, reset and bail
        if ( isTouch ) {
            isTouch = false;
            return;
        }

        // Run our callback
        callback(event);
    };

    // Event listeners  

    rock_div.addEventListener('touchstart', onTouchStartEvent, false);
    rock_div.addEventListener('touchend', onTouchEndEvent, false);
    rock_div.addEventListener('click', onClickEvent, false); 

    paper_div.addEventListener('touchstart', onTouchStartEvent, false);
    paper_div.addEventListener('touchend', onTouchEndEvent, false);
    paper_div.addEventListener('click', onClickEvent, false); 

    scissors_div.addEventListener('touchstart', onTouchStartEvent, false);
    scissors_div.addEventListener('touchend', onTouchEndEvent, false);
    scissors_div.addEventListener('click', onClickEvent, false); 
};


function main () {
    rock_div.addEventListener('click', function() {
    game("r");
    })

    paper_div.addEventListener('click', function() {
        game("p");
    })

    scissors_div.addEventListener('click', function() {
        game("s");
    })
}

main();
