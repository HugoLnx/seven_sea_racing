Model.Domain.Racer = (function() {
  var M = function(body, sprite) {
    this.body = body;
    this.sprite = sprite;
    this.turbo = false;
    Model.Controls.instance(sprite);
    this.absoluteVelocity = 5;
    var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

    this.behave = function(frame) {
      var ROTATION_SPEED_DEGREES_PER_SECOND = 180;
      var ROTATION_UPDATE_RATE_SECONDS = 0.1;
      var FPS = 60;

      if(frame % (ROTATION_UPDATE_RATE_SECONDS*FPS) === 0) {
        var doubleTouchPosition = Model.Controls.instance().doubleTouching();
        if(doubleTouchPosition !== null) {
          this.turbo = true;
          var self = this;
          cc.director.getScheduler().scheduleCallbackForTarget(this.sprite, function() {
            self.turbo = false;
            console.log("TAC");
          }, 5, 0);
        }

        if(this.turbo) {
          this.absoluteVelocity = 5*2;
        } else {
          this.absoluteVelocity = 5;
        }

        var touchPosition = Model.Controls.instance().touching();
        if(touchPosition === null) return;
        var middle = {x: cc.winSize.width/2, y: cc.winSize.height/2};
        var touchVector = {x: touchPosition.x - middle.x, y: touchPosition.y - middle.y};
        var angleDistance = body.direction() - Lib.Geometry.angle(touchVector);
        if(angleDistance > 180) angleDistance -= 360;
        else if(angleDistance < -180) angleDistance += 360;
        var maxRotation = ROTATION_SPEED_DEGREES_PER_SECOND*ROTATION_UPDATE_RATE_SECONDS;
        var rotationAbs = Math.min(Math.abs(angleDistance), maxRotation)
        if(rotationAbs >= maxRotation) {
          var rotation = angleDistance === 0 ? 0 : (angleDistance/Math.abs(angleDistance)) * rotationAbs;
          this.body.velocity(Lib.Geometry.toVector((body.direction() - rotation + 360) % 360, this.absoluteVelocity));
        } else {
          this.body.velocity(Lib.Geometry.toVector(Lib.Geometry.angle(touchVector), this.absoluteVelocity));
        }
      }
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.body.direction());
    };
  }

  M.build = function(position, velocity) {
    var sprite = new Sprites.Racer();
    var maxSide = Math.max(sprite.size().width, sprite.size().height);
    var body = new Model.Physics.Body(maxSide, maxSide, true, 5);
    // sprite.activateCollisionBox(body.size().width, body.size().height);
    body.position(position);
    body.velocity(velocity);
    Model.Physics.Universe.instance().add(body);
    var racer = new M(body, sprite);
    body.attachTo(racer);
    return racer;
  };

  return M;
}());
