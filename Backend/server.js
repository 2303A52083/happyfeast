import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import fs from "fs";

// Create uploads directory if it doesn't exist
try {
    if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
    }
} catch (err) {
    console.error("Warning: Could not create uploads directory:", err.message);
}

// app configurations
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json()) // For parsing json files coming to backend
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"]
})) // To access backend from any frontend


// DB Connection with Error Handling
connectDB().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed:", err.message);
});

// API Endpoints
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use("/api/food",foodRouter)
// Use /tmp for static images on Vercel, else 'uploads'
app.use("/images", express.static(process.env.VERCEL ? "/tmp" : "uploads"))
app.use("/api/user",userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

import mongoose from "mongoose";
import { lastDbError } from "./config/db.js";

// Http Requests
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED";
    const errorMsg = lastDbError ? ` | Detailed Error: ${lastDbError}` : "";
    res.send(`API Working - Database Status: ${dbStatus}${errorMsg}`)
});

// Health check endpoint (for connectivity test)
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED";
    res.json({ 
        success: true, 
        status: "Healthy", 
        database: dbStatus,
        environment: process.env.VERCEL ? "Vercel" : "Local" 
    })
});

// To Run on port (Local Dev Only)
// On Vercel, we MUST NOT call app.listen()
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`)
    })
}

// Export the app instance for Vercel functions
export default app;