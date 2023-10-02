const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
router.get('/',async (req,res,next)=>{
    try {
        const products = await Product.find(); // Tüm ürünleri al
        res.status(200).json(products); // Ürünleri JSON formatında yanıtla
      } catch (error) {
        next(error); // Hata oluşursa hatayı sonraki middleware'e ilet
      }
})
router.post('/',(req,res,next)=>{
    const product=new Product({
        name:req.body.title,
        price:req.body.price,
        description:req.body.description,
        image:req.body.image,
        category:req.body.category
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