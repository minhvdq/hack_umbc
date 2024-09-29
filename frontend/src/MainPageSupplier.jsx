import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import customStorage from "./services/customStorage";

const MainPageSupplier = ({events, handleLogout}) => {
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    

    return (
        <div>
            <Typography>
                <Title>Welcome to the Event Manager</Title>
            </Typography>

            <div className="add-event">
                <Button type="primary" onClick={() => (navigate("/FormDisabledDemo"))}>Add New Event</Button>
            </div>

            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.name}
                        <Button onClick={navigate("/FormDisabledDemo")}>Edit</Button>
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

export default MainPageSupplier;