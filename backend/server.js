const express = require('express');

const dotenv=require('dotenv');

const chats=require('./data/data')

const connectDB=require('./config/db');
const userRouter = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const chatRouter = require('./routes/chatRoutes');

const app=express();
app.use(express.json())

dotenv.config();

connectDB();

app.get('/',(req,res)=>{
    res.send('hi this is chit-chat')
})

app.use('/user',userRouter);
app.use('/chat',chatRouter);

app.use(notFound);
app.use(errorHandler)

const PORT=process.env.PORT|| 5000;

app.listen(PORT,console.log("server started"))