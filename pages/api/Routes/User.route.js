require("dotenv").config()
const express = require('express');
const router = express.Router();
const User = require("../User.model.js");
const Product=require("../Product.model.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer=require('multer')
const cloudinary=require("../cloudinary.js")
const jwtSecret = process.env.JWT_SECRET;

const storage=multer.diskStorage({
  destination:function(req,file,callback){
callback(null,__dirname + "/profilephotos");
  },
  filename:function(req,file,callback){
    callback(null,file.originalname)
  }
})
const uploads=multer({storage:storage});
router.post('/', uploads.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  let avatar = ''; 

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatar = result.public_id;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return res.status(500).json({ message: 'Image upload failed' });
    }
  } else {
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTGD1DFMdHwC6PdU3Br-wI5d9Ckhp8nsNkw&usqp=CAU";
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      avatar: avatar, 
      password: hashedPassword,
      wishlist:[]
    });
    
    const savedUser = await user.save();

    const userPayload = {
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id,
      avatar: savedUser.avatar
    };
    const token = jwt.sign(userPayload, jwtSecret);

    res.status(200).json({ token: token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'User creation failed' });
  }
})

module.exports = router;