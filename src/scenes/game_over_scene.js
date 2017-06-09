Scenes.GameOverScene = cc.Scene.extend({
  onEnter: function() {
    this._super();

    //LAYER DO BACKGROUND
    var backgroundLayer = new gameOverBackground();
    backgroundLayer.init();
    this.addChild(backgroundLayer);

    //LAYER DOS PEIXES AO FUNDO
    var backgroundFishes = new fishes();
    backgroundFishes.init();
    this.addChild(backgroundFishes);

    //LAYER DO PERSONAGEM
    var characterLayer = new character();
    characterLayer.init();
    this.addChild(characterLayer);

    //LAYER DO TEXTO E BOTÃO
    var infoLayer = new info();
    infoLayer.init();
    this.addChild(infoLayer);
  }
});

var fishes = cc.Layer.extend({
  spriteSheet:null,
  swimmingAction:null,
  sprite:null,
  ctor: function() {
    this._super();
  },
  init: function() {
    this._super();

    cc.spriteFrameCache.addSpriteFrames(res.horsefish_plist);
    this.spriteSheet = new cc.SpriteBatchNode(res.horsefish_png);
    this.addChild(this.spriteSheet);

    var frames = [];
    for (var i = 1; i < 6; i++) {
      var string = 'horsefish0' + i + ".png";
      var frame = cc.spriteFrameCache.getSpriteFrame(string);
      frames.push(frame);
    }
    for (var i = 4; i > 1; i--) {
      var string = 'horsefish0' + i + ".png";
      var frame = cc.spriteFrameCache.getSpriteFrame(string);
      frames.push(frame);
    }

    var swimmingAnimation = new cc.Animation(frames, 0.1);

    var winsize = cc.director.getWinSize();

    this.swimmingAction = new cc.RepeatForever(new cc.Animate(swimmingAnimation));

    this.sprite = new cc.Sprite("#horsefish01.png");
    this.sprite.setPosition(-2 * winsize.width, 0);
    this.sprite.runAction(this.swimmingAction)
    this.setScale(0.25, 0.25);;
    this.spriteSheet.addChild(this.sprite);

    var actionMove = cc.MoveTo.create(1, cc.p(2 * winsize.width + this.sprite.width + 10, 0));

    this.sprite.runAction(actionMove);
  }

});

var gameOverBackground = cc.Layer.extend({

  ctor : function(){
        this._super();
    },
  init : function() {
    this._super();
    var winsize = cc.director.getWinSize();
    var bgPosition = cc.p(winsize.width / 2, winsize.height / 2);

    var bgSprite = new Sprites.CroppedFullBackground(res.game_over_screen_background_png, winsize);
    bgSprite.setPosition(bgPosition);
    this.addChild(bgSprite);
  }

});

var character = cc.Layer.extend({

  ctor : function(){
    this._super();
    },
  init:function(){
    this._super();
    var winsize = cc.director.getWinSize();
    var charPosition = cc.p(winsize.width / 2, winsize.height / 2);

    var charSprite = new Sprites.Racer();
    charSprite.setPosition(charPosition);

    this.addChild(charSprite);

  }

});

var info = cc.Layer.extend({

  ctor : function(){
        this._super();
    },
  init:function(){
    this._super();
    var winsize = cc.director.getWinSize();
    var textPosition = cc.p(winsize.width / 2, winsize.height - 50);
    var buttonPosition = cc.p(winsize.width / 2, 40);

    var buttonSprite = new Sprites.Button(res.start_screen_button_on_png, res.start_screen_button_off_png);
    buttonSprite.setPosition(buttonPosition);
    buttonSprite.setScale(0.15, 0.15);
    this.addChild(buttonSprite);

    var text = new cc.LabelTTF("GAME OVER", "Berlin Sans FB Regular", 50);
    text.setPosition(textPosition);
    this.addChild(text);
  }

});