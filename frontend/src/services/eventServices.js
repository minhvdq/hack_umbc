import axios from "axios";

const baseURL = 'http://localhost:3001'


const getAllAvailableEvent = async (resources, location) => {
    console.log("beign of get all available")
    console.log("resources is " + resources)
    const availableEvents = await axios.post(`${baseURL}/api/query`, {resources});
    const response = availableEvents.data
    console.log("data is ",JSON.stringify(response))  

    return response;
}

export default { getAllAvailableEvent }