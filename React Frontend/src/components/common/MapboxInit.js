const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const token = "pk.eyJ1Ijoic2hhcmwyMSIsImEiOiJjam9taTl6aXcwa2pnM3F1dTBvempseWZuIn0.Uj2DuyQ7yTzMskBd301bXA"
var map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v11'
});
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);