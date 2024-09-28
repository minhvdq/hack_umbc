import { useState } from 'react'
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AutocompleteComponent from './AutocompleteComponent';

// Define the map container style
// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// // Define the initial center location for the map
// const center = {
//   lat: 39.835, // Example latitude (Gettysburg, PA)
//   lng: -77.229, // Example longitude (Gettysburg, PA)
// };

function App() {
  const [autocomplete, setAutocomplete] = useState(null);
  return (
   <AutocompleteComponent/>
  );
}

export default App
