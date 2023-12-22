require("dotenv").config()
const express = require("express");
const router = express.Router();
const Product = require("../Product.model.js")
const Favori = require("../Favori.model.js")
const multer = require('multer')
const cloudinary = require("../cloudinary.js")
const axios = require('axios');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})
const uploads = multer({ storage: storage });
router.get('/products/:category', async (req, res) => {
  const { category } = req.params;
  const { page = 1 } = req.query;  

  try {
    let products;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const filter = category === 'Bütün elanlar' ? {} : { category: category };

    products = await Product.find(filter).skip(skip).limit(perPage);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/', uploads.array("files"), (req, res, next) => {
  const images = req.files.map((file) => file.path);

  const uploadedImageIds = [];
  const promises = [];
  images.forEach((imagePath, index) => {
    promises.push(new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imagePath, { public_id: `urun_resim_${Date.now()}_${index}` }, (error, result) => {
        if (error) {
          console.error('Resim yükleme hatası: ', error);
          reject(error);
        } else {
          const publicId = result.public_id;
          uploadedImageIds.push(publicId);
          resolve(publicId);
        }
      });
    }));
  });

  Promise.all(promises)
    .then(() => {
      // Boş olmayan değerlere sahip bir nesne oluştur
      const productData = {
        name: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        model: req.body.model,
        city: req.body.city,
        number: req.body.number,
        fuelType: req.body.fuelType,
        engine: req.body.engine,
        gearbox: req.body.gearbox,
        isNew: req.body.isNew,
        year: req.body.year,
        marka: req.body.marka,
        camera: req.body.camera,
        memory: req.body.memory,
        walk: req.body.walk,
        banType: req.body.banType,
        userId: req.body.userid,
        viewCount: 0,
        isVip: true,
        image: uploadedImageIds,
      };

      // Boş değerlere sahip alanları filtrele
      const filteredProductData = Object.fromEntries(
        Object.entries(productData).filter(([key, value]) => value !== undefined && value !== null && value !== '')
      );

      const product = new Product(filteredProductData);

      product.save()
        .then(savedProduct => {
          res.json(savedProduct);
        })
        .catch(err => {
          res.status(500).json({ message: 'Meshul qeyd edilmədi' });
        });
    })
    .catch(error => {
      res.status(500).json({ message: 'Resimler yüklenemedi' });
    });
});


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  increaseViewCount(id)
  try {

    const product = await Product.find({ _id: id });

    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ message: 'Məhsul tapılmadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Elanlar gətiriləmədi' });
  }
});

async function increaseViewCount(id) {
  try {
    const ilan = await Product.findById(id);
    if (!ilan) {
      console.error('İlan bulunamadı.');
      return;
    }

    ilan.viewCount += 1;
    await ilan.save();
    console.log('Bakış sayısı güncellendi:', ilan.viewCount);
  } catch (error) {
    console.error('Bakış sayısı güncellenirken bir hata oluştu:', error);
  }
}

router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    
    const imageIds = product.image;
    const deletePromises = imageIds.map((imageId) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(imageId, (error, result) => {
          if (error) {
            console.error('Resim silme hatası: ', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    
    await Promise.all(deletePromises);

   
    await Product.findByIdAndRemove(productId);

    res.json({ message: 'İlan başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'İlan silinme işlemi başarısız oldu' });
  }
});


router.patch('/:id', (req, res, next) => {
  res.send("Update a product")
})
module.exports = router