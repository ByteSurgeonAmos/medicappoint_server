import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.CONN_STRING;
const client = new Client({
  connectionString: connectionString,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    throw err;
  }
}

connectToDatabase();

export default client;
