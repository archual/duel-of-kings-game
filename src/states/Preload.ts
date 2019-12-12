import Phaser from 'phaser';
import { gameConfig } from '../index';

class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    // this.load.setPreloadSprite(this.preloadBar);

    // Title screen.
    this.load.image('startScreen', 'assets/images/start_screen.jpg');
    this.load.image('go', 'assets/images/go.png');
    this.load.image('go_again_hover_360', 'assets/images/go_again_hover_360.png');
    this.load.image('go_again_normal_360', 'assets/images/go_again_normal_360.png');
    this.load.image('go_hover_360', 'assets/images/go_hover_360.png');

    // load game assets
    this.load.spritesheet('android', 'assets/images/robot_walk.png', {
      frameWidth: 50,
      frameHeight: 104,
      startFrame: 0,
      endFrame: 8,
    });
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('android_fall_720', 'assets/images/android_fall_720.png');
    this.load.image('avtory_hover', 'assets/images/avtory_hover.png');
    this.load.image('avtory_hover_360', 'assets/images/avtory_hover_360.png');
    this.load.image('avtory_normal', 'assets/images/avtory_normal.png');
    this.load.image('avtory_normal_360', 'assets/images/avtory_normal_360.png');
    this.load.image('back', 'assets/images/back_1.jpg');

    this.load.image('battery', 'assets/images/battery_360.png');
    this.load.image('sms', 'assets/images/sms_360.png');
    this.load.image('socket', 'assets/images/socket_360.png');

    this.load.image('bg_game_over_480', 'assets/images/bg_game_over_480.png');
    this.load.image('bookcase_360', 'assets/images/bookcase_360.png');

    this.load.image('lamp', 'assets/images/lamp_360.png');
    this.load.image('shelf', 'assets/images/bookshelf.png');
    this.load.image('chair', 'assets/images/chair.png');
    this.load.image('picture', 'assets/images/flowers1_360.png');
    this.load.image('picture2', 'assets/images/flowers3_360.png');

    this.load.image('close_window_hover_360', 'assets/images/close_window_hover_360.png');
    this.load.image('dark_720', 'assets/images/dark_720.png');
    this.load.spritesheet('playerDig', 'assets/images/dog_dig.png', {
      frameWidth: 129,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 2,
    });
    this.load.spritesheet('playerScratch', 'assets/images/dog_scratch.png', {
      frameWidth: 116,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 2,
    });
    this.load.image('dark_720', 'assets/images/dark_720.png');
    this.load.image('floor_1', 'assets/images/floor_1.jpg');
    this.load.image('flowers1_360', 'assets/images/flowers1_360.png');
    this.load.image('flowers3_360', 'assets/images/flowers3_360.png');
    this.load.image('game_over_primer', 'assets/images/game_over_primer_480.jpg');

    this.load.audio('level01', ['assets/audio/music/level01.wav']);

    // show loading screen
    const preloadBar = this.add.image(gameConfig.centerX, gameConfig.centerY, 'preloadbar');
    preloadBar.scale = 3;

    const { x, y, width: w, height: h } = preloadBar;

    // (3) Create a camera to fake a texture crop.
    const camera = this.cameras.add(150, 145, 0, h).setScroll(x, y);

    // (4) Bind the 'progress' event, use its value to stretch the viewport width.
    this.load.on('progress', (n) => camera.setSize(Math.ceil(n * w), h));
  }

  // create() {
  //   this.state.start('Title');
  // }
}

export default Preload;
