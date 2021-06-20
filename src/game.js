import Phaser from 'phaser'

import { GameScene } from './scenes/gameScene'
import { PauseScene } from './scenes/pauseScene'

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#8AA8B2',
    pixelArt: true,
    audio: {
        disableWebAudio: true
    },
    scene: [ GameScene, PauseScene ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
};

var game = new Phaser.Game(config);