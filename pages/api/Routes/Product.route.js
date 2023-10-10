const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
const upload=require("../multer.config.js")
const multer=require('multer')

router.get('/',async (req,res,next)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products); 
      } catch (error) {
        next(error);
      }
})
router.post('/',upload.array("images", 3),(req,res,next)=>{
    console.log(req.body);
    const product=new Product({
        name:req.body.title,
        price:req.body.price,
        description:req.body.description,
        image:req.body.images,
        category:req.body.category,
        model:req.body.model,
        color:req.body.color
    })
    product.save()
    .then(result=>{
        res.send(result)
        console.log(req.body);
    })
    .catch(err=>{
        console.log(err.message);
    })
})

router.get('/:id',(req,res,next)=>{
res.send("gett a single product")
})

router.delete('/:id',(req,res,next)=>{
res.send("Delete a product")
})
router.patch('/:id',(req,res,next)=>{
res.send("Update a product")
})
module.exports=router