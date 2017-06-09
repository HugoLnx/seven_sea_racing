Layers.RaceLayer = cc.Layer.extend({
  bgSprite: null,
  init: function(stage) {
    this._super();
    var sprites = stage.sprites();
    var bgSprite = this.createBackground(stage);
    this.setScale(this.scale(), this.scale());
    this.addChild(bgSprite, 0);
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], 1);
    }  
    this.bgSprite = bgSprite;
  },
  createBackground: function(stage) {
    var bgSprite = new Sprites.CroppedFullBackground(stage.background(), {width: stage.width, height: stage.height});
    bgSprite.setPosition(0, 0);
    return bgSprite;
  },
  scale: function() {
    return 0.5; // 0.12;
  },
  size: function() {
    return {width: this.width*this.scale(), height: this.height*scale()};
  },
  cameraFollow: function(position) {
    var cameraPosition = this.calculateCameraPositionFor(position);
    this.setPosition(cameraPosition.x, cameraPosition.y);
  },
  calculateCameraPositionFor: function(position) {
    var x = (cc.winSize.width/2-position.x)*this.scale();
    var y = (cc.winSize.height/2-position.y)*this.scale();
    return {x: x, y: y};
  }
});
