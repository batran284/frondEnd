var play = function(game) {};
play.prototype = {
    preload: function() {
        game.load.image("background", "img/BG2.png");
        game.load.image("ninja", "img/ninja.png");
        game.load.image("pole", "img/poles.png");
        game.load.image("powerbar", "img/powerbar.png");
        game.load.image("wave1", "img/wave1.png");
        game.load.image("wave2", "img/wave2.png");
        game.load.image("wave3", "img/wave3.png");
        game.load.image("coin", "img/coin.png");

        game.load.audio("drop", "audio/dropping.mp3");
        game.load.audio("jumpsound", "audio/jump.mp3");
        game.load.audio("vltk", "audio/vltk.mp3");

    },
    create: function() {
        game.add.tileSprite(0, 0, 840, 650, "background");
        wave3 = game.add.sprite(0, 530, "wave3");
        ninjaJumping = false;
        ninjaFallingDown = false;
        score = 0;
        placedPoles = 0;
        placedCoins = 0;
        poleGroup = game.add.group();
        coinGroup = game.add.group();
        topScore = localStorage.getItem("topFlappyScore") == null ? 0 : localStorage.getItem("topFlappyScore");
        showScores();

        drop = game.sound.add("drop");
        jumpSound = game.sound.add("jumpsound");
        vltk = game.sound.add("vltk");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        ninja = game.add.sprite(100, 0, "ninja");
        wave2 = game.add.sprite(0, 540, "wave1");
        wave1 = game.add.sprite(0, 550, "wave2");
        ninja.anchor.set(0.5);
        ninja.lastPole = 1;
        game.physics.arcade.enable(ninja);
        game.physics.arcade.enable(wave1);
        game.physics.arcade.enable(wave2);
        game.physics.arcade.enable(wave3);
        ninja.body.gravity.y = ninjaGravity;
        spacePress();
        game.input.onDown.add(prepareToJump, this);
        addPole(100);
        addCoin(100);
        bgSound();
        setInterval(() => {
            vltk.play();
            vltk.volume = 0.1;
        }, 122000);

    },
    update: function() {
        updateScore();
        game.physics.arcade.collide(ninja, poleGroup, checkLanding);
        game.physics.arcade.collide(ninja, coinGroup, checkCollision);
        if (ninja.y > game.height) {
            die();
        } else if (ninja.y > 450) {
            dropSound();
        } else if (ninja.y > 400) {
            ninja.angle = -25;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            ninja.angle = 0;
            ninja.body.allowRotation = true;
        } else {
            ninja.angle += 20;
        }

        //waves moves up down
        if (wave1.y > game.height - 80) {
            wave1.body.gravity.y = -10;
        } else {
            wave1.body.velocity.y = 20;
        }

        if (wave2.y > game.height - 90) {
            wave2.body.gravity.y = -30;
        } else {
            wave2.body.velocity.y = 30;
        }

        if (wave3.y > game.height - 110) {
            wave3.body.gravity.y = -25;
        } else {
            wave3.body.velocity.y = 25;
        }
    }
}