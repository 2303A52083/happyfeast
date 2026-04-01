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
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
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

// API Endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Http Requests
app.get('/', (req, res) => {
    res.send("API Working")
});

// To Run on port 4000 (Local Dev Only)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`)
    })
}

// Export the app instance for Vercel functions
export default app;