var SCALE = 0.25;
var Scenes = {};
Scenes.Game = cc.Scene.extend({
  gameLayer: null,
  onEnter: function() {
    this._super();
    this.gameLayer = new Layers.Game();
    var bgLayer = new Layers.Background();
    this.gameLayer.init();
    bgLayer.init();
    this.addChild(bgLayer, 0);
    this.addChild(this.gameLayer, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.gameLayer.player.update(dt);
    var x = cc.winSize.width/2-this.gameLayer.player.getPositionX();
    var y = cc.winSize.height/2-this.gameLayer.player.getPositionY();
    this.setPosition(x, y);
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
})();

var configChangeDirectionOnTouch = function(player) {
  var ROTATION_SPEED_DEGREES_PER_SECOND = 180;
  var ROTATION_UPDATE_RATE_SECONDS = 0.1;

  var STATES = {clockwise: 1, neutral: 2, anticlockwise: 3};
  var touchPosition = null;
  var updateDirection = function() {
    if(touchPosition === null) return;
    var middle = {x: cc.winSize.width/2, y: cc.winSize.height/2};
    var touchVector = {x: touchPosition.x - middle.x, y: touchPosition.y - middle.y};
    var angleDistance = player.direction - Geometry.angle(touchVector);
    if(angleDistance > 180) angleDistance -= 360;
    else if(angleDistance < -180) angleDistance += 360;
    var maxRotation = ROTATION_SPEED_DEGREES_PER_SECOND*ROTATION_UPDATE_RATE_SECONDS;
    var rotationAbs = Math.min(Math.abs(angleDistance), maxRotation)
    if(rotationAbs >= maxRotation) {
      var rotation = angleDistance === 0 ? 0 : (angleDistance/Math.abs(angleDistance)) * rotationAbs;
      player.direction = (player.direction - rotation + 360) % 360;
    } else {
      player.direction = Geometry.angle(touchVector);
    }
  };
  cc.director.getScheduler().scheduleCallbackForTarget(this, updateDirection, ROTATION_UPDATE_RATE_SECONDS);
  var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {
      touchPosition = {x: touch.getLocationX(), y: touch.getLocationY()};
      return true;
    },
    onTouchMoved: function(touch, event) {
      touchPosition = {x: touch.getLocationX(), y: touch.getLocationY()};
      return true;
    },
    onTouchEnded: function(touch, event) {
      touchPosition = null;
    }
  });
  cc.eventManager.addListener(listener, player);
}

var Sprites = {};

Sprites.Player = cc.Sprite.extend({
  direction: 0,
  v: 5,
  ctor: function() {
    var self = this;
    this._super();
    this.initWithFile(res.horsefish_png);
    this.setScale(SCALE, SCALE);
    configChangeDirectionOnTouch(this);
  },
  vX: function(){return this.v*Math.cos(this.direction/180.0*Math.PI);},
  vY: function(){return this.v*Math.sin(this.direction/180.0*Math.PI);},
  update: function(dt) {
    this.setPosition(this.getPositionX() + this.vX(), this.getPositionY() + this.vY());
    if(this.direction > 90 && this.direction < 270) {
      this.setFlippedY(true);
    } else {
      this.setFlippedY(false);
    }
    this.setRotation(-this.direction);
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
  init: function() {
    this._super();
    this.player = new Sprites.Player();
    this.player.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    this.addChild(this.player, 0);
  }
});
// var BackgroundLayer = cc.Layer.extend({
//   sprite: null,
//   ctor:function (dolphin) {
//     this.dolphin = dolphin;
//     //////////////////////////////
//     // 1. super init first
//     this._super();
// 
//     /////////////////////////////
//     // 2. add a menu item with "X" image, which is clicked to quit the program
//     //    you may modify it.
//     // ask the window size
//     var size = cc.winSize;
//     var sprite = cc.Sprite.create(res.background_png);
//     sprite.setAnchorPoint( cc.p (0, 0));
//     sprite.setPosition(cc.p(0, 0)); 
// 
//     /////////////////////////////
//     // 3. add your codes below...
//     // add a label shows "Hello World"
//     // create and initialize a label
//     this.addChild(sprite);
// 
//     return true;
//   },
//   update: function() {
//   }
// });
// var HelloWorldLayer = cc.Layer.extend({
//   sprite: null,
//   ctor:function (space) {
//     //////////////////////////////
//     // 1. super init first
//     this._super();
//     this.space = space;
//     // this.init();
// 
//     /////////////////////////////
//     // 2. add a menu item with "X" image, which is clicked to quit the program
//     //    you may modify it.
//     // ask the window size
//     var size = cc.winSize;
// 
//     /////////////////////////////
//     // 3. add your codes below...
//     // add a label shows "Hello World"
//     // create and initialize a label
//     var spriteSize = {width: 24, height: 34};
//     var sprite = new cc.PhysicsSprite(res.horsefish_png, cc.rect(0, 0, spriteSize.width, spriteSize.height));
//     var body = new cp.Body(1, cp.momentForBox(1, spriteSize.width, spriteSize.height));
//     body.p = cc.p(spriteSize.width/2, size.height/2-100);
//     this.space.addBody(body);
//     var shape = new cp.BoxShape(body, spriteSize.width, spriteSize.height);
//     this.space.addShape(shape);
//     sprite.setBody(body);
//     //var follow = cc.Follow.create(sprite,cc.rect(0,0,size.width,size.height))
//     //this.runAction(follow);
//     this.addChild(sprite);
// 
//     this.dolphin = body;
// 
//     return true;
//   }
// });
// 
// var SwimControl = function(object) {
//   this.object = object;
//   this.side = 0;
//   this.direction = 45;
//   this.impulses = [];
// };
// 
// SwimControl.prototype = {
//   pieces: 10,
//   duration: 0.001,
//   force: 300,
//   swimStart: function() {
//     console.log("SWIM START");
//     if(this.side === 0) {
//       this.startSwimTo(0, -90)
//     } else {
//       this.startSwimTo(0, 90)
//     }
//     this.side = (this.side + 1) % 2;
//   },
//   swimEnd: function() {
//     console.log("SWIM END");
//     cc.director.getScheduler().unscheduleCallbackForTarget(this, this.consumeImpulse);
//     this.impulses = [];
//   },
//   startSwimTo(startAngle, endAngle) {
//     this.impulses = [];
//     var anglePiece = (endAngle - startAngle) / this.pieces;
//     this.impulses.push({angle: startAngle});
//     for(var i = 0; i < this.pieces-1; i++) {
//       this.impulses.push({angle: anglePiece});
//     }
//     this.consumeImpulse();
//   },
//   consumeImpulse: function() {
//     if(this.impulses.length === 0) {
//       return;
//     }
// 
//     var impulse = this.impulses.shift();
//     this.direction += impulse.angle;
//     var angle = Math.PI*this.direction/180.0;
//     var x = this.force*Math.cos(angle)*0.8 - this.object.vx*0.8;
//     var y = this.force*Math.sin(angle) - this.object.vy;
//     this.object.applyImpulse(cp.v(x, y), cp.v(0, 0));
//     cc.director.getScheduler().scheduleCallbackForTarget(this, this.consumeImpulse, this.duration / 1000.0 / this.pieces);
//   }
// }
// 
// var HelloWorldScene = cc.Scene.extend({
//   space: null,
//   swimControl: null,
//   bglayer: null,
//   layer: null,
//   onEnter:function () {
//     this._super();
//     this.initPhysics();
//     this.layer = new HelloWorldLayer(this.space);
//     this.bglayer = new BackgroundLayer(this.layer.dolphin);
//     var swimControl = new SwimControl(this.layer.dolphin);
// 
//     cc.eventManager.addListener({
//       event: cc.EventListener.MOUSE,
//       swallowTouches: true,
//       onMouseDown: function(touch, event) {
//         swimControl.swimStart();
//       },
//       onMouseUp: function(touch, event) {
//         swimControl.swimEnd();
//       }
//     }, this);
//     this.swimControl = swimControl;
//     this.addChild(this.bglayer);
//     this.addChild(this.layer);
//     this.scheduleUpdate();
//   },
//   initPhysics: function() {
//     this.space = new cp.Space();
//     //this.space.gravity = cp.v(0, -200);
//     var wallBottom = new cp.SegmentShape(
//       this.space.staticBody,
//       cp.v(0, g_groundHeight),
//       cp.v(4294967295, g_groundHeight),
//       0
//     );
//     this.space.addStaticShape(wallBottom);
//   },
//   update: function(dt) {
//     var dolphin = this.layer.dolphin;
//     this.space.step(dt);
//     console.log(this.getCamera());
//     var camera = this.getCamera();
//     var eyeZ = cc.director.getZEye();
//     camera.setEye(dolphin.getPositionX(), dolphin.getPositionY(), eyeZ);
//     camera.setCenter(dolphin.getPositionX(), dolphin.getPositionY(), 0);
//     //this.bglayer.update();
//   }
// });
// 
