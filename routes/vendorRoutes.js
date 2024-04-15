const vendorController=require('../contollers/vendorController')
const express=require("express")

const router=express.Router()

router.post("/register",vendorController.vendorregistration)
router.post("/login",vendorController.vendorLogin)

router.get('/all-vendors',vendorController.getallVendors)

router.get('/single-vendor/:id',vendorController.getVendor)

module.exports=router