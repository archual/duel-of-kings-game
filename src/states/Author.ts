import Phaser from 'phaser';

class Author extends Phaser.Scene {
  constructor() {
    super('Author');
  }

  create() {
    //  Our tiled scrolling background
    const land = this.add.tileSprite(0, 0, 960, 540, 'startScreen');
    land.fixedToCamera = true;

    const playButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'go', this.playTheGame, this);
    playButton.anchor.setTo(0.5, 0.5);
  }

  playTheGame() {
    this.state.start('Game');
  }
}

export default Author;
