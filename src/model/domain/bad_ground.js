Model.Domain.BadGround = (function() {
  var M = function(body) {
    this.body = body;

    this.behave = function() { return true; };
    this.update = function() {};
  };

  M.prototype.onCollision = function(model, deltaTime) {
    if(model.type === "racer") {
      if(model.isOnTurbo()) {
        var maxVelocityOnBadGround = model.body.maxVelocity()*0.75;
      } else {
        var maxVelocityOnBadGround = model.body.maxVelocity()/3;
      }
      if(model.isAccelerating()) {
        model.body.applyVelocityFrictionForce(10000000, deltaTime, maxVelocityOnBadGround);
      } else {
        model.body.applyVelocityFrictionForce(maxVelocityOnBadGround/10, deltaTime);
      }
      model.body.applyAccelerationFrictionForce(600000, deltaTime);
    }
  };

  M.build = function(position, size) {
    var body = new Model.Physics.Body(size.width, size.height, false, 0);
    body.position(position);
    Model.Physics.Universe.instance().add(body);
    var badGround = new M(body);
    body.attachTo(badGround);
    return badGround;
  };

  return M;
}());
