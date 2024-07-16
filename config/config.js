import "dotenv/config";

const port = process.env.PORT
const mongoDBUrl = process.env.MONGODB_URL


export { port, mongoDBUrl }