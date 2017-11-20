module S6InstaJam
{
    export class EnemyPool extends Phaser.Group
    {
        player: S6InstaJam.Player;
        spawnRadius: number;
        spawnRate: number;
        nextSpawnTime: number;

        constructor( p_game: Phaser.Game, p_player: S6InstaJam.Player )
        {
            super(p_game, p_game.world, 'EnemyPool', false, true, Phaser.Physics.ARCADE);

            this.player = p_player;
            this.spawnRadius = p_game.world.height * 0.55; // p_game.world.width * 0.4;
            
            var offsetX = p_player.position.x + this.spawnRadius;
            var offsetY = p_player.position.y + this.spawnRadius;

            for(var count = 0; count < 100; ++count)
            {
                this.add(new Enemy(this.game, this.player, offsetX, offsetY), true);
            }

            this.setup();
            p_game.add.existing(this);
        }

        setup()
        {
            this.spawnRate = Phaser.Timer.SECOND * 0.5;
            this.nextSpawnTime = 0;
        }

        spawn()
        {
            if(this.nextSpawnTime > this.game.time.time){ return; }

            var angle = Math.random() * 360;
            var positionX = this.player.position.x + this.spawnRadius * Math.cos( angle );
            var positionY = this.player.position.y + this.spawnRadius * Math.sin( angle );
            // console.log('spawn 00');

            var enemy = this.getFirstExists(false);
            if(enemy == null){ return; }
            
            // console.log('spawn');
            enemy.spawn(positionX, positionY);
            this.nextSpawnTime = this.game.time.time + this.spawnRate;
        }

        // update()
        // {
        //     // TODO:
        //     // Utilize these items
        //     //  - Group vs Self: http://phaser.io/examples/v2/arcade-physics/group-vs-self
        // }
    }
}

