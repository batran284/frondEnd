var game = new Phaser.Game(840, 630, Phaser.CANVAS);
  


game.state.add("Play", play);
game.state.start("Play");
 

    