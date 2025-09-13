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
console.log("Incoming body:", req.body); // 👈 log request
    
        try {
    let resources;

    if (Array.isArray(req.body)) {
      resources = await resourceModel.insertMany(req.body);
    } else {
      resources = await resourceModel.create(req.body);
    }

    res.status(201).json({
      message: "resource(s) created",
      data: resources,
    });
    } catch(e){
        
    res.status(500).json({
        message:"not able to create resource",
        error:e.message
    })
  }
    
});


resourceRouter.get("/",async(req,res)=>{
    try{
        const resources=await resourceModel.find().sort({ "ratings.upvotes": -1 });
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
            topic: { $regex: topic, $options: "i" },
            type:finalType
        }).sort({ "ratings.upvotes": -1 });

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

