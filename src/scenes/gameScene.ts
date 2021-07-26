import * as Phaser from 'phaser';

import * as clouds_big from './../assets/images/background/clouds_big.png'
import * as clouds_small from './../assets/images/background/clouds_small.png'
import * as star_png from './../assets/images/star.png'
import * as asteroid_png from './../assets/images/asteroid.png'
import racing_mp3 from './../assets/audio/racing.mp3'

import * as rocket_png from './../gameObjects/rocket.png'
import { Rocket } from '../gameObjects/rocket_matter'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameScene',
    physics: {
        arcade: {
            debug: true,
        },
        matter: {
            debug: true,
            gravity: false
        }
    },
};

export class GameScene extends Phaser.Scene {

    private clouds_small: Phaser.GameObjects.TileSprite;
    private clouds_big: Phaser.GameObjects.TileSprite;
    private rocket: Rocket;
    
    private asteroids: Phaser.Physics.Arcade.Group;
    private music: any;

    public speed: integer = 1;
    public score: integer = 0;
    private distance_to_goal: integer;
    private collected_stars: integer;
    private speed_percentage: integer;

    private speed_timer: integer;
    private spawn_timer: integer;

    private stars: Array<any>;
    private star_shape: Phaser.Types.Math.Vector2Like[];
    private collision_category_stars: any;

    constructor() {
        super(sceneConfig);

        this.star_shape = [
            { x: 30, y: 0 },
            { x: 40, y: 20 },
            { x: 60, y: 22 },
            { x: 45, y: 38 },
            { x: 48, y: 60 },
            { x: 30, y: 49 },
            { x: 12, y: 60 },
            { x: 15, y: 38 },
            { x: 0, y: 22 },
            { x: 20, y: 20 }
        ];
    }

    getRootBody(body) {
        if (body.parent === body) {
            return body;
        }
        while (body.parent !== body) {
            body = body.parent;
        }
        return body;
    }

    preload(): void {
        this.load.image('clouds_big', clouds_big);
        this.load.image('clouds_small', clouds_small);
        this.load.image('star', star_png);
        this.load.image('asteroid', asteroid_png);

        this.load.spritesheet('rocket', rocket_png, { frameWidth: 50, frameHeight: 140 });
        
        this.load.audio('music', [racing_mp3]);
    }

    create(): void {

        this.clouds_small = this.add.tileSprite(300, 400, 600, 1600, 'clouds_small');
        this.clouds_big = this.add.tileSprite(300, 400, 600, 1600, 'clouds_big');

        this.clouds_small.alpha = 0.3;
        this.clouds_big.alpha = 0.6;

        this.matter.world.on('collisionstart', event => {
            console.log('collision')
            for (var i = 0; i < event.pairs.length; i++) {
                var bodyA = this.getRootBody(event.pairs[i].bodyA);
                var bodyB = this.getRootBody(event.pairs[i].bodyB);

                if ((bodyA.label === 'rocket' && bodyB.label === 'star')) {
                    this.collectStar(bodyA, bodyB);
                }

                if ((bodyB.label === 'rocket' && bodyA.label === 'tank')) {
                    this.collectStar(bodyB, bodyA);
                }
            }
        });

        this.rocket = new Rocket(this, this.cameras.main.centerX, this.cameras.main.height - 100);
        
        this.music = this.sound.add('music');
        this.music.loop = true;

        //this.music.play();

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

        this.stars = [];
        this.collision_category_stars = this.matter.world.nextCategory();

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

            var star_image = this.matter.add.image(Phaser.Math.Between(0, 550), -50, 'star', 1, { vertices: this.star_shape });

            //star_image.setCollisionCategory

            this.stars.push(star_image);

            var new_asteroid = this.physics.add.image(Phaser.Math.Between(0, 550), -50, 'asteroid', 0).setOrigin(0, 0).setCircle(35);
            this.asteroids.add(new_asteroid);

            this.spawn_timer -= 1000;
        }

        this.stars.forEach((child: any) => {
            child.y += 1 * this.speed;
        });

        this.stars.forEach((child: Phaser.GameObjects.Sprite) => {
            if (child.y > 900) {
                child.destroy();
                this.stars.splice(this.stars.indexOf(child), 1);
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