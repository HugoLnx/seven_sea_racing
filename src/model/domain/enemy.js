Model.Domain.Enemy = (function() {
  var M = function(body, sprite, initialDirection) {
    var WALK_DURATION_SECONDS = 2.5;
    var WALK_DURATION_FRAMES = Math.floor(WALK_DURATION_SECONDS*60);
    this.body = body;
    this.sprite = sprite;
    this.firstFrame = null;
    this.direction = initialDirection;
    this.forceModule = 100;
    this.behave = function(frame) {
      if(this.firstFrame === null) {
        this.firstFrame = frame % WALK_DURATION_FRAMES;
      }
      else if(frame % WALK_DURATION_FRAMES === this.firstFrame) {
        this.direction = (this.direction + 360 + 180) % 360;
      }
      body.applyForce(Lib.Geometry.toVector(this.direction, this.forceModule));
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.direction);
    };
  };

  M.build = function(position, initialDirection) {
    var sprite = new Sprites.Enemy();
    var maxSide = Math.max(sprite.size().width, sprite.size().height);
    var body = new Model.Physics.Body(maxSide, maxSide, true, 5);
    // sprite.activateCollisionBox(body.size().width, body.size().height);
    body.position(position);
    body.maxVelocity(2);
    // body.velocity(velocity); // initial velocity
    Model.Physics.Universe.instance().add(body);
    var enemy = new M(body, sprite, initialDirection);
    body.attachTo(enemy);
    return enemy;
  };

  return M;
}());
