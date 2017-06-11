Layers.RaceLayer = cc.Layer.extend({
  trackSprite: null,
  init: function(stage) {
    this._super();
    var sprites = stage.sprites();
    var trackSprite = this.createBackgroundTrack(stage);
    var seaSprite = this.createBackgroundSea(stage);
    this.setScale(this.scale(), this.scale());
    this.addChild(seaSprite, 0);
    this.addChild(trackSprite, 1);
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], 2);
    }  
    this.trackSprite = trackSprite;
  },
  createBackgroundTrack: function(stage) {
    var sprite = new Sprites.NonCroppedFullBackground(stage.background_track(), {width: stage.width, height: stage.height});
    sprite.setPosition(0, 0);
    return sprite;
  },
  createBackgroundSea: function(stage) {
    var backMinSize = {width: stage.width+cc.winSize.width*2, height: stage.height+cc.winSize.height*2};
    var sprite = new Sprites.CroppedFullBackground(stage.background_sea(), backMinSize);
    sprite.setPosition(0, 0);
    return sprite;
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
