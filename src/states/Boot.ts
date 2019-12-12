import Phaser from 'phaser';
import * as preloadBar from '../assets/images/preloader-bar.png';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // assets we'll use in the loading screen
    this.load.image('preloadbar', preloadBar);
  }

  create() {
    this.scene.start('Preload');
  }
}

export default Boot;
