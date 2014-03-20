(function(exports) {

  // Hidden manifest roles that we do not show
  const HIDDEN_ROLES = ['system', 'keyboard', 'homescreen', 'search'];

  function App() {
    this.zoom = new Zoom();
    window.addEventListener('click', this.launchApp.bind(this));
  }

  App.prototype = {

    /**
     * List of all application icons
     */
    icons: {},

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
     * Renders all icons
     */
    render: function() {

      // Grid render coordinates
      var x = 0;
      var y = 0;

      document.getElementById('icons').innerHTML = '';
      for (var i in this.icons) {
        this.icons[i].render({
          x: x,
          y: y
        });

        x++;
        dump('Comparing:' + x + '-' + this.zoom.rowCount + '\n')
        if (x >= this.zoom.rowCount) {
          x = 0;
          y++;
        }
      }
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
