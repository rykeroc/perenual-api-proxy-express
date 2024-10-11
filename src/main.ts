import {app} from "./app";
import {PORT} from "./env";
import logger from "./logging";

// Start app
app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`);
});