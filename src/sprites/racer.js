Sprites.Racer = cc.SpriteBatchNode.extend({
  COMMON_SPEED_RANGE: [0.06, 0.12],
  TURBO_SPEED_RANGE: [0.02, 0.10],
  recoveringAnimation: false,
  recoveringBlinkDuration: 0,
  swimmingAnimation: null,
  ctor: function() {
    cc.spriteFrameCache.addSpriteFrames(res.horsefish_plist);
    var SCALE = 0.25;
    this._super(res.horsefish_png);
    this.setCommonSpeedRange();
    this.frames = this.animationFrames();
    this.initWithFile(res.horsefish_png);
    this.sprite = new cc.Sprite("#horsefish01.png");
    this.setScale(SCALE, SCALE);
    this.swimmingAnimation = this.startAnimation();
    this.addChild(this.sprite);
  },
  runSwimming: function(speedPercentage) {
    var speed = this.minSpeed - (this.minSpeed-this.maxSpeed) * speedPercentage;
    this.setSpeed(speed);
  },
  setSpeed: function(speed) {
    var framesCount = this.swimmingAnimation.getAnimation().getFrames().length;
    this.swimmingAnimation.setDuration(speed*framesCount);
  },
  animationFrames: function() {
    var frames = [];
    for(var i = 1; i <= 5; i++) {
      var frame = cc.spriteFrameCache.getSpriteFrame("horsefish0"+i+".png");
      frames.push(frame)
    }
    for(var i = 4; i >= 2; i--) {
      var frame = cc.spriteFrameCache.getSpriteFrame("horsefish0"+i+".png");
      frames.push(frame)
    }
    return frames;
  },
  startAnimation: function() {
    var animation = new cc.Animation(this.frames, this.minSpeed);
    var animate = new cc.Animate(animation);
    var action = new cc.RepeatForever(animate);
    this.sprite.runAction(action);
    return animate;
  },
  setTurboSpeedRange: function() {
    this.maxSpeed = this.TURBO_SPEED_RANGE[0];
    this.minSpeed = this.TURBO_SPEED_RANGE[1];
  },
  setCommonSpeedRange: function() {
    this.maxSpeed = this.COMMON_SPEED_RANGE[0];
    this.minSpeed = this.COMMON_SPEED_RANGE[1];
  },
  update: function(x, y, direction, speedPercentage, turbo, deltaTime) {
    var RECOVERING_BLINK_DURATION = 0.25;
    if(turbo) {
      this.setTurboSpeedRange();
    } else {
      this.setCommonSpeedRange();
    }
    this.runSwimming(speedPercentage);
    if(this.recoveringAnimation) {
      this.recoveringBlinkDuration += deltaTime;
      if(this.recoveringBlinkDuration <= RECOVERING_BLINK_DURATION) {
        this.sprite.setOpacity(125);
      } else {
        this.sprite.setOpacity(255);
      }
      if (this.recoveringBlinkDuration >= RECOVERING_BLINK_DURATION*2) this.recoveringBlinkDuration = 0;
    } else {
      this.sprite.setOpacity(255);
    }

    this.setPosition(x, y);
    if(direction > 90 && direction < 270) {
      this.sprite.setFlippedY(true);
    } else {
      this.sprite.setFlippedY(false);
    }
    this.setRotation(-direction);
  },
  recovering: function(value) {
    this.recoveringAnimation = value;
    this.recoveringBlinkDuration = 0;
  },
  size: function() {
    return {width: this.sprite.width * this.getScale(), height: this.sprite.height * this.getScale()};
  }
});
