// components/LocationSelectorModal.tsx
"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -33.918861, // Cape Town
  lng: 18.4233,
};

const LocationSelectorModal = ({ onClose, onSave }: any) => {
  const [selectedPosition, setSelectedPosition] = useState(center);
  const [radius, setRadius] = useState(50);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  return isLoaded ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Select Location & Radius</h3>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedPosition}
          zoom={12}
          onClick={handleClick}
        >
          <Marker position={selectedPosition} />
        </GoogleMap>

        <div className="mt-4">
          <label className="text-sm font-medium">
            Radius (km):
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="ml-2 border rounded px-2 py-1 w-24"
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => onClose()}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedPosition, radius)}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LocationSelectorModal;
