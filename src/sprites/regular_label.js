Sprites.RegularLabel = cc.Sprite.extend({
  LABEL_COLOR: cc.color(255, 189, 0),
  LABEL_BACK_COLOR: cc.color(255, 131, 0),
  SHADOW_OFFSET: 1,
  ctor: function(fontSize) {
    this._super();
    var labelFront = this._labelFront = new cc.LabelTTF("", "Berlin Sans FB Regular", fontSize/0.25);
    labelFront.setColor(this.LABEL_COLOR);
    labelFront.setScale(0.23);

    var labelBack = this._labelBack = new cc.LabelTTF("", "Berlin Sans FB Regular", fontSize/0.25);
    labelBack.setColor(this.LABEL_BACK_COLOR);
    labelBack.setScale(0.25);

    this._labelFront.setPosition({x: 0, y: 0});
    this._labelBack.setPosition({x: 0, y: this.SHADOW_OFFSET});

    this.addChild(labelBack, 0);
    this.addChild(labelFront, 1);
  },
  setString: function(str) {
    this._labelFront.setString(str);
    this._labelBack.setString(str);
  },
  size: function() {
    return {
      width: this._labelBack.getContentSize().width*this._labelBack.getScaleX(),
      height: this._labelBack.getContentSize().height*this._labelBack.getScaleY()/2
    };
  }
});
