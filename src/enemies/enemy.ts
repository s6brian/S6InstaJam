module S6InstaJam
{
    export class Enemy extends Phaser.Sprite
    {
        player: S6InstaJam.Player;
        speed: number;

        constructor( p_game: Phaser.Game, p_player: S6InstaJam.Player, p_x: number, p_y: number )
        {
            super( p_game, p_x, p_y, 'ZombieAtlas1', 'zombie1_front_0.png' );
            this.player = p_player;
            this.anchor.setTo( 0.5, 0.5 );
            this.exists = false;

            var frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('zombie1_front_' + idx + '.png'); }
            this.animations.add('FrontWalk', frameNames, 30, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('zombie1_back_' + idx + '.png'); }
            this.animations.add('BackWalk', frameNames, 30, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('zombie1_left_' + idx + '.png'); }
            this.animations.add('LeftWalk', frameNames, 30, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('zombie1_right_' + idx + '.png'); }
            this.animations.add('RightWalk', frameNames, 30, true);

            p_game.add.existing( this );
        }

        spawn( p_x: number, p_y: number )
        {
            this.reset(p_x, p_y);
            this.alpha = 1.0;
            this.angle = 0.0;
            this.scale.setTo( 1, 1 );
            this.speed = ( 80 * Math.random()) + 50; 

            var angle  = this.game.physics.arcade.angleToXY(this, this.player.position.x, this.player.position.y);
                angle *= 180 / Math.PI;
                angle = 90 * Math.round( angle / 90 );

            switch( angle )
            {
                case 0:
                {
                    this.animations.getAnimation('RightWalk').play();
                    break;
                }
                case -90:
                {
                    this.animations.getAnimation('BackWalk').play();
                    break;
                }
                case  180:
                case -180:
                {
                    this.animations.getAnimation('LeftWalk').play();
                    break;
                }
                default:
                {
                    this.animations.getAnimation('FrontWalk').play();
                    break;
                }
            }
        }

        die()
        {
            // TODO: death animation
            //       call kill() after last frame
            // this.exists = false;

            // this.animations.currentAnimation().stop();
            this.body.velocity.setTo( 0, 0 );
            this.animations.currentAnim.stop();
            this.frameName = 'zombie1_0.png';
            var tween = this.game.add.tween(this      ).to({ alpha: 0.5     }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
                        this.game.add.tween(this      ).to({ angle: 180     }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
                        this.game.add.tween(this.scale).to({ x: 1.5, y: 1.5 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
            
            tween.onComplete.add(() => { this.kill(); }, this);
        }

        update()
        {
            if(this.exists && this.player.alive)
            {
                this.game.physics.arcade.moveToXY(this, this.player.position.x, this.player.position.y, this.speed);
                // console.log("distance: " + this.game.physics.arcade.distanceBetween(this, this.player, true));

                // if( this.game.physics.arcade.collide( this, this.player )) //==> needs to activate physics.arcade for player
                if(this.game.physics.arcade.distanceBetween(this, this.player, true) <= 50.0)
                {
                    // console.log("die!");
                    // this.die();
                    this.player.die();
                    this.body.velocity.setTo( 0, 0 );
                }
            }
            else
            {
                this.body.velocity.setTo( 0, 0 );
            }
        }
    }
}