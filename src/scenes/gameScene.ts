import * as Phaser from 'phaser';

import * as clouds_big from './../assets/images/background/clouds_big.png'
import * as clouds_small from './../assets/images/background/clouds_small.png'
import * as rocket_png from './../assets/images/rocket.png'
import * as star_png from './../assets/images/star.png'
import racing_mp3 from './../assets/audio/racing.mp3'

import { Rocket } from '../gameObjects/rocket'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameScene',
};

export class GameScene extends Phaser.Scene {

    private clouds_small: Phaser.GameObjects.TileSprite;
    private clouds_big: Phaser.GameObjects.TileSprite;
    private rocket: Rocket;
    private stars: Phaser.Physics.Arcade.Group;
    private music: any;

    public score: integer;
    private distance_to_goal: integer;
    private collected_stars: integer;
    private speed_percentage: integer;

    private spawn_timer: integer;

    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        this.load.image('clouds_big', clouds_big);
        this.load.image('clouds_small', clouds_small);
        this.load.image('star', star_png);
        this.load.spritesheet('rocket', rocket_png, { frameWidth: 50, frameHeight: 140 });
        this.load.audio('music', [racing_mp3]);
    }

    create(): void {

        this.clouds_small = this.add.tileSprite(300, 400, 600, 1600, 'clouds_small');
        this.clouds_big = this.add.tileSprite(300, 400, 600, 1600, 'clouds_big');

        this.clouds_small.alpha = 0.3;
        this.clouds_big.alpha = 0.6;

        this.rocket = new Rocket(this, this.cameras.main.centerX, this.cameras.main.height - 100);

        this.music = this.sound.add('music');
        this.music.loop = true;

        this.music.play();

        this.input.keyboard.on('keydown-SPACE', () => {
            this.music.pause();
            this.scene.pause('GameScene');
            this.scene.launch('PauseScene');
        }, this);

        this.events.on('pause', () => {
            console.log('Game paused');
        })

        this.events.on('resume', () => {
            this.music.resume();
            console.log('Game resumed');
        })

        this.stars = this.physics.add.group();

        this.physics.add.overlap(this.rocket, this.stars, this.collectStar, null, this);

        this.spawn_timer = 0;
    }

    update(): void {

        this.clouds_small.tilePositionY -= 0.25;
        this.clouds_big.tilePositionY -= 0.5;

        this.rocket.update();

        if (this.spawn_timer > 200) {
            this.stars.create(Phaser.Math.Between(0, 550), -50, 'star', 0).setOrigin(0, 0);
            this.spawn_timer -= 200;
        }

        this.spawn_timer += 1;
        console.log(this.spawn_timer)

        this.stars.children.iterate((child: any) => {
            child.y += 1;
        });

        this.stars.children.each((child: Phaser.GameObjects.Sprite) => {
            if (child.y > 800) {
                this.stars.children.delete(child);
                child.destroy();
            }
        });
 
        console.log(this.stars.children.size)
    }

    collectStar(rocket, star): void {
        this.events.emit('collectStar');
        star.destroy();
    }

}