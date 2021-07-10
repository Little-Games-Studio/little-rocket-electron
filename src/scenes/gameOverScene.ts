import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameOverScene',
};

export class GameOverScene extends Phaser.Scene {

    private startButton;

    constructor() {
        super(sceneConfig);
    }

    create(): void {
        console.log('Game-Over Scene launched.');

        this.startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'START', { font: '28px Arial' });
        this.startButton.setInteractive();
        this.startButton.once('pointerup', () => {
            this.scene.get('GameScene').scene.restart();
            this.scene.setVisible(false);
        });
    }
}