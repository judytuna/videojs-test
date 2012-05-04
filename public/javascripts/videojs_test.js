$(document).ready(function() {
  _V_("my_video_1").ready(function(){

    var myPlayer = this;

    $('#singing').click(function() {
      myPlayer.src({ type: "video/mp4", src: "movies/video_for_judy.mp4" });
      myPlayer.play();
    });

    $('#silly').click(function() {
      myPlayer.src({ type: "video/mp4", src: "movies/silly_for_judy.mp4" });
      myPlayer.play();
    });
  });
});
