const express=require("express");
const router=express.Router();
const User=require("../User.model.js")
router.get('/',(req,res,next)=>{
    router.get('/',async (req,res,next)=>{
        try {
            const users = await User.find();
        
            res.status(200).json(users); 
          } catch (error) {
            next(error);
          }
    })
})
router.post('/',(req,res,next)=>{
    const user=new User({
        name:req.body.name,
email:req.body.email,
        password:req.body.password
    })
    console.log(req.body);
    user.save()
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