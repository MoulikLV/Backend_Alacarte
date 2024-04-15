const Firm=require('../models/Firm')

const Vendor=require('../models/Vendor')

const multer=require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Store uploaded files in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + path.extname(file.originalname)) // Use the original file name for storage
    }
});

const upload = multer({ storage: storage });


const addFirm=async(req,res)=>{


  try {
    const {firmName,area,category,region,offer}=req.body

    const image=req.file? req.file.filename:undefined;
    
    const vendor=await Vendor.findById(req.vendorId)

    if(!vendor){
        return res.status(400).json({error:"Vendor not found"})
    }

   const firm=new Firm({
    firmName,vendorName:vendor.username,area,category,region,offer,image,vendor:vendor._id
   })

   const savedFirm=await firm.save()

   vendor.firm.push(savedFirm)

   await vendor.save()

   return res.status(200).json({message:"Firm added succesfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"})
    
  }
    


}

const deleteFirmById=async(req,res)=>{
     
     try {
      const firmId=req.params.firmId

      const deletedFirm= await Firm.findByIdAndDelete(firmId)

      if(!deletedFirm){
        return res.status(400).json({error:"No firm found"})
      }

      res.status(200).json({message:"Firm deleted Succesfully",deletedFirm})


     } catch (error) {
       console.error(error)
       res.status(400).json({error:"Internal Server Error"})
     }


}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}
