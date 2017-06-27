Model.Domain.CheckpointManager = (function() {
  var M = function(lastNumber) {
    this.lastNumber = lastNumber;
    this.lastActivated = 0;
  };

  M.prototype.activateCheckpoint = function(number) {
    if(this.lastActivated + 1 === number) {
      this.lastActivated = number;
      console.log("activated checkpoint", number);

      if(this.lastActivated === this.lastNumber) {
        console.log("You won!!!");
      }
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
