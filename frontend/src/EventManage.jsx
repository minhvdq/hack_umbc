import { Button, Typography } from "antd";


const EventManage = ({togglePage, handleLogout, events}) => {
    const { Title, Text } = Typography
    return (
        <div>
            <Typography>
                <Title>Welcome to the Event Manager</Title>
            </Typography>

            <div className="add-event">
                <Button type="primary" onClick={togglePage} >Add New Event</Button>
            </div>

            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.name}
                        <Button >Edit</Button>
                    </li>
                ))}
                {events.length === 0 ? 
                    <Text>There is no event.</Text> : <></>}
            </ul>

            <div className="logout">
                <Button type="primary" onClick={handleLogout}>logout</Button>
            </div>
        </div>
    );
}

export default EventManage