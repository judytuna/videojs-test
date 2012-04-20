var filmstrip = {

  initialize : function() {
    this.images = [];
    this.$ = $('.thumbnail img');

    var self = this;
    this.$.each(function (index){
      var img = $(this);
      self.images.push(new BackgroundImage(img, index));
    });

    this.length = this.$.length;
  },

  image_at : function(index) {
    return this.images[index];
  }
}
