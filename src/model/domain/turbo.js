Model.Domain.Turbo = (function() {
  var WEIGHT = 5;
  var M = function(body, sprite) {
    this._weaponType = "turbo";
    this.body = body;
    this.sprite = sprite;
    this._owner = null;
    this._state = "inactive";
    this._ownerUsualParams = null;

    this.behave = function(frame, deltaTime) {
      var doubleTouchPosition = Model.Controls.instance().doubleTouching();
      if(doubleTouchPosition !== null && this._owner && this._state == "grabbed") {
        this._state = "active";
        this._ownerUsualParams = {acceleration: this._owner.acceleration, maxVelocity: this._owner.body.maxVelocity()};
        this._ownerPace(2);
        var self = this;
        cc.director.getScheduler().scheduleCallbackForTarget(this._owner.sprite, function() {
          self._ownerPace(1.5);
        }, 1, 0);
        cc.director.getScheduler().scheduleCallbackForTarget(this._owner.sprite, function() {
          self._state = "used";
          self._ownerPace(1);
          this._ownerUsualParams = null;
        }, 1.5, 0);
      }

      if(this._state === "used") return false;
      else return true;
    };

    this.update = function() {
      if(this._state === "inactive") {
        this.sprite.update(this.body.x(), this.body.y());
      }
    };

    this._ownerPace = function(pace) {
      this._owner.acceleration = this._ownerUsualParams.acceleration * pace;
      this._owner.body.maxVelocity(this._ownerUsualParams.maxVelocity * pace);
    };

    this.owner = function(value) {
      if (value !== undefined) {
        this._owner = value;
        this._state = "grabbed";
        Model.Physics.Universe.instance().remove(this.body);
      }
      return this._owner;
    };

    this.isActive = function() {
      return this._state == "active";
    };

    this.wasUsed = function() {
      return this._state == "used";
    };

    this.weaponType = function() {
      return this._weaponType;
    };
  };


  M.build = function(position) {
    var sprite = new Sprites.Weapon(res.weapon_turbo_png);
    var maxSide = Math.max(sprite.size().width*0.5, sprite.size().height*0.5);
    var body = new Model.Physics.Body(maxSide, maxSide, true, WEIGHT);
    body.position(position);
    Model.Physics.Universe.instance().add(body);
    var weapon = new M(body, sprite);
    body.attachTo(weapon);
    return weapon;
  };

  return M;
}());
