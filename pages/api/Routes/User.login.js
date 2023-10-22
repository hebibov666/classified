require("dotenv").config()
const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require("../User.model.js"); 
const Product=require("../Product.model.js")
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET
router.use(cookieParser());
router.use(session({
    secret: 'R@nD0mS3cr3tK3y!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));
  router.get('/', async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const tokenWithQuotes = authorizationHeader.split(' ')[1];
      const token = tokenWithQuotes.replace(/"/g, '');
      console.log(token);
  
      try {
        const decoded = await jwt.verify(token, jwtSecret);
        const userId = decoded.id;
        const user = await User.findById(userId).select('-password');
  
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }
      } catch (err) {
        res.status(401).json({ message: 'Token yalnış' });
      }
    } else {
      res.status(401).json({ message: 'Token yoxdur' });
    }
  });
  
  
  
  
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              const userPayload = {
                name:user.name,
                email: user.email,
                id:user._id
          
              };
                req.session.user = user;
             const token=jwt.sign(userPayload,jwtSecret)
             res.json({token:token})
            } else {
              res.json("Şifrə yalnış");
            }
          });
        } else {
          res.json("İstifadəçi tapılmadı");
        }
      });
  });
  router.delete('/:id', async (req, res) => {
    const kullaniciId = req.params.id;
  
    try {
    
      const ilanlar = await Product.find({ userId: kullaniciId });
  
     
      for (const ilan of ilanlar) {
        await Product.findByIdAndDelete(ilan._id);
      }
  
     
      await User.findByIdAndDelete(kullaniciId);
  
    
      res.json({ message: 'Kullanıcı ve ilanları başarıyla silindi' });
      console.log("Kullanıcı ve ilanları silindi");
    } catch (error) {
      console.error('Kullanıcı ve ilanları silme hatası: ', error);
      res.status(500).json({ message: 'Kullanıcı ve ilanları silme işlemi başarısız oldu' });
    }
  });
  
  
  
  

module.exports = router;