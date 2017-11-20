module S6InstaJam
{
    export class MainMenuState extends Phaser.State
    {
        titleBackground: Phaser.Sprite;
        playButton: Phaser.Button;

        create()
        {
            this.titleBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'TitleBG');
            this.titleBackground.anchor.setTo( 0.5, 0.5 );

            this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + (this.game.world.height * 0.4), 'UIAtlas', this.fadeOut, this);
            this.playButton.setFrames( 'ui_btnPlayUp.png', 'ui_btnPlayUp.png', 'ui_btnPlayDown.png', 'ui_btnPlayUp.png' );
            this.playButton.anchor.setTo( 0.5, 0.5 );

            // var fx = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'FXAtlas', 0);
            // fx.anchor.set(0.5);
            // fx.animations.add('fx', [0,1,2,3,4,5], 12, true).play();
        }

        fadeOut()
        {
            var tween = this.add.tween(this.playButton).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame()
        {
            this.game.state.start('GameState', true, false);
        }
    }
}