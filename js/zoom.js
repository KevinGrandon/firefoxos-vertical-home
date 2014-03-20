(function(exports) {

  const maxIconsPerRow = 4;

  const minIconsPerRow = 3;

  const windowHeight = window.innerHeight;

  const windowWidth = window.innerWidth;

  function Zoom() {
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
    }
  };

  exports.Zoom = Zoom;

}(window));
