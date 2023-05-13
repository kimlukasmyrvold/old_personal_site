// ******************************************
// *                Drum-kit                *
// ******************************************

function drumKit() {
    // Playing sound and animation on click
    for (var i = 0; i < document.querySelectorAll('#drum-kit .drum').length; i++) {
        document.querySelectorAll('#drum-kit .drum')[i].addEventListener('click', function () {
            drumKit_playSound(this.innerHTML);
            drumKit_playAnimation(this.innerHTML);
        });
    }

    // Playing sound and animation on keypress
    document.addEventListener('keydown', function (keyboard) {
        if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyJ', 'KeyK', 'KeyL', 'KeyF'].includes(keyboard.code)) {
            drumKit_playSound(keyboard.key.toLowerCase());
            drumKit_playAnimation(keyboard.key.toLowerCase());
            console.log(keyboard.code)
        }
    });

    function drumKit_playSound(key) {
        switch (key) {
            case 'w':
                new Audio(pathname + 'assets/sounds/drum-kit/tom-1.mp3').play();
                break;
            case 'a':
                new Audio(pathname + 'assets/sounds/drum-kit/tom-2.mp3').play();
                break;
            case 's':
                new Audio(pathname + 'assets/sounds/drum-kit/tom-3.mp3').play();
                break;
            case 'd':
                new Audio(pathname + 'assets/sounds/drum-kit/tom-4.mp3').play();
                break;
            case 'f':
                new Audio(pathname + 'assets/sounds/drum-kit/metal-pipe-falling.mp3').play();
                break;
            case 'j':
                new Audio(pathname + 'assets/sounds/drum-kit/snare.mp3').play();
                break;
            case 'k':
                new Audio(pathname + 'assets/sounds/drum-kit/crash.mp3').play();
                break;
            case 'l':
                new Audio(pathname + 'assets/sounds/drum-kit/kick-bass.mp3').play();
                break;
        }
    }

    function drumKit_playAnimation(currentKey) {
        document.querySelector(`#drum-kit .${currentKey}`).classList.add('pressed');

        setTimeout(function () {
            document.querySelector(`#drum-kit .${currentKey}`).classList.remove('pressed');
        }, 100);
    }
};

drumKit();




// ******************************************
// *               Simon game               *
// ******************************************

function simonGame() {
    let buttonColors = ['red', 'blue', 'green', 'yellow'];

    let gamePattern = [];
    let userClickedPattern = [];

    let gameStarted = false;
    let level = 0;

    function simonGame_checkGameStart() {
        if (gameStarted === false) {
            gameStarted = true;
            simonGame_nextSequence();
        }
    }

    function simonGame_start() {
        $(document).one("keypress", simonGame_checkGameStart);
        $('#simon-game .game-container').one('click', simonGame_checkGameStart);
    }

    simonGame_start();

    $('#simon-game .btn').on('click', function () {
        let userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);

        simonGame_playSound(userChosenColor);
        simonGame_animatePress(userChosenColor);
        simonGame_checkAnswer(userClickedPattern.length - 1);
    });

    function simonGame_checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    simonGame_nextSequence();
                }, 1000);
            }
        }
        else {
            new Audio(pathname + 'assets/sounds/simon-game/wrong.mp3').play();
            $('#simon-game .game-container').addClass('game-over');
            $('#simon-game #level-title').text('Game Over, Press Any Key to Restart');


            setTimeout(() => {
                $('#simon-game .game-container').removeClass('game-over');

                simonGame_startOver();
            }, 200);
        }
    }

    function simonGame_nextSequence() {
        $('#simon-game #level-title').text(`Level ${level}`);
        level++;

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        userClickedPattern = [];

        $(`#simon-game #${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
        simonGame_playSound(randomChosenColor);
    }

    function simonGame_startOver() {
        gamePattern = [];
        gameStarted = false;
        level = 0;

        simonGame_start();
    }

    function simonGame_playSound(name) {
        new Audio(`${pathname}assets/sounds/simon-game/${name}.mp3`).play();
    }

    function simonGame_animatePress(currentColor) {
        $(`#simon-game .${currentColor}`).addClass('pressed');

        setTimeout(() => {
            $(`#simon-game .${currentColor}`).removeClass('pressed');
        }, 100);
    }
};

simonGame();




// *****************************************
// *               Dice game               *
// *****************************************

function rollDicee() {
    const title = document.querySelector('#dice-game h1');

    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector('#dice-game .img1').setAttribute('src', `${pathname}assets/images/dice-game/dice${randomNumber1}.png`);
    document.querySelector('#dice-game .img2').setAttribute('src', `${pathname}assets/images/dice-game/dice${randomNumber2}.png`);

    if (randomNumber1 > randomNumber2) {
        title.innerHTML = 'Player 1 won!';
    }
    else if (randomNumber1 < randomNumber2) {
        title.innerHTML = 'Player 2 won!';
    }
    else {
        title.innerHTML = "It's a draw!";
    }
}