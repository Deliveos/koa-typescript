import { MongoClient } from "mongodb";

// Client
const client = new MongoClient("mongodb://127.0.0.1:27017", {  });

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
