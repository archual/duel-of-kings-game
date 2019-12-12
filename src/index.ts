import './scss/main.scss';
import Phaser from 'phaser';

import makeResizeGame from './utils/resizeGame';
import Boot from './states/Boot';
import Preload from './states/Preload';

// import PlayGame from './play-game';

window.onload = function() {
  const gameConfig = {
    backgroundColor: 0x000000,
    height: 540,
    width: 960,
    scene: [Boot, Preload], // , Title, PreGame, Authors, Game, GameOver],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        debug: true,
      },
    },
  };

  const InfiniteScroller = new Phaser.Game(gameConfig);
  window.focus();
  const resizeGame = makeResizeGame(InfiniteScroller);
  resizeGame();
  window.addEventListener('resize', resizeGame);
};
