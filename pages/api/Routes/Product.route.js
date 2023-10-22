const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
const multer=require('multer')
const cloudinary=require("../cloudinary.js")
const storage=multer.diskStorage({
  destination:function(req,file,callback){
callback(null,__dirname + "/uploads");
  },
  filename:function(req,file,callback){
    callback(null,file.originalname)
  }
})
const uploads=multer({storage:storage});
router.get('/',async (req,res,next)=>{
    try {
        const products = await Product.find();
    
        res.status(200).json(products); 
      } catch (error) {
        next(error);
      }
})
router.post('/', uploads.array("files"), (req, res, next) => {
  const images = req.files.map((file) => file.path);

  // Tüm resimleri Cloudinary'ye yükle
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
      // Tüm resimler yüklendi, ürünü kaydet
      const product = new Product({
        name: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        model:req.body.model,
        color:req.body.color,
        userId: req.body.userid,
        image: uploadedImageIds, // Resimlerin public ID'lerini kaydedin
      });

      product.save()
        .then(savedProduct => {
          res.json(savedProduct);
        })
        .catch(err => {
          console.error('Ürün kaydetme hatası: ', err);
          res.status(500).json({ message: 'Ürün kaydedilemedi' });
        });
    })
    .catch(error => {
      res.status(500).json({ message: 'Resimler yüklenemedi' });
    });
});


router.get('/:userId', async (req, res) => {
  const userId = req.params.userId; 

  try {
 
    const products = await Product.find({userId: userId });

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'Kullanıcının ilanı bulunamadı' });
    }
  } catch (error) {
    console.error('Ilanlar getirilemedi: ', error);
    res.status(500).json({ message: 'Ilanlar getirilemedi' });
  }
});

router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id; 

  try {
   
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    await Product.findByIdAndRemove(productId);

    res.json({ message: 'İlan başarıyla silindi' });
  } catch (error) {
    console.error('İlan silme hatası: ', error);
    res.status(500).json({ message: 'İlan silme işlemi başarısız oldu' });
  }
});

router.patch('/:id',(req,res,next)=>{
res.send("Update a product")
})
module.exports=router