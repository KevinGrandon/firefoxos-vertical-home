(function(exports) {

  const maxIconsPerRow = 4;

  const minIconsPerRow = 3;

  const windowHeight = window.innerHeight;

  const windowWidth = window.innerWidth;

  function Zoom() {
    this.perRow = 3;
  }

  Zoom.prototype = {

    minIconsPerRow: minIconsPerRow,

    maxIconsPerRow: maxIconsPerRow,

    /**
     * The height of each tile.
     * This number changes based on current zoom level.
     */
    get tileHeight() {
      return windowHeight / maxIconsPerRow * (minIconsPerRow / this.perRow);
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
