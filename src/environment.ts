module S6InstaJam
{
    export class Environment extends Phaser.Group
    {
        locs: number[];

        constructor( p_game: Phaser.Game )
        {
            super( p_game, p_game.world, 'Environment', true, true, Phaser.Physics.ARCADE );
            this.locs = [];

            for( var idx = 0; idx < 50; ++idx )
            {
                this.uniqueLoc();
            }

            p_game.add.existing( this );
        }

        uniqueLoc()
        {
            var limit = this.game.world.height * 1.5;
            var idx;
            // var kdkd = 0;

            console.log( 'limit: ' + limit );

            do {
                var x = this.game.rnd.realInRange( -this.game.world.centerY, limit ) / limit;
                var y = this.game.rnd.realInRange( -this.game.world.centerY, limit ) / limit;

                if (y > limit)
                {
                    y = limit;
                }

                idx = (y * 17) + x;
                console.log( 'x: ' + x + ', y: ' + y + ', idx: ' + idx );

                // kdkd++;
                // if(kdkd > 10){ break; }
            }
            while (this.locs.indexOf(idx) !== -1)

            this.locs.push(idx);
            this.create(x * limit, y * limit, 'BGAtlas', this.game.rnd.integerInRange(1, 10));
        }
    }
}