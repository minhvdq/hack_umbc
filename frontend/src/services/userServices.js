import axios from 'axios'
import customStorage from './customStorage'


const baseURL = 'http://localhost:3001'

const login = async( {email, password}) => {
    const loginData = {email, password}

    const res = await axios.post(`${baseURL}/api/login`, loginData )
    console.log("response data is ", res.data)
    return res.data
}

const signup = async( {name, email, password, phoneNumber }) => {
    const signupData = {
        name, email, password, phoneNumber
    }

    const res = await axios.post(`${baseURL}/api/user`, signupData)
    console.log('Sign up data is', res.data)
    return res.data
}

const getUserEvents = async ( ids) => {
    const data = {
        events: ids
    }
    console.log('data', data)
    const res = await axios.post(`${baseURL}/api/event/user`, data)
    return res.data
}

export default {login, signup, getUserEvents}