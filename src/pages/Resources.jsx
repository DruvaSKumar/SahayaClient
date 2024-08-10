import React, { useState, useEffect } from 'react';

const Resources = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [nearbyShelters, setNearbyShelters] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [nearbyPolice, setNearbyPolice] = useState([]);
  const [activeDisasters, setActiveDisasters] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyAmT_Gq740KBFEZ14mdG0JZvhnQXJo4vs0';

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
        fetchNearbyResources(position.coords.latitude, position.coords.longitude);
        fetchActiveDisasters(position.coords.latitude, position.coords.longitude);
        fetchWeatherAlerts(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setLocation(null);
      }
    );
  };

  const fetchNearbyResources = async (lat, lon) => {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="shelter"](around:5000,${lat},${lon});
        node["amenity"="hospital"](around:5000,${lat},${lon});
        node["amenity"="police"](around:5000,${lat},${lon});
      );
      out body;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      const data = await response.json();

      const shelters = [];
      const hospitals = [];
      const policeStations = [];

      data.elements.forEach(element => {
        const resource = {
          name: element.tags.name || 'Unnamed',
          distance: calculateDistance(lat, lon, element.lat, element.lon).toFixed(2) + ' km'
        };

        switch (element.tags.amenity) {
          case 'shelter':
            shelters.push(resource);
            break;
          case 'hospital':
            hospitals.push(resource);
            break;
          case 'police':
            policeStations.push(resource);
            break;
          default:
            break;
        }
      });

      setNearbyShelters(shelters);
      setNearbyHospitals(hospitals);
      setNearbyPolice(policeStations);

    } catch (error) {
      console.error('Error fetching nearby resources:', error);
    }
  };

  const fetchActiveDisasters = async (lat, lon) => {
    try {
      const response = await fetch(`https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=state eq '${await getStateFromCoords(lat, lon)}'&$orderby=declarationDate desc&$top=5`);
      const data = await response.json();
      const disasters = data.DisasterDeclarationsSummaries.map(disaster => ({
        type: disaster.disasterType,
        title: disaster.title,
        date: new Date(disaster.declarationDate).toLocaleDateString()
      }));
      setActiveDisasters(disasters);
    } catch (error) {
      console.error('Error fetching active disasters:', error);
    }
  };

  const fetchWeatherAlerts = async (lat, lon) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${AIzaSyAmT_Gq740KBFEZ14mdG0JZvhnQXJo4vs0}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const state = data.results[0].address_components.find(component =>
          component.types.includes('administrative_area_level_1')
        ).short_name;

        // Now you can use this state for something, such as finding relevant weather alerts.
        // Example: setWeatherAlerts([...]); 

        console.log(`State found: ${state}`); // This is just an example log

        // Implement logic here to set weather alerts using the state, or integrate another API that uses state information.
      } else {
        setError('Unable to fetch location data');
      }

    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    }
  };

  const getStateFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${AIzaSyAmT_Gq740KBFEZ14mdG0JZvhnQXJo4vs0}`);
      const data = await response.json();
      const state = data.results[0].address_components.find(component =>
        component.types.includes('administrative_area_level_1')
      ).short_name;
      return state;
    } catch (error) {
      console.error('Error getting state from coordinates:', error);
      return '';
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="mx-2 flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen py-8">
      <h1 className="text-4xl font-extrabold my-8 text-blue-800 shadow-md">Disaster Management Resources</h1>
      
      {/* Location Information */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6 transition-all duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
          📍 Your Current Location
        </h2>
        {error ? (
          <div className="text-red-500 flex items-center text-lg">
            ⚠️ {error}
          </div>
        ) : location ? (
          <div className="text-gray-700">
            <p className="mb-2 text-lg">Latitude: {location.latitude.toFixed(6)}</p>
            <p className="mb-4 text-lg">Longitude: {location.longitude.toFixed(6)}</p>
            <a
                href={`https://www.google.com/maps/@${location.latitude},${location.longitude},15z`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
            View on Google Maps
            </a>

          </div>
        ) : (
          <p className="text-lg text-gray-600">Loading location...</p>
        )}
        <button
          onClick={getLocation}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Refresh Location
        </button>
      </div>

      {/* Active Disasters */}
      {activeDisasters.length > 0 && (
        <div className="w-full max-w-md bg-red-100 border-l-4 border-red-500 text-red-800 p-6 mb-6 shadow-md transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-2xl font-bold flex items-center">
            🚨 Recent Disasters in Your Area
          </h2>
          <ul className="mt-2 text-lg">
            {activeDisasters.map((disaster, index) => (
              <li key={index} className="mb-2">
                {disaster.type}: <span className="font-semibold">{disaster.title}</span> (Declared: {disaster.date})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <div className="w-full max-w-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 mb-6 shadow-md transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-2xl font-bold flex items-center">
            ⚠️ Weather Alerts
          </h2>
          <ul className="mt-2 text-lg">
            {weatherAlerts.map((alert, index) => (
              <li key={index} className="mb-2">
                {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nearby Resources */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🏠 Nearby Shelters</h2>
          {nearbyShelters.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700">
              {nearbyShelters.map((shelter, index) => (
                <li key={index}>{shelter.name} - {shelter.distance}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No nearby shelters found.</p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🏥 Nearby Hospitals</h2>
          {nearbyHospitals.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700">
              {nearbyHospitals.map((hospital, index) => (
                <li key={index}>{hospital.name} - {hospital.distance}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No nearby hospitals found.</p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🚓 Nearby Police Stations</h2>
          {nearbyPolice.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700">
              {nearbyPolice.map((police, index) => (
                <li key={index}>{police.name} - {police.distance}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No nearby police stations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;