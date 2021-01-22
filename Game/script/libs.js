function showScores() {
    scoreText = game.add.text(650, 50, "", {
        font: "bold 25px Arial",
        fill: "#fff",
    });
    topscore = game.add.text(650, 10, "", {
        font: "bold 25px Arial",
        fill: "#fff",
    });
}

var dropSound = function() {
    var executed = false;
    return function(value) {
        // if an argument is not present then
        if (arguments.length == 0) {
            if (!executed) {
                executed = true;
                //Do stuff here only once unless reset  
                setTimeout(() => {
                    gameover.style.visibility = "visible";
                }, 1200);
                drop.play();
            } else return;

        } else {
            // otherwise allow the function to fire again
            executed = value;
            return;
        }
    }
}();
var bgSound = function() {
    var executed = false;
    return function(value) {
        // if an argument is not present then
        if (arguments.length == 0) {
            if (!executed) {
                executed = true;
                //Do stuff here only once unless reset 
                vltk.play();
                vltk.volume = 0.1;
            } else return;

        } else {
            // otherwise allow the function to fire again

            executed = value;
            return;
        }
    }
}();

function spacePress() {
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    space.onDown.add(prepareToJump, this);
    space.onUp.add(jump, this);
    up.onDown.add(prepareToJump, this);
    up.onUp.add(jump, this);
}

function removeSpacePress() {
    space.onDown.remove(prepareToJump, this);
    space.onUp.remove(jump, this);
    up.onDown.remove(prepareToJump, this);
    up.onUp.remove(jump, this);
}

function notMoveNinja() {
    ninja.body.velocity.x = 0;
}

//ninja plus velocity x
function removeEventListenerWhenFly() {
    //Do stuff here only once unless reset 
    ninja.body.velocity.x = 5;
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    removeSpacePress();
};

function updateScore() {


    //score in game
    scoreText.text = "Score: " + score;
    topscore.text = "Best  : " + topScore;

    //score when lose
    showScore.innerHTML = "Score: " + score;
    showTopScore.innerHTML = "Best: " + topScore;
}

function prepareToJump() {
    if (ninja.body.velocity.y == 0) {
        notMoveNinja();
        powerBar = game.add.sprite(ninja.x, ninja.y - 50, "powerbar");
        powerBar.width = 0;
        powerTween = game.add.tween(powerBar).to({
            width: 100
        }, 1000, "Linear", true);
        game.input.onDown.remove(prepareToJump, this);
        game.input.onUp.add(jump, this);
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
    }
}
// keyDown move
function keyDownHandler(event) {
    //rightPressed
    if (event.keyCode == 39) {
        ninja.body.velocity.x = 200;
        //leftPressed
    } else if (event.keyCode == 37) {
        ninja.body.velocity.x = -200;
    }
    //game.input.keyboard.removeKeyCapture(Phaser.Keyboard.TWO);   
}
// keyUp move
function keyUpHandler(event) {
    //rightPressed
    if (event.keyCode == 39) {
        ninja.body.velocity.x = 0;
        //leftPressed
    } else if (event.keyCode == 37) {
        ninja.body.velocity.x = 0;
    }
}

function jump() {
    ninjaJumpPower = -powerBar.width * 3 - 100;
    powerBar.destroy();
    game.tweens.removeAll();
    ninja.body.velocity.y = ninjaJumpPower * 2;
    ninjaJumping = true;
    powerTween.stop();
    game.input.onUp.remove(jump, this);
    jumpSound.play();
    removeEventListenerWhenFly();
}

function addNewPoles() {
    var maxPoleX = 0;
    poleGroup.forEach(function(item) {
        maxPoleX = Math.max(item.x, maxPoleX)
    });
    var nextPolePosition = maxPoleX + game.rnd.between(minPoleGap, maxPoleGap);
    addPole(nextPolePosition);
}

function addNewCoins() {
    var maxCoinX = 0;
    coinGroup.forEach(function(item) {
        maxCoinX = Math.max(item.x, maxCoinX)
    });
    var nextCoinPosition = maxCoinX + game.rnd.between(minPoleGap, maxPoleGap);
    addCoin(nextCoinPosition);

}


function addPole(poleX) {
    if (poleX < game.width * 2) {
        placedPoles++;
        var pole = new Pole(game, poleX, game.rnd.between(poleMinHeight, poleMaxHeight));
        game.add.existing(pole);
        pole.anchor.set(0.5, 0);
        poleGroup.add(pole);
        var nextPolePosition = poleX + game.rnd.between(minPoleGap, maxPoleGap);
        addPole(nextPolePosition);
    }
}

function addCoin(coinX) {
    if (coinX < game.width * 2) {
        placedCoins++;
        var coin = new Coin(game, coinX, game.rnd.between(poleMinHeight - 100, poleMaxHeight - 100));
        game.add.existing(coin);
        coin.anchor.set(0.5, 0);
        coinGroup.add(coin);
        var nextCoinPosition = coinX + game.rnd.between(minPoleGap, maxPoleGap);
        addCoin(nextCoinPosition);
    }
}

function waveMove(w) {
    setInterval(() => {
        w.body.velocity.y = -200;
    }, 1500);
}

function checkCollision(n, c) {
    if (n.x + n.y + c.width + c.height) {
        console.log("collistion");
        cost = 1;
        c.destroy();
        notMoveNinja();

        scc = game.add.text(450, 150, "+" + cost, {
            font: "bold 23px sanserif",
            fill: "#fff700",
        });
        setTimeout(() => {
            scc.destroy();
        }, 500);
        score += cost;
    }
}

function checkLanding(n, p) {
    if (p.y >= n.y + n.height / 2) {
        var border = n.x - p.x;
        notMoveNinja();
        ninja.angle = -20;
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        spacePress();

        if (Math.abs(border) > 44) {
            n.body.velocity.x = border;
            n.body.velocity.y = Math.abs(border) * 10;
        }
        var poleDiff = p.poleNumber - n.lastPole;
        if (poleDiff > 0) {
            score += Math.pow(2, poleDiff - 1);
            updateScore();
            n.lastPole = p.poleNumber;
        }
        if (poleDiff > 1) {
            score += Math.pow(2, Math.floor(poleDiff - 1));
            scorePlus = Math.pow(2, Math.floor(poleDiff));
            n.lastPole = p.poleNumber;
            scorePlus = game.add.text(400, 150, "+" + scorePlus, {
                font: "bold 23px sanserif",
                fill: "#252fff",
            });

            setTimeout(() => {
                scorePlus.destroy();
            }, 500);
        }

        if (ninjaJumping) {
            ninjaJumping = false;
            game.input.onDown.add(prepareToJump, this);
        }

    } else {
        ninjaFallingDown = true;
        poleGroup.forEach(function(item) {
            item.body.velocity.x = 0;
        });
        coinGroup.forEach(function(item) {
            item.body.velocity.x = 0;
        });
    }
}

function die() {
    localStorage.topFlappyScore = Math.max(score, topScore);
    dropSound(false);
    ninjaJumping = false;
    repEasy.onclick = () => {
        gameover.style.visibility = "hidden";
        maxPoleGap = gapLv2;
        minPoleGap = gapLv2;

        poleMaxHeight = heightLv1;
        poleMinHeight = heightLv2;
        game.state.start("Play");
    };

}