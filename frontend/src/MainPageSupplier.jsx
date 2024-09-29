import React, { useEffect, useState } from 'react';
import { Button, Typography } from "antd";

export default function MainPageSupplier() {
    const { Title} = Typography;
    // Sample list of events
    const [events, setEvents] = useState([
        {id: 1, name: 2}
    ]);

    // State to handle new event addition
    const [newEvent, setNewEvent] = useState('');

    // Function to handle editing an event
    const handleEdit = (id) => {
        const editedEventName = prompt('Edit event name:');
        setEvents(events.map(event => event.id === id ? { ...event, name: editedEventName } : event));
    };

    // Function to handle adding a new event
    const handleAddEvent = () => {
        if (newEvent.trim()) {
            setEvents([...events, { id: events.length + 1, name: newEvent }]);
            setNewEvent(''); // Clear the input field after adding
        }
    };

    // useEffect(() => {
    //     setEvents(pre_events);
    // }, [events]);

    return (
        <div>
            <Typography>
                <Title>Welcome to the Event Manager</Title>
            </Typography>

            <div className="add-event">
                <Button type="primary" onClick={handleAddEvent}>Add New Event</Button>
            </div>

            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.name}
                        <button onClick={() => handleEdit(event.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}