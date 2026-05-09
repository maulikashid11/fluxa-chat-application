import express from "express";
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from "./configs/db.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

await connectDB();

app.use('/api/users', userRoute);
app.use('/api/message', messageRoute);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})