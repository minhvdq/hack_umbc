import { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define the map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Define the initial center location for the map
const center = {
  lat: 39.835, // Example latitude (Gettysburg, PA)
  lng: -77.229, // Example longitude (Gettysburg, PA)
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <LoadScript googleMapsApiKey="AIzaSyCTy-RYvGUcdShnzlESTHfD19nbobBeBRI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Add a marker at the center location */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default App
