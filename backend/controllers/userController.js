const asyncHandler=require('express-async-handler');
const User = require('../model/userModel');
const userRouter = require('../routes/userRoutes');
const generateToken = require('../config/generateToken');

const RegisterUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists")
    }

    const user=await User.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("User not found")
    }
})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  const getAllUsers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
      $or:[{name:{$regex:req.query.search,$options:"i"}},
          {email:{$regex:req.query.search,$options:"i"}}
    ]
    }:{}

    const users=await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
  })

module.exports={RegisterUser,authUser,getAllUsers};