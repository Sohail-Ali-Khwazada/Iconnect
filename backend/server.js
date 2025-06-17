import 'dotenv/config'
import express from "express";
import cors from "cors";
import { app,server } from './socket/socket.js';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";

import connectDb from './db/db_connect.js';


const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/messages",messageRoutes);

app.get("/",(req,res)=> {
  res.send("Backend is running..")
})




server.listen(PORT,()=>{
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})