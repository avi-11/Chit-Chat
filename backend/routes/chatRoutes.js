const express=require('express');
const { protect } = require('../middlewares/authHandler');
const {accessChat, findChat, createGroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controllers/chatController');

const chatRouter=express.Router();


chatRouter.route('/').post(protect,accessChat).get(protect,findChat);
chatRouter.route('/group').post(protect,createGroupChat);
chatRouter.route('/rename').put(protect,renameGroup);
chatRouter.route("/groupremove").put(protect, removeFromGroup);
chatRouter.route("/groupadd").put(protect, addToGroup);

module.exports=chatRouter