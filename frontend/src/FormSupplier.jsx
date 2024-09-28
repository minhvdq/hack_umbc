import { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

export default function FormSupplier() {
    const [autocomplete, setAutocomplete] = useState(null);
    const [location, setLocation] = useState(null); // State to hold location
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [expiration, setExpirationDate] = useState('');
    const [resources, setResources] = useState([]); // State to hold selected resources

    const loadAutoc = (autoC) => {
        setAutocomplete(autoC);
    }

    const onLocationChanged = () => {
        if (autocomplete !== null) {
            const location = autocomplete.getPlace();
            const lat = location.geometry.location.lat();
            const lng = location.geometry.location.lng();
            setLocation({ lat, lng });
        } else {
            console.log("Cannot find a place");
        }
    }

    // Function to handle checkbox change
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

    return (
        <form>
            <input type='text' placeholder='Organization name' onChange={(event) => setName(event.target.value)} />
            <br />
            <LoadScript googleMapsApiKey="AIzaSyCTy-RYvGUcdShnzlESTHfD19nbobBeBRI" libraries={['places']}>
                <Autocomplete onLoad={loadAutoc} onPlaceChanged={onLocationChanged}>
                    <input
                        type="text"
                        placeholder='Enter your address'
                        style={{ width: '100%', height: '40px', marginBottom: "13%" }}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </Autocomplete>
            </LoadScript>
            <br />
            <input type='number' placeholder='Expiration date' onChange={(event) => setExpirationDate(event.target.value)} />
            <br />
            <div className="checkbox-list">
                <label>
                    <input type="checkbox" name="Meal" value="Meal" onChange={handleCheckboxChange} /> Meal
                </label><br />
                <label>
                    <input type="checkbox" name="Drink" value="Drink" onChange={handleCheckboxChange} /> Drink
                </label><br />
                <label>
                    <input type="checkbox" name="Medical Supplies" value="Medical Supplies" onChange={handleCheckboxChange} /> Medical Supplies
                </label><br />
                <label>
                    <input type="checkbox" name="Transportation" value="Transportation" onChange={handleCheckboxChange} /> Transportation
                </label><br />
                <label>
                    <input type="checkbox" name="Shelter" value="Shelter" onChange={handleCheckboxChange} /> Shelter
                </label><br />
            </div>

            {/* Display selected resources for testing */}
            <p>Selected Resources: {resources.join(', ')}</p>
        </form>
    );
}
