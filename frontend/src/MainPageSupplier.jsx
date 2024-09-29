import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import customStorage from "./services/customStorage";
import {useState} from 'react'
import FormSupplier from './FormSupplier'
import EventManage from "./EventManage";

const MainPageSupplier = ({events, handleLogout, userId}) => {
    const [inadd, setInadd] = useState(false)
    const navigate = useNavigate()

    const togglePage = (e) => {
        e.preventDefault()
        setInadd(!inadd)
      }
    
    const mainContent = () => {
        return (
            <EventManage handleLogout={handleLogout} togglePage={togglePage} events={events}/>
        );
    }

    const AddEventContent = () => {
        return(
            <FormSupplier userId={userId} togglePage={togglePage}/>
        )
    }

    return(
        <>
            <div>
                {inadd == true ? AddEventContent() : mainContent()}
            </div>
        </>
    )


}

export default MainPageSupplier;