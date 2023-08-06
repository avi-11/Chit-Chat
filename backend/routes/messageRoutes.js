const express=require('express');
const { protect } = require('../middlewares/authHandler');
const { sendMessage, allMessages } = require('../controllers/messageController');

const messageRouter=express.Router();


messageRouter.route("/:chatId").get(protect, allMessages);
messageRouter.route("/").post(protect, sendMessage);


module.exports=messageRouter;