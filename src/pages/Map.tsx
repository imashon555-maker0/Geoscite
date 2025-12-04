import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markersData from '../data/artifacts.json';

function MapPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Artifacts Map</h2>
      <div style={{ height: '400px' }}>
        <MapContainer center={new LatLng(20, 0)} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markersData.map((artifact: any) => (
            <Marker key={artifact.id} position={new LatLng(artifact.coordinates[0], artifact.coordinates[1])}>
              <Popup>
                <h3>{artifact.name}</h3>
                <p>{artifact.description}</p>
                <p>Era: {artifact.era}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
