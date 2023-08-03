const express=require('express');
const {RegisterUser, authUser} = require('../controllers/userController');

const userRouter=express.Router();

userRouter.route('/').post(RegisterUser);
userRouter.post('/login',authUser)

module.exports=userRouter;