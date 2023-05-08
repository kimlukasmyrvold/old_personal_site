var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(() => {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
})


$('#simon-game').click(() => {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
})

$('#simon-game .btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    simonPlaySound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        new Audio(pathname + 'assets/sounds/simon-game/wrong.mp3').play();
        $('#simon-game .game-container').addClass('game-over');
        $('#simon-game #level-title').text('Game Over, Press Any Key to Restart');
        startOver();

        setTimeout(() => {
            $('#simon-game .game-container').removeClass('game-over');
        }, 200);
    }
}

function nextSequence() {
    $('#simon-game #level-title').text(`Level ${level}`);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    userClickedPattern = [];

    $(`#simon-game #${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    simonPlaySound(randomChosenColor);
}

function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
}

function simonPlaySound(name) {
    new Audio(`${pathname}assets/sounds/simon-game/${name}.mp3`).play();
}

function animatePress(currentColor) {
    $(`.${currentColor}`).addClass('pressed');

    setTimeout(() => {
        $(`.${currentColor}`).removeClass('pressed');
    }, 100);
}