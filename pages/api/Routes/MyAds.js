const express = require("express");
const router = express.Router();
const Favori = require('../Favori.model');
const Product = require("../Product.model")
const User = require("../User.model")
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

router.get('/:userid', async (req, res) => {
  try {
    const userId = req.params.userid;
console.log(userId)
    // Product şemasındaki userId alanı ile parametre olarak gelen userId'ye eşit olan ürünleri bul
    const products = await Product.find({ userId: userId });

    // Bulunan ürünleri cevap olarak gönder
    console.log(products)
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
