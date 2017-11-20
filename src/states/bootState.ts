// / <reference path="../../bin/js/phaser-state-transition-plugin.min.js" />

module S6InstaJam
{
    export class BootState extends Phaser.State
    {


        preload()
        {
            this.game.load.image( 'TitleBG', 'assets/img/title_nazi.png' );

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.scale.windowConstraints.bottom = 'visual';
            this.game.scale.refresh();
            this.scale.windowConstraints.bottom = 'visual';

            // this.game.load.image( 'logo', 'assets/img/Phaser-Logo-Small.png' );
            // this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
            // this.game.stateTransition.configure({
            //     duration: Phaser.Timer.SECOND * 0.8,
            //     ease: Phaser.Easing.Exponential.InOut,
            //     properties: {
            //         alpha: 0,
            //         scale: {
            //         x: 1.4,
            //         y: 1.4
            //         }
            //     }
            // });
        }

        create()
        {
            this.game.stage.backgroundColor = '#ACE56E';
            this.input.maxPointers = 2;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('PreloaderState', true, false);
        }
    }
}