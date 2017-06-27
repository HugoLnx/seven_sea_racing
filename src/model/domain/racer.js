Model.Domain.Racer = (function() {
  var USUAL_RUN_FORCE =  607500;
  var MAX_VELOCITY =     300;
  var MAX_ACCELERATION = 60000;
  var WEIGHT = 20;
  var M = function(body, sprite, initialDirection) {
    this.type = "racer";
    this.isRecovering = false;
    this.body = body;
    this.sprite = sprite;
    this.maxHealth = 5;
    this.health = this.maxHealth;
    this.weapon = null;
    this.absoluteForce = USUAL_RUN_FORCE;
    this.direction = initialDirection;
    this.controlsDisabled = true;
    var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

    this.enableControls = function() {
      this.controlsDisabled = false;
    };

    this.behave = function(frame, deltaTime) {
      if(this.controlsDisabled) {
        return true;
      }
      var ROTATION_SPEED_DEGREES_PER_SECOND = 180;

      if(this.weapon && this.weapon.wasUsed()) {
        this.weapon = null;
      }

      if(!this.isAccelerating()) {
        return true;
      };
      var touchPosition = Model.Controls.instance().touching();

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

      this.body.applyForce(Lib.Geometry.toVector(this.direction, this.absoluteForce), deltaTime);
      return true;
    };

    this.update = function(deltaTime) {
      this.sprite.update(this.body.x(), this.body.y(), this.direction, this.body.velocityModulePercentage(), this.isOnTurbo(), deltaTime);
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

    this.isAccelerating = function() {
      var touchPosition = Model.Controls.instance().touching();
      return touchPosition !== null;
    };

    this.isOnTurbo = function() {
      return this.weapon && this.weapon.weaponType() == "turbo" && this.weapon.isActive();
    };
  }

  M.build = function(position, initialDirection) {
    var sprite = new Sprites.Racer();
    var maxSide = Math.max(sprite.size().width*0.5, sprite.size().height*0.5);
    var body = new Model.Physics.Body(maxSide, maxSide, true, WEIGHT);
    body.position(position);
    body.maxVelocity(MAX_VELOCITY);
    body.maxAcceleration(MAX_ACCELERATION);
    Model.Physics.Universe.instance().add(body);
    var racer = new M(body, sprite, initialDirection);
    body.attachTo(racer);
    return racer;
  };

  return M;
}());
