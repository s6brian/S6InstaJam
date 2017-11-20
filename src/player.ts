module S6InstaJam
{
    export class Player extends Phaser.Sprite
    {
        constructor( p_game: Phaser.Game, p_x: number, p_y: number )
        {
            super( p_game, p_x, p_y, 'PlayerAtlas', 0 );
            this.anchor.setTo( 0.5, 0.5 );
            p_game.add.existing( this );

            var idleSpeed = 30;
            var shootSpeed = 30;

            var frameNames = [];
            for( var idx = 0; idx < 12; ++idx ){ frameNames.push('back_idle_' + idx + '.png'); }
            this.animations.add('BackIdle', frameNames, idleSpeed, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('back_shoot_' + idx + '.png'); }
            this.animations.add('BackShoot', frameNames, shootSpeed, false);

            frameNames = [];
            for( var idx = 0; idx < 12; ++idx ){ frameNames.push('left_idle_' + idx + '.png'); }
            this.animations.add('LeftIdle', frameNames, idleSpeed, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('left_shoot_' + idx + '.png'); }
            this.animations.add('LeftShoot', frameNames, shootSpeed, false);

            frameNames = [];
            for( var idx = 0; idx < 12; ++idx ){ frameNames.push('right_idle_' + idx + '.png'); }
            this.animations.add('RightIdle', frameNames, idleSpeed, true);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('right_shoot_' + idx + '.png'); }
            this.animations.add('RightShoot', frameNames, shootSpeed, false);

            frameNames = [];
            for( var idx = 0; idx < 6; ++idx ){ frameNames.push('front_shoot_' + idx + '.png'); }
            this.animations.add('FrontShoot', frameNames, shootSpeed, false);

            frameNames = [];
            for( var idx = 0; idx < 12; ++idx ){ frameNames.push('front_' + idx + '.png'); }
            this.animations.add('FrontIdle', frameNames, idleSpeed, true).play();
        }

        faceDirection( p_angle: number, p_shootFirst: boolean )
        {
            console.log('angle: ' + p_angle);

            switch( p_angle )
            {
                case 0:
                {
                    this.animations.getAnimation('RightIdle').play();
                    break;
                }
                case -90:
                {
                    this.animations.getAnimation('BackIdle').play();
                    break;
                }
                case  180:
                case -180:
                {
                    this.animations.getAnimation('LeftIdle').play();
                    break;
                }
                default:
                {
                    this.animations.getAnimation('FrontIdle').play();
                    break;
                }
            }
        }

        die()
        {
            this.alive = false;
        }

        // update()
        // {
        //     this.rotation = this.game.physics.arcade.angleToPointer(this);
        // }
    }
}

// TODO:
//  - Shoot the Pointer: http://phaser.io/examples/v2/arcade-physics/shoot-the-pointer