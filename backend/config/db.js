const mongoose=require('mongoose')
require('dotenv').config()

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("mongo db connected");
    } catch(e){
        console.log("not able to connect mondo db",e.message);
    }
}

module.exports= connectdb;