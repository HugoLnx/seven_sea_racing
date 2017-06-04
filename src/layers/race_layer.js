Layers.RaceLayer = cc.Layer.extend({
  bgSprite: null,
  init: function(race) {
    this._super();
    var sprites = race.sprites();
    var bgSprite = this.createBackground(race);
    this.addChild(bgSprite, 0);
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], 1);
    }  
    this.bgSprite = bgSprite;
  },
  createBackground: function(race) {
    var bgSprite = new Sprites.CroppedFullBackground(res.background_png, {width: race.width, height: race.height});
    bgSprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    return bgSprite;
  }
});
