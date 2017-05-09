var SCALE = 0.25;

function Racer(body, sprite) {
  this.body = body;
  this.sprite = sprite;
  Controls.instance(sprite);
  var absoluteVelocity = 5;
  var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};

  this.sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);

  this.behave = function(frame) {
    var ROTATION_SPEED_DEGREES_PER_SECOND = 180;
    var ROTATION_UPDATE_RATE_SECONDS = 0.1;
    var FPS = 60;

    if(frame % (ROTATION_UPDATE_RATE_SECONDS*FPS) === 0) {
      var touchPosition = Controls.instance().touching();
      if(touchPosition === null) return;
      var middle = {x: cc.winSize.width/2, y: cc.winSize.height/2};
      var touchVector = {x: touchPosition.x - middle.x, y: touchPosition.y - middle.y};
      var angleDistance = body.direction() - Geometry.angle(touchVector);
      if(angleDistance > 180) angleDistance -= 360;
      else if(angleDistance < -180) angleDistance += 360;
      var maxRotation = ROTATION_SPEED_DEGREES_PER_SECOND*ROTATION_UPDATE_RATE_SECONDS;
      var rotationAbs = Math.min(Math.abs(angleDistance), maxRotation)
      if(rotationAbs >= maxRotation) {
        var rotation = angleDistance === 0 ? 0 : (angleDistance/Math.abs(angleDistance)) * rotationAbs;
        this.body.velocity(Geometry.toVector((body.direction() - rotation + 360) % 360, absoluteVelocity));
      } else {
        this.body.velocity(Geometry.toVector(Geometry.angle(touchVector), absoluteVelocity));
      }
    }
  };

  this.update = function() {
    this.sprite.update(this.body.x(), this.body.y(), this.body.direction());
  };
}

Physics = {};
Physics.Body = function(width, height, isSolid, weight) {
  this.vel = {x: 0, y: 0};
  this.pos = {x: 0, y: 0};
  this.width = width;
  this.height = height;
  this.isSolid = isSolid;
  this.weight = weight;

  this.x = function(){ return this.position().x; };
  this.y = function(){ return this.position().y; };

  this.attachTo = function(raceObject) {
    this.related = raceObject;
  };

  this.position = function(value) {
    if(value === undefined) return this.pos;
    else this.pos = value;
  }

  this.velocity = function(value) {
    if(value === undefined) return this.vel;
    else this.vel = value;
  };

  this.direction = function() {
    return Geometry.angle(this.vel);
  };

  this.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };
};

Physics.Universe = function() {
  this.bodies = [];

  this.update = function() {
    for(var i = 0; i<this.bodies.length; i++) {
      var body = this.bodies[i];
      body.update();
    }  
  };

  this.add = function(body) {
    this.bodies.push(body);
  };
};

Physics.Universe.instance = function() {
  if(this.currentInstance === undefined)
    this.currentInstance = new Physics.Universe();
  return this.currentInstance;
};

Physics.Universe.dropInstance = function() {
  this.currentInstance = undefined;
}

Racer.build = function() {
  var body = new Physics.Body(100, 100, true, 5);
  body.velocity({x: 5, y: 0}); // initial velocity
  Physics.Universe.instance().add(body);
  var racer = new Racer(body, new Sprites.Player());
  body.attachTo(racer);
  return racer;
};

function Race(racer) {
  this.currentFrame = 0;
  this.objects = [racer];
  this.racer = racer;

  this.add = function(obj) {
    this.objects.push(obj);
  };

  this.update = function() {
    this.currentFrame++;
    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].behave(this.currentFrame);
    }

    Physics.Universe.instance().update();

    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].update();
    }
  };

  this.calculateCameraPosition = function() {
    var x = cc.winSize.width/2-this.racer.body.x();
    var y = cc.winSize.height/2-this.racer.body.y();
    return {x: x, y: y};
  }
}

var Scenes = {};
Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    var racer = Racer.build();
    this.race = new Race(racer);

    this.gameLayer = new Layers.Game();
    var bgLayer = new Layers.Background();
    this.gameLayer.init(racer.sprite);
    bgLayer.init();
    this.addChild(bgLayer, 0);
    this.addChild(this.gameLayer, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update();

    var scenePosition = this.race.calculateCameraPosition();
    this.setPosition(scenePosition.x, scenePosition.y);
  }
});

Geometry = {};
(function() {
  Geometry.angle = function(v) {
    var relAngle = Math.atan(v.y/v.x) / Math.PI * 180;
    if(v.x < 0) {
      relAngle += 180;
    } else if(v.y < 0) {
      relAngle += 360;
    }
    return relAngle;
  }

  Geometry.angleBetween = function(v1, v2) {
    return Geometry.angle(v1) - Geometry.angle(v2);
  };

  Geometry.toVector = function(direction, size) {
    return {
      x: size*Math.cos(direction/180.0*Math.PI),
      y: size*Math.sin(direction/180.0*Math.PI)
    };
  }
})();

function Controls(sprite) {
  var controls = this;
  this.touchPosition = null;
  this.listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {
      controls.onTouch(touch.getLocationX(), touch.getLocationY());
      return true;
    },
    onTouchMoved: function(touch, event) {
      controls.onTouch(touch.getLocationX(), touch.getLocationY());
      return true;
    },
    onTouchEnded: function(touch, event) {
      controls.onTouchLeave();
    }
  });
  cc.eventManager.addListener(this.listener, sprite);

  this.onTouch = function(x, y) {
    this.touchPosition = {x: x, y: y};
  };

  this.onTouchLeave = function() {
    this.touchPosition = null;
  };

  this.touching = function() {
    return this.touchPosition;
  };
};

Controls.instance = function(sprite) {
  if(Controls.currentInstance === undefined)
    Controls.currentInstance = new Controls(sprite);
  return Controls.currentInstance;
};

Controls.resetInstance = function() {
  Controls.currentInstance = null;
};

var Sprites = {};
Sprites.Player = cc.Sprite.extend({
  direction: 0,
  v: 5,
  ctor: function() {
    var self = this;
    this._super();
    this.initWithFile(res.horsefish_png);
    this.setScale(SCALE, SCALE);
  },
  update: function(x, y, direction) {
    this.setPosition(x, y);
    if(direction > 90 && direction < 270) {
      this.setFlippedY(true);
    } else {
      this.setFlippedY(false);
    }
    this.setRotation(-direction);
  }
});

var Layers = {};
Layers.Background = cc.Layer.extend({
  init: function() {
    this._super();
    var sprite = cc.Sprite.create(res.background_png);
    sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    sprite.setScale(1, 1);
    this.addChild(sprite);
  }
});

Layers.Game = cc.Layer.extend({
  player: null,
  init: function(racerSprite) {
    this._super();
    this.addChild(racerSprite, 0);
  }
});
