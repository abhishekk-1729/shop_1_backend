const { isDirty } = require("zod");
const product = require("../models/product-models");

const getAllProducts = async(req,res) =>{
    try {
        const products = await product.find();
        if(!products){
            res.status(404).json({"message":"no product found"});
        }
        // console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async(req,res) =>{
    try {
        const item = req.body;
        await product.create(item);

        res.status(200).json({"message":"done"});
    } catch (error) {
        console.log(error);
    }
}

const getAllProductsById = async(req,res) =>{
    try {
        const id = req.params.id;
        
        if(id){
            const idArray = id.split(",");
            // console.log(idArray);
            res.json(await product.find({"_id":{$in:idArray}}))
        }
        else{
            res.json(await product.find());
        }

    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllProducts,getAllProductsById,addProduct}