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

// Adding buoy points to map
var marker = new mapboxgl.Marker()
.setLngLat([-125, 37])
.addTo(map);

map.on('load', function() {
    map.addSource('points', {
    'type': 'geojson',
    'data': {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [120.783, 34.454]
                    },
                    "properties": {
                    "name": "Harvest",
                    "id": "46059"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [129.951 , 38.094]
                    },
                    "properties": {
                    "name": "West California",
                    "id": "46218"
                    }
                }
            ]}
    });

    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
        }
    });
    
});



