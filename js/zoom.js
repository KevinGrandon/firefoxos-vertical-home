(function(exports) {

  const maxIconsPerRow = 4;

  const minIconsPerRow = 3;

  const windowHeight = window.innerHeight;

  const windowWidth = window.innerWidth;

  function Zoom() {
    this.touches = 0;
    this.zoomStartTouches = [];

    window.addEventListener('touchstart', this);
    window.addEventListener('touchmove', this);
  }

  Zoom.prototype = {

    perRow: minIconsPerRow,

    minIconsPerRow: minIconsPerRow,

    maxIconsPerRow: maxIconsPerRow,

    _percent: minIconsPerRow / minIconsPerRow,

    get percent() {
      return this._percent;
    },

    set percent(value) {
      this._percent = value;
      this.perRow = maxIconsPerRow + minIconsPerRow - maxIconsPerRow * value;
    },

    /**
     * The height of each tile.
     * This number changes based on current zoom level.
     */
    get tileHeight() {
      return windowHeight / maxIconsPerRow * this.percent;
    },

    /**
     * The width of each tile.
     * This number changes based on current zoom level.
     */
    get tileWidth() {
      return windowWidth / this.perRow;
    },

    /**
     * General Event Handler
     */
    handleEvent: function(e) {

      if (e.type === 'touchend') {
        console.log('touchend: ', e.touches.length);
      }

      if (!e.touches || e.touches.length !== 2) {
        return;
      }

      // Sort touches by ascending pageX position.
      var touches = [e.touches[0], e.touches[1]].sort(function(a, b) {
        return a.pageX - b.pageX
      });

      switch(e.type) {
        case 'touchstart':
          this.zoomStartTouches = touches;
          break;
        case 'touchmove':
          if (this.perRow < maxIconsPerRow && touches[1].pageX < this.zoomStartTouches[1].pageX) {
              this.percent = 0.75;
              app.render();
          } else if (this.perRow > minIconsPerRow && touches[1].pageX > this.zoomStartTouches[1].pageX) {
            this.percent = 1;
            app.render();
          }

          break;
      }
    }

  };

  exports.Zoom = Zoom;

}(window));
