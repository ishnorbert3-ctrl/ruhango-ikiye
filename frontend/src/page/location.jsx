
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./location.css";

const ruhangoCenter = [-2.2167, 29.7833];

function ChangeMapView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

function Locations() {
  const [userPosition, setUserPosition] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support GPS.");
      return;
    }

    setLocationMessage("Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserPosition(coordinates);
        setLocationMessage("Your location was found successfully.");
      },
      () => {
        setLocationMessage(
          "Location permission denied or location unavailable."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  };

  const destination = ruhangoCenter.join(",");

  const directionsUrl = userPosition
    ? `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userPosition[0]}%2C${userPosition[1]}%3B${ruhangoCenter[0]}%2C${ruhangoCenter[1]}`
    : "https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=-2.2167%2C29.7833%3B-2.2167%2C29.7833";

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="locations-hero-content">
          <span className="locations-tag">RUHANGO IKEYE</span>

          <h1>Find Waste Collection Locations</h1>

          <p>
            Explore Ruhango District, find your location and discover
            waste collection information on our interactive map.
          </p>

          <button className="location-button" onClick={getMyLocation}>
            <span>◎</span> Find My Current Location
          </button>

          {locationMessage && (
            <p className="location-message">{locationMessage}</p>
          )}
        </div>
      </section>

      <section className="locations-information">
        <div className="location-info-card">
          <span className="info-icon">⌖</span>
          <div>
            <h3>My Location</h3>
            <p>Find your current position using GPS.</p>
          </div>
        </div>

        <div className="location-info-card">
          <span className="info-icon">♻</span>
          <div>
            <h3>Collection Points</h3>
            <p>See registered waste collection points.</p>
          </div>
        </div>

        <div className="location-info-card">
          <span className="info-icon">➤</span>
          <div>
            <h3>Directions</h3>
            <p>Get directions to your destination.</p>
          </div>
        </div>
      </section>

      <section className="locations-map-section">
        <div className="map-heading">
          <div>
            <span className="locations-tag">EXPLORE THE DISTRICT</span>
            <h2>Ruhango District Map</h2>
            <p>Map powered by OpenStreetMap.</p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="directions-button"
          >
            Get Directions
          </a>
        </div>

        <div className="map-container">
          <MapContainer
            center={ruhangoCenter}
            zoom={12}
            scrollWheelZoom={true}
            className="ruhango-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapView position={userPosition} />

            <CircleMarker
              center={ruhangoCenter}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#16834a",
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>
                <strong>Ruhango District</strong>
                <br />
                Map starting point.
              </Popup>
            </CircleMarker>

            {userPosition && (
              <CircleMarker
                center={userPosition}
                radius={9}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#1677ff",
                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>You are here!</Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>

        <div className="map-legend">
          <span><i className="legend-dot green-dot"></i> Ruhango map centre</span>
          <span><i className="legend-dot blue-dot"></i> Your current location</span>
        </div>

        <p className="map-notice">
          Note: Official waste collection points will appear here after
          they are registered in the system. The map centre is only a
          starting position, not a waste collection point.
        </p>
      </section>
    </div>
  );
}

export default Locations;
