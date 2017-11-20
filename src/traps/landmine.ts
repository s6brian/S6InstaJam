module S6InstaJam
{
    export class Landmine extends Phaser.Group
    {
        landmineSprite: Phaser.Sprite;
        explosions: Phaser.Group;
        explosionSprite: Phaser.Sprite;

        enemies: S6InstaJam.EnemyPool;

        constructor( p_game: Phaser.Game, p_enemies: S6InstaJam.EnemyPool )
        {
            super( p_game, p_game.world, 'Landmine' );
            this.explosions = new Phaser.Group( p_game, p_game.world, 'Explosion' );
            this.enemies = p_enemies;

            for(var idx = 0; idx < 20; ++idx)
            {
                this.landmineSprite = this.add( new Phaser.Sprite( p_game, 0, 0, 'GameObjectAtlas', 'gobj_landMine_0.png' ));
                this.landmineSprite.exists = false;
                this.landmineSprite.anchor.setTo( 0.5, 0.5 );
                this.landmineSprite.animations.add( 'blink', [ 'gobj_landMine_0.png', 'gobj_landMine_1.png' ], 4, true );

                this.explosionSprite = this.explosions.add( new Phaser.Sprite( p_game, 0, 0, 'FXAtlas', 0 ));
                this.explosionSprite.exists = false;
                this.explosionSprite.animations.add( 'explode', [0,1,2,3,4,5]);//, 10, false );
                this.explosionSprite.anchor.setTo( 0.5, 0.5 );
            }

            p_game.add.existing( this );
        }

        plant( p_x: number, p_y: number )
        {
            this.landmineSprite = this.getFirstExists(false);
            if( this.landmineSprite === null ){ return; }

            this.landmineSprite.reset( p_x, p_y );
            this.landmineSprite.animations.getAnimation( 'blink' ).play();
        }

        explode( p_landmine: Phaser.Sprite )
        {
            this.explosionSprite = this.explosions.getFirstExists(false, false);
            if( this.explosionSprite != null )
            {
                this.explosionSprite.reset( p_landmine.position.x, p_landmine.position.y );
                this.explosionSprite.animations.getAnimation( 'explode' ).play(15, false, true);
            }

            this.enemies.forEachExists(( p_enemy: S6InstaJam.Enemy ) => {
                if( this.game.physics.arcade.distanceBetween(p_landmine, p_enemy, true) <= 200 )
                {
                    p_enemy.die();
                }
            }, this);

            p_landmine.kill();
        }

        update()
        {
            // TODO: user quadtree
            this.forEachExists(( p_landmine: Phaser.Sprite ) => {
                this.enemies.forEachExists(( p_enemy: S6InstaJam.Enemy ) => {
                    if( this.game.physics.arcade.distanceBetween(p_landmine, p_enemy, true) <= 50 )
                    {
                        this.explode( p_landmine );
                    }
                }, this);
            }, this);
        }
    }
}