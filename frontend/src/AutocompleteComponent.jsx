import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete,Marker } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '400px',
  };
  
  const center = {
    lat: 39.835, // Default latitude (e.g., Gettysburg, PA)
    lng: -77.229, // Default longitude
  };
  
export default function AutocompleteComponent()
{
    const [autocomplete, setAutocomplete] = useState(null)
    const [location, setLocation] = useState(null);


    const loadAutoc = (autoC)=>{
        setAutocomplete(autoC)
    }

    const onLocationChanged = ()=>{
        if(autocomplete !== null)
        {
            const location = autocomplete.getPlace()
            const lat = location.geometry.location.lat()
            const lng = location.geometry.location.lng()
            
            setLocation({lat,lng})
        }
        else{
            console.log("Can not find a place");
        }
    }

    return (
        <LoadScript googleMapsApiKey="AIzaSyCTy-RYvGUcdShnzlESTHfD19nbobBeBRI" libraries={['places']}>
            <Autocomplete onLoad={loadAutoc} onPlaceChanged={onLocationChanged}>
                <input type="text" placeholder='Enter your address' style={{width:'100%',height:'40px',marginBottom:"13%"}}/>    
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
            {/* Add a marker at the center location */}
            <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

