module S6InstaJam
{
    export class PreloaderState extends Phaser.State
    {
        titleBackground : Phaser.Sprite;

        preload()
        {
            // setup preloader display
            this.titleBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'TitleBG');
            this.titleBackground.anchor.setTo( 0.5, 0.5 );

            // var textStyle = { font: 'bold 23px Arial', fill: '#fff', align: 'center' };
            // this.loadingText = this.game.add.text( this.game.world.width - 20, this.game.world.height, 'LOADING...', textStyle );
            // this.loadingText.anchor.setTo( 1.0, 1.0 );

            // TODO: progress bar
            
            this.game.load.atlasJSONHash( 'BGAtlas',         'assets/atlas_img/bg.png',           'assets/atlas_json/bg.json'           );
            this.game.load.atlasJSONHash( 'UIAtlas',         'assets/atlas_img/ui.png',           'assets/atlas_json/ui.json'           );
            this.game.load.atlasJSONHash( 'FXAtlas',         'assets/atlas_img/fx.png',           'assets/atlas_json/fx.json'           );
            this.game.load.atlasJSONHash( 'GameObjectAtlas', 'assets/atlas_img/gobj.png',         'assets/atlas_json/gobj.json'         );
            this.game.load.atlasJSONHash( 'PlayerAtlas',     'assets/atlas_img/briffin_anim.png', 'assets/atlas_json/briffin_anim.json' );
            this.game.load.atlasJSONHash( 'ZombieAtlas1',    'assets/atlas_img/zombie1_anim.png', 'assets/atlas_json/zombie1_anim.json' );
            this.game.load.atlasJSONHash( 'ZombieAtlas2',    'assets/atlas_img/zombie2_anim.png', 'assets/atlas_json/zombie2_anim.json' );
        }

        create()
        {
            // this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // var tween = this.add.tween(this.logoSprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // tween.onComplete.add(this.startMainMenu, this);
            this.startMainMenu();
        }

        startMainMenu()
        {
            this.game.state.start('MainMenuState', true, false);
        }
    }
}