//
// D3 + Leaflet Buoy Voronoi Map
// 4/30/20
//
////////////////////////////////////////////////////////////

// Map acces key
mapboxgl.accessToken = 'pk.eyJ1IjoiY3NhZGRpc29uIiwiYSI6ImNrOW5jdXRtYzAwemMzZHJ2aWJvenJpdGYifQ.qJC5ffbOR9X2qLO1Xd6wvg';

// Initializing map off coast of California
var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/dark-v10',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-125, 37], 
    zoom: 5
});

// Loading JSON file
var json = (function() {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "/buoys.json",
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
  })();

// Adding buoy points to map
var marker = new mapboxgl.Marker()
.setLngLat([-125, 37])
.addTo(map);

map.on('load', function() {
    map.addSource('points', {
    'type': 'geojson',
    'data': json
    });
    console.log(json)

    // map.addLayer({
    //     'id': 'points',
    //     'type': 'symbol',
    //     'source': 'points',
    //     'layout': {
    //         'icon-image': 'marker.png',
    //         'text-field': ['get', 'name'],
    //         'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    //         'text-offset': [0, 0.6],
    //         'text-anchor': 'top'
    //     }
    // });
    
    // add markers to map
    json.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
    
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

  });
});





