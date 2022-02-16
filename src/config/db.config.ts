import { MongoClient } from "mongodb";
import { config } from "./env.config";

// Client
const client = new MongoClient(config.DB, {  });

// Connection
const connectDB = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
    } finally {
        // await client.close();
    }
}

export { connectDB, client };
