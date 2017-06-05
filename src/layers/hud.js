Layers.HUD = (function() {
  var LifeSprite = defineLifeSprite();

  var M = cc.Layer.extend({
    MARGIN: 10,
    INNER_MARGIN: 5,
    lifeSprites: [],
    weaponSprite: null,
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
        this.lifeSprites.push(sprite);
      }
    },
    update: function(health, weaponSprite) {
      if(health < 0) return;
      for(var i = 0; i < health; i++) {
        if(!this.lifeSprites[i].isActive()) this.lifeSprites[i].activate();
      }
      for(var i = health; i < this.maxHealth; i++) {
        if(this.lifeSprites[i].isActive()) this.lifeSprites[i].deactivate();
      }
      if(this.weaponSprite === null && weaponSprite) {
        this.weaponSprite = weaponSprite;
        this.weaponSprite.removeFromParent();
        this.addChild(weaponSprite);
      } else if(this.weaponSprite && !weaponSprite) {
        this.weaponSprite.removeFromParent();
        this.weaponSprite = null;
      }
      if(this.weaponSprite) {
        var weaponPosition = this.getWeaponPosition(this.weaponSprite);
        this.weaponSprite.update(weaponPosition.x, weaponPosition.y);
      }
    },
    getWeaponPosition: function(sprite) {
      return {
        x: cc.winSize.width/2,
        y: cc.winSize.height - sprite.size().height/2
      }
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
