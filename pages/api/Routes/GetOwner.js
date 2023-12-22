const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require("../User.model.js"); 

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    // Kullanıcının kimliğine göre veritabanından kullanıcıyı bul.
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      // Eğer kullanıcı bulunamazsa, 404 durumu ve uygun mesajla yanıt gönder.
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Eğer kullanıcı bulunursa, 200 durumu ve kullanıcı verileriyle yanıt gönder.
    res.status(200).json(user);
  } catch (err) {
    // Bir hata olursa, 500 durumu ve uygun mesajla yanıt gönder.
    console.error(err);
    res.status(500).json({ message: 'İç sunucu hatası' });
  }
});

module.exports = router;

