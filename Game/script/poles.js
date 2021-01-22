
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