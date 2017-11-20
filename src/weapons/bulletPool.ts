module S6InstaJam
{
    export class BulletPool extends Phaser.Group
    {
        constructor( p_game: Phaser.Game /*, p_weapon: S6InstaJam.Weapon*/ )
        {
            super( p_game, p_game.world, 'BulletPool', false, true, Phaser.Physics.ARCADE );

            for(var count = 0; count < 20; ++count)
            {
                this.add( new Bullet( p_game ), true );
            }

            p_game.add.existing( this );
        }

        fire( p_x: number, p_y: number, p_target: S6InstaJam.Enemy )
        {
            var bullet = this.getFirstExists( false );
            if( bullet === null )
            {
                // console.log( 'no ammo?? wtf??' );
                return;
            }

            bullet.fire( p_x, p_y, p_target );
        }
    }
}