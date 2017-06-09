Layers.HUD = (function() {
  var LifeSprite = defineLifeSprite();

  var M = cc.Layer.extend({
    MARGIN: 10,
    INNER_MARGIN: 5,
    lifeSprites: [],
    weaponSprite: null,
    maxHealth: null,
    timerLabel: null,
    init: function(maxHealth) {
      this._super();
      this.maxHealth = maxHealth;
      var lifeSection = this.createLifeSprites(maxHealth);
      this.createTimerLabel();
    },
    update: function(health, weaponSprite, timeLeft) {
      this.updateLabel(timeLeft);
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
    },
    createLifeSprites: function() {
      var size = {width: 0, height: 0};
      for(var i = 0; i < this.maxHealth; i++) {
        var sprite = new LifeSprite();
        var x = sprite.size().width/2 + (sprite.size().width + this.INNER_MARGIN)*i + this.MARGIN;
        var y = cc.winSize.height - sprite.size().height/2 - this.MARGIN;
        sprite.setPosition({x: x, y: y});
        this.addChild(sprite);
        this.lifeSprites.push(sprite);
        size.width += sprite.size().width + this.INNER_MARGIN;
        size.height = Math.max(sprite.size().height, size.height);
      }
      size.width += this.MARGIN;
      size.height += this.MARGIN;
      return {
        size: size
      };
    },
    createTimerLabel: function() {
      var label = new Sprites.RegularLabel(30);
      this.addChild(label);
      this.timerLabel = label;
    },
    updateLabel: function(timeLeft) {
      this.timerLabel.setString(timeToString(timeLeft));
      var size = this.timerLabel.size();
      this.timerLabel.setPosition(cc.winSize.width - this.MARGIN - size.width/2, cc.winSize.height - size.height/2 - this.MARGIN);
    }
  });

  function timeToString(timeLeft) {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = Math.floor(timeLeft % 60);
    return padding(minutes, 2, "0") + ":" + padding(seconds, 2, "0")
  }

  function padding(number, size, fill) {
    var str = ""+number;
    while(str.length < size) {
      str = fill + str;
    }
    return str;
  }

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
