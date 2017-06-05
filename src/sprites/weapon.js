Sprites.Weapon = cc.Sprite.extend({
  ctor: function(image) {
    this._super();
    this.initWithFile(image);
    this.setScale(0.5, 0.5);
  },
  update: function(x, y) {
    this.setPosition(x, y);
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
