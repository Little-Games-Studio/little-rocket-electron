import Phaser from 'phaser'
import clouds from './assets/images/clouds.png'
import rocket from './assets/images/rocket.png'

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#8AA8B2',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {

    this.load.image('clouds', clouds);
    this.load.spritesheet('rocket', rocket, { frameWidth: 50, frameHeight: 140 });

}

function create() {

    this.add.image(10, 10, 'clouds').setOrigin(0, 0).setScale(0.95);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 100, 'rocket', 1);
    //this.add.image(this.cameras.main.centerX, this.cameras.main.height - 100, 'rocket');
/*
    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo); */
}