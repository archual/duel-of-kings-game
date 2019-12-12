import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    this.score = 0;
    this.scoreText = null;

    this.player = null;
    this.land = null;

    this.timer = null;
    this.scrollSpeed = -600;
    this.itemInterval = { min: 250, max: 500 };
    this.iconInterval = { min: 250, max: 500 };

    this.iconCount = 0;
    this.iconInterval = 20;

    this.pauseKey = null;
    this.debugKey = null;
    this.showDebug = false;

    this.playerEnergy = 100;
  }

  init() {
    this.playerEnergy = 100;
    this.score = 0;
    this.iconScore = 500;
    this.batteryEnergy = 15;
    this.socketEnergy = 100;
    this.runScore = 10;

    this.timer = this.time.create(false);
    this.scrollSpeed = -700;
    this.itemInterval = { min: 200, max: 250 };
    this.iconInterval = { min: 2500, max: 2500 };
    this.batteriesInterval = { min: 3000, max: 3000 };
    this.socketInterval = { min: 60000, max: 60000 };

    // this.iconInterval = { min: 100, max: 1000 };
    // this.batteriesInterval = { min: 100000, max: 10000000 };
    // this.socketInterval = { min: 1000000, max: 10000000 };

    // this.flagCount = 0;
    // this.iconInterval = 20;

    this.showDebug = false;
    this.levelObjects = [
      [
        {
          name: 'chair',
          line: 2,
        },
      ],
      [
        {
          name: 'shelf',
          line: 1,
        },
      ],
      [
        {
          name: 'lamp',
          line: 0,
        },
        {
          name: 'picture',
          line: 0,
        },
        {
          name: 'picture2',
          line: 0,
        },
      ],
    ];

    this.levelIcons = [
      {
        name: 'sms',
      },
    ];
  }

  preload() {
    this.game.time.advancedTiming = true;
  }

  create() {
    this.jumpCount = 0;
    this.timeGame = 0;
    this.timeGame2 = 0;
    this.timerSubject = this.game.time.create(false);
    this.timerIcons = this.game.time.create(false);
    this.timerBattery = this.game.time.create(false);
    this.timerSocket = this.game.time.create(false);
    this.timerDis = this.game.time.create(false);

    this.land = this.add.physicsGroup();
    this.subjects = this.game.add.group();
    this.subjects.enableBody = true;
    this.icons = this.add.physicsGroup();
    this.batteries = this.add.physicsGroup();
    this.sockets = this.add.physicsGroup();

    //   this.objects = this.game.add.group();

    // Enable physics in them
    // this.objects.enableBody = true;

    this.addBackGround('create');
    this.ground = this.add.tileSprite(0, this.game.height - 20, this.game.world.width, 20, 'ground');

    this.game.world.sendToBack(this.ground);
    this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 125, 'android');
    this.player.animations.add('walk');

    // play the walking animation
    this.player.animations.play('walk', Math.floor(-this.scrollSpeed / 30), true);

    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.ground);
    // so player can walk on ground
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    // timers.

    //  Set a TimerEvent to occur after 2 seconds
    this.timerSubject.loop(this.itemInterval.max, this.releaseSubject, this);
    this.timerIcons.loop(this.iconInterval.max, this.releaseIcon, this);
    this.timerBattery.loop(this.batteriesInterval.max, this.releaseBattery, this);
    this.timerSocket.loop(this.socketInterval.max, this.releaseSocket, this);

    this.timerDis.loop(1000, this.discharge, this);

    this.timerSubject.start();
    this.timerIcons.start();
    this.timerBattery.start();
    this.timerSocket.start();
    this.timerDis.start();

    //  Press P to pause and resume the game
    this.pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onDown.add(this.togglePause, this);

    //  Press D to toggle the debug display
    this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.debugKey.onDown.add(this.toggleDebug, this);

    this.game.world.bringToTop(this.player);

    // player gravity
    this.player.body.gravity.y = 4500;

    // the camera will follow the player in the world
    this.game.camera.follow(this.player);

    this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    // move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // ...or by swiping
    // this.swipe = this.game.input.activePointer;

    // sounds
    // this.level01Sound = this.game.add.audio("level01");
    // this.level01Sound.play('', 0, 1, true);
    // this.game.sound.setDecodedCallback(this.level01Sound, this.start, this);
    // this.level01Sound.loopFull(0.6);
    // this.game.sound.setDecodedCallback(this.level01Sound, start, this);

    // stats
    const style1 = { font: '20px Arial', fill: '#ff0' };
    const t1 = this.game.add.text(10, 20, 'Points:', style1);
    const t2 = this.game.add.text(this.game.width - 300, 20, 'Battery:', style1);
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;

    const style2 = { font: '26px Arial', fill: '#00ff00' };
    this.pointsText = this.game.add.text(80, 18, '', style2);
    this.batteryText = this.game.add.text(this.game.width - 50, 18, '', style2);
    this.refreshStats();
    this.pointsText.fixedToCamera = true;
    this.batteryText.fixedToCamera = true;
  }

  start() {
    this.level01Sound.shift();
    this.level01Sound.loopFull(0.6);
  }

  togglePause() {
    this.game.paused = !this.game.paused;
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

  releaseSubject() {
    let item = this.subjects.getFirstDead();
    const x = 1000;
    const lineNumber = this.game.rnd.integerInRange(0, 2);
    const numbersSubjects = this.levelObjects[lineNumber].length;
    const rndObj = this.game.rnd.integerInRange(0, numbersSubjects - 1);
    const subject = this.levelObjects[lineNumber][rndObj];
    const y = 0;

    if (item) {
      item.reset(x, y);
      item.loadTexture(subject.name);
      item.body.velocity.x = this.scrollSpeed;
    } else {
      item = this.subjects.create(x, y, subject.name);
      item.body.velocity.x = this.scrollSpeed;
    }

    item.y = 120 + 130 * subject.line;
    this.game.physics.arcade.enable(item);
    item.body.checkCollision.down = false;
    item.body.checkCollision.left = false;
    item.body.immovable = true;
    item.body.setSize(item.width, 10, 0, 0);

    this.game.world.bringToTop(item);
    // this.game.world.bringToTop(this.player);
  }

  releaseIcon() {
    let item = this.icons.getFirstDead();
    const x = 1000;
    const numbersSubjects = this.levelIcons.length;
    const rndObj = this.game.rnd.integerInRange(0, numbersSubjects - 1);
    const subject = this.levelIcons[rndObj];
    const y = 70 + 130 * this.game.rnd.integerInRange(0, 2);

    if (item) {
      item.reset(x, y);
      item.loadTexture(subject.name);
      item.body.velocity.x = this.scrollSpeed;
    } else {
      item = this.icons.create(x, y, subject.name);
      item.body.velocity.x = this.scrollSpeed;
    }

    this.game.physics.arcade.enable(item);
    item.body.immovable = true;

    this.game.world.bringToTop(item);
    this.game.world.bringToTop(this.player);
  }

  releaseBattery() {
    let item = this.batteries.getFirstDead();
    const x = 1000;
    const y = 70 + 130 * this.game.rnd.integerInRange(0, 2);

    if (item) {
      item.reset(x, y);
      item.loadTexture('battery');
      item.body.velocity.x = this.scrollSpeed;
    } else {
      item = this.batteries.create(x, y, 'battery');
      item.body.velocity.x = this.scrollSpeed;
    }

    this.game.physics.arcade.enable(item);
    item.body.immovable = true;

    this.game.world.bringToTop(item);
    this.game.world.bringToTop(this.player);
  }

  releaseSocket() {
    let item = this.sockets.getFirstDead();
    const x = 1000;
    const y = 70 + 130 * this.game.rnd.integerInRange(0, 2);

    if (item) {
      item.reset(x, y);
      item.loadTexture('socket');
      item.body.velocity.x = this.scrollSpeed;
    } else {
      item = this.sockets.create(x, y, 'socket');
      item.body.velocity.x = this.scrollSpeed;
    }

    this.game.physics.arcade.enable(item);
    item.body.immovable = true;

    this.game.world.bringToTop(item);
    this.game.world.bringToTop(this.player);
  }

  addBackGround(start) {
    const x = 960;
    if (start === 'create') {
      this.wall = this.add.tileSprite(0, 0, this.game.world.width, this.game.height, 'back');
      this.game.physics.arcade.enable(this.wall);
      // so player can walk on ground
      this.wall.body.immovable = true;
      this.wall.body.allowGravity = false;
      this.wall.body.velocity.x = this.scrollSpeed;
    }

    const y = 0;
    let item = this.land.getFirstDead();
    if (!this.land.children.length || this.land.children[this.land.children.length - 1].x <= 860) {
      if (item) {
        item.reset(x, y);
        item.loadTexture('back');
        item.body.velocity.x = this.scrollSpeed;
      } else {
        item = this.land.create(x, y, 'back');
        item.body.velocity.x = this.scrollSpeed;
      }

      this.game.world.sendToBack(item);
    }
  }

  static checkY(item) {
    if (item.x < -250) {
      item.kill();
    }
  }

  update() {
    this.addBackGround();
    this.player.body.velocity.x = 0;
    this.refreshStats();

    this.subjects.forEachAlive(this.checkY, this);
    this.icons.forEachAlive(this.checkY, this);
    this.batteries.forEachAlive(this.checkY, this);
    this.sockets.forEachAlive(this.checkY, this);

    // collision
    this.player.body.collideWorldBounds = true;
    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
    this.game.physics.arcade.collide(this.player, this.subjects, this.playerBit, null, this);
    this.game.physics.arcade.overlap(this.player, this.icons, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.batteries, this.charge, null, this);
    this.game.physics.arcade.overlap(this.player, this.sockets, this.chargeFull, null, this);

    // only respond to keys and keep the speed if the player is alive
    // we also don't want to do anything if the player is stopped for scratching or digging
    if (this.playerEnergy <= 0) {
      this.state.start('GameOver');
    }

    if (this.player.alive && !this.stopped) {
      if (this.cursors.up.isDown) {
        this.playerJump('up');
      } else if (this.cursors.down.isDown) {
        this.playerJump('down');
      }
    }
  }

  // show updated stats values
  refreshStats() {
    this.pointsText.text = this.score;
    this.batteryText.text = this.playerEnergy;
  }

  static playerHit(player, blockedLayer) {
    if (player.body.touching.right) {
      // can add other functionality here for extra obstacles later
    }
  }

  // the player has just been bitten by a flea
  playerBit(player, flea) {
    this.player.body.velocity.x = -this.scrollSpeed;
    this.jumpCount = 0;
  }

  // the player is collecting a toy from a mound
  collect(player, icon) {
    icon.destroy();
    this.score += this.iconScore;
    this.playerEnergy -= 10;
  }

  charge(player, battery) {
    battery.destroy();
    this.playerEnergy += 10;
    if (this.playerEnergy > 100) this.playerEnergy = 100;
  }

  chargeFull(player, socket) {
    socket.destroy();
    this.playerEnergy = 100;
  }

  discharge() {
    this.score += 10;
    this.playerEnergy -= 1;
  }

  gameOver() {
    this.game.state.start('GameOver');
  }

  playerJump(direction) {
    if (direction === 'up') {
      if (this.timeGame2 < this.time.now) {
        // this.jumpCount++;
        this.timeGame2 = this.time.now + 300;
        this.player.body.velocity.y -= 1300;
      }
    }
    // when the ground is a sprite, we need to test for "touching" instead of "blocked"
    if (this.player.body.touching.down) {
      if (direction === 'down' && this.player.y < 350) {
        if (this.timeGame < this.time.now) {
          this.timeGame = this.time.now + 500;
          this.player.y += 10;
          this.player.body.velocity.y += 1300;
        }
      }
    }
  }

  render() {
    // this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
  }
}

export default Game;
