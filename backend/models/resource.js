const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const resource=new Schema({
    type:String,
    title:String,
    description:String,
    thumbnail:String,
    duration:String,
    publishedAt:String,
    topic:String,
    url:String,
})

const resourceModel=mongoose.model("resources",resource);

module.exports={resourceModel};