const Vendor=require("../models/Vendor")

const jwt=require('jsonwebtoken')

const bcrypt=require('bcryptjs')

const dotEnv=require('dotenv')
const Firm = require("../models/Firm")

dotEnv.config()

const secretkey=process.env.whatisyourname


const vendorregistration=async(req,res)=>{
    const {username,email,password}=req.body

    try {
        const vendorEmail=await Vendor.findOne({email})
    if(vendorEmail){
        return res.status(400).json("Email already exists")
    }
    const hashedPassword=await bcrypt.hash(password,10)

    

    

    const newVendor=new Vendor({
        username,
        email,
        password:hashedPassword,
        
        
    })

    await newVendor.save()
    res.status(200).json({message:"Registration sucessful"})
    console.log("Registered")

    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error")
    }

}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body

    try {
        const vendor=await Vendor.findOne({email})
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
        return res.status(400).json({error:"Invaild username or password"})
        
    }

    const token=jwt.sign({vendorId:vendor._id,username:vendor.username},secretkey,{expiresIn:"1h"})

    const vendorId= vendor._id

    res.status(200).json({message:"Login Succesful",token,email,username:vendor.username,vendorId})
    // console.log("username:",vendor.username)
    console.log("Email: ",email)
    console.log("Token :",token)
    
    console.log("Login Success")

    } catch (error) {
        res.status(400).json({error:"Server error"})
        console.error(error)
    }
}

const getallVendors=async(req,res)=>{      

    try {
        const vendors=await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        console.error(error)
        res.status(400).json({error:"Internal server Error"})
        
    }
}                                         

const getVendor=async(req,res)=>{         
    const vendorId=req.params.id
      
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"404 error : Vendor not found"})
        }

        const vendorFirmId= vendor.firm[0]._id  

        res.status(200).json({vendor,vendorFirmId})

        console.log(vendorFirmId)

       

        

        
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"Internal server error"})
    }  

      


}



module.exports= {vendorregistration,vendorLogin,getallVendors,getVendor}