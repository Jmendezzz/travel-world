import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCitiesContext } from "../contexts/CitiesContext";
import type { LeafletEventHandlerFnMap, Map } from 'leaflet';


function Map() {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat&& lng ) {
      setMapPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);

  const { cities } = useCitiesContext();
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}:{position:[number,number]}){
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

function DetectClick (){
  const navigate = useNavigate();

  useMapEvents({
    click: (e:LeafletEventHandlerFnMap) => {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}
export default Map;
