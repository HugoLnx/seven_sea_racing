Model.Domain.Enemy = (function() {
  var M = function(body, sprite) {
    var WALK_DURATION_SECONDS = 2.5;
    var WALK_DURATION_FRAMES = Math.floor(WALK_DURATION_SECONDS*60);
    this.body = body;
    this.sprite = sprite;
    this.firstFrame = null;
    this.behave = function(frame) {
      if(this.firstFrame === null) {
        this.firstFrame = frame % WALK_DURATION_FRAMES;
      }
      else if(frame % WALK_DURATION_FRAMES === this.firstFrame) {
        body.velocity(Lib.Geometry.turn(body.velocity(), 180));
      }
    };

    this.update = function() {
      this.sprite.update(this.body.x(), this.body.y(), this.body.direction());
    };
  };

  M.build = function(position, velocity) {
    var body = new Model.Physics.Body(100, 100, true, 5);
    body.position(position);
    body.velocity(velocity); // initial velocity
    Model.Physics.Universe.instance().add(body);
    var enemy = new M(body, new Sprites.Enemy());
    body.attachTo(enemy);
    return enemy;
  };

  return M;
}());
