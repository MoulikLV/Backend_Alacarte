const firmController=require('../contollers/firmController')
const verifyToken=require("../middleware/verifyToken")

const express=require("express")

const router=express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)

router.get("/image/:imageName",(req,res)=>{
    const imageName=req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})

router.delete("/deleteFirm/:firmId",firmController.deleteFirmById)

module.exports=router