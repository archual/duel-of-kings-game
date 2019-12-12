import Phaser from 'phaser';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  }

  create() {
    this.scene.start('Preload');
  }
}

export default Boot;
