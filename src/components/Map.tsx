import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h2>Map</h2>
      <p>lat: {lat}</p>
      <p>lng: {lng}</p>
    </div>
  )
}

export default Map