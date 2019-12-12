import Phaser from 'phaser';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  // init(score) {}

  create() {
    const gameOverTitle = this.game.add.sprite(160, 160, 'game_over_primer');
    gameOverTitle.anchor.setTo(0.5, 0.5);
    const playButton = this.game.add.button(160, 320, 'play', this.playTheGame, this);
    playButton.anchor.setTo(0.5, 0.5);
  }

  playTheGame() {
    this.game.state.start('Game');
  }
}

export default GameOver;
