import { useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import {
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
} from 'antd';

import eventService from './services/eventService'

export default function FormDisabledDemo({userId, togglePage}) {
    const [autocomplete, setAutocomplete] = useState(null);
    const [location, setLocation] = useState(null); // State to hold location
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [expiration, setExpirationDate] = useState(null);
    const [resources, setResources] = useState([]); // State to hold selected resources
    const loadAutoc = (autoC) => {
        setAutocomplete(autoC);
    }
    // const userId = "66f8d78ac5422fcbe90b884f"
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (location !== null) {
            // Submit the data to the form
            const submitData = {
                name: name,
                address: address,
                expiration: expiration,
                resources: resources,
                id: userId
            }

            console.log('data is', submitData)

            await eventService.post(submitData)
            console.log('Done')
            window.reload()
        }
    }

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Event Name" onChange={(event) => {setName(event.target.value)}}>
                    <input value={name}
                        type="text"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item label="Address">
                    <LoadScript googleMapsApiKey="AIzaSyCTy-RYvGUcdShnzlESTHfD19nbobBeBRI" libraries={['places']}>
                        <Autocomplete onLoad={loadAutoc} onPlaceChanged={onLocationChanged}>
                            <input
                                type="text"
                                style={{ width: '100%' }}
                                placeholder='Enter your address'
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </Autocomplete>
                    </LoadScript>
                </Form.Item>
                <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                    <Checkbox value="Meal" onChange={handleCheckboxChange}>Meal</Checkbox>
                    <Checkbox value="Drink" onChange={handleCheckboxChange}>Drink</Checkbox>
                    <Checkbox value="Medical Supplies" onChange={handleCheckboxChange}>Medical Supplies</Checkbox>
                    <Checkbox value="Transportation" onChange={handleCheckboxChange}>Transportation</Checkbox>
                    <Checkbox value="Shelter" onChange={handleCheckboxChange}>Shelter</Checkbox>
                </Form.Item>
                <Form.Item label="Expiration">
                    <DatePicker onChange={data => {const newDate = new Date(data.$d); setExpirationDate(newDate)}} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button type="marker" onClick={togglePage}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};