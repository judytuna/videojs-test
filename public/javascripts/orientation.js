$(document).ready(function(){
  $(window).bind('resize', function() {
    alert('resize event triggered!');
  });
  $(window).bind('orientationchange', function() {
    alert('orientationchange event triggered!');
  });
});
