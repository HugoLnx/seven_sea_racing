Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    this.gameLayer = new Layers.RaceLayer();
    this.race = new Model.Domain.Race();
    var bgLayer = new Layers.CroppedFullBackground();
    bgLayer.init(res.background_png, {width: this.race.width, height: this.race.height});
    bgLayer.setAnchorPoint(0, 0);
    bgLayer.sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    Model.Controls.resetInstance();
    Model.Controls.instance(bgLayer.sprite);

    this.gameLayer.init(this.race.sprites());
    this.update(0);
    this.addChild(bgLayer, 0);
    this.addChild(this.gameLayer, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update(dt);

    var scenePosition = this.race.calculateCameraPosition();
    this.setPosition(scenePosition.x, scenePosition.y);
  }
});
