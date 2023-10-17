require("dotenv").config()
const express = require('express');
const router = express.Router();
const User = require("../User.model.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
  
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });
    const savedUser = await user.save();

  
    const userPayload = {
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id
    };
    const token = jwt.sign(userPayload, jwtSecret);

    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'İstifadəçi tapılmadı' });
  }
});

module.exports = router;