import * as Phaser from 'phaser';

export class Rocket extends Phaser.Physics.Arcade.Sprite {

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, 'rocket', 1);

        scene.add.existing(this);
        
        // PHYSICS
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(50, 140);

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    protected getBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }
  
    update(): void {

        this.getBody().setVelocity(0);
    
        if (this.keyW?.isDown || this.cursors.up.isDown) {
            this.body.velocity.y = -110;
        }
  
        if (this.keyA?.isDown || this.cursors.left.isDown) {
            this.body.velocity.x = -110;
        }
    
        if (this.keyS?.isDown || this.cursors.down.isDown) {
            this.body.velocity.y = 110;
        }
    
        if (this.keyD?.isDown || this.cursors.right.isDown) {
            this.body.velocity.x = 110;
        }
    }
}