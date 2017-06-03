Scenes.StartScene = cc.Scene.extend({
  button: null,
  onEnter: function() {
    this._super();
    var bgLayer = new Layers.CroppedFullBackground();
    bgLayer.init(res.start_screen_background_png);
    var button = this.createButtonFor(cc.winSize, bgLayer.scale());

    this.addChild(bgLayer, 0);
    this.addChild(button, 1);
    this.button = button;
    this.scheduleUpdate();
  },
  update: function() {
    this.button.update();
    if(this.button.wasReleased()) {
      cc.director.runScene(new Scenes.RaceScene());
    }
  },
  createButtonFor: function(bgSize, scale) {
    var sprite = new Sprites.Button(res.start_screen_button_on_png, res.start_screen_button_off_png);
    sprite.setPosition(bgSize.width/2, bgSize.height * 0.15);
    sprite.setScale(scale, scale);
    return sprite;
  }
});
