Model.Domain.Enemy = (function() {
  var MAX_VELOCITY = 125;
  var ACCELERATION = 600;
  var M = function(body, sprite, initialDirection) {
    var WALK_DURATION_SECONDS = 2.5;
    var WALK_DURATION_FRAMES = Math.floor(WALK_DURATION_SECONDS*60);
    this.hurts = true;
    this.body = body;
    this.sprite = sprite;
    this.firstFrame = null;
    this.direction = initialDirection;
    this.behave = function(frame, deltaTime) {
      if(this.firstFrame === null) {
        this.firstFrame = frame % WALK_DURATION_FRAMES;
      }
      else if(frame % WALK_DURATION_FRAMES === this.firstFrame) {
        this.direction = (this.direction + 360 + 180) % 360;
      }
      body.acceleration(Lib.Geometry.toVector(this.direction, ACCELERATION));
      return true;
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.direction);
    };
  };

  M.build = function(position, initialDirection) {
    var sprite = new Sprites.Enemy();
    var maxSide = Math.max(sprite.size().width, sprite.size().height) * 0.65;
    var body = new Model.Physics.Body(maxSide, maxSide, true, 5);
    if(document && document.location && document.location.href && document.location.href.includes("collisionBoxes")) {
      sprite.activateCollisionBox(body.size().width, body.size().height);
    }
    body.position(position);
    body.maxVelocity(MAX_VELOCITY);
    Model.Physics.Universe.instance().add(body);
    var enemy = new M(body, sprite, initialDirection);
    body.attachTo(enemy);
    return enemy;
  };

  return M;
}());
