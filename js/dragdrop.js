(function(exports) {

  const activateDelay = 300;

  function DragDrop() {
    window.addEventListener('touchstart', this);
    window.addEventListener('touchmove', this);
    window.addEventListener('touchend', this);
  }

  DragDrop.prototype = {

    /**
     * The current touchmove target.
     * @type {DomElement}
     */
    target: null,

    /**
     * Begins the drag/drop interaction.
     * Enlarges the icon.
     * Sets additional data to make the touchmove handler faster.
     */
    begin: function() {
      this.active = true;
      this.target.classList.add('active');

      this.xAdjust = this.target.clientWidth / 2;
      this.yAdjust = this.target.clientHeight / 2;

      var identifier = this.target.dataset.identifier;
      this.icon = app.icons[identifier];
    },

    /**
     * General event handler.
     */
    handleEvent: function(e) {
      switch(e.type) {
          case 'touchstart':
            this.target = e.touches[0].target;
            this.timeout = setTimeout(this.begin.bind(this), this.activateDelay);
            break;
          case 'touchmove':
            if (!this.active || !this.icon) {
              return;
            }

            e.stopImmediatePropagation();
            e.preventDefault();

            var touch = e.touches[0];
            this.icon.transform(touch.pageX - this.xAdjust, touch.pageY - this.yAdjust);

            break;
          case 'touchend':
            this.active = false;
            if (this.target) {
              this.target.classList.remove('active');
            }
            this.target = null;
            clearTimeout(this.activateDelay);
            app.render();

            break;
        }
    }
  };

  exports.DragDrop = DragDrop;

}(window));
