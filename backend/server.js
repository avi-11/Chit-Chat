const express = require('express');

const dotenv=require('dotenv');

const chats=require('./data/data')

const connectDB=require('./config/db');
const userRouter = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const chatRouter = require('./routes/chatRoutes');
const messageRouter = require('./routes/messageRoutes');

const app=express();
app.use(express.json())

dotenv.config();

connectDB();

app.get('/',(req,res)=>{
    res.send('hi this is chit-chat')
})

app.use('/user',userRouter);
app.use('/chat',chatRouter);
app.use('/message',messageRouter)

app.use(notFound);
app.use(errorHandler)

const PORT=process.env.PORT|| 5000;

const server=app.listen(PORT,console.log("server started"))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
  })

  