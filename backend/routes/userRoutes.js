const express=require('express');
const {RegisterUser, authUser, getAllUsers} = require('../controllers/userController');
const {protect}=require('../middlewares/authHandler')

const userRouter=express.Router();

userRouter.route('/').post(RegisterUser).get(protect,getAllUsers);
userRouter.post('/login',authUser)

module.exports=userRouter;