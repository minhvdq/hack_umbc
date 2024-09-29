import React, { useState,useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import eventServices from './services/eventServices';
import distanceServices from './services/distanceServices';
const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 39.835, // Default latitude (e.g., Gettysburg, PA)
    lng: -77.229, // Default longitude
};

const API_KEY = "AIzaSyCTy-RYvGUcdShnzlESTHfD19nbobBeBRI"; // Replace with your actual API key

export default function AutocompleteComponent() {
    const [autocomplete, setAutocomplete] = useState(null);
    const [location, setLocation] = useState(null);
    const [resource, setResources] = useState([]);
    const [availablePlace, setAvailablePlace] = useState([])
    const [availableAddress, setAvailableAddress] = useState([])


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries: ['places'],
    });

    const loadAutoc = (autoC) => {
        setAutocomplete(autoC);
    };
  
    const onLocationChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
                setLocation({ lat, lng });
        } else {
            console.log("Cannot find a place");
        }
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;

        if (event.target.checked) {
            setResources((prevResources) => [...prevResources, value]);
        } else {
            setResources((prevResources) => prevResources.filter((resource) => resource !== value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAvailablePlace([])
        const maxDistance = 100;
        if (location !== null) {
            const events = await eventServices.getAllAvailableEvent(resource,location);
            console.log("Location is ", location)
            for(let obj of events)
            {
                const infoDistance = await distanceServices.getDistance(obj.address, location);
                const extractedDistanceString = infoDistance.replace(/[, km]/g, '').trim();
                const extractedDistance = parseFloat(extractedDistanceString);
                console.log("extracted distance ", extractedDistance);
                if (extractedDistance <= maxDistance && !isNaN(extractedDistance)) {
                    console.log("inside loop")
                    setAvailablePlace(prev => {
                        const checkDuplicate = (existingObj) => existingObj.address === obj.address;
                    
                        const available = prev.some(checkDuplicate);
                        
                        if (!available) {
                            return [...prev, obj]; 
                        }
                        
                        return prev; 
                    });
                }
            }
        }
    };
    
    useEffect(() => {
        console.log("available places ", availablePlace);

    }, [availablePlace]);
    

    return (
        <div>
            {isLoaded ? (
                <div>
                    <Autocomplete onLoad={loadAutoc} onPlaceChanged={onLocationChanged}>
                        <input type="text" placeholder='Enter your address' style={{ width: '100%', height: '40px', marginBottom: "13%" }} />
                    </Autocomplete>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 2, marginRight: "10%" }}>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={location || center}
                                zoom={17}
                            >
                                {location && <Marker position={location} />}
                            </GoogleMap>
                        </div>
                        <div style={{ flex: 1, paddingLeft: '20px' }}>
                            <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                <h3 style={{ marginBottom: '10px' }}>Resources Needed</h3>
                                <p style={{ marginBottom: '20px' }}>Please select the resources you need:</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <label>
                                        <input type="checkbox" name="meal" value="meal" onChange={handleCheckboxChange} /> Meal
                                    </label>
                                    <label>
                                        <input type="checkbox" name="drink" value="drink" onChange={handleCheckboxChange} /> Drink
                                    </label>
                                    <label>
                                        <input type="checkbox" name="medical supplies" value="medical supplies" onChange={handleCheckboxChange} /> Medical Supplies
                                    </label>
                                    <label>
                                        <input type="checkbox" name="transportation" value="transportation" onChange={handleCheckboxChange} /> Transportation
                                    </label>
                                    <label>
                                        <input type="checkbox" name="shelter" value="shelter" onChange={handleCheckboxChange} /> Shelter
                                    </label>
                                </div>

                                <input
                                    type="submit"
                                    value="Submit"
                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </form>
                            {availablePlace.length > 0 && (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h4 style={{ marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>Available Places:</h4>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
            {availablePlace.map((place, index) => (
                <li key={index} style={{ 
                    padding: '10px', 
                    margin: '5px 0', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    backgroundColor: '#fff', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                    fontSize: '1.1rem'
                }}>
                    <strong>{place.name}</strong><br /> 
                    <span>{place.address}</span><br /> 
                </li>
            ))}
        </ul>
    </div>
)}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
