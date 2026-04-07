import express from "express";
import adminRouter from "./routes/adminRoutes.js";
import { connectDB, lastDbError } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import fs from "fs";
import mongoose from "mongoose";

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

// 🛡️ MANUAL CORS HANDLER (For Vercel Stability)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, authorization");
    
    // Handle Preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).json({});
    }
    next();
});


// DB Connection Middleware for Serverless
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// API Endpoints
app.use("/api/food",foodRouter)
// Use /tmp for static images on Vercel, else 'uploads'
app.use("/images", express.static(process.env.VERCEL ? "/tmp" : "uploads"))
app.use("/api/user",userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)

// Http Requests
app.get('/', (req, res) => {
    const states = ["DISCONNECTED", "CONNECTED", "CONNECTING", "DISCONNECTING"];
    const currentState = states[mongoose.connection.readyState] || "UNKNOWN";
    const errorMsg = lastDbError ? ` | Detailed Error: ${lastDbError}` : "";
    res.send(`API Status: Working | DB Version: 3.0 | DB State: ${currentState}${errorMsg}`)
});

// Health check endpoint (for connectivity test)
app.get('/api/health', (req, res) => {
    const states = ["DISCONNECTED", "CONNECTED", "CONNECTING", "DISCONNECTING"];
    const currentState = states[mongoose.connection.readyState] || "UNKNOWN";
    res.json({ 
        success: true, 
        status: "Healthy", 
        database: currentState,
        error: lastDbError,
        environment: process.env.VERCEL ? "Vercel" : "Local" 
    })
});

// To Run on port (Local Dev Only)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`)
    })
}

export default app;
