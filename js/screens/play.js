game.PlayScreen = me.ScreenObject.extend({
  tickCpt : 0,
  spaceBetweenPipes : 110,
  pipeSpawnXpos : 500,

	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		// add background
		me.game.add(new ScrollingBackgroundLayer('bkg', 1), -1);

		// add player
		player = me.entityPool.newInstanceOf("player", 60, 60);
		me.game.world.addChild(player);
    // generate pipes
    this.generatePipes();
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

  update: function() {
    // update tick Cpt and generate pipes if needed
    this.tickCpt += me.timer.tick;
    this.generatePipes();
    return false;
  },

  /**
   *  Generate pipes on the screen
   */
  generatePipes: function() {
    if (this.tickCpt % this.spaceBetweenPipes == 0) {
      pipe = me.entityPool.newInstanceOf("pipe", this.pipeSpawnXpos, -50 + Math.floor((Math.random()*100)+1));
      me.game.world.addChild(pipe);
      pipe = me.entityPool.newInstanceOf("pipe", this.pipeSpawnXpos, pipe.pos.y + 300);
      me.game.world.addChild(pipe);
    }
  }
});
