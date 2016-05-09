document.addEventListener('DOMContentLoaded', function(){
  var options = {
    center: [-23.625806, -46.6277007],
    zoom: 13,
    zoomControl: false
  };

  var map = L.map('map', options);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  map.addControl(new L.Control.CenterZoom());
}, false);
