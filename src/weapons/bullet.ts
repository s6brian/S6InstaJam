module S6InstaJam
{
    export class Bullet extends  Phaser.Sprite
    {
        target: S6InstaJam.Enemy;
        speed: number;

        constructor( p_game: Phaser.Game )
        {
            // 'gobj_bulletBack.png', 'gobj_bulletFront.png', gobj_bulletSide.png
            super( p_game, 0, 0, 'GameObjectAtlas', 'gobj_bulletFront.png' );

            this.anchor.set( 0.5 );
            this.exists = false;
            this.speed = 500;

            this.game.add.existing( this );
        }

        // TODO: bullet facing at
        fire( p_x: number, p_y: number, p_target: S6InstaJam.Enemy )
        {
            this.reset( p_x, p_y );
            this.target = p_target;
        }

        update()
        {
            if( this.exists )
            {
                if(!this.target.exists)
                {
                    this.kill();
                }

                this.rotation = this.game.physics.arcade.angleToXY(this, this.target.position.x, this.target.position.y);
                this.rotation -= 90;
                this.game.physics.arcade.moveToXY(this, this.target.position.x, this.target.position.y, this.speed);
                // console.log("distance: " + this.game.physics.arcade.distanceBetween(this, this.player, true));

                // if( this.game.physics.arcade.collide( this, this.target ))
                if(this.game.physics.arcade.distanceBetween(this, this.target, true) <= 100.0)
                {
                    this.kill();
                    this.target.die();
                }
            }
        }
    }
}