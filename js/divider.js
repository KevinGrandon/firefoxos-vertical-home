(function() {
	// Icon container
	var container = document.getElementById('icons');

	/**
	 * Represents a single divider on the homepage.
	 */
	function Divider() {}

	Divider.prototype = {

		/**
		 * Height in pixels of each divider.
		 */
		pixelHeight: 70,

		/**
		 * Width in grid units for each divider.
		 */
		gridWidth: 4,

		/**
		 * Renders the icon to the container.
		 * @param {Object} coordinates Grid coordinates to render to.
		 */
		render: function(coordinates) {
			var x = '0';
			var y = app.zoom.offsetY;

			// Generate the content if we need to
			if (!this.divider) {
				var divider = document.createElement('div');
				divider.className = 'divider';
				this.divider = divider;

				container.appendChild(divider);
			}

			this.divider.style.transform = 'translate(' + x + 'px,' + y + 'px)';

			this.x = x;
			this.y = y;
		}
	};

	window.Divider = Divider;

}());
