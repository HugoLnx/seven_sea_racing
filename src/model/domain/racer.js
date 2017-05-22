Model.Domain.Racer = (function() {
  var USUAL_RUN_FORCE = 5;
  var MAX_VELOCITY = 7.5;
  var MAX_ACCELERATION = 10;
  var WEIGHT = 20;
  var M = function(body, sprite, initialDirection) {
    this.body = body;
    this.sprite = sprite;
    this.turbo = false;
    Model.Controls.instance(sprite);
    this.absoluteForce = USUAL_RUN_FORCE;
    this.direction = initialDirection;
    var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

    this.behave = function(frame) {
      var ROTATION_SPEED_DEGREES_PER_SECOND = 180;
      var ROTATION_UPDATE_RATE_SECONDS = 0.1;
      var FPS = 60;

      if(frame % (ROTATION_UPDATE_RATE_SECONDS*FPS) === 0) {
        var doubleTouchPosition = Model.Controls.instance().doubleTouching();
        if(this.turbo == false && doubleTouchPosition !== null) {
          this.turbo = true;
          var self = this;
          cc.director.getScheduler().scheduleCallbackForTarget(this.sprite, function() {
            Model.Controls.instance().clearDoubleTouching();
            self.turbo = false;
          }, 1, 0);
        }

        if(this.turbo) {
          this.absoluteForce = USUAL_RUN_FORCE*2;
          this.body.maxVelocity(MAX_VELOCITY*2);
          this.body.maxAcceleration(MAX_ACCELERATION*2);
        } else {
          this.absoluteForce = USUAL_RUN_FORCE;
          this.body.maxVelocity(MAX_VELOCITY);
          this.body.maxAcceleration(MAX_ACCELERATION);
        }

        var touchPosition = Model.Controls.instance().touching();
        if(touchPosition === null) return;
        var middle = {x: cc.winSize.width/2, y: cc.winSize.height/2};
        var touchVector = {x: touchPosition.x - middle.x, y: touchPosition.y - middle.y};
        var angleDistance = this.direction - Lib.Geometry.angle(touchVector);
        if(angleDistance > 180) angleDistance -= 360;
        else if(angleDistance < -180) angleDistance += 360;
        var maxRotation = ROTATION_SPEED_DEGREES_PER_SECOND*ROTATION_UPDATE_RATE_SECONDS;
        var rotationAbs = Math.min(Math.abs(angleDistance), maxRotation)
        if(rotationAbs >= maxRotation) {
          var rotation = angleDistance === 0 ? 0 : (angleDistance/Math.abs(angleDistance)) * rotationAbs;
          this.direction = (this.direction - rotation + 360) % 360;
        } else {
          this.direction = Lib.Geometry.angle(touchVector);
        }

        this.body.applyForce(Lib.Geometry.toVector(this.direction, this.absoluteForce));
      }
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.direction);
    };
  }

  M.build = function(position, initialDirection) {
    var sprite = new Sprites.Racer();
    var maxSide = Math.max(sprite.size().width, sprite.size().height);
    var body = new Model.Physics.Body(maxSide, maxSide, true, WEIGHT);
    // sprite.activateCollisionBox(body.size().width, body.size().height);
    body.position(position);
    body.maxVelocity(MAX_VELOCITY);
    body.maxAcceleration(MAX_ACCELERATION);
    //body.velocity(velocity);
    Model.Physics.Universe.instance().add(body);
    var racer = new M(body, sprite, initialDirection);
    body.attachTo(racer);
    return racer;
  };

  return M;
}());
