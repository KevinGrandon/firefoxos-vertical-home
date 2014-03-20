(function(exports) {

  const maxIconsPerRow = 4;

  const maxZoom = 1;

  const minZoom = 0.75;

  const windowHeight = window.innerHeight;

  const windowWidth = window.innerWidth;

  function Zoom() {
    this.level = 1;
  }

  Zoom.prototype = {

    /**
     * Zoom percent of icons. Changes as users gesture to zoom or zoom out.
     */
    zoomPercent: minZoom,

    /**
     * The height of each tile.
     * This number changes based on current zoom level.
     */
    get tileHeight() {
      return windowHeight / 4 * this.zoomPercent;
    },

    /**
     * The width of each tile.
     * This number changes based on current zoom level.
     */
    get tileWidth() {
      return windowWidth / this.rowCount;
    },

    /**
     * The number of icons per row.
     * This number changes based on current zoom level.
     */
    get rowCount() {
      dump('ROW COUNT IS:'  + Math.floor(this.zoomPercent * maxIconsPerRow) + '\n')
      return Math.floor(this.zoomPercent * maxIconsPerRow);
    }

  };

  exports.Zoom = Zoom;

}(window));
