import mongoose from "mongoose";

let isConnected = false;
export let lastDbError = null;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    if (!process.env.MONGO_DBurl) {
        lastDbError = "MONGO_DBurl is missing from Vercel settings.";
        console.error(lastDbError);
        return;
    }

    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_DBurl);
        isConnected = true;
        lastDbError = null;
        console.log("DB Connected Successfully");
    } catch (error) {
        lastDbError = error.message;
        console.error("DB Connection Failed:", error.message);
    }
}
