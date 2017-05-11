Sprites.Racer = cc.Sprite.extend({
  rectangle: null,
  ctor: function() {
    var SCALE = 0.25;
    this._super();
    this.initWithFile(res.horsefish_png);
    this.setScale(SCALE, SCALE);
  },
  update: function(x, y, direction) {
    this.setPosition(x, y);
    if(direction > 90 && direction < 270) {
      this.setFlippedY(true);
    } else {
      this.setFlippedY(false);
    }
    this.setRotation(-direction);
    if(this.rectangle) this.rectangle.setRotation(direction);
  },
  size: function() {
    return {width: this.width * this.getScaleX(), height: this.height * this.getScaleY()};
  },
  activateCollisionBox: function(width, height) {
    var COLORS = [cc.color(255,0,0,128), cc.color(0,255,0,128), cc.color(0,0,255,128), cc.color(0,255,255,128), cc.color(255,255,0,128)];
    var colorI = Math.floor(Math.random(new Date())*5);
    var width = width / this.getScaleX();
    var height = height / this.getScaleY();
    this.rectangle = cc.DrawNode.create();
    this.addChild(this.rectangle);
    this.rectangle.clear();
    this.rectangle.setPosition(this.width/2,this.height/2);
    this.rectangle.drawRect(new cc.Point(-width/2,-height/2), new cc.Point(width/2,height/2),
                            COLORS[colorI], 3, COLORS[(colorI+1)%5]);
  }
});
