var game = new Phaser.Game(840, 630, Phaser.CANVAS);

var minPoleGap = 100;
var maxPoleGap = 300;

var plays = document.getElementById('play');
var start = document.getElementById('start');
plays.onclick = () => {
    start.style.visibility = "hidden";
};

game.state.add("Play", play);
game.state.start("Play");

function updateScore() {
    scoreText.text = score;
    var showScore = document.getElementById('score');
    showScore.innerHTML = "Score: " + score;
    var showTopScore = document.getElementById('topScore');
    showTopScore.innerHTML = "Best: " + topScore;
}

function prepareToJump() {
    if (ninja.body.velocity.y == 0) {
        powerBar = game.add.sprite(ninja.x, ninja.y - 50, "powerbar");
        powerBar.width = 0;
        powerTween = game.add.tween(powerBar).to({
            width: 100
        }, 1000, "Linear", true);
        game.input.onDown.remove(prepareToJump, this);
        game.input.onUp.add(jump, this);
    }
}

function jump() {
    ninjaJumpPower = -powerBar.width * 3 - 100
    powerBar.destroy();
    game.tweens.removeAll();
    ninja.body.velocity.y = ninjaJumpPower * 2;
    ninjaJumping = true;
    powerTween.stop();
    game.input.onUp.remove(jump, this);
    jumpSound.play();
}

function addNewPoles() {
    var maxPoleX = 0;
    poleGroup.forEach(function(item) {
        maxPoleX = Math.max(item.x, maxPoleX)
    });
    var nextPolePosition = maxPoleX + game.rnd.between(minPoleGap, maxPoleGap);
    addPole(nextPolePosition);
}

function addPole(poleX) {
    if (poleX < game.width * 2) {
        placedPoles++;
        var pole = new Pole(game, poleX, game.rnd.between(250, 380));
        game.add.existing(pole);
        pole.anchor.set(0.5, 0);
        poleGroup.add(pole);
        var nextPolePosition = poleX + game.rnd.between(minPoleGap, maxPoleGap);
        addPole(nextPolePosition);
    }
}

function checkLanding(n, p) {
    if (p.y >= n.y + n.height / 2) {
        var border = n.x - p.x;
        if (Math.abs(border) > 43) {
            n.body.velocity.x = border * 2;
            n.body.velocity.y = -200;
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
                fill: "#3c5abd",
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
        drop.play();
        poleGroup.forEach(function(item) {
            item.body.velocity.x = 0;
        });
    }
}

function die() {
    localStorage.topScore = Math.max(score, topScore);
    ninjaJumping = false;
    var gameover = document.getElementById("gameover");
    gameover.style.visibility = "visible";
    var playAgainBtn = document.getElementById('playAgainBtn');
    playAgainBtn.onclick = function() {
        game.state.start("Play");
        gameover.style.visibility = "hidden";
    };
}

Pole = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "pole");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.poleNumber = placedPoles;
};

Pole.prototype = Object.create(Phaser.Sprite.prototype);
Pole.prototype.constructor = Pole;
Pole.prototype.update = function() {
    if (ninjaJumping && !ninjaFallingDown) {
        this.body.velocity.x = ninjaJumpPower;
    } else {
        this.body.velocity.x = 0;
    }
    if (this.x < -this.width) {
        this.destroy();
        addNewPoles();
    }
}