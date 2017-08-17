var res = {
    weapon_turbo_png : "res/weapon_turbo.png",
    horsefish_life_png : "res/horsefish-life.png",
    horsefish_png : "res/horsefish.png",
    horsefish_plist : "res/horsefish.plist",
    urchin_png : "res/urchin.png",
    urchin_plist : "res/urchin.plist",
    //background_png : "res/background.png",
    //background_track_png : "res/background_track.png",
    //background_layer5_png : "res/background_sea.png",
    //background_layer4_png : "res/background_sea2.png",
    //background_layer3_png : "res/background_sea3.png",
    start_screen_background_png : "res/start_screen.png",
    start_screen_button_on_png : "res/start_screen_button_on.png",
    start_screen_button_off_png : "res/start_screen_button_off.png",
    game_over_screen_background_png : "res/game_over_screen.png"
};

(function() {
  var track_pieces = [];
  for(var i = 0; i < 88; i++) {
    var piece_path = "res/track/piece-" + i + ".png";
    track_pieces.push(piece_path);
    res["background_track_piece_" + i + "_png"] = piece_path;
  }

  g_resources = [];
  for (var i in res) {
      g_resources.push(res[i]);
  }
  res.track_pieces = track_pieces;
}())
