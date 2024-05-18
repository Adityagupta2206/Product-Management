

import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());



mongoose.connect("mongodb://localhost:27017/Sample",{useNewurlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("connect with db")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})


const Product = new mongoose.model("Product",productSchema)

app.post("/api/new", async (req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    });
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
});
app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
});






app.listen(4500,()=>{
    console.log("server is working http://localhost:4500")
})