Model.Domain.Checkpoint = (function() {
  var M = function(body) {
    this.body = body;

    this.behave = function() { return true; };
    this.update = function() {};
  };

  M.prototype.onCollision = function(model, deltaTime) {
    if(model.type === "racer") {
      this.manager && this.manager.activateCheckpoint(this.number);
    }
  };

  M.prototype.manager = function(manager) {
    this.manager = manager;
  };

  M.prototype.number = function(number) {
    this.number = number;
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
