import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    if (!process.env.MONGO_DBurl) {
        console.error("CRITICAL ERROR: MONGO_DBurl is not defined in environment variables.");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_DBurl, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
        });
        isConnected = !!db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
    }
}

