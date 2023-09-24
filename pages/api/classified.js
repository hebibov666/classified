const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

// MongoDB bağlantısı
mongoose.connect("mongodb+srv://guldwrwy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ilanSchema = new mongoose.Schema({
  title: String,
  description: String,
  city: String,
  price: Number,
  color: String,
  marka: String,
  screen: String,
  image: String,
  category: String,
});

const Ilan = mongoose.model("Ilan", ilanSchema);

app.use(express.json());
app.use(cors());

app.post('/api/ilanlar', async (req, res) => {
  try {
    const { title, description, city, price, color, marka, screen, image, category } = req.body;

    // Yeni ilan oluştur
    const yeniIlan = new Ilan({
      title,
      description,
      city,
      price,
      color,
      marka,
      screen,
      image,
      category,
    });

    // Veriyi MongoDB'ye kaydet
    await yeniIlan.save();

    // Yeni eklenen ilanı yanıt olarak gönderin
    res.status(201).json(yeniIlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Veri kaydedilemedi.' });
  }
});

app.get('/api/ilanlar', async (req, res) => {
  try {
    // Tüm ilanları MongoDB'den alın
    const ilanlar = await Ilan.find();
    res.json(ilanlar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Veriler alınamadı.' });
  }
});

app.listen(port, () => {
  console.log(`API sunucusu ${port} numaralı portta çalışıyor.`);
});
