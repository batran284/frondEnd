// coin 
Coin = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "coin");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = false;
    this.coinNumber = placedCoins;
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;
Coin.prototype.update = function() {
    if (ninjaJumping && !ninjaFallingDown) {
        this.body.velocity.x = ninjaJumpPower;
    } else {
        this.body.velocity.x = 0;
    }
    if (this.x < -this.width) {
        this.destroy();
        addNewCoins();
    }
}