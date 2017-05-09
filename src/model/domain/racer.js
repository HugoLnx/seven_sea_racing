Model.Domain.Racer = (function() {
  var M = function(body, sprite) {
    this.body = body;
    this.sprite = sprite;
    Model.Controls.instance(sprite);
    var absoluteVelocity = 5;
    var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

    this.sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);

    this.behave = function(frame) {
      var ROTATION_SPEED_DEGREES_PER_SECOND = 180;
      var ROTATION_UPDATE_RATE_SECONDS = 0.1;
      var FPS = 60;

      if(frame % (ROTATION_UPDATE_RATE_SECONDS*FPS) === 0) {
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
          this.body.velocity(Lib.Geometry.toVector((body.direction() - rotation + 360) % 360, absoluteVelocity));
        } else {
          this.body.velocity(Lib.Geometry.toVector(Lib.Geometry.angle(touchVector), absoluteVelocity));
        }
      }
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.body.direction());
    };
  }

  M.build = function() {
    var body = new Model.Physics.Body(100, 100, true, 5);
    body.velocity({x: 5, y: 0}); // initial velocity
    Model.Physics.Universe.instance().add(body);
    var racer = new M(body, new Sprites.Racer());
    body.attachTo(racer);
    return racer;
  };

  return M;
}());
