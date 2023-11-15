const express=require("express");
const router=express.Router();
const Favori = require('../Favori.model');
const Product=require("../Product.model")
const User=require("../User.model")
const mongoose=require("mongoose");


router.get('/:text', async (req, res) => {
    const text = req.params.text;
    try {
        const products = await Product.find({ name: { $regex: `^${text}`, $options: 'i' } });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
  

module.exports=router