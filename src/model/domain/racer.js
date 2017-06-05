Model.Domain.Racer = (function() {
  var ACCELERATION =  450;
  var MAX_VELOCITY =  400;
  var WEIGHT = 20;
  var M = function(body, sprite, initialDirection) {
    this.isRecovering = false;
    this.body = body;
    this.sprite = sprite;
    this.maxHealth = 5;
    this.health = this.maxHealth;
    this.weapon = null;
    Model.Controls.instance(sprite);
    this.acceleration = ACCELERATION;
    this.direction = initialDirection;
    var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

    this.behave = function(frame, deltaTime) {
      var ROTATION_SPEED_DEGREES_PER_SECOND = 180;

      if(this.weapon && this.weapon.wasUsed()) {
        this.weapon = null;
      }

      var touchPosition = Model.Controls.instance().touching();
      if(touchPosition === null) {
        this.body.acceleration({x: 0, y: 0});
        return true;
      };
      var middle = {x: cc.winSize.width/2, y: cc.winSize.height/2};
      var touchVector = {x: touchPosition.x - middle.x, y: touchPosition.y - middle.y};
      var angleDistance = this.direction - Lib.Geometry.angle(touchVector);
      if(angleDistance > 180) angleDistance -= 360;
      else if(angleDistance < -180) angleDistance += 360;
      var maxRotation = ROTATION_SPEED_DEGREES_PER_SECOND*deltaTime;
      var rotationAbs = Math.min(Math.abs(angleDistance), maxRotation)
      if(rotationAbs >= maxRotation) {
        var rotation = angleDistance === 0 ? 0 : (angleDistance/Math.abs(angleDistance)) * rotationAbs;
        this.direction = (this.direction - rotation + 360) % 360;
      } else {
        this.direction = Lib.Geometry.angle(touchVector);
      }

      this.body.acceleration(Lib.Geometry.toVector(this.direction, this.acceleration));
      return true;
    };

    this.update = function(deltaTime) {
      var isOnTurbo = this.weapon && this.weapon.weaponType() == "turbo" && this.weapon.isActive();
      this.sprite.update(this.body.x(), this.body.y(), this.direction, this.body.velocityModulePercentage(), isOnTurbo, deltaTime);
      return true;
    };

    this.takeHit = function() {
      this.health -= 1;
    };

    this.catchWeapon = function(weapon) {
      this.weapon = weapon;
      weapon.owner(this);
    };

    this.onCollision = function(model) {
      if(model.weaponType) {
        this.catchWeapon(model);
      }
      else if(!this.isRecovering && model.hurts) {
        this.isRecovering = true;
        this.sprite.recovering(true);
        this.takeHit();
        var self = this;
        cc.director.getScheduler().scheduleCallbackForTarget(this.sprite, function() {
          self.isRecovering = false;
          self.sprite.recovering(false);
        }, 5, 0);
      }
    }
  }

  M.build = function(position, initialDirection) {
    var sprite = new Sprites.Racer();
    var maxSide = Math.max(sprite.size().width*0.5, sprite.size().height*0.5);
    var body = new Model.Physics.Body(maxSide, maxSide, true, WEIGHT);
    if(document && document.location && document.location.href && document.location.href.includes("collisionBoxes")) {
      sprite.activateCollisionBox(body.size().width, body.size().height);
    }
    body.position(position);
    body.maxVelocity(MAX_VELOCITY);
    Model.Physics.Universe.instance().add(body);
    var racer = new M(body, sprite, initialDirection);
    body.attachTo(racer);
    return racer;
  };

  return M;
}());
