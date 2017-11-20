module S6InstaJam
{
    export class GameState extends Phaser.State
    {
        player: S6InstaJam.Player;
        enemies: S6InstaJam.EnemyPool;
        weapon: S6InstaJam.Weapon;
        landmines: S6InstaJam.Landmine;

        isTrapPlanted: boolean;
        trapTimerEvent: Phaser.TimerEvent;

        gameOverUI: Phaser.Sprite;
        retryButton: Phaser.Button;

        depthSort: Phaser.Group;

        create()
        {
            var environment = new Environment( this.game );
            
            var bunker = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'BGAtlas', 'bunker.png' );
            bunker.anchor.setTo( 0.55, -0.5 );

            // this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.player   = new Player( this.game, this.game.world.centerX, this.game.world.centerY );
            this.enemies  = new EnemyPool( this.game, this.player );
            this.weapon   = new Weapon( this.game, this.player, this.enemies );
            this.landmines = new Landmine( this.game, this.enemies );

            this.isTrapPlanted = false;

            // this.enemies.forEachExists
            this.depthSort = this.game.add.group();
            this.depthSort.add( this.player );
            // this.depthSort.add( bunker );

            environment.forEach(( p_bg: Phaser.Sprite ) => {
                this.depthSort.add( p_bg );
            }, this);

            this.enemies.forEach(( p_enemy: S6InstaJam.Enemy ) => {
                this.depthSort.add( p_enemy );
            }, this);

            this.landmines.forEach(( p_landmine: Phaser.Sprite ) => {
                this.depthSort.add( p_landmine );
            }, this);

            this.depthSort.sort();

            this.gameOverUI = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'UIAtlas', 'ui_gameOver.png');
            this.gameOverUI.visible = false;
            this.gameOverUI.anchor.setTo( 0.5, 2.0 );

            this.retryButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'UIAtlas', () => {
                this.player.alive = true;
                this.enemies.killAll();
                this.landmines.killAll();
                this.gameOverUI.visible = false;
                this.retryButton.visible = false;
            }, this);
            this.retryButton.setFrames( 'ui_btnPlayAgainUp.png', 'ui_btnPlayAgainUp.png', 'ui_btnPlayAgainDown.png', 'ui_btnPlayAgainUp.png' );
            this.retryButton.visible = false;
            this.retryButton.anchor.setTo( 0.5, 1.0 );

            // controls
            this.game.input.onDown.add(this.standbyWeapon, this);
            this.game.input.onUp.add(this.fire, this);
        }

        standbyWeapon(p_pointer: Phaser.Pointer)
        {
            // console.log('pointer id: ' + p_pointer.id);
            if( !this.player.alive ){ return; }
            if(this.isWorldRotating()){ return; }
            // // TODO: timer should be from active trap
            this.trapTimerEvent = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.plantTrap, this, p_pointer.position.x, p_pointer.position.y);
        }

        fire(p_pointer: Phaser.Pointer)
        {
            if(p_pointer.identifier === null){ return; }
            if(this.isWorldRotating()){ return; }
            // console.log('pointer up id: ' + p_pointer.identifier);

            var angle  = this.game.physics.arcade.angleToXY(this.player, p_pointer.position.x, p_pointer.position.y);
                angle *= 180 / Math.PI;
                angle = 90 * Math.round( angle / 90 );
            this.player.faceDirection( angle, this.isTrapPlanted );

            if(!this.isTrapPlanted)
            {
                // console.log('FIRE!');
                this.weapon.fire();
            }

            this.isTrapPlanted = false;
            this.game.time.events.remove(this.trapTimerEvent);
        }

        plantTrap( p_x: number, p_y: number )
        {
            this.isTrapPlanted = true;
            console.log('plant trap: ' + p_x + ", " + p_y);
            this.landmines.plant( p_x, p_y );
        }

        isWorldRotating(): boolean
        {
            var isWorldRotating = this.game.input.keyboard.isDown( Phaser.KeyCode.SHIFT );
                isWorldRotating = isWorldRotating || ( this.game.input.countActivePointers() > 1 );

            return isWorldRotating;
        }

        update()
        {
            if(!this.player.alive)// && !this.gameOverUI.visible)
            {
                this.gameOverUI.visible = true;
                this.retryButton.visible = true;

                this.game.world.bringToTop( this.gameOverUI );
                this.game.world.bringToTop( this.retryButton );

                return;
            }

            this.enemies.spawn();
            this.depthSort.sort( 'y', Phaser.Group.SORT_ASCENDING );
            this.game.world.bringToTop(this.enemies);
        }
    }
}