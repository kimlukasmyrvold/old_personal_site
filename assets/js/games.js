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
// *           Game Window Code           *
// ****************************************
(function () {
    const gameStartButtons = document.querySelectorAll('#game-start');
    const gameWindow = document.querySelector('.game-window');
    const gameContainer = gameWindow.querySelector('.game-container');
    const gameClose = gameContainer.querySelector('.game-close');

    // Function for opening the game window
    function openGameWindow(e) {
        gameWindow.classList.add('visible');
        disableScrolling();
        loadGameWindowContent(e);

        // Closing the game window
        gameClose.addEventListener('click', closeGameWindow);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') closeGameWindow();
        }, { once: true });
    }

    // Function for closing the game window
    function closeGameWindow() {
        gameWindow.classList.remove('visible');
        enableScrolling();

        // Remove added scripts
        const gameAppendedScript = document.querySelectorAll('.gameAppendedScript');
        gameAppendedScript.forEach((script) => { script.remove(); });
    }

    // Function for loading the game window content
    function loadGameWindowContent(event) {
        const target = event.target.dataset.gametitle;
        loadHTML(".game-content", `${target}.html`, () => {
            if (typeof window[target] === 'function') {
                window[target]();
            } else {
                console.error(`${target} is not a function.`);
            }
        });
    }

    // Check for click on each game start button and call openGameWindow function
    gameStartButtons.forEach((el) => { el.addEventListener('click', openGameWindow) });
})();




// ****************************************
// *               Drum kit               *
// ****************************************

function drumKit() {
    const audioPath = '/assets/sounds/drum-kit/';
    const drumKit = document.querySelector('#drum-kit');

    // Playing sound and animation on click
    for (let i = 0; i < drumKit.querySelectorAll('.drum').length; i++) {
        drumKit.querySelectorAll('.drum')[i].addEventListener('click', function () {
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
        drumKit.querySelector(`.${currentKey}`).classList.add('pressed');

        setTimeout(function () {
            drumKit.querySelector(`.${currentKey}`).classList.remove('pressed');
        }, 100);
    }

};




// ******************************************
// *               Simon game               *
// ******************************************

function simonGame() {
    const simonGame = document.querySelector('#simon-game');

    // The button colors
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    const scoreTable = simonGame.querySelector('.score-table');

    // Default values
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;
    let scores = JSON.parse(localStorage.getItem('simonGameScores')) || [];

    function addScores() {
        // Reset score table
        scoreTable.textContent = '';

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
        simonGame.classList.add('game-over');
        simonGame.querySelector('.title').textContent = 'Game Over!, Click me to Restart';
        simonGame_event('wrong');

        setTimeout(() => {
            simonGame.classList.remove('game-over');
        }, 200);

        // Resetting values
        gamePattern = [];
        started = false;
        level = 0;
    };

    // Handle click
    simonGame.addEventListener('click', (e) => {
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
        simonGame.querySelector('.title').textContent = `Level ${level++}`;

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
        a.volume = .3;
        a.play();

        if (value === 'wrong') return;

        // Apply animation
        simonGame.querySelector(`.${value}`).classList.add('pressed');
        setTimeout(() => {
            simonGame.querySelector(`.${value}`).classList.remove('pressed');
        }, 150);
    };
};




// *****************************************
// *               Dice game               *
// *****************************************
function diceGame() {
    const diceGame = document.querySelector('#dice-game');

    diceGame.addEventListener('click', (e) => {
        if (!Array.from(e.target.classList).some(className => className.includes('player'))) {
            const randomNumber1 = Math.floor(Math.random() * 6) + 1;
            const randomNumber2 = Math.floor(Math.random() * 6) + 1;

            diceGame.querySelector('#dice1').setAttribute('class', `icon-dice-${randomNumber1}`);
            diceGame.querySelector('#dice2').setAttribute('class', `icon-dice-${randomNumber2}`);

            diceGame.querySelector('.title').textContent = (() => {
                if (randomNumber1 > randomNumber2) return `${diceGame.querySelector('.player1').textContent} won!`;
                if (randomNumber1 < randomNumber2) return `${diceGame.querySelector('.player2').textContent} won!`;
                return "It's a draw!";
            })();

            addIcons();
        }
    });

    diceGame.querySelectorAll("span").forEach((el) => {
        el.addEventListener('keydown', function (e) {
            if (e.code === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
}




// *****************************************
// *               Pong game               *
// *****************************************
function pongGame() {
    // Appending phaser script to body
    const phaserScript = document.createElement('script');
    phaserScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js');
    phaserScript.setAttribute('class', 'gameAppendedScript');
    document.body.append(phaserScript);

    phaserScript.addEventListener('load', () => {
        // Game configuration
        const config = {
            type: Phaser.AUTO,
            width: 1024,
            height: 576,
            parent: 'game-container',
            transparent: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            },
            callbacks: {
                postBoot: function (game) {
                    game.canvas.style.width = '100%';
                    game.canvas.style.height = '100%';
                }
            }
        };

        // Initialize the game
        const game = new Phaser.Game(config);
        const scoreTextA = document.querySelector('.playerA');
        const scoreTextB = document.querySelector('.playerB');
        let paddleA, paddleB, ball;
        let running = false;
        let scoreA = 0;
        let scoreB = 0;
        let start, stop;

        function preload() {
            // Preload game assets
            this.load.image('paddle', '/assets/images/pongGame/paddle.png');
            this.load.image('ball', '/assets/images/pongGame/ball.png');
            this.load.audio('bounce', '/assets/sounds/pongGame/bounce.wav');
        }

        function create() {
            // Create game objects
            paddleA = this.physics.add.sprite(20, game.config.height / 2, 'paddle');
            paddleB = this.physics.add.sprite(game.config.width - 20, game.config.height / 2, 'paddle');
            ball = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'ball');

            // Set up physics
            paddleA.setCollideWorldBounds(true);
            paddleA.setImmovable(true);
            paddleB.setCollideWorldBounds(true);
            paddleB.setImmovable(true);
            ball.setCollideWorldBounds(true);
            ball.setBounce(1, 1);

            // Register the collision event for the ball hitting walls
            this.physics.world.on('worldbounds', ballHitWall);

            // Enable collision event for ball hitting walls
            ball.body.onWorldBounds = true;

            // Get the buttons from the HTML document
            start = document.querySelector('.start');
            stop = document.querySelector('.stop');

            // Add event listeners to the buttons
            start.addEventListener('click', startGame);
            stop.addEventListener('click', stopGame);
        }

        function update() {
            if (running) {
                // Move paddles
                const paddleSpeed = 600;
                const cursors = this.input.keyboard.createCursorKeys();
                const keyboard = this.input.keyboard;

                if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
                    paddleA.setVelocityY(-paddleSpeed);
                } else if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
                    paddleA.setVelocityY(paddleSpeed);
                } else {
                    paddleA.setVelocityY(0);
                }

                if (cursors.up.isDown) {
                    paddleB.setVelocityY(-paddleSpeed);
                } else if (cursors.down.isDown) {
                    paddleB.setVelocityY(paddleSpeed);
                } else {
                    paddleB.setVelocityY(0);
                }

                // Ball collision with paddles
                this.physics.world.collide(ball, paddleA, playSound);
                this.physics.world.collide(ball, paddleB, playSound);
            }
        }

        function startGame() {
            if (!running) addScore(scoreA = 0, scoreB = 0);
            running = true;
            ball.setPosition(game.config.width / 2, game.config.height / 2);
            ball.setVelocity(300);
        }

        function stopGame() {
            if (!running) return;
            running = false;
            ball.setVelocity(0);
        }

        // Function to handle ball collision with walls
        function ballHitWall(body, up, down, left, right) {
            if (right) {
                ++scoreA;
                startGame();
            } else if (left) {
                ++scoreB;
                startGame();
            }
            addScore(scoreA, scoreB)
            playSound();
        }

        function addScore(scoreA, scoreB) {
            // Showing score to players
            scoreTextA.textContent = scoreA;
            scoreTextB.textContent = scoreB;

            // Checking for winner
            if (scoreA >= 11 && scoreB < scoreA - 1) {
                console.log('player A won!')
                stopGame();
            }

            if (scoreB >= 11 && scoreA < scoreB - 1) {
                console.log('player B won!')
                stopGame();
            }
        }

        function playSound() {
            let bounce = new Audio('/assets/sounds/pongGame/bounce.wav');
            bounce.volume = .7;
            bounce.play();
        }
    });

}