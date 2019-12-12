import Phaser from 'phaser';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  // init(score) {}

  create() {
    const gameOverTitle = this.add.image(160, 160, 'game_over_primer');
    const playButton = this.add.text(160, 320, 'play');
  }

  playTheGame() {
    this.scene.start('Game');
  }
}

export default GameOver;
