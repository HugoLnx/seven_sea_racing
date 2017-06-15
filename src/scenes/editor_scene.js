Scenes.EditorScene = cc.Scene.extend({
  RED: cc.color(255,0,0,128),
  GREEN: cc.color(0,255,0,128),
  BLUE: cc.color(0,0,255,128),
  race: null,
  stage: null,
  scaleRatio: 0.12,
  positions: [],
  squares: [],
  preview: null,
  ctor: function(stage) {
    this._super();
    this.stage = stage;
  },
  onEnter: function() {
    var self = this;
    this._super();
    this.race = new Model.Domain.Race(this.stage);

    this.gameLayer = new Layers.RaceLayer();
    this.gameLayer.scale = function() { return self.scaleRatio; };
    this.gameLayer.init(stage);
    this.gameLayer.toCenter();
    lay = this.gameLayer;
    Model.Controls.resetInstance();
    Model.Controls.instance(this.gameLayer.trackSprite);
    this.update(0);
    this.preview = this.createRect(0, 0, 500, 500, this.BLUE);
    for(var i = 0; i<this.stage.objects().others.length; i++) {
      var object = this.stage.objects().others[i].body;
      this.gameLayer.addChild(this.createRect(object.x(), object.y(), object.width, object.height, this.RED), 100);
    }  
    this.gameLayer.addChild(this.preview, 200);
    this.addChild(this.gameLayer, 0);
    this.scheduleUpdate();
  },
  createRect: function(x, y, width, height, color) {
    var rect = cc.DrawNode.create();
    rect.col = color;
    rect.bordercol = cc.color(color._getR()*0.5, color._getG()*0.5, color._getB()*0.5);
    this.updateRect(rect, x, y, width, height);
    return rect;
  },
  updateRect: function(rect, x, y, width, height) {
    rect.clear();
    rect.setPosition(x, y);
    rect.drawRect(new cc.Point(-width/2,-height/2), new cc.Point(width/2,height/2),
                           rect.col, 6, rect.bordercol);
  },
  update: function(dt) {
    var controls = Model.Controls.instance();
    var touching = controls.touching();
    var mouse = controls.mouse();
    if(touching) {
      touching = {x: (touching.x - cc.winSize.width/2) / this.scaleRatio, y: (touching.y - cc.winSize.height/2) / this.scaleRatio};
    }
    if(mouse) {
      mouse = {x: (mouse.x - cc.winSize.width/2) / this.scaleRatio, y: (mouse.y - cc.winSize.height/2) / this.scaleRatio};
    }
    if(controls.pressing("esc")) {
      this.positions = [];
    } else if(touching && !controls.pressing("ctrl")) {
      this.positions = [touching];
    } else if(touching) {
      this.positions[1] = touching;
    }

    if(this.positions.length === 2 && controls.pressing("enter")) {
      this.squares.push(this.positions);
      var x = this.positions[0].x;
      var y = this.positions[0].y;
      var width = this.positions[1].x - x;
      var height = this.positions[1].y - y;
      this.gameLayer.addChild(this.createRect(x+width/2, y+height/2, width, height, this.GREEN), 200);
      this.positions = [];
    } else if(this.positions.length === 1) {
      var x = this.positions[0].x;
      var y = this.positions[0].y;
      var width = mouse.x - x;
      var height = mouse.y - y;
      this.updateRect(this.preview, x+width/2, y+height/2, width, height);
    } else if(this.positions.length <= 0) {
      this.preview && this.preview.clear();
    }

    if(controls.pressing("space") && this.squares.length > 0) {
      for(var i = 0; i<this.squares.length; i++) {
        var square = this.squares[i];
        var width = (square[1].x - square[0].x);
        var height = (square[1].y - square[0].y);
        var x = square[0].x + width/2;
        var y = square[0].y + height/2;
        width = width / this.stage.width;
        height = height / this.stage.height;
        x = x / this.stage.width;
        y = y / this.stage.height;

        x = x.toFixed(2);
        y = y.toFixed(2);
        width = width.toFixed(2);
        height = height.toFixed(2);
        console.log("Model.Domain.BadGround.build({x: this.width*" + x + ",  y: this.height*" + y + "}, {width: this.width*" + width + ", height: this.height*" + height + "}),");
      }
      this.squares = [];
    }
  }
});
