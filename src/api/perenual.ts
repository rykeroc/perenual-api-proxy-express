import axios from "axios";
import express from "express";
import {PERENUAL_API_KEY} from "../env";

const perenualRouter = express.Router()

const perenual_api_addr = "https://perenual.com/api"

// Species list
perenualRouter.get('/species-list', async (req, res) => {
    // Check if API key
    if (PERENUAL_API_KEY === undefined) {
        console.log('Api key is undefined. Check configuration.')
        res.status(500).send('An unexpected error occurred.')
        return
    }

    const page = req.query.page || "1"
    const q = req.query.q || ""
    const edible = req.query.edible || ""
    const poisonous = req.query.poisonous || ""
    const cycle = req.query.cycle || ""
    const watering = req.query.watering || ""
    const sunlight = req.query.sunlight || ""

    const requestUrl = `${perenual_api_addr}/species-list?key=${PERENUAL_API_KEY.toString()}&q=${q}&edible=${edible}&poisonous=${poisonous}&cycle=${cycle}&watering=${watering}&sunlight=${sunlight}&page=${page}&indoor=1`

    try {
        // Forward request to Perenual API
        const response = await axios.get(
            requestUrl,
            {}
        )
        // Return response from Perenual APi
        res.status(response.status).send(response.data)
    } catch (err) {
        // Log and return server error
        console.error(err)
        res.status(500).send('Error fetching data');
    }
})


// Species Details
perenualRouter.get('/species/details/:plantId', async (req, res) => {
    // Check if API key
    if (PERENUAL_API_KEY === undefined) {
        console.log('Api key is undefined. Check configuration.')
        res.status(500).send('An unexpected error occurred.')
        return
    }

    const plantId = req.params.plantId || ""

    const requestUrl = `${perenual_api_addr}/species/details/${plantId}?key=${PERENUAL_API_KEY.toString()}`

    try {
        // Forward request to Perenual API
        const response = await axios.get(
            requestUrl,
            {}
        )
        // Return response from Perenual APi
        res.status(response.status).send(response.data)
    } catch (err) {
        // Log and return server error
        console.error(err)
        res.status(500).send('Error fetching data');
    }
})

export default perenualRouter;