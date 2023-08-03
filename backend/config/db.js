const mongoose=require("mongoose");


const connectDB=async()=>{
    try{
        const con=await mongoose.connect(process.env.DB,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(console.log("connection established"))
    }
    catch(error){
        console.log(`Error:${error.message}`);
        process.exit();
    }
}

module.exports=connectDB;