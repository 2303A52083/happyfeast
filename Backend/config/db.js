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
        console.log("Attempting to connect to MongoDB...");
        const db = await mongoose.connect(process.env.MONGO_DBurl);
        isConnected = true;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
        // Log a more helpful error for the user
        if (error.message.includes("ETIMEOUT")) {
            console.error("HINT: Check if 0.0.0.0/0 is really active in Atlas.");
        }
    }
}

