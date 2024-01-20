require("dotenv").config();
const express = require("express")
const cors = require("cors")
const productRoute = require("./router/product-router")
const checkOut = require("./router/checkout-router.js")
const app = express();
const connectDb = require("./utils/db");
const PORT =    process.env.PORT||8000;

app.use(cors());
app.use(express.json())


app.use("/api/products",productRoute);
app.use("/api/checkout",checkOut);

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at ${PORT}`);
    })
})