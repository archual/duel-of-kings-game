import Phaser from 'phaser';

class GameTitle extends Phaser.Scene {
  constructor() {
    super('GameTitle');
  }

  create() {
    //  Our tiled scrolling background
    const land = this.add.tileSprite(0, 0, 960, 540, 'startScreen');
    land.fixedToCamera = true;

    const playButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'go', this.playTheGame, this);
    playButton.anchor.setTo(0.5, 0.5);
  }

  playTheGame() {
    this.game.state.start('Game');
  }
}

export default GameTitle;
