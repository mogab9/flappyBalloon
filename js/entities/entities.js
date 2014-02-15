var ScrollingBackgroundLayer = me.ImageLayer.extend({
  repeat: 'repeat-x',

  init: function (image, ratio) {
    var name   = image;
    var width  = 640;
    var height = 480;
    var z      = 1;
    this.parent(name, width, height, image, z, ratio);
  },

  update: function () {
    // reset img pos to prevent an IndexSizeError
    if (this.pos.x >= this.imagewidth/2) {
      this.pos.x = 0;
    }
    // scroll!!!
    this.pos.x++;
    this.parent();
    return true; 
  }
});

var PlayerEntity = me.ObjectEntity.extend({
  gravityForce : 1,

  init: function (x, y) {
    this.parent(x, y, {
        image : "player",
        width : 32,
        height : 32,
        spritewidth : 32,
        spriteheight : 32,
    });
    this.alwaysUpdate = true;
    // handle collision
    this.addShape(new me.Rect(new me.Vector2d(5, 5), 32, 32));
  },

  // update the player pos
  update: function () {
    // death handler
    if (false === this.inViewport) {
        this.death();
    }
    // jump handler
    if (me.input.isKeyPressed('jump')){
        this.jumping      = true;
        this.gravityForce = -4.0;
    } else {
        this.jumping      = false;
        this.gravityForce += 0.15;
        this.pos.y        += this.gravityForce;
    }

    // collision detection
    var res = me.game.collide(this);

    if (res) {
        this.death();
    }

    //this.updateMovement();

    // else inform the engine we did not perform
    // any update (e.g. position, animation)
    return false;
  },

  death: function () {
    this.alive = false;
    me.state.change(me.state.PLAY);
    return true;
  },
});

var PipeEntity = me.ObjectEntity.extend({
  gravityForce : 0,

  init: function (x, y) {
    this.parent(x, y, {
        image : "pipe",
        width : 50,
        height : 150,
        spritewidth : 50,
        spriteheight : 150,
    });
    this.alwaysUpdate = true;
    // handle collision
    this.addShape(new me.Rect(new me.Vector2d(5, 5), 150, 50));
  },

  update: function () {
    this.pos.x -= 1.0;
    return false;
  },

});