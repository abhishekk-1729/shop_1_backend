const mongoose = require("mongoose");
const { string } = require("zod");

const productSchema = new mongoose.Schema({
    name:{type: String,require: true,},
    description:{type: String,require: true,},
    price:{type: String,require: true,},
    category:{type: String,require: true,},
    picture:{type: String,require: true,},
})

const product = new mongoose.model("product", productSchema);
module.exports = product; 