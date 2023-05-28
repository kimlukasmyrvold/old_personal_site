// ****************************************
// *            Preload Assets            *
// ****************************************
window.loadAssets = new LoadAssets();

window.onload = function () {
    window.loadAssets.load([
        { id: "tom-1-audio", var: tom1Audio = document.createElement("audio"), file: "assets/sounds/drum-kit/tom-1.mp3" },
        { id: "tom-2-audio", var: tom2Audio = document.createElement("audio"), file: "assets/sounds/drum-kit/tom-2.mp3" },
        { id: "tom-3-audio", var: tom3Audio = document.createElement("audio"), file: "assets/sounds/drum-kit/tom-3.mp3" },
        { id: "tom-4-audio", var: tom4Audio = document.createElement("audio"), file: "assets/sounds/drum-kit/tom-4.mp3" },
        { id: "metal-audio", var: metalAudio = document.createElement("audio"), file: "assets/sounds/drum-kit/metal-falling.mp3" },
        { id: "snare-audio", var: snareAudio = document.createElement("audio"), file: "assets/sounds/drum-kit/snare.mp3" },
        { id: "crash-audio", var: crashAudio = document.createElement("audio"), file: "assets/sounds/drum-kit/crash.mp3" },
        { id: "kick-bass-audio", var: kickBassAudio = document.createElement("audio"), file: "assets/sounds/drum-kit/kick-bass.mp3" },
        { id: "red-audio", var: redAudio = document.createElement("audio"), file: "assets/sounds/simon-game/red.mp3" },
        { id: "green-audio", var: greenAudio = document.createElement("audio"), file: "assets/sounds/simon-game/green.mp3" },
        { id: "blue-audio", var: blueAudio = document.createElement("audio"), file: "assets/sounds/simon-game/blue.mp3" },
        { id: "yellow-audio", var: yellowAudio = document.createElement("audio"), file: "assets/sounds/simon-game/yellow.mp3" },
        { id: "wrong-audio", var: wrongAudio = document.createElement("audio"), file: "assets/sounds/simon-game/wrong.mp3" },
    ]);
};




// ****************************************
// *               Drum kit               *
// ****************************************

function drumKit() {
    document.querySelector('#drum-kit .game-start').style.display = 'none';
    const audioPath = '/assets/sounds/drum-kit/'

    // Playing sound and animation on click
    for (let i = 0; i < document.querySelectorAll('#drum-kit .drum').length; i++) {
        document.querySelectorAll('#drum-kit .drum')[i].addEventListener('click', function () {
            drumKit_playSound(this.innerHTML);
            drumKit_playAnimation(this.innerHTML);
        });
    }

    // Playing sound and animation on keypress
    document.addEventListener('keydown', function (keyboard) {
        if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL'].includes(keyboard.code)) {
            drumKit_playSound(keyboard.key.toLowerCase());
            drumKit_playAnimation(keyboard.key.toLowerCase());
        }
    });

    function drumKit_playSound(key) {
        switch (key) {
            case 'w':
                new Audio(`${audioPath}tom-1.mp3`).play();
                break;
            case 'a':
                new Audio(`${audioPath}tom-2.mp3`).play();
                break;
            case 's':
                new Audio(`${audioPath}tom-3.mp3`).play();
                break;
            case 'd':
                new Audio(`${audioPath}tom-4.mp3`).play();
                break;
            case 'f':
                let a = new Audio(`${audioPath}metal-falling.mp3`);
                a.volume = .6;
                a.play();
                break;
            case 'j':
                new Audio(`${audioPath}snare.mp3`).play();
                break;
            case 'k':
                new Audio(`${audioPath}crash.mp3`).play();
                break;
            case 'l':
                new Audio(`${audioPath}kick-bass.mp3`).play();
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




// ******************************************
// *               Simon game               *
// ******************************************

function simonGame() {
    document.querySelector('#simon-game .game-start').style.display = 'none';

    // The button colors
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    const scoreTable = $('#simon-game .score-table');

    // Default values
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;
    let scores = JSON.parse(localStorage.getItem('simonGameScores')) || [];

    function addScores() {
        // Reset score table
        scoreTable.text('');

        // scores.forEach(score => {
        scores.forEach(score => {
            const li = document.createElement('li');
            const value = document.createTextNode('Level: ' + score);

            li.append(value);
            scoreTable.append(li);
        });
    }
    addScores();

    // Restart function
    function simonGame_restart() {
        // Push level to scores array
        scores.push(--level);

        // Sort numbers in array from highest to lowest number
        scores = scores.sort((a, b) => b - a);

        if (scores.length > 5) scores.length = 5;
        localStorage.setItem('simonGameScores', JSON.stringify(scores));

        addScores();

        // Add game over to screen
        $('#simon-game .game-content').addClass('game-over');
        $('#simon-game .title').text('Game Over!, Click me to Restart');
        simonGame_event('wrong')

        setTimeout(() => {
            $('#simon-game .game-content').removeClass('game-over');
        }, 200);

        // Reset values
        gamePattern = [];
        started = false;
        level = 0;
    };

    // Handel click
    $('#simon-game .game-content').on('click', (e) => {
        if (!started) {
            started = true;
            simonGame_next();
        } else if (started && Array.from(e.target.classList).includes('btn')) {
            let userChosenColor = e.target.id
            userClickedPattern.push(userChosenColor);

            simonGame_event(userChosenColor);
            simonGame_checkAnswer(userClickedPattern.length - 1);
        }
    });

    // Check if answer is correct
    function simonGame_checkAnswer(currentLevel) {
        // Check if gamePattern is the same as userClickedPattern
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                // Call next sequence after 1 second delay
                setTimeout(() => {
                    simonGame_next();
                }, 1000);
            }
        } else {
            // Restart the game
            simonGame_restart();
        };
    };

    // Send next sequence
    function simonGame_next() {
        $('#simon-game .title').text(`Level ${level++}`);

        // Clear userClickedPattern to prepare for next sequence
        userClickedPattern = [];

        // Generate random number
        let randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
        gamePattern.push(randomChosenColor);

        simonGame_event(randomChosenColor);
    };

    // Play sound and animation
    function simonGame_event(value) {
        // Play sound
        let a = new Audio(`/assets/sounds/simon-game/${value}.mp3`);
        a.volume = .6;
        a.play();

        // Apply animation
        $(`#simon-game .${value}`).addClass('pressed');
        setTimeout(() => {
            $(`#simon-game .${value}`).removeClass('pressed');
        }, 150);
    };
};




// *****************************************
// *               Dice game               *
// *****************************************

$('#dice-game .game-container').on('click', (e) => {
    if (!Array.from(e.target.classList).some(className => className.includes('player'))) {
        const randomNumber1 = Math.floor(Math.random() * 6) + 1;
        const randomNumber2 = Math.floor(Math.random() * 6) + 1;

        $('#dice-game #dice1').attr('class', `icon-dice-${randomNumber1}`);
        $('#dice-game #dice2').attr('class', `icon-dice-${randomNumber2}`);

        addIcons();

        $('#dice-game .title').text((() => {
            if (randomNumber1 > randomNumber2) return `${$('.player1').text()} won!`;
            if (randomNumber1 < randomNumber2) return `${$('.player2').text()} won!`;
            return "It's a draw!";
        })());
    }
});

$("#dice-game .game-container span").on('keydown', function (e) {
    if (e.code === 'Enter') {
        e.preventDefault();
        $(this).blur();
    }
});

