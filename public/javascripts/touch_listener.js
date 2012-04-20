(function($){
  var touch = {}, touchTimeout;

  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode;
  }

  function swipeDirection(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
    if (xDelta >= yDelta) {
      return (x1 - x2 > 0 ? 'Left' : 'Right');
    } else {
      return (y1 - y2 > 0 ? 'Up' : 'Down');
    }
  }

  var longTapDelay = 750;
  function longTap(){
    if (touch.last && (Date.now() - touch.last >= longTapDelay)) {
      var eventOpts = {target: touch.target, pageX: touch.x1, pageY: touch.y1};
      $(touch.target).trigger($.Event('longTap', eventOpts));
      $(touch.target).trigger($.Event('dragStart', eventOpts));
      touch.isDrag = true;
    }
  }

  $(document).ready(function(){
    $(document.body).bind('touchstart', function(e){
      e = e.originalEvent;
      var now = Date.now(), delta = now - (touch.last || now);
      touch.target = parentIfText(e.touches[0].target);
      touchTimeout && clearTimeout(touchTimeout);
      touch.x1 = e.touches[0].pageX;
      touch.y1 = e.touches[0].pageY;
      touch.last = now;
      setTimeout(longTap, longTapDelay);
    }).bind('touchmove', function(e){
      e = e.originalEvent;
      touch.x2 = e.touches[0].pageX;
      touch.y2 = e.touches[0].pageY;

      if (!touch.isSwipe && !touch.isDrag && (touch.x2 > 0 || touch.y2 > 0)) {
        if(Math.abs(touch.x1 - touch.x2) > 20) {
          e.preventDefault();
        }

        if(Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30) {
          $(touch.target).trigger('swipe');
          $(touch.target).trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
          touch.isSwipe = true;
        }
      } else if(touch.isDrag) {
        var newEvent = $.Event('dragMove', {target: e.target, pageX: touch.x2, pageY: touch.y2 });
        $(touch.target).trigger(newEvent);
        e.preventDefault();
      }
    }).bind('touchend', function(e){
      e = e.originalEvent;
      if(touch.isSwipe) {
        touch.isSwipe = false;
      }

      if(touch.isDrag) {
        $(touch.target).trigger('dragEnd');
        touch.isDrag = false;
      }

      if (touch.x2 > 0 || touch.y2 > 0) {
        touch.x1 = touch.x2 = touch.y1 = touch.y2 = touch.last = 0;
      } else if ('last' in touch && !touch.isSwipe) {
        $(touch.target).trigger('tap')
        touch = {};
      }
    }).bind('touchcancel', function(){ touch = {} });
  });

  ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  });
})(jQuery);
