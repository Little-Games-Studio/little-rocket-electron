import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'HUD',
};

export class HUDScene extends Phaser.Scene {

    public score: integer;
    private distance_to_goal: integer;
    private collected_stars: integer;
    private speed_percentage: integer;
    //rocket.cannon.currentValue
    //rocket.shield.currentValue
    //rocket.engine.currentValue

    constructor() {
        super(sceneConfig);

        this.score = 0;
    }

    create() {
        //  Our Text object to display the Score
        let info = this.add.text(10, 10, 'Score: 0', { font: '28px Arial' });

        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('GameScene');

        //  Listen for events from it
        ourGame.events.on('collectStar', function () {

            this.score += 10;

            info.setText('Score: ' + this.score);

        }, this);
    }
}

/* <div class="hud-list-group infos" >
    <table>
    <tr class="list-group-item info distance-to-goals" >
        <td class="list-group-item-icon" > {{ fa - icon 'flag-checkered' fixedWidth = true }}</td>
            < td class="list-group-item-value" > {{ gameState.distance_to_goal }}</td>
                < /tr>
                < tr class="list-group-item info stars" >
                    <td class="list-group-item-icon" > {{ fa - icon 'star' fixedWidth = true }}</td>
                        < td class="list-group-item-value" > {{ gameState.collected_stars }}</td>
                            < /tr>
                            < tr class="list-group-item info speed" >
                                <td class="list-group-item-icon" > {{ fa - icon 'tachometer' fixedWidth = true }}</td>
                                    < td class="list-group-item-value" > {{ gameState.speed_percentage }} % </td>
                                        < /tr>
                                        < /table>
                                        < /div>

                                        < div class="hud-list-group resources" >
                                            <table>
                                            <tr class="list-group-item resource ammo" >
                                                <td class="resource-icon" > {{ fa - icon 'bullseye' fixedWidth = true }}</td>
                                                    < td class="resource-value" > {{ me.user.rocket.cannon.currentValue }}</td>
                                                        < /tr>
                                                        < tr class="list-group-item resource shield" >
                                                            <td class="resource-icon" > {{ fa - icon 'shield' fixedWidth = true }}</td>
                                                                < td class="resource-value" > {{ me.user.rocket.shield.currentValue }}</td>
                                                                    < /tr>
                                                                    < tr class="list-group-item resource engine" >
                                                                        <td class="resource-icon" > {{ fa - icon 'forward' fixedWidth = true }}</td>
                                                                            < td class="resource-value" > {{ me.user.rocket.engine.currentValue }}</td>
                                                                                < /tr>
                                                                                < /table>
                                                                                < /div> */