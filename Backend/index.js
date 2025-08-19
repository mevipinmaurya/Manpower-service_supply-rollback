import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/UserRouter.js';
import cors from 'cors'
import blogRouter from './routes/BlogRouter.js';
import serviceRouter from './routes/ServiceRouter.js';
import cartRouter from './routes/CartRouters.js';

import Razorpay from 'razorpay'
import paymentRouter from './routes/PaymentRouter.js';

dotenv.config({
    path: ".env"
});

const app = express();

// Razorpay Instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

// Database Connections
databaseConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://manpower-service-supply-rollback-cc.vercel.app"
    ],
    credentials: true,
};
app.use(cors(corsOption));

// API Endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", blogRouter);
app.use("/api/v1/user", serviceRouter);
app.use("/api/v1/user", cartRouter);
app.use("/api/v1/user", paymentRouter);

// Root endpoint
app.get("/", (req, res) => {
    res.send("I am root");
});

export default app;
