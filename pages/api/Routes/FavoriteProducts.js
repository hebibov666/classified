const express=require("express");
const router=express.Router();
const Favori = require('../Favori.model');
const Product=require("../Product.model")
const User=require("../User.model")
const mongoose=require("mongoose");
const { ObjectId } = require("mongodb");

router.get('/:userid', async (req, res) => {
  try {
    const userId = req.params.userid.replace(/"/g, ''); // Kullanıcıdan gelen userId'deki tırnak işaretlerini kaldır

    // Kullanıcıyı bul
    const user = await User.findOne({ _id: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcının wishlist'indeki ürünleri al
    const wishlistProductIds = user.wishlist;

    // Wishlist'teki ürünleri Product modelindeki ürünlerle eşleştir
    const wishlistProducts = await Product.find({ _id: { $in: wishlistProductIds } });

    return res.status(200).json(wishlistProducts);
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});
  
  router.post('/', async (req, res) => {
    const { userId, productId } = req.body;
    const withId=userId.replace(/"/g, '');
    if (!userId || !productId) {
      return res.status(400).json({ message: 'İD tapılmadı.' });
    }
    
    try {
      // Kullanıcıyı userId ile bulun
      const user = await User.findOne({ _id:withId});
      
      if (!user) {
        return res.status(404).json({ message: 'İstifadəçi tapılmadı.' });
      }
      
      // Eğer productId, wishlist'te bulunuyorsa, çıkarın; aksi takdirde ekleyin
      if (user.wishlist.includes(productId)) {
        user.wishlist = user.wishlist.filter(item => item !== productId);
        await user.save();
        return res.status(200).json({ message: 'Elan seçilmişlərdən çıxarıldı.' });
      } else {
        user.wishlist.push(productId);
        await user.save();
        return res.status(200).json({ message: 'Elan seçilmişlərə əlavə edildi.' });
      }
      
      // Kullanıcıyı güncellemek için kaydedin
    
    
    } catch (error) {
      console.error('Hata:', error);
      return res.status(500).json({ message: 'Bilinməyən bir xəta yarandı.' });
    }
  });

module.exports=router


