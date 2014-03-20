(function(exports) {

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  function Zoom() {
    this.level = 1;
  }

  Zoom.prototype = {

    tileHeight: windowHeight / 4,

    tileWidth: windowWidth / 3

  };

  exports.Zoom = Zoom;

}(window));
