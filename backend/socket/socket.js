
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin: process.env.FRONTEND_URI,
    methods: ["GET","POST"],
    credentials: true
  }
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {}; //userID:socketID

io.on("connection",(socket) => {
  console.log("A user connected",socket.id);
  const userId = socket.handshake.query.userId;
  if(userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("typing",({from,to})=> {
    const to_socket_id = getReceiverSocketId(to);
    if(to_socket_id) {
      io.to(to_socket_id).emit("typing",{from});
    }
  })

  socket.on("stopTyping", ({from,to})=> {
    
    const to_socket_id = getReceiverSocketId(to);
    if(to_socket_id) {
      io.to(to_socket_id).emit("stopTyping",{from});
    }
  })

  socket.on("disconnect",()=> {
    console.log("user disconnected",socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  })
})

export {app,io,server};