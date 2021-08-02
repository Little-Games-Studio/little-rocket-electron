import * as Phaser from 'phaser';

const shape: Phaser.Types.Math.Vector2Like[] = [
    { x: 37, y: 0 },
    { x: 45, y: 10 },
    { x: 55, y: 5 },
    { x: 70, y: 15 },
    { x: 63, y: 35 },
    { x: 70, y: 50 },
    { x: 60, y: 63 },
    { x: 55, y: 60 },
    { x: 37, y: 70 },
    { x: 30, y: 65 },
    { x: 12, y: 65 },
    { x: 10, y: 53 },
    { x: 0, y: 37 },
    { x: 12, y: 22 },
    { x: 9, y: 16 },
    { x: 13, y: 8 }
];

export class Asteroid extends Phaser.Physics.Matter.Sprite {

    constructor(scene: Phaser.Scene) {

        super(scene.matter.world, Phaser.Math.Between(0, 550), -50, 'asteroid', 0, { label: 'asteroid', isSensor: true, vertices: shape });

        scene.add.existing(this);
    }

    update(): void {

        this.setVelocity(0, 0);

        this.setVelocityY(-1);
    }
}