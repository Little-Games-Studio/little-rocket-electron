import * as Phaser from 'phaser';

import * as clouds_big from './../assets/images/background/clouds_big.png'
import * as clouds_small from './../assets/images/background/clouds_small.png'
import * as star_png from './../assets/images/star.png'
import * as asteroid_png from './../assets/images/asteroid.png'
import racing_mp3 from './../assets/audio/racing.mp3'

import * as rocket_png from './../gameObjects/rocket.png'
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
    private asteroids: Phaser.Physics.Arcade.Group;
    private music: any;

    public speed: integer = 1;
    public score: integer = 0;
    private distance_to_goal: integer;
    private collected_stars: integer;
    private speed_percentage: integer;

    private speed_timer: integer;
    private spawn_timer: integer;


    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        this.load.image('clouds_big', clouds_big);
        this.load.image('clouds_small', clouds_small);
        this.load.image('star', star_png);
        this.load.image('asteroid', asteroid_png);

        //this.load.atlas("rocket_atlas", rocket_png, "rocket_collision_points.json");
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
            this.pause();
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

        this.asteroids = this.physics.add.group();
        this.physics.add.overlap(this.rocket, this.asteroids, this.hitAsteroid, null, this);

        this.score = 0;
        this.speed_timer = 0;
        this.spawn_timer = 0;
    }

    update(time, delta): void {

        this.speed_timer += delta;

        if (this.speed_timer > 1000 /*ms*/) {
            this.score += 1;
            this.speed += 0.01;
            this.speed_timer -= 1000;
        }

        this.clouds_small.tilePositionY -= 0.05 * delta * this.speed;
        this.clouds_big.tilePositionY -= 0.1 * delta * this.speed;

        this.rocket.update();

        this.spawn_timer += delta;

        if (this.spawn_timer > 1000) {

            var new_star = this.physics.add.image(Phaser.Math.Between(0, 550), -50, 'star').setOrigin(0, 0).setCircle(25).setOffset(7,7);
            this.stars.add(new_star);

            var new_asteroid = this.physics.add.image(Phaser.Math.Between(0, 550), -50, 'asteroid', 0).setOrigin(0, 0).setCircle(35);
            this.asteroids.add(new_asteroid);

            this.spawn_timer -= 1000;
        }

        this.stars.children.iterate((child: any) => {
            child.y += 1 * this.speed;
        });

        this.stars.children.each((child: Phaser.GameObjects.Sprite) => {
            if (child.y > 800) {
                this.stars.children.delete(child);
                child.destroy();
            }
        });
 
        this.asteroids.children.iterate((child: any) => {
            child.y += 1 * this.speed;
        });

        this.asteroids.children.each((child: Phaser.GameObjects.Sprite) => {
            if (child.y > 800) {
                this.asteroids.children.delete(child);
                child.destroy();
            }
        });
    }

    pause() {
        this.music.pause();
        this.scene.pause('GameScene');
        this.scene.launch('PauseScene');
    }

    collectStar(rocket, star): void {
        this.score += 10;
        star.destroy();
    }

    hitAsteroid(rocket, asteroid): void {
        this.events.emit('hitAsteroid');
        this.music.pause();
        this.scene.pause('GameScene');
        this.scene.launch('GameOverScene');
    }

}