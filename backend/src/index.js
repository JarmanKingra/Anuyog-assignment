import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import userRoutes from "./Routes/userRoutes.js";
import habitRoutes from "./Routes/habitRoutes.js";
import habitLogRoutes from "./Routes/habitlogRoutes.js";



 
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;
console.log("MONGO_URI:", process.env.MONGO_URI);
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

const app = express();

app.use(globalLimiter);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use("/api/auth",userRoutes); 
app.use("/api/habits", habitRoutes);
app.use("/api/habitLogs", habitLogRoutes);

 
app.get("/", (req, res) => {
    return res.json({"hello" : "World"})
})
 


const start = async() => { 
    try { 
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected"); 
  
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })  
    } catch (err) { 
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1);
    }   
}
   
start();   