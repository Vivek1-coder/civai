import mongoose from "mongoose";

// Connection object to track connection state
const connection = {}

async function dbConnect() {
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DB_URI || '',{})
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully");
    } catch (error) {
        console.log("Database connection failed",error)
        process.exit(1)
    }
}

export default dbConnect;