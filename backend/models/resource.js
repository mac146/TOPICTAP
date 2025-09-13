const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const resource=new Schema({
    type: {
        type: String,
        enum: ["video", "article", "podcast"],
        required: true
    },
    title:String,
    description:String,
    thumbnail:String,
    duration:String,
    publishedAt:String,
    topic:String,
    url:String,
    ratings: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  }
})

const resourceModel=mongoose.model("resources",resource);

module.exports={resourceModel};