import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const PORT: string = process.env.PORT || "8000";
const PERENUAL_API_KEY: string | undefined = process.env.PERENUAL_API_KEY
const LOG_LEVEL: string = process.env.LOG_LEVEL || "info";

export {
    PORT,
    PERENUAL_API_KEY,
    LOG_LEVEL,
}
