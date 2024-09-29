const distanceRouter = require('express').Router()
const axios = require('axios');
const config = require( '../utils/config')

distanceRouter.post('/',async (req,res)=>{
    const { origin, destination } = req.body;
    const googleApiKey = config.GOOGLE_KEY;
    
    try {
        console.log(`lat is ${destination.lat} and lng is ${destination.lng}`)
        const realDestination = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                latlng: `${destination.lat},${destination.lng}`,    
                key: googleApiKey,
            },
        });
        if (realDestination.data.status === 'OK') {
            console.log("Real destination address is ", realDestination.data.results);
        } else {
            console.error("Geocoding API error: ", realDestination.data.status);
            return res.status(400).json({ error: 'Invalid lat/lng or address not found' });
        }
        console.log("real destination address is ", realDestination.data.results[0]?.formatted_address)
        const lastAddress = realDestination.data.results[0]?.formatted_address

        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(lastAddress)}&key=${googleApiKey}`);
        console.log("response in back end is ", response.data)
        res.json(response.data);  
    } catch (error) {
        console.error('Error calling Google API:', error);
        res.status(500).send('Error calculating distance');
    }
})


module.exports = distanceRouter