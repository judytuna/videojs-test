var background = {
  initialize : function(){
    this.$ = $('.background');
    this.wrapper = $('.background_wrapper');

    var self = this;
    this.wrapper.bind("swipeRight", function() {
      self.swipe_right();
    });
    this.wrapper.bind("swipeLeft", function() {
      self.swipe_left();
    });
    this.current_index = 0;

    // pass the first filmstrip image to set_image
    background.set_image();
  },


  resize : function() {
    this.window_width = $(window).width(); // This is used later
    this.window_height = $(window).height();
    this.wrapper.css('height', this.window_height + 'px');
  },

  set_image : function(index) {

    // If an image was clicked, an index parameter gets passed in.
    // Set the current index to the image that was just clicked.
    if (index >= 0) {
      this.current_index = index;
    }
    var current_image = filmstrip.image_at(this.current_index);

    // wait until the image loads
    var self = this;
    current_image.on_img_ready(function() {
      // get the dom from the image object and insert it
      var new_img_dom = current_image.make_dom();
      self.wrapper.append(new_img_dom);

      // if there was an old image, remove it
      if (self.current_img_dom) {
        self.current_img_dom.remove();
      }

      // set the current image as the old_img
      self.current_img_dom = new_img_dom;
    });
  },

  /*
   * Move the images in a sequence such that the user experiences
   * the next image when they swipe to the left
   *
   * pre-condition : this.index is valid
   * post-condition : this.index is valid
   */
  swipe_left : function() {
    this.current_index++;
    if (this.current_index >= filmstrip.length) {
      this.current_index = 0;
    }
    this.animate_swipe(1);
  },

  /*
   * Move the images in a sequence such that the user experiences
   * the previous image when they swipe to the right
   *
   * pre-condition : this.index is valid
   * post-condition : this.index is valid
   */
  swipe_right : function() {
    this.current_index--;
    if (this.current_index < 0) {
      this.current_index = filmstrip.length - 1;
    }
    this.animate_swipe(-1);
  },

  animate_swipe : function (direction) {
    var new_img = filmstrip.image_at(this.current_index);

    var self = this;

    //wait for the new image to load before animating
    new_img.on_img_ready( function() {
      var new_img_dom = new_img.make_dom();

      new_img_dom.css('left', self.window_width * direction);

      self.wrapper.append(new_img_dom);

      setTimeout(function() {
        self.current_img_dom.css('left', -self.window_width * direction);
        new_img_dom.css('left', 0);
        // set the current image as the old_img
        setTimeout(function() {
          self.current_img_dom.remove();
          self.current_img_dom = new_img_dom;
        }, 550);
      }, 0);
    });
  }
};
