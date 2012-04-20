var BackgroundImage = function(dom, index) {
  this.$ = dom;
  this.small_src = dom.attr('src');
  this.large_src = dom.attr('largesrc');
  this.index = index;
  var self = this;
  this.$.click(function() {
    background.set_image(self.index);
  });
};

BackgroundImage.prototype.on_img_ready = function(callback) {
  this.inspector = $('<img src="' + this.large_src + '" />');
  var self = this;
  this.inspector.load(function() {
    self.width = self.inspector.width;
    self.height = self.inspector.height;
    self.is_portrait = self.height >= self.width;
    callback();
  });
};

BackgroundImage.prototype.make_dom = function () {
  var dom = $('<div/>').addClass('background');
  dom.css('background-image', 'url(' + this.large_src + ')');
  if (this.is_portrait && !(window.navigator.userAgent.match(/iPhone/i))) {
    dom.addClass('portrait');
  }

  return dom;
};
