$(document).ready(function(){
  $(window).resize(function() {
    alert('resize fired!');
  });
  $(window).bind('orientationchange', function() {
    alert('orientationchange fired!');
  });
});
