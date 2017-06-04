Layers.HUD = (function() {
  var LifeSprite = defineLifeSprite();

  var M = cc.Layer.extend({
    MARGIN: 10,
    INNER_MARGIN: 5,
    sprites: [],
    maxHealth: null,
    init: function(maxHealth) {
      this._super();
      this.maxHealth = maxHealth;
      for(var i = 0; i <= 4; i++) {
        var sprite = new LifeSprite();
        var x = sprite.size().width/2 + (sprite.size().width + this.INNER_MARGIN)*i + this.MARGIN;
        var y = cc.winSize.height - sprite.size().height/2 - this.MARGIN;
        sprite.setPosition({x: x, y: y});
        this.addChild(sprite);
        this.sprites.push(sprite);
      }
    },
    update: function(health) {
      if(health < 0) return;
      for(var i = 0; i < health; i++) {
        if(!this.sprites[i].isActive()) this.sprites[i].activate();
      }
      for(var i = health; i < this.maxHealth; i++) {
        if(this.sprites[i].isActive()) this.sprites[i].deactivate();
      }
    },
    createHeadSprite: function() {
      return sprite;
    }
  });

  function defineLifeSprite() {
    return cc.Sprite.extend({
      activated: null,
      ctor: function() {
        this._super();
        this.initWithFile(res.horsefish_life_png);
        this.setScale(0.45);
        this.activate();
      },
      activate: function() {
        this.setOpacity(255);
        this.activated = true;
      },
      deactivate: function() {
        this.setOpacity(50);
        this.activated = false;
      },
      isActive: function() {
        return this.activated;
      },
      size: function() {
        return {
          width: this.width * this.getScaleX(),
          height: this.height * this.getScaleY()
        }
      }
    });
  }

  return M;
}());
