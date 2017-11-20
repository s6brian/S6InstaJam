module S6InstaJam
{
    export class Weapon extends Phaser.Sprite
    {
        player: Player;
        bulletPool: BulletPool;
        enemies: EnemyPool;

        quadTree: Phaser.QuadTree;
        quadTreeMarker: Phaser.Rectangle;
        targetArray: Enemy[];

        currentTargetIndex: number;
        fireRate: number;
        nextFireTime: number;
        range: number;
        burstCapacity: number;

        constructor( p_game: Phaser.Game, p_player: Player, p_enemies: EnemyPool )
        {
            super( p_game, p_player.position.x, p_player.position.y );

            this.bulletPool = new BulletPool( p_game );
            this.enemies = p_enemies;

            this.quadTree = new Phaser.QuadTree( 0, 0, p_game.world.width, p_game.world.height, 10, 4, 0 );
            this.quadTreeMarker = new Phaser.Rectangle( 0, 0, 128, 128 );
            this.targetArray = [];
            
            this.setup();
            p_game.add.existing( this );
        }

        setup()
        {
            this.fireRate = Phaser.Timer.SECOND * 0.1;
            this.currentTargetIndex = 0;
            this.nextFireTime = 0;
            this.range = 150;
            this.burstCapacity = 5;
        }

        fire()
        {
            if(this.targetArray.length > 0)
            {
                // console.log("target count: " + this.targetArray.length);
                return;
            }

            var existingEnemies = this.enemies.getAll( 'exists', true );
            var inputX = this.game.input.x;
            var inputY = this.game.input.y;
            var enemyOnCheck;

            if(existingEnemies.length <= 0){ return; }
            this.quadTree.clear();
            for(var idx = existingEnemies.length - 1; idx >= 0; --idx)
            {
                this.quadTree.insert(existingEnemies[idx]);
            }

            this.quadTreeMarker.x = inputX;
            this.quadTreeMarker.y = inputY;
            existingEnemies = this.quadTree.retrieve( this.quadTreeMarker );

            for(var idx = existingEnemies.length - 1; idx >= 0; --idx)
            {
                // check distance from input pointer
                // if within range, set as target: this.bulletPool.fire( this.position.x, this.position.y, existingEnemies[idx] );
                enemyOnCheck = existingEnemies[idx];
                if(this.game.physics.arcade.distanceToXY(enemyOnCheck, inputX, inputY) <= this.range)
                {
                    this.targetArray.push(enemyOnCheck);
                }

                if(this.targetArray.length >= this.burstCapacity)
                {
                    break;
                }
            }

            this.currentTargetIndex = 0;
            // console.log('FIRE!');
        }

        update()
        {
            // if(this.targetArray.length <= 0){ return; }
            if(this.currentTargetIndex >= this.targetArray.length){ return; }
            if(this.nextFireTime > this.game.time.time){ return; }

            var enemy =  this.targetArray[this.currentTargetIndex++];
            var angle  = this.game.physics.arcade.angleToXY(this, enemy.position.x, enemy.position.y);
                // angle *= 180 / Math.PI;
                // angle  = 90 * Math.floor( angle / 90 );
                // console.log( 'angle: ' + angle );
            var posx  = this.position.x + 70 * Math.cos( angle );
            var posy  = this.position.y + 70 * Math.sin( angle );

            enemy.events.onKilled.add(() => { this.targetArray.pop(); });
            this.bulletPool.fire( posx, posy, enemy );//this.targetArray.pop());
            this.nextFireTime = this.game.time.time + this.fireRate;
        }
    }
}