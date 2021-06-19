import * as Phaser from 'phaser';

export class Rocket extends Phaser.Physics.Arcade.Sprite {

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
  
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, 'rocket', 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.getBody().setCollideWorldBounds(true);
  
        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
    
        // PHYSICS
        this.getBody().setSize(50, 140);
    }

    protected getBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }
  
    update(): void {

      this.getBody().setVelocity(0);
  
      if (this.keyW?.isDown) {
        this.body.velocity.y = -110;
      }
  
      if (this.keyA?.isDown) {
        this.body.velocity.x = -110;
      }
  
      if (this.keyS?.isDown) {
        this.body.velocity.y = 110;
      }
  
      if (this.keyD?.isDown) {
        this.body.velocity.x = 110;
      }
    }
  }