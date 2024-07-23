import 'dotenv/config'
import express from "express";
import { app,server } from './socket/socket.js';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";

import connectDb from './db/db_connect.js';


const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/messages",messageRoutes);

// app.get("/",(req,res)=> {
//   res.send("hello world");
// })


server.listen(PORT,()=>{
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})