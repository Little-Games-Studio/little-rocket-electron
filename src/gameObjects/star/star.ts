import * as Phaser from 'phaser';

const shape: Phaser.Types.Math.Vector2Like[] = [
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

export class Star extends Phaser.Physics.Matter.Sprite {

    constructor(scene: Phaser.Scene) {

        super(scene.matter.world, Phaser.Math.Between(0, 550), -50, 'star', 0, { label: 'star', isSensor: true, vertices: shape });
 
        scene.add.existing(this);
    }

    update(): void {

        this.setVelocity(0, 0);

        this.setVelocityY(-1);
    }
}