import React, { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import "./Map.css";
import icon from "../../assets/marker-icon.png";
import Places from "../Place/Places";

function Map() {
  const [userLocation, setUserLocation] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 49.240906, lng: -123.1695677 }), []);
  const options = useMemo(
    () => ({
      mapId: "d38ddb8950d85ff7",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const userLocations = useMemo(() => generateLocations(center), [center]);

  return (
    <div className="container">
      <div className="controls">
        <h1>Enter the location</h1>
        <Places
          setUserLocation={(position) => {
            setUserLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>

      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {userLocation && (
            <>
              <Marker position={userLocation} icon={icon} />

              {userLocations.map((userLocation) => (
                <Marker key={userLocation.lat} position={userLocation} />
              ))}
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

const generateLocations = (position) => {
  const userLocations = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -10 : 10;
    userLocations.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return userLocations;
};

export default Map;
