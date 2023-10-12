const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
const multer=require('multer')
const cloudinary=require("../cloudinary.js")
const storage=multer.diskStorage({
  destination:function(req,file,callback){
callback(null,__dirname + "/uploads");
  },
  filename:function(req,file,callback){
    callback(null,file.originalname)
  }
})
const uploads=multer({storage:storage});
router.get('/',async (req,res,next)=>{
    try {
        const products = await Product.find();
    
        res.status(200).json(products); 
      } catch (error) {
        next(error);
      }
})
router.post('/',uploads.array("files"),(req,res,next)=>{
  const images = req.files.map((file) => file.path);
  cloudinary.uploader.upload(images[0],
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
  console.log(images)
console.log(req.files);
   const product=new Product({
  name:req.body.title,
  price:req.body.price,
  description:req.body.description,
  category:req.body.category,
  image:images
   })
   product.save()
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