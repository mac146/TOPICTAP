const{Router}=require('express')
const{resourceModel}=require("../models/resource")
const resourceRouter = Router();

resourceRouter.post("/",async(req,res)=>{
    const providedSecret=req.headers['x-admin-secret'];

    if(providedSecret !==process.env.ADMIN_SECRET){
        res.status(403).json({
            message:"unauthorized"
        })
    }

    else {
        const {title,description,url,thumbnail,duration,publishedAt,type,topic}=req.body;

        try{
        const resource=await resourceModel.create({
        title,
        description,
        url,
        thumbnail,
        duration,
        publishedAt,
        type,
        topic
    })

    res.status(200).json({
        message:"resource created"
    })
    } catch(e){
    res.status(500).json({
        message:"not able to create resource"
    })
  }

    }    
})

resourceRouter.get("/",async(req,res)=>{
    try{
        const resources=await resourceModel.find()
    res.status(200).json(resources)
    } catch(e){
        res.status(500).json({
            message:"resource not found"
     })
    }
})

resourceRouter.get("/topic",async(req,res)=>{
    const topic=req.query.name;
    const type = req.query.type;
    
    const finalType = type || "video";

    
    try{
        const resources=await resourceModel.find({
            topic:topic,
            type:finalType
        })

        if(resources.length===0){
            return res.status(404).json({
                message:"no resource for this topic"
            })
        }

        res.status(200).json(resources)
    } catch(e){
        res.status(500).json({
            message:"resource not found"
     })
    }
})

module.exports={
    resourceRouter:resourceRouter
}

