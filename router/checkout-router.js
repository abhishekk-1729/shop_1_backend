const express = require("express")
const router = express.Router();
const product = require("../models/product-models");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

router.route("/final").post(async (req, res) => {
    
    console.log(req.body);
    const {email,name,address,city} = req.body;
    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)];
    const products = await product.find({_id:{$in:uniqIds}});
  
    let line_items = [];
    for (let productId of uniqIds) {
      const quantity = productsIds.filter(id => id === productId).length;
      const product = products.find(p => p._id.toString() === productId);
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:product.name},
          unit_amount: product.price * 100,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  });


module.exports = router;