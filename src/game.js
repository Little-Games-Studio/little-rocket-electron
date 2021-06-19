import Phaser from 'phaser'
import clouds_big from './assets/images/background/clouds_big.png'
import clouds_small from './assets/images/background/clouds_small.png'
import rocket_png from './assets/images/rocket.png'
import { Rocket } from './classes/rocket.ts'

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#8AA8B2',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
};

var game = new Phaser.Game(config);

function preload() {

    this.load.image('clouds_big', clouds_big);
    this.load.image('clouds_small', clouds_small);
    this.load.spritesheet('rocket', rocket_png, { frameWidth: 50, frameHeight: 140 });

}

function create() {

    this.clouds_small = this.add.tileSprite(300, 400, 600, 1600, 'clouds_small');
    this.clouds_big = this.add.tileSprite(300, 400, 600, 1600, 'clouds_big');

    this.clouds_small.alpha = 0.3;
    this.clouds_big.alpha = 0.6;
    
    this.rocket = new Rocket(this, this.cameras.main.centerX, this.cameras.main.height - 100);

}

function update() {

    this.clouds_small.tilePositionY -= 0.25;
    this.clouds_big.tilePositionY -= 0.5;
    
    this.rocket.update();
}