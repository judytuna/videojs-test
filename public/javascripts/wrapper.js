var wrapper = {
  init : function() {
    this.background = $('.background');
    this.wrap = $('.wrapper');
    this.resize();
  },

  resize : function() {
    this.window_width = $(window).width();
    this.window_height = $(window).height();
    // this.background.css('height', this.window_height + 'px');
    // this.background.css('width', this.window_width + 'px');

    this.wrap.css('height', this.window_height + 'px');
    this.wrap.css('width', this.window_width + 'px');

    console.log('window.outerWidth & Height: ' + window.outerWidth + ' ' + window.outerHeight);
    console.log('window.innerWidth & Height: ' + window.innerWidth + ' ' + window.innerHeight);

  }
}

$(document).ready(function(){
  wrapper.init();

  $(window).bind('resize', function() {
    alert('resize fired!');
    wrapper.resize();
  });
  $(window).bind('orientationchange', function() {
    alert('orientationchange fired!');
    wrapper.resize();
  });
});
