export function rollDicee() {
    const title = document.querySelector('#dice-game h1');

    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector('.img1').setAttribute('src', `${pathname}assets/images/dice-game/dice${randomNumber1}.png`);
    document.querySelector('.img2').setAttribute('src', `${pathname}assets/images/dice-game/dice${randomNumber2}.png`);

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