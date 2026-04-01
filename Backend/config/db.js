import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGO_DBurl) {
        console.error("CRITICAL ERROR: MONGO_DBurl is not defined in environment variables.");
        return;
    }
    await mongoose.connect(process.env.MONGO_DBurl).then(()=>console.log("DB Connected"));
}

