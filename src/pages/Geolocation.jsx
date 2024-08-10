import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Fill, Stroke, Text, Circle as CircleStyle } from 'ol/style';
import Overlay from 'ol/Overlay';
import styled from 'styled-components';

// Styled components for OpenLayers CSS
const MapContainer = styled.div`
  .ol-control {
    background-color: rgba(255,255,255,0.4);
    border-radius: 4px;
    padding: 2px;
  }
  .ol-full-screen {
    top: .5em;
    right: .5em;
  }
  .ol-zoom {
    top: .5em;
    left: .5em;
  }
  .ol-rotate {
    top: .5em;
    right: .5em;
  }
  .ol-attribution {
    bottom: 0;
    right: 0;
  }
`;

const Popup = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 180px;

  &:after, &:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
`;

const Geolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [eonetEvents, setEonetEvents] = useState([]);

  useEffect(() => {
    getLocation();
    fetchEonetEvents();
  }, []);

  useEffect(() => {
    if (location) {
      initMap();
    }
  }, [location]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setLocation(null);
      }
    );
  };

  const initMap = () => {
    const mapObject = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([location.longitude, location.latitude]),
        zoom: 4
      })
    });

    setMap(mapObject);

    // Create a popup overlay
    const popup = new Overlay({
      element: document.getElementById('popup'),
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });
    mapObject.addOverlay(popup);

    // Display popup on click
    mapObject.on('click', function(evt) {
      const feature = mapObject.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
      });
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        document.getElementById('popup-content').innerHTML = feature.get('popupContent');
        document.getElementById('popup').style.display = 'block';
      } else {
        document.getElementById('popup').style.display = 'none';
      }
    });
  };

  const fetchEonetEvents = async () => {
    try {
      const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events');
      const data = await response.json();
      setEonetEvents(data.events);
      addEventsToMap(data.events);
    } catch (error) {
      console.error('Error fetching EONET events:', error);
    }
  };

  const addEventsToMap = (events) => {
    if (!map) return;

    const vectorSource = new VectorSource();

    events.forEach(event => {
      event.geometries.forEach(geometry => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([geometry.coordinates[0], geometry.coordinates[1]])),
          name: event.title,
          category: event.categories[0].title,
          popupContent: `<strong>${event.title}</strong><br/>
                         Category: ${event.categories[0].title}<br/>
                         Date: ${new Date(geometry.date).toLocaleDateString()}`
        });

        feature.setStyle(new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
            stroke: new Stroke({ color: 'blue', width: 1 })
          }),
          text: new Text({
            text: event.categories[0].title,
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
            offsetY: -15
          })
        }));

        vectorSource.addFeature(feature);
      });
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    map.addLayer(vectorLayer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Natural Events Map</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Map Container */}
        <MapContainer className="mb-8 relative">
          <div id="map" className="w-full h-[500px] rounded-lg shadow-xl border-4 border-white"></div>
          <Popup id="popup">
            <div id="popup-content"></div>
          </Popup>
        </MapContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Your Current Location
            </h2>
            {error ? (
              <div className="text-red-500 flex items-center text-lg">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            ) : location ? (
              <div className="text-gray-700">
                <p className="mb-2 text-lg">Latitude: {location.latitude.toFixed(6)}</p>
                <p className="mb-2 text-lg">Longitude: {location.longitude.toFixed(6)}</p>
                <button
                  onClick={getLocation}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Refresh Location
                </button>
              </div>
            ) : (
              <p className="text-lg text-gray-600">Loading location...</p>
            )}
          </div>

          {/* EONET Events */}
          <div className="bg-white rounded-lg shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center">
              <i className="fas fa-bolt mr-2"></i>
              Recent Natural Events
            </h2>
            {eonetEvents.length > 0 ? (
              <ul className="space-y-2">
                {eonetEvents.slice(0, 6).map((event, index) => (
                  <li key={index} className="bg-blue-50 p-3 rounded-md">
                    <span className="font-semibold text-blue-800">{event.title}:</span> {event.categories[0].title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">No recent events to display.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4 mt-8">
        <p className="text-center">© 2024 Natural Events Map</p>
      </footer>
    </div>
  );
};

export default Geolocation;