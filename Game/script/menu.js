var play = function(game) {};
play.prototype = {
    preload: function() {
        game.load.image("background", "img/BG2.jpg");
        game.load.image("ninja", "img/ninja.png");
        game.load.image("pole", "img/poles.png");
        game.load.image("powerbar", "img/powerbar.png");
        game.load.image("wave1", "img/wave.png");
        game.load.image("wave2", "img/wave1.png");
        game.load.image("wave3", "img/wave2.png");

        game.load.audio("drop", "audio/Dropping.mp3");
        game.load.audio("jumpsound", "audio/drip.mp3");
    },
    create: function() {
        game.add.tileSprite(0, 0, 840, 650, "background");
        game.add.tileSprite(0, 530, 840, 0, "wave3");
        ninjaJumping = false;
        ninjaFallingDown = false;
        score = 0;
        placedPoles = 0;
        poleGroup = game.add.group();
        topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        scoreText = game.add.text(450, 100, "0", {
            font: "bold 35px Arial",
            fill: "#fff",
            padding: 8,
        });
        drop = game.sound.add("drop");
        jumpSound = game.sound.add("jumpsound");

        updateScore();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        ninja = game.add.sprite(100, 0, "ninja");
        wave2 = game.add.tileSprite(0, 550, 840, 0, "wave2");
        game.add.tileSprite(0, 570, 840, 0, "wave1");
        ninja.anchor.set(0.5);
        ninja.lastPole = 1;
        game.physics.arcade.enable(ninja);
        game.physics.arcade.enable(wave2);
        var ninjaGravity = 800;
        ninja.body.gravity.y = ninjaGravity;
        game.input.onDown.add(prepareToJump, this);
        addPole(100);
    },
    update: function() {
        game.physics.arcade.collide(ninja, poleGroup, checkLanding);
        if (ninja.y > game.height) {
            die();
        }
    }
}