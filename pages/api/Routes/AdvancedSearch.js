const express=require("express");
const router=express.Router();
const Product=require("../Product.model")
const mongoose=require("mongoose");


router.post('/', async (req, res) => {
    const {
        category, model, city, minPrice, maxPrice, fuelType, gearbox,
        engine, isNew, year, banType, color,
    } = req.body;

    try {
        const filter = {};

        if (category) filter.category = category;
        if (model) filter.model = model;
        if (city) filter.city = city;
        if (fuelType) filter.fuelType = fuelType;
        if (gearbox) filter.gearbox = gearbox;
        if (engine) filter.engine = engine;
        if (isNew !== undefined) filter.isNew = isNew;
        if (color) filter.color = color;
        if (year) filter.year = year;
        if (banType) filter.banType = banType;
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) filter.price.$gte = minPrice;
            if (maxPrice !== undefined) filter.price.$lte = maxPrice;
        }

        console.log(filter);

       
        const result = await Product.find({ $and: Object.keys(filter).map(key => ({ [key]: filter[key] })) });

        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



  

module.exports=router