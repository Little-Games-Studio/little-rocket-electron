import Phaser from 'phaser'

export class Rocket extends Phaser.Physics.Arcade.Sprite {
  
    constructor(scene, x, y, frame) {

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
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
    }

    getBody() {
        return this.body;
    }
  
    update() {

      this.getBody().setVelocity(0);
  
      if (this.keyW?.isDown) {
        this.body.velocity.y = -110;
      }
  
      if (this.keyA?.isDown) {
        this.body.velocity.x = -110;
        this.checkFlip();
        this.getBody().setOffset(48, 15);
      }
  
      if (this.keyS?.isDown) {
        this.body.velocity.y = 110;
      }
  
      if (this.keyD?.isDown) {
        this.body.velocity.x = 110;
        this.checkFlip();
        this.getBody().setOffset(15, 15);
      }
    }
  }