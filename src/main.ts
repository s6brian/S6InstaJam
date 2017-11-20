module S6InstaJam
{
	export class Main extends Phaser.Game
	{
		constructor()
		{
			// aspect ratio: "9:16"
			// width : 607
			// height: 1080
			super( 607, 1080, Phaser.AUTO, 'content', null );
			// this.scale.windowConstraints.bottom = 'visual';
			
			this.state.add('BootState', BootState, false);
			this.state.add('PreloaderState', PreloaderState, false);
			this.state.add('MainMenuState', MainMenuState, false);
			this.state.add('GameState', GameState, false);

			this.state.start('BootState');
		}
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new S6InstaJam.Main();
}