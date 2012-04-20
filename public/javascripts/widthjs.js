var widthjs = {
  init : function() {
    this.background = $('.background');
    this.resize();
  },

  resize : function() {
    this.window_width = $(window).width();
    this.window_height = $(window).height();
    this.background.css('height', this.window_height + 'px');
    this.background.css('width', this.window_width + 'px');

    console.log('window.outerWidth & Height: ' + window.outerWidth + ' ' + window.outerHeight);
    console.log('window.innerWidth & Height: ' + window.innerWidth + ' ' + window.innerHeight);

  }
}

$(document).ready(function(){
  widthjs.init();

  $(window).resize(function() {
    alert('resize fired!');
    widthjs.resize();
  });
  $(window).bind('orientationchange', function() {
    alert('orientationchange fired!');
    widthjs.resize();
  });
});
