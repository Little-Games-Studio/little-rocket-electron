import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'PauseScene',
};

export class PauseScene extends Phaser.Scene {

    constructor() {
        super(sceneConfig);
    }

    create(): void {
        console.log('Pause Scene launched.');

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.resume('GameScene');
        }, this);
    }
}