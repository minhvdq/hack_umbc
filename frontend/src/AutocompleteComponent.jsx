import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

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

        // Check if the checkbox is checked or unchecked
        if (event.target.checked) {
            // Add the resource to the list
            setResources((prevResources) => [...prevResources, value]);
        } else {
            // Remove the resource from the list
            setResources((prevResources) => prevResources.filter((resource) => resource !== value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (location !== null) {
            // Handle the form submission logic here
        }
    };

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
                                        <input type="checkbox" name="Meal" value="Meal" onChange={handleCheckboxChange} /> Meal
                                    </label>
                                    <label>
                                        <input type="checkbox" name="Drink" value="Drink" onChange={handleCheckboxChange} /> Drink
                                    </label>
                                    <label>
                                        <input type="checkbox" name="Medical Supplies" value="Medical Supplies" onChange={handleCheckboxChange} /> Medical Supplies
                                    </label>
                                    <label>
                                        <input type="checkbox" name="Transportation" value="Transportation" onChange={handleCheckboxChange} /> Transportation
                                    </label>
                                    <label>
                                        <input type="checkbox" name="Shelter" value="Shelter" onChange={handleCheckboxChange} /> Shelter
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
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
