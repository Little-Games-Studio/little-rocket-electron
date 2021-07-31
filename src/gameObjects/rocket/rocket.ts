import * as Phaser from 'phaser';

export class Rocket extends Phaser.Physics.Matter.Sprite {

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene.matter.world, x, y, 'rocket', 1, { label: 'rocket', isSensor: true});

        scene.add.existing(this);

        //this.body..setCollideWorldBounds(true);
        //this.getBody().setSize(50, 70);

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(): void {

        this.setVelocity(0, 0);

        if (this.keyW?.isDown || this.cursors.up.isDown) {
            if (this.x < this.scene.cameras.main.height) {
                this.setVelocityY(-1);
            }  
        }

        if (this.keyA?.isDown || this.cursors.left.isDown) {
            this.setVelocityX(-1);
        }

        if (this.keyS?.isDown || this.cursors.down.isDown) {
            this.setVelocityY(1);
        }

        if (this.keyD?.isDown || this.cursors.right.isDown) {
            this.setVelocityX(1);
        }
    }
}