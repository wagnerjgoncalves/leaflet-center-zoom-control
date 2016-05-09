L.Control.CenterZoom = L.Control.Zoom.extend({
  _className: 'leaflet-control-zoom',
  options: {
    position: 'topleft',
    zoomInText: '+',
    zoomInTitle: 'Zoom in',
    zoomOutText: '-',
    zoomOutTitle: 'Zoom out',
    centerText: 'Center to initial position',
    centerTitle: 'Center to initial position'
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', this._className + ' leaflet-bar');

    this._map = map;
    this._map.on('zoomend zoomlevelschange', this._onZoomChanged, this);
    this._initialCenter = this._map.getCenter();
    this._initialZoom = this._map.getZoom();

    this._setUpElements();
    this._onZoomChanged();

    return this._container;
  },

  _onZoomChanged: function () {
    var disabledClassName = 'leaflet-disabled';

    L.DomUtil.removeClass(this._zoomInButton, disabledClassName);
    L.DomUtil.removeClass(this._zoomOutButton, disabledClassName);

    if (this._map.getZoom() === this._map.getMinZoom()) {
      L.DomUtil.addClass(this._zoomOutButton, disabledClassName);
    }

    if (this._map.getZoom() === this._map.getMaxZoom()) {
      L.DomUtil.addClass(this._zoomInButton, disabledClassName);
    }
  },

  _setUpElements: function () {
    this._zoomInButton = this._createButton(this.options.zoomInText,
      this.options.zoomInTitle,
      this._className + '-in',
      this._container,
      this._zoomIn,
      this);

    this._zoomOutButton = this._createButton(this.options.zoomOutText,
      this.options.zoomOutTitle,
      this._className + '-out',
      this._container,
      this._zoomOut,
      this);

    this._centerButton = this._createButton(this.options.centerText,
      this.options.centerTitle,
      'leaflet-control-center',
      this._container,
      this._setInitialPosition,
      this);
  },

  _setInitialPosition: function () {
    this._map.setView(this._initialCenter, this._initialZoom);
  }
})
