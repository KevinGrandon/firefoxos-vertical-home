(function(exports) {

  // Hidden manifest roles that we do not show
  const HIDDEN_ROLES = ['system', 'keyboard', 'homescreen', 'search'];

  function App() {
    this.zoom = new Zoom();
    window.addEventListener('click', this.launchApp.bind(this));
  }

  App.prototype = {

    /**
     * List of all application icons.
     * Maps an icon identifier to an icon object.
     */
    icons: {},

    /**
     * Lists of all displayed objects in the homescreen.
     * Includes app icons, dividers, and bookmarks.
     */
    items: [],

    /**
     * Fetch all icons and render them.
     */
    init: function() {
      navigator.mozApps.mgmt.getAll().onsuccess = function(event) {
        event.target.result.forEach(this.makeIcons.bind(this));
        this.render();
      }.bind(this);
    },

    /**
     * Creates icons for an app based on hidden roles and entry points.
     */
    makeIcons: function(app) {
      if (HIDDEN_ROLES.indexOf(app.manifest.role) !== -1) {
        return;
      }

      function eachIcon(icon) {

        // If there is no icon entry, do not push it onto items.
        if (!icon.icon) {
          return;
        }

        this.items.push(icon);
        this.icons[icon.identifier] = icon;
      }

      if (app.manifest.entry_points) {
        for (var i in app.manifest.entry_points) {
          eachIcon.call(this, new Icon(app, i));
        }
      } else {
        eachIcon.call(this, new Icon(app));
      }
    },

    /**
     * Renders all icons.
     * Positions app icons and dividers accoriding to available space
     * on the grid.
     */
    render: function() {

      // Grid render coordinates
      var x = 0;
      var y = 0;

      this.items.forEach(function(item, idx) {

        // If the item would go over the boundry before rendering,
        // step the y-axis.
        if (item.gridWidth > 1 && x + item.gridWidth >= this.zoom.perRow) {

          // Step the y-axis by the size of the last row.
          // For now we just check the height of the last item.
          var lastItem = this.items[idx - 1];
          app.zoom.stepYAxis(lastItem.height);

          x = 0;
          y++;
        }

        item.render({
          x: x,
          y: y
        });

        // Increment the x-step by the sizing of the item.
        // If we go over the current boundry, reset it, and step the y-axis.
        x += item.gridWidth;
        if (x >= this.zoom.perRow) {
          dump('STEPPING AFTER RENDER\n')
          app.zoom.stepYAxis(item.height);

          x = 0;
          y++;
        }
      }, this);
    },

    /**
     * Launches an app.
     */
    launchApp: function(e) {
      var container = e.target
      var identifier = container.dataset.identifier;
      var icon = this.icons[identifier];

      if (!icon) {
        return;
      }

      icon.launch();
    }
  };

  exports.app = new App();
  exports.app.init();

}(window));
