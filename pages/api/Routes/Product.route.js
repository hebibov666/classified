const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
router.get('/',(req,res,next)=>{
    next(new Error("Cannot get a products list"))
    res.send("Waiting...")
})
router.post('/',(req,res,next)=>{
    const product=new Product({
        name:req.body.title,
        price:req.body.price,
        description:req.body.description
    })
    console.log(req.body);
    product.save()
    .then(result=>{
        console.log(result);
        res.send(result)
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