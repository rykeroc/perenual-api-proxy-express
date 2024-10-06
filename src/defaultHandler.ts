import logger from "./logging";
import axios from "axios";

const defaultHandler = (error: any, _req: any, res: any, _next: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            logger.error(`Status code: ${error.response.status}, Details: ${error.response.data}`)
            res.status(error.response.status).send(error.response.data.message)
        } else if (error.request) {
            logger.error(`No response received: ${error.request}`)
            res.status(error.request.status).send(error.request.data)
        } else {
            logger.error(`Error message: ${error.message}`)
            res.status(500).send('Error fetching data')
        }
    }
}

export {
    defaultHandler
}