Sprites.Button = cc.Sprite.extend({
  pressing: false,
  ctor: function(on_png, off_png) {
    this.on_png = on_png;
    this.off_png = off_png;
    this._super();
    this.initWithFile(off_png);
    sprite = this;
  },
  update: function() {
    if(this.isTouching()) {
      this.setTexture(this.on_png);
      this.pressing = true;
    } else {
      this.setTexture(this.off_png);
      if(this.pressing) {
        this.released = true;
        this.pressing = false;
      }
    }
  },
  wasReleased: function() {
    if(this.released) {
      this.released = false;
      return true;
    } else {
      return false;
    }
  },
  isTouching: function() {
    var x = this.getPositionX();
    var y = this.getPositionY();
    var width = this.width * this.getScaleX();
    var height = this.height * this.getScaleY();
    var touch = Model.Controls.instance(this).touching();
    return touch && (
      touch.x >= x - width/2 &&
      touch.x <= x + width/2 &&
      touch.y >= y - height/2 &&
      touch.y <= y + height/2
    );
  }
})
