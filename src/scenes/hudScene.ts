import * as Phaser from 'phaser';
import { GameScene } from './gameScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'HUD',
};

export class HUDScene extends Phaser.Scene {

    private score_text: any;
    private collected_stars_text: any;
    private speed_text: any;
    private myGame: GameScene;
    //rocket.cannon.currentValue
    //rocket.shield.currentValue
    //rocket.engine.currentValue

    constructor() {
        super(sceneConfig);
    }

    create() {
        //  Our Text object to display the Score
        this.score_text = this.add.text(10, 10, 'Score: 0', { font: '28px Arial' });
        this.collected_stars_text = this.add.text(10, 50, 'Stars: 0', { font: '28px Arial' });
        this.speed_text = this.add.text(10, 90, 'Speed: 0 km/h', { font: '28px Arial' });

        //  Grab a reference to the Game Scene
        this.myGame = this.scene.get('GameScene') as GameScene;
        console.log(this.myGame.score)
    }

    update(): void {
        this.score_text.setText('Score: ' + this.myGame.score);
        this.collected_stars_text.setText('Stars: ' + this.myGame.collected_stars);
        this.speed_text.setText('Speed: ' + Math.floor(this.myGame.speed * 1000) + ' km/h');
    }
}