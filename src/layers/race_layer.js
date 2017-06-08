Layers.RaceLayer = cc.Layer.extend({
  bgSprite: null,
  init: function(race) {
    this._super();
    this.race = race;
    var sprites = race.sprites();
    var bgSprite = this.createBackground(race);
    this.setScale(this.scale(), this.scale());
    this.addChild(bgSprite, 0);
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], 1);
    }  
    this.bgSprite = bgSprite;
  },
  createBackground: function(race) {
    var bgSprite = new Sprites.CroppedFullBackground(res.background_png, {width: race.width, height: race.height});
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
