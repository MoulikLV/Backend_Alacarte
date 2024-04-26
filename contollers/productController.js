const Firm = require('../models/Firm');
const Product = require('../models/Product')

const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Store uploaded files in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Use the original file name for storage
    }
});

const upload = multer({ storage: storage });


const addProduct = async (req, res) => {

    try {
        const { productName, price, category, bestSeller, description } = req.body

        const image = req.file ? req.file.fileName : undefined;

        const firmId = req.params.firmId

        const firm = await Firm.findById(firmId)

        if (!firmId) {
            return res.status(404).json({ message: "No firm Found" })
        }

        const product = new Product({
            productName, category, price, image, bestSeller, description, firm: firm._id
        })

        const savedProduct = await product.save()



        firm.product.push(savedProduct)

        await firm.save()

        res.status(200).json({ message: "Product Added Succesfuly", savedProduct })

    } catch (error) {
        console.error(error)
        res.status(401).json({ error: "Internal server error" })
    }
}

const getProductByFirm = async (req, res) => {

    const firmId = req.params.firmId

    try {

        const firm = await Firm.findById(firmId)

        if (!firm) {
            return res.status(404).json({ error: "No firm found" })
        }

        const products = await Product.find({ firm: firmId })

        const restaurantName = firm.firmName

        res.status(200).json({ restaurantName, products })



    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Internal Server error" })
    }
}

const deleteProductById = async (req, res) => {

    try {
        const productId = req.params.productId

        const deletedProduct = await Product.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(401).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Product deleted succesfully",deletedProduct })


    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Internal server error" })
    }
}



module.exports = { addProduct: [upload.single("image"), addProduct], getProductByFirm, deleteProductById }