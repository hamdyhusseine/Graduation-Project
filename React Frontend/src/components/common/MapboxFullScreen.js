import React from 'react';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { mapbox_token } from "../../config.json"
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';


mapboxgl.accessToken = mapbox_token

class MapFullScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            details: {},
        };
    }

    async componentDidMount() {

        let coordinates = window.location.search.replace("?", "")
        let [lat, lng] = coordinates.split(':')

        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 12,
            center: [lng, lat],
        });
        let directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/cycling'
        })
        
        new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
        map.addControl(
            directions,
            'top-left'
        );
        directions.setDestination([lng, lat])
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

        map.addControl(new mapboxgl.FullscreenControl());
    }

    render() {
        return (
            <div style={{ flex: 1, justifyContent: 'center' }}>
                <div id='map' style={{ width: window.screen.availWidth, height: window.screen.availHeight }}></ div>
            </div>
        );
    }
}


export default MapFullScreen;