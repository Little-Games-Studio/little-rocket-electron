import * as Phaser from 'phaser';
import { GameScene } from './gameScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'HUD',
};

export class HUDScene extends Phaser.Scene {

    private scoreText: any;
    private distance_to_goal: integer;
    private collected_stars: integer;
    private speed_percentage: integer;
    private myGame: GameScene;
    //rocket.cannon.currentValue
    //rocket.shield.currentValue
    //rocket.engine.currentValue

    constructor() {
        super(sceneConfig);
    }

    create() {
        //  Our Text object to display the Score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '28px Arial' });

        //  Grab a reference to the Game Scene
        this.myGame = this.scene.get('GameScene') as GameScene;
        console.log(this.myGame.score)
    }

    update(): void {
        this.scoreText.setText('Score: ' + this.myGame.score);
    }
}