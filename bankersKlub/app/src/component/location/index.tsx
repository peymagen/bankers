"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Styles from "./Location.module.css";
// Dynamically import React Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
import { useMap } from "react-leaflet";

const LocationMap = () => {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const position: [number, number] = [28.6139, 77.209]; // New Delhi, India

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return <p>Loading map...</p>;

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35], // Adjust popup position
  });

  // Component to open popup on load
  const OpenPopupOnLoad = ({ position }: { position: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
      const marker = L.marker(position, { icon: customIcon }).addTo(map);
      marker
        .bindPopup(
          `<div style="text-align:center;">
            <img src="/bankerKlub-logo.svg" alt="BankersKlub" width="180" height="38"/>
            <p>Redefining Financial Advisory</p>
            <p><strong>New Delhi, India</strong></p>
            <a href="https://www.google.com/maps?q=28.6139,77.2090" target="_blank" style="color:green;text-decoration:none;">Open Google Map →</a>
          </div>`
        )
        .openPopup();
    }, [map, position]);

    return null;
  };

  return (
    <MapContainer center={position} zoom={15} className={Styles.map}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <OpenPopupOnLoad position={position} />
    </MapContainer>
  );
};

export default LocationMap;
