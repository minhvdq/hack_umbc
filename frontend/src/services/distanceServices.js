import axios from "axios";

const baseURL = 'http://localhost:3001'

const getDistance = async (origin, destination) => {
    // console.log("getting distance in service")
    // console.log("origin: ", origin)
    // console.log("destination: ",destination)
    const result = await axios.post(`${baseURL}/api/distance`,{origin,destination})  
    console.log("result of distance is ", result.data.rows[0].elements[0].distance.text);
    const distance = result.data.rows[0].elements[0].distance.text
    return distance;  
};


export default {getDistance}
