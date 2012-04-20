$(document).ready(function(){
  filmstrip.initialize();
  background.initialize();

  background.resize();
  $(window).resize(function() {
    background.resize();
  });
  $(window).bind('orientationchange', function() {
    background.resize();
  });
});

