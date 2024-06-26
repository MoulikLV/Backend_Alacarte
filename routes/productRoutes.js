const productController=require("../contollers/productController")

const express=require('express')

const router = express.Router()

router.post('/add-product/:firmId',productController.addProduct)

router.get("/:firmId/products",productController.getProductByFirm)

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName
    res.setHeader('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})

router.delete("/deleteProduct/:productId",productController.deleteProductById)


module.exports=router