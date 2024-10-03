import axios from "axios";
import express, {Response} from "express";
import {PERENUAL_API_KEY} from "../env";
import logger from "../logging";

const perenualRouter = express.Router()

const perenual_api_addr = "https://perenual.com/api"

const performGet = async (requestUrl: string, res: Response) => {
    try {
        // Forward request to Perenual API
        const response = await axios.get(
            requestUrl,
            {}
        )
        logger.debug(`Response data: ${JSON.stringify(response.data)}`)
        // Return response from Perenual APi
        res.status(response.status).send(response.data)
    } catch (err) {
        // Log and return server error
        logger.error(err)
        res.status(500).send('Error fetching data');
    }
}

// Species list
perenualRouter.get('/species-list', async (req, res) => {
    // Check if API key
    if (PERENUAL_API_KEY === undefined) {
        logger.error('Api key is undefined. Check configuration.')
        res.status(500).send('An unexpected error occurred.')
        return
    }

    logger.debug(`Params: ${JSON.stringify(req.query)}`)
    const page = req.query.page || "1"
    const q = req.query.q || ""
    const edible = req.query.edible || ""
    const poisonous = req.query.poisonous || ""
    const cycle = req.query.cycle || ""
    const watering = req.query.watering || ""
    const sunlight = req.query.sunlight || ""

    const requestUrl = `${perenual_api_addr}/species-list?key=${PERENUAL_API_KEY.toString()}&q=${q}&edible=${edible}&poisonous=${poisonous}&cycle=${cycle}&watering=${watering}&sunlight=${sunlight}&page=${page}&indoor=1`

    await performGet(requestUrl, res)
})


// Species Details
perenualRouter.get('/species/details/:plantId', async (req, res) => {
    // Check if API key
    if (PERENUAL_API_KEY === undefined) {
        logger.error('Api key is undefined. Check configuration.')
        res.status(500).send('An unexpected error occurred.')
        return
    }

    logger.debug(`Params: ${JSON.stringify(req.params)}`)
    const plantId = req.params.plantId || ""

    const requestUrl = `${perenual_api_addr}/species/details/${plantId}?key=${PERENUAL_API_KEY.toString()}`

    await performGet(requestUrl, res)
})

export default perenualRouter;