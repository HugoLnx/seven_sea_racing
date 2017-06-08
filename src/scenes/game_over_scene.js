Scenes.GameOverScene = cc.Scene.extend({
  onEnter: function() {
    this._super();

    //LAYER DO BACKGROUND
    var backgroundLayer = new gameOverBackground();
    backgroundLayer.init();
    this.addChild(backgroundLayer);

    var characterLayer = new character();
    characterLayer.init();
    this.addChild(characterLayer);

    var infoLayer = new info();
    infoLayer.init();
    this.addChild(infoLayer);
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