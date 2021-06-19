import Phaser from 'phaser'
import clouds from './assets/images/clouds.png'
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

    this.load.image('clouds', clouds);
    this.load.spritesheet('rocket', rocket_png, { frameWidth: 50, frameHeight: 140 });

}

function create() {

    this.add.image(10, 10, 'clouds').setOrigin(0, 0).setScale(0.95);
    this.rocket = new Rocket(this, this.cameras.main.centerX, this.cameras.main.height - 100);

}

function update() {
    this.rocket.update();
}