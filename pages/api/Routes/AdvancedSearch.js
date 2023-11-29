const express=require("express");
const router=express.Router();
const Product=require("../Product.model")
const mongoose=require("mongoose");


router.post('/', async (req, res) => {
    const {category,model,city,minPrice,maxPrice,fuelType,gearbox,engine,isNew}=req.body
    try {
        const filter = {
            category: category,
            model: model,
            city: city,
            fuelType:fuelType,
            gearbox:gearbox,
            engine:engine,
            isNew:isNew,
            price: { $gte: minPrice, $lte: maxPrice }
        };
        console.log(filter)
        const result = await Product.find(filter);
console.log(result)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

module.exports=router