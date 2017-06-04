Layers.HUD = cc.Layer.extend({
  label: null,
  init: function() {
    this._super();
    var label = this.label = new cc.LabelTTF("", "Berlin Sans FB Bold", 21);
    label.setColor(cc.color(255, 189, 0));
    this.addChild(label);
  },
  update: function(health) {
    this.label.setString("Health: " + health);
    var size = this.label.getContentSize();
    this.label.setPosition({x: size.width, y: cc.winSize.height-size.height/2});
  }
});
