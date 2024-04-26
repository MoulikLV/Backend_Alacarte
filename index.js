const express=require('express')
const dotEnv=require("dotenv")
const mongoose=require("mongoose")
const vendorRoutes=require('./routes/vendorRoutes')
const bodyParser=require('body-parser')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const path=require('path')
const cors= require('cors')


const app=express()

const PORT =process.env.PORT ||  4000

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
       .then(()=>console.log("MongoDB connected Succesfully"))
       .catch((error)=>console.log(error))

app.use(cors())
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
       

app.use("/",(req,res)=>{
    res.send(` <html>
    <head>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f7f7f7;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            h1 {
                text-align: center;
                font-size: 3rem;
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            
        </style>
    </head>
    <body>
        <h1>Welcome to A la 'carte</h1>
        
    </body>
</html>`)
})

app.listen(PORT,()=>{
    console.log(`server running at port http://localhost:${PORT}`)
})


