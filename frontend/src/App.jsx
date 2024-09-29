import { useState } from 'react'
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AutocompleteComponent from './AutocompleteComponent';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './MainPage';
import FormSupplier from './FormSupplier';
import MainPageSupplier from './MainPageSupplier';
import LoginForm from './LoginForm';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}>
        <Route path ="/Autocomplete" element={<AutocompleteComponent />}/>
        <Route path = "/LoginForm" element={<LoginForm />}/>
        <Route path = "/MainPageSupplier" element={<MainPageSupplier />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
