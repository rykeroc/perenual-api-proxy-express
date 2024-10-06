import axios from "axios";
import express from "express";
import {PERENUAL_API_KEY} from "../env";
import logger from "../logging";

const perenualRouter = express.Router()

const perenual_api_addr = "https://perenual.com/api"


const perenaulApiKeyMiddleware = (_error: any, _req: any, res: any, next: any) => {
    // Check for API key
    if (PERENUAL_API_KEY === undefined) {
        logger.error('Api key is undefined. Check configuration.')
        res.status(500).send('An unexpected error occurred.')
    } else
        next()
}


// Species list
perenualRouter.get('/species-list', async (req, res, next) => {
    logger.debug(`Params: ${JSON.stringify(req.query)}`)
    const page = req.query.page || "1"
    const q = req.query.q || ""
    const edible = req.query.edible || ""
    const poisonous = req.query.poisonous || ""
    const cycle = req.query.cycle || ""
    const watering = req.query.watering || ""
    const sunlight = req.query.sunlight || ""

    const requestUrl = `${perenual_api_addr}/species-list?key=${PERENUAL_API_KEY!.toString()}&q=${q}&edible=${edible}&poisonous=${poisonous}&cycle=${cycle}&watering=${watering}&sunlight=${sunlight}&page=${page}&indoor=1`

    try {
        // Forward request to Perenual API
        const response = await axios.get(
            requestUrl,
            {}
        )
        logger.debug(`Response data: ${JSON.stringify(response.data)}`)
        res.status(response.status).send(response.data)
    } catch (error) {next(error)}
})


// Species Details
perenualRouter.get('/species/details/:plantId', async (req, res, next) => {
    logger.debug(`Params: ${JSON.stringify(req.params)}`)
    const plantId = req.params.plantId || ""

    const detailsUrl = `${perenual_api_addr}/species/details/${plantId}?key=${PERENUAL_API_KEY!.toString()}`

    try
    {
        // Forward request to Perenual API
        const detailsPromise = await axios.get( detailsUrl, {} )

        let resData = detailsPromise.data

        // Remove data which can expose the Perenual API key
        delete resData['hardiness_location']
        delete resData['care-guides']

        logger.debug(`Response data: ${JSON.stringify(resData)}`)
        res.status(detailsPromise.status).send(resData)
    } catch (error) {next(error)}
})


// Species Details
perenualRouter.get('/species-care-guide/:plantId', async (req, res, next) => {
    logger.debug(`Params: ${JSON.stringify(req.params)}`)
    const plantId = req.params.plantId || ""

    const careGuideUrl = `${perenual_api_addr}/species-care-guide-list?species_id=${plantId}&key=${PERENUAL_API_KEY!.toString()}`

    try
    {
        // Forward request to Perenual API
        const careGuideReponse = await axios.get( careGuideUrl, {} )

        let resData = careGuideReponse.data

        // Removed unnecessary data
        delete resData['to']
        delete resData['per_page']
        delete resData['current_page']
        delete resData['from']
        delete resData['last_page']
        delete resData['total']

        logger.debug(`Response data: ${JSON.stringify(resData)}`)
        res.status(careGuideReponse.status).send(resData.data[0])
    } catch (error) {next(error)}
})

export default perenualRouter;

export {
    perenaulApiKeyMiddleware
}