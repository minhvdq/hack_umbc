import axios from 'axios'
import customStorage from './customStorage'


const baseURL = 'http://localhost:3001/api/event'

const post = async( data ) => {
    const submitData = {
        name: data.name,
        address: data.address,
        expiration: data.expiration,
        resources: data.resources,
        id: data.id
    }

    
    const res = await axios.post(baseURL, data)
    return res.data
}

export default {post}

