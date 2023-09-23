const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const ilanlar = []; // İlanları saklamak için bir dizi

app.post('/api/ilanlar', (req, res) => {
  const { title, description, city, price,color,marka,screen,image,category } = req.body; // POST isteği ile gelen verileri al

  // Gelen verileri kullanarak yeni bir ilan oluştur
  const yeniIlan = {
    title,
    description,
    city,
    price,
    color,
    marka,
    image,
    category,
  };

  // Yeni ilanı ilanlar dizisine ekleyin
  ilanlar.push(yeniIlan);

  // Yeni eklenen ilanı yanıt olarak gönderin
  res.status(201).json(yeniIlan);
});

app.get('/api/ilanlar', (req, res) => {
    // İlanları bir örnek dizi içinden alalım
    
      // Daha fazla ilan ekleyebilirsiniz
    
  
    // İlanları JSON formatında yanıt olarak gönderin
    res.json(ilanlar);
  });
app.listen(port, () => {
  console.log(`API sunucusu ${port} numaralı portta çalışıyor.`);
});