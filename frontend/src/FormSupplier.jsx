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

const FormDisabledDemo = () => {
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (location !== null) {
            // Submit the data to the form
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
                <Form.Item label="Event Name" onChange={(event) => setName(event.target.value)}>
                    <input
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
                <Form.Item label="Expiration" onChange={(event) => setExpirationDate(event.target.value)}>
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onChange={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <FormDisabledDemo />;